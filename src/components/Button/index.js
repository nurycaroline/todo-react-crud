import React from 'react';

const Button = ({ onClick, label, className = 'button' }) => (
  <button type="button" className={className} onClick={onClick}>
    {label}
  </button>
);

export default Button;
