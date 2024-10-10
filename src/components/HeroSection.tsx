const HeroSection = () => {
  return (
    <section id='home'>
      <div className='flex flex-col text-center items-center justify-center animate-fadeIn animation-delay-2 my-10 p-40 sm:py-32 md:py-48 md:flex-row md:space-x-4 md:text-left'>
        <div className='md:mt-2 md:w-1/2'>
          <img
            src='/headshot.jpg'
            alt=''
            width={325}
            height={325}
            className='rounded-full shadow-2xl'
          />
        </div>
        <div className='md:mt-2 md:w-3/5'>
          <h1 className='text-4xl font-bold mt-6 md:mt-0 md:text-7xl'>
            Hi, I'm Berkay!
          </h1>
          <p className='text-lg mt-4 mb-6 md:text-2xl'>
            I'm a{" "}
            <span className='font-semibold text-teal-500'>
              Software Developer{" "}
            </span>
            based in Edirne, TR. Working towards creating software that makes
            life easier and more meaningful.
          </p>
          <a
            href='#projects'
            className='text-neutral-100 font-semibold px-6 py-3 bg-teal-600 rounded shadow hover:bg-teal-700'
          >
            See My Projects
          </a>
        </div>
      </div>
      <div className='flex flex-row items-center text-center justify-center'>
        <a href='#projects' className='text-teal-500 hover:text-teal-700'>
          ↓
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
