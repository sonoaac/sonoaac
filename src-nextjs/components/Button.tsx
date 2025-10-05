import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className = "", ...props }) => (
  <button
    className={`btn btn-main ${className}`.trim()}
    {...props}
  >
    {children}
  </button>
);

export default Button;
