import React, { Component } from 'react';
import MBTA from './MBTA';
import Weather from './Weather';
import News from './News';

const DailyUpdate = () => {
  return(
    <div className="grid-x grid-margin-x grid-margin-y">
      <Weather />
      <MBTA />
      <News />
    </div>
  )
}

export default DailyUpdate
