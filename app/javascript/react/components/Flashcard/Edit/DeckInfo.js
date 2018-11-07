import React from 'react';

const DeckInfo = props => {
  let definitionTitles = [];

  let termChangeHandler = (event) => {
    props.termChangeHandler(event.target.value)
  }

  for(let i=0; i < props.numOfDefs;i++){
    let title = props.sortedTitles[i];

    let titleChangeHandler = (event) => {
      props.updateTitle(title.id, event.target.value);
    }

    definitionTitles.push(
      <input
        key = {title.id+"dt"}
        id={title.id}
        className = "edit-front edit-input"
        type="text"
        value={title.title}
        onChange={titleChangeHandler}
        onBlur={props.saveDeckToDatabase}
      />
    )
  }

  let addTitlesButton;
  if(props.formDisabled){
    addTitlesButton = (
      <div
        className="standard-green-button"
        onClick={props.saveNewTitlesToDatabase}>
        Add New Titles
      </div>)
  }

  return(
    <div className="edit-card edit-title">
      <input
        key = {"term-front"}
        className = "edit-front edit-input edit-term"
        type="text"
        value={props.termTitle}
        onChange={termChangeHandler}
        onBlur={props.saveDeckToDatabase}
        />
      {definitionTitles}
      {addTitlesButton}
    </div>
  );

};

export default DeckInfo
