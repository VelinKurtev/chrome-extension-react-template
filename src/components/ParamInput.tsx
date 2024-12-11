import React, { memo } from "react";

interface ParamInputProps {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const ParamInput = memo(({ type, value, onChange, placeholder, onKeyPress }: ParamInputProps) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="param-input"
    onKeyDown={onKeyPress}
  />
));

export default ParamInput;