import React, { useState, useEffect } from "react";
import DashboardSummary from "./DashboardSummary";
import Filter from "./Filter";
import AddPropertyForm from "./AddPropertyForm";
import PropertyList from "./PropertyList";

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filters, setFilters] = useState({ type: "", status: "" });

  // Load properties from localStorage on mount
  useEffect(() => {
    const storedProperties = JSON.parse(localStorage.getItem("properties")) || [];
    setProperties(storedProperties);
    setFilteredProperties(storedProperties);
  }, []);

  // Save properties to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("properties", JSON.stringify(properties));
  }, [properties]);

  // Handle adding a new property
  const addProperty = (newProperty) => {
    setProperties((prev) => [...prev, newProperty]);
    applyFilters([...properties, newProperty]);
    closeModal(); // Close modal after adding the property
  };

  // Apply filters to the property list
  const applyFilters = (propertyList = properties) => {
    const filtered = propertyList.filter((property) => {
      const typeMatch = filters.type ? property.type === filters.type : true;
      const statusMatch = filters.status
        ? property.status === filters.status
        : true;
      return typeMatch && statusMatch;
    });
    setFilteredProperties(filtered);
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    applyFilters(properties);
  };

  // Open and close modal functions
  const openModal = () => document.getElementById("add_property_modal").showModal();
  const closeModal = () => document.getElementById("add_property_modal").close();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
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
      <dialog id="add_property_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="modal-action absolute  right-2 -top-4">
            <button className="btn btn-circle" onClick={closeModal}>
              ❌
            </button>
          </div>
          <h3 className="font-bold text-lg">Add New Property</h3>
          <AddPropertyForm onAddProperty={addProperty} closeModal={closeModal} />
        </div>
      </dialog>
      </div>

      <Filter filters={filters} onFilterChange={handleFilterChange} />
      <PropertyList properties={filteredProperties} />
    </div>
  );
};

export default Home;
