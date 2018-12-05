import React, { Component } from 'react';
import RemindersWidget from './RemindersWidget';
import Weather from './Weather';
import News from './News';

const DailyUpdate = (props) => {
  let name;
  if(props.currentUser){
    name = props.currentUser.current_user.first_name;
  }
  return(
    <div className="grid-x grid-margin-x grid-margin-y">
      <Weather darkMode={props.darkMode} firstName={name}/>
      <RemindersWidget />
      <News />
    </div>
  )
}

export default DailyUpdate
