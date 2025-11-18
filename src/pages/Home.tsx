import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Github, Linkedin, Mail, Terminal, Code, Database, Server, Cpu, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import profileData from '../data/profile.json';
import ProjectModal from '../components/ProjectModal';
import ContactForm from '../components/ContactForm';
import ProjectImageSlider from '../components/ProjectImageSlider';
import Navigation from '../components/Navigation';
import ProjectCarousel from '../components/ProjectCarousel';

interface Project {
  name: string;
  description: string;
  technologies: string[];
  link: string;
  demo?: string;
  images?: {
    id: string;
    src: string;
    alt: string;
    title: string;
  }[];
}

interface Experience {
  company: string;
  position: string;
  period: string;
  description: string[];
}

const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageSliderOpen, setIsImageSliderOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const data = profileData[i18n.language as 'tr' | 'en'] || profileData.en;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 z-50"
        style={{ scaleX, transformOrigin: "0%" }}
      />

      {/* Navigation */}
      <Navigation scrollToSection={scrollToSection} />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-[100px] animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-mono mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                </span>
                <span>Available for hire</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                <span className="block text-slate-400 text-2xl md:text-3xl mb-2 font-normal">Hello, I'm</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-purple-400 to-primary-400 animate-gradient-x">
                  Berkay Özgün
                </span>
              </h1>

              <p className="text-xl text-slate-400 mb-8 max-w-lg leading-relaxed">
                {t('hero.description')}
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.button
                  onClick={() => scrollToSection('projects')}
                  className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-all shadow-lg shadow-primary-500/25 flex items-center space-x-2 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Terminal className="w-5 h-5" />
                  <span>{t('hero.viewProjects')}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-medium transition-all backdrop-blur-sm flex items-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Mail className="w-5 h-5" />
                  <span>{t('hero.getInTouch')}</span>
                </motion.button>
              </div>

              <div className="mt-12 flex items-center space-x-6 text-slate-400">
                <a href="https://github.com/Berkayozgun" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors transform hover:scale-110 duration-200">
                  <Github className="w-6 h-6" />
                </a>
                <a href="https://linkedin.com/in/berkayozgun" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors transform hover:scale-110 duration-200">
                  <Linkedin className="w-6 h-6" />
                </a>
                <div className="h-px w-12 bg-white/10"></div>
                <span className="text-sm font-mono">Full Stack Developer</span>
              </div>
            </motion.div>

            <motion.div
              className="relative hidden lg:block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-500 to-purple-500 rounded-2xl rotate-6 opacity-20 blur-lg"></div>
                <div className="absolute inset-0 bg-dark-800 rounded-2xl border border-white/10 shadow-2xl overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-8 bg-dark-900 border-b border-white/5 flex items-center px-4 space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                  </div>
                  <div className="p-8 pt-12 font-mono text-sm text-slate-300">
                    <div className="space-y-4">
                      <p><span className="text-purple-400">const</span> <span className="text-blue-400">developer</span> = <span className="text-yellow-400">{'{'}</span></p>
                      <p className="pl-4">name: <span className="text-green-400">'Berkay Özgün'</span>,</p>
                      <p className="pl-4">role: <span className="text-green-400">'Full Stack Developer'</span>,</p>
                      <p className="pl-4">skills: <span className="text-yellow-400">['React', 'Node.js', 'Python', 'AWS']</span>,</p>
                      <p className="pl-4">hardWorker: <span className="text-purple-400">true</span>,</p>
                      <p className="pl-4">quickLearner: <span className="text-purple-400">true</span>,</p>
                      <p className="pl-4">problemSolver: <span className="text-purple-400">true</span></p>
                      <p><span className="text-yellow-400">{'}'}</span>;</p>
                      <p className="animate-pulse text-primary-400">_</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <span className="text-primary-500 font-mono">01.</span>
              {t('about.title')}
            </h2>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
              {t('about.description')}
            </p>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {/* Frontend */}
            <motion.div
              variants={fadeInUp}
              className="glass-card p-6 group hover:bg-primary-900/10 border-primary-500/10 hover:border-primary-500/30"
            >
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Code className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 font-mono">
                Frontend
              </h3>
              <div className="space-y-3">
                {data.about.skills.frontend.map((skill: string, index: number) => (
                  <div key={index} className="flex items-center space-x-3 group/item">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover/item:scale-150 transition-transform"></div>
                    <span className="text-slate-400 group-hover/item:text-slate-200 transition-colors">{skill}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Backend */}
            <motion.div
              variants={fadeInUp}
              className="glass-card p-6 group hover:bg-green-900/10 border-green-500/10 hover:border-green-500/30"
            >
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Server className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 font-mono">
                Backend
              </h3>
              <div className="space-y-3">
                {data.about.skills.backend.map((skill: string, index: number) => (
                  <div key={index} className="flex items-center space-x-3 group/item">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full group-hover/item:scale-150 transition-transform"></div>
                    <span className="text-slate-400 group-hover/item:text-slate-200 transition-colors">{skill}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Database */}
            <motion.div
              variants={fadeInUp}
              className="glass-card p-6 group hover:bg-purple-900/10 border-purple-500/10 hover:border-purple-500/30"
            >
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Database className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 font-mono">
                Database
              </h3>
              <div className="space-y-3">
                {data.about.skills.database.map((skill: string, index: number) => (
                  <div key={index} className="flex items-center space-x-3 group/item">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover/item:scale-150 transition-transform"></div>
                    <span className="text-slate-400 group-hover/item:text-slate-200 transition-colors">{skill}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* DevOps */}
            <motion.div
              variants={fadeInUp}
              className="glass-card p-6 group hover:bg-orange-900/10 border-orange-500/10 hover:border-orange-500/30"
            >
              <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Cpu className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 font-mono">
                DevOps
              </h3>
              <div className="space-y-3">
                {data.about.skills.devops.map((skill: string, index: number) => (
                  <div key={index} className="flex items-center space-x-3 group/item">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full group-hover/item:scale-150 transition-transform"></div>
                    <span className="text-slate-400 group-hover/item:text-slate-200 transition-colors">{skill}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('projects.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('projects.description')}
            </p>
          </motion.div>

          <ProjectCarousel
            projects={data.projects || []}
            onProjectClick={(project) => {
              setSelectedProject(project);
              setIsModalOpen(true);
            }}
          />
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('certifications.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('certifications.description')}
            </p>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {data.certifications?.map((cert: any, idx: number) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {cert.name}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                      {cert.issuer}
                    </p>
                  </div>
                  <div className="text-gray-500 dark:text-gray-300 text-sm">
                    {cert.date}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('education.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('education.description')}
            </p>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {data.education?.map((edu: any, idx: number) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{edu.school}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">{edu.degree}</p>
                  </div>
                  <div className="text-gray-500 dark:text-gray-300 text-sm mt-2 md:mt-0">{edu.period}</div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{edu.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('blog.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('blog.description')}
            </p>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {(data.medium || []).map((post: any, idx: number) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                      {post.name}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    <span>Read Article</span>
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('experience.title')}
            </h2>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {data.experience.map((exp: Experience, idx: number) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{exp.company}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">{exp.position}</p>
                  </div>
                  <div className="text-gray-500 dark:text-gray-300 text-sm mt-2 md:mt-0">{exp.period}</div>
                </div>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  {exp.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
        language={i18n.language as 'tr' | 'en'}
      />

      {/* Image Slider */}
      <ProjectImageSlider
        isOpen={isImageSliderOpen}
        onClose={() => setIsImageSliderOpen(false)}
        images={selectedProject?.images || []}
      />

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-8 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; {new Date().getFullYear()} Berkay Özgün. {t('footer.rights')}</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
