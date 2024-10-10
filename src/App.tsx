// src/App.tsx
import React, { ReactNode } from 'react';

interface AppProps {
  children: ReactNode;
}

const App: React.FC<AppProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default App;