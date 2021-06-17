import React from 'react';
import reviewStyles from './reviewStyles.js';
import Rating from '@material-ui/lab/Rating';



const ReviewRating = ({avgRating}) => {
  const cl = reviewStyles();
  return (
    <div className={cl.rrBoxLMainRating}>
    <div className={cl.rrBoxLMainRatingL}>{avgRating ? avgRating.toFixed(1) : ''}</div>
    <div className={cl.rrBoxLMainRatingLNone}>{!avgRating ? 'No Reviews' : ''}</div>
    <div className={cl.rrBoxLMainRatingR}>
    <Rating
          name="simple-controlled"
          value={avgRating}
          precision={0.25}
          readOnly
        />
    </div>
    </div>
  )
};

export default ReviewRating;