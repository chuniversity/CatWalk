import React from 'react';
import App from './R.I.Componets/App.jsx';
import { Typography } from '@material-ui/core'


const RelatedItems_Comparison = (props) => {
  return (
    <div>
      <Typography variant='h5'>
      Related Items
      </Typography>
      <App productId={props.productId}/>
    </div>
  )
};

export default RelatedItems_Comparison;