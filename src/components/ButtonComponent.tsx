interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'danger' | 'secondary';
  fullWidth?: boolean;
}

const Button = ({ onClick, children, variant = 'primary', fullWidth = false }: ButtonProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'danger':
        return {
          background: '#ef4444',
          hoverBackground: '#dc2626',
          shadowColor: 'rgba(239, 68, 68, 0.3)'
        };
      case 'secondary':
        return {
          background: '#475569',
          hoverBackground: '#64748b',
          shadowColor: 'rgba(71, 85, 105, 0.3)'
        };
      case 'primary':
      default:
        return {
          background: '#3b82f6',
          hoverBackground: '#2563eb',
          shadowColor: 'rgba(59, 130, 246, 0.3)'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <button
      onClick={onClick}
      style={{
        background: styles.background,
        color: 'white',
        fontSize: '18px',
        fontWeight: 'bold',
        padding: '14px 40px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        boxShadow: `0 4px 12px ${styles.shadowColor}`,
        transition: 'background 0.2s, transform 0.2s',
        width: fullWidth ? '100%' : 'auto'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = styles.hoverBackground;
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = styles.background;
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {children}
    </button>
  );
};

export default Button;