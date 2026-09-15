import React from 'react';

/**
 * Reusable Card component supporting Image, Information, and Interactive variants.
 *
 * @param {Object} props
 * @param {string} [props.title] - Main headline for the card
 * @param {string|React.ReactNode} [props.description] - Body description text
 * @param {string|Object} [props.image] - Image URL string or { src, alt } object
 * @param {string|React.ReactNode} [props.category] - Category label or badge tag
 * @param {React.ReactNode} [props.icon] - Visual indicator or icon (used in Information card)
 * @param {React.ReactNode|Array} [props.supportingInfo] - Additional metadata, tags, or metrics (Information card)
 * @param {React.ReactNode} [props.action] - Action button or interactive control
 * @param {Function} [props.onClick] - Click handler (enables interactive mode and keyboard focus)
 * @param {'default'|'image'|'info'|'information'|'interactive'} [props.variant='default'] - Preconfigured layout variant
 * @param {boolean} [props.interactive] - Explicitly enable hover elevation & cursor pointer
 * @param {string} [props.subtitle] - Secondary text (backward compatibility)
 * @param {React.ReactNode} [props.badge] - Header badge element (backward compatibility)
 * @param {React.ReactNode} [props.footer] - Custom footer slot (backward compatibility)
 * @param {React.ReactNode} [props.children] - Custom nested content slot
 * @param {string} [props.className=''] - Extra CSS classes
 * @param {string} [props.id] - DOM ID attribute
 */
export default function Card({
  title,
  description,
  image,
  category,
  icon,
  supportingInfo,
  action,
  onClick,
  variant = 'default',
  interactive = false,
  subtitle,
  badge,
  footer,
  children,
  className = '',
  id,
  ...rest
}) {
  // Determine interactive state
  const isInteractive = Boolean(interactive || variant === 'interactive' || onClick);

  // Normalize variant class
  const variantClass = variant && variant !== 'default' ? `card-${variant}` : '';
  const interactiveClass = isInteractive ? 'card-interactive' : '';

  // Extract image attributes
  const imageSrc = typeof image === 'string' ? image : image?.src;
  const imageAlt = typeof image === 'object' ? image?.alt || title || 'Card banner' : title || 'Card banner';

  // Handle keyboard interaction for accessible clickability
  const handleKeyDown = (e) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick(e);
    }
    if (rest.onKeyDown) {
      rest.onKeyDown(e);
    }
  };

  return (
    <div
      id={id}
      className={`card ${variantClass} ${interactiveClass} ${className}`.trim()}
      onClick={onClick}
      onKeyDown={isInteractive && onClick ? handleKeyDown : rest.onKeyDown}
      tabIndex={isInteractive && onClick ? 0 : undefined}
      role={isInteractive && onClick ? 'button' : undefined}
      {...rest}
    >
      {/* 1. Image Banner (Image Card Variant) */}
      {imageSrc && (
        <div className="card-image-wrapper">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="card-image"
            loading="lazy"
          />
        </div>
      )}

      {/* 2. Main Card Content Area */}
      <div className="card-content-area">
        {/* Category Pill or Header Badge */}
        {(category || badge) && (
          <div className="card-category-row">
            {category && <span className="card-category-tag">{category}</span>}
            {badge && <div className="card-badge">{badge}</div>}
          </div>
        )}

        {/* Header with optional visual icon indicator */}
        {(icon || title || subtitle) && (
          <div className="card-header-block">
            {icon && (
              <div className="card-icon-indicator" aria-hidden="true">
                {icon}
              </div>
            )}
            <div className="card-heading-group">
              {title && <h3 className="card-title">{title}</h3>}
              {subtitle && <p className="card-subtitle">{subtitle}</p>}
            </div>
          </div>
        )}

        {/* Descriptive Body Copy */}
        {description && (
          <p className="card-description">{description}</p>
        )}

        {/* Custom Nested Children */}
        {children && <div className="card-body-slot">{children}</div>}

        {/* Supporting Information (Information Card Variant) */}
        {supportingInfo && (
          <div className="card-supporting-info">
            {Array.isArray(supportingInfo) ? (
              <ul className="card-supporting-list">
                {supportingInfo.map((infoItem, idx) => (
                  <li key={idx} className="card-supporting-item">
                    {infoItem}
                  </li>
                ))}
              </ul>
            ) : (
              supportingInfo
            )}
          </div>
        )}
      </div>

      {/* 3. Action or Footer Slot */}
      {(action || footer) && (
        <div className="card-action-bar">
          {action && <div className="card-action-slot">{action}</div>}
          {footer && <div className="card-footer-slot">{footer}</div>}
        </div>
      )}
    </div>
  );
}

