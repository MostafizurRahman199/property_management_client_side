import React, { useState, useEffect } from "react";
import DashboardSummary from "./DashboardSummary";
import Filter from "./Filter";
import AddPropertyForm from "./AddPropertyForm";
import PropertyList from "./PropertyList";
import { usePropertyContext } from "../../Auth/StateContext";
import { useTheme } from "../../Auth/ThemeContext";
import { useDarkMode } from "../../Auth/DarkModeContext";

const Home = () => {
  // const [properties, setProperties] = useState([]);

  const {properties, setProperties} = usePropertyContext();
  const { darkMode, setDarkMode } = useDarkMode();
  // const {theme}= useTheme();
  // console.log(theme);

 



  // Open and close modal functions
  const openModal = () => document.getElementById("add_property_modal").showModal();
  const closeModal = () => document.getElementById("add_property_modal").close();

  return (
    <div className="min-h-screen  p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Property Management Dashboard</h1>

      <DashboardSummary properties={properties} />

      {/* Add Property Button */}
      <button
        className="btn btn-primary mb-6"
        onClick={openModal}
      >
        Add Property
      </button>

      {/* Modal for Add Property Form */}
      <div className="relative">
      <dialog id="add_property_modal" className={`modal modal-bottom sm:modal-middle` }>
        <div className={`modal-box ${darkMode == true ?"bg-black text-white" : "bg-white text-black" }`}>
          <div className="modal-action absolute  right-2 -top-4">
            <button className="btn btn-circle" onClick={closeModal}>
              ❌
            </button>
          </div>
          <h3 className="font-bold text-lg">Add New Property</h3>
          <AddPropertyForm  closeModal={closeModal} />
        </div>
      </dialog>
      </div>

      <Filter  />
      <PropertyList  />
    </div>
  );
};

export default Home;
