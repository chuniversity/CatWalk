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
    gridGap: '30px',
  },
  rrBoxLMainRatingL: {
    fontSize: '4.0em',
    fontWeight: '700',
    opacity: '0.7',
    marginLeft: '3px',
  },
  rrBoxLMainRatingR: {

  },
  rrBoxRatingWrapper: {
    paddingTop: '15px'

  },
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
    overflow: 'hidden',
  },
  rtileBody: {
    whiteSpace: 'pre-line',
    margin: '10px 0px 20px 0px',
  },
  rtileBodyText: {
    marginTop: '10px',
  },
  rtileRec: {
    margin: '10px 0px 20px 0px',
    '& img': {
      padding: '0px 7px 0px 0px',
    },
  },
  rtileRes: {
    backgroundColor: '#ededed',
    padding: '10px 0px 10px 20px',
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
  helpfulLinkFalse: {
    color: '#242320',
    '&:hover': {
      color: '#242320',
      textDecoration: 'underline',
    },
  },
  helpfulLinkTrue: {
    color: '#242320',
    fontWeight: 'bold',
  },
  rtileReportFalse: {
    paddingLeft: '13px',
  },
  rtileReportTrue: {
    paddingLeft: '13px',
    fontWeight: 'bold',
  },
  rtileLinebreak: {
    marginTop: '17px',
  },
  gridList: {
    width: 400,
    height: 75,
    objectFit: 'cover',
    padding: '10px 0px 20px 0px',

  },
  gridListClosed: {
    width: 0,
    height: 0,
  },
  tilePhotos: {
    padding: '00px 0px 10px 0px',
  },
});

export default reviewStyles;