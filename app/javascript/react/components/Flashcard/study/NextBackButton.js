import React from 'react';

const NextBackButton = props => {
  let iClassName = `card-control fas fa-chevron-${props.side}`

  return(
    <div className="card-control cell small-2">
      <i onClick={props.clickFunc} className={iClassName}></i>
    </div>
  )
}

export default NextBackButton
