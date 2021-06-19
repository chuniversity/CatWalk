import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Card, Button, Modal, DialogContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles((theme) => ({
  Card: {
    margin: 'auto',
    border: 'none',
    boxShadow: 'none',
    height: 600
  },
  Media: {
    display: 'block',
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    marginRight: 'auto',
    marginLeft: 'auto'
  },
  Carousel: {
    border: 'none',
    boxShadow: 'none'
  },
  Paper: {
    position: 'absolute',
    height: '95vh',
    width: '58vw',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  ExCard: {
    margin: 'auto',
    border: 'none',
    boxShadow: 'none'
  }
}));

const Gallery = ( { photos, galleryIndex, changeGalleryIndex } ) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [zoom, setZoom] = React.useState(false);

  const handleOpen = () => {
    if (!open) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSetImage = (id) => {
    changeGalleryIndex(id);
  };

  const handleOpenZoom = () => {
    setZoom(true);
  };

  const handleCloseZoom = () => {
    setZoom(false);
  };

  const body = (
    <div style={modalStyle} className={classes.Paper}>
      <Carousel autoPlay={false} className={classes.Carousel} index={galleryIndex} onChange={index => { handleSetImage(index); }} >
        {photos === undefined ? <></> : photos.map( (item, index) => {
          return <Card key={index} className={classes.ExCard} onClick={handleOpenZoom}>
              <img src={item.url} alt={index} className={classes.Media} onClick={handleOpenZoom}/>
            </Card>
        })}
      </Carousel>
    </div>
  )

  return (
    <>
      <Carousel autoPlay={false} className={classes.Carousel} index={galleryIndex} onChange={index => { handleSetImage(index); }}>
        {photos === undefined ? <></> : photos.map( (item, index) => {
          return <Card key={index} className={classes.Card} onClick={handleOpen}>
              <img src={item.url} alt={index} className={classes.Media}/>
            </Card>
        })}
      </Carousel>
      <Modal open={open} onClose={handleClose} >
        <DialogContent>
          {body}
        </DialogContent>
      </Modal>
    </>
  )
};

export default Gallery;