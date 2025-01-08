import { Certification } from "../types";
import { CERTIFICATIONS } from "../data/data";
import Image from "./Image";

interface CertificationCardProps {
  certification: Certification;
}

const CertificationCard = ({ certification }: CertificationCardProps) => {
  return (
    <div className='bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1'>
      <div className='relative aspect-video'>
        <Image
          src={certification.image}
          alt={certification.name}
          className='w-full h-full object-cover'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
      </div>
      <div className='p-6'>
        <h3 className='text-xl font-bold mb-2 text-gray-800 dark:text-white'>
          {certification.name}
        </h3>
        <div className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
          <div className='flex items-center justify-between mb-2'>
            <span className='font-medium'>{certification.issuer}</span>
            <span>{certification.date}</span>
          </div>
          {certification.details && (
            <ul className='list-disc list-inside space-y-1 mt-2 text-sm'>
              {certification.details.map((detail, idx) => (
                <li key={idx} className='text-gray-600 dark:text-gray-400'>
                  {detail}
                </li>
              ))}
            </ul>
          )}
        </div>
        <a
          href={certification.credentialUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center text-teal-500 hover:text-teal-600 font-medium transition-colors'
        >
          Sertifikayı Görüntüle
          <svg
            className='w-4 h-4 ml-2'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

const CertificationsSection = () => {
  return (
    <section id='certifications' className='py-20 px-4 md:px-20'>
      <h2 className='text-4xl font-bold text-center mb-8'>
        Certifications
        <hr className='w-6 h-1 mx-auto my-4 bg-teal-500 border-0 rounded' />
      </h2>

      <div className='max-w-6xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {CERTIFICATIONS.map((cert, index) => (
            <CertificationCard key={index} certification={cert} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
