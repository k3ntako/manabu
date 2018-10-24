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
    <div className="deck-tile" id={divId} onClick={handleClick}>
      <h2>{props.deckName}</h2>
    </div>
  );
};

export default DeckListItem;
