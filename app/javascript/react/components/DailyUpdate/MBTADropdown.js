import React from 'react'

const MBTADropdown = props => {
  let information = props.data
  let outputHTML = information.map(info => {
    let showText = info.attributes[props.displayedAttribute]

    let selected;
    if(info.id === props.default){
      selected="selected"
    }

    return(
      <option key={info.id} id={info.id} value={info.id} selected={selected}>{showText}</option>
    )
  })

  return(
    <select onChange={props.changeHandler}>
      {outputHTML}
    </select>
  )
}

export default MBTADropdown
