import React, { useState } from 'react';
import { Copy, Check, Sliders, Eye, Code, BookOpen, Layers } from 'lucide-react';
import { copyToClipboard } from '../../utils/clipboard.js';

/**
 * ComponentSection provides a professional design-system documentation-style layout.
 *
 * Each section contains:
 * 1. Component name (title)
 * 2. Short description
 * 3. Live preview (interactive canvas)
 * 4. Variations / states showcase (variations prop or tabs)
 * 5. Example usage (developer-styled React code area)
 *
 * @param {Object} props
 * @param {string} props.id - Section anchor ID for navbar linking and smooth scrolling
 * @param {string} props.title - Component name / heading
 * @param {string} [props.badge] - Category badge (e.g. BUTTONS, CARDS, OVERLAYS)
 * @param {string} props.description - Short component description
 * @param {React.ReactNode} props.children - Live interactive component preview
 * @param {React.ReactNode} [props.controls] - Interactive knobs and prop controls
 * @param {React.ReactNode} [props.variations] - Visual matrix showing component variations / states
 * @param {string} [props.usage] - Static React code usage snippet (e.g. <Button variant="primary">Get Started</Button>)
 * @param {string} [props.codeSnippet] - Dynamic JSX code representation
 * @param {string} [props.className=''] - Additional CSS classes
 */
export default function ComponentSection({
  id,
  title,
  badge,
  description,
  children,
  controls,
  variations,
  usage,
  codeSnippet,
  className = '',
}) {
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [copiedUsage, setCopiedUsage] = useState(false);
  const [activeTab, setActiveTab] = useState('preview'); // 'preview' | 'variations' | 'code'

  const effectiveUsage = usage || codeSnippet || '';

  const handleCopy = async (text, setCopiedFn) => {
    if (!text) return;
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedFn(true);
      setTimeout(() => setCopiedFn(false), 2000);
    }
  };

  return (
    <section id={id} className={`component-section ${className}`.trim()}>
      {/* 1. Component Header: Name, Badge, and Short Description */}
      <div className="section-header">
        {badge && <span className="section-badge">{badge}</span>}
        <h2 className="section-title">{title}</h2>
        <p className="section-description">{description}</p>
      </div>

      {/* 2. Main Live Playground & Controls Grid */}
      <div className="playground-grid">
        {/* Left column: Live Preview Stage with Tab Switcher */}
        <div className="preview-box">
          <div className="preview-box-header">
            <div className="preview-box-tabs">
              <button
                type="button"
                className={`btn btn-sm ${activeTab === 'preview' ? 'btn-secondary' : 'btn-ghost'}`}
                onClick={() => setActiveTab('preview')}
                style={{ padding: '4px 10px', height: '28px' }}
              >
                <Eye size={14} /> Live Preview
              </button>

              {variations && (
                <button
                  type="button"
                  className={`btn btn-sm ${activeTab === 'variations' ? 'btn-secondary' : 'btn-ghost'}`}
                  onClick={() => setActiveTab('variations')}
                  style={{ padding: '4px 10px', height: '28px' }}
                >
                  <Layers size={14} /> Variations & States
                </button>
              )}

              {codeSnippet && (
                <button
                  type="button"
                  className={`btn btn-sm ${activeTab === 'code' ? 'btn-secondary' : 'btn-ghost'}`}
                  onClick={() => setActiveTab('code')}
                  style={{ padding: '4px 10px', height: '28px' }}
                >
                  <Code size={14} /> Dynamic JSX
                </button>
              )}
            </div>

            <div className="preview-box-actions">
              <span className="token-badge">Interactive</span>
              {codeSnippet && (
                <button
                  type="button"
                  onClick={() => handleCopy(codeSnippet, setCopiedSnippet)}
                  className="btn btn-ghost btn-sm"
                  style={{ padding: '4px 8px', height: '28px' }}
                  title="Copy dynamic JSX code"
                >
                  {copiedSnippet ? <Check size={14} color="var(--color-success)" /> : <Copy size={14} />}
                  <span>{copiedSnippet ? 'Copied' : 'Copy JSX'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Tab 1: Live Interactive Canvas */}
          {activeTab === 'preview' && (
            <div className="preview-box-canvas">{children}</div>
          )}

          {/* Tab 2: Variations & States Display */}
          {activeTab === 'variations' && variations && (
            <div className="variations-wrapper">
              {variations}
            </div>
          )}

          {/* Tab 3: Dynamic Code Snippet */}
          {activeTab === 'code' && (
            <div className="doc-code-block" style={{ margin: 0, borderRadius: 0, border: 'none' }}>
              <pre>
                <code>{codeSnippet}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Right column: Props & Interactive Controls Panel */}
        {controls ? (
          <div className="controls-box">
            <div className="controls-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sliders size={16} color="var(--color-primary)" />
                <span>Props & Controls</span>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', fontWeight: 500 }}>
                Live updates
              </span>
            </div>
            {controls}
          </div>
        ) : (
          <div className="controls-box" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '32px' }}>
            <p style={{ fontSize: 'var(--font-sm)', color: 'var(--color-text-tertiary)', margin: 0 }}>
              Self-contained component with clean API. Ready for drop-in usage.
            </p>
          </div>
        )}
      </div>

      {/* 3. In-line Variations / States (when provided and rendered below or beside) */}
      {variations && activeTab === 'preview' && (
        <div className="section-variations-tray">
          <div className="variations-tray-header">
            <span className="tray-label">Quick Variations & States Reference</span>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => setActiveTab('variations')}
              style={{ fontSize: '11px', height: '24px', padding: '2px 8px' }}
            >
              Expand Matrix
            </button>
          </div>
          <div className="variations-tray-content">{variations}</div>
        </div>
      )}

      {/* 4. React Usage Documentation Area */}
      {effectiveUsage && (
        <div className="section-usage-area">
          <div className="usage-area-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BookOpen size={14} color="var(--color-primary)" />
              <span className="usage-title">Usage Example</span>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(effectiveUsage, setCopiedUsage)}
              className="btn btn-ghost btn-sm copy-usage-btn"
              style={{ padding: '2px 8px', height: '26px', fontSize: '12px' }}
              title="Copy Usage Example"
            >
              {copiedUsage ? <Check size={13} color="var(--color-success)" /> : <Copy size={13} />}
              <span>{copiedUsage ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>
          <div className="doc-code-block">
            <pre>
              <code>{effectiveUsage}</code>
            </pre>
          </div>
        </div>
      )}
    </section>
  );
}

