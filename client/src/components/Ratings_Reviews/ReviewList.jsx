import React from 'react';
import ReviewTile from './ReviewTile.jsx';
import dummydata from './dummydata.js';
import Button from '@material-ui/core/Button';
import reviewStyles from './reviewStyles.js'



const ReviewList = () => {
  console.log()
  return (
    <>
    <div>

     {dummydata.results.map((item, index) => (
       <ReviewTile
          key={index}
          rating={item.rating}
          summary={item.summary}
          recommend={item.recommend}
          response={item.response}
          body={item.body}
          date={item.date}
          reviewer_name={item.reviewer_name}
          helpfulness={item.helpfulness}
          photos={item.photos}
       />
    ))}
    </div>
    <div className="rlist-buttons"><span className="rlist-buttons-more"><Button variant="outlined">MORE REVIEWS</Button></span> <span className="rlist-buttons-add"><Button variant="outlined">ADD A REVIEW +</Button></span></div>

    </>
  )
};

export default ReviewList;