const HeroSection = () => {
  return (
    <section
      className='min-h-[calc(100vh-4rem)] flex items-center justify-center py-10 md:py-20 
    bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800'
    >
      <div className='container mx-auto px-6'>
        <div className='flex flex-col md:flex-row items-center justify-between'>
          <div className='md:w-1/2 md:pr-10'>
            <h1 className='text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent'>
              Hi, I'm Berkay!
            </h1>
            <p className='text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed'>
              A passionate{" "}
              <span className='text-teal-500 font-semibold'>
                Software Developer&nbsp;
              </span>
              crafting elegant solutions to complex problems.
            </p>
            <div className='flex space-x-4'>
              <a
                href='#projects'
                className='px-8 py-4 bg-teal-500 hover:bg-teal-600 
                text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300'
              >
                View Projects
              </a>
              <a
                href='#contact'
                className='px-8 py-4 border-2 border-teal-500 text-teal-500 
                hover:bg-teal-500 hover:text-white rounded-lg transition-all duration-300'
              >
                Contact Me
              </a>
            </div>
          </div>
          <div className='md:w-1/2 mt-10 md:mt-0'>
            <div className='relative'>
              <div className='absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full blur-3xl opacity-20'></div>
              <img
                src='/headshot.jpg'
                alt='Berkay Özgün'
                className='relative rounded-full w-64 h-64 md:w-80 md:h-80 object-cover shadow-2xl'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
