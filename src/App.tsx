import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import ErrorBoundary from './components/ErrorBoundary';
import './i18n';

// Theme context
export const ThemeContext = React.createContext({
  isDark: false,
  toggleTheme: () => { },
});

function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true; // Default to dark
  });

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ErrorBoundary>
      <ThemeContext.Provider value={{ isDark, toggleTheme }}>
        <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark' : ''}`}>
          <div className="bg-slate-50 dark:bg-dark-900 min-h-screen text-slate-900 dark:text-slate-200 selection:bg-primary-500/30">
            <div className="fixed inset-0 z-0 pointer-events-none">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/20 via-dark-900 to-dark-900 opacity-70"></div>
              <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>
            </div>
            <div className="relative z-10">
              <Home />
            </div>
          </div>
        </div>
      </ThemeContext.Provider>
    </ErrorBoundary>
  );
}

export default App;
