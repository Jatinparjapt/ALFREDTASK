import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFlashcardsAsync } from "../features/flashcardsSlice";
import Flashcard from "./Flashcard";
import { motion } from "framer-motion";

const FlashcardList = () => {
  const dispatch = useDispatch();
  const { flashcards, progress, status, error } = useSelector((state) => state.flashcards);

  useEffect(() => {
    dispatch(fetchFlashcardsAsync());
  }, [dispatch]);

  // Loading State
  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <motion.div
          className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
        />
        <p className="text-gray-600 mt-3 text-lg">Loading flashcards...</p>
      </div>
    );
  }

  // Error State
  if (status === "failed") {
    return (
      <div className="text-center text-red-600 text-lg font-semibold p-4">
        <p>{error || "Failed to load flashcards. Please try again later."}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Heading */}
      <motion.h2
        className="text-center text-2xl font-semibold text-gray-800 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {flashcards.length > 0
          ? `You have ${progress} flashcards due today`
          : "No flashcards due today 🎉"}
      </motion.h2>

      {/* Flashcard List */}
      {flashcards.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center text-gray-600 text-lg mt-8"
        >
          <p>Keep up the good work! 🚀</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {flashcards.map((flashcard , index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <Flashcard flashcard={flashcard} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlashcardList;
