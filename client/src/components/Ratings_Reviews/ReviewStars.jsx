import React from 'react';
import reviewStyles from './reviewStyles.js'
import Link from '@material-ui/core/Link';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#f9a21a',
  },
}))(LinearProgress);

const ReviewStars = ({five, four, three, two, one, recommended, handleStarClick}) => {
  const cl = reviewStyles();
  const classes = useStyles();

  return (
  <div>
    <div className={cl.rrBoxLRecommendPercentage}>
      <p>{recommended}% of reviews recommend this product</p>
    </div>
      <div className={cl.rrBoxLStars}>
        <div className={cl.starsBox}>
        <div className={cl.starsBoxL}><Link id='5' onClick={handleStarClick} className={cl.starsBoxLText}>5 Stars</Link></div>
          <div className={classes.root}><BorderLinearProgress variant="determinate" value={five} /></div>
        </div>
        <div className={cl.starsBox}>
          <div className={cl.starsBoxL}><Link id='4' onClick={handleStarClick} className={cl.starsBoxLText}>4 Stars</Link></div>
          <div className={classes.root}><BorderLinearProgress variant="determinate" value={four} /></div>
        </div>
        <div className={cl.starsBox}>
          <div className={cl.starsBoxL}><Link id='3' onClick={handleStarClick} className={cl.starsBoxLText}>3 Stars</Link></div>
          <div className={classes.root}><BorderLinearProgress variant="determinate" value={three} /></div>
        </div>
        <div className={cl.starsBox}>
          <div className={cl.starsBoxL}><Link id='2' onClick={handleStarClick} className={cl.starsBoxLText}>2 Stars</Link></div>
          <div className={classes.root}><BorderLinearProgress variant="determinate" value={two} /></div>
        </div>
        <div className={cl.starsBox}>
          <div className={cl.starsBoxL}><Link id='1' onClick={handleStarClick} className={cl.starsBoxLText}>1 Stars</Link></div>
          <div className={classes.root}><BorderLinearProgress variant="determinate" value={one} /></div>
        </div>
      </div>
  </div>
  )
};

export default ReviewStars;