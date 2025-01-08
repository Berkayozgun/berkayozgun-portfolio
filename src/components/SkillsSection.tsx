import { SKILLS } from "../data/data";
import { IconType } from "react-icons";

interface SkillProps {
  name: string;
  icon: IconType;
  category: string;
}

const categoryColors = {
  Frontend: "from-blue-500 to-teal-500",
  Backend: "from-purple-500 to-pink-500",
  Database: "from-orange-500 to-red-500",
  Tools: "from-green-500 to-emerald-500",
};

const SkillBadge = ({ name, icon: Icon, category }) => {
  return (
    <div
      className={`flex items-center gap-2 bg-gradient-to-r ${categoryColors[category]} 
    bg-clip-text text-transparent hover:-translate-y-1 transition-all duration-300`}
    >
      <Icon className='text-xl' />
      <span className='text-sm font-medium'>{name}</span>
    </div>
  );
};

const SkillsSection = () => {
  const categories = {
    Frontend: SKILLS.filter((skill) => skill.category === "Frontend"),
    Backend: SKILLS.filter((skill) => skill.category === "Backend"),
    Database: SKILLS.filter((skill) => skill.category === "Database"),
    Tools: SKILLS.filter((skill) => skill.category === "Tools"),
  };

  return (
    <section className='py-12'>
      <h2 className='text-2xl font-bold text-center mb-8'>
        Technical Skills
        <hr className='w-6 h-1 mx-auto my-4 bg-teal-500 border-0 rounded' />
      </h2>

      <div className='max-w-4xl mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {Object.entries(categories).map(([category, skills]) => (
            <div key={category} className='space-y-4'>
              <h3 className='text-lg font-semibold text-teal-500 mb-3'>
                {category}
              </h3>
              <div className='grid grid-cols-2 gap-3'>
                {skills.map((skill, idx) => (
                  <SkillBadge
                    key={idx}
                    name={skill.name}
                    icon={skill.icon}
                    category={category}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
