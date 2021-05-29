import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";

import "./input.scss";

const Input = ({
  value,
  setValue,
  id,
  label,
  helperText,
  className,
  isValidated,
  placeholder,
}) => {
  return (
    <>
      {isValidated ? (
        <TextField
          id={id}
          label={label}
          defaultValue={value}
          onChange={setValue}
          variant="outlined"
          className={className}
          InputLabelProps={{ shrink: true }}
          placeholder={placeholder}
        />
      ) : (
        <TextField
          error
          id={id}
          label={label}
          defaultValue={value}
          onChange={setValue}
          variant="outlined"
          className={className}
          placeholder={placeholder}
          InputLabelProps={{ shrink: true }}
          helperText={helperText}
        />
      )}
    </>
  );
};

export default Input;
