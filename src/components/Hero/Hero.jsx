import React from 'react';
import { ArrowDown, Layers, Sparkles, Code2, Eye } from 'lucide-react';
import Button from '../Button/Button.jsx';

/**
 * Reusable, professional Hero introduction section.
 *
 * @param {Object} props
 * @param {string} [props.label='PERSONAL DESIGN SYSTEM'] - Small badge label
 * @param {string} [props.heading='Reusable Components. Clean Interfaces.'] - Main headline
 * @param {string} [props.description] - Supporting descriptive text
 * @param {Function} [props.onExplore] - Handler for primary button click
 * @param {Function} [props.onViewExamples] - Handler for secondary button click
 * @param {string} [props.id='hero'] - Section ID
 * @param {string} [props.className=''] - Additional CSS classes
 */
export default function Hero({
  label = 'PERSONAL DESIGN SYSTEM',
  heading = 'Reusable Components. Clean Interfaces.',
  description = 'A personal component playground showcasing reusable React components, interaction states and modern frontend design practices.',
  onExplore,
  onViewExamples,
  id = 'hero',
  className = '',
}) {
  const handleExploreClick = () => {
    if (onExplore) {
      onExplore('#components');
    } else {
      const target = document.querySelector('#components') || document.querySelector('#button-section');
      target?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExamplesClick = () => {
    if (onViewExamples) {
      onViewExamples('#examples');
    } else {
      const target = document.querySelector('#examples');
      target?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id={id} className={`hero ${className}`.trim()}>
      <div className="hero-background-pattern" aria-hidden="true" />
      <div className="app-container">
        <div className="hero-layout">
          {/* Main Content Column */}
          <div className="hero-content">
            {/* Small label */}
            <div className="hero-tag">
              <Sparkles size={13} className="hero-tag-icon" aria-hidden="true" />
              <span>{label}</span>
            </div>

            {/* Main heading */}
            <h1 className="hero-title">{heading}</h1>

            {/* Description */}
            <p className="hero-description">{description}</p>

            {/* Action buttons */}
            <div className="hero-actions">
              <Button
                id="hero-explore-btn"
                variant="primary"
                size="lg"
                icon={<Layers size={17} />}
                onClick={handleExploreClick}
              >
                Explore Components
              </Button>

              <Button
                id="hero-examples-btn"
                variant="outline"
                size="lg"
                icon={<Eye size={17} />}
                onClick={handleExamplesClick}
              >
                View Examples
              </Button>
            </div>

            {/* Feature Tokens Bar */}
            <div className="hero-meta">
              <div className="hero-meta-item">
                <span className="hero-meta-dot" />
                <span>CSS Design Tokens</span>
              </div>
              <div className="hero-meta-item">
                <span className="hero-meta-dot" />
                <span>Zero UI Bloat</span>
              </div>
              <div className="hero-meta-item">
                <span className="hero-meta-dot" />
                <span>Fully Accessible</span>
              </div>
              <div className="hero-meta-item">
                <span className="hero-meta-dot" />
                <span>Vercel & Netlify Ready</span>
              </div>
            </div>
          </div>

          {/* Asymmetric Visual Preview Badge / Mini Code Card */}
          <div className="hero-visual" aria-hidden="true">
            <div className="hero-card-preview">
              <div className="hero-card-preview-header">
                <div className="hero-window-dots">
                  <span className="window-dot red" />
                  <span className="window-dot yellow" />
                  <span className="window-dot green" />
                </div>
                <span className="hero-window-title">tokens.config.css</span>
              </div>
              <div className="hero-card-code">
                <span className="code-comment">/* System Tokens & Components */</span>
                <div className="code-line">
                  <span className="code-prop">--color-primary</span>
                  <span className="code-punct">:</span>
                  <span className="code-val">#0284c7</span>
                  <span className="code-punct">;</span>
                </div>
                <div className="code-line">
                  <span className="code-prop">--radius-lg</span>
                  <span className="code-punct">:</span>
                  <span className="code-val">12px</span>
                  <span className="code-punct">;</span>
                </div>
                <div className="code-line">
                  <span className="code-prop">--shadow-sm</span>
                  <span className="code-punct">:</span>
                  <span className="code-val">0 1px 3px rgba(15,23,42,.08)</span>
                  <span className="code-punct">;</span>
                </div>
                <div className="hero-card-pill-preview">
                  <span className="sample-btn-primary">Ready to deploy</span>
                  <span className="sample-btn-outline">&lt;Interactive /&gt;</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
