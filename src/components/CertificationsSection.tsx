import React from 'react';
import { motion } from 'framer-motion';

import { Certification } from '../types/profile';

interface CertificationsSectionProps {
    certifications: Certification[];
    title: string;
    indexPrefix: string;
}

const CertificationsSection: React.FC<CertificationsSectionProps> = ({ certifications, title, indexPrefix }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
        >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 flex items-center gap-3">
                <span className="text-primary-500 font-mono">{indexPrefix}</span>
                {title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {certifications.map((cert, idx) => (
                    <div key={idx} className="p-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg hover:border-primary-500/50 transition-colors shadow-sm">
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{cert.name}</h3>
                        <p className="text-primary-500 text-xs font-medium">{cert.issuer}</p>
                        <p className="text-gray-400 text-[10px] uppercase tracking-wider mt-2">{cert.date}</p>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default CertificationsSection;
