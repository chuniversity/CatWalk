import React from 'react';
import ReviewList from './ReviewList.jsx';
import ReviewRating from './ReviewRating.jsx';
import ReviewStars from './ReviewStars.jsx';
import ReviewButtons from './ReviewButtons.jsx';
import Sort from './Sort.jsx';
import { withStyles } from '@material-ui/core';
import axios from 'axios';
import access from '../../../../config.js';
import Chip from '@material-ui/core/Chip';

const useStyles = {
  rrCont: {
    marginTop: '60px',
    marginBottom: '60px',
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
  rrButtons: {
    paddingTop: '5px',
  }
};

class Ratings_Reviews extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      avgRating: 0,
      reviewSum: 0,
      reviewStorage: [],
      reviewResults: [],
      reviewsRendered: [],
      reviewsRenderedNum: 0,
      reviewFilter: 0,
      five: 0,
      four: 0,
      three: 0,
      two: 0,
      one: 0,
      recommended: 0
      
    }
    this.handleMoreReviews = this.handleMoreReviews.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleStarClick = this.handleStarClick.bind(this);
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
      axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/reviews/meta', {
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
        // get percentage of ratings
        const totalRatings = Object.values(metaData.ratings).reduce((a, b) => Number(a) + Number(b));
        var five = Number((metaData.ratings[5] / totalRatings) * 100) 
        var four = Number((metaData.ratings[4] / totalRatings) * 100) 
        var three = Number((metaData.ratings[3] / totalRatings) * 100) 
        var two = Number((metaData.ratings[2]  / totalRatings) * 100) 
        var one = Number((metaData.ratings[1] / totalRatings) * 100)
        
        // get percentage of recommended
        var recFalse = Number(metaData.recommended[false]);
        var recTrue = Number(metaData.recommended[true]);
        var recTotal = recTrue + recFalse;
        var recommended = Math.round((recTrue / recTotal) * 100);
        // set state
        this.setState({ 
          avgRating: avgRating,
          reviewSum: reviewSum,
          reviewStorage: reviewData.results,
          reviewResults: reviewData.results,
          reviewsRendered: reviewsRendered,
          reviewsRenderedNum: 2,
          five: five,
          four: four,
          three: three,
          two: two, 
          one: one,
          recommended: recommended,
          reviewFilter: 0
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

  handleStarClick(e) {
    let id = Number(e.target.id);
    if(this.state.reviewFilter === id) {
      this.setState({
        reviewFilter: 0,
        reviewResults: this.state.reviewStorage,
        reviewsRendered: this.state.reviewStorage.slice(0, 2),
        reviewsRenderedNum: 2,
        reviewSum: this.state.reviewStorage.length
      });
    } else {
      let filteredReviewResults = this.state.reviewStorage.filter(review => {
        return review.rating === id;
      });
      let newReviewsRendered = filteredReviewResults.slice(0, 2);
      this.setState({
        reviewResults: filteredReviewResults,
        reviewsRendered: newReviewsRendered,
        reviewsRenderedNum: newReviewsRendered.length,
        reviewSum: filteredReviewResults.length,
        reviewFilter: id
      });
    }
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

   handleChipDelete = () => {
    this.setState({
      reviewFilter: 0,
      reviewResults: this.state.reviewStorage,
      reviewsRendered: this.state.reviewStorage.slice(0, 2),
      reviewsRenderedNum: 2,
      reviewSum: this.state.reviewStorage.length
    });
  };

    render (props) {
      const { classes } = this.props;
      let filterTypeLine = <div></div>;
      if (this.state.reviewFilter === 0) {
        filterTypeLine = <div></div>
      } else {
        filterTypeLine =  <Chip label={this.state.reviewFilter + ` Star Reviews`} onDelete={this.handleChipDelete} variant="outlined" />
      }

      return (
    <div className={classes.rrCont}>
      <div className={classes.rrTitleCont}>
      <h2>Ratings &#38; Reviews</h2>
      </div>
      <div className={classes.rrBoxCont}>
        <div className={classes.rrBoxL}>
          <ReviewRating avgRating={this.state.avgRating} />
          <ReviewStars five={this.state.five} four={this.state.four} three={this.state.three} two={this.state.two} one={this.state.one} recommended={this.state.recommended} handleStarClick={this.handleStarClick} />
        </div>
          {/* begin box right  */}
        <div className={classes.rrBoxR}>
          <div className={classes.reviewCount}><p>{this.state.reviewSum} reviews, sorted by <Sort handleSort={this.handleSort}/></p></div>
          {filterTypeLine}
          <ReviewList reviewResults={this.state.reviewsRendered} />
          <div className={classes.rrButtons}>
          <ReviewButtons reviewsRenderedNum={this.state.reviewsRenderedNum} reviewSum={this.state.reviewSum} handleMoreReviews={this.handleMoreReviews} id={this.props.productId} />
          </div>
        </div>
        {/* end box right  */}
      </div>
   </div>
  )
 }
};

export default withStyles(useStyles)(Ratings_Reviews);