import React, { Component } from 'react';
import RemindersWidget from './RemindersWidget';
import Weather from './Weather';
import News from './News';

const DailyUpdate = (props) => {
  return(
    <div className="grid-x grid-margin-x grid-margin-y">
      <Weather darkMode={props.darkMode} />
      <RemindersWidget />
      <News />
    </div>
  )
}

export default DailyUpdate
