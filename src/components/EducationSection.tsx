import React from 'react';
import { motion } from 'framer-motion';

import { Education } from '../types/profile';

interface EducationSectionProps {
    education: Education[];
    title: string;
    indexPrefix: string;
}

const EducationSection: React.FC<EducationSectionProps> = ({ education, title, indexPrefix }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
        >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 flex items-center gap-3">
                <span className="text-primary-500 font-mono">{indexPrefix}</span>
                {title}
            </h2>
            <div className="space-y-8">
                {education.map((edu, idx) => (
                    <div key={idx} className="relative pl-8 border-l-2 border-primary-500/30">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary-500 border-4 border-slate-50 dark:border-gray-900"></div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{edu.school}</h3>
                        <p className="text-primary-500 font-medium">{edu.degree}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-2">{edu.date}</p>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{edu.description}</p>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default EducationSection;
