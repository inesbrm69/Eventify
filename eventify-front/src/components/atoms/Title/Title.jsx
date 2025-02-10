import React from 'react';

const Title = ({ text = "", ...props })  => {
  return (
    <h1 className='' {...props}>
      {props.children}
    </h1>
  );
}

export default Title;