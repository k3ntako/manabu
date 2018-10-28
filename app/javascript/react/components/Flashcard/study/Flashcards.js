import React, { Component } from 'react';
import Card from "./Card"
import MasteryButton from './MasteryButton';

class Flashcards extends Component {
  debugger
  constructor(props) {
    super(props);

    this.state = {
      terms: this.props.term,
      definitions: this.props.definitions,
      mastery: this.props.mastery,
      showAll: false
    };
    this.setMastery = this.setMastery.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }

  setMastery(event) {
    let buttonId = event.target.attributes.id.value;
    let newMastery = buttonId.replace(/-button/g,"")
    let newMasteryJSON = {mastery: newMastery}
    let cardId = this.props.cardId

    let jsonStringInfo = JSON.stringify(newMasteryJSON)
    console.log("jsonStringInfo",jsonStringInfo);
    fetch(`/api/v1/decks/${this.props.deckId}/cards/${cardId}/masteries`, {
      method: 'POST',
      body: jsonStringInfo,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json' },
      credentials: 'same-origin'
    })
    .then(data => data.json())
    .then(mastery => {
      console.log(mastery, "fetch post");
      console.log(this.state.mastery);
      this.setState({
        mastery: mastery.mastery.mastery
      })
      this.props.updateMastery(mastery.mastery.mastery)
    })
  }

  toggleShow(){
    this.setState({showAll: !this.state.showAll})
  }

  componentWillReceiveProps(nextProps){
    this.setState({mastery: nextProps.mastery})
  }

  render(){
    let activeIdx = this.props.activeIdx
    let definitionCards = this.props.definitions.map(def => {
      return(
        <Card
          key={def.id}
          type={"Definition"}
          title={def.definition_title}
          definition = {def.definition}
          show = {this.state.showAll}
        />
      )
    })

    let toggleClass = "far "
    if(this.state.showAll){
      toggleClass += "fa-eye-slash"
    }else{
      toggleClass += "fa-eye"
    }

    return(
      <div className="cell small-20">
        <h1 className="flashcard-deck-name">{this.props.deckName}</h1>
        <div className = "flashcards">
          <Card
            key = {activeIdx}
            type={"Term"}
            title={this.props.activeCard.term_title}
            definition = {this.props.term}
            show = {true}
            mastery = {this.state.mastery}
            idName="term"
          />

          {definitionCards}
        </div>

        <div className="css-grid-container card-control-bar">
          <MasteryButton direction={"learning"} clickFunc={this.setMastery}/>
          <MasteryButton direction={"almost"} clickFunc={this.setMastery}/>
          <MasteryButton direction={"mastered"} clickFunc={this.setMastery}/>
        </div>

        <div id="toggle">
          <i onClick={this.toggleShow} className={toggleClass} title="Toggle Show"></i>
        </div>
      </div>
    );
  }
};

export default Flashcards;
