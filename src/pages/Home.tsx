import React from "react";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/ProjectsSection";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CertificationsSection from "../components/CertificationsSection";

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <CertificationsSection />
      <Footer />
    </div>
  );
};

export default Home;
