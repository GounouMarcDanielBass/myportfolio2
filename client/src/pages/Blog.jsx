/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { FiHeart, FiMessageSquare, FiCalendar, FiUser, FiArrowLeft } from 'react-icons/fi';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts');
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    try {
      await axios.post(`/api/posts/${postId}/like`);
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      ));
      
      if (selectedPost?.id === postId) {
        setSelectedPost({ ...selectedPost, likes: selectedPost.likes + 1 });
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleCommentSubmit = async (e, postId) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`/api/posts/${postId}/comments`, {
        email,
        content: comment
      });
      
      setPosts(posts.map(post => 
        post.id === postId ? { 
          ...post, 
          comments: [...post.comments, response.data] 
        } : post
      ));
      
      if (selectedPost?.id === postId) {
        setSelectedPost({ 
          ...selectedPost, 
          comments: [...selectedPost.comments, response.data] 
        });
      }
      
      setComment('');
      setEmail('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <motion.h1 
        className="text-4xl font-bold mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Tech Blog
      </motion.h1>
      
      {selectedPost ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-4xl mx-auto"
        >
          <button 
            onClick={() => setSelectedPost(null)}
            className="mb-6 flex items-center text-purple-600 dark:text-purple-400 hover:underline"
          >
            <FiArrowLeft className="mr-2" /> Back to all posts
          </button>
          
          <motion.article 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="p-6">
              <motion.h2 
                className="text-3xl font-bold mb-4"
                whileHover={{ color: '#9333ea' }}
              >
                {selectedPost.title}
              </motion.h2>
              
              <div className="flex flex-wrap gap-4 mb-6 text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <FiCalendar className="mr-2" />
                  {new Date(selectedPost.date).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <FiUser className="mr-2" />
                  {selectedPost.author}
                </div>
              </div>
              
              <div className="prose dark:prose-invert max-w-none mb-8">
                <ReactMarkdown>{selectedPost.content}</ReactMarkdown>
              </div>
              
              <div className="flex items-center mb-8">
                <button 
                  onClick={() => handleLike(selectedPost.id)}
                  className="flex items-center mr-6 text-gray-700 dark:text-gray-300 hover:text-red-500 transition-colors duration-300"
                >
                  <FiHeart className={`mr-2 ${selectedPost.liked ? 'fill-current text-red-500' : ''}`} />
                  {selectedPost.likes} likes
                </button>
                
                <div className="flex items-center">
                  <FiMessageSquare className="mr-2" />
                  {selectedPost.comments.length} comments
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Comments</h3>
                
                {selectedPost.comments.length === 0 ? (
                  <p className="text-gray-500">No comments yet. Be the first to comment!</p>
                ) : (
                  <div className="space-y-4">
                    {selectedPost.comments.map(comment => (
                      <motion.div 
                        key={comment.id} 
                        className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex justify-between mb-2">
                          <span className="font-medium text-purple-600 dark:text-purple-400">
                            {comment.email}
                          </span>
                          <span className="text-sm text-gray-500">
                            {new Date(comment.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
              
              <form onSubmit={(e) => handleCommentSubmit(e, selectedPost.id)}>
                <h3 className="text-xl font-bold mb-4">Add a Comment</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 transition-colors duration-300"
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="comment" className="block mb-2 font-medium">Comment</label>
                  <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 transition-colors duration-300"
                    required
                    placeholder="Share your thoughts..."
                  ></textarea>
                </div>
                
                <motion.button
                  type="submit"
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Post Comment
                </motion.button>
              </form>
            </div>
          </motion.article>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -10,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
              }}
              onClick={() => setSelectedPost(post)}
            >
              <div className="p-6">
                <motion.h3 
                  className="text-xl font-bold mb-2 text-gray-900 dark:text-white"
                  whileHover={{ color: '#9333ea' }}
                >
                  {post.title}
                </motion.h3>
                
                <div className="flex flex-wrap gap-4 mb-4 text-gray-600 dark:text-gray-400 text-sm">
                  <div className="flex items-center">
                    <FiCalendar className="mr-1" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <FiHeart className="mr-1" />
                    {post.likes}
                  </div>
                  <div className="flex items-center">
                    <FiMessageSquare className="mr-1" />
                    {post.comments.length}
                  </div>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <button className="text-purple-600 dark:text-purple-400 font-medium hover:underline">
                  Read More →
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;