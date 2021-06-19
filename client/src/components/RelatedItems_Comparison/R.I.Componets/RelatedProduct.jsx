import React from 'react';
import axios from 'axios';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Compare from './Compare.jsx';
import Rating from '@material-ui/lab/Rating';
import { overflow } from '@material-ui/system';
import {
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Collapse,
  CardHeader,
  Button,
  Typography,
  Grid,
  IconButton
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Popup from 'reactjs-popup';
import access from '../../../../../config.js';

{/* <RelatedProduct
addToOutfit={props.addToOutfit}
changeCurrentProduct={props.changeCurrentProduct}
item={product}
key={i}
selected={props.currentItem}
selectedStyle={props.defaultStyle}/> */}

class RelatedProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defProductStyle: {photos: [{thumbnail_url: 'http://image10.bizrate-images.com/resize?sq=60&uid=2216744464'}]},
      defProduct: {},
      defRating: 0,
      expanded: false
    };

    this.handleExpandClick = this.handleExpandClick.bind(this)
    this.changeCurrentProduct = this.changeCurrentProduct.bind(this);
    this.addToOutfit = this.addToOutfit.bind(this);
  }
  handleExpandClick() {
    let temp = !this.state.expanded
    this.setState({
      expanded: temp
    })
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
  addToOutfit () {
    this.props.addToOutfit(this.props.item)
  }
  componentDidUpdate (prevProps) {
    if (this.props.item !== prevProps.item ) {
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
  }

  render() {
    return (
      <Card
      >
        <Rating
          style={{
            margin: 'auto'
          }}
          align='center'
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
        <CardContent>
          <Collapse in={this.state.expanded}>
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
          </Collapse>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="show more">
            <ExpandMoreIcon /><Typography> INFO </Typography>
          </IconButton>
      </CardActions>
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
            <Button
              variant='contained'
              onClick={this.addToOutfit}
              >
              <Typography variant='body1'>
                +Outfit
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Card>
    )
  }
}

export default RelatedProduct;

