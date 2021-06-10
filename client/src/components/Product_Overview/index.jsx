import React from 'react';
import { Typography, Grid, Paper, AppBar } from '@material-ui/core';
import axios from 'axios';
import access from '../../../../config.js';
import ProductAppeal from './ProductAppeal.jsx';

class Overview extends React.Component {
  constructor (props) {
    super(props
);
    this.state = {
      product: {},
      styles: [],
      currentStyle: {}
    }
  }

  componentDidMount () {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/products/${this.props.productId}`, {
        headers: {
          'Authorization': access.token
        }
    }).then(data => {
      const newProduct = data.data;
      this.setState(
        this.state.product = newProduct
      );
      return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/products/${this.props.productId}/styles`, {
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

  changeStyle (newStyleId) {
    let newCurrentStyle = {};
    this.state.styles.map(item => {
      if (item.style_id === newStyleId) {
        newCurrentStyle = item;
      }
    });
    this.setState(
      this.state.currentStyle = newCurrentStyle
    )
  }

  render () {
    return (
      <div>
        <Typography variant="body1">Product Overview</Typography>
        <Grid container spacing={1} justify='center'>
          <Grid item xs={7}>
            <Paper >
              <Typography variant='subtitle1' >Gallery</Typography>
            </Paper>
          </Grid>
          <Grid item xs={5}>
          <Paper >
              <ProductAppeal product={this.state.product} styles={this.state.styles} currentStyle={this.state.currentStyle} changeStyle={this.changeStyle.bind(this)}/>
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