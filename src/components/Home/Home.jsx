import React, { useState, useEffect } from "react";
import DashboardSummary from "./DashboardSummary";
import Filter from "./Filter";
import AddPropertyForm from "./AddPropertyForm";
import PropertyList from "./PropertyList";
import { usePropertyContext } from "../../Auth/StateContext";
import { useTheme } from "../../Auth/ThemeContext";
import { useDarkMode } from "../../Auth/DarkModeContext";
import Statistics from "./Statistics";
import Welcome from "./Welcome";

const Home = () => {
  // const [properties, setProperties] = useState([]);

  const { properties, setProperties } = usePropertyContext();
  const { darkMode, setDarkMode } = useDarkMode();
  // const {theme}= useTheme();
  // console.log(theme);

  // Open and close modal functions

  return (
    <div className="min-h-screen p-2  md:p-6">
      <h1 className={`text-3xl md:text-4xl font-bold mb-6 text-center ${darkMode == true ?  "text-white" : "text-purple-500"}`}>
        Dashboard
      </h1>
    <Welcome></Welcome>
      <DashboardSummary />
      <Statistics></Statistics>

      <PropertyList />
    </div>
  );
};

export default Home;
