import React from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme} 
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-all duration-300"
      aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDarkMode ? (
        <MdLightMode className="text-yellow-500 text-2xl" />
      ) : (
        <MdDarkMode className="text-gray-800 text-2xl" />
      )}
    </button>
  );
};

export default ThemeToggle;
