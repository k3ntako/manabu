import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import DeckListItem from './DeckListItem'

class Flashcard extends Component {
constructor(props) {
    super(props);
    this.state = {
      selectedDeck: null,
      decks: [],
      settings: {
        noMastery: true,
        learning: true,
        almost: true,
        mastered: true,
        randomize: false
      }
    };
    this.clickHandler = this.clickHandler.bind(this)
    this.fetchDecks = this.fetchDecks.bind(this)
    this.onClickButton = this.onClickButton.bind(this)
    this.addNewDeck = this.addNewDeck.bind(this)
    this.handleMasteryClick = this.handleMasteryClick.bind(this)
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
    browserHistory.push({pathname: `/flashcards/${type}/${this.state.selectedDeck}`, state: this.state.settings})
  }

  addNewDeck(){
    browserHistory.push(`/flashcards/new`)
  }

  handleMasteryClick(event){
    let settings = this.state.settings
    settings[event.target.value] = event.target.checked
    this.setState({settings: settings})
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
        <div className="deck-settings cell edium-24 large-offset-6 large-12">
          <h5>Study Settings</h5>
          <strong>Include:</strong><br/>
          <input type="checkbox" id="no-mastery" name="noMastery" value="noMastery" checked={this.state.settings.noMastery} onChange={this.handleMasteryClick} />
          <label htmlFor="no-mastery">No Mastery</label>
          <input type="checkbox" id="learning" name="learning" value="learning" checked={this.state.settings.learning} onChange={this.handleMasteryClick} />
          <label htmlFor="learning">Learning</label>
          <input type="checkbox" id="almost" name="almost" value="almost" checked={this.state.settings.almost} onChange={this.handleMasteryClick} />
          <label htmlFor="almost">Almost</label>
          <input type="checkbox" id="mastered" name="mastered" value="mastered" checked={this.state.settings.mastered} onChange={this.handleMasteryClick} />
          <label htmlFor="mastered">Mastered</label>
          <br />
          <strong>Order:</strong><br/>
          <input type="checkbox" id="randomize" name="randomize" value="randomize" checked={this.state.settings.randomize} onChange={this.handleMasteryClick}/>
          <label htmlFor="randomize">Randomize</label>
        </div>
        {startEditButtons}
      </div>
    )
  }
}

export default Flashcard
