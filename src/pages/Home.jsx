import React from 'react';
import { useSelector } from 'react-redux';
import FlashcardList from '../components/FlashcardList';
import { motion } from 'framer-motion';

const Home = () => {
  // Get the user's progress from Redux state
  const progress = useSelector(state => state.flashcards.progress);

  return (
    <div className="home-container p-6 max-w-screen-lg mx-auto">
      {/* Title Section */}
      <motion.h1
        className="text-4xl font-bold text-center text-gray-800 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Flashcard App
      </motion.h1>

      {/* Progress Section */}
      <div className="progress-container text-center mb-8">
        <motion.p
          className="text-lg text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          You have{' '}
          <span className="font-semibold text-blue-600">{progress}</span> flashcards due today.
        </motion.p>

        {/* Progress Bar (Optional) */}
        {progress > 0 && (
          <motion.div
            className="progress-bar mt-4"
            initial={{ width: '0%' }}
            animate={{ width: `${(progress / 50) * 100}%` }} // Assuming max progress is 50
            transition={{ duration: 1 }}
            style={{
              height: '8px',
              backgroundColor: '#4CAF50',
              borderRadius: '4px',
            }}
          />
        )}
      </div>

      {/* Render the list of flashcards */}
      <FlashcardList />
    </div>
  );
};

export default Home;
