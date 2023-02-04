import React from "react";
import { Card, Container } from "react-bootstrap";




class Weather extends React.Component {
  render() {
    return (
      <Container className="weatherCard"  >
        
      {this.props.weatherDay.map((day, idx) =>
          <Card
            border="success"
            style={{
              width: '10rem',
              height: '20rem !important'
            }}
            key={idx}>
            <Card.Title>{day.description}</Card.Title>
            <Card.Text>{day.date}</Card.Text>
            <Card.Img
              src="https://i.pinimg.com/564x/a4/e1/ce/a4e1ce66480e82f91395b3560653a827.jpg" />
          </Card>

      )}
        </Container>
    )
  }
}

export default Weather;