import React from 'react';
import { useDarkMode } from '../../Auth/DarkModeContext';
import { FaCheck, FaInfoCircle, FaMapMarkerAlt, FaDollarSign, FaRulerCombined, FaCalendarAlt, FaBuilding, FaTag, FaWarehouse, FaRegStar } from 'react-icons/fa';

const ViewDetails = ({ selectedProperty, modalClose }) => {

    const { darkMode, setDarkMode } = useDarkMode();

  if (!selectedProperty) {
    return (
      <div className="p-6 text-center">
        <p className="text-lg text-gray-500">No property selected.</p>
      </div>
    );
  }

  return (
    <div className={`p-6 max-w-4xl mx-auto ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}` } >
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-600">Property Details</h2>

      <div className="flex flex-col gap-6">
        {/* Image */}
        {selectedProperty.imageURL && (
          <div className="md:col-span-2 flex justify-center">
            <img
              src={selectedProperty.imageURL}
              alt={selectedProperty.name}
              className="max-h-72 rounded-lg border border-gray-300 shadow-sm"
            />
          </div>
        )}

        {/* General Information */}
          <h3 className="text-xl font-semibold mb-1 text-purple-600 flex items-center">
            <FaInfoCircle className="mr-2" /> General Information
          </h3>
        <div className='flex flex-wrap gap-2'>
          <p className=" flex items-center"><FaBuilding className="mr-1" /><strong>Name:</strong> {selectedProperty.name}</p>
          <p className=" flex items-center"><FaTag className="mr-1" /><strong>Type:</strong> {selectedProperty.type}</p>
          <p className=" flex items-center"><FaRegStar className="mr-1" /><strong>Status:</strong> {selectedProperty.status}</p>
          <p className=" flex items-center"><FaCalendarAlt className="mr-1" /> {selectedProperty.date}</p>
        </div>

        {/* Pricing & Location */}
          <h3 className="text-xl font-semibold mb-3 text-purple-600 flex items-center">
            <FaMapMarkerAlt className="mr-2" /> Pricing & Location
          </h3>
        <div className='flex flex-wrap gap-2'>
          <p className=" flex items-center"><FaDollarSign className="mr-1" /> Price: {selectedProperty.price}</p>
          <p className=" flex items-center"><FaMapMarkerAlt className="mr-1" /><strong>Location:</strong> {selectedProperty.location}</p>
          <p className=" flex items-center"><FaRulerCombined className="mr-1" /> Size: {selectedProperty.size}</p>
        </div>

        {/* Features */}
        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold mb-1 text-purple-600 flex items-center">
            <FaWarehouse className="mr-2" /> Features
          </h3>
          {selectedProperty.features && selectedProperty.features.length > 0 ? (
            <ul className="flex flex-wrap gap-2 pl-5 ">
              {selectedProperty.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <FaCheck className="mr-2 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
          ) : (
            <p className="">No features available.</p>
          )}
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold mb-3 text-purple-600 flex items-center">
            <FaInfoCircle className="mr-2" /> Description
          </h3>
          <p className="">{selectedProperty.description}</p>
        </div>
      </div>

      {/* Close Button */}
      <div className="mt-6">
        <button
          onClick={modalClose}
          type="button"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg text-lg font-medium hover:opacity-90 transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewDetails;
