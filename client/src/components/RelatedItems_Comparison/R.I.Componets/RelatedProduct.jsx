import React from 'react';
import axios from 'axios';
import { Card, CardMedia, Button, Typography } from '@material-ui/core'
import access from '../../../../../config.js';

class RelatedProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defProductStyle: {photos: [{thumbnail_url: 'http://image10.bizrate-images.com/resize?sq=60&uid=2216744464'}]},
      defProduct: {}
    }
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
    }).then((results) => {
      this.setState({
        defProduct: results.data
      })
    }).catch((err) => {
      console.error('Error @ Product Request:', err)
    })
  }


  render() {
    return (
      <Card>
        <CardMedia
          style={{
            height: '400px',
            width: '100%',
            objectFit: 'cover',
            marginRight: 'auto',
            marginLeft: 'auto'
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
        <Button variant='contained'> Add to Outfit </Button>
      </Card>
    )
  }
}

export default RelatedProduct;

