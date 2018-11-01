import React, { Component } from 'react';

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
      errors: []
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
    .then(response => {
      return response.json();
    })
    .then(data => {
      let cards = data.cards
      let deckName = data.deck_name
      let definitionTitles = data.definition_titles

      let termTitle = data.term_title
      this.setState({
        cards: cards,
        deckName: deckName,
        definitionTitles: definitionTitles,
        termTitle: termTitle,
        numOfDefs: definitionTitles.length,
        oldNumOfDefs: definitionTitles.length
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
          debugger
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

  componentDidMount(){
    this.fetchDeck(this.props.params.id)
  }

  render(){

    function sortById(a,b) {
      // debugger
      if (a.id.toString() < b.id.toString()){
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
    console.log(sortedTitles);
    for(let i=0; i<this.state.numOfDefs;i++){
      let title = sortedTitles[i]
      // if(!title){
      //   title = {id:"front"+i, title:""}
      // }

      onChangeHandler = (event) => {
        console.log(event.target.id);
        this.updateTitle(title.id, event.target.value)
      }

      front.push(
        <input
          key = {title.id+"dt"}
          id={title.id}
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
          def = {id:"new"+idx+i, definition:""}
        }

        let defChangeHandler = (event) => {
          this.updateDefinition(card.id, def.id, event.target.value)
        }

        let defVal = ""
        if(def.definition != "No Definition"){
          defVal = def.definition
        }

        defTextArea.push(
          <textarea
            key={def.id+"def"+idx}
            className={"edit-def edit-input"}
            type="text"
            value={defVal}
            onChange={defChangeHandler}
            placeholder={def.definition_title}
            onBlur={handleOnBlur}
            disabled={this.state.formDisabled}
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
            disabled={this.state.formDisabled}
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

    let addTitlesButton;
    if(this.state.formDisabled){
      addTitlesButton = (<div className="flashcard-save-edit" onClick={this.saveNewTitlesToDatabase}>Add New Titles</div>)
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
          <h2><span className="flashcard-deck-name">{this.state.deckName}</span> - Edit Cards</h2>
          <h3>Titles</h3>
          <select onChange={this.defNumChangeHandler}>
            {dropdownOptions}
          </select>
          <div className="edit-card edit-title">
            {front}
            {addTitlesButton}
          </div>
          <h3>Cards</h3>
          <div className="grid-x grid-margin-x grid-margin-y grid-padding-x">
            {deck}
          </div>
        </form>
      </div>
    );
  }
};

export default Edit
