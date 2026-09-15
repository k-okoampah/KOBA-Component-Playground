import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

/**
 * Reusable FormInput component supporting text, email, password types,
 * full accessibility associations, error states, and responsive styling.
 *
 * @param {Object} props
 * @param {string} [props.label] - Field label
 * @param {string} [props.name] - Form field name
 * @param {'text'|'email'|'password'|string} [props.type='text'] - Input type
 * @param {string} [props.placeholder=''] - Placeholder text
 * @param {string} [props.value] - Controlled input value
 * @param {Function} [props.onChange] - Change event handler
 * @param {string} [props.error] - Error message (toggles error state)
 * @param {string} [props.errorText] - Alias for error (backward compatibility)
 * @param {string} [props.helperText] - Supplementary hint text
 * @param {boolean} [props.required=false] - Denotes required field
 * @param {boolean} [props.disabled=false] - Disables interaction
 * @param {string} [props.id] - DOM ID attribute
 * @param {React.ReactNode} [props.icon] - Optional leading icon
 * @param {string} [props.className=''] - Additional CSS classes
 */
export default function FormInput({
  label,
  name,
  type = 'text',
  placeholder = '',
  value,
  defaultValue,
  onChange,
  readOnly,
  error,
  errorText,
  helperText,
  required = false,
  disabled = false,
  id,
  icon = null,
  className = '',
  ...rest
}) {
  // Support password visibility toggle
  const [showPassword, setShowPassword] = useState(false);

  // Track internal state for uncontrolled inputs (when value is not explicitly passed)
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');

  // Normalize error message (supports both error and errorText props)
  const errorMessage = error || errorText;
  const isError = Boolean(errorMessage);

  // Compute resolved HTML ID (connected to label, helper, and error)
  const autoId = React.useId();
  const sanitizedAutoId = autoId.replace(/:/g, '');
  const inputId = id || `input-${name ? `${name}-` : ''}${sanitizedAutoId}`;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  // Determine actual rendered input type
  const actualType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

  // Active value for determining filled state
  const activeValue = isControlled ? value : internalValue;
  const isFilled = activeValue !== undefined && activeValue !== null && String(activeValue).length > 0;

  // Change handler that supports both controlled and uncontrolled inputs
  const handleChange = (e) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    if (onChange) {
      onChange(e);
    }
  };

  // Determine whether input is read-only (prevents React's value-without-onChange warning)
  const isReadOnly = readOnly !== undefined ? readOnly : (isControlled && !onChange);

  const inputClasses = [
    'form-input',
    icon ? 'has-icon' : '',
    type === 'password' ? 'has-password-toggle' : '',
    isError ? 'is-error' : '',
    isFilled ? 'is-filled' : '',
    disabled ? 'is-disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Base input attributes
  const inputProps = {
    id: inputId,
    name,
    type: actualType,
    placeholder,
    disabled,
    readOnly: isReadOnly,
    required,
    className: inputClasses,
    'aria-invalid': isError ? 'true' : 'false',
    'aria-required': required ? 'true' : 'false',
    'aria-describedby': isError ? errorId : helperText ? helperId : undefined,
    onChange: handleChange,
    ...rest,
  };

  if (isControlled) {
    inputProps.value = value;
  } else if (defaultValue !== undefined) {
    inputProps.defaultValue = defaultValue;
  }

  return (
    <div className={`form-group ${isError ? 'has-error' : ''} ${disabled ? 'group-disabled' : ''}`.trim()}>
      {/* Accessible Label connected to input via htmlFor */}
      {label && (
        <label htmlFor={inputId} className="form-label">
          <span className="form-label-text">
            {label}
            {required && (
              <span className="form-required-star" aria-hidden="true">
                *
              </span>
            )}
          </span>
          {required && <span className="sr-only">(required)</span>}
        </label>
      )}

      <div className="form-input-wrapper">
        {/* Leading decorative icon */}
        {icon && (
          <div className="form-input-icon" aria-hidden="true">
            {icon}
          </div>
        )}

        <input {...inputProps} />

        {/* Password Visibility Toggle */}
        {type === 'password' && !disabled && (
          <button
            type="button"
            className="form-password-toggle-btn"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff size={16} aria-hidden="true" />
            ) : (
              <Eye size={16} aria-hidden="true" />
            )}
          </button>
        )}
      </div>

      {/* Validation Error Message */}
      {isError && (
        <div id={errorId} className="form-error" role="alert">
          <AlertCircle size={13} className="form-error-icon" aria-hidden="true" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Supporting Helper Text */}
      {!isError && helperText && (
        <div id={helperId} className="form-helper">
          {helperText}
        </div>
      )}
    </div>
  );
}

