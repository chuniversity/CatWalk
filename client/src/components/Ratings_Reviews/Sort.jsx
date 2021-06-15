import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';




const Sort = () => {

  return (
   
  <select>
        <option value="albums">relevance</option>
        <option value="members">newest</option>
        <option value="formed">oldest</option>
        <option value="formed">highest</option>
        <option value="formed">lowest</option>
 </select>
  )
};

export default Sort;