import React from 'react';
import Carousel from 'react-elastic-carousel';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardMedia, Button, Typography } from '@material-ui/core'

class Outfit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outfit: [{thing: 1}]
    }
  }


  render() {
    return (
      <Carousel itemsToShow={4}>
        {this.state.outfit.map((item) => {(
          <Card>
            <Typography> yo its and item of an ouitfit! </Typography>
          </Card>
        )})}
      </Carousel>
    )
  }
}

export default Outfit;