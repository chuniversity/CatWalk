import React from 'react';
import axios from 'axios';
import Rating from '@material-ui/lab/Rating';
import { Card, CardMedia, Button, Typography, Grid } from '@material-ui/core'
import access from '../../../../../config.js';


// <OutfitItem
// changeCurrentProduct={props.changeCurrentProduct}
// produtId={item}
// />


class OutfitItem extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      outFitProduct: {},
      outFitStyle: {photos: [{thumbnail_url: 'http://image10.bizrate-images.com/resize?sq=60&uid=2216744464'}]},
      outFitRating: 0
    }
  }
  componentDidMount () {
    ////////STYLES REQUEST//////////
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/products/${this.props.productId}/styles`,
    {
      headers: {
        'Authorization': access.token
      }
    }).then((results) => {
      this.setState({
        outFitStyle: results.data.results[0]
      })
    }).catch(err  => {
      console.error('Error @ Styles Request outfit:', err)
    });
    /////// REVIEW REQUEST ////////////
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/reviews/meta?product_id=${this.props.productId}`,
    {
      headers: {
        'Authorization': access.token
      }
    }).then((results) => {
      let ratings = results.data.ratings;
      var responseTotal = 0;
      let scoreTotal = 0;
      for (let key in ratings) {
        let temp = ratings[key];
        responseTotal = responseTotal + Number(temp);
        scoreTotal += key * temp;
      }
      let result = scoreTotal / responseTotal;
      this.setState({
        outFitRating: result
      })

    }).catch((err) =>{
          console.error("error @ review get outfit:" , err);
    });
    /////// PRODUCT REQUEST ///////////
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/products/${this.props.productId}`,
    {
      headers: {
        'Authorization': access.token
      }
    }).then((results) => {
        this.setState({
          outFitProduct: results.data
        })
    }).catch ((err) => {
        console.error("error in GET request ouitfit:", err);
    })
}
  render() {
    return  (
      <Card>
        <Rating
          name="simple-controlled"
          value={this.state.outFitRating}
          precision={0.25}
          readOnly
        />
        <CardMedia
          onClick={this.props.changeCurrentProduct}
          style={{
            display: 'block',
            height: '400px',
            width: '100%',
            objectFit: 'cover',
            marginRight: 'auto',
            marginLeft: 'auto',
            borderRadius: 0,
          }}
          component='img'
          media="picture"
          image={this.state.outFitStyle.photos[0].thumbnail_url}
        />
        <Typography variant='body1'>Product: {this.state.outFitStyle.name}</Typography>
         <ul>
            <li>
              <Typography variant='body2'>Category: {this.state.outFitProduct.category}</Typography>
            </li>
            <li>
              <Typography variant='body2'>Default Price: ${this.state.outFitProduct.default_price}</Typography>
            </li>
          </ul>
      </Card>

    )
  }
}



export default OutfitItem;