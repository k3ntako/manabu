import React, { Component } from 'react';
import NextBackButton from './NextBackButton';
import Flashcards from './Flashcards'

class Study extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeCardIdx: 0,
      cards: [],
      lastIdx: 0,
      deckName: "",
      termTitle: "",
      settings: this.props.location.state
    };

    this.next = this.next.bind(this);
    this.back = this.back.bind(this);
    this.fetchCards = this.fetchCards.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateMastery = this.updateMastery.bind(this)
  }

  next(){
    if(this.state.activeCardIdx >= this.state.lastIdx){
      this.setState({ activeCardIdx: 0 });
    }else{
      this.setState({ activeCardIdx: this.state.activeCardIdx + 1 });
    }
  }

  back(){
    if(this.state.activeCardIdx <= 0){
      this.setState({ activeCardIdx: this.state.lastIdx });
    }else{
      this.setState({ activeCardIdx: this.state.activeCardIdx - 1 });
    }
  };

  updateMastery(mastery){
    let cards = this.state.cards
    cards[this.state.activeCardIdx].masteries[0] = {"mastery": mastery}
    this.setState({cards: cards})
  }

  fetchCards(deckId) {
    let params = ""
    if(this.state.settings){
      Object.keys(this.state.settings).forEach(key => {
        params += key + "=" + this.state.settings[key] + "&"
      })
    }else{
      params = "noMastery=true&learning=true&almost=true&mastered=true&randomize=false"
    }
    console.log(params);

    fetch(`/api/v1/decks/${deckId}/cards?${params.slice(0, -1)}`)
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
      let len = cards.length -1
      let deckName = data.deck_name
      let termTitle = data.term_title

      this.setState({cards: cards, lastIdx: len, deckName: deckName, termTitle: termTitle})
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount(){
    this.fetchCards(this.props.params.id)
  }

  render(){
    let cardsPage = (<div className="cell small-20"></div>)

    if(this.state.cards.length){
      let cards = this.state.cards
      let activeCard = cards[this.state.activeCardIdx]
      let term = activeCard.term
      let definitions = activeCard.definitions
      let cardId = activeCard.id

      let mastery
      if(activeCard.masteries.length){
        mastery = activeCard.masteries[0].mastery
      }

      cardsPage = (
        <Flashcards
          term = {term}
          deckName = {this.state.deckName}
          termTitle = {this.state.termTitle}
          definitions = {definitions}
          activeCard = {activeCard}
          mastery = {mastery}
          cardId = {cardId}
          deckId = {Number(this.props.params.id)}
          activeIdx = {this.state.activeCardIdx}
          updateMastery = {this.updateMastery}
        />
      )
    }

    return(
      <div className="grid-x">
        <NextBackButton clickFunc={this.back} side="left"/>
        {cardsPage}
        <NextBackButton clickFunc={this.next} side="right"/>
      </div>
    );
  }
};

export default Study
