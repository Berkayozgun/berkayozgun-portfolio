import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { RiMoonFill, RiSunLine } from "react-icons/ri";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { NAV_ITEMS } from "../data/data.ts";

export default function Navbar() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const MobileMenu = () => {
    return (
      <div className='md:hidden absolute top-16 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md py-4 shadow-lg'>
        <div className='flex flex-col items-center space-y-4'>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.page}
              to={item.page}
              className='text-gray-700 dark:text-gray-200 hover:text-teal-500 
              dark:hover:text-teal-400 transition-colors duration-300'
              smooth={true}
              duration={500}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "contact"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg sticky top-0 z-50 transition-all duration-300'>
      <div className='container mx-auto px-6 py-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <span className='text-2xl font-bold bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent'>
              Berkay Özgün
            </span>
          </div>

          <div className='hidden md:flex items-center space-x-8'>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.page}
                to={item.page}
                className='text-gray-700 dark:text-gray-200 hover:text-teal-500 dark:hover:text-teal-400 
                transition-colors duration-300 text-sm font-medium'
                smooth={true}
                duration={500}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={toggleTheme}
              className='p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 
              dark:hover:bg-gray-700 transition-colors duration-300'
              aria-label='Toggle Dark Mode'
            >
              {theme === "dark" ? (
                <RiSunLine size={20} />
              ) : (
                <RiMoonFill size={20} />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
