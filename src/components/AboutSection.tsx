import Loader from "./Loader";

const skills = [
  { skill: "HTML/CSS" },
  { skill: "JavaScript" },
  { skill: "TypeScript" },
  { skill: "Python" },
  { skill: "React" },
  { skill: "Redux" },
  { skill: "React-native" },
  { skill: "Vue.js" },
  { skill: "Expo" },
  { skill: "Material-UI" },
  { skill: "Figma" },
  { skill: "Linux" },
  { skill: "Windows" },
  { skill: "VS Code" },
  { skill: "PyCharm" },
  { skill: "Postman" },
  { skill: "Next.js" },
  { skill: "Tailwind CSS" },
  { skill: "Git" },
  { skill: "GitHub" },
  { skill: "MongoDB" },
  { skill: "Node.js" },
  { skill: "Express" },
  { skill: "Flask" },
  { skill: "RESTful APIs" },
  { skill: "C#" },
];

const AboutSection = () => {
  return (
    <section id='about'>
      <div className='my-10 pb-12 md:pt-16 md:pb-48'>
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
              during my internships at Ecodation, Parentwiser, Jotform, and
              Sixfab.
            </p>

            <br />

            <p>
              I have a variety of hobbies, including{" "}
              <span className='font-bold'>{"coding"}</span>,{" "}
              <span className='font-bold'>{"reading"}</span>,{" "}
              <span className='font-bold'>{"gaming"}</span>,{" "}
              <span className='font-bold'>{"traveling"}</span>,{" "}
              <span className='font-bold'>{"photography"}</span>. I'm passionate
              about continuous learning and always seeking new challenges to
              grow in software development. I'm dedicated to improving my skills
              and open to new opportunities. Feel free to reach out anytime!
            </p>
          </div>
          <div className='text-center md:w-1/2 md:text-left'>
            <h1 className='text-2xl font-bold mb-6'>My Skills</h1>
            <div className='flex flex-wrap flex-row justify-center z-10 md:justify-start'>
              {skills.map((item, idx) => {
                return (
                  <p
                    key={idx}
                    className='bg-gray-500 px-2.5 py-1.5 mr-2 mt-2 z-10 text-gray-100 rounded font-semibold'
                  >
                    {item.skill}
                  </p>
                );
              })}
            </div>
            <Loader />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
