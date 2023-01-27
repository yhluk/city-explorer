import React from "react";
import { Button, Card, Container, Form, Alert } from "react-bootstrap";
import axios from "axios";
import "./index.css"

class Main extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      displayInfo: false,
      city: '',
      cityData: {},
      error: false,
      errorMessage: ''
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
    this.setState({
      displayInfo: false,
      error: false
    })
    try {
      let response = await axios.get(url);
      this.setState({
        displayInfo: true,
        cityData: response.data[0]
      })
    } catch (err) {
      this.setState({
        error: true,
        errorMessage: err.message
      })
    }
  }



  render() {
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
      </>
    )
  }
}

export default Main;