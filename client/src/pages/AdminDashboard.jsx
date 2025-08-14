/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiLogOut, FiSettings, FiUsers, FiFileText, FiAward, FiMail, FiGrid } from 'react-icons/fi';

const AdminDashboard = () => {
  const [sections, setSections] = useState({
    profile: {},
    about: {},
    skills: {},
    projects: [],
    certifications: [],
    social: {}
  });
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.get('/api/admin/content', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSections(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching content:', error);
        setLoading(false);
      }
    };
    
    fetchContent();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin';
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const renderForm = () => {
    switch(activeTab) {
      case 'profile':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Profile Information</h3>
            {/* Form fields for profile */}
          </div>
        );
      case 'about':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">About Section</h3>
            {/* Form fields for about */}
          </div>
        );
      // Add other cases for each section
      default:
        return null;
    }
  };

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-8">
        <motion.h1 
          className="text-3xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Admin Dashboard
        </motion.h1>
        
        <motion.button
          onClick={handleLogout}
          className="flex items-center text-red-600 hover:text-red-800 transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
        >
          <FiLogOut className="mr-2" /> Logout
        </motion.button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                <div className="ml-4">
                  <h3 className="font-bold">Admin User</h3>
                  <p className="text-sm text-gray-500">Super Administrator</p>
                </div>
              </div>
            </div>
            
            <nav className="p-4">
              {[
                { id: 'profile', name: 'Profile', icon: <FiUsers /> },
                { id: 'about', name: 'About', icon: <FiFileText /> },
                { id: 'skills', name: 'Skills', icon: <FiGrid /> },
                { id: 'projects', name: 'Projects', icon: <FiSettings /> },
                { id: 'certifications', name: 'Certifications', icon: <FiAward /> },
                { id: 'blog', name: 'Blog', icon: <FiFileText /> },
                { id: 'social', name: 'Social Links', icon: <FiMail /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`flex items-center w-full p-3 rounded-lg mb-2 transition-colors duration-300 ${
                    activeTab === tab.id 
                      ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="mr-3">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
        
        <div className="lg:col-span-3">
          {renderForm()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;