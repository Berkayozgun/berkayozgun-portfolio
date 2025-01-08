import { SKILLS } from "../data/data.ts"; // data.ts dosyasını ithal edin

const AboutSection = () => {
  return (
    <section id='about' className='py-20 px-4 md:px-20'>
      <div className='my-10'>
        <h1 className='text-center font-bold text-4xl'>
          About Me
          <hr className='w-6 h-1 mx-auto my-4 bg-teal-500 border-0 rounded'></hr>
        </h1>

        <div className='flex flex-col space-y-10 items-stretch justify-center align-top md:space-x-10 md:space-y-0 md:p-4 md:flex-row md:text-left'>
          <div className='md:w-1/2 '>
            <h1 className='text-center text-2xl font-bold mb-6 md:text-left'>
              Get to know me!
            </h1>
            <p>
              Hi, my name is Berkay and I am a{" "}
              <span className='font-bold'>{"highly ambitious"}</span>,
              <span className='font-bold'>{" self-motivated"}</span>, and
              <span className='font-bold'>{" driven"}</span> software developer
              based in Turkey.
            </p>
            <br />
            <p>
              I graduated from Trakya University, Edirne in 2024 with a BS in
              Computer Engineering and have been working in the field ever
              since.
            </p>
            <br />
            <p>
              I've gained experience in frontend and full-stack development
              through various projects and collaborations.
            </p>
          </div>
          <div className='md:w-1/2'>
            <h1 className='text-center text-2xl font-bold mb-6 md:text-left'>
              My Skills
            </h1>
            <div className='flex flex-wrap justify-center md:justify-start'>
              {SKILLS.map((skill: string, idx: number) => (
                <p
                  key={idx}
                  className='bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-2 mr-2 mt-2 rounded font-semibold'
                >
                  {skill}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-row items-center text-center justify-center mt-10'>
        <a
          href='#projects'
          className='text-teal-500 hover:text-teal-700 text-2xl'
          aria-label='Scroll to Projects'
        >
          ↓
        </a>
      </div>
    </section>
  );
};

export default AboutSection;
