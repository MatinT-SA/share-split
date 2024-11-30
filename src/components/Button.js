export function Button({ children, onClick, className }) {
  return (
    <button
      className={className ? `button ${className}` : `button`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
