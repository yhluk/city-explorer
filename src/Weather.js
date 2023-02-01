import React from "react";
import { Card, Container } from "react-bootstrap";




class Weather extends React.Component {
  render() {
    // console.log("weather in card", this.props.weatherDay[0].description)
    return (
   
      this.props.weatherDay.map((day, idx) =>
        <Container  >
         
              <Card
              border="success"
                style={{
                  width: '10rem',
                  height: 'auto',
                  display: 'flex',
                  border: '2px solid'
                }}
                key={idx}>
                <Card.Title>{day.description}</Card.Title>
                <Card.Text>{day.date}</Card.Text>
                <Card.Img
                src="https://i.pinimg.com/564x/a4/e1/ce/a4e1ce66480e82f91395b3560653a827.jpg" />
              </Card>
          
        </Container>
      )
    )
  }
}

export default Weather;