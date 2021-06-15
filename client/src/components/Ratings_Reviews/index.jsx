import React from 'react';
import ReviewList from './ReviewList.jsx';
import Sort from './Sort.jsx';
import { makeStyles } from '@material-ui/core';
import reviewStyles from './reviewStyles.js'
import Link from '@material-ui/core/Link';


const Ratings_Reviews = () => {
  const cl = reviewStyles();
  return (
    <div className={cl.rrCont}>
      <div className={cl.rrTitleCont}>
      <p>RATINGS &#38; REVIEWS</p>
      </div>
      <div className={cl.rrBoxCont}>
        <div className={cl.rrBoxL}>
          <div className={cl.rrBoxLMainRating}>
            <div className={cl.rrBoxLMainRatingL}>3.5</div>
            <div className={cl.rrBoxLMainRatingR}><img src="/lib/stars.jpg"></img></div>
          </div>
          <div className={cl.rrBoxLRecommendPercentage}>
            <p>100% of reviews recommend this product</p>
          </div>
          <div className={cl.rrBoxLStars}>
            <div className={cl.starsBox}>
            <div className={cl.starsBoxL}><Link href="#" className={cl.starsBoxLText}>5 Stars</Link></div>
            <div className="stars-box-r"><img className={cl.starsBoxImg} src="/lib/bar1.png"></img></div>
            </div>
            <div className={cl.starsBox}>
              <div className={cl.starsBoxL}><Link href="#" className={cl.starsBoxLText}>4 Stars</Link></div>
              <div className="stars-box-r"><img className={cl.starsBoxImg} src="/lib/bar2.png"></img></div>
            </div>
            <div className={cl.starsBox}>
              <div className={cl.starsBoxL}><Link href="#" className={cl.starsBoxLText}>3 Stars</Link></div>
              <div className="stars-box-r"><img className={cl.starsBoxImg} src="/lib/bar1.png"></img></div>
            </div>
            <div className={cl.starsBox}>
              <div className={cl.starsBoxL}><Link href="#" className={cl.starsBoxLText}>2 Stars</Link></div>
              <div className="stars-box-r"><img className={cl.starsBoxImg} src="/lib/bar2.png"></img></div>
            </div>
            <div className={cl.starsBox}>
              <div className={cl.starsBoxL}><Link href="#" className={cl.starsBoxLText}>1 Stars</Link></div>
              <div className="stars-box-r"><img className={cl.starsBoxImg} src="/lib/bar1.png"></img></div>
            </div>
          </div>
          <div className="rr-box-l-grades">{/* todo */}<img src="/lib/grades.png"></img></div>
          
        </div>
          {/* begin box right  */}
        <div className={cl.rrBoxR}>
          <div className={cl.reviewCount}><p>248 reviews, sorted by <Sort /></p></div>
          <div>
            
          </div>
         
          <ReviewList />

        </div>
        {/* end box right  */}
      </div>
   </div>
      
    
  )
};

export default Ratings_Reviews;