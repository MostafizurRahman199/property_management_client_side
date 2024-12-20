







import React, { useState } from 'react';
import { useDarkMode } from '../../Auth/DarkModeContext';

const EditForm = ({ selectedProperty, handleEditSave, modalClose }) => {
  const { darkMode } = useDarkMode();

  if (!selectedProperty) {
    return <p className="text-center text-gray-500">No property selected.</p>;
  }

  const [formData, setFormData] = useState({
    name: selectedProperty?.name || "",
    type: selectedProperty?.type || "",
    status: selectedProperty?.status || "Available",
    date: selectedProperty?.date || "",
    price: selectedProperty?.price || "",
    location: selectedProperty?.location || "",
    size: selectedProperty?.size || "",
    description: selectedProperty?.description || "",
    imageURL: selectedProperty?.imageURL || "",
    features: selectedProperty?.features || [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeatureChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      features: checked
        ? [...prev.features, value]
        : prev.features.filter((feature) => feature !== value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditSave(formData);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`p-6`}
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-600">Update Property</h2>

      {/* Name */}
      <div className="mb-6">
        <label className="block text-sm font-bold mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Enter property name"
          required
        />
      </div>

      {/* Type */}
      <div className="mb-6">
        <label className="block text-sm font-bold mb-2">Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full p-3 border rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        >
          <option value="">Select Type</option>
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Commercial">Commercial</option>
        </select>
      </div>

      {/* Status */}
      <div className="mb-6">
        <label className="block text-sm font-bold mb-2">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-3 border rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        >
          <option value="Available">Available</option>
          <option value="Rented">Rented</option>
          <option value="Pending">Pending</option>
          <option value="Under Maintenance">Under Maintenance</option>
        </select>
      </div>

      {/* Date */}
      <div className="mb-6">
        <label className="block text-sm font-bold mb-2">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-3 border rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>

      {/* Price */}
      <div className="mb-6">
        <label className="block text-sm font-bold mb-2">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-3 border rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Enter price"
          required
        />
      </div>

      {/* Location */}
      <div className="mb-6">
        <label className="block text-sm font-bold mb-2">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-3 border rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Enter location"
          required
        />
      </div>

      {/* Size */}
      <div className="mb-6">
        <label className="block text-sm font-bold mb-2">Size</label>
        <input
          type="text"
          name="size"
          value={formData.size}
          onChange={handleChange}
          className="w-full p-3 border rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Enter size (e.g., sqft, rooms)"
        />
      </div>

      {/* Image URL */}
      <div className="mb-6">
        <label className="block text-sm font-bold mb-2">Image URL</label>
        <input
          type="url"
          name="imageURL"
          value={formData.imageURL}
          onChange={handleChange}
          className="w-full p-3 border rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Enter image URL"
        />
      </div>

      {/* Features */}
      <div className="mb-6">
        <label className="block text-sm font-bold mb-2">Features</label>
        <div className="space-y-2">
          {["Parking", "Balcony", "Pool", "Garden"].map((feature) => (
            <label key={feature} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="features"
                value={feature}
                checked={formData.features.includes(feature)}
                onChange={handleFeatureChange}
                className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
              />
              <span>{feature}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <label className="block text-sm font-bold mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 border rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Enter a detailed description"
        />
      </div>

      {/* Submit and Cancel Buttons */}
      <div className="flex gap-4">
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:opacity-90 transition duration-200"
        >
          Save Changes
        </button>
        <button
          onClick={modalClose}
          type="button"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:opacity-90 transition duration-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditForm;
