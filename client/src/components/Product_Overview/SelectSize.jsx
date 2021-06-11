import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 125,
  }
}));

const SelectSize = ({ changeSize, currentSize, allSizes}) => {
  const classes = useStyles();

  const handleChange = (event) => {
    changeSize(event.target.value);
  };
  return (
    <FormControl variant="filled" className={classes.formControl}>
    <InputLabel>Size</InputLabel>
    <Select
      native
      value={currentSize.size}
      onChange={handleChange}
      id='select_size'
    >
      <option value={'Select Size'}>Select Size</option>
      {allSizes.map((item, index) => {
        return <option key={index} value={item}>{item}</option>;
      })}
    </Select>
  </FormControl>
  )
};

export default SelectSize;