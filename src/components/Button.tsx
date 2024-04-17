/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/button-has-type */
import './Button.css';

interface ButtonProps {
  title: string,
  onClick: () => void
}

function Button({ title, onClick }: ButtonProps) {
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <button className="btn-style btn-hover" onClick={onClick}>{title}</button>
  );
}

export default Button;
