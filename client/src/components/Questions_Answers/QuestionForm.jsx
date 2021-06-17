import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { FormControl, Button, Modal, makeStyles, TextField } from '@material-ui/core';
import access from '../../../../config.js';


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

// styling for modal pop up
const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 300,
    backgroundColor: "white",
    padding: 20
  }
}));

//props.productId 
const QuestionForm = (props) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  
  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  
  // POST Request to add question to API
  const addQuestion = () => {
    // let data = {
    //   "body": `${body}`,
    //   "name": `${name}`,
    //   "email": `${email}`,
    //   "photos": `${photos}`
    // };

    // let config = {
    //   method: 'post',
    //   url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/qa/questions/27189/answers',
    //   headers: { 
    //     'authorization': access.token
    //   },
    //   data : data
    // };

    // axios(config)
    //   .then(function (response) {
    //     console.log(JSON.stringify(response.data));
    //     ReactDOM.findDOMNode('addQuestionForm').reset()
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }
  
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2>Ask Your Question</h2>
      <h4>{`About: [currentProduct - ${props.productId}]`}</h4>
    <FormControl id="addQuestionForm" onSubmit={addQuestion}>
        
        <TextField
          id="filled-multiline-static-question"
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
        <Button type="submit" variant="outlined" style={{'backgroundColor': '#d5d2d2'}}>Submit Question</Button>
      </FormControl>
    </div>
  );
  
  return (
    <>
      <Button onClick={handleOpen} variant="outlined">
        Ask question +
      </Button>
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
    </>
  )
}

export default QuestionForm;