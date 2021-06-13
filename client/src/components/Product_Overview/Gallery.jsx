import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Card, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  Card: {
    margin: 'auto',
    border: 'none',
    boxShadow: 'none'
  },
  Media: {
    display: 'block',
    height: 600,
    width: '100%',
    objectFit: 'cover',
    marginRight: 'auto',
    marginLeft: 'auto'
  },
  Carousel: {
    border: 'none',
    boxShadow: 'none'
  }
}));

const Gallery = ( { photos } ) => {
  const classes = useStyles();

  return (
    <Carousel autoPlay={false} className={classes.Carousel}>
      {photos === undefined ? <></> : photos.map( (item, index) => {
        return <Card key={index} className={classes.Card}>
            <img src={item.url} alt={index} className={classes.Media}/>
          </Card>
      })}
    </Carousel>
  )
};

export default Gallery;