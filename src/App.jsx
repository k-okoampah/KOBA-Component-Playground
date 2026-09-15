import React from 'react';
import { ThemeProvider } from './context/ThemeContext.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Playground from './pages/Playground.jsx';

/**
 * Root Application component assembling the Navbar, Playground page, and Footer.
 */
export default function App() {
  return (
    <ThemeProvider>
      <div className="app-root" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar id="main-app-navbar" />
        <div style={{ flex: 1 }}>
          <Playground />
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
