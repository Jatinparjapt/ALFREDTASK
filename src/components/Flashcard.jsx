import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateFlashcardAsync,fetchFlashcardsAsync, deleteFlashcardAsync } from "../features/flashcardsSlice";
import { motion } from "framer-motion";
import { toast } from 'react-hot-toast';

const Flashcard = ({ flashcard }) => {
  const dispatch = useDispatch();
  const { _id, question, answer, level } = flashcard;
//  console.log(flashcard, "flash")
  const [isFlipped, setIsFlipped] = useState(false);

  const handleAnswer = (correct) => {
    console.log(_id,correct, "update")
    dispatch(updateFlashcardAsync({ _id, correct }));
    setIsFlipped(false);
    dispatch(fetchFlashcardsAsync())
    toast.success("Updated successful!");
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleDelete = () => {
    console.log(_id, "delete")
    dispatch(deleteFlashcardAsync(_id));
    dispatch(fetchFlashcardsAsync())
    toast.success("Deleted successful!");
  };

  return (
    <motion.div
      className="relative w-full max-w-sm min-h-[220px] bg-white shadow-lg rounded-xl overflow-hidden transition-all transform hover:shadow-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
    >
      {/* Flip Container */}
      <motion.div
        className={`w-full h-full flex items-center justify-center px-4 py-6 transition-transform duration-500 ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        onClick={handleFlip}
      >
        {!isFlipped ? (
          <motion.div className="front text-center text-lg font-semibold text-gray-800">
            <p className="truncate">{question}</p>
          </motion.div>
        ) : (
          <motion.div className="back text-center text-lg font-medium text-gray-600">
            <p className="truncate">{answer}</p>
          </motion.div>
        )}
      </motion.div>

      {/* Action Buttons */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-3 px-4">
        <button
          className="bg-green-500 text-white px-4 py-1 rounded-md text-sm hover:bg-green-600 transition"
          onClick={() => handleAnswer(true)}
        >
          ✔ Correct
        </button>
        <button
          className="bg-red-500 text-white px-4 py-1 rounded-md text-sm hover:bg-red-600 transition"
          onClick={() => handleAnswer(false)}
        >
          ✘ Wrong
        </button>
        <button
          className="bg-gray-400 text-white px-3 py-1 rounded-md text-sm hover:bg-gray-500 transition"
          onClick={handleDelete}
        >
          🗑 Delete
        </button>
      </div>
    </motion.div>
  );
};

export default Flashcard;
