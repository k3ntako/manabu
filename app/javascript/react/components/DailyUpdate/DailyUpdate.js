import React, { Component } from 'react';
import MBTA from './MBTA';
import Weather from './Weather';

class DailyUpdate extends Component {
constructor(props) {
    super(props);

    this.state = {

    };
    this.defaultRoute = "Green-C"
    this.defaultDirection = "Eastbound"
    this.defaultStation = "place-stpul"
    this.fetchData = this.fetchData.bind(this)
  }

  fetchData(url,fetchType){
    fetch(url)
    .then(response => {
      if (response.ok) {return response;}
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      this.setState({[fetchType]: data})

    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  };

  componentDidMount(){
    this.fetchData("https://api-v3.mbta.com/routes?filter[type]=0,1","routes");
    this.fetchData(`https://api-v3.mbta.com/stops?filter[route]=${this.defaultRoute}`,`stops`);
    this.fetchData(
      `https://api-v3.mbta.com/predictions?filter[stop]=place-stpul&filter[direction_id]=${this.defaultDirection }&filter[route]=${this.defaultRoute}&sort=departure_time&page[limit]=90&api_key=64a5296bc7e84128b2605d9d355a1d94`,"prediction")
  }

  render(){
    let mbtaHTML
    if(this.state.routes && this.state.stops && this.state.prediction){
      mbtaHTML = (
        <MBTA
          routes={this.state.routes}
          stops={this.state.stops}
          prediction={this.state.prediction}
        />)
    }

    return(
      <div className="grid-x grid-margin-x">
        <Weather />
        {mbtaHTML}
      </div>
    )
  }
}

export default DailyUpdate

//
// "https://api-v3.mbta.com/predictions?filter[direction_id]=Eastbound&filter[route]=Green-C&sort=departure_time&page[limit]=5&api_key=64a5296bc7e84128b2605d9d355a1d94"
