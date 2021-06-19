import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Rating from '@material-ui/lab/Rating';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';
import access from '../../../../config.js';

//ratings
const labels = {
  1: 'Poor+',
  2: 'Fair',
  3: 'Average',
  4: 'Good',
  5: 'Great',
};

//rating styles
const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    display: 'flex',
    alignItems: 'center',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '150ch',
    },
  },
  summary: {
    paddingTop: '30px',
  },
  body: {
    paddingTop: '30px',
  },
  recommend: {
    paddingTop: '30px',
  },
  MoreReviewBtn: {
    padding: '0px 10px 0px 0px'
  }
}));

const ReviewButtons = ({handleMoreReviews, reviewsRenderedNum, reviewSum, id}) => {
  const classes = useStyles();
    // form submission
    const [hover, setHover] = useState(-1);
    // rating state
    const [value, setValue] = useState(2);
    const [summary, setSummary] = useState('');
    const [checked, setChecked] = useState(true);
    const [body, setBody] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

  let moreReviews;
  if(reviewsRenderedNum < reviewSum) {
    moreReviews = <span className={classes.MoreReviewBtn}><Button onClick={handleMoreReviews} variant="outlined">MORE REVIEWS</Button></span>;
    } else {
      moreReviews = <span></span>;
  }
  // modal stae
  const [open, setOpen] = useState(false);
  //modal
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/reviews/`;
    const data = {
        'product_id': id,
        'rating': value,
        'summary': summary,
        'body': body,
        'recommend': checked,
        'name': name, 
        'email': email,
        'photos': [],
        'characteristics': {},
    }
    const config = {
      headers: {
        'Authorization': access.token
      }
    }

    axios.post(url, data, config)
    .then(function(success) {
      console.log('success', success)
    })
    .catch(function(error) {
      console.log('error', error)
    });
    setOpen(false);
  };
  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };
  return (
  <div>{moreReviews} 
    <span>
      <Button variant="outlined" onClick={handleClickOpen}>ADD A REVIEW +</Button>
      <Dialog 
      open={open} 
      onClose={handleClose} 
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      >
        <DialogTitle id="form-dialog-title">Please leave your review</DialogTitle>
        <DialogContent>
          <DialogContentText>
            How do you rate this product?
          </DialogContentText>
           <div className={classes.root}>
            <Rating
              name="hover-feedback"
              value={value}
              precision={1}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
            />
              {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
            </div>
            <div className={classes.summary}>
                <TextField
                autoFocus
                margin="dense"
                id="summary"
                label="Enter a Review Summary"
                value={summary}
                onChange={e => setSummary(e.target.value)}
                type="text"
                fullWidth
                variant="standard"
              />
            </div>
            <div className={classes.recommend}>
              <DialogContentText>
                Would you recommend this product? 
              </DialogContentText>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleCheck}
                    name="checkedB"
                    color="primary"
                  />
                }
                label="Yes I recommend this product!"
              />
            </div>
            <div className={classes.body}>
              <TextField
                id="outlined-multiline-static"
                label="Your Review"
                fullWidth={true}
                value={body}
                onChange={e => setBody(e.target.value)}
                multiline
                rows={4}
                variant="outlined"
              />
            </div>
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
          <Box pt={1}>
          <input
            accept="image/*"
            className={classes.input}
            style={{ display: 'none' }}
            id="raised-button-file"
            multiple
            type="file"
          />
          <label htmlFor="raised-button-file">
            <Button variant="outlined" component="span" className={classes.button}>
              Upload Images
            </Button>
          </label> 
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </span>
  </div>
  )
};

export default ReviewButtons;