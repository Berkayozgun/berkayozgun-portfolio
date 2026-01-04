import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

import { BlogPost } from '../types/profile';

interface BlogSectionProps {
    posts: BlogPost[];
    title: string;
    indexPrefix: string;
}

const BlogSection: React.FC<BlogSectionProps> = ({ posts, title, indexPrefix }) => {
    return (
        <section id="blog" className="py-24 bg-white dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
                        <span className="text-primary-500 font-mono">{indexPrefix}</span>
                        {title}
                    </h2>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, idx) => (
                        <motion.a
                            key={idx}
                            href={post.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-slate-50 dark:bg-gray-700/50 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/5 hover:border-primary-500/50 transition-all duration-300 shadow-lg"
                            whileHover={{ y: -10 }}
                        >
                            <div className="aspect-video overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-xs font-mono text-primary-500">{post.date}</span>
                                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                                    <span className="text-xs font-mono text-slate-400">{post.readTime}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-500 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                                    {post.description}
                                </p>
                                <div className="flex items-center text-primary-500 font-medium text-sm group-hover:gap-2 transition-all py-2 min-h-[44px]">
                                    <span>Read More</span>
                                    <ChevronRight className="w-5 h-5 ml-1" />
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
