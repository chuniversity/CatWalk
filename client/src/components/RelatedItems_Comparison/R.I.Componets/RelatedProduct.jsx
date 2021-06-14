import React from 'react';
import axios from 'axios';
import { Card, CardMedia, Button } from '@material-ui/core'
import data from './sample_data.js';
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
            width: 'auto'
          }}
          component='img'
          media="picture"
          image={this.state.defProductStyle.photos[0].thumbnail_url}
        />
        <h5>Product: {this.state.defProductStyle.name}</h5>
        <ul>
          <li>slogan: {this.state.defProduct.slogan}</li>
          <li>description: {this.state.defProduct.description}</li>
          <li>category: {this.state.defProduct.category}</li>
          <li>default_price: {this.state.defProduct.default_price}</li>
        </ul>
      </Card>
    )
  }
}

export default RelatedProduct;

