const HeroSection = () => {
  return (
    <section id='home' className='bg-gray-100 dark:bg-gray-900 min-h-fit p-20'>
      <div className='container mx-auto flex flex-col text-center items-center justify-center animate-fadeIn animation-delay-2 md:flex-row md:space-x-4 md:text-left'>
        <div className='md:mt-2 md:w-1/2'>
          <img
            src='/headshot.jpg'
            alt='Berkay Özgün'
            width={325}
            height={325}
            className='rounded-full shadow-2xl'
          />
        </div>
        <div className='md:mt-2 md:w-3/5'>
          <h1 className='text-4xl font-bold mt-6 md:mt-0 md:text-7xl text-gray-900 dark:text-gray-100'>
            Hi, I'm Berkay!
          </h1>
          <p className='text-lg mt-4 mb-6 md:text-2xl text-gray-700 dark:text-gray-300'>
            I'm a{" "}
            <span className='font-semibold text-teal-500'>
              Software Developer{" "}
            </span>
            based in Edirne, TR. Working towards creating software that makes
            life easier and more meaningful.
          </p>
          <div className='flex flex-col md:flex-row md:space-x-4'>
            <a
              href='#projects'
              className='text-neutral-100 font-semibold px-6 py-3 bg-teal-600 rounded shadow hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 mb-4 md:mb-0'
              aria-label='See My Projects'
            >
              See My Projects
            </a>
          </div>
        </div>
      </div>
      <div className='flex flex-row items-center text-center justify-center mt-10'>
        <a
          href='#about'
          className='text-teal-500 hover:text-teal-700 text-2xl'
          aria-label='Scroll to About'
        >
          ↓
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
