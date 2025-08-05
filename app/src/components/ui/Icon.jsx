import './Icon.css';

const Icon = ({ name, size = 'md', className = '' }) => {
  return <i className={`bi bi-${name} icon icon--${size} ${className}`}></i>;
};

export default Icon;
