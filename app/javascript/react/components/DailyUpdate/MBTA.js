import React, { Component } from 'react';
import MBTADropdown from './MBTADropdown';
import Predictions from './Predictions';

class MBTA extends Component {
  constructor(props) {
    super(props);

    this.state = {
      routes: [],
      selectedRoute: "Green-C",
      stops: [],
      selectedStation: "place-stpul",
      stationPrediction: [],
      directions: ["Eastbound","Westbound"],
      selectedDirection: "Eastbound"
    };

    this.fetchData = this.fetchData.bind(this);
    this.stopsChangeHandler = this.stopsChangeHandler.bind(this);
    this.routesChangeHandler = this.routesChangeHandler.bind(this);
    this.directionsChangeHandler = this.directionsChangeHandler.bind(this);
    this.getDirections = this.getDirections.bind(this);
    this.getPredictions = this.getPredictions.bind(this);
    this.getStops = this.getStops.bind(this);
  }

  fetchData(url,fetchType, callback = () => {}){
    fetch(url)
    .then(response => {
      if (response.ok) {return response;}
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      this.setState(
        {[fetchType]: data},
        () => {callback()}
      );
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  };

  getDirections(){
    if (this.state.routes){
      this.state.routes.forEach(route =>{
        if(route.id === this.state.selectedRoute){
          this.setState(
            {directions: route.direction_names.sort()},
            () => {this.getStops()}
          )
        }
      })
    }
  }

  getStops(){
    this.fetchData(`/api/v1/mbta/stops/?route=${this.state.selectedRoute}&direction=${this.state.selectedDirection}`,`stops`, this.getPredictions);
  }

  getPredictions(){
    this.fetchData(
      `/api/v1/mbta/predictions/?stop=${this.state.selectedStation}&direction=${this.state.selectedDirection}&route=${this.state.selectedRoute}`,
      `stationPrediction`
    );
  }

  routesChangeHandler(event){
    this.setState(
      {selectedRoute : event.target.value},
      () => {this.getDirections()}
    );
  }

  directionsChangeHandler(event){
    this.setState(
      {selectedDirection: event.target.value},
      () => {this.getStops()}
    );
  }

  stopsChangeHandler(event){
    this.setState(
      {selectedStation: event.target.value},
      () => {this.getPredictions()}
    );
  }

  componentDidMount(){
    this.fetchData("/api/v1/mbta/routes","routes",this.getDirections);
  }

  render(){
    let routesHTML
    if(this.state.routes.length){
      routesHTML = (
        <MBTADropdown
          data={this.state.routes}
          default={this.state.selectedRoute}
          displayedAttribute = {"name"}
          changeHandler = {this.routesChangeHandler}
          />
      )
    }

    let stopsHTML;
    if(this.state.stops.length){
      stopsHTML = (<MBTADropdown
        data={this.state.stops}
        default={this.selectedStation}
        displayedAttribute = {"name"}
        changeHandler = {this.stopsChangeHandler}
        />
    )
  }

  let directionsHTML;
  if(this.state.directions.length){
    directionsHTML = (
      <MBTADropdown
        data={[
          {directions: this.state.directions[0],
            id: this.state.directions[0]},
            {directions: this.state.directions[1],
              id: this.state.directions[1]}
            ]}
            default={this.selectedDirection}
            displayedAttribute = {"directions"}
            changeHandler = {this.directionsChangeHandler}
            />
        )
      }

      return(
        <div className="cell small-24 medium-12 mbta">
          {routesHTML}
          {directionsHTML}
          {stopsHTML}

          <Predictions stationPrediction={this.state.stationPrediction}/>
        </div>
      )
    }
  }

  export default MBTA
