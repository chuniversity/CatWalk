import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardMedia,
  Button,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  Paper: {
    margin: 'auto',
    backgroundColor: "white",
  },
}));

const Compare = (props) => {
  const classes = useStyles();


  return (
    <TableContainer className={classes.Paper} container={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><Typography variant='body1'>Details</Typography></TableCell>
            <TableCell align="right"><Typography variant='body1'>Selected Product</Typography></TableCell>
            <TableCell align="right"><Typography variant='body1'>Related Product</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell><Typography variant='body1'>Category</Typography></TableCell>
            <TableCell align="right"><Typography variant='body1'>{props.selected.category}</Typography></TableCell>
            <TableCell align="right"><Typography variant='body1'>{props.compare.category}</Typography></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Typography variant='body1'>Price</Typography></TableCell>
            <TableCell align="right"><Typography variant='body1'>{props.selected.default_price}</Typography></TableCell>
            <TableCell align="right"><Typography variant='body1'>{props.compare.default_price}</Typography></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Compare;