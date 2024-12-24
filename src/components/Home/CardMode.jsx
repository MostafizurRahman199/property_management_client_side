import React from "react";

const CardMode = ({ properties, darkMode, openModal, handleStatusChange }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {properties.length === 0 ? (
        <p className="text-center col-span-full">No properties found.</p>
      ) : (
        properties.map((property) => (
          <div
            key={property.id}
            className={`card p-4 rounded-lg shadow-lg ${
              darkMode ? "bg-[#151515] text-white" : "bg-white text-black"
            }`}
          >
            <h3 className="text-xl font-semibold mb-2">{property.name}</h3>
            <p className="text-sm">
              <strong>Type:</strong> {property.type}
            </p>
            <p className="text-sm">
              <strong>Price:</strong> ${property.price}
            </p>
            <p className="text-sm">
              <strong>Location:</strong> {property.location}
            </p>
            <p className="text-sm mb-4">
              <strong>Status:</strong>{" "}
              <span
                className={`inline-block px-2 py-1 text-sm rounded-lg ${
                  property.status === "Available"
                    ? "bg-green-500 text-white"
                    : "bg-gray-500 text-white"
                }`}
              >
                {property.status}
              </span>
            </p>
            <div className="flex justify-around mt-4">
              <button
                className="btn bg-[#A91D3A] text-white"
                onClick={() => openModal(property, false)}
              >
                View
              </button>
              <button
                className="btn bg-[#151515] text-white"
                onClick={() => handleStatusChange(property.id, property)}
              >
                Rent
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CardMode;
