/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiPhone } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <motion.footer 
      className="border-t border-gray-200 dark:border-gray-800 py-8 relative z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 dark:text-gray-400">
              © {currentYear} Your Portfolio. All rights reserved.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <motion.a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
              whileHover={{ y: -5 }}
            >
              <FiGithub className="text-xl" />
            </motion.a>
            
            <motion.a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
              whileHover={{ y: -5 }}
            >
              <FiLinkedin className="text-xl" />
            </motion.a>
            
            <motion.a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
              whileHover={{ y: -5 }}
            >
              <FiTwitter className="text-xl" />
            </motion.a>
            
            <motion.a 
              href="mailto:contact@example.com" 
              className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
              whileHover={{ y: -5 }}
            >
              <FiMail className="text-xl" />
            </motion.a>
            
            <motion.a 
              href="tel:+1234567890" 
              className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
              whileHover={{ y: -5 }}
            >
              <FiPhone className="text-xl" />
            </motion.a>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-500 dark:text-gray-500 text-sm">
            Built with React, Node.js, and MySQL | Deployed on GitHub Pages
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;