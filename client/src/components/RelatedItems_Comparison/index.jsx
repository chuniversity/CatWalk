import React from 'react';
import App from './R.I.Componets/App.jsx';
import { Typography } from '@material-ui/core'


const RelatedItems_Comparison = (props) => {

  return (
    <div>
      <Typography variant='h5'>
      Related Items
      </Typography>
      <App productId={props.productId}
        changeCurrentProduct={props.changeCurrentProduct}
        outfit={props.outfit}
        addToOutfit={props.addToOutfit}
        removeFromOutfit={props.removeFromOutfit}
      />
    </div>
  )
};

export default RelatedItems_Comparison;