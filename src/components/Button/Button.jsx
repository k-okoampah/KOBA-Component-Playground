import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Reusable Button component styled with design system tokens.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button label or contents
 * @param {'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'} [props.variant='primary'] - Button visual style
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - Button size
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {boolean} [props.loading=false] - Shows loading spinner
 * @param {React.ReactNode} [props.icon] - Optional leading icon
 * @param {Function} [props.onClick] - Click handler
 * @param {'button' | 'submit' | 'reset'} [props.type='button'] - HTML button type
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {string} [props.id] - Optional ID attribute
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon = null,
  onClick,
  type = 'button',
  className = '',
  id,
  ...rest
}) {
  const variantClass = `btn-${variant}`;
  const sizeClass = `btn-${size}`;
  const combinedClasses = `btn ${variantClass} ${sizeClass} ${className}`.trim();

  return (
    <button
      id={id}
      type={type}
      className={combinedClasses}
      disabled={disabled || loading}
      onClick={onClick}
      aria-disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <Loader2 className="animate-spin" size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />
      ) : (
        icon && <span className="btn-icon">{icon}</span>
      )}
      <span>{children}</span>
    </button>
  );
}
