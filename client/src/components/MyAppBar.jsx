import React from 'react';
import { AppBar, IconButton, Badge, Typography, Grid } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    height: '8vh',
    backgroundColor: theme.palette.background.default,
    border: 'none',
    boxShadow: 'none',
  },
  cart: {
    color: 'black',
    'margin-top': '10px'
  },
  Media: {
    display: 'block',
    height: '6vh',
    width: 'auto',
    margin: '5px',
    display: 'inline',
  },
  badge: {
    'margin-top': '10px'
  },
  typography: {
    color: 'black',
    margin: 0,
    position: 'absolute',
    top: '50%',
    '-ms-transform': 'translateY(-50%)',
    transform: 'translateY(-50%)',
  },
  container: {
    display: "flex",
    flexDirection: "column",
  }
}));

const MyAppBar = ({cartUnits}) => {
  const classes = useStyles();
  return (
    <AppBar position="relative" className={classes.appBar}>
      <Grid container spacing={2} justify='space-between'>
        <Grid item xs={4} >
          <Grid container spacing={2} >
            <Grid item xs={4}>
              <img src='./lib/LOGO.png' className={classes.Media}/>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={2} className={classes.container} justify='center'>
                <Grid item xs={12}>
                  <Typography className={classes.typography} variant='h4'>LiWare</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2} >
          <Badge badgeContent={cartUnits} color="secondary" overlap='circle' className={classes.badge}>
            <ShoppingCartIcon className={classes.cart} fontSize='large'/>
          </Badge>
        </Grid>
      </Grid>
    </AppBar>
  )
};


export default MyAppBar;