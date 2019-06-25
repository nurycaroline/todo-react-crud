import React from 'react';

const Input = ({ label, ...props }) => (
  <label htmlFor="done">
    {label}
    <input {...props} />
  </label>
);

export default Input;
