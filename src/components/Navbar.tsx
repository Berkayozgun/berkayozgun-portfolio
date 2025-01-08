import { useState, useEffect } from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io";

interface NavItem {
  label: string;
  page: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Home",
    page: "home",
  },
  {
    label: "About",
    page: "about",
  },
  {
    label: "Projects",
    page: "projects",
  },
  {
    label: "Skills",
    page: "skills",
  },
  {
    label: "Contact",
    page: "contact",
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute("id") || "";

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className='w-full mx-auto px-4 bg-white shadow fixed top-0 z-50 dark:bg-gray-900'>
      <div className='justify-between md:items-center md:flex'>
        <div className='flex items-center justify-between py-3'>
          <a
            href='#home'
            className='text-2xl font-bold text-gray-800 dark:text-white'
          >
            BÖ
          </a>
          <div className='md:hidden'>
            <button
              className='p-2 text-gray-700 rounded-md outline-none dark:text-white'
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <IoMdClose size={30} /> : <IoMdMenu size={30} />}
            </button>
          </div>
        </div>

        <nav className={`md:block ${isOpen ? "block" : "hidden"}`}>
          <ul className='flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0'>
            {NAV_ITEMS.map((item) => (
              <li key={item.page}>
                <a
                  href={`#${item.page}`}
                  className={`block py-2 text-gray-600 hover:text-teal-500 dark:text-gray-300 dark:hover:text-teal-500
                    ${activeSection === item.page ? "text-teal-500" : ""}`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
