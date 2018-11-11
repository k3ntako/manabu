import React from 'react'
import { Editor, EditorState, RichUtils, convertFromRaw, convertToRaw } from 'draft-js';
import BlockStyleButtons from './BlockStyleButtons'
import InlineStyleButtons from './InlineStyleButtons'

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      name: "",
      errors: []
    };

    this.focus = this.focus.bind(this)
    this.onChange = this.onChange.bind(this)
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.toggleBlockType = this.toggleBlockType.bind(this);
    this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
    this.getBlockStyle = this.getBlockStyle.bind(this);
    this.saveToDatabase = this.saveToDatabase.bind(this);
    this.getNote = this.getNote.bind(this);
    this.nameOnChangeHandler = this.nameOnChangeHandler.bind(this);
  }

  onChange(editorState){
    this.setState({editorState: editorState})
  }

  focus(){
    this.refs.editor.focus()
  }

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  getBlockStyle(block) {
    switch (block.getType()) {
      case 'blockquote': return 'RichEditor-blockquote';
      case 'code-block': return 'RichEditor-code-block';
      default: return null;
    }
  }

  toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  toggleInlineStyle(inlineStyle) {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
  }

  getNote(){
    fetch(`/api/v1/notes/${this.props.params.id}`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(data => {
      if(data.note){
        let contentState = convertFromRaw(JSON.parse(data.note))
        this.setState({
          editorState: EditorState.createWithContent(contentState),
          name: data.name
        })
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  saveToDatabase(){
    let rawContent = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
    let noteData = {
      name: this.state.name,
      note: rawContent,
      note_id: this.props.params.id
    };

    fetch(`/api/v1/notes/${this.props.params.id}`, {
      method: 'PATCH',
      body: JSON.stringify(noteData),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json' },
        credentials: 'same-origin'
      })
      .then(data => data.json())
      .then(note => {
        if(note.error){
          this.setState({errors: this.state.errors.concat(note.error)})
        }
      }
    )
  }

  nameOnChangeHandler(event){
    this.setState({name: event.target.value})
  }

  componentDidMount(){
    this.getNote()
  }

  render() {
    let styleMap = {
      CODE: {
        backgroundColor: "#f1f1f1",
        border: "1px solid #cccccc",
        fontWeight: "bold",
        padding: 2,
      }
    };

    let errorsHTML = this.props.renderErrors(this.state.errors)

    return (
      <div className="notes grid-y">
        {errorsHTML}
        <input
          placeholder="Click to edit title"
          value={this.state.name}
          className="notes-name"
          type="text"
          onChange={this.nameOnChangeHandler}
        />
        <BlockStyleButtons
          editorState={this.state.editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineStyleButtons
          editorState={this.state.editorState}
          onToggle={this.toggleInlineStyle}
        />

        <div className="notes-editor" onClick={this.focus}>
          <Editor
            blockStyleFn={this.getBlockStyle}
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            ref="editor"
            spellCheck={true}
            customStyleMap={styleMap}
          />
        </div>

        <div className="standard-green-button" onClick={this.saveToDatabase}>
          Save
        </div>
      </div>
    );
  }
}

export default Note
