// src/components/Home.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Home = () => {
  const [stories, setStories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/stories');
        const allStories = response.data;

        setStories(allStories);
        setFilteredStories(allStories);

        const uniqueCategories = ['All', ...new Set(allStories.map(story => story.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching stories:', error);
      }
    };

    fetchStories();
  }, []);

  const filterStoriesByCategory = (category) => {
    setActiveCategory(category);
    setFilteredStories(category === 'All' ? stories : stories.filter(story => story.category === category));
  };

  return (
    <div className="p-8 mt-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <motion.section
        className="text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg p-16 shadow-lg mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-5xl font-extrabold leading-tight mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Discover <span className="underline decoration-white/70">Curated Medium Blogs</span>
        </motion.h1>
        <motion.p
          className="text-lg font-light max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Explore the latest articles categorized for you — dive into insights, stories, and innovations.
        </motion.p>
      </motion.section>

      {/* Categories Section */}
      <motion.div
        className="flex justify-center flex-wrap gap-4 mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
      >
        {categories.map((category, index) => (
          <motion.button
            key={category}
            onClick={() => filterStoriesByCategory(category)}
            className={`px-5 py-2 text-sm font-medium rounded-full transition-all ${
              activeCategory === category
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-800 hover:bg-blue-500 hover:text-white'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      {/* Blog Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        {filteredStories.length > 0 ? (
          filteredStories.map((story) => (
            <motion.div
              key={story._id}
              className="overflow-hidden border rounded-lg shadow-md hover:shadow-2xl transition-all bg-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              {story.thumbnail && (
                <motion.img
                  src={story.thumbnail}
                  alt={story.title}
                  className="w-full h-44 object-cover rounded-t-lg"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
              )}
              <div className="p-5">
                <h2 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
                  {story.title}
                </h2>
                <p className="text-sm text-gray-500 mb-3">Category: {story.category}</p>
                <motion.a
                  href={story.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-blue-600 font-medium text-sm hover:underline"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  Read Article →
                </motion.a>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.p
            className="text-center col-span-full text-lg text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            No blogs found.
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default Home;
