import React, { Component } from 'react';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show
    };

    this.flipCard = this.flipCard.bind(this);
  }

  flipCard() {
    if (this.state.show){
      this.setState({ show:false });
    }else{
      this.setState({ show:true });
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({show: nextProps.show})
  }

  render(){
    let innerT
    if(this.state.show){
      innerT = this.props.definition;
    }else{
      innerT = this.props.title;
    }

    let className = "flashcard"
    if (this.props.mastery){
      className += ` ${this.props.mastery.toLowerCase()}`
    }
    let idName = "";
    if (this.props.idName){
      idName += `${this.props.idName}`
      className += ` ${this.props.idName}`
    }

    return(
    <div className = {className} onClick={this.flipCard}>
      <h1 className="card-text" id={idName}>{innerT}</h1>
    </div>
  );
  }
};

export default Card;
