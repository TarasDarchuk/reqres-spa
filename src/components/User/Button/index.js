import React from "react";

const Button = props => {
  return (
    <button className={props.style} onClick={props.action}>
      {props.value}
    </button>
  );
};

export default Button;
