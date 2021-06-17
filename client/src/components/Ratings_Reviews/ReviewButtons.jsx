import React from 'react';
import { FormControl, Button, Modal, makeStyles, TextField } from '@material-ui/core';

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: "white",
    padding: 20
  }
}));


const ReviewButtons = ({handleMoreReviews, reviewsRenderedNum, reviewSum}) => {
  let moreReviews;
  if(reviewsRenderedNum < reviewSum) {
    moreReviews = <span><Button onClick={handleMoreReviews} variant="outlined">MORE REVIEWS</Button></span>;
    } else {
      moreReviews = <span></span>;
  }
  //begin modal

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2>Submit your Answer</h2>
      <h4>{`${'[Product Name]'}: ${'[Question Body]'}`}</h4>
      <FormControl action="someURL" method="post" >

        <TextField
          id="filled-multiline-static"
          label="Your Answer"
          multiline
          required
          rows={8}
          variant="outlined"
          inputProps={{maxLength: 1000}}
          onChange={ input => {
            if (input.target.value.length === 1000) {
              alert('maximum question character limit of 1000 reached!')
            }
          }}
          placeholder="1000 character maximum"
        />

        <br></br>

        <TextField
          id="outlined-nickname"
          label="Your Nickname"
          required
          placeholder="Example: jack543!"
          variant="outlined"
          inputProps={{maxLength: 60}}
          onChange={ input => {
            if (input.target.value.length === 60) {
              alert('maximum question character limit of 60 reached!')
            }
          }}

        />

        <br></br>

        <TextField
        id="outlined-email"
        label="Your Email"
        variant="outlined"
        type="email"
        required
        placeholder="Example: jack@email.com"
        inputProps={{maxLength: 60}}
        onChange={ input => {
          if (input.target.value.length === 60) {
            alert('maximum question character limit of 60 reached!')
          }
        }}
        helperText="For authentication reasons, you will not be emailed"
        />

        <br></br>

        <TextField
        id="photos"
        name="Upload your photos"
        type="file"
        />

        <br></br>

        <button type="submit">Submit Answer</button>
      </FormControl>
    </div>
  );

  return (
  <div>{moreReviews} 
    <span>
      <Button onClick={handleOpen} variant="outlined">ADD A REVIEW +</Button>
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
    </span>
  </div>
  )
};

export default ReviewButtons;