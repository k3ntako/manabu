import React, { Component } from 'react';
import MBTADropdown from './MBTADropdown';
import Predictions from './Predictions';


class MBTA extends Component {
constructor(props) {
    super(props);

    this.state = {
      routes: this.props.routes,
      selectedRoute: "Green-C",
      stops : this.props.stops,
      selectedStation: "place-stpul",
      stationPrediction: this.props.prediction,
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

  fetchData(url,fetchType){
      fetch(url)
      .then(response => {
        if (response.ok) {return response;}
      })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({[fetchType]: data});
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    };

    getDirections(){
      if (this.state.routes){
        this.state.routes.data.forEach(route =>{
          if(route.id === this.state.selectedRoute){
            this.setState({directions: route.attributes.direction_names.sort()})
          }
        })
      }
      this.getStops();
    }

    getPredictions(stopName){
      console.log(stopName, this.state.selectedRoute,this.state.selectedDirection)
      this.fetchData(
        `https://api-v3.mbta.com/predictions?filter[stop]=${stopName}&filter[direction_id]=${this.state.selselectedDirection}&filter[route]=${this.state.selectedRoute}&sort=departure_time&page[limit]=90&api_key=64a5296bc7e84128b2605d9d355a1d94`,
        `stationPrediction`
      );
    }

    getStops(){
      this.fetchData(`https://api-v3.mbta.com/stops?filter[route]=${this.state.selectedRoute}`,`stops`);
      this.getPredictions();
    }

    stopsChangeHandler(event){
      this.setState({selectedStation: event.target.value})
      this.getPredictions(event.target.value);
    }

    directionsChangeHandler(event){
      this.getStops();
    }

    routesChangeHandler(event){
      this.setState(
        {selectedRoute : event.target.value},
        () => {this.getDirections()}
      );
    }

  render(){
    let routesHTML
    if(this.state.routes && Object.keys(this.state.routes).length != 0){
      routesHTML = (
        <MBTADropdown
          data={this.state.routes.data}
          default={this.state.selectedRoute}
          displayedAttribute = {"long_name"}
          changeHandler = {this.routesChangeHandler}
        />
      )
    }

    let stopsHTML;
    if(this.state.stops && Object.keys(this.state.stops).length != 0){
      stopsHTML = (<MBTADropdown
        data={this.state.stops.data}
        default={this.selectedStation}
        displayedAttribute = {"name"}
        changeHandler = {this.stopsChangeHandler}
        />
      )
    }

    let directionsHTML;
    if(this.state.directions){
      directionsHTML = (
        <MBTADropdown
          data={[
            {attributes: {directions: this.state.directions[0]},
            id: this.state.directions[0]},
            {attributes: {directions: this.state.directions[1]},
            id: this.state.directions[1]}
          ]}
          default={this.selectedDirection}
          displayedAttribute = {"directions"}
          changeHandler = {this.directionsChangeHandler}
        />
      )
    }

    return(
      <div className="cell small-24 medium-12">
        {routesHTML}
        {directionsHTML}
        {stopsHTML}

        <Predictions stationPrediction={this.state.stationPrediction}/>
      </div>
    )
  }
}

export default MBTA
