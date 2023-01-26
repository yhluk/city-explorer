import React from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import axios from "axios";
import "./index.css"

class Main extends React.Component{

constructor(props){
  super(props);

  this.state = {
    displayInfo: false,
    city: '',
    cityData: {}
  }
}

handleSearchInput = (event) => {
  let cityName = event.target.value;
  this.setState({
    city: cityName
  })
}

  displaySearch = async(event) => {
    event.preventDefault();

let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.city}&format=json`

let response = await axios.get(url);

console.log(response.data[0])

    this.setState({
      displayInfo: true,
      cityData: response.data[0]

    })
  }

  render(){
    return(
      <>
        <Container>
          <Form>
            <Form.Group>
              <Form.Label>Enter City</Form.Label>
              <Form.Control type="text" onInput={this.handleSearchInput}/>
            </Form.Group>
            <Button onClick={this.displaySearch}>Explore!</Button>
          </Form>
        </Container>

        {this.state.displayInfo &&
          <><Card>
            <Card.Title>{this.state.cityData.display_name}</Card.Title>
            <Card.Text>Lat:  {this.state.cityData.lat}  Lon: {this.state.cityData.lon}</Card.Text>
          </Card></>
        }
      </>
    )
  }
}

export default Main;