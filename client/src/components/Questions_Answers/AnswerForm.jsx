import React,{useState} from 'react';
import { FormControl, Button, Modal, makeStyles, TextField, Typography } from '@material-ui/core';
import access from '../../../../config.js';
import reactDOM from 'react-dom';
import axios from 'axios';
import FormData from 'form-data';


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
    width: 480,
    backgroundColor: "white",
    padding: 20
  }
}));


const AnswerForm = (props) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  
  //set up form input props to be received using react hooks
  const [aBody, setaBody] = useState('');
  const [aName, setaName] = useState('');
  const [aEmail, setaEmail] = useState('');
  const [aPhotos, setaPhotos] = useState([]);
  

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  //form input handlers below
  const handleBodyChange = (answerBody) => {
    if (answerBody.length === 1001) {
      alert('1000 character maximum for answer please')
    } else {
      setaBody(answerBody)
    }
  }
  
  const addPhoto = (photoURL) => {
    if (aPhotos.length <= 5) {
      setaPhotos([...aPhotos, URL.createObjectURL(photoURL)])
    } else {
      aPhotos.pop();
      setaPhotos([...aPhotos, URL.createObjectURL(photoURL)])
    }
  }
  
  //imgur API for handling photo submissions on answers being posted with photos
  const uploadPhotoToImgur = (photo) => {
    var data = new FormData();
    data.append('image', photo);
    
    var config = {
      method: 'post',
      url: 'https://api.imgur.com/3/image',
      headers: { 
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': access.imgurClientId,
      },
      data: data
    };
    
    //upload image to imgur, then take the URL link to that newly uploaded photo
    //then pass the URL returned from imgur API into addPhoto
    axios.post(config)
      .then(response => addPhoto(response.data.data.link))
      .catch(error => console.error(error));
  }
  
  // POST Request to add answer to API for specific question
  const addAnswer = (e) => {
    e.preventDefault();
    let data = {
      "body": `${aBody}`,
      "name": `${aName}`,
      "email": `${aEmail}`,
      "photos": aPhotos
    };

    let config = {
      method: 'post',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/qa/questions/${props.questionId}/answers`,
      headers: { 
        'authorization': access.token
      },
      data : data
    };
    
    axios(config)
      .then((response) => {
        //logic for resetting form inputs here
        // ReactDOM.findDOMNode('addAnswerForm').reset()
      })
      .catch(error => console.log(error));
  }
  
  
    
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2>Submit your Answer</h2>
      <h4>{`${props.productName}: ${props.questionBody}`}</h4>
      <form id="addAnswerForm" onSubmit={addAnswer}>

        <input
          id="outlined-answer"
          label="Your Answer"
          required
          variant="outlined"
          onChange={e => handleBodyChange(e.target.value)}
          value={aBody}
          placeholder="1000 character maximum"
          style={{'width': '200px', 'height': '120px'}}
        />

        <br></br>
        <br></br>

        <input
          id="outlined-nickname"
          label="Your Nickname"
          required
          placeholder="Example: jack543!"
          variant="outlined"
          value={aName}
          onChange={e => setaName(e.target.value)}
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
        value={aEmail}
        placeholder="Example: jack@email.com"
        onChange={e => setaEmail(e.target.value)}
        />
        
        <br></br>
        <Typography variant="caption">
          "For authentication reasons, you will not be emailed"
        </Typography>

        <br></br>
        <br></br>
        
        <Typography variant="subtitle1">
          Add Photos
        </Typography>
        
        <input
        id="photos"
        name="Upload your photos"
        type="file"
        disabled={aPhotos.length >= 5}
        onChange={e => uploadPhotoToImgur(e.target.files[0])}
        />

        <br></br>
        <br></br>

        <button type="submit" variant="outlined" style={{'backgroundColor': '#d5d2d2'}}>Submit Answer</button>
      </form>
    </div>
  );

  return (
    <>
      <Button onClick={handleOpen} size="small">
        Add Answer
      </Button>
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
    </>
  )
}

export default AnswerForm;