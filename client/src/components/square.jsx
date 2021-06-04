import React from 'react';

export default function Square(props) {
  return (
    <button class="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}