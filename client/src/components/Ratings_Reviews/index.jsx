import React from 'react';
import ReviewList from './ReviewList.jsx';
import ReviewRating from './ReviewRating.jsx';
import ReviewStars from './ReviewStars.jsx';
import ReviewButtons from './ReviewButtons.jsx';
import Sort from './Sort.jsx';
import { withStyles } from '@material-ui/core';
import axios from 'axios';
import access from '../../../../config.js';

const useStyles = {
  rrCont: {
    marginTop: '60px',
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
      reviewsRenderedNum: 0,
      five: 0,
      four: 0,
      three: 0,
      two: 0,
      one: 0,
      recommended: 0
    }
    this.handleMoreReviews = this.handleMoreReviews.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }
  componentDidMount () {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/reviews/`, {
        headers: {
          'Authorization': access.token
        },
        params: {
          page: 1,
          count: 200,
          sort: 'relevant',
          product_id: this.props.productId,
        }
    })
    .then((reviews) => {
      console.log('thereviews', reviews.data)
      axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/reviews/meta', {
        headers: {
          Authorization: access.token,
        },
        params: {
          product_id: this.props.productId,
        },
      })
      .then((metaReviews) => {
        console.log('themetaReview', metaReviews.data)
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
        // get percentage of ratings
        var five = Number((metaData.ratings[5] / reviewSum) * 100) 
        var four = Number((metaData.ratings[4] / reviewSum) * 100) 
        var three = Number((metaData.ratings[3] / reviewSum) * 100) 
        var two = Number((metaData.ratings[2]  / reviewSum) * 100) 
        var one = Number((metaData.ratings[1] / reviewSum) * 100)
        // get percentage of recommended
        var recFalse = Number(metaData.recommended[false]);
        var recTrue = Number(metaData.recommended[true]);
        var recTotal = recTrue + recFalse;
        var recommended = Math.round((recTrue / recTotal) * 100);
        // set state
        this.setState({ 
          avgRating: avgRating,
          reviewSum: reviewSum,
          reviewResults: reviewData.results,
          reviewsRendered: reviewsRendered,
          reviewsRenderedNum: 2,
          five: five,
          four: four,
          three: three,
          two: two, 
          one: one,
          recommended: recommended
        })
      })
      .catch(err => {
        console.log(err)
      });
    });
  };

  handleMoreReviews() {
    var count = this.state.reviewsRenderedNum
    this.setState({
      reviewsRendered: this.state.reviewResults.slice(0, count + 2),
      reviewsRenderedNum: this.state.reviewsRenderedNum + 2
    })
  }

  handleSort(e) {
    var value = e.target.value;
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/reviews/`, {
      headers: {
        'Authorization': access.token
      },
      params: {
        page: 1,
        count: 200,
        sort: value,
        product_id: this.props.productId,
      }
    })
    .then((reviews) => {
      let reviewData = reviews.data;
      let reviewsRendered = reviewData.results.slice(0, 2);

      this.setState({ 
        reviewResults: reviewData.results,
        reviewsRendered: reviewsRendered,
        reviewsRenderedNum: 2,
      })
    })
    .catch(err => {
      console.log(err)
    });
  };

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
          <ReviewStars five={this.state.five} four={this.state.four} three={this.state.three} two={this.state.two} one={this.state.one} recommended={this.state.recommended} />
        </div>
          {/* begin box right  */}
        <div className={classes.rrBoxR}>
          <div className={classes.reviewCount}><p>{this.state.reviewSum} reviews, sorted by <Sort handleSort={this.handleSort}/></p></div>
          <ReviewList reviewResults={this.state.reviewsRendered}  />
          {/* <div>{moreReviews} 
            <span>
              <Button onClick={this.handleOpen} variant="outlined">ADD A REVIEW +</Button>
            </span>
          </div> */}
          <ReviewButtons reviewsRenderedNum={this.state.reviewsRenderedNum} reviewSum={this.state.reviewSum} handleMoreReviews={this.handleMoreReviews} />
        </div>
        {/* end box right  */}
      </div>
   </div>
  )
 }
};

export default withStyles(useStyles)(Ratings_Reviews);