import React, { Component } from 'react';
import { Link } from 'react-router';
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
  }

  clickHandler(id){
    this.setState({selectedDeck: id})
    console.log(id)
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
      <div className="grid-x grid-margin-x">
        <div className="startCards deck-tile cell small-12" id="start-study-flashcards">
          <Link to={`/flashcard/study/${this.state.selectedDeck}`}>Start</Link>
        </div>
        <div className="startCards deck-tile cell small-12 " id="edit-flashcards">
          <Link to={`/flashcard/edit/${this.state.selectedDeck}`}>Edit</Link>
        </div>
      </div>
    )
    if(!this.state.selectedDeck){
      startEditButtons = (
        <div className="grid-x grid-margin-x">
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
      <div>
        {deckList}
        {startEditButtons}
      </div>
    )
  }
}

export default Flashcard
