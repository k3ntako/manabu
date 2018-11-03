import React from 'react'
import StyleButton from './StyleButton'

const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'Unordered List', style: 'unordered-list-item'},
  {label: 'Ordered List', style: 'ordered-list-item'},
  {label: 'Code Block', style: 'code-block'},
];

const BlockStyleButtons = (props) => {
  const editorState = props.editorState;
  const selection = editorState.getSelection();
  const blockType = editorState
  .getCurrentContent()
  .getBlockForKey(selection.getStartKey())
  .getType();

  return (
    <div className="notes-style-buttons">
    {BLOCK_TYPES.map((type) =>
      <StyleButton
      key={type.label}
      active={type.style === blockType}
      label={type.label}
      onToggle={props.onToggle}
      style={type.style}
      />
    )}
    </div>
  );
};

export default BlockStyleButtons
