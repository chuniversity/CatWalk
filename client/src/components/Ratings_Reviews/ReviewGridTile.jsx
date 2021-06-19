import React, { useState } from 'react';
import { GridList, GridListTile } from '@material-ui/core';
import reviewStyles from './reviewStyles.js';
import { makeStyles } from "@material-ui/core/styles";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles(theme => ({
  modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
  },
  paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
  },
}));

const ReviewGridTile = (props) => {
  const cl = reviewStyles();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [url, setUrl] = useState(0);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
         <GridList cellHeight={75} className={cl.gridList} cols={5}>
          {props.photos.map((tile, index) => (
            <div key={'divkey'+tile.id}>
              <GridListTile key={'gl'+tile.id} cols={tile.cols || 1} onClick={ handleOpen }>
                <img key={index} 
                src={tile.url}
                onError={(e) => (e.target.onerror = null, e.target.src = 'lib/errorimg.jpeg')} 
                onClick={() => { setUrl(tile.url);}} 
                />
              </GridListTile> 
                <Modal
                key={'modal'+tile.id}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                    <img height="500px" src={url} onError={(e) => (e.target.onerror = null, e.target.src = 'lib/errorimg.jpeg')} />
                        
                    </div>
                </Fade>
            </Modal>
            </div>
         
          ))}
        </GridList>
  )
}

export default ReviewGridTile