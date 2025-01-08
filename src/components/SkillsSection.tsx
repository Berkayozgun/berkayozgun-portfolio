import { Skill } from "../types";
import { SKILLS } from "../data/data";

interface SkillBadgeProps {
  skill: Skill;
}

const categoryColors: Record<Skill["category"], string> = {
  Frontend: "from-blue-500 to-teal-500",
  Backend: "from-purple-500 to-pink-500",
  Database: "from-yellow-500 to-red-500",
  Tools: "from-green-500 to-teal-500",
  "Soft Skills": "from-gray-500 to-blue-500",
  Languages: "from-indigo-500 to-purple-500",
  Mobile: "from-pink-500 to-rose-500",
  Specialized: "from-amber-500 to-orange-500",
};

const SkillBadge = ({ skill }: SkillBadgeProps) => {
  const Icon = skill.icon;
  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-full 
      bg-gradient-to-r ${categoryColors[skill.category]} 
      text-white hover:-translate-y-1 transition-all duration-300`}
    >
      <Icon className='text-xl' />
      <span className='text-sm font-medium'>{skill.name}</span>
    </div>
  );
};

const SkillsSection = () => {
  const categories = Array.from(new Set(SKILLS.map((skill) => skill.category)));

  return (
    <section className='py-20 px-4 md:px-20'>
      <h2 className='text-4xl font-bold text-center mb-8'>
        Skills & Technologies
        <hr className='w-6 h-1 mx-auto my-4 bg-teal-500 border-0 rounded' />
      </h2>

      <div className='max-w-6xl mx-auto'>
        {categories.map((category) => (
          <div key={category} className='mb-8'>
            <h3 className='text-2xl font-semibold mb-4'>{category}</h3>
            <div className='flex flex-wrap gap-3'>
              {SKILLS.filter((skill) => skill.category === category).map(
                (skill, index) => (
                  <SkillBadge key={index} skill={skill} />
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
