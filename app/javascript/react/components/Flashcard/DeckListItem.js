import React from 'react';

const DeckListItem = props => {
  let divId;
  if(props.selected){
    divId = "deck-selected";
  }

  let handleClick = () => {
    props.clickHandler(props.deckId)
  }

  return(
    <div className="deck-tile cell medium-24 large-12 xlarge-8" id={divId} onClick={handleClick}>
      <h2>{props.deckName}</h2>
    </div>
  );
};

export default DeckListItem;
