import React from 'react';
import { FaRegMoon } from 'react-icons/fa';
import { FiSun } from 'react-icons/fi';
import { useDarkMode } from '../../Auth/DarkModeContext';
 // Import the custom hook

const DarkModeToggle = () => {
  const { darkMode, setDarkMode } = useDarkMode();
  // console.log(darkMode);

  return (
    <div>
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <FiSun className="text-black text-2xl" /> : <FaRegMoon className="text-black text-xl" />}
      </button>
    </div>
  );
};

export default DarkModeToggle;
