import React from "react";
import "../styles/CustomButton.css";

export { CustomButton };

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "icon";
  size?: "sm" | "md" | "lg" | "calc";
  icon?: React.ReactNode;
}

function CustomButton({
  children,
  variant = "primary",
  size = "md",
  icon,
  className = "",
  ...props
}: CustomButtonProps): React.ReactElement {
  return (
    <button
      className={`btn btn-${variant} btn-${size} ${className}`}
      {...props}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </button>
  );
}
