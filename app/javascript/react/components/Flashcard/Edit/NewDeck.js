import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deckName: "",
      termTitle: "",
      numOfDefs: 2,
      definitionTitles: ["",""],
      errors: []
    };
    this.defNumChangeHandler = this.defNumChangeHandler.bind(this)
    this.titleChangeHandler = this.titleChangeHandler.bind(this)
    this.inputChangeHandler = this.inputChangeHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
  }

  defNumChangeHandler(event){
    let num = Number(event.target.value)
    let defTitles = this.state.definitionTitles
    defTitles.length = num
    defTitles = Array.from(defTitles, item => item || "");
    this.setState({
      numOfDefs: num,
      definitionTitles: defTitles
    })
  }

  inputChangeHandler(event){
    this.setState({[event.target.id]: event.target.value})
  }

  titleChangeHandler(event){
    let defTitles = this.state.definitionTitles
    defTitles[Number(event.target.id)] = event.target.value
    this.setState({definitionTitles: defTitles})
  }

  submitHandler(event){
    event.preventDefault()
    let deckInfo = {
      deck_name: this.state.deckName,
      term_title: this.state.termTitle,
      definition_titles: this.state.definitionTitles
    }
    fetch(`/api/v1/decks`, {
      method: 'POST',
      body: JSON.stringify(deckInfo),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json' },
      credentials: 'same-origin'
    })
    .then(data => data.json())
    .then(data => {
      if(data.message === "success"){
        browserHistory.push(`/flashcards/edit/${data.deck.id}`)
      }else if(data.error){
        this.setState({errors: [...this.state.errors, data.error]})
      }else{
        this.setState({errors: [...this.state.errors, "Could not save deck."]})
      }
    })
  }

  render(){
    let dropdownOptions = []
    for(let i=1; i < 11; i++){
      if(i === this.state.numOfDefs){
        dropdownOptions.push(<option key={i} value={i} selected>{i}</option>)
      }else{
        dropdownOptions.push(<option key={i} value={i}>{i}</option>)
      }
    };

    let definitionTitles = this.state.definitionTitles.map((defTitle, idx) =>{
      return(
        <input
          key={idx}
          id={idx}
          type="text"
          value={this.state.definitionTitles[idx]}
          placeholder={`Definition Title ${idx + 1}`}
          onChange={this.titleChangeHandler}
        />
      )
    })
    let allInputs = Object.assign([], this.state.definitionTitles);
    allInputs.push(this.state.deckName,this.state.termTitle)
    let emptyTitles = allInputs.filter(defTitle => !defTitle.replace(/\s/g,''))
    let addDeckButtonDisabled = false;
    if(emptyTitles.length){
      addDeckButtonDisabled = true
    }

    let errorsHTML = this.props.renderErrors(this.state.errors)

    return(
      <div>
        {errorsHTML}
        <h1>Add a Deck</h1>
        <form onSubmit={this.submitHandler}>
          <h3>Name of Deck:</h3>
          <input
            type="text"
            id="deckName"
            value={this.state.deckName}
            onChange={this.inputChangeHandler}
            />
          <h3>Term Title:</h3>
          <input
            type="text"
            id="termTitle"
            value={this.state.termTitle}
            onChange={this.inputChangeHandler}
            />

          <h3>Number of Definitions:</h3>
          <select onChange={this.defNumChangeHandler}>
            {dropdownOptions}
          </select>

          <h3>Definition Titles:</h3>
          {definitionTitles}
          <input
            type="submit"
            className="standard-green-button add-card-button"
            id="add-card-button"
            value="Add"
            disabled={addDeckButtonDisabled}
            />
        </form>
      </div>
    );
  }
};

export default Edit
