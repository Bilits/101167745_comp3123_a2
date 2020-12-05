import React, { Component } from 'react'
import axios from './axios'
import style from './style.css';

export default class weather extends Component {
  constructor(props) {
    var today = new Date(),
      date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var today = new Date(),
      time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

    super(props);
    this.state = {
      main: null,
      weather: null,
      data: null,
      wind: null,
      isMounted: false,
      currentDateTime: time,
      currentDate: date
    };
  }
  getWeatherData() {
    axios.get(``, {})
      .then(res => {
        const main = res.data.main
        const weather = res.data.weather[0]
        const data = res.data
        const wind = res.data.wind
        this.setState({ main: main, weather: weather, data: data, wind : wind, isMounted: true })
      })
      .catch((error) => {
        console.log(error)
      })

  }
  componentDidMount() {
    this.getWeatherData()
  }
  render() {
    const { main, isMounted, weather, data, wind } = this.state
    if (isMounted) {
      return (
        <div class="container-fluid px-1 px-sm-3 py-5 mx-auto" style={style}>
          <div class="row d-flex justify-content-center">
            <div class="row card0">
              <div class="card1 col-lg-8 col-md-7"> <small>weather forecast</small>
                <div class="text-center"> <img class="image mt-5" src="https://i.imgur.com/M8VyA2h.png" alt="this is weather forecast"/> </div>
                <div class="row px-3 mt-3 mb-3">
                  <h1 class="large-font mr-3">{main.temp}&#176;</h1>
                  <div class="d-flex flex-column mr-3">
                    <h2 class="mt-3 mb-0">{data.name}</h2> <small>{this.state.currentDateTime} {this.state.currentDate}</small>
                  </div>
                  <div class="d-flex flex-column text-center">
                    <h3 class="fa fa-sun-o mt-4"></h3> <small>{weather.description}</small>
                  </div>
                </div>
              </div>
              <div class="card2 col-lg-4 col-md-5">
                {/* <div class="row px-3"> <input type="text" name="location" placeholder="Another location" class="mb-5" />
                  <div class="fa fa-search mb-5 mr-0 text-center"></div>
                </div> */}
                <div class="mr-5">
                  {/* <p class="light-text suggestion">Birmingham</p>
                  <p class="light-text suggestion">Manchester</p>
                  <p class="light-text suggestion">New York</p>
                  <p class="light-text suggestion">California</p> */}
                  <div class="line my-5"></div>
                  <p>Weather Details</p>
                  <div class="row px-3">
                    <p class="light-text">Cloudy</p>
                    <p class="ml-auto">12%</p>
                  </div>
                  <div class="row px-3">
                    <p class="light-text">Humidity</p>
                    <p class="ml-auto">{main.humidity}%</p>
                  </div>
                  <div class="row px-3">
                    <p class="light-text">Wind</p>
                <p class="ml-auto">{wind.speed}km/h</p>
                  </div>
                  <div class="row px-3">
                    <p class="light-text">visibility</p>
                    <p class="ml-auto">{data.visibility}</p>
                  </div>
                  <div class="line mt-3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          loading...
        </div>
      )
    }
  }
}