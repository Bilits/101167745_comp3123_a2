import React, { Component } from 'react'
import axios from './axios'
import style from './style.css';
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import { CardGroup, Image } from 'react-bootstrap';

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
      coord: null,
      icon: null,
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
        const coord = res.data.coord
        let icon = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`
        console.log(weather.icon)

        this.setState({ main: main, coord: coord, weather: weather, data: data, wind: wind, icon: icon, isMounted: true })
      })
      .catch((error) => {
        console.log(error)
      })

  }
  componentDidMount() {
    this.getWeatherData()
  }
  render() {
    const { icon, main, isMounted, weather, data, coord, wind } = this.state
    if (isMounted) {
      return (

        <div class="container-fluid px-1 px-sm-3 py-5 mx-auto" style={style}>
          <nav class="navbar navbar-dark bg-dark">
            <a class="navbar-brand">Weather Forecase</a>
            <form class="form-inline">
              <button class="btn btn-success my-4 my-sm-0" type="button">{data.name}</button>
            </form>
          </nav>
          <div class="row d-flex justify-content-center">
            <div class="row card0">
              <div class="card1 col-lg-8 col-lg-7">
                <div class="text-center"> <img class="image mt-5" src="https://i.imgur.com/M8VyA2h.png" alt="this is weather forecast" /> </div>
                <div class="hi row px-3 mt-3 mb-3">
                  <h1 class="large-font mr-3">{main.temp}&#176;</h1>
                  <div class="d-flex flex-column mr-3">
                    <h2 class="mt-3 mb-0">{weather.description}  <img src={icon} style={{ width: '5rem' }} /></h2> <small>{this.state.currentDateTime} {this.state.currentDate}</small>
                  </div>
                </div>
                <CardGroup>
                  <Card style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Title>Longitude</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">{coord.lon}</Card.Subtitle>
                      <Card.Text>
                        Longitude is the measurement east or west of the prime meridian. Longitude is measured by imaginary lines that run around the Earth vertically
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  <Card style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Title>Latitude</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">{coord.lat}</Card.Subtitle>
                      <Card.Text>
                        the angular distance of a place north or south of the earth's equator, or of a celestial object north or south of the celestial equator
                      </Card.Text>

                    </Card.Body>
                  </Card>
                  <Card style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Title>Humidity</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">{main.humidity}%</Card.Subtitle>
                      <Card.Text>
                        Humidity is the concentration of water vapor present in the air. Water vapor, the gaseous state of water, is generally invisible to the human eye
                      </Card.Text>

                    </Card.Body>
                  </Card>
                </CardGroup>
              </div>
              <div class="card2 col-lg-4 col-md-5">
                <div class="mr-5">
                  <div class="line my-5"></div>
                  <p>Weather Details</p>
                  <div class="row px-3">
                    <p class="light-text">Pressure</p>
                    <p class="ml-auto">{main.pressure}</p>
                  </div>
                  <div class="row px-3">
                    <p class="light-text">Grnd_level</p>
                    <p class="ml-auto">{main.grnd_level}</p>
                  </div>
                  <div class="row px-3">
                    <p class="light-text">Wind</p>
                    <p class="ml-auto">{wind.speed}km/h</p>
                  </div>
                  <div class="row px-3">
                    <p class="light-text">Visibility</p>
                    <p class="ml-auto">{data.visibility}</p>
                  </div>
                  <div class="row px-3">
                    <p class="light-text">Feels_like</p>
                    <p class="ml-auto">{main.feels_like}</p>
                  </div>
                  <div class="row px-3">
                    <p class="light-text">Temp_min</p>
                    <p class="ml-auto">{main.temp_min}</p>
                  </div>
                  <div class="row px-3">
                    <p class="light-text">Temp_max</p>
                    <p class="ml-auto">{main.temp_max}</p>
                  </div>
                  <div class="row px-3">
                    <p class="light-text">Sea_level</p>
                    <p class="ml-auto">{main.sea_level}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <nav class="navbar navbar-dark bg-dark">
            <a class="navbar-brand">&#169; Mohammad Abdolhosseini</a>
            <form class="form-inline">
            </form>
          </nav>
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