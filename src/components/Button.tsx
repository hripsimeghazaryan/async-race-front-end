import './Button.css';

interface ButtonProps {
  title: string,
  onClick: () => void,
  className?: string,
  disabled?: boolean
}

function Button({
  title, onClick, className, disabled,
}: ButtonProps) {
  return (
    <button
      className={`btn-style btn-hover ${className || ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
}

export default Button;
