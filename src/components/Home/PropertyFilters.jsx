import React, { useState, useEffect } from "react";
import { useDarkMode } from "../../Auth/DarkModeContext";

const PropertyFilters = ({ properties, setProperties }) => {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [featureFilter, setFeatureFilter] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const { darkMode, setDarkMode } = useDarkMode();

  const features = ["Parking", "Balcony", "Pool", "Garden"];

  // Apply filters whenever any filter state changes
  useEffect(() => {
    applyFilters();
  }, [search, sortOrder, typeFilter, featureFilter, statusFilter]);

  const applyFilters = () => {
    let filtered = [...properties];

    // Search filter
    if (search) {
      filtered = filtered.filter(
        (property) =>
          property.name.toLowerCase().includes(search.toLowerCase()) ||
          property.location.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Type filter
    if (typeFilter) {
      filtered = filtered.filter((property) => property.type === typeFilter);
    }

    // Feature filter
    if (featureFilter.length > 0) {
      filtered = filtered.filter((property) =>
        featureFilter.every((feature) => property.features.includes(feature))
      );
    }

    // Status filter
    if (statusFilter) {
      filtered = filtered.filter((property) => property.status === statusFilter);
    }

    // Sort by price
    if (sortOrder === "asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setProperties(filtered);
  };

  return (
    <div className="mb-6">
      <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${darkMode == true ?  "text-white" : "text-purple-500"}`}>Filters & Search</h3>

      <div className="flex flex-wrap gap-4 mb-4">
        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or location"
          className="flex-1 min-w-[200px] p-2 border rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Sort by Price */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="flex-1 min-w-[200px] p-2 border rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">Sort by Price</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        {/* Filter by Type */}
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="flex-1 min-w-[200px] p-2 border rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">Filter by Type</option>
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Commercial">Commercial</option>
        </select>

        {/* Filter by Status */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="flex-1 min-w-[200px] p-2 border rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">Filter by Status</option>
          <option value="Available">Available</option>
          <option value="Rented">Rented</option>
          <option value="Pending">Pending</option>
          <option value="Under Maintenance">Under Maintenance</option>
        </select>
      </div>

      {/* Filter by Features */}
      <div className="flex flex-wrap gap-4 mb-4">
        {features.map((feature) => (
          <label key={feature} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={feature}
              checked={featureFilter.includes(feature)}
              onChange={(e) => {
                const { value, checked } = e.target;
                setFeatureFilter((prev) =>
                  checked
                    ? [...prev, value]
                    : prev.filter((f) => f !== value)
                );
              }}
              className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
            />
            <span>{feature}</span>
          </label>
        ))}
      </div>

      {/* See All Button */}
      <div className="flex justify-end">
        <button
          onClick={() => {
            setSearch("");
            setSortOrder("");
            setTypeFilter("");
            setFeatureFilter([]);
            setStatusFilter("");
            setProperties(properties);
          }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition duration-200"
        >
          See All
        </button>
      </div>
    </div>
  );
};

export default PropertyFilters;
