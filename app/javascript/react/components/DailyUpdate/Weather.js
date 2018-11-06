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
    let weatherURL = `/api/v1/weather/?latitude=${this.state.latitude}&longitude=${this.state.longitude}&units=auto`;
    fetch(weatherURL)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(data => {
      let temperature = data.temperature.toFixed(0)
      this.setState({
        summary: data.summary,
        temp: `${temperature}˚F`,
        location: data.location
      })
      return data.icon.toUpperCase().replace(/-/g,"_");
    })
    .then(icon => {
      var skycons = new Skycons({"color": "steelblue"});
      skycons.add("icon1", Skycons[icon]);
      skycons.play();
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

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
