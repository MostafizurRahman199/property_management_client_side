import React, { useState, useEffect } from 'react';
import { FaRegMoon } from 'react-icons/fa';
import { FiSun } from 'react-icons/fi';

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const storedMode = localStorage.getItem('darkMode');
    if (storedMode) {
      setDarkMode(JSON.parse(storedMode));
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div>
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <FiSun className='text-black text-2xl' /> : <FaRegMoon className='text-black text-xl'/>}
      </button>
    </div>
  );
};

export default DarkModeToggle;
