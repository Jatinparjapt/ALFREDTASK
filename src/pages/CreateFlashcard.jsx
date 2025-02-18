// components/CreateFlashcard.jsx

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { createFlashcardAsync , fetchFlashcardsAsync } from '../features/flashcardsSlice';
import { toast } from 'react-hot-toast';


const CreateFlashcard = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFlashcard = { question, answer, level: 1 };
    dispatch(createFlashcardAsync(newFlashcard));
    setQuestion('');
    setAnswer('');
    toast.success("Flash Card Added ! 🙂")
    // console.log("flash card added")
  };

  return (
    <motion.div
      className="create-flashcard-container p-8 max-w-md mx-auto mt-6 bg-white rounded-lg shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-3xl font-bold text-center mb-6">Create Flashcard</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="question" className="block text-gray-600">Question</label>
          <input
            type="text"
            id="question"
            className="w-full p-3 mt-2 border border-gray-300 rounded"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="answer" className="block text-gray-600">Answer</label>
          <input
            type="text"
            id="answer"
            className="w-full p-3 mt-2 border border-gray-300 rounded"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-lg">
          Create Flashcard
        </button>
      </form>
    </motion.div>
  );
};

export default CreateFlashcard;
