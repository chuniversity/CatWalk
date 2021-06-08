import React from 'react';
import { Typography } from '@material-ui/core';

class Overview extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        <Typography variant="body1">Product Overview</Typography>
      </div>
    )
  }
};

export default Overview;