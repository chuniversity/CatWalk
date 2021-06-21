import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { FormControl, Button, Modal, makeStyles, TextField, Typography } from '@material-ui/core';
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
    width: 480,
    backgroundColor: "white",
    padding: 20,
  }
}));

//props.productId 
const QuestionForm = (props) => {
  //styling for modal pop ups
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  
  //set up form input props to be received using react hooks
  const [qBody, setqBody] = useState('');
  const [qName, setqName] = useState('');
  const [qEmail, setqEmail] = useState('');

  //opening and closing modal logic
  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  
  //form input handlers below
  const handleBodyChange = (e) => {
    if (e.target.value.length === 61) {
      alert('60 character maximum for question please')
    } else {
      setqBody(e.target.value)
    }
  }
  
  // POST Request to add question to API
  const addQuestion = (e) => {
    e.preventDefault();
    let data = {
      "body": `${qBody}`,
      "name": `${qName}`,
      "email": `${qEmail}`,
      "product_id": props.productId
    };

    let config = {
      method: 'post',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/qa/questions',
      headers: { 
        'authorization': access.token
      },
      data : data
    };

    axios(config)
      .then(function (response) {
        //logic for resetting form inputs here
        // ReactDOM.findDOMNode('addQuestionForm').reset()
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2>Ask Your Question</h2>
      <h4>{`About: ${props.productName}`}</h4>
    <form id="addQuestionForm" onSubmit={addQuestion}>
        
        <input
          id="outlined-question"
          label="Your Question"
          required
          variant="outlined"
          placeholder="60 character maximum"
          value={qBody}
          onChange={handleBodyChange}
          style={{'width': 'auto', 'height': '100px'}}
        />
        <br></br>
        
        <br></br>
        <input
        id="outlined-nickname"
        label="Your Nickname"
        variant="outlined"
        required
        placeholder="Example: jack543!"
        value={qName}
        onChange={e => setqName(e.target.value)}
        />
        <br></br>
        <Typography variant="caption">
          “For privacy reasons, do not use your full name or email address” 
        </Typography>
        <br></br>
        
        <br></br>
        <input
        id="outlined-email"
        label="Your Email"
        variant="outlined"
        type="email"
        required
        placeholder="Example: jack@email.com"
        value={qEmail}
        onChange={e => setqEmail(e.target.value)}
        />
        <br></br>
        
        <Typography variant="caption">
          "For authentication reasons, you will not be emailed"
        </Typography>
        
        <br></br>
        <br></br>
        <button type="submit" variant="outlined" style={{'backgroundColor': '#d5d2d2'}}>Submit Question</button>
      </form>
    </div>
  );
  
  return (
    <>
      <Button onClick={handleOpen} variant="outlined" style={{'backgroundColor': '#e5e4e8'}}>
        Ask question +
      </Button>
      <br></br>
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
    </>
  )
}

export default QuestionForm;