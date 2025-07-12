import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import ErrorBoundary from './components/ErrorBoundary';
import './i18n';

// Theme context
export const ThemeContext = React.createContext({
  isDark: false,
  toggleTheme: () => {},
});

function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ErrorBoundary>
      <ThemeContext.Provider value={{ isDark, toggleTheme }}>
        <div className={`${isDark ? 'dark' : ''} transition-colors duration-300`}>
          <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <Home />
          </div>
        </div>
      </ThemeContext.Provider>
    </ErrorBoundary>
  );
}

export default App;
