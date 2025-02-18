import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle mobile menu
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
      {/* Logo */}
      <h1 className="text-xl font-bold">Flashcards App</h1>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-white text-2xl" onClick={toggleMenu}>
        {isOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6">
        {["Home", "Create Flashcard", "Login", "Signup"].map((item, index) => (
          <NavLink
            key={index}
            to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
            className={({ isActive }) =>
              `px-3 py-2 transition duration-300 ${
                isActive ? "font-bold underline" : "hover:opacity-80"
              }`
            }
          >
            {item}
          </NavLink>
        ))}
      </div>

      {/* Mobile Menu (Animated) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-14 left-0 w-full bg-blue-700 md:hidden flex flex-col items-center py-4 space-y-4"
          >
            {["Home", "Create Flashcard", "Login", "Signup"].map((item, index) => (
              <NavLink
                key={index}
                to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
                className="block w-full text-center py-2 hover:bg-blue-500"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
