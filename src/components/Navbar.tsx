import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { RiMoonFill, RiSunLine } from "react-icons/ri";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { NAV_ITEMS } from "../data/data.ts";

export default function Navbar() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className='bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50'>
      <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
        <div className='flex items-center space-x-4'>
          <div className='text-2xl font-bold text-gray-900 dark:text-gray-100'>Berkay Özgün</div>
          <div className='hidden md:flex space-x-4'>
            {NAV_ITEMS.map((item: { page: string; label: string }, idx: number) => (
              <Link
                key={idx}
                to={item.page}
                className='text-gray-900 dark:text-gray-100 hover:text-teal-500 cursor-pointer'
                smooth={true}
                duration={500}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className='flex items-center space-x-4'>
          <button
            onClick={toggleTheme}
            className='p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50'
            aria-label='Toggle Dark Mode'
          >
            {theme === "dark" ? <RiSunLine size={24} /> : <RiMoonFill size={24} />}
          </button>
          <div className='md:hidden'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='text-gray-900 dark:text-gray-100 focus:outline-none'
            >
              {isOpen ? <IoMdClose size={24} /> : <IoMdMenu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className='md:hidden'>
          {NAV_ITEMS.map((item: { page: string; label: string }, idx: number) => (
            <Link
              key={idx}
              to={item.page}
              className='block px-4 py-2 text-gray-900 dark:text-gray-100 hover:text-teal-500 cursor-pointer'
              smooth={true}
              duration={500}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={toggleTheme}
            className='block w-full text-left px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50'
            aria-label='Toggle Dark Mode'
          >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      )}
    </nav>
  );
}