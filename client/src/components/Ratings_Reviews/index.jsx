import React from 'react';
import ReviewList from './ReviewList.jsx';
import ReviewRating from './ReviewRating.jsx';
import ReviewStars from './ReviewStars.jsx';
import Sort from './Sort.jsx';
import { withStyles } from '@material-ui/core';
import axios from 'axios';
import access from '../../../../config.js';
import Button from '@material-ui/core/Button';




const useStyles = {
  rrCont: {
    marginTop: '60px',
    marginLeft: '225px',
  },
  rrTitleCont: {},
  rrBoxCont: {
    display: 'grid',
    gridTemplateColumns: '24.8% 60%',
    gridGap: '30px',
  },
  rrBoxL: {},
  rrBoxR: {
    maxWidth: '700px',
  },
  reviewCount: {
    fontWeight: '600',
    paddingLeft: '5px',
    fontSize: '1.1rem',
    opacity: '.8',
    '& select': {
      backgroundColor: 'transparent',
      border: 'none',
      fontWeight: '600',
      textDecoration: 'underline',
      fontSize: '1.1rem',
    },
  },
};


class Ratings_Reviews extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      avgRating: 0,
      reviewSum: 0,
      reviewResults: [],
      reviewsRendered: [],
      reviewsRenderedNum: 0
    }
    this.handleMoreReviews = this.handleMoreReviews.bind(this);
  }
  componentDidMount () {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hratx/reviews/`, {
        headers: {
          'Authorization': access.token
        },
        params: {
          page: 1,
          count: 200,
          sort: 'newest',
          product_id: this.props.productId,
        }
    })
    .then((reviews) => {
      console.log('thereviews', reviews.data)
      axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hratx/reviews/meta', {
        headers: {
          Authorization: access.token,
        },
        params: {
          product_id: this.props.productId,
        },
      })
      .then((metaReviews) => {
        let reviewData = reviews.data;
        let metaData = metaReviews.data;
        
        
        // get avg rating
        var ratingSum = 0;
        var divisor = 0;
        var ratingsKeys = Object.keys(metaData.ratings);
        ratingsKeys.forEach((rating) => {
          ratingSum += Number(rating) * Number(metaData.ratings[rating]);
          divisor += Number(metaData.ratings[rating]);
        });
        var avgRating = ratingSum / divisor;
      
        // get reviewSum
        let reviewSum = reviewData.results.length;
        // get first two reviews
        let reviewsRendered = reviewData.results.slice(0, 2);
        // set state
        this.setState({ 
          avgRating: avgRating,
          reviewSum: reviewSum,
          reviewResults: reviewData.results,
          reviewsRendered: reviewsRendered,
          reviewsRenderedNum: 2
        })
      });
    });
  }

  handleMoreReviews() {
    var count = this.state.reviewsRenderedNum
    this.setState({
      reviewsRendered: this.state.reviewResults.slice(0, count + 2),
      reviewsRenderedNum: this.state.reviewsRenderedNum + 2
    })
  }

    render () {
      const { classes } = this.props;
      return (
    <div className={classes.rrCont}>
      <div className={classes.rrTitleCont}>
      <p>RATINGS &#38; REVIEWS</p>
      </div>
      <div className={classes.rrBoxCont}>
        <div className={classes.rrBoxL}>
          <ReviewRating avgRating={this.state.avgRating} />
          <ReviewStars />
        </div>
          {/* begin box right  */}
        <div className={classes.rrBoxR}>
          <div className={classes.reviewCount}><p>{this.state.reviewSum} reviews, sorted by <Sort /></p></div>
          <ReviewList reviewResults={this.state.reviewsRendered}  />
          <div className="rlist-buttons"><span className="rlist-buttons-more"><Button onClick={this.handleMoreReviews} variant="outlined">MORE REVIEWS</Button></span> <span className="rlist-buttons-add"><Button variant="outlined">ADD A REVIEW +</Button></span></div>

        </div>
        {/* end box right  */}
      </div>
   </div>
  )
 }
};



export default withStyles(useStyles)(Ratings_Reviews);