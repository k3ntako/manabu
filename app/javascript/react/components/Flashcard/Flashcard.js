import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import DeckListItem from './DeckListItem'

class Flashcard extends Component {
constructor(props) {
    super(props);
    this.state = {
      selectedDeck: null,
      decks: []
    };
    this.clickHandler = this.clickHandler.bind(this)
    this.fetchDecks = this.fetchDecks.bind(this)
    this.onClickButton = this.onClickButton.bind(this)
    this.addNewDeck = this.addNewDeck.bind(this)
  }

  clickHandler(id){
    this.setState({selectedDeck: id})
  }

  fetchDecks(){
    fetch("/api/v1/decks")
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      this.setState({decks: data})
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  onClickButton(type){
    browserHistory.push(`/flashcards/${type}/${this.state.selectedDeck}`)
  }

  addNewDeck(){
    browserHistory.push(`/flashcards/new`)
  }

  componentDidMount(){
    this.fetchDecks()
  }

  render(){
    let deckList = this.state.decks.map(deck => {
      return(
        <DeckListItem
          key={deck.id}
          deckId={deck.id}
          deckName={deck.name}
          selected={this.state.selectedDeck === deck.id}
          clickHandler={this.clickHandler}
        />
      )
    })

    let startEditButtons = (
      <div className="cell medium-24 large-offset-6 large-12 grid-x grid-margin-x">
        <div
            className="startCards deck-tile cell small-12"
            id="start-study-flashcards"
            onClick={() => {this.onClickButton("study")}}
          >
          Start
        </div>
        <div
            className="startCards deck-tile cell small-12 "
            id="edit-flashcards"
            onClick={() => {this.onClickButton("edit")}}
          >
          Edit
        </div>
      </div>
    )
    if(!this.state.selectedDeck){
      startEditButtons = (
        <div className="cell medium-24 large-offset-6 large-12 grid-x grid-margin-x">
          <div className="startCards deck-tile cell small-12">
            Start
          </div>
          <div className="startCards deck-tile cell small-12 ">
            Edit
          </div>
        </div>
      )
    }

    return(
      <div className="grid-x grid-margin-x">
        <div className="cell small-24"><h1>Flashcards</h1></div>
        {deckList}
        <div
          className="deck-tile cell medium-24 large-12 flashcard-add-new"
          onClick={this.addNewDeck}
          >
          <i className="far fa-plus-square flashcard-add-new-icon"></i>
        </div>
        {startEditButtons}
      </div>
    )
  }
}

export default Flashcard
