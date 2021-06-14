import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Grid, Checkbox, Badge } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  }
}));

const StyleSelector = ({ style, changeStyle, currentStyleId }) => {
  const classes = useStyles();

  const changeStyleTo = () => {
    changeStyle(style.style_id);
  };

  return (
    <Grid item xs={3}>
      <Badge color="secondary" overlap='circle' badgeContent=" " invisible={currentStyleId === style.style_id ? false : true}>
        <Checkbox
            icon={<Avatar alt={style.name} src={style.photos[0].thumbnail_url} className={classes.large}/>}
            checkedIcon={<Avatar alt={style.name} src={style.photos[0].thumbnail_url} className={classes.large} />}
            onClick={changeStyleTo}
          />
      </Badge>
    </Grid>
  )
};

export default StyleSelector;