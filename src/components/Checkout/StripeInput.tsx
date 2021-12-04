//@ts-nocheck
import React, { useRef, useImperativeHandle } from 'react';

// stripe input component for secure payment

const StripeInput = ({ component: Component, inputRef, ...other }) => {
  const elementRef = useRef();
  useImperativeHandle(inputRef, () => ({
    focus: () => elementRef.current.focus,
  }));

  return (
    <Component
      onReady={(element) => (elementRef.current = element)}
      {...other}
    />
  );
};

export default StripeInput;
