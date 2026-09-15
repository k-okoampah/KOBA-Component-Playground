import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Send,
  Download,
  Mail,
  Search,
  User,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Layers,
  Palette,
  ShieldCheck,
  MousePointer,
  Compass,
  Lock,
  Menu,
  Sun,
  Moon,
} from 'lucide-react';

import Hero from '../components/Hero/Hero.jsx';
import ComponentSection from '../components/ComponentSection/ComponentSection.jsx';
import Button from '../components/Button/Button.jsx';
import Card from '../components/Card/Card.jsx';
import Modal from '../components/Modal/Modal.jsx';
import FormInput from '../components/FormInput/FormInput.jsx';
import Navbar from '../components/Navbar/Navbar.jsx';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle.jsx';
import DesignTokens from '../components/DesignTokens/DesignTokens.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

/**
 * Main Playground page assembling all reusable components with live configuration knobs.
 */
export default function Playground() {
  const { theme, isDark, toggleTheme } = useTheme();

  // --- 1. Button Playground State ---
  const [btnVariant, setBtnVariant] = useState('primary');
  const [btnSize, setBtnSize] = useState('md');
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnHasIcon, setBtnHasIcon] = useState(true);
  const [btnText, setBtnText] = useState('Deploy Project');
  const [btnClickFeedback, setBtnClickFeedback] = useState(null);
  const [cardVariantFeedback, setCardVariantFeedback] = useState(null);

  // Generate Button Code Snippet
  const buttonSnippet = `<Button
  variant="${btnVariant}"
  size="${btnSize}"${btnDisabled ? '\n  disabled' : ''}${btnLoading ? '\n  loading' : ''}${
    btnHasIcon ? '\n  icon={<Send size={16} />}' : ''
  }
  onClick={() => console.log('Action triggered')}
>
  ${btnText}
</Button>`;

  // --- 2. Card Playground State ---
  const [cardVariant, setCardVariant] = useState('image');
  const [cardTitle, setCardTitle] = useState('Fluid Typography & Tokens');
  const [cardDescription, setCardDescription] = useState('Structured design tokens declaring responsive clamp scales, mathematical padding ratios, and semantic colors.');
  const [cardCategory, setCardCategory] = useState('DESIGN SYSTEM');
  const [cardInteractive, setCardInteractive] = useState(true);
  const [cardWithAction, setCardWithAction] = useState(true);
  const [interactiveClickCount, setInteractiveClickCount] = useState(0);

  // Generate Card Code Snippet
  const cardSnippet = `<Card
  variant="${cardVariant}"
  title="${cardTitle}"
  description="${cardDescription}"${cardCategory ? `\n  category="${cardCategory}"` : ''}${
    cardVariant === 'image'
      ? '\n  image="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=700&q=80"'
      : ''
  }${
    cardVariant === 'info'
      ? `\n  icon={<ShieldCheck size={20} />}\n  supportingInfo={[\n    'Status: Active & Verified',\n    'Protocol: OAuth 2.1 / PKCE',\n    'Audit: 100% Passed'\n  ]}`
      : ''
  }${
    cardVariant === 'interactive' ? '\n  onClick={() => handleSelect()}' : ''
  }${cardInteractive ? '\n  interactive' : ''}${
    cardWithAction
      ? `\n  action={
    <Button size="sm" variant="primary">
      Explore Details
    </Button>
  }`
      : ''
  }
/>`;


  // --- 3. Modal Playground State ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Welcome to the Component Playground');
  const [modalContent, setModalContent] = useState('This is a reusable React modal component.');
  const [showCloseButton, setShowCloseButton] = useState(true);
  const [modalConfirmed, setModalConfirmed] = useState(false);

  // Generate Modal Code Snippet
  const modalSnippet = `const [isOpen, setIsOpen] = useState(false);

{/* Trigger Button */}
<Button variant="primary" onClick={() => setIsOpen(true)}>
  Open Modal
</Button>

{/* Reusable Modal Component */}
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="${modalTitle}"${showCloseButton ? '' : '\n  showCloseButton={false}'}
  footer={
    <>
      <Button variant="outline" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button variant="primary" onClick={() => {
        // Confirmation action handler
        setIsOpen(false);
      }}>
        Confirm
      </Button>
    </>
  }
>
  <p>${modalContent}</p>
</Modal>`;

  // --- 4. FormInput Playground State ---
  const [inputLabel, setInputLabel] = useState('Work Email');
  const [inputType, setInputType] = useState('email');
  const [inputValue, setInputValue] = useState('');
  const [inputPlaceholder, setInputPlaceholder] = useState('alex.developer@example.com');
  const [inputHelper, setInputHelper] = useState('We will send verification credentials here.');
  const [inputError, setInputError] = useState('');
  const [inputHasIcon, setInputHasIcon] = useState(true);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [inputRequired, setInputRequired] = useState(true);

  // --- 5. Live Form Demonstration State & Validation ---
  const [liveForm, setLiveForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [liveFormErrors, setLiveFormErrors] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [liveFormTouched, setLiveFormTouched] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [liveFormSubmitted, setLiveFormSubmitted] = useState(false);

  // Basic Validation Logic
  const validateField = (field, value) => {
    let errorMsg = '';
    const trimmed = (value || '').trim();

    if (field === 'name') {
      if (!trimmed) {
        errorMsg = 'Name is required';
      }
    } else if (field === 'email') {
      if (!trimmed) {
        errorMsg = 'Email is required';
      } else {
        // Standard RFC 5322 compatible email format regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmed)) {
          errorMsg = 'Please enter a valid email address';
        }
      }
    } else if (field === 'password') {
      if (!value) {
        errorMsg = 'Password is required';
      } else if (value.length < 8) {
        errorMsg = 'Password must be at least 8 characters';
      }
    }
    return errorMsg;
  };

  const handleLiveFormChange = (field, value) => {
    setLiveForm((prev) => ({ ...prev, [field]: value }));
    // If field was already touched, revalidate on change
    if (liveFormTouched[field]) {
      const err = validateField(field, value);
      setLiveFormErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  const handleLiveFormBlur = (field) => {
    setLiveFormTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, liveForm[field]);
    setLiveFormErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleLiveFormSubmit = (e) => {
    e.preventDefault();
    const nameErr = validateField('name', liveForm.name);
    const emailErr = validateField('email', liveForm.email);
    const passErr = validateField('password', liveForm.password);

    setLiveFormTouched({ name: true, email: true, password: true });
    setLiveFormErrors({
      name: nameErr,
      email: emailErr,
      password: passErr,
    });

    if (!nameErr && !emailErr && !passErr) {
      setLiveFormSubmitted(true);
      setTimeout(() => setLiveFormSubmitted(false), 4000);
    } else {
      setLiveFormSubmitted(false);
    }
  };

  // Generate FormInput Code Snippet
  const inputSnippet = `<FormInput
  label="${inputLabel}"
  type="${inputType}"
  name="user-input"
  placeholder="${inputPlaceholder}"
  value={value}
  onChange={(e) => setValue(e.target.value)}${inputRequired ? '\n  required' : ''}${
    inputDisabled ? '\n  disabled' : ''
  }${inputHasIcon ? `\n  icon={<${inputType === 'password' ? 'Lock' : inputType === 'email' ? 'Mail' : 'User'} size={16} />}` : ''}${
    inputHelper ? `\n  helperText="${inputHelper}"` : ''
  }${inputError ? `\n  error="${inputError}"` : ''}
/>`;

  // --- 6. Navbar Showcase State & Snippet ---
  const [navActiveTab, setNavActiveTab] = useState('#button-section');
  const navbarSnippet = `<Navbar
  activeSection="${navActiveTab}"
  onNavigate={(href) => {
    // Smooth scroll to section target ID
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  }}
/>`;

  // --- Static Usage Examples (Documentation Block) ---
  const buttonUsageExample = `<Button variant="primary">
  Get Started
</Button>

// With icon and size
<Button variant="secondary" size="lg" icon={<Send size={18} />}>
  Send Message
</Button>`;

  const cardUsageExample = `<Card
  variant="image"
  category="DESIGN SYSTEM"
  title="Component Library"
  description="Reusable building blocks crafted with React and CSS tokens."
  image="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8"
  action={
    <Button size="sm" variant="primary">
      Explore
    </Button>
  }
/>`;

  const modalUsageExample = `const [isOpen, setIsOpen] = useState(false);

return (
  <>
    <Button variant="primary" onClick={() => setIsOpen(true)}>
      Open Modal
    </Button>

    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Welcome to the Component Playground"
      footer={
        <>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setIsOpen(false)}>
            Confirm
          </Button>
        </>
      }
    >
      <p>This is a reusable React modal component.</p>
    </Modal>
  </>
);`;

  const inputUsageExample = `<FormInput
  label="Work Email"
  type="email"
  name="email"
  placeholder="alex@company.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  helperText="We will never share your email address."
  required
/>`;

  const navbarUsageExample = `<Navbar
  activeSection="#button-section"
  onNavigate={(href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  }}
/>`;

  return (
    <main>
      {/* Hero Section */}
      <Hero
        onExplore={() => {
          const target = document.querySelector('#button-section');
          target?.scrollIntoView({ behavior: 'smooth' });
        }}
        onViewExamples={() => {
          const target = document.querySelector('#card-section');
          target?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <div className="app-container">
        {/* Quick Component Navigation Bar */}
        <div className="quick-nav-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={16} color="var(--color-primary)" />
            <span style={{ fontSize: 'var(--font-sm)', fontWeight: 600, color: 'var(--color-text)' }}>
              Component Jump List:
            </span>
          </div>

          <div className="quick-nav-links">
            <a href="#button-section" className="btn btn-secondary btn-sm">
              Buttons
            </a>
            <a href="#card-section" className="btn btn-secondary btn-sm">
              Cards
            </a>
            <a href="#modal-section" className="btn btn-secondary btn-sm">
              Modal
            </a>
            <a href="#input-section" className="btn btn-secondary btn-sm">
              Form Inputs
            </a>
            <a href="#navbar-section" className="btn btn-secondary btn-sm">
              Navbar
            </a>
            <a href="#form-demo-section" className="btn btn-secondary btn-sm">
              Live Form Demo
            </a>
            <a href="#tokens-section" className="btn btn-outline btn-sm">
              Design Tokens
            </a>
          </div>
        </div>

        {/* =========================================================
            SECTION 1: BUTTONS
            ========================================================= */}
        <ComponentSection
          id="button-section"
          badge="Core / Actions"
          title="Button Component"
          description="Interactive trigger for actions, submissions, and dialogs. Supports 5 design token variants, 3 sizing scales, loading states, and icon support."
          usage={buttonUsageExample}
          codeSnippet={buttonSnippet}
          variations={
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <div style={{ fontSize: 'var(--font-xs)', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Variants
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="danger">Danger</Button>
                </div>
              </div>

              <div>
                <div style={{ fontSize: 'var(--font-xs)', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Sizes
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
                  <Button size="sm" variant="primary">Small (sm)</Button>
                  <Button size="md" variant="primary">Medium (md)</Button>
                  <Button size="lg" variant="primary">Large (lg)</Button>
                </div>
              </div>

              <div>
                <div style={{ fontSize: 'var(--font-xs)', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  States & Icons
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
                  <Button variant="primary" icon={<Send size={16} />}>With Icon</Button>
                  <Button variant="primary" loading>Loading</Button>
                  <Button variant="primary" disabled>Disabled</Button>
                  <Button variant="outline" icon={<Download size={16} />}>Outline + Icon</Button>
                </div>
              </div>
            </div>
          }
          controls={
            <>
              <div className="control-item">
                <label className="control-label">Variant</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {['primary', 'secondary', 'outline', 'ghost', 'danger'].map((v) => (
                    <button
                      key={v}
                      type="button"
                      className={`btn btn-sm ${btnVariant === v ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ padding: '4px 10px', height: '28px' }}
                      onClick={() => setBtnVariant(v)}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div className="control-item">
                <label className="control-label">Size</label>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {['sm', 'md', 'lg'].map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`btn btn-sm ${btnSize === s ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ padding: '4px 12px', height: '28px' }}
                      onClick={() => setBtnSize(s)}
                    >
                      {s.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="control-item">
                <label className="control-label">Button Label</label>
                <input
                  type="text"
                  className="form-input"
                  value={btnText}
                  onChange={(e) => setBtnText(e.target.value)}
                  style={{ height: '34px' }}
                />
              </div>

              <div className="control-item" style={{ flexDirection: 'row', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--font-xs)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={btnHasIcon}
                    onChange={(e) => setBtnHasIcon(e.target.checked)}
                  />
                  <span>Leading Icon</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--font-xs)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={btnLoading}
                    onChange={(e) => setBtnLoading(e.target.checked)}
                  />
                  <span>Loading State</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--font-xs)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={btnDisabled}
                    onChange={(e) => setBtnDisabled(e.target.checked)}
                  />
                  <span>Disabled</span>
                </label>
              </div>
            </>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <Button
              id="playground-target-button"
              variant={btnVariant}
              size={btnSize}
              disabled={btnDisabled}
              loading={btnLoading}
              icon={btnHasIcon ? <Send size={btnSize === 'sm' ? 14 : btnSize === 'lg' ? 18 : 16} /> : null}
              onClick={() => {
                setBtnClickFeedback(`Triggered: ${btnVariant} (${btnSize})`);
                setTimeout(() => setBtnClickFeedback(null), 2500);
              }}
            >
              {btnText}
            </Button>

            {btnClickFeedback ? (
              <span
                className="token-badge"
                style={{
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  fontWeight: 600,
                  border: '1px solid rgba(2, 132, 199, 0.3)',
                }}
              >
                ✓ {btnClickFeedback}
              </span>
            ) : (
              <span style={{ fontSize: 'var(--font-xs)', color: 'var(--color-text-muted)' }}>
                Click button above to trigger active state
              </span>
            )}
          </div>
        </ComponentSection>

        {/* =========================================================
            SECTION 2: CARDS
            ========================================================= */}
        <ComponentSection
          id="card-section"
          badge="Surfaces / Containers"
          title="Card Component"
          description="Flexible, reusable card component supporting Image, Information, and Interactive variants with consistent tokens, elevation, and responsive layouts."
          usage={cardUsageExample}
          codeSnippet={cardSnippet}
          variations={
            <div className="variations-grid">
              <Card
                variant="image"
                category="IMAGE CARD"
                title="Visual Media Showcase"
                description="Card surface with media header, category badge, and action footer."
                image="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80"
                action={<Button size="sm" variant="primary">View Media</Button>}
              />
              <Card
                variant="info"
                category="INFORMATION CARD"
                icon={<ShieldCheck size={20} />}
                title="System Specifications"
                description="Status indicator card providing key metrics and security parameters."
                supportingInfo={[
                  <span key="1">Status: Active & Verified</span>,
                  <span key="2">Protocol: OAuth 2.1</span>,
                ]}
                action={<Button size="sm" variant="outline">Details</Button>}
              />
              <Card
                variant="interactive"
                category="INTERACTIVE CARD"
                icon={<MousePointer size={20} />}
                title="Interactive Hover Elevation"
                description="Interactive surface with smooth cursor styling, elevation jump, and keydown accessibility."
                onClick={() => {
                  setCardVariantFeedback('Interactive Card Activated!');
                  setTimeout(() => setCardVariantFeedback(null), 2200);
                }}
                action={
                  <span
                    style={{
                      fontSize: 'var(--font-xs)',
                      color: cardVariantFeedback ? 'var(--color-success)' : 'var(--color-primary)',
                      fontWeight: 600,
                    }}
                  >
                    {cardVariantFeedback || 'Click to trigger'}
                  </span>
                }
              />
            </div>
          }
          controls={
            <>
              <div className="control-item">
                <label className="control-label">Card Variant</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px' }}>
                  {[
                    { id: 'image', label: 'Image Card' },
                    { id: 'info', label: 'Information' },
                    { id: 'interactive', label: 'Interactive' },
                    { id: 'default', label: 'Default' },
                  ].map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => {
                        setCardVariant(v.id);
                        if (v.id === 'image') {
                          setCardCategory('DESIGN SYSTEM');
                          setCardTitle('Fluid Typography & Tokens');
                          setCardDescription('Structured design tokens declaring responsive clamp scales, mathematical padding ratios, and semantic colors.');
                        } else if (v.id === 'info') {
                          setCardCategory('SECURITY');
                          setCardTitle('Enterprise Access Control');
                          setCardDescription('Role-based authorization rules with end-to-end token validation and strict CSP sandbox constraints.');
                        } else if (v.id === 'interactive') {
                          setCardCategory('MICRO-INTERACTION');
                          setCardTitle('Tactile Elevation & Focus');
                          setCardDescription('Responds with smooth cubic-bezier elevation shifts, border highlight, and keyboard actuation.');
                        }
                      }}
                      className="btn btn-sm"
                      style={{
                        backgroundColor: cardVariant === v.id ? 'var(--color-primary)' : 'var(--color-bg)',
                        color: cardVariant === v.id ? '#ffffff' : 'var(--color-text)',
                        border: '1px solid',
                        borderColor: cardVariant === v.id ? 'var(--color-primary)' : 'var(--color-border)',
                        justifyContent: 'center',
                      }}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="control-item">
                <label className="control-label">Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={cardTitle}
                  onChange={(e) => setCardTitle(e.target.value)}
                  style={{ height: '34px' }}
                />
              </div>

              <div className="control-item">
                <label className="control-label">Category</label>
                <input
                  type="text"
                  className="form-input"
                  value={cardCategory}
                  onChange={(e) => setCardCategory(e.target.value)}
                  style={{ height: '34px' }}
                />
              </div>

              <div className="control-item">
                <label className="control-label">Description</label>
                <textarea
                  className="form-input"
                  value={cardDescription}
                  onChange={(e) => setCardDescription(e.target.value)}
                  rows={2}
                  style={{ height: '56px', resize: 'none' }}
                />
              </div>

              <div className="control-item" style={{ flexDirection: 'row', gap: '16px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--font-xs)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={cardInteractive}
                    onChange={(e) => setCardInteractive(e.target.checked)}
                  />
                  <span>Hover Elevation</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--font-xs)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={cardWithAction}
                    onChange={(e) => setCardWithAction(e.target.checked)}
                  />
                  <span>Action Button</span>
                </label>
              </div>
            </>
          }
        >
          <div style={{ width: '100%', maxWidth: '400px' }}>
            <Card
              id="playground-target-card"
              variant={cardVariant}
              title={cardTitle}
              description={cardDescription}
              category={cardCategory}
              interactive={cardInteractive}
              image={
                cardVariant === 'image'
                  ? 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=700&q=80'
                  : null
              }
              icon={
                cardVariant === 'info' ? (
                  <ShieldCheck size={20} />
                ) : cardVariant === 'interactive' ? (
                  <MousePointer size={20} />
                ) : null
              }
              supportingInfo={
                cardVariant === 'info' ? (
                  [
                    'Status: Active & Verified',
                    'Protocol: OAuth 2.1 / PKCE',
                    'Audit: 100% Passed',
                  ]
                ) : null
              }
              onClick={
                cardVariant === 'interactive'
                  ? () => setInteractiveClickCount((c) => c + 1)
                  : undefined
              }
              action={
                cardWithAction ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    {cardVariant === 'interactive' ? (
                      <span style={{ fontSize: 'var(--font-xs)', color: 'var(--color-primary)', fontWeight: 600 }}>
                        {interactiveClickCount === 0 ? 'Click to test' : `Clicked ${interactiveClickCount} time${interactiveClickCount === 1 ? '' : 's'}`}
                      </span>
                    ) : (
                      <span style={{ fontSize: 'var(--font-xs)', color: 'var(--color-text-tertiary)' }}>
                        Updated 2 mins ago
                      </span>
                    )}
                    <Button size="sm" variant="primary" icon={<ArrowRight size={14} />}>
                      Explore
                    </Button>
                  </div>
                ) : null
              }
            />
          </div>
        </ComponentSection>

        {/* =========================================================
            LIVE CARD EXAMPLES SHOWCASE (Image, Info, Interactive)
            ========================================================= */}
        <section id="examples" className="component-section" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <div className="section-header">
            <span className="section-badge">Live Card Showcase</span>
            <h2 className="section-title">3 Core Card Variants</h2>
            <p className="section-description">
              All three examples below share the exact same reusable <code>&lt;Card /&gt;</code> component
              configured with declarative React props, responsive grid scaling, and tokenized styling.
            </p>
          </div>

          <div className="cards-grid cards-grid-3">
            {/* Example 1: Image Card */}
            <Card
              id="card-example-image"
              variant="image"
              image="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=700&q=80"
              category="DESIGN SYSTEM"
              title="Reusable Component Tokens"
              description="Standardized typographic clamp scales, mathematical padding ratios, and semantic surface contrast variables."
              interactive={true}
              action={
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <span style={{ fontSize: 'var(--font-xs)', color: 'var(--color-text-tertiary)' }}>
                    Tokens v2.4
                  </span>
                  <Button size="sm" variant="primary" icon={<ArrowRight size={14} />}>
                    Explore Specs
                  </Button>
                </div>
              }
            />

            {/* Example 2: Information Card */}
            <Card
              id="card-example-info"
              variant="info"
              category="SECURITY & COMPLIANCE"
              icon={<ShieldCheck size={22} />}
              title="Enterprise Access Control"
              description="Role-based authorization rules with end-to-end token validation and strict CSP sandbox constraints."
              supportingInfo={[
                <span key="1"><strong>Status:</strong> Active & Monitored</span>,
                <span key="2"><strong>Protocol:</strong> OAuth 2.1 / PKCE</span>,
                <span key="3"><strong>Audit Score:</strong> 100% Passed</span>,
              ]}
              action={
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <span style={{ fontSize: 'var(--font-xs)', color: 'var(--color-success)', fontWeight: 600 }}>
                    ● All Systems Normal
                  </span>
                  <Button size="sm" variant="outline" icon={<ExternalLink size={14} />}>
                    Audit Log
                  </Button>
                </div>
              }
            />

            {/* Example 3: Interactive Card */}
            <Card
              id="card-example-interactive"
              variant="interactive"
              category="INTERACTIVE STATE"
              icon={<MousePointer size={22} />}
              title="Tactile Hover & Elevation"
              description="Engineered with smooth cubic-bezier elevation, border highlight on focus, and accessible keyboard actuation (Enter or Space)."
              onClick={() => setInteractiveClickCount((c) => c + 1)}
              action={
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <span style={{ fontSize: 'var(--font-xs)', color: 'var(--color-primary)', fontWeight: 600 }}>
                    {interactiveClickCount === 0 ? 'Click to interact' : `Tapped ${interactiveClickCount} time${interactiveClickCount === 1 ? '' : 's'}`}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      setInteractiveClickCount((c) => c + 1);
                    }}
                  >
                    Tap Card
                  </Button>
                </div>
              }
            >
              <div
                style={{
                  padding: '8px 12px',
                  backgroundColor: 'var(--color-bg)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 'var(--font-xs)',
                  color: 'var(--color-text-secondary)',
                  border: '1px dashed var(--color-border)',
                }}
              >
                Hover cursor changes to pointer with translateY(-4px) elevation and box-shadow depth.
              </div>
            </Card>
          </div>
        </section>


        {/* =========================================================
            SECTION 3: MODAL
            ========================================================= */}
        <ComponentSection
          id="modal-section"
          badge="Overlays / Dialogs"
          title="Modal Component"
          description="Accessible dialog overlay with backdrop blur, keydown Escape listener, focus trap, header dismiss, and customizable action footer."
          usage={modalUsageExample}
          codeSnippet={modalSnippet}
          variations={
            <div className="variations-grid">
              <div
                style={{
                  padding: '16px',
                  backgroundColor: 'var(--color-bg)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div style={{ fontWeight: 600, fontSize: 'var(--font-sm)', marginBottom: '8px', color: 'var(--color-text)' }}>
                  Interactive Trigger
                </div>
                <p style={{ fontSize: 'var(--font-xs)', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
                  Controlled via <code>isOpen</code> prop with smooth fade-in and scale spring animations.
                </p>
                <Button size="sm" variant="primary" onClick={() => setIsModalOpen(true)}>
                  Launch Demo Modal
                </Button>
              </div>

              <div
                style={{
                  padding: '16px',
                  backgroundColor: 'var(--color-bg)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div style={{ fontWeight: 600, fontSize: 'var(--font-sm)', marginBottom: '8px', color: 'var(--color-text)' }}>
                  Dismiss Methods
                </div>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: 'var(--font-xs)', color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <li>Clicking the close <strong>X button</strong></li>
                  <li>Clicking anywhere on the <strong>overlay</strong></li>
                  <li>Pressing the keyboard <strong>Escape key</strong></li>
                  <li>Explicit Cancel / Confirm actions</li>
                </ul>
              </div>

              <div
                style={{
                  padding: '16px',
                  backgroundColor: 'var(--color-bg)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div style={{ fontWeight: 600, fontSize: 'var(--font-sm)', marginBottom: '8px', color: 'var(--color-text)' }}>
                  Accessibility Specs
                </div>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: 'var(--font-xs)', color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <li><code>role="dialog"</code> and <code>aria-modal="true"</code></li>
                  <li><code>aria-labelledby</code> pointing to modal title</li>
                  <li>Background scroll lock (body overflow hidden)</li>
                  <li>Aria-label on close action</li>
                </ul>
              </div>
            </div>
          }
          controls={
            <>
              <div className="control-item">
                <label className="control-label">Modal Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={modalTitle}
                  onChange={(e) => setModalTitle(e.target.value)}
                  style={{ height: '34px' }}
                />
              </div>

              <div className="control-item">
                <label className="control-label">Modal Content</label>
                <input
                  type="text"
                  className="form-input"
                  value={modalContent}
                  onChange={(e) => setModalContent(e.target.value)}
                  style={{ height: '34px' }}
                />
              </div>

              <div className="control-item">
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--font-xs)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={showCloseButton}
                    onChange={(e) => setShowCloseButton(e.target.checked)}
                  />
                  <span>Show Close (X) Button</span>
                </label>
              </div>

              <div className="control-item">
                <Button
                  id="open-modal-trigger-btn"
                  variant="primary"
                  onClick={() => setIsModalOpen(true)}
                  icon={<Sparkles size={16} />}
                >
                  Open Modal
                </Button>
                <span style={{ fontSize: 'var(--font-xs)', color: 'var(--color-text-tertiary)' }}>
                  Press Escape or click backdrop to close
                </span>
              </div>
            </>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '12px 0' }}>
            <Button
              id="live-demo-open-modal"
              variant="primary"
              size="lg"
              onClick={() => setIsModalOpen(true)}
            >
              Open Modal
            </Button>

            {modalConfirmed && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--color-success)',
                  backgroundColor: 'var(--color-primary-light)',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--font-sm)',
                  fontWeight: 500,
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                }}
              >
                <CheckCircle2 size={16} /> Action confirmed successfully!
              </div>
            )}
          </div>
        </ComponentSection>

        {/* The Actual Modal Instance */}
        <Modal
          id="playground-target-modal"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={modalTitle}
          showCloseButton={showCloseButton}
          footer={
            <>
              <Button
                id="modal-cancel-btn"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                id="modal-confirm-btn"
                variant="primary"
                onClick={() => {
                  setModalConfirmed(true);
                  setIsModalOpen(false);
                }}
              >
                Confirm
              </Button>
            </>
          }
        >
          <p style={{ margin: 0, fontSize: 'var(--font-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
            {modalContent}
          </p>
        </Modal>

        {/* =========================================================
            SECTION 4: FORMINPUT
            ========================================================= */}
        <ComponentSection
          id="input-section"
          badge="Forms / Data Input"
          title="FormInput Component"
          description="Accessible, reusable form input supporting text, email, and password types with Default, Focus, Filled, Error, Disabled, and Required states."
          usage={inputUsageExample}
          codeSnippet={inputSnippet}
          variations={
            <div className="variations-grid">
              <div>
                <div style={{ fontSize: 'var(--font-xs)', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  1. Default & Focus State
                </div>
                <FormInput
                  label="Display Name"
                  placeholder="e.g. Alex Morgan"
                  helperText="Standard default input field."
                />
              </div>

              <div>
                <div style={{ fontSize: 'var(--font-xs)', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  2. Filled State (with Icon)
                </div>
                <FormInput
                  label="Work Email"
                  type="email"
                  defaultValue="alex.morgan@company.org"
                  icon={<Mail size={16} />}
                  helperText="Valid email successfully recognized."
                />
              </div>

              <div>
                <div style={{ fontSize: 'var(--font-xs)', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  3. Error State
                </div>
                <FormInput
                  label="Account Email"
                  type="email"
                  defaultValue="invalid-email-address"
                  error="Please enter a valid email format"
                  icon={<Mail size={16} />}
                />
              </div>

              <div>
                <div style={{ fontSize: 'var(--font-xs)', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  4. Password Type (Show/Hide)
                </div>
                <FormInput
                  label="Master Password"
                  type="password"
                  defaultValue="SecretPassword123"
                  helperText="Includes accessible visibility toggle."
                />
              </div>

              <div>
                <div style={{ fontSize: 'var(--font-xs)', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  5. Required State
                </div>
                <FormInput
                  label="Workspace Subdomain"
                  placeholder="my-team"
                  required
                  helperText="Required indicator with asterisk."
                />
              </div>

              <div>
                <div style={{ fontSize: 'var(--font-xs)', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  6. Disabled State
                </div>
                <FormInput
                  label="System Identifier (Read-Only)"
                  defaultValue="SYS-UID-984214"
                  disabled
                  readOnly
                  helperText="Disabled field with dimmed opacity."
                />
              </div>
            </div>
          }
          controls={
            <>
              <div className="control-item">
                <label className="control-label">Input Type</label>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {[
                    { id: 'text', label: 'Text' },
                    { id: 'email', label: 'Email' },
                    { id: 'password', label: 'Password' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        setInputType(t.id);
                        if (t.id === 'text') {
                          setInputLabel('Full Name');
                          setInputPlaceholder('Ada Lovelace');
                          setInputHelper('Enter your preferred display name.');
                        } else if (t.id === 'email') {
                          setInputLabel('Work Email');
                          setInputPlaceholder('alex.developer@example.com');
                          setInputHelper('We will send verification credentials here.');
                        } else if (t.id === 'password') {
                          setInputLabel('Account Password');
                          setInputPlaceholder('••••••••••••');
                          setInputHelper('Must contain at least 8 characters.');
                        }
                      }}
                      className="btn btn-sm"
                      style={{
                        flex: 1,
                        backgroundColor: inputType === t.id ? 'var(--color-primary)' : 'var(--color-bg)',
                        color: inputType === t.id ? '#ffffff' : 'var(--color-text)',
                        border: '1px solid',
                        borderColor: inputType === t.id ? 'var(--color-primary)' : 'var(--color-border)',
                        justifyContent: 'center',
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="control-item">
                <label className="control-label">Label Text</label>
                <input
                  type="text"
                  className="form-input"
                  value={inputLabel}
                  onChange={(e) => setInputLabel(e.target.value)}
                  style={{ height: '34px' }}
                />
              </div>

              <div className="control-item">
                <label className="control-label">Placeholder</label>
                <input
                  type="text"
                  className="form-input"
                  value={inputPlaceholder}
                  onChange={(e) => setInputPlaceholder(e.target.value)}
                  style={{ height: '34px' }}
                />
              </div>

              <div className="control-item">
                <label className="control-label">Helper Text</label>
                <input
                  type="text"
                  className="form-input"
                  value={inputHelper}
                  onChange={(e) => setInputHelper(e.target.value)}
                  style={{ height: '34px' }}
                />
              </div>

              <div className="control-item">
                <label className="control-label">Simulate Error Message</label>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Invalid email format"
                    value={inputError}
                    onChange={(e) => setInputError(e.target.value)}
                    style={{ height: '34px' }}
                  />
                  {inputError && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setInputError('')}
                    >
                      Clear
                    </Button>
                  )}
                </div>
              </div>

              <div className="control-item" style={{ flexDirection: 'row', gap: '16px', flexWrap: 'wrap' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--font-xs)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={inputHasIcon}
                    onChange={(e) => setInputHasIcon(e.target.checked)}
                  />
                  <span>Leading Icon</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--font-xs)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={inputRequired}
                    onChange={(e) => setInputRequired(e.target.checked)}
                  />
                  <span>Required</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--font-xs)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={inputDisabled}
                    onChange={(e) => setInputDisabled(e.target.checked)}
                  />
                  <span>Disabled</span>
                </label>
              </div>
            </>
          }
        >
          <div style={{ width: '100%', maxWidth: '380px' }}>
            <FormInput
              id="playground-target-input"
              name="playground-field"
              type={inputType}
              label={inputLabel}
              placeholder={inputPlaceholder}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              helperText={inputHelper}
              error={inputError}
              required={inputRequired}
              disabled={inputDisabled}
              icon={
                inputHasIcon ? (
                  inputType === 'password' ? (
                    <Lock size={16} />
                  ) : inputType === 'email' ? (
                    <Mail size={16} />
                  ) : (
                    <User size={16} />
                  )
                ) : null
              }
            />

            {/* States Status Pill Matrix */}
            <div
              style={{
                marginTop: '16px',
                padding: '12px',
                backgroundColor: 'var(--color-bg)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--font-xs)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div style={{ fontWeight: 600, color: 'var(--color-text)', display: 'flex', justifyContent: 'space-between' }}>
                <span>Interactive States Detected:</span>
                <span style={{ color: 'var(--color-text-tertiary)' }}>{inputType.toUpperCase()}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                <span className="token-badge" style={{ backgroundColor: 'var(--color-bg-subtle)', color: 'var(--color-text-secondary)' }}>
                  1. Default: Ready
                </span>
                <span className="token-badge" style={{ backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
                  2. Focus: :focus-visible
                </span>
                <span
                  className="token-badge"
                  style={{
                    backgroundColor: inputValue ? 'var(--color-success-light)' : 'var(--color-bg-subtle)',
                    color: inputValue ? 'var(--color-success)' : 'var(--color-muted)',
                    borderColor: inputValue ? 'var(--color-success)' : 'var(--color-border)',
                  }}
                >
                  3. Filled: {inputValue ? `"${inputValue.slice(0, 10)}${inputValue.length > 10 ? '...' : ''}"` : 'Empty'}
                </span>
                <span
                  className="token-badge"
                  style={{
                    backgroundColor: inputError ? 'var(--color-danger-light)' : 'var(--color-bg-subtle)',
                    color: inputError ? 'var(--color-danger)' : 'var(--color-muted)',
                    borderColor: inputError ? 'var(--color-danger)' : 'var(--color-border)',
                  }}
                >
                  4. Error: {inputError ? 'Active' : 'None'}
                </span>
                <span
                  className="token-badge"
                  style={{
                    backgroundColor: inputDisabled ? 'var(--color-bg-subtle)' : 'var(--color-bg-subtle)',
                    color: inputDisabled ? 'var(--color-text-tertiary)' : 'var(--color-muted)',
                  }}
                >
                  5. Disabled: {inputDisabled ? 'Yes' : 'No'}
                </span>
                <span
                  className="token-badge"
                  style={{
                    backgroundColor: inputRequired ? 'var(--color-primary-light)' : 'var(--color-bg-subtle)',
                    color: inputRequired ? 'var(--color-primary)' : 'var(--color-muted)',
                  }}
                >
                  6. Required: {inputRequired ? 'Yes (*)' : 'No'}
                </span>
              </div>
            </div>
          </div>
        </ComponentSection>

        {/* =========================================================
            LIVE FORM DEMONSTRATION (Name, Email, Password with validation)
            ========================================================= */}
        <section id="form-demo-section" className="component-section" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <div className="section-header">
            <span className="section-badge">Live Form Demo</span>
            <h2 className="section-title">Registration Form Demonstration</h2>
            <p className="section-description">
              Demonstrates real-world form submission using modular <code>&lt;FormInput /&gt;</code> components.
              Includes custom validation rules (not relying on browser defaults alone), accessible labels,
              and inline error feedback beneath each field.
            </p>
          </div>

          <div className="form-demo-grid">
            {/* Live Form Container */}
            <div className="form-demo-card">
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: 'var(--font-base)', fontWeight: 700, margin: 0, color: 'var(--color-text)' }}>
                  Create an Account
                </h3>
                <p style={{ fontSize: 'var(--font-xs)', color: 'var(--color-text-tertiary)', margin: '4px 0 0' }}>
                  Fields with asterisks (*) are required. Validation runs on blur and submit.
                </p>
              </div>

              <form onSubmit={handleLiveFormSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* 1. Name Field */}
                <FormInput
                  id="live-form-name"
                  name="name"
                  type="text"
                  label="Full Name"
                  placeholder="e.g. Sarah Connor"
                  value={liveForm.name}
                  onChange={(e) => handleLiveFormChange('name', e.target.value)}
                  onBlur={() => handleLiveFormBlur('name')}
                  error={liveFormErrors.name}
                  helperText="Your real name or organizational alias."
                  required={true}
                  icon={<User size={16} />}
                />

                {/* 2. Email Field */}
                <FormInput
                  id="live-form-email"
                  name="email"
                  type="email"
                  label="Email Address"
                  placeholder="s.connor@example.com"
                  value={liveForm.email}
                  onChange={(e) => handleLiveFormChange('email', e.target.value)}
                  onBlur={() => handleLiveFormBlur('email')}
                  error={liveFormErrors.email}
                  helperText="Must be a valid email format (e.g. user@domain.com)."
                  required={true}
                  icon={<Mail size={16} />}
                />

                {/* 3. Password Field */}
                <FormInput
                  id="live-form-password"
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Enter 8+ characters"
                  value={liveForm.password}
                  onChange={(e) => handleLiveFormChange('password', e.target.value)}
                  onBlur={() => handleLiveFormBlur('password')}
                  error={liveFormErrors.password}
                  helperText="Must contain a minimum of 8 characters."
                  required={true}
                  icon={<Lock size={16} />}
                />

                {/* Success Banner */}
                {liveFormSubmitted && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: 'var(--color-success-light)',
                      color: 'var(--color-success)',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      fontSize: 'var(--font-sm)',
                      fontWeight: 600,
                      border: '1px solid var(--color-success)',
                    }}
                  >
                    <CheckCircle2 size={18} />
                    <span>Form validated & submitted successfully!</span>
                  </div>
                )}

                {/* Form Actions */}
                <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    icon={<ArrowRight size={16} />}
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    Submit Form
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="md"
                    onClick={() => {
                      setLiveForm({ name: '', email: '', password: '' });
                      setLiveFormErrors({ name: '', email: '', password: '' });
                      setLiveFormTouched({ name: false, email: false, password: false });
                      setLiveFormSubmitted(false);
                    }}
                  >
                    Reset
                  </Button>
                </div>
              </form>
            </div>

            {/* Validation Rules & Live State Inspector */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--space-6)',
                }}
              >
                <h4 style={{ fontSize: 'var(--font-sm)', fontWeight: 700, margin: '0 0 12px', color: 'var(--color-text)' }}>
                  Validation Rules Spec:
                </h4>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: 'var(--font-xs)', color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li>
                    <strong>Name:</strong> Required field. Validates non-empty trimmed value.
                  </li>
                  <li>
                    <strong>Email:</strong> Required field. Validates standard RFC format with <code>@</code> and domain dot.
                  </li>
                  <li>
                    <strong>Password:</strong> Required field. Enforces a strict minimum of 8 characters with show/hide eye toggle.
                  </li>
                  <li>
                    <strong>Accessibility:</strong> Generates unique connected IDs, <code>aria-invalid</code>, <code>aria-required</code>, and <code>aria-describedby</code> targeting error/helper text.
                  </li>
                </ul>
              </div>

              {/* Form Data Stream Output */}
              <div
                style={{
                  backgroundColor: 'var(--color-bg-subtle)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-4)',
                  fontSize: 'var(--font-xs)',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: '6px', color: 'var(--color-text)' }}>
                  Live Form State Stream:
                </div>
                <pre style={{ margin: 0, overflowX: 'auto' }}>
{JSON.stringify(
  {
    values: {
      name: liveForm.name,
      email: liveForm.email,
      password: liveForm.password ? '•'.repeat(liveForm.password.length) : '',
    },
    errors: liveFormErrors,
    isValid: !validateField('name', liveForm.name) && !validateField('email', liveForm.email) && !validateField('password', liveForm.password),
  },
  null,
  2
)}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 5: NAVBAR
            ========================================================= */}
        <ComponentSection
          id="navbar-section"
          badge="Navigation / Shell"
          title="Navbar Component"
          description="Fixed responsive application header featuring brand identity with icon badge, version indicator, accessible anchor jump links with active states, and theme toggler."
          usage={navbarUsageExample}
          codeSnippet={navbarSnippet}
          variations={
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <div style={{ fontSize: 'var(--font-xs)', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Live Navigation Bar Specimen
                </div>
                <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', backgroundColor: 'var(--color-surface)' }}>
                  <Navbar
                    id="specimen-navbar-variations"
                    activeSection={navActiveTab}
                    onNavigate={(href) => setNavActiveTab(href)}
                  />
                </div>
              </div>

              <div className="navbar-features-grid">
                <div style={{ padding: '12px', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontWeight: 600, fontSize: 'var(--font-xs)', color: 'var(--color-text)', marginBottom: '4px' }}>
                    1. Brand Identity
                  </div>
                  <p style={{ margin: 0, fontSize: 'var(--font-xs)', color: 'var(--color-text-secondary)' }}>
                    Visual icon logo with title, subtitle, and version badge.
                  </p>
                </div>
                <div style={{ padding: '12px', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontWeight: 600, fontSize: 'var(--font-xs)', color: 'var(--color-text)', marginBottom: '4px' }}>
                    2. Section Anchors
                  </div>
                  <p style={{ margin: 0, fontSize: 'var(--font-xs)', color: 'var(--color-text-secondary)' }}>
                    Keyboard navigable links targeting in-page IDs with smooth scrolling.
                  </p>
                </div>
                <div style={{ padding: '12px', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontWeight: 600, fontSize: 'var(--font-xs)', color: 'var(--color-text)', marginBottom: '4px' }}>
                    3. Glass Backdrop
                  </div>
                  <p style={{ margin: 0, fontSize: 'var(--font-xs)', color: 'var(--color-text-secondary)' }}>
                    Semi-transparent blur header pinning to top of viewport with high Z-index.
                  </p>
                </div>
              </div>
            </div>
          }
          controls={
            <>
              <div className="control-item">
                <label className="control-label">Simulate Active Nav Tab</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {[
                    { href: '#button-section', label: 'Buttons (#button-section)' },
                    { href: '#card-section', label: 'Cards (#card-section)' },
                    { href: '#modal-section', label: 'Modal (#modal-section)' },
                    { href: '#input-section', label: 'Form Inputs (#input-section)' },
                    { href: '#navbar-section', label: 'Navbar (#navbar-section)' },
                  ].map((item) => (
                    <button
                      key={item.href}
                      type="button"
                      className={`btn btn-sm ${navActiveTab === item.href ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ justifyContent: 'flex-start', height: '30px' }}
                      onClick={() => setNavActiveTab(item.href)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="control-item">
                <Button
                  size="sm"
                  variant="outline"
                  icon={<ArrowRight size={14} />}
                  onClick={() => {
                    const el = document.querySelector(navActiveTab);
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Scroll To Active Target
                </Button>
              </div>
            </>
          }
        >
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div
              style={{
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
                backgroundColor: 'var(--color-surface)',
              }}
            >
              <Navbar
                id="specimen-navbar-preview"
                activeSection={navActiveTab}
                onNavigate={(href) => {
                  setNavActiveTab(href);
                  const el = document.querySelector(href);
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', fontSize: 'var(--font-xs)', color: 'var(--color-text-secondary)', padding: '0 4px' }}>
              <span>Interactive Navbar preview above. Click any link to test navigation and smooth scroll.</span>
              <span className="token-badge">Current: {navActiveTab}</span>
            </div>
          </div>
        </ComponentSection>

        {/* =========================================================
            SECTION 6: CSS DESIGN TOKENS & THEME SYSTEM INSPECTOR
            ========================================================= */}
        <DesignTokens id="tokens-section" />
      </div>
    </main>
  );
}
