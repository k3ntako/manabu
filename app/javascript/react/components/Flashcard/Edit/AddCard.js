import React from 'react';

const AddCard = props => {
  let addNewCardTextarea = props.definitionTitles.map(title =>{
    return(
      <textarea
        key={title.id}
        className={"edit-def edit-input"}
        type="text"
        placeholder={title.title}
        disabled={true}
        />
    )
  })

  let addCardButtonClass = " inactive";
  let addCardDisabled = true;
  let newTerm = props.newCardTerm.replace(/\s+/g,'');
  if(!props.formDisabled && newTerm){
    addCardButtonClass = "";
    addCardDisabled = false;
  }

  return(
    <div className="edit-card cell flashcard-new-card small-24 medium-12 large-8">
      <form onSubmit={props.saveNewCardToDatabase}>
        <div>
          <input
            className="edit-term edit-input add-card-input"
            type="text"
            value={props.newCardTerm}
            onChange={props.newCardChangeHandler}
            disabled={props.formDisabled}
            />
          <input
            type="submit"
            className={"standard-green-button add-card-button " + addCardButtonClass}
            id="add-card-button"
            value="Add"
            disabled={props.formDisabled || addCardDisabled}
            />
        </div>

        {addNewCardTextarea}

      </form>
    </div>
  );
};

export default AddCard
