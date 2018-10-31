import React, { Component } from 'react';

class Weather extends Component {
constructor(props) {
    super(props);
    this.state = {
      latitude: 42.354046,
      longitude: -71.058831,
      temp: "weather",
      summary: "loading",
      locatiion: ""
    };

    this.getLocation = this.getLocation.bind(this)
    this.error = this.error.bind(this)
    this.fetchWeather = this.fetchWeather.bind(this)
    this.showPosition = this.showPosition.bind(this)
    this.fetchLocation = this.fetchLocation.bind(this)
  }

  getLocation(){
    if (!navigator.geolocation){
      alert("Geolocation is not supported by this browser!");
    }
    navigator.geolocation.getCurrentPosition(this.showPosition, this.error);
  }

  error() {
    alert("Unable to retrieve your location! Allow the browser to track your location!");
  }

  showPosition(position) {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    })
    this.fetchWeather()
  }

  fetchWeather() {
    let weatherURL = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/c89e5685e5401ac3737c71e59af42160/${this.state.latitude},${this.state.longitude}?units=auto`;
    //Issue with cors, originally:
    // `https://api.darksky.net/forecast/c89e5685e5401ac3737c71e59af42160/${this.state.latitude},${this.state.longitude}?units=auto`
    fetch(weatherURL, {mode: 'cors'})
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      let temperature = data.currently.temperature.toFixed(0)
      this.setState({
        summary: data.currently.summary,
        temp: `${temperature}˚F`
      })
      return data.currently.icon.toUpperCase().replace(/-/g,"_");
    })
    .then(icon => {
      var skycons = new Skycons({"color": "steelblue"});
      skycons.add("icon1", Skycons[icon]);
      skycons.play();
      return true
    })
    .then(t =>{
      this.fetchLocation()
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  fetchLocation() {
    fetch(`http://dev.virtualearth.net/REST/v1/Locations/${this.state.latitude},${this.state.longitude}\?o\=json\&key\=AsbQAbgVHnzwtssxSVoDItRquUjYSnZaHNAOFCRRTZzuJ0l6oBJBM89W5aVd1gza`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => {
      return response.json()
    })
    .then(data => {
      this.setState({
        location: data.resourceSets[0].resources[0].name
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  };

  componentDidMount(){
    this.fetchWeather()
    this.getLocation()
  }

  render(){
    return(
      <div className="weather cell small-24 medium-12">
        <canvas id="icon1"></canvas>
        <p className="newsDescription weatherInfo">
          <span className="weatherInfoText current" id="temp">{this.state.summary} | {this.state.temp}</span><br />
          <span className="weatherInfoText current" id="location">{this.state.location}</span>
        </p>
      </div>
    )
  }
}

export default Weather
