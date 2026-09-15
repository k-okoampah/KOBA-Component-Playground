import React, { useState } from 'react';
import {
  Palette,
  Type,
  Maximize2,
  Minimize2,
  Box,
  Layers,
  Sparkles,
  Copy,
  Check,
  Play,
  RotateCcw,
  Sun,
  Moon,
} from 'lucide-react';
import Card from '../Card/Card.jsx';
import Button from '../Button/Button.jsx';
import ThemeToggle from '../ThemeToggle/ThemeToggle.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import { copyToClipboard } from '../../utils/clipboard.js';

/**
 * DesignTokens Component
 * Comprehensive interactive design tokens documentation and live inspector.
 * Implements the full design tokens specification requested:
 * - Colors: Primary, Secondary, Accent, Background, Surface, Text, Muted, Border, Error, Success
 * - Typography: Font family, Heading sizes, Body size, Small text
 * - Spacing: xs, sm, md, lg, xl, 2xl
 * - Border Radius: sm, md, lg, pill
 * - Shadows: sm, md, lg
 * - Transitions: fast, normal, slow
 */
export default function DesignTokens({ id = 'tokens-section', className = '' }) {
  const { isDark } = useTheme();
  const [copiedToken, setCopiedToken] = useState(null);
  const [activeTransition, setActiveTransition] = useState(null);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'colors' | 'typography' | 'spacing' | 'radius' | 'shadows' | 'transitions'

  const copyToken = async (tokenText) => {
    const success = await copyToClipboard(tokenText);
    if (success) {
      setCopiedToken(tokenText);
      setTimeout(() => setCopiedToken(null), 1800);
    }
  };

  const triggerTransitionTest = (speed) => {
    setActiveTransition(speed);
    setTimeout(() => setActiveTransition(null), 1200);
  };

  // Color Tokens Data
  const colorTokens = [
    {
      name: '--color-primary',
      alias: '--primary',
      role: 'Primary',
      desc: 'Action brand color, primary buttons, active links, focused highlights',
      lightVal: '#0284c7',
      darkVal: '#38bdf8',
      swatch: 'var(--color-primary)',
      textOn: 'var(--color-primary-contrast)',
    },
    {
      name: '--color-secondary',
      alias: '--secondary',
      role: 'Secondary',
      desc: 'Supporting actions, secondary buttons, subtle icons, metadata badges',
      lightVal: '#475569',
      darkVal: '#94a3b8',
      swatch: 'var(--color-secondary)',
      textOn: 'var(--color-secondary-contrast)',
    },
    {
      name: '--color-accent',
      alias: '--accent',
      role: 'Accent',
      desc: 'Featured highlights, key tag decorations, interactive markers',
      lightVal: '#6366f1',
      darkVal: '#818cf8',
      swatch: 'var(--color-accent)',
      textOn: '#ffffff',
    },
    {
      name: '--color-background',
      alias: '--background',
      role: 'Background',
      desc: 'Application canvas background behind all surfaces and panels',
      lightVal: '#f8fafc',
      darkVal: '#090d16',
      swatch: 'var(--color-background)',
      border: '1px solid var(--color-border)',
    },
    {
      name: '--color-surface',
      alias: '--surface',
      role: 'Surface',
      desc: 'Card containers, modal bodies, navigation bar, elevated layers',
      lightVal: '#ffffff',
      darkVal: '#111827',
      swatch: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
    },
    {
      name: '--color-text',
      alias: '--text',
      role: 'Text',
      desc: 'High-contrast primary headings, card titles, form labels, body text',
      lightVal: '#0f172a',
      darkVal: '#f9fafb',
      swatch: 'var(--color-text)',
      textOn: 'var(--color-surface)',
    },
    {
      name: '--color-muted',
      alias: '--muted',
      role: 'Muted',
      desc: 'Secondary supporting text, placeholders, helper labels, disabled states',
      lightVal: '#64748b',
      darkVal: '#9ca3af',
      swatch: 'var(--color-muted)',
      textOn: '#ffffff',
    },
    {
      name: '--color-border',
      alias: '--border',
      role: 'Border',
      desc: 'Dividers, card outlines, table borders, neutral separation boundaries',
      lightVal: '#e2e8f0',
      darkVal: '#1f2937',
      swatch: 'var(--color-border)',
      border: '1px solid var(--color-border-strong)',
    },
    {
      name: '--color-error',
      alias: '--error',
      role: 'Error',
      desc: 'Validation failure messages, danger buttons, alert states, destructive actions',
      lightVal: '#dc2626',
      darkVal: '#ef4444',
      swatch: 'var(--color-error)',
      textOn: '#ffffff',
    },
    {
      name: '--color-success',
      alias: '--success',
      role: 'Success',
      desc: 'Form validation success indicators, completed task chips, positive notifications',
      lightVal: '#16a34a',
      darkVal: '#22c55e',
      swatch: 'var(--color-success)',
      textOn: '#ffffff',
    },
  ];

  // Typography Tokens Data
  const typographyTokens = [
    {
      token: '--font-family',
      category: 'Font family',
      role: 'Primary UI & Body Sans',
      value: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      preview: 'The quick brown fox jumps over the lazy dog',
      fontStyle: { fontFamily: 'var(--font-family)', fontSize: 'var(--font-base)' },
    },
    {
      token: '--font-mono',
      category: 'Font family (Mono)',
      role: 'Code & Token Specimen',
      value: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
      preview: 'const tokens = { primary: "#0284c7", radius: "8px" };',
      fontStyle: { fontFamily: 'var(--font-mono)', fontSize: 'var(--font-sm)' },
    },
    {
      token: '--font-h1',
      category: 'Heading sizes',
      role: 'Display Heading 1',
      value: 'clamp(2rem, 4vw, 2.5rem)',
      preview: 'Design Systems at Scale',
      fontStyle: { fontSize: 'var(--font-h1)', fontWeight: 700, lineHeight: 1.2 },
    },
    {
      token: '--font-h2',
      category: 'Heading sizes',
      role: 'Section Heading 2',
      value: '1.75rem (28px)',
      preview: 'Component Architectural Standards',
      fontStyle: { fontSize: 'var(--font-h2)', fontWeight: 700, lineHeight: 1.25 },
    },
    {
      token: '--font-h3',
      category: 'Heading sizes',
      role: 'Card Heading 3',
      value: '1.375rem (22px)',
      preview: 'Tokens, Primitives, and Layouts',
      fontStyle: { fontSize: 'var(--font-h3)', fontWeight: 600, lineHeight: 1.3 },
    },
    {
      token: '--font-h4',
      category: 'Heading sizes',
      role: 'Sub-heading 4',
      value: '1.125rem (18px)',
      preview: 'Responsive Viewport Invariants',
      fontStyle: { fontSize: 'var(--font-h4)', fontWeight: 600, lineHeight: 1.35 },
    },
    {
      token: '--font-body',
      category: 'Body size',
      role: 'Standard Body Text',
      value: '1rem (16px)',
      preview: 'Clean typography ensures effortless readability across viewports from 320px up to 1440px.',
      fontStyle: { fontSize: 'var(--font-body)', fontWeight: 400, lineHeight: 1.6 },
    },
    {
      token: '--font-small',
      category: 'Small text',
      role: 'Secondary & Helper Text',
      value: '0.875rem (14px)',
      preview: 'Helper messages, secondary descriptions, metadata, and form annotations.',
      fontStyle: { fontSize: 'var(--font-small)', fontWeight: 400, lineHeight: 1.5 },
    },
    {
      token: '--font-xs',
      category: 'Small text',
      role: 'Captions & Badges',
      value: '0.75rem (12px)',
      preview: 'MICRO LABELS, STATUS CHIPS, AND CODE STAMPS',
      fontStyle: { fontSize: 'var(--font-xs)', fontWeight: 600, letterSpacing: '0.04em' },
    },
  ];

  // Spacing Tokens Data
  const spacingTokens = [
    { token: '--space-xs', name: 'xs', rem: '0.25rem', px: '4px', desc: 'Tight icon gaps, badge padding' },
    { token: '--space-sm', name: 'sm', rem: '0.5rem', px: '8px', desc: 'Button gaps, small list item spacing' },
    { token: '--space-md', name: 'md', rem: '1rem', px: '16px', desc: 'Standard card padding, form field gaps' },
    { token: '--space-lg', name: 'lg', rem: '1.5rem', px: '24px', desc: 'Container spacing, section item margins' },
    { token: '--space-xl', name: 'xl', rem: '2rem', px: '32px', desc: 'Large section gutters, dialog padding' },
    { token: '--space-2xl', name: '2xl', rem: '3rem', px: '48px', desc: 'Major layout divisions, hero vertical padding' },
  ];

  // Border Radius Tokens Data
  const radiusTokens = [
    {
      token: '--radius-sm',
      name: 'sm',
      value: '6px',
      desc: 'Subtle rounding for badges, small tags, tooltips',
      style: { borderRadius: 'var(--radius-sm)' },
    },
    {
      token: '--radius-md',
      name: 'md',
      value: '8px',
      desc: 'Standard buttons, inputs, dropdown menus',
      style: { borderRadius: 'var(--radius-md)' },
    },
    {
      token: '--radius-lg',
      name: 'lg',
      value: '12px',
      desc: 'Cards, preview boxes, notification containers',
      style: { borderRadius: 'var(--radius-lg)' },
    },
    {
      token: '--radius-pill',
      name: 'pill',
      value: '9999px',
      desc: 'Pill action buttons, status indicator tags, theme switches',
      style: { borderRadius: 'var(--radius-pill)' },
    },
  ];

  // Shadow Tokens Data
  const shadowTokens = [
    {
      token: '--shadow-sm',
      name: 'sm',
      elevation: 'Low elevation',
      desc: 'Resting cards, interactive buttons, subtle boundary lift',
      boxShadow: 'var(--shadow-sm)',
    },
    {
      token: '--shadow-md',
      name: 'md',
      elevation: 'Medium elevation',
      desc: 'Hovered cards, dropdown panels, floating action bars',
      boxShadow: 'var(--shadow-md)',
    },
    {
      token: '--shadow-lg',
      name: 'lg',
      elevation: 'High elevation',
      desc: 'Modal dialogs, popovers, drawer containers',
      boxShadow: 'var(--shadow-lg)',
    },
  ];

  // Transition Tokens Data
  const transitionTokens = [
    {
      token: '--transition-fast',
      name: 'fast',
      timing: '150ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      desc: 'Micro-interactions, button active states, hover border shifts',
      durationClass: 'trans-test-fast',
    },
    {
      token: '--transition-normal',
      name: 'normal',
      timing: '250ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      desc: 'Card elevation lifts, color theme switches, accordion expansion',
      durationClass: 'trans-test-normal',
    },
    {
      token: '--transition-slow',
      name: 'slow',
      timing: '400ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      desc: 'Modal dialog scale-ups, drawer reveals, hero entrance animations',
      durationClass: 'trans-test-slow',
    },
  ];

  return (
    <section id={id} className={`component-section tokens-spec-section ${className}`.trim()}>
      {/* 1. Header with Personal Frontend Spec Identity */}
      <div className="section-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', marginBottom: 'var(--space-xs)' }}>
          <span className="section-badge">Design Tokens Specification</span>
          <span className="token-badge" style={{ backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', fontWeight: 600 }}>
            v1.2.0 • variables.css
          </span>
        </div>
        <h2 className="section-title">Design Tokens System</h2>
        <p className="section-description">
          The systematic foundation of this personal design system. Hard-coded numbers have been replaced
          with CSS custom properties in <code>variables.css</code> for visual harmony, accessible contrast,
          and seamless dark/light theme switching.
        </p>

        {/* Category Quick Filter */}
        <div className="tokens-filter-tabs" style={{ marginTop: 'var(--space-md)', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-xs)' }}>
          {[
            { id: 'all', label: 'All Tokens' },
            { id: 'colors', label: 'Colors (10)' },
            { id: 'typography', label: 'Typography' },
            { id: 'spacing', label: 'Spacing (xs–2xl)' },
            { id: 'radius', label: 'Border Radius' },
            { id: 'shadows', label: 'Shadows' },
            { id: 'transitions', label: 'Transitions' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`btn btn-sm ${activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{ height: '30px', padding: 'var(--space-xs) var(--space-sm)' }}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Copy notification toast */}
      {copiedToken && (
        <div
          style={{
            position: 'fixed',
            bottom: 'var(--space-lg)',
            right: 'var(--space-lg)',
            zIndex: 150,
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-text)',
            padding: 'var(--space-sm) var(--space-md)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-primary)',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-sm)',
            fontSize: 'var(--font-sm)',
            fontFamily: 'var(--font-mono)',
            animation: 'modalFadeIn var(--transition-fast) ease-out',
          }}
        >
          <Check size={16} color="var(--color-success)" />
          <span>Copied <strong>{copiedToken}</strong> to clipboard!</span>
        </div>
      )}

      {/* =========================================================================
          TOKEN SPECIFICATION 1: COLORS
          ========================================================================= */}
      {(activeTab === 'all' || activeTab === 'colors') && (
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-md)', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
            <div>
              <h3 style={{ fontSize: 'var(--font-h3)', fontWeight: 700, color: 'var(--color-text)', margin: 0 }}>
                1. Colors
              </h3>
              <p style={{ fontSize: 'var(--font-small)', color: 'var(--color-muted)', margin: 'var(--space-0-5) 0 0' }}>
                Primary, Secondary, Accent, Background, Surface, Text, Muted, Border, Error, Success.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
              <span style={{ fontSize: 'var(--font-xs)', color: 'var(--color-muted)' }}>
                Active: <strong>{isDark ? 'Dark Theme' : 'Light Theme'}</strong>
              </span>
              <ThemeToggle variant="icon" size="sm" />
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 'var(--space-md)',
            }}
          >
            {colorTokens.map((c) => (
              <div
                key={c.name}
                className="token-color-card"
                onClick={() => copyToken(`var(${c.name})`)}
                title="Click to copy CSS token"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'transform var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Visual Swatch */}
                <div
                  style={{
                    height: '68px',
                    backgroundColor: c.swatch,
                    borderBottom: c.border || '1px solid var(--color-border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 var(--space-md)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--font-xs)',
                      fontWeight: 600,
                      color: c.textOn || 'var(--color-text)',
                      backgroundColor: 'rgba(0,0,0,0.18)',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-pill)',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    {c.role}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: c.textOn || 'var(--color-text)',
                      opacity: 0.9,
                    }}
                  >
                    {isDark ? c.darkVal : c.lightVal}
                  </span>
                </div>

                {/* Card Content & Token Name */}
                <div style={{ padding: 'var(--space-md)', display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <code style={{ fontSize: 'var(--font-sm)', fontWeight: 700, color: 'var(--color-text)' }}>
                      {c.name}
                    </code>
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      style={{ padding: '2px 6px', height: '24px' }}
                      title="Copy token"
                    >
                      <Copy size={13} color="var(--color-muted)" />
                    </button>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--color-primary)', fontFamily: 'var(--font-mono)' }}>
                    alias: {c.alias}
                  </div>
                  <p style={{ fontSize: 'var(--font-xs)', color: 'var(--color-muted)', margin: 'var(--space-xs) 0 0', lineHeight: 1.45 }}>
                    {c.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TOKEN SPECIFICATION 2: TYPOGRAPHY
          ========================================================================= */}
      {(activeTab === 'all' || activeTab === 'typography') && (
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <div style={{ marginBottom: 'var(--space-md)' }}>
            <h3 style={{ fontSize: 'var(--font-h3)', fontWeight: 700, color: 'var(--color-text)', margin: 0 }}>
              2. Typography
            </h3>
            <p style={{ fontSize: 'var(--font-small)', color: 'var(--color-muted)', margin: 'var(--space-0-5) 0 0' }}>
              Font family, Heading sizes (h1–h4), Body size, and Small text.
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-sm)',
              overflow: 'hidden',
            }}
          >
            {typographyTokens.map((t, idx) => (
              <div
                key={t.token}
                style={{
                  padding: 'var(--space-md)',
                  borderBottom: idx < typographyTokens.length - 1 ? '1px solid var(--color-border-subtle)' : 'none',
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: 'var(--space-sm)',
                  backgroundColor: idx % 2 === 0 ? 'transparent' : 'var(--color-bg-subtle)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                    <span className="token-badge" style={{ fontWeight: 600 }}>{t.category}</span>
                    <code
                      style={{ fontSize: 'var(--font-sm)', fontWeight: 700, color: 'var(--color-primary)', cursor: 'pointer' }}
                      onClick={() => copyToken(`var(${t.token})`)}
                      title="Click to copy token"
                    >
                      {t.token}
                    </code>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                    <span style={{ fontSize: 'var(--font-xs)', color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}>
                      {t.value}
                    </span>
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      style={{ padding: '2px 6px', height: '24px' }}
                      onClick={() => copyToken(`var(${t.token})`)}
                    >
                      <Copy size={13} color="var(--color-muted)" />
                    </button>
                  </div>
                </div>

                {/* Rendered Visual Specimen */}
                <div
                  style={{
                    color: 'var(--color-text)',
                    overflowWrap: 'break-word',
                    marginTop: 'var(--space-xs)',
                    ...t.fontStyle,
                  }}
                >
                  {t.preview}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TOKEN SPECIFICATION 3: SPACING
          ========================================================================= */}
      {(activeTab === 'all' || activeTab === 'spacing') && (
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <div style={{ marginBottom: 'var(--space-md)' }}>
            <h3 style={{ fontSize: 'var(--font-h3)', fontWeight: 700, color: 'var(--color-text)', margin: 0 }}>
              3. Spacing Scale
            </h3>
            <p style={{ fontSize: 'var(--font-small)', color: 'var(--color-muted)', margin: 'var(--space-0-5) 0 0' }}>
              Standard dimensional step scale: xs (4px), sm (8px), md (16px), lg (24px), xl (32px), 2xl (48px).
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-sm)',
              padding: 'var(--space-md)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-md)',
            }}
          >
            {spacingTokens.map((s) => (
              <div
                key={s.token}
                onClick={() => copyToken(`var(${s.token})`)}
                title="Click to copy spacing token"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(140px, 220px) 1fr minmax(60px, 80px)',
                  alignItems: 'center',
                  gap: 'var(--space-md)',
                  padding: 'var(--space-xs) var(--space-sm)',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  transition: 'background-color var(--transition-fast)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
                    <code style={{ fontSize: 'var(--font-sm)', fontWeight: 700, color: 'var(--color-text)' }}>
                      {s.token}
                    </code>
                    <span className="token-badge" style={{ fontSize: '10px' }}>{s.name}</span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--color-muted)', marginTop: '2px' }}>
                    {s.desc}
                  </div>
                </div>

                {/* Visual Spacing Meter Bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                  <div
                    style={{
                      height: '24px',
                      width: `var(${s.token})`,
                      backgroundColor: 'var(--color-primary)',
                      borderRadius: 'var(--radius-xs)',
                      minWidth: '4px',
                      maxWidth: '100%',
                      boxShadow: 'var(--shadow-xs)',
                    }}
                  />
                  <span style={{ fontSize: '11px', color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}>
                    {s.rem}
                  </span>
                </div>

                <div style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 'var(--font-sm)', fontWeight: 600, color: 'var(--color-text)' }}>
                  {s.px}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TOKEN SPECIFICATION 4: BORDER RADIUS
          ========================================================================= */}
      {(activeTab === 'all' || activeTab === 'radius') && (
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <div style={{ marginBottom: 'var(--space-md)' }}>
            <h3 style={{ fontSize: 'var(--font-h3)', fontWeight: 700, color: 'var(--color-text)', margin: 0 }}>
              4. Border Radius
            </h3>
            <p style={{ fontSize: 'var(--font-small)', color: 'var(--color-muted)', margin: 'var(--space-0-5) 0 0' }}>
              Corner curvature geometry: sm (6px), md (8px), lg (12px), pill (9999px).
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: 'var(--space-md)',
            }}
          >
            {radiusTokens.map((r) => (
              <div
                key={r.token}
                onClick={() => copyToken(`var(${r.token})`)}
                title="Click to copy radius token"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-lg)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: 'var(--space-md)',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'transform var(--transition-fast), border-color var(--transition-fast)',
                }}
              >
                {/* Visual Geometric Specimen Box */}
                <div
                  style={{
                    width: '84px',
                    height: '84px',
                    backgroundColor: 'var(--color-primary-light)',
                    border: '2px solid var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...r.style,
                  }}
                >
                  <span style={{ fontSize: 'var(--font-xs)', fontWeight: 700, color: 'var(--color-primary)', fontFamily: 'var(--font-mono)' }}>
                    {r.value}
                  </span>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-xs)' }}>
                    <code style={{ fontSize: 'var(--font-sm)', fontWeight: 700, color: 'var(--color-text)' }}>
                      {r.token}
                    </code>
                  </div>
                  <div style={{ fontSize: 'var(--font-xs)', color: 'var(--color-muted)', marginTop: 'var(--space-xs)' }}>
                    {r.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TOKEN SPECIFICATION 5: SHADOWS
          ========================================================================= */}
      {(activeTab === 'all' || activeTab === 'shadows') && (
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <div style={{ marginBottom: 'var(--space-md)' }}>
            <h3 style={{ fontSize: 'var(--font-h3)', fontWeight: 700, color: 'var(--color-text)', margin: 0 }}>
              5. Shadows & Elevation
            </h3>
            <p style={{ fontSize: 'var(--font-small)', color: 'var(--color-muted)', margin: 'var(--space-0-5) 0 0' }}>
              Z-axis elevation layers: sm (subtle lift), md (hover & flyouts), lg (modals & overlays).
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 'var(--space-lg)',
            }}
          >
            {shadowTokens.map((sh) => (
              <div
                key={sh.token}
                onClick={() => copyToken(`var(${sh.token})`)}
                title="Click to copy shadow token"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-lg)',
                  boxShadow: sh.boxShadow,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-sm)',
                  transition: 'transform var(--transition-fast)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <code style={{ fontSize: 'var(--font-sm)', fontWeight: 700, color: 'var(--color-text)' }}>
                    {sh.token}
                  </code>
                  <span className="token-badge" style={{ fontWeight: 600 }}>{sh.elevation}</span>
                </div>
                <p style={{ fontSize: 'var(--font-xs)', color: 'var(--color-muted)', margin: 0, lineHeight: 1.5 }}>
                  {sh.desc}
                </p>
                <div
                  style={{
                    marginTop: 'var(--space-xs)',
                    padding: 'var(--space-sm)',
                    backgroundColor: 'var(--color-bg)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px dashed var(--color-border)',
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-text-secondary)',
                    textAlign: 'center',
                  }}
                >
                  Live Depth Elevation
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TOKEN SPECIFICATION 6: TRANSITIONS
          ========================================================================= */}
      {(activeTab === 'all' || activeTab === 'transitions') && (
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <div style={{ marginBottom: 'var(--space-md)' }}>
            <h3 style={{ fontSize: 'var(--font-h3)', fontWeight: 700, color: 'var(--color-text)', margin: 0 }}>
              6. Transitions & Motion
            </h3>
            <p style={{ fontSize: 'var(--font-small)', color: 'var(--color-muted)', margin: 'var(--space-0-5) 0 0' }}>
              Motion curves and timing scale: fast (150ms), normal (250ms), slow (400ms).
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 'var(--space-md)',
            }}
          >
            {transitionTokens.map((tr) => {
              const isTesting = activeTransition === tr.name;
              return (
                <div
                  key={tr.token}
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-md)',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-sm)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <code style={{ fontSize: 'var(--font-sm)', fontWeight: 700, color: 'var(--color-text)' }}>
                      {tr.token}
                    </code>
                    <span className="token-badge" style={{ fontWeight: 600 }}>{tr.timing}</span>
                  </div>
                  <p style={{ fontSize: 'var(--font-xs)', color: 'var(--color-muted)', margin: 0, lineHeight: 1.45 }}>
                    {tr.desc}
                  </p>

                  {/* Interactive Motion Test Area */}
                  <div
                    style={{
                      marginTop: 'var(--space-xs)',
                      padding: 'var(--space-md)',
                      backgroundColor: 'var(--color-bg)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        backgroundColor: isTesting ? 'var(--color-accent)' : 'var(--color-primary)',
                        borderRadius: isTesting ? 'var(--radius-pill)' : 'var(--radius-sm)',
                        transform: isTesting ? 'translateX(100px) rotate(90deg)' : 'translateX(0) rotate(0deg)',
                        transition: `all var(${tr.token})`,
                      }}
                    />

                    <Button
                      size="sm"
                      variant="outline"
                      icon={<Play size={12} />}
                      onClick={() => triggerTransitionTest(tr.name)}
                      style={{ padding: 'var(--space-xs) var(--space-sm)', height: '28px' }}
                    >
                      Trigger
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Developer Integration Code Block */}
      <div className="section-usage-area" style={{ marginTop: 'var(--space-lg)' }}>
        <div className="usage-area-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
            <span className="usage-title">Usage Example: variables.css</span>
          </div>
          <button
            type="button"
            className="btn btn-ghost btn-sm copy-usage-btn"
            onClick={() => copyToken(`/* Using Design Tokens */
.my-component {
  color: var(--color-text);
  background-color: var(--color-surface);
  padding: var(--space-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-fast);
}`)}
          >
            <Copy size={13} />
            <span>Copy Snippet</span>
          </button>
        </div>
        <div className="doc-code-block">
          <pre>
            <code>{`/* Consumption in custom components and styles */
.developer-card {
  color: var(--color-text);
  background-color: var(--color-surface);
  padding: var(--space-md);           /* 16px */
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);     /* 8px */
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-fast), box-shadow var(--transition-normal);
}

.developer-card:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}`}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
