import React from "react";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/ProjectsSection";
import Footer from "../components/Footer";

const Home: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <Footer />
    </div>
  );
};

export default Home;
