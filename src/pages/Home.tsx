import React from 'react';
import Terminal from '../components/Terminal';

const Home: React.FC = () => {
  return (
    <div className='min-h-screen bg-gray-900 text-white'>
      <main className='container mx-auto px-4 py-8'>
        <Terminal />
      </main>
    </div>
  );
};

export default Home;
