import React from "react";
import "../styles/InputForm.css";

export { InputForm };

interface InputFormProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  containerClassName?: string;
}

function InputForm({
  icon,
  containerClassName = "",
  className = "",
  ...props
}: InputFormProps): React.ReactElement {
  return (
    <div className={`input-container ${containerClassName}`}>
      {icon && <span className="input-icon">{icon}</span>}
      <input className={`input-field ${className}`} {...props} />
    </div>
  );
}
