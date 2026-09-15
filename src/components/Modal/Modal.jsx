import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

/**
 * Reusable, Accessible Modal Dialog component.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls visibility
 * @param {Function} props.onClose - Callback invoked when the modal is requested to close
 * @param {string|React.ReactNode} [props.title] - Modal title in header
 * @param {React.ReactNode} props.children - Body content
 * @param {boolean} [props.showCloseButton=true] - Whether to show the top-right X close button
 * @param {React.ReactNode} [props.footer] - Optional footer action buttons
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {string} [props.id] - Optional ID attribute
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
  footer,
  className = '',
  id,
}) {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  // Manage focus trap, Escape key listener, and background scroll lock
  useEffect(() => {
    if (!isOpen) return;

    // Store the element that had focus before opening the modal
    previousFocusRef.current = document.activeElement;

    // Prevent background scrolling while open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Set initial focus inside modal
    const focusTimer = setTimeout(() => {
      if (modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        } else {
          modalRef.current.focus();
        }
      }
    }, 50);

    // Keyboard navigation: Escape to close and Tab focus trapping
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
        return;
      }

      if (event.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (event.shiftKey) {
          // Shift + Tab (backward)
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab (forward)
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;

      // Restore focus to previous element on close
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        try {
          previousFocusRef.current.focus();
        } catch {
          // Ignore if previous element unmounted
        }
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        // Close only when clicking directly on the overlay backdrop
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? (id ? `${id}-title` : 'modal-title') : undefined}
    >
      <div
        id={id}
        ref={modalRef}
        className={`modal-container ${className}`.trim()}
        tabIndex={-1}
      >
        {(title || showCloseButton) && (
          <div className="modal-header">
            {title ? (
              <h3 id={id ? `${id}-title` : 'modal-title'} className="modal-title">
                {title}
              </h3>
            ) : (
              <div />
            )}
            {showCloseButton && (
              <button
                id={id ? `${id}-close-btn` : 'modal-close-btn'}
                type="button"
                className="modal-close-btn"
                onClick={onClose}
                aria-label="Close modal"
              >
                <X size={18} aria-hidden="true" />
              </button>
            )}
          </div>
        )}

        <div className="modal-body">{children}</div>

        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}
