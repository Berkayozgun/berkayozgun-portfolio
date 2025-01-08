const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='py-6 px-4 border-t border-gray-200 dark:border-gray-800'>
      <div className='container mx-auto flex flex-col items-center justify-center'>
        <p className='text-gray-600 dark:text-gray-400 text-sm text-center'>
          © {currentYear} Berkay Özgün. All rights reserved.
        </p>
        <p className='text-gray-500 dark:text-gray-500 text-xs mt-2'>
          Built with React & Tailwind CSS
        </p>
      </div>
    </footer>
  );
};

export default Footer;
