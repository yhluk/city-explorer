import React from "react";
import { Card, Container } from "react-bootstrap";




class Movies extends React.Component {
  handleModalWindow = () => {
    this.props.handleShowModal(this.props.title, this.props.image_url, this.props.description)
  }
  render() {
    return (
      <Container  >
        
      {this.props.movieList.map((
        // title, overview, average_votes,total_votes, image_url, popularity, released_on, 
        movie, idx) =>
          <Card 
            className="movieCard"
            border="success"
            style={{
              width: '10rem',
              // color: 'red',
              // height: '20px'
            }}
            key={idx}
            onClick={this.handleModalWindow}
            >
             <Card.Title>{movie.title}</Card.Title>
             <Card.Text>{movie.released_on}</Card.Text>
            <Card.Img
                        // onClick={this.handleModalWindow}

              src={`https://www.themoviedb.org/t/p/w1280/${movie.image_url}`}
              alt='no poster available :('/>
          </Card>

   )} 
        </Container>
    )
  }
}

export default Movies;