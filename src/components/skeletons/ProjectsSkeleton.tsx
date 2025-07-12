import React from 'react';
import ProjectSkeleton from './ProjectSkeleton';

const ProjectsSkeleton: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-8 bg-gray-300 rounded-lg mx-auto mb-12 w-48 animate-pulse"></div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <ProjectSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSkeleton;
