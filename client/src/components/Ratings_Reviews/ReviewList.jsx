import React from 'react';
import ReviewTile from './ReviewTile.jsx';

const ReviewList = ({reviewResults}) => {
  
  return (
    <>
    <div>
     {reviewResults.map((item) => (
       <ReviewTile 
          key={item.review_id}
          review_id={item.review_id}
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
    </>
  )
};

export default ReviewList;