import React from 'react';
import AddCard from './AddCard'

const Cards = props => {
  let deck = props.sortedCards.map((card,idx) => {
    let handleOnBlur = () => {
      props.saveToDatabase(card.id)
    }

    let defTextArea = []
    for(let i=0; i < props.numOfDefs;i++){
      let sortedDefinitions = card.definitions.sort(props.sortFunc)

      let def = sortedDefinitions[i]
      if(!def){
        def = {id:"new"+idx+i, definition:""}
      }

      let defChangeHandler = (event) => {
        props.updateDefinition(card.id, def.id, event.target.value)
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
          disabled={props.formDisabled}
          />
      )
    };

    let defChangeHandler = (event) => {
      props.updateDefinition(card.id, null, event.target.value)
    }

    return(
      <div key={card.id + "cards"} className="edit-card cell small-24 medium-12 large-8">
        <input
          className="edit-term edit-input"
          type="text"
          value={card.term}
          onBlur={handleOnBlur}
          onChange={defChangeHandler}
          disabled={props.formDisabled}
          />
        {defTextArea}
      </div>
    )
  })

  return(
    <div className="grid-x grid-margin-x grid-margin-y grid-padding-x">
      {deck}
      <AddCard
        definitionTitles={props.definitionTitles}
        newCardTerm={props.newCardTerm}
        formDisabled={props.formDisabled}
        newCardChangeHandler={props.newCardChangeHandler}
        saveNewCardToDatabase={props.saveNewCardToDatabase}
      />
    </div>
  );
};

export default Cards
