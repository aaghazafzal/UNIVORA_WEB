import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import Navigation from './components/Navigation';
import MobileHeader from './components/MobileHeader';
import AIAssistant from './components/AIAssistant';
import Home from './pages/Home';
import Documentation from './pages/Documentation';
import ProjectDetail from './pages/ProjectDetail';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Conduct from './pages/Conduct';
import Terminal from './components/Terminal';
import Status from './pages/Status';
import Dev from './pages/Dev';
import Apps from './pages/Apps';
import Bots from './pages/Bots';
import Security from './pages/Security';
import Faq from './pages/Faq';
import Support from './pages/Support';
import Donate from './pages/Donate';
import Report from './pages/Report';
import ThankYou from './pages/ThankYou';
import Store from './pages/Store';
import StoreDetail from './pages/StoreDetail';

function App() {
  const [isTerminalOpen, setIsTerminalOpen] = React.useState(false);
  const [isAIOpen, setIsAIOpen] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle Terminal on Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsTerminalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  React.useEffect(() => {
    const openTerminalListener = () => setIsTerminalOpen(true);
    window.addEventListener('open-terminal', openTerminalListener);
    return () => window.removeEventListener('open-terminal', openTerminalListener);
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <div className="bg-theme-bg min-h-screen text-theme-text font-sans relative transition-colors duration-300 flex">
          <MobileHeader />
          <Navigation onOpenAI={() => setIsAIOpen(true)} />
          <AIAssistant isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
          
          <main className="flex-1 min-w-0 transition-all duration-300">
            <Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/apps" element={<Apps />} />
              <Route path="/bots" element={<Bots />} />
              <Route path="/dev" element={<Dev />} />
              <Route path="/docs" element={<Documentation />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/conduct" element={<Conduct />} />
              <Route path="/status" element={<Status />} />
              <Route path="/security" element={<Security />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/support" element={<Support />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/report" element={<Report />} />
              <Route path="/thank-you" element={<ThankYou />} />
              <Route path="/store" element={<Store />} />
              <Route path="/store/:id" element={<StoreDetail />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
