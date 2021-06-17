import { makeStyles } from '@material-ui/core';

const reviewStyles = makeStyles({
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
  rrBoxLMainRating: {
    display: 'grid',
    gridTemplateColumns: '33% 66%',
    girdGap: '30px',
  },
  rrBoxLMainRatingL: {
    fontSize: '4.0em',
    fontWeight: '700',
    opacity: '0.7',
    marginLeft: '3px',
  },
  rrBoxLMainRatingR: {},
  rrBoxLRecommendPercentage: {
    fontSize: '.91rem', 
    marginTop: '20px',
  },
  rrBoxLStars: {
    marginTop: '20px',
  },
  starsBox: {
    display: 'grid',
    gridTemplateColumns: '25% 70%',
    gridGap: '0px',
    marginTop: '15px',
  },
  starsBoxImg: {
    height: '27px',
    width: '180px',
  },
  starsBoxL: {
    fontSize: '.9em',    
  },
  starsBoxLText: {
    textDecoration: 'none',
    fontSize: '.9em',
    color: '#242320',
    '&:link': {
      color: '#242320',
    },
    '&:visited': {
      color: '#242320',
    },
    '&:hover': {
      color: '#242320',
    },
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
  // review tile
  rtileCont: {
    padding: '20px 0px 10px 0px',
  },
  rtileStaruserCont: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  rtileUser: {
    fontSize: '.75em',
    opacity: '.6',
  }, 
  rtileSummary: {
    fontSize: '1.2em',
    fontWeight: '600',
    opacity: '.8',
    fontStretch: 'ultra-condensed',
    whiteSpace: 'nowrap',
    marginTop: '17px',
  },
  rtileBody: {
    whiteSpace: 'pre-line',
    /* line-height: 2em; */
  },
  rtileBodyText: {
    marginTop: '10px',
  },
  rtileRec: {
    margin: '20px 0px 10px 0px',
    '& img': {
      padding: '0px 7px 0px 0px',
    },
  },
  rtileRes: {
    backgroundColor: '#ededed',
    padding: '5px 0px 5px 20px',
    fontSize: '.9rem',
    opacity: '.8',
  },
  rtileHelpful: {
    marginTop: '29px',
    fontSize: '.8rem',
    opacity: '.8',
    '&:link': {
      color: '#242320',
    },
    '&:visited': {
      color: '#242320',
    },
    '&:hover': {
      color: '#242320',
      textDecoration: 'none',
    },
  },
  rtileYes: {
    paddingLeft: '5px',
    paddingRight: '15px',
  },
  rtileReport: {
    paddingLeft: '13px',
  },
  rtileLinebreak: {
    marginTop: '17px',
  },

  

});




export default reviewStyles;