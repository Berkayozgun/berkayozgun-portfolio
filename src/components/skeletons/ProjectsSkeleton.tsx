const ProjectsSkeleton = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          className='bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-800 animate-pulse'
        >
          <div className='w-full h-48 bg-gray-300 dark:bg-gray-700' />
          <div className='p-6'>
            <div className='h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4' />
            <div className='space-y-3'>
              <div className='h-4 bg-gray-300 dark:bg-gray-700 rounded' />
              <div className='h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6' />
            </div>
            <div className='flex space-x-4 mt-4'>
              <div className='h-4 bg-gray-300 dark:bg-gray-700 rounded w-20' />
              <div className='h-4 bg-gray-300 dark:bg-gray-700 rounded w-20' />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsSkeleton;
