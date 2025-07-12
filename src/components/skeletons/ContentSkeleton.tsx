import React from 'react';

const ContentSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      <div className="space-y-4">
        {/* Title skeleton */}
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4"></div>
        
        {/* Content skeleton */}
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
        </div>
        
        {/* Button skeleton */}
        <div className="flex space-x-3 pt-4">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-24"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-24"></div>
        </div>
      </div>
    </div>
  );
};

export default ContentSkeleton; 