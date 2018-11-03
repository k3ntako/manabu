import React from 'react'

const StyleButton = props => {
  function onToggle(e){
    e.preventDefault();
    props.onToggle(props.style);
  };

  let className = 'notes-style-button';
  if (props.active) {
    className += ' notes-style-button-active';
  }

  return (
    <span className={className} onMouseDown={onToggle}>
    {props.label}
    </span>
  );
}

export default StyleButton
