/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/button-has-type */
import './Button.css';

interface ButtonProps {
  title: string,
  onClick: () => void,
  className?: string
}

function Button({ title, onClick, className }: ButtonProps) {
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <button className={`btn-style btn-hover ${className || ''}`} onClick={onClick}>{title}</button>
  );
}

export default Button;
