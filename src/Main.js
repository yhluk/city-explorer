import React from "react";
import { Button, Card, Container, Form, Alert } from "react-bootstrap";
import axios from "axios";
import "./index.css"
import Weather from "./Weather";

class Main extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      displayInfo: false,
      city: '',
      cityData: {},
      error: false,
      errorMessage: '',
      weatherData: []
    }
  }



  handleSearchInput = (event) => {
    let cityName = event.target.value;
    this.setState({
      city: cityName
    })
  }

  getApiData = async (event) => {
    event.preventDefault();
    let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.city}&format=json`

    let urlWeather = `${process.env.REACT_APP_SERVER}/weather?searchQuery=${this.state.city}`

    this.setState({
      displayInfo: false,
      error: false
    })
    try {
      let response = await axios.get(url);
      let weatherResponse = await axios.get(urlWeather);

      this.setState({
        displayInfo: true,
        cityData: response.data[0],
        weatherData: weatherResponse.data
      
      })
    } catch (err) {
      this.setState({
        error: true,
        errorMessage: err.message
      })
    }
  }



  render() {
    console.log(this.state.weatherData)
    return (
      <>
        <Container>
          <Form onSubmit={this.getApiData}>
            <Form.Group>
              <Form.Label>Enter City</Form.Label>
              <Form.Control type="text" onInput={this.handleSearchInput} />
            </Form.Group>
            <Button onClick={this.getApiData}>Explore!</Button>
          </Form>
        </Container>

        {this.state.displayInfo &&
          <>
            <Card>
              <Card.Body>
                <Card.Title>{this.state.cityData.display_name}</Card.Title>
                <Card.Text>Lat:  {this.state.cityData.lat}  Lon: {this.state.cityData.lon}</Card.Text>
                <Card.Img width="500" height="500" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&markers=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=7`} alt="city map" />
              </Card.Body>
            </Card></>
        }
       
        {this.state.error &&
          <>
            <Alert variant="danger">
              {this.state.errorMessage}
            </Alert>
          </>
        } 
        <Weather
        weatherDay={this.state.weatherData}
        />
        
      </>
    )
  }
}

export default Main;