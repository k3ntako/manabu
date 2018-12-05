import React, { Component } from 'react';

class Weather extends Component {
constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      temp: "weather",
      summary: "loading",
      location: "",
      icon: null
    };

    this.getLocation = this.getLocation.bind(this)
    this.fetchWeather = this.fetchWeather.bind(this)
    this.showPosition = this.showPosition.bind(this)
  }

  getLocation(){
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(this.showPosition);
    }
  }

  showPosition(position) {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    }, () =>{
      this.fetchWeather()
    })
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
      this.setState({icon: icon})
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount(){
    this.fetchWeather()
    this.getLocation()
  }

  render(){
    if(this.state.icon){
      let color = "steelblue";
      if(this.props.darkMode){
        color = "white";
      }

      let skycons = new Skycons({"color": color});
      let icon = this.state.icon;
      skycons.add("icon1", Skycons[icon]);
      skycons.play();
    }

    let name = "";
    if(this.props.firstName){
      name = `, ${this.props.firstName}`
    }

    return(
      <div className="weather cell small-24 medium-12">
        <h2>Welcome{name}!</h2>
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
