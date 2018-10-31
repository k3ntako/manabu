import React, { Component } from 'react';

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      deckName: "",
      termTitle: "",
      definitionTitles: [],
      numOfDefs: 0
    };
    this.saveToDatabase = this.saveToDatabase.bind(this)
    this.saveDeckToDatabase = this.saveDeckToDatabase.bind(this)
    this.defNumChangeHandler = this.defNumChangeHandler.bind(this)
    this.updateDefinition = this.updateDefinition.bind(this)
    this.updateTitle = this.updateTitle.bind(this)
    this.findFromArray = this.findFromArray.bind(this)
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
    .then(response => {
      return response.json();
    })
    .then(data => {
      let cards = data.cards
      let deckName = data.deck_name
      let definitionTitles = data.definition_titles


      console.log(definitionTitles);
      let termTitle = data.term_title
      this.setState({
        cards: cards,
        deckName: deckName,
        definitionTitles: definitionTitles,
        termTitle: termTitle,
        numOfDefs: definitionTitles.length
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
        console.log("fetch post", card);
        console.log("state", cardJSON);
      })
    }

    saveDeckToDatabase() {
      let deckJSON = {
        deck_name: this.state.deckName,
        term_title: this.state.termTitle,
        definition_titles: this.state.definitionTitles,
        number_of_definitions: this.state.numOfDefs
      }
      console.log(deckJSON);
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
        .then(card => {
          console.log("fetch post", card);
          console.log("state", deckJSON);
        })
      }

    defNumChangeHandler(event){
      this.setState({numOfDefs: Number(event.target.value)})
    }

    componentDidMount(){
      this.fetchDeck(this.props.params.id)
    }

    render(){
      function sortById(a,b) {
        if (a.id < b.id){
          return -1;
        }
        return 1;
      }

      let onChangeHandler = (event) => {
        this.setState({termTitle: event.target.value})
      }

      let front = [(
        <input
          key = {"term-front"}
          className = "edit-front edit-input edit-term"
          type="text"
          value={this.state.termTitle}
          onChange={onChangeHandler}
          onBlur={this.saveDeckToDatabase}
          />
      )];

      let sortedTitles = this.state.definitionTitles.sort(sortById)
      for(let i=0; i<this.state.numOfDefs;i++){
        let title = sortedTitles[i]
        if(!title){
          title = {id:"front"+i, title:""}
        }

        onChangeHandler = (event) => {
          this.updateTitle(title.id, event.target.value)
        }

        front.push(
          <input
            key = {title.id+"dt"}
            className = "edit-front edit-input"
            type="text"
            value={title.title}
            onChange={onChangeHandler}
            onBlur={this.saveDeckToDatabase}
          />
        )
      }



      let sortedCards = this.state.cards.sort(sortById)
      let deck = sortedCards.map((card,idx) => {
        let handleOnBlur = () => {
          this.saveToDatabase(card.id)
        }

        let defTextArea = []
        for(let i=0; i<this.state.numOfDefs;i++){
          let sortedDefinitions = card.definitions.sort(sortById)
          let def = sortedDefinitions[i]
          if(!def){
            def = {id:"100"+idx+i, definition:""}
          }

          let defChangeHandler = (event) => {
            this.updateDefinition(card.id, def.id, event.target.value)
          }

          defTextArea.push(
            <textarea
              key={def.id+"def"+idx}
              className={"edit-def edit-input"}
              type="text"
              value={def.definition}
              onChange={defChangeHandler}
              placeholder={def.definition_title}
              onBlur={handleOnBlur}
            />
          )
        };

        let defChangeHandler = (event) => {
          this.updateDefinition(card.id, null, event.target.value)
        }

        return(
          <div key={card.id + "cards"} className="edit-card cell small-24 medium-12 large-8">
            <input
              className="edit-term edit-input"
              type="text"
              value={card.term}
              onBlur={handleOnBlur}
              onChange={defChangeHandler}
              />
            {defTextArea}
          </div>
        )
      })

      let dropdownOptions = []
      for(let i=1; i < 11; i++){
        if(i === this.state.numOfDefs){
          dropdownOptions.push(<option key={i} value={i} selected>{i}</option>)
        }else{
          dropdownOptions.push(<option key={i} value={i}>{i}</option>)
        }
      }

      return(
        <div className="flashcard-edit">
          <form>
            <h2><span className="flashcard-deck-name">{this.state.deckName}</span> - Edit Cards</h2>
            <h3>Front of Card</h3>
            <select onChange={this.defNumChangeHandler}>
              {dropdownOptions}
            </select>
            <div className="edit-card">
              {front}
            </div>
            <h3>Back of Card</h3>
            <div className="grid-x grid-margin-x">
            {deck}
            </div>
          </form>
        </div>
      );
    }
  };

  export default Edit
