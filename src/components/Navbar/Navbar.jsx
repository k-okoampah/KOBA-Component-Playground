import React, { useState, useEffect } from 'react';
import { Layers, Menu, X, ChevronRight, ExternalLink } from 'lucide-react';
import ThemeToggle from '../ThemeToggle/ThemeToggle.jsx';

/**
 * Responsive Navbar component for KOBA UI.
 *
 * Provides desktop navigation and a touch-friendly mobile navigation drawer.
 *
 * @param {Object} props
 * @param {string} [props.activeSection] - Current section in view
 * @param {Function} [props.onNavigate] - Callback for smooth scrolling or section jumping
 * @param {string} [props.id='app-navbar'] - Unique ID prefix for this navbar instance
 */
export default function Navbar({ activeSection = 'all', onNavigate, id = 'app-navbar' }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Buttons', href: '#button-section' },
    { label: 'Cards', href: '#card-section' },
    { label: 'Modal', href: '#modal-section' },
    { label: 'Form Inputs', href: '#input-section' },
    { label: 'Navbar', href: '#navbar-section' },
    { label: 'Design Tokens', href: '#tokens-section' },
  ];

  // Close mobile menu on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLinkClick = (href, e) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      e?.preventDefault();
      onNavigate(href);
    } else {
      const target = document.querySelector(href);
      if (target) {
        e?.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header id={id} className="navbar">
      <div className="app-container">
        <div className="navbar-inner">
          <a href="#" className="navbar-brand">
            <div className="navbar-logo-icon">
              <Layers size={18} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ lineHeight: 1.1, fontWeight: 700 }}>KOBA UI</span>
              <span style={{ fontSize: '10px', color: 'var(--color-text-tertiary)', fontWeight: 500 }}>
                Personal Component Playground
              </span>
            </div>
            <span className="token-badge" style={{ marginLeft: '4px' }}>
              v1.0.0
            </span>
          </a>

          <div className="navbar-actions">
            {/* Desktop Navigation */}
            <nav aria-label="Main Navigation">
              <ul className="navbar-nav">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className={`navbar-link ${activeSection === item.href ? 'active' : ''}`}
                      onClick={(e) => handleLinkClick(item.href, e)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Theme Toggle Button */}
            <ThemeToggle id={`${id}-theme-toggle`} size="md" variant="icon" />

            {/* Mobile Hamburger Toggle */}
            <button
              id={`${id}-mobile-toggle-btn`}
              type="button"
              className="navbar-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls={`${id}-mobile-drawer`}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div id={`${id}-mobile-drawer`} className="navbar-mobile-menu">
          <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-tertiary)', marginBottom: '4px' }}>
            Navigation Directory
          </div>
          <nav aria-label="Mobile Navigation">
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={`navbar-mobile-link ${activeSection === item.href ? 'active' : ''}`}
                    onClick={(e) => handleLinkClick(item.href, e)}
                  >
                    <span>{item.label}</span>
                    <ChevronRight size={16} style={{ color: 'var(--color-text-tertiary)' }} />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div style={{ paddingTop: '8px', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'space-between' }}>
            <a
              href="https://linktr.ee/k_okoampah"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-primary"
              style={{ flex: 1, minHeight: '40px', justifyContent: 'center' }}
            >
              <span>Connect with me</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
