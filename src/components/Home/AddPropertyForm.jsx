import { useState } from "react";
import { saveToLocalStorage } from "../../utils/localStorage";
import Swal from "sweetalert2";

const AddPropertyForm = ({ onAddProperty, closeModal }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    status: "Available",
    date: "",
    price: "",
    location: "",
    size: "",
    description: "",
    imageURL: "",
    features: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeaturesChange = (e) => {
    const options = Array.from(e.target.options);
    const selectedFeatures = options
      .filter((option) => option.selected)
      .map((opt) => opt.value);
    setFormData((prev) => ({ ...prev, features: selectedFeatures }));
  };

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.type ||
      !formData.date ||
      !formData.price ||
      !formData.location
    ) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "All required fields must be filled out!",
      });
      return false;
    }

    if (Number(formData.price) <= 0) {
      Swal.fire({
        icon: "error",
        title: "Invalid Price",
        text: "Price must be a positive number!",
      });
      return false;
    }

    if (!/^https?:\/\/.+\..+$/.test(formData.imageURL) && formData.imageURL) {
      Swal.fire({
        icon: "error",
        title: "Invalid URL",
        text: "Please enter a valid Image URL!",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const property = { ...formData, id: Date.now() };
    saveToLocalStorage(property);
    onAddProperty(property);

    setFormData({
      name: "",
      type: "",
      status: "Available",
      date: "",
      price: "",
      location: "",
      size: "",
      description: "",
      imageURL: "",
      features: [],
    });

    Swal.fire({
      icon: "success",
      title: "Property Added!",
      text: "Your property has been successfully added!",
    });
  };

  return (
    <form className="bg-white p-4 mb-6" onSubmit={handleSubmit}>
      {/* Name */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Enter property name"
          required
        />
      </div>

      {/* Type */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Type</option>
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Commercial">Commercial</option>
        </select>
      </div>

      {/* Status */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="Available">Available</option>
          <option value="Rented">Rented</option>
          <option value="Pending">Pending</option>
          <option value="Under Maintenance">Under Maintenance</option>
        </select>
      </div>

      {/* Date */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* Price */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Enter price"
          required
        />
      </div>

      {/* Location */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Enter location"
          required
        />
      </div>

      {/* Size */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Size</label>
        <input
          type="text"
          name="size"
          value={formData.size}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Enter size (e.g., sqft, rooms)"
        />
      </div>

      {/* Image URL */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Image URL</label>
        <input
          type="url"
          name="imageURL"
          value={formData.imageURL}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Enter image URL"
        />
      </div>

      {/* Features */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Features</label>
        <div className="space-y-2">
          {["Parking", "Balcony", "Pool", "Garden"].map((feature) => (
            <label key={feature} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="features"
                value={feature}
                checked={formData.features.includes(feature)}
                onChange={(e) => {
                  const { value, checked } = e.target;
                  setFormData((prev) => ({
                    ...prev,
                    features: checked
                      ? [...prev.features, value]
                      : prev.features.filter((f) => f !== value),
                  }));
                }}
                className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
              />
              <span className="text-gray-700">{feature}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Enter a detailed description"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Add Property
      </button>

     

      <div className="modal-action ">
        <button
          onClick={closeModal}
          className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddPropertyForm;
