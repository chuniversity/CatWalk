import React from 'react';
import { Typography, Grid, Paper, AppBar } from '@material-ui/core';
import axios from 'axios';
import access from '../../../../config.js';
import ProductAppeal from './ProductAppeal.jsx';

class Overview extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      product: {},
      styles: [],
      currentStyle: {}
    }
  }

  componentDidMount () {
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/products', {
      headers: {
        'Authorization': access.token
      }
    }).then(data => {
      const productId = data.data[0].id;
      return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/products/${productId}`, {
        headers: {
          'Authorization': access.token
        }
      })
    }).then(data => {
      const newProduct = data.data;
      this.setState(
        this.state.product = newProduct
      );
      return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/products/${this.state.product.id}/styles`, {
        headers: {
          'Authorization': access.token
        }
      })
    }).then( data => {
      const newStyles = data.data.results;
      let newCurrentStyle = {};
      this.setState(
        this.state.styles = newStyles
      );
      newStyles.map(item => {
        if (item['default?']) {
          newCurrentStyle = item;
        }
      });
      this.setState(
        this.state.currentStyle = newCurrentStyle
      );
      console.log('Product:  ', this.state.product);
      console.log('Styles:  ', this.state.styles);
      console.log('currentStyle:  ', this.state.currentStyle);
    }).catch(err => {
      console.error(err);
    });
  }

  render () {
    return (
      <div>
        <Typography variant="body1">Product Overview</Typography>
        <Grid container spacing={1} justify='center'>
          <Grid item xs={6}>
            <Paper >
              <Typography variant='subtitle1' >Gallery</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
          <Paper >
              <Typography variant='subtitle1' >Product Appeal</Typography>
              <ProductAppeal product={this.state.product} styles={this.state.styles} currentStyle={this.state.currentStyle}/>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <Typography variant='subtitle1'>Description and Features</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <Typography variant='subtitle1'>Media</Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
};

export default Overview;