import React from 'react';

const Title = ({ text = "", ...props })  => {
  return (
    <div>
      <h3 {...props}>
        {props.children}
      </h3>
    </div>
    
  );
}

export default Title;