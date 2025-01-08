import { useState } from "react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Form gönderme mantığı buraya gelecek
  };

  return (
    <section id='contact' className='py-20 px-4 md:px-20'>
      <h2 className='section-heading'>
        İletişim
        <hr className='section-divider' />
      </h2>

      <div className='max-w-2xl mx-auto mt-8'>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label
              htmlFor='name'
              className='block text-gray-700 dark:text-gray-300'
            >
              İsim
            </label>
            <input
              type='text'
              id='name'
              className='w-full p-3 mt-1 border rounded-lg bg-white/50 dark:bg-gray-800/50 
              border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-teal-500 
              focus:border-transparent transition-smooth'
              required
            />
          </div>
          {/* Diğer form alanları */}
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
