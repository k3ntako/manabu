import React, { Component } from 'react';
import DeckInfo from './DeckInfo'
import Cards from './Cards'

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      deckName: "",
      termTitle: "",
      definitionTitles: [],
      numOfDefs: 0,
      oldNumOfDefs: 0,
      formDisabled: false,
      errors: [],
      newCardTerm: ""
    };
    this.saveToDatabase = this.saveToDatabase.bind(this)
    this.saveDeckToDatabase = this.saveDeckToDatabase.bind(this)
    this.defNumChangeHandler = this.defNumChangeHandler.bind(this)
    this.updateDefinition = this.updateDefinition.bind(this)
    this.updateTitle = this.updateTitle.bind(this)
    this.findFromArray = this.findFromArray.bind(this)
    this.noBlankFieldArrOfObj = this.noBlankFieldArrOfObj.bind(this)
    this.saveNewTitlesToDatabase = this.saveNewTitlesToDatabase.bind(this)
    this.deleteDefinitionsInDatabase = this.deleteDefinitionsInDatabase.bind(this)
    this.newCardChangeHandler = this.newCardChangeHandler.bind(this)
    this.saveNewCardToDatabase = this.saveNewCardToDatabase.bind(this)
    this.handleDeckNameChange = this.handleDeckNameChange.bind(this)
    this.sortBySequence = this.sortBySequence.bind(this)
  }

  noBlankFieldArrOfObj(arr, field){
    let valid = true
    arr.forEach(item => {
      if(!item[field].replace(/\s/g,'')){
        valid = false
      }
    })
    return valid
  }

  findFromArray(arr, id){
    let spliced;
    for(let i=0; i< arr.length; i++){
      if(arr[i].id === id){
        spliced = arr.splice(i,1)
      }
    }
    return [arr, spliced[0]]
  }

  updateDefinition(cardId, definitionId, newValue){
    let cardsOuput = this.findFromArray(this.state.cards, cardId)
    let oldCards = cardsOuput[0]
    let newCard = cardsOuput[1]

    if(definitionId){
      let defOutput = this.findFromArray(newCard.definitions, definitionId)
      let oldDefs = defOutput[0]
      let newDef = defOutput[1]
      newDef.definition = newValue
      oldDefs.push(newDef)

      newCard.definitions = oldDefs
    }else{
      newCard.term = newValue
    }

    oldCards.push(newCard)
    this.setState({cards: oldCards})
  }

  updateTitle(titleId, newValue){
    let titlesOutput = this.findFromArray(this.state.definitionTitles, titleId)
    let oldTitles = titlesOutput[0]
    let newTitle = titlesOutput[1]

    newTitle.title = newValue
    oldTitles.push(newTitle)
    this.setState({definitionTitles: oldTitles})
  }

  fetchDeck(deckId) {
    fetch(`/api/v1/decks/${deckId}/cards`)
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
      let numOfDefs = data.definition_titles.length
      this.setState({
        cards: data.cards,
        deckName: data.deck_name,
        definitionTitles: data.definition_titles,
        termTitle: data.term_title,
        numOfDefs: numOfDefs
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  saveToDatabase(cardId) {
    let cardJSON = this.state.cards.filter(card => card.id === cardId)
    let jsonStringInfo = JSON.stringify(cardJSON[0])
    fetch(`/api/v1/decks/${this.props.params.id}/cards/${cardId}`, {
      method: 'PATCH',
      body: jsonStringInfo,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json' },
        credentials: 'same-origin'
      })
      .then(data => data.json())
      .then(card => {
        console.log(card);
      }
    )
  }

  saveDeckToDatabase() {
    let noBlanks = this.noBlankFieldArrOfObj(this.state.definitionTitles, "title")
    if(noBlanks && !this.state.formDisabled){
      let deckJSON = {
        deck_name: this.state.deckName,
        term_title: this.state.termTitle,
        definition_titles: this.state.definitionTitles,
        number_of_definitions: this.state.numOfDefs
      }

      let jsonStringInfo = JSON.stringify(deckJSON)
      fetch(`/api/v1/decks/${this.props.params.id}/`, {
        method: 'PATCH',
        body: jsonStringInfo,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json' },
          credentials: 'same-origin'
        })
        .then(data => data.json())
        .then(deck => {
          this.setState({definitionTitles: deck.definition_titles})
        }
      )
    }else{
      //error message on screen
      console.log("NAHHHH");
    }
  }

  saveNewTitlesToDatabase() {
    let noBlanks = this.noBlankFieldArrOfObj(this.state.definitionTitles, "title")
    if(noBlanks && this.state.formDisabled){
      let deckJSON = {
        deck_name: this.state.deckName,
        term_title: this.state.termTitle,
        definition_titles: this.state.definitionTitles,
        number_of_definitions: this.state.numOfDefs
      }

      let jsonStringInfo = JSON.stringify(deckJSON)
      fetch(`/api/v1/decks/${this.props.params.id}/definitions`, {
        method: 'POST',
        body: jsonStringInfo,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json' },
          credentials: 'same-origin'
        })
        .then(data => data.json())
        .then(newDefinitions => {


          this.setState({
            definitionTitles: newDefinitions.definition_titles,
            cards: newDefinitions.cards,
            formDisabled: false
          })
        }
      )
    }else{
      //error message on screen
      this.setState({errors: ["Definition titles can't be blank."]})
      console.log("NAHHHH");
    }
  }

  deleteDefinitionsInDatabase(deletedDefTitles) {
    if(!this.state.formDisabled){
      let deckJSON = {
        deck_name: this.state.deckName,
        term_title: this.state.termTitle,
        definition_titles: this.state.definitionTitles,
        number_of_definitions: this.state.numOfDefs,
        deleted_definition_titles: deletedDefTitles
      }

      let jsonStringInfo = JSON.stringify(deckJSON)
      fetch(`/api/v1/decks/${this.props.params.id}/definition_titles/${this.state.numOfDefs-1}`, {
        method: 'DELETE',
        body: jsonStringInfo,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json' },
          credentials: 'same-origin'
        })
        .then(data => data.json())
        .then(newDefinitions => {

        }
      )
    }else{
      //error message on screen
      this.setState({errors: ["Need to figure out how to deal with deleting titles while already editing."]})
      console.log("NAHHHH");
    }
  }

  defNumChangeHandler(event){
    let newNum = Number(event.target.value)
    if(this.state.numOfDefs > newNum){
      if (confirm("This will delete any definitions defined in the boxes deleted. Are you sure you would like to reduce the number of definitions.")) {
        let defTitles = this.state.definitionTitles
        let remainingDefTitles = defTitles.splice(0,newNum)

        let cards = this.state.cards
        cards.forEach(card => {
          card.definitions.length = newNum
        })
        this.setState({numOfDefs: newNum, definitionTitles: remainingDefTitles, cards: cards})
        this.deleteDefinitionsInDatabase(defTitles)
      }
    }else {
      let newDefTitles = []
      for(let i=0; i < newNum - this.state.numOfDefs; i++){
        newDefTitles.push({id: `new${i}`, title: ""})
      }
      this.setState({
        numOfDefs: newNum,
        formDisabled: true,
        definitionTitles: this.state.definitionTitles.concat(newDefTitles)})
    }
  }

  newCardChangeHandler(event){
    this.setState({newCardTerm: event.target.value})
  }

  handleDeckNameChange(event){
    this.setState({deckName: event.target.value})
  }

  saveNewCardToDatabase(event){
    event.preventDefault()
    let newTerm = this.state.newCardTerm.replace(/\s+/g,'');
    if(newTerm){
      fetch(`/api/v1/decks/${this.props.params.id}/cards/?new_term=${newTerm}&number_of_definitions=${this.state.numOfDefs}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
      })
      .then(data => data.json())
      .then(newCard => {
        this.setState({
          cards: [...this.state.cards, newCard.card],
          newCardTerm: ""
        })
      })
    }
  }

  sortBySequence(a,b){
    if (a.sequence < b.sequence){
      return -1;
    }
    return 1;
  }

  componentDidMount(){
    this.fetchDeck(this.props.params.id)
  }

  render(){
    let dropdownOptions = []
    for(let i=1; i < 11; i++){
      if(i === this.state.numOfDefs){
        dropdownOptions.push(<option key={i} value={i} selected>{i}</option>)
      }else{
        dropdownOptions.push(<option key={i} value={i}>{i}</option>)
      }
    }

    let errors = []
    this.state.errors.forEach((error, idx) => {
      errors.push(
        <div key={idx}>{error}</div>
      )
    })

    return(
      <div className="flashcard-edit">
        {errors}
        <form>
          <input
            placeholder="Click to edit name of deck"
            value={this.state.deckName}
            className="notes-name deck-name"
            type="text"
            onChange={this.handleDeckNameChange}
            onBlur={this.saveDeckToDatabase}
          />
          <h3>Titles</h3>
          <select onChange={this.defNumChangeHandler}>
            {dropdownOptions}
          </select>
          <DeckInfo
            sortedTitles={this.state.definitionTitles.sort(this.sortBySequence)}
            numOfDefs={this.state.numOfDefs}
            termTitle={this.state.termTitle}
            saveDeckToDatabase={this.saveDeckToDatabase}
            formDisabled={this.state.formDisabled}
            saveNewTitlesToDatabase={this.saveNewTitlesToDatabase}
            updateTitle={this.updateTitle}
            termChangeHandler={(term) => {this.setState({termTitle: term})}}

          />
          <h3>Cards</h3>

          <Cards
            numOfDefs={this.state.numOfDefs}
            definitionTitles={this.state.definitionTitles}
            sortedCards={this.state.cards.sort(this.sortBySequence)}
            sortFunc={this.sortBySequence}
            formDisabled={this.state.formDisabled}
            saveToDatabase={this.saveToDatabase}
            newCardTerm={this.state.newCardTerm}
            newCardChangeHandler={this.newCardChangeHandler}
            saveNewCardToDatabase={this.saveNewCardToDatabase}
          />

        </form>
      </div>
    );
  }
};

export default Edit
