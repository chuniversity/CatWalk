import React from 'react';
import ReviewTile from './ReviewTile.jsx';
import Button from '@material-ui/core/Button';



const ReviewList = ({reviewResults}) => {
  console.log()
  return (
    <>
    <div>
    
     {reviewResults.map((item) => (
       <ReviewTile 
          key={item.review_id}
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