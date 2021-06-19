import React, { useState } from 'react';
import reviewStyles from './reviewStyles.js';
import ReviewGridTile from './ReviewGridTile.jsx';
import Rating from '@material-ui/lab/Rating';
import axios from 'axios';
import access from '../../../../config.js';

const ReviewTile = (props) => {
  const cl = reviewStyles();
  let d = new Date(props.date);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  let year = d.getFullYear();
  let date = d.getDate();
  let month = d.getMonth();
  let rec = <div></div>
  let res = <div></div>
  if (props.recommend) { rec = <div className={cl.rtileRec}><img src="lib/checkmark.png" height="17px" /> I recommend this product!</div> }
  if (props.response) { res = <div className={cl.rtileRes}><p><b>Response:</b></p><p>{props.response}</p></div> }

  //review grid conditional
  let ifReviewGrid = <div></div>
  if(props.photos.length === 0 ) {
    ifReviewGrid = <div></div>;
  } else if (!props.photos.every(el => el.url.includes('blob'))) {
     ifReviewGrid = <div className={cl.tilePhotos}> <ReviewGridTile photos={props.photos} /> </div>;
  }

  //setHelpful and setReported State
  const [helpful, setHelpful] = useState(false);
  const [helpfuls, setHelpfuls] = useState(props.helpfulness);
  const [reported, setReported] = useState(false);

  //setHelpful and setReported conditionals
  let helpfulTile = <span></span>
  if(!helpful) {
    helpfulTile = <span className={cl.helpfulLinkFalse} onClick={() => {setHelpful(true); setHelpfuls(helpfuls + 1); helpRequest()}}>Yes</span>
  } else {
    helpfulTile = <span className={cl.helpfulLinkTrue}>Yes</span>
  }
  let reportTile = <span></span>
  if(!reported) {
    reportTile = <span id={props.review_id} className={cl.rtileReportFalse} onClick={() => {setReported(true); reportRequest()}}>Report</span>
  } else {
    reportTile = <span className={cl.rtileReportTrue}>Reported</span>
  }

  //axios requests

  const helpRequest = () => {
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/reviews/${props.review_id}/helpful`, {
      data: {}
    }, 
    {
      headers: {
        'Authorization': access.token
      },
    })
    .then(function(success) {
      console.log('success', success)
    })
    .catch(function(error) {
      console.log('error', error)
    });
  }

  const reportRequest = () => {
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/reviews/${props.review_id}/report`, {
      data: {}
    }, 
    {
      headers: {
        'Authorization': access.token
      },
    })
    .then(function(success) {
      console.log('success', success)
    })
    .catch(function(error) {
      console.log('error', error)
    });
  }

  return (
    <div className={cl.rtileCont}>
      <div className={cl.rtileStaruserCont}>
        <div className="rtile-star">
        <Rating
          name="simple-controlled"
          value={props.rating}
          precision={0.25}
          readOnly
        />
        </div>
        <div className={cl.rtileUser}>{props.reviewer_name}, {months[month]} {date}, {year}</div>
      </div>
      <div className={cl.rtileSummary}>{props.summary}
      </div>
      <div className={cl.rtileBody}>{props.body.split('\n').map((i,key) => {
        return <div className={cl.rtileBodyText} key={key}>{i}</div>;
      })}
      </div>
      {ifReviewGrid}
      {rec}
      {res}
      <div className={cl.rtileHelpful}>Helpful? <span className={cl.rtileYes}>{helpfulTile}({helpfuls})</span> | {reportTile}
      </div>
      <div className={cl.rtileLinebreak}><hr></hr></div>
    </div>
  )
};

export default ReviewTile;