import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 125,
  }
}));

const SelectQuantity = ({ currentQuantity, changeQuantity, arrQty }) => {
  const classes = useStyles();

  const handleChange = (event) => {
    changeQuantity(event.target.value);
  };
  return (
    <FormControl variant="filled" className={classes.formControl}>
    <InputLabel>Quantity</InputLabel>
    <Select
      native
      value={currentQuantity.quantity}
      onChange={handleChange}
      id='select_quantity'
    >
      <option value={'Select Quantity'}>Select Qty</option>
      {arrQty.map((item, index) => {
        return <option key={index} value={item}>{item}</option>;
      })}
    </Select>
  </FormControl>
  )
};

export default SelectQuantity;