import React from 'react';
import reviewStyles from './reviewStyles.js'
import Link from '@material-ui/core/Link';


const ReviewStars = () => {
  const cl = reviewStyles();
  return (
  <div>
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
  )
};

export default ReviewStars;