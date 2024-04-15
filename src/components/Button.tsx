import './Button.css';

interface ButtonProps {
  title: string,
  onClick: () => void
}

function Button({ title, onClick }: ButtonProps) {
    return (
      <button className="btn-style btn-hover" onClick={onClick}>{title}</button>
    );
}

export default Button;