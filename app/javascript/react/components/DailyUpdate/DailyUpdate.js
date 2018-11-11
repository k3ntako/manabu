import React, { Component } from 'react';
import MBTA from './MBTA';
import Weather from './Weather';
import News from './News';

const DailyUpdate = (props) => {
  return(
    <div className="grid-x grid-margin-x grid-margin-y">
      <Weather darkMode={props.darkMode} />
      <MBTA />
      <News />
    </div>
  )
}

export default DailyUpdate
