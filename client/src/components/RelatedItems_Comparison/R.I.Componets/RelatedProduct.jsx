import React from 'react';
import axios from 'axios';
import Compare from './Compare.jsx';
import Rating from '@material-ui/lab/Rating';
import { Card, CardMedia, Button, Typography, Grid } from '@material-ui/core'
import Popup from 'reactjs-popup';
import access from '../../../../../config.js';

class RelatedProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defProductStyle: {photos: [{thumbnail_url: 'http://image10.bizrate-images.com/resize?sq=60&uid=2216744464'}]},
      defProduct: {},
      defRating: 0
    };

    this.changeCurrentProduct = this.changeCurrentProduct.bind(this);
  }

  componentDidMount() {
////////STYLES REQUEST//////////
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/products/${this.props.item}/styles`,
    {
      headers: {
        'Authorization': access.token
      }
    }).then((results) => {
      this.setState({
        defProductStyle: results.data.results[0]
      })
    }).catch(err  => {
      console.error('Error @ Styles Request:', err)
    });
/////// PRODUCT REQUEST ///////////
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/products/${this.props.item}`,
    {
      headers: {
        'Authorization': access.token
      }
    }).then((results) => {''
      this.setState({
        defProduct: results.data
      })
    }).catch((err) => {
      console.error('Error @ Product Request:', err)
    });
/////// REVIEW REQUEST ////////////
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/reviews/meta?product_id=${this.props.item}`,
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
        defRating: result
      })

    }).catch((err) =>{
          console.error("error @ review get:" , err);
    });
  }

  changeCurrentProduct () {
     this.props.changeCurrentProduct(this.state.defProduct.id);
  }

  render() {
    return (
      <Card>

        <Rating
          name="simple-controlled"
          value={this.state.defRating}
          precision={0.25}
          readOnly
        />
        <CardMedia
          onClick={this.changeCurrentProduct}
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
          image={this.state.defProductStyle.photos[0].thumbnail_url}
        />
        <Typography variant='h6'>Product: {this.state.defProductStyle.name}</Typography>
        <ul>
          <li>
            <Typography variant='body1'>Slogan: {this.state.defProduct.slogan}</Typography>
          </li>
          <li>
          <Typography variant='body1'>Description: {this.state.defProduct.description}</Typography>
          </li>
          <li>
          <Typography variant='body1'>Category: {this.state.defProduct.category}</Typography>
          </li>
          <li>
          <Typography variant='body1'>Default Price: ${this.state.defProduct.default_price}</Typography>
          </li>
        </ul>
        <Grid container={true} spacing={1}>
          <Grid item xs={6}>
            <Popup trigger={
              <Button variant='contained'>
                <Typography variant='body1'>
                  Compare!
                </Typography>
              </Button>} position="right center">
               <Compare compare={this.state.defProduct} selected={this.props.selected}/>
            </Popup>
          </Grid>
          <Grid item xs={6}>
            <Button variant='contained'>
              <Typography variant='body1'>
                Add to Outfit
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Card>
    )
  }
}

export default RelatedProduct;

