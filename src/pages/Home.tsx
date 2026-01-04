import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, Terminal, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import profileData from '../data/profile.json';
import ProjectModal from '../components/ProjectModal';
import ContactForm from '../components/ContactForm';
import Navigation from '../components/Navigation';
import ProjectCarousel from '../components/ProjectCarousel';

import { Project, Experience, ProfileData } from '../types/profile';
import EducationSection from '../components/EducationSection';
import CertificationsSection from '../components/CertificationsSection';
import BlogSection from '../components/BlogSection';

const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const data = ((profileData as any)[i18n.language as 'tr' | 'en'] || (profileData as any).en) as ProfileData;

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

              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
                <span className="block text-slate-500 dark:text-slate-400 text-2xl md:text-3xl mb-2 font-normal">Hello, I'm</span>
                <span className="block mb-2">Berkay Özgün</span>
                <span className="block text-3xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-purple-400 to-primary-400 animate-gradient-x">
                  {data.hero.title}
                </span>
                <span className="block text-xl md:text-2xl text-slate-500 font-normal mt-2">
                  {data.hero.subtitle}
                </span>
              </h1>

              <p className="text-xl text-slate-400 mb-8 max-w-lg leading-relaxed">
                {data.hero.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.button
                  onClick={() => scrollToSection('projects')}
                  className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-all shadow-lg shadow-primary-500/25 flex items-center space-x-2 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Terminal className="w-5 h-5" />
                  <span>{data.hero.cta}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-4 bg-slate-200 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white rounded-lg font-medium transition-all backdrop-blur-sm flex items-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Mail className="w-5 h-5" />
                  <span>{t('hero.getInTouch') || 'Get In Touch'}</span>
                </motion.button>
              </div>

              <div className="mt-12 flex items-center space-x-6 text-slate-500 dark:text-slate-400">
                <a href="https://github.com/Berkayozgun" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors transform hover:scale-110 duration-200">
                  <Github className="w-6 h-6" />
                </a>
                <a href="https://linkedin.com/in/berkayozgun" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors transform hover:scale-110 duration-200">
                  <Linkedin className="w-6 h-6" />
                </a>
                <div className="h-px w-12 bg-slate-300 dark:bg-white/10"></div>
                <span className="text-sm font-mono">Full Stack Engineer</span>
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
                <div className="absolute inset-0 bg-white dark:bg-dark-800 rounded-2xl border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-8 bg-slate-100 dark:bg-dark-900 border-b border-slate-200 dark:border-white/5 flex items-center px-4 space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                  </div>
                  <div className="p-8 pt-12 font-mono text-sm text-slate-600 dark:text-slate-300">
                    <div className="space-y-4">
                      <p><span className="text-purple-600 dark:text-purple-400">const</span> <span className="text-blue-600 dark:text-blue-400">developer</span> = <span className="text-yellow-600 dark:text-yellow-400">{'{'}</span></p>
                      <p className="pl-4">name: <span className="text-green-600 dark:text-green-400">'Berkay Özgün'</span>,</p>
                      <p className="pl-4">role: <span className="text-green-600 dark:text-green-400">'Full Stack Engineer'</span>,</p>
                      <p className="pl-4">skills: <span className="text-yellow-600 dark:text-yellow-400">['React', 'Node.js', 'TypeScript', 'AI']</span>,</p>
                      <p className="pl-4">onProduction: <span className="text-purple-600 dark:text-purple-400">true</span>,</p>
                      <p className="pl-4">lovesCleanCode: <span className="text-purple-600 dark:text-purple-400">true</span></p>
                      <p><span className="text-yellow-600 dark:text-yellow-400">{'}'}</span>;</p>
                      <p className="animate-pulse text-primary-500 dark:text-primary-400">_</p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 flex items-center justify-center gap-3">
              <span className="text-primary-500 font-mono">01.</span>
              {data.about.title}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              {data.about.description}
            </p>
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
              {t('navigation.projects')}
            </h2>
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

      {/* Experience Section */}
      <section id="experience" className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
              <span className="text-primary-500 font-mono">02.</span>
              {t('navigation.experience')}
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
                className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-white/5 hover:border-primary-500/50 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{exp.company}</h3>
                    <p className="text-primary-500 font-medium text-lg">{exp.role}</p>
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 font-mono text-sm mt-2 md:mt-0 px-3 py-1 bg-slate-100 dark:bg-white/5 rounded-full border border-slate-200 dark:border-white/5">
                    {exp.period}
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {exp.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Education & Certifications Section */}
      <section id="education" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <EducationSection
              education={data.education}
              title={t('navigation.education')}
              indexPrefix="03."
            />
            <CertificationsSection
              certifications={data.certifications}
              title={t('navigation.certifications')}
              indexPrefix="04."
            />
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <BlogSection
        posts={data.blog}
        title={t('navigation.blog')}
        indexPrefix="05."
      />

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
              <span className="text-primary-500 font-mono">06.</span>
              {t('navigation.contact')}
            </h2>
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
