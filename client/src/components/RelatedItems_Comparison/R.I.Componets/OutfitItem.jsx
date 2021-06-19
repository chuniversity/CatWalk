import React from 'react';
import axios from 'axios';
import Rating from '@material-ui/lab/Rating';
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
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
      outFitRating: 0,
      expanded: false
    }
    this.handleExpandClick = this.handleExpandClick.bind(this)
    this.removeFromOutfit = this.removeFromOutfit.bind(this);
  }
  componentDidMount() {
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
  handleExpandClick() {
    let temp = !this.state.expanded
    this.setState({
      expanded: temp
    })
  }
  removeFromOutfit() {
    this.props.removeFromOutfit(this.props.productId);
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
            height: '200px',
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
         <CardContent>
          <Collapse in={this.state.expanded}>
            <Typography variant='body1'>Product: {this.state.outFitStyle.name}</Typography>
              <ul>
                <li>
                  <Typography variant='body2'>Category: {this.state.outFitProduct.category}</Typography>
                </li>
                <li>
                  <Typography variant='body2'>Default Price: ${this.state.outFitProduct.default_price}</Typography>
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
          <Button
              variant='contained'
              onClick={this.removeFromOutfit}
          >
            <Typography variant='body1'>
              Remove from Outfit
            </Typography>
          </Button>
      </Card>

    )
  }
}



export default OutfitItem;

{/* <OutfitItem
key={i}
removeFromOutfit={props.removeFromOutfit}
changeCurrentProduct={props.changeCurrentProduct}
productId={item}
/> */}