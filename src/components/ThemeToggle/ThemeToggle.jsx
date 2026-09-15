import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';

/**
 * Reusable Theme Toggle button supporting Light and Dark modes.
 *
 * @param {Object} props
 * @param {'icon' | 'button' | 'pill'} [props.variant='icon'] - Visual presentation style
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - Sizing option
 * @param {boolean} [props.showLabel=false] - Whether to display text label alongside icon
 * @param {string} [props.className] - Additional class names
 * @param {string} [props.id] - Optional HTML ID
 */
export default function ThemeToggle({
  variant = 'icon',
  size = 'md',
  showLabel = false,
  className = '',
  id,
}) {
  const { theme, isDark, toggleTheme } = useTheme();

  const iconSizes = {
    sm: 16,
    md: 18,
    lg: 20,
  };

  const currentIconSize = iconSizes[size] || 18;

  if (variant === 'button' || showLabel) {
    return (
      <button
        id={id}
        type="button"
        onClick={toggleTheme}
        className={`theme-toggle-btn btn btn-${size} btn-outline ${className}`}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      >
        {isDark ? (
          <>
            <Sun size={currentIconSize} className="theme-toggle-icon" />
            <span>Light Mode</span>
          </>
        ) : (
          <>
            <Moon size={currentIconSize} className="theme-toggle-icon" />
            <span>Dark Mode</span>
          </>
        )}
      </button>
    );
  }

  if (variant === 'pill') {
    return (
      <button
        id={id}
        type="button"
        onClick={toggleTheme}
        className={`theme-toggle-pill theme-toggle-pill-${size} ${className}`}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        title={`Switch to ${isDark ? 'light' : 'dark'} mode (Current: ${theme})`}
      >
        <span className={`theme-toggle-track ${isDark ? 'is-dark' : 'is-light'}`}>
          <span className="theme-toggle-thumb">
            {isDark ? <Moon size={12} /> : <Sun size={12} />}
          </span>
          <span className="theme-toggle-label-light">
            <Sun size={12} />
          </span>
          <span className="theme-toggle-label-dark">
            <Moon size={12} />
          </span>
        </span>
      </button>
    );
  }

  // Default: 'icon' variant
  return (
    <button
      id={id}
      type="button"
      onClick={toggleTheme}
      className={`theme-toggle-icon-btn theme-toggle-${size} ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode (Current: ${theme})`}
    >
      {isDark ? (
        <Sun size={currentIconSize} className="theme-icon-sun" />
      ) : (
        <Moon size={currentIconSize} className="theme-icon-moon" />
      )}
    </button>
  );
}
