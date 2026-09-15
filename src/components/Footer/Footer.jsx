import React from 'react';
import { Layers, ExternalLink, Code2, Heart, Atom, FileCode2, Palette } from 'lucide-react';

/**
 * Professional, responsive Footer component for KOBA UI.
 *
 * Contains brand identity, navigation directory, technology stack,
 * personal social connection link via Linktree, and "Built with React" badge.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Components', href: '#button-section' },
    { label: 'Examples', href: '#form-demo-section' },
    { label: 'About', href: '#tokens-section' },
  ];

  const technologies = [
    { name: 'React', icon: <Atom size={14} className="footer-tech-icon" /> },
    { name: 'JavaScript', icon: <FileCode2 size={14} className="footer-tech-icon" /> },
    { name: 'CSS', icon: <Palette size={14} className="footer-tech-icon" /> },
  ];

  return (
    <footer id="app-footer" className="footer">
      <div className="app-container">
        <div className="footer-inner">
          {/* Top Multi-column Responsive Grid */}
          <div className="footer-grid">
            {/* 1. Brand Column */}
            <div className="footer-brand-col">
              <a href="#" className="footer-brand-title">
                <div className="navbar-logo-icon" style={{ width: '32px', height: '32px' }}>
                  <Layers size={18} />
                </div>
                <span>KOBA UI</span>
              </a>
              <p className="footer-brand-subtitle">
                Personal Component Playground
              </p>
              <p style={{ fontSize: 'var(--font-xs)', color: 'var(--color-text-tertiary)', lineHeight: 1.6, maxWidth: '300px', margin: 0 }}>
                A robust, accessible developer component library crafted with modern React and CSS custom properties.
              </p>
              <div style={{ marginTop: 'auto', paddingTop: 'var(--space-2)' }}>
                <span className="footer-badge-built">
                  <Atom size={14} style={{ color: 'var(--color-primary)' }} />
                  <span>Built with React</span>
                </span>
              </div>
            </div>

            {/* 2. Navigation Column */}
            <div className="footer-nav-col">
              <h4 className="footer-col-heading">Navigation</h4>
              <ul className="footer-list">
                {navLinks.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="footer-link">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Technology Column */}
            <div className="footer-tech-col">
              <h4 className="footer-col-heading">Technology</h4>
              <ul className="footer-list">
                {technologies.map((tech) => (
                  <li key={tech.name}>
                    <span className="footer-tech-tag">
                      {tech.icon}
                      <span>{tech.name}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Social & Connect Column */}
            <div className="footer-connect-col">
              <h4 className="footer-col-heading">Connect</h4>
              <div className="footer-connect-card">
                <div>
                  <div style={{ fontSize: 'var(--font-xs)', fontWeight: 600, color: 'var(--color-text)' }}>
                    Personal Links & Socials
                  </div>
                  <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', margin: '4px 0 0', lineHeight: 1.5 }}>
                    Explore developer profiles, projects, and social channels.
                  </p>
                </div>
                <a
                  id="footer-linktree-btn"
                  href="https://linktr.ee/k_okoampah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-connect-btn"
                  title="Connect with me on Linktree (opens in new tab)"
                >
                  <span>Connect with me</span>
                  <ExternalLink size={15} />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Copyright, Tech Note, and Back-to-Top */}
          <div className="footer-bottom">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span>
                © {currentYear} <strong>KOBA UI</strong> — Personal Component Playground.
              </span>
              <span style={{ color: 'var(--color-border-strong)' }}>•</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                Built with React
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <a
                href="https://linktr.ee/k_okoampah"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                style={{ fontSize: 'var(--font-xs)', fontWeight: 500 }}
              >
                <span>Connect with me</span>
                <ExternalLink size={12} />
              </a>
              <span style={{ color: 'var(--color-border-strong)' }}>•</span>
              <a href="#" className="footer-link" style={{ fontSize: 'var(--font-xs)' }}>
                Back to top ↑
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
