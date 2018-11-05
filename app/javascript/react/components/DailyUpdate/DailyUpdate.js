import React, { Component } from 'react';
import MBTA from './MBTA';
import Weather from './Weather';

const DailyUpdate = () => {
  return(
    <div className="grid-x grid-margin-x">
      <Weather />
      <MBTA />
    </div>
  )
}

export default DailyUpdate
