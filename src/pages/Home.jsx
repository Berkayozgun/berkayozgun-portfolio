import React from "react";
import HeroSection from "../components/HeroSection";
import ProjectsSection from "../components/ProjectsSection";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import AboutSection from "../components/AboutSection";

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <Footer />
    </div>
  );
};

export default Home;
