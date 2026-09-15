# KOBA UI — Personal Component Playground

A clean, accessible, and responsive React component library and personal design system playground. Built to showcase modern frontend engineering practices, reusable component architecture, and systematic design token design.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Features](#2-features)
3. [Components](#3-components)
4. [Technology Stack](#4-technology-stack)
5. [Project Structure](#5-project-structure)
6. [Installation](#6-installation)
7. [Running Locally](#7-running-locally)
8. [Component Usage](#8-component-usage)
   - [Button](#button)
   - [Card](#card)
   - [Modal](#modal)
   - [FormInput](#forminput)
9. [Theming & Design Tokens](#9-theming--design-tokens)
10. [Responsive Design](#10-responsive-design)
11. [Accessibility](#11-accessibility)
12. [Deployment](#12-deployment)
    - [Vercel](#vercel)
    - [Netlify](#netlify)
    - [Replit](#replit)
13. [Future Improvements](#13-future-improvements)

---

## 1. Project Overview

**KOBA UI** is a personal frontend design system and interactive component playground. It bridges the gap between design theory and production-grade engineering, providing fully accessible, themeable, and highly composable React primitives.

Rather than relying on monolithic UI libraries with hard-coded styling, KOBA UI demonstrates how a frontend engineer can build a resilient design token architecture from scratch using CSS Custom Properties and clean React component abstractions.

---

## 2. Features

- **Interactive Component Playground**: Live configuration knobs (variant, size, disabled, loading, icons) to test components in real-time.
- **Strict Design Tokens Architecture**: Centralized CSS variables for colors, typography, spacing, border radii, shadows, and transitions (`variables.css`).
- **Seamless Light & Dark Theming**: Instant theme switching powered by CSS custom properties and React context with zero-flash initial loading and `localStorage` persistence.
- **Fluid & Intentional Responsive Design**: Optimized across mobile (320px, 375px, 425px), tablet (768px), and desktop (1024px, 1440px+) breakpoints without horizontal overflow.
- **Enterprise-Grade Accessibility (a11y)**: Focus trapping, keyboard navigation (Escape to close, Tab cycles), screen-reader associations via `aria-*`, and WCAG AA contrast ratios.
- **Copy-Paste Developer Experience**: Instant copy buttons for dynamic JSX snippets, component props, and CSS design token variables.

---

## 3. Components

| Component | Description | Key Variants / Features |
| :--- | :--- | :--- |
| **Button** | Accessible action trigger | `primary`, `secondary`, `outline`, `ghost`, `danger`; sizes: `sm`, `md`, `lg`; loading spinner, icon support |
| **Card** | Content container & surface | `standard`, `image`, `info`, `interactive`; elevated shadows, media headers, action slots |
| **Modal** | Accessible dialog overlay | Focus trap, Escape key dismiss, backdrop blur, background scroll lock, customizable actions |
| **FormInput** | Controlled text & credential input | `text`, `email`, `password` with visibility toggle; validation errors, helper text, accessible IDs |
| **Navbar** | Responsive header & drawer | Brand logo, section jump links, mobile navigation drawer, integrated theme toggle |
| **ThemeToggle** | Theme controller switch | `icon`, `button`, and sliding `pill` switch variants |
| **DesignTokens** | Interactive token inspector | Live specs for Colors, Typography, Spacing, Radius, Shadows, and Transitions |

---

## 4. Technology Stack

- **Core Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling Architecture**: Pure CSS Custom Properties (Design Tokens) + [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations & Motion**: Native CSS transitions + [Motion](https://motion.dev/)
- **Type Checking**: TypeScript 5 (`tsc --noEmit` linting)

---

## 5. Project Structure

```
koba-ui/
├── index.html                 # HTML entry point with zero-flash theme bootstrap
├── metadata.json              # Applet metadata and capabilities
├── package.json               # Dependencies and build scripts
├── vite.config.js             # Vite configuration with React & Tailwind plugins
└── src/
    ├── main.jsx               # React DOM root hydration
    ├── App.jsx                # Application shell and ThemeProvider wrapper
    ├── index.css              # Tailwind CSS stylesheet
    ├── context/
    │   └── ThemeContext.jsx   # Theme state provider and localStorage sync
    ├── styles/
    │   ├── variables.css      # Design Tokens (Colors, Type, Space, Radius, Shadows, Transitions)
    │   ├── global.css         # CSS reset, fluid container, and typography rules
    │   └── components.css     # Production styling for all UI components
    ├── components/
    │   ├── Button/            # Button component with loading & icon support
    │   ├── Card/              # Versatile card component with image/info/interactive modes
    │   ├── Modal/             # Accessible dialog with focus trap & keyboard listeners
    │   ├── FormInput/         # Accessible input with password toggle & validation
    │   ├── Navbar/            # Responsive navigation header with mobile drawer
    │   ├── Footer/            # Responsive site footer with tech badges
    │   ├── Hero/              # Design system hero banner with quick call-to-actions
    │   ├── ThemeToggle/       # Multi-variant theme toggle switches
    │   ├── ComponentSection/  # Documentation wrapper with Live/Variations/Code tabs
    │   └── DesignTokens/      # Interactive design tokens specification inspector
    └── pages/
        └── Playground.jsx     # Live interactive playground assembling all components
```

---

## 6. Installation

Clone the repository and install dependencies using `npm`:

```bash
# Clone the repository
git clone https://github.com/your-username/koba-ui.git

# Navigate into the project directory
cd koba-ui

# Install dependencies
npm install
```

---

## 7. Running Locally

Start the Vite development server:

```bash
npm run dev
```

The application will be accessible at:
```
http://localhost:3000
```

To run a production build and preview:

```bash
# Create an optimized production bundle in /dist
npm run build

# Preview the production build locally
npm run preview
```

To run type checking and linting:

```bash
npm run lint
```

---

## 8. Component Usage

All components are strictly reusable, controlled through props, and independent of external state management.

### Button

An accessible button component supporting variants, sizes, loading spinners, and leading icons.

```jsx
import Button from './components/Button/Button.jsx';
import { Send, Download, Trash2 } from 'lucide-react';

export function ButtonExamples() {
  return (
    <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
      {/* 1. Primary Button with Icon */}
      <Button
        variant="primary"
        size="md"
        icon={<Send size={16} />}
        onClick={() => console.log('Action submitted')}
      >
        Submit Form
      </Button>

      {/* 2. Secondary Outline Button */}
      <Button
        variant="outline"
        size="md"
        icon={<Download size={16} />}
        onClick={() => console.log('Exporting data')}
      >
        Export CSV
      </Button>

      {/* 3. Loading State (disables interaction & renders accessible spinner) */}
      <Button
        variant="primary"
        size="md"
        loading
      >
        Saving Changes
      </Button>

      {/* 4. Destructive Danger Button */}
      <Button
        variant="danger"
        size="sm"
        icon={<Trash2 size={14} />}
        onClick={() => console.log('Deleting resource')}
      >
        Delete Account
      </Button>
    </div>
  );
}
```

#### Button Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger'` | `'primary'` | Visual styling variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Dimensional scale |
| `loading` | `boolean` | `false` | Displays a loading spinner and disables clicks |
| `disabled`| `boolean` | `false` | Disables interaction and sets `aria-disabled` |
| `icon` | `React.ReactNode` | `null` | Leading icon rendered before the label |
| `onClick` | `Function` | `undefined` | Click event handler |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Native HTML button type |

---

### Card

A multi-purpose card supporting image covers, categories, supporting metadata lists, and interactive hover states.

```jsx
import Card from './components/Card/Card.jsx';
import Button from './components/Button/Button.jsx';
import { ShieldCheck } from 'lucide-react';

export function CardExamples() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-md)' }}>
      {/* 1. Image Header Card */}
      <Card
        variant="image"
        category="DESIGN TOKENS"
        title="Fluid Typography & Tokens"
        description="Structured design tokens declaring responsive clamp scales and semantic colors."
        image="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=700&q=80"
        action={
          <Button size="sm" variant="primary">
            Explore Details
          </Button>
        }
      />

      {/* 2. Information Card with Supporting Attributes */}
      <Card
        variant="info"
        category="SECURITY"
        title="Zero-Trust Architecture"
        description="Comprehensive audit logging and encryption standards implemented across all endpoints."
        icon={<ShieldCheck size={20} />}
        supportingInfo={[
          'Status: Active & Verified',
          'Protocol: OAuth 2.1 / PKCE',
          'Audit: 100% Passed',
        ]}
      />

      {/* 3. Interactive Clickable Card */}
      <Card
        interactive
        title="Interactive Component Card"
        description="Click anywhere on this card to trigger action handlers with smooth elevation hover feedback."
        onClick={() => alert('Card selected')}
      />
    </div>
  );
}
```

#### Card Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `'standard' \| 'image' \| 'info' \| 'interactive'` | `'standard'` | Card layout archetype |
| `title` | `string \| React.ReactNode` | `''` | Main card headline |
| `subtitle`| `string \| React.ReactNode` | `''` | Secondary sub-heading |
| `category`| `string` | `''` | Uppercase category badge |
| `description` | `string \| React.ReactNode` | `''` | Body paragraph |
| `image` | `string` | `''` | Cover image URL for image variant |
| `icon` | `React.ReactNode` | `null` | Leading icon header |
| `supportingInfo` | `Array<string>` | `[]` | Bulleted metadata items for info cards |
| `action` | `React.ReactNode` | `null` | Bottom action slot (e.g. Button) |
| `interactive` | `boolean` | `false` | Enables cursor pointer and hover lift |
| `onClick` | `Function` | `undefined` | Click event handler |

---

### Modal

An accessible dialog component featuring background scroll locking, keyboard focus trapping, and Escape key listeners.

```jsx
import React, { useState } from 'react';
import Modal from './components/Modal/Modal.jsx';
import Button from './components/Button/Button.jsx';

export function ModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setIsOpen(true)}>
        Open Confirm Dialog
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Deploy Application to Production"
        footer={
          <div style={{ display: 'flex', gap: 'var(--space-sm)', justifyContent: 'flex-end', width: '100%' }}>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                console.log('Confirmed deployment');
                setIsOpen(false);
              }}
            >
              Confirm & Deploy
            </Button>
          </div>
        }
      >
        <p style={{ color: 'var(--color-text)', lineHeight: 1.6, margin: 0 }}>
          Are you sure you want to release the latest changes to the production cluster?
          This action will invalidate the edge CDN cache.
        </p>
      </Modal>
    </>
  );
}
```

#### Modal Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `isOpen` | `boolean` | **Required** | Controls visibility of the dialog overlay |
| `onClose` | `Function` | **Required** | Callback invoked when closing via backdrop, X button, or Escape |
| `title` | `string \| React.ReactNode` | `''` | Header title connected to `aria-labelledby` |
| `children` | `React.ReactNode` | `null` | Body content of the modal |
| `footer` | `React.ReactNode` | `null` | Bottom action bar |
| `showCloseButton` | `boolean` | `true` | Whether to display the top-right X button |

---

### FormInput

A fully accessible form field supporting validation states, helper text, and password visibility toggling.

```jsx
import React, { useState } from 'react';
import FormInput from './components/FormInput/FormInput.jsx';
import { Mail, Lock } from 'lucide-react';

export function FormInputExample() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value && !e.target.value.includes('@')) {
      setError('Please enter a valid email address');
    } else {
      setError('');
    }
  };

  return (
    <form style={{ maxWidth: '420px', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
      {/* Email Input with Leading Icon & Error State */}
      <FormInput
        label="Work Email"
        type="email"
        name="email"
        placeholder="alex@company.com"
        value={email}
        onChange={handleEmailChange}
        icon={<Mail size={16} />}
        error={error}
        helperText="We'll send your workspace invite here"
        required
      />

      {/* Password Input with Built-in Toggle */}
      <FormInput
        label="Password"
        type="password"
        name="password"
        placeholder="Enter at least 8 characters"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon={<Lock size={16} />}
        helperText="Must include at least 1 number and 1 special symbol"
        required
      />
    </form>
  );
}
```

#### FormInput Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `label` | `string` | `''` | Input label connected to the field via generated HTML ID |
| `name` | `string` | `''` | Input name attribute |
| `type` | `'text' \| 'email' \| 'password' \| string` | `'text'` | Input type; `password` automatically provides an eye reveal button |
| `value` | `string` | `''` | Controlled input value |
| `onChange` | `Function` | `undefined` | Input change event handler |
| `placeholder` | `string` | `''` | Placeholder text |
| `error` | `string` | `''` | Error message (renders red border, alert icon, and `aria-invalid`) |
| `helperText` | `string` | `''` | Supplementary hint text below the field |
| `icon` | `React.ReactNode` | `null` | Leading icon rendered inside the input |
| `required` | `boolean` | `false` | Marks field with required asterisk and HTML attribute |
| `disabled` | `boolean` | `false` | Disables field interaction |

---

## 9. Theming & Design Tokens

KOBA UI uses a **centralized Design Tokens system** declared in `src/styles/variables.css`. All components consume these tokens rather than hard-coded pixel or color values.

### Core Tokens Architecture

```css
:root {
  /* COLORS */
  --color-primary: #0284c7;
  --color-secondary: #475569;
  --color-accent: #6366f1;
  --color-background: #f8fafc;
  --color-surface: #ffffff;
  --color-text: #0f172a;
  --color-muted: #64748b;
  --color-border: #e2e8f0;
  --color-error: #dc2626;
  --color-success: #16a34a;

  /* TYPOGRAPHY */
  --font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-h1: clamp(2rem, 4vw, 2.5rem);
  --font-h2: 1.75rem;
  --font-h3: 1.375rem;
  --font-h4: 1.125rem;
  --font-body: 1rem;
  --font-small: 0.875rem;

  /* SPACING SCALE */
  --space-xs: 0.25rem;  /* 4px */
  --space-sm: 0.5rem;   /* 8px */
  --space-md: 1rem;     /* 16px */
  --space-lg: 1.5rem;   /* 24px */
  --space-xl: 2rem;     /* 32px */
  --space-2xl: 3rem;    /* 48px */

  /* BORDER RADIUS */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-pill: 9999px;

  /* SHADOWS & ELEVATION */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);

  /* TRANSITIONS */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-normal: 250ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 400ms cubic-bezier(0.4, 0, 0.2, 1);
}

[data-theme="dark"] {
  --color-primary: #38bdf8;
  --color-secondary: #94a3b8;
  --color-accent: #818cf8;
  --color-background: #090d16;
  --color-surface: #111827;
  --color-text: #f9fafb;
  --color-muted: #9ca3af;
  --color-border: #1f2937;
  --color-error: #ef4444;
  --color-success: #22c55e;
}
```

### Zero-Flash Theme Switching

Theme state is synchronized automatically with:
1. An inline `<script>` in `<head>` that checks `localStorage` and `prefers-color-scheme` before DOM rendering, preventing flash of unstyled theme (FOUT).
2. `ThemeContext.jsx` exposing `{ theme, isDark, toggleTheme, setTheme }` throughout React.
3. The `<html data-theme="...">` attribute for zero CSS duplication.

---

## 10. Responsive Design

KOBA UI was designed and audited systematically across all viewport standards:

- **Mobile (320px, 375px, 425px)**:
  - Single-column card layouts.
  - Hamburger mobile navigation with slide-down drawer.
  - Full-width form fields (`width: 100%`).
  - Comfortable touch targets of at least **44px × 44px**.
  - Horizontal scrolling prevented with `overflow-x: hidden` and `max-width: 100%`.
- **Tablet (768px)**:
  - Adaptive 2-column card layouts.
  - Side-by-side controls and interactive canvas.
- **Desktop (1024px, 1440px+)**:
  - Balanced 3-column card layouts.
  - Max container width constrained to `1280px` (`max-w-7xl`).
  - Generous whitespace and high-density information architecture.

---

## 11. Accessibility

Accessibility is implemented as a first-class citizen:

- **Keyboard Navigation**: Full Tab navigation across all interactive buttons, inputs, tabs, and toggles.
- **Focus Trap**: `Modal.jsx` intercepts keyboard events, traps focus within the dialog while active, and restores focus to the invoking element on exit.
- **Escape Key Listeners**: Modals and the mobile navigation drawer close on `Escape`.
- **Screen Reader Links**: Form inputs auto-generate connected `id`, `htmlFor`, `aria-describedby` (for helpers), and `aria-errormessage` (for errors).
- **Accessible Names**: All icon-only buttons include descriptive `aria-label` tags.
- **Contrast Ratios**: Verified to pass WCAG AA standards (minimum 4.5:1 for body copy).

---

## 12. Deployment

KOBA UI builds into static, zero-dependency HTML/JS/CSS assets ready for deployment on any modern hosting provider.

### Vercel

1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your GitHub repository.
4. Set the build settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**.

Alternatively, using the Vercel CLI:
```bash
npm install -g vercel
vercel
```

---

### Netlify

1. Log in to [Netlify](https://www.netlify.com/) and click **Add new site > Import an existing project**.
2. Connect your Git provider and select the repository.
3. Configure the build parameters:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. If client-side routing is needed, add a `netlify.toml` or `_redirects` file:
   ```
   /*    /index.html   200
   ```
5. Click **Deploy site**.

Alternatively, using the Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod
```

---

### Replit

1. Create a new Repl on [Replit](https://replit.com/).
2. Select **Import from GitHub** and paste your repository URL.
3. Ensure the `.replit` file specifies:
   ```toml
   run = "npm run dev"
   entrypoint = "index.html"

   [nix]
   channel = "stable-24_05"

   [ports]
   localPort = 3000
   externalPort = 80
   ```
4. Click the **Run** button at the top. Replit will install packages and host the preview in the webview window.

---

## 13. Future Improvements

- [ ] **Component Tests**: Add unit and accessibility tests using [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/).
- [ ] **Storybook Catalog**: Set up [Storybook](https://storybook.js.org/) for automated visual regression testing.
- [ ] **NPM Package**: Extract components into a standalone, tree-shakeable NPM package (`@koba/ui`).
- [ ] **Additional Primitives**:
  - `Dropdown` & `Select` menu with keyboard arrow navigation.
  - `Tooltip` with floating placement calculations.
  - `Tabs` with animated slider indicator.
  - `Toast` notification dispatcher.
- [ ] **Figma Design Tokens Sync**: Automated GitHub Action to synchronize Figma variables with `variables.css`.

---

## Author

Crafted with care by **Kofi Apau** as a demonstration of clean architecture, accessibility standards, and modern design token engineering.

- **Portfolio**: [KOBA UI Live Demo](https://ais-pre-hegbia4xyjafoqgk2icmt2-440606170351.europe-west2.run.app)
- **Contact**: `kofi826apau@gmail.com`

---

## License

MIT License © 2026 Kofi Apau. Free to use, fork, and adapt for personal or commercial projects.
