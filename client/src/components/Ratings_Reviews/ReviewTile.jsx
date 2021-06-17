import React from 'react';
import reviewStyles from './reviewStyles.js';
import Rating from '@material-ui/lab/Rating';

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
        {/* <div className="rtile-star"><Rating /></div> */}
        <div className={cl.rtileUser}>{props.reviewer_name}, {months[month]} {date}, {year}</div>
      </div>
      <div className={cl.rtileSummary}>{props.summary}
      </div>
      <div className={cl.rtileBody}>{props.body.split('\n').map((i,key) => {
        return <div className={cl.rtileBodyText} key={key}>{i}</div>;
      })}
      </div>
      {rec}
      {res}
      <div className={cl.rtileHelpful}>Helpful? <span className={cl.rtileYes}><a href="#">Yes</a>({props.helpfulness})</span> | <span className={cl.rtileReport}><a href="#">Report</a></span>
      </div>
      <div className={cl.rtileLinebreak}><hr></hr></div>

    </div>

  )
};

export default ReviewTile;