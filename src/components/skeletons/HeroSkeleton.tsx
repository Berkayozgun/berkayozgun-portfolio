import React from 'react';

const HeroSkeleton: React.FC = () => {
  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gray-300 animate-pulse"></div>
          <div className="h-12 bg-gray-300 rounded-lg mx-auto mb-4 w-64 animate-pulse"></div>
          <div className="h-8 bg-gray-300 rounded-lg mx-auto mb-8 w-48 animate-pulse"></div>
          <div className="h-6 bg-gray-300 rounded-lg mx-auto mb-8 w-96 animate-pulse"></div>
          <div className="flex justify-center space-x-4">
            <div className="h-12 bg-gray-300 rounded-lg w-32 animate-pulse"></div>
            <div className="h-12 bg-gray-300 rounded-lg w-32 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSkeleton;
