import React from 'react';
import dummydata from './dummydata.js';
import reviewStyles from './reviewStyles.js'



const ReviewRating = ({avgRating}) => {
  const cl = reviewStyles();
  return (
    <div className={cl.rrBoxLMainRating}>
    <div className={cl.rrBoxLMainRatingL}>{avgRating}</div>
    <div className={cl.rrBoxLMainRatingR}><img src="/lib/stars.jpg"></img></div>
  </div>
  )
};

export default ReviewRating;