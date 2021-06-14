import React from 'react';
import { FormControl, Button, Modal, makeStyles, TextField } from '@material-ui/core';


//set default position of modal pop up to be middle of screen
const getModalStyle = () => {
  const top = 50;
  const left = 50;
  
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

//styling for modal pop up
const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 300,
    backgroundColor: "white",
    padding: 20
  }
}));


const QuestionForm = () => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  
  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  // /console.log(EnteredValue.target.value)
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2>Ask Your Question</h2>
      <h4>{`About the ${'[currentProductNameHere]'}`}</h4>
      <FormControl action="someURL" method="post" >
        
        <TextField
          id="filled-multiline-static"
          label="Your Question"
          multiline
          required
          rows={4}
          variant="outlined"
          inputProps={{maxLength: 60}}
          onChange={ input => {
            if (input.target.value.length === 60) {
              alert('maximum question character limit of 60 reached!')
            }
          }}
          placeholder="60 character maximum"
        />
        <br></br>
        <TextField
        id="outlined-nickname"
        label="Your Nickname"
        variant="outlined"
        required
        placeholder="Example: jack543!"
        />
        <br></br>
        <TextField
        id="outlined-email"
        label="Your Email"
        variant="outlined"
        type="email"
        required
        placeholder="Example: jack@email.com"
        />
        <br></br>
        <button type="submit">Submit Question</button>
      </FormControl>
    </div>
  );
  
  return (
    <>
      <button onClick={handleOpen}>
        ADD A QUESTION +
      </button>
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
    </>
  )
}

export default QuestionForm;