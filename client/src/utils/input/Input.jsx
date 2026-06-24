import React from "react";
import "./input.css";

const Input = ({ value, setValue, type, placeholder, className = "" }) => {
  return (
    <input
      className={`text-input ${className}`}
      onChange={(e) => setValue(e.target.value)}
      value={value}
      type={type}
      placeholder={placeholder}
    />
  );
};

export default Input;
