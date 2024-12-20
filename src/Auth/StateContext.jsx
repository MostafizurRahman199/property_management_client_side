import React, { createContext, useContext, useState } from 'react';

// Create the context
const PropertyContext = createContext();

// Provider component
export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);


  return (
    <PropertyContext.Provider
      value={{
        properties,
        setProperties
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

// Custom hook to use the PropertyContext
export const usePropertyContext = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('usePropertyContext must be used within a PropertyProvider');
  }
  return context;
};
