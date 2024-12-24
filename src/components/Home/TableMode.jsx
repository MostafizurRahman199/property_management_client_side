import React from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const TableMode = ({
  properties,
  darkMode,
  openModal,
  handleDelete,
  handleStatusChange,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead className="bg-gradient-to-r from-[#A91D3A] to-[#151515] text-white">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Type</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Location</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-4">
                No properties found.
              </td>
            </tr>
          ) : (
            properties.map((property) => (
              <tr
                key={property.id}
                className={`transition duration-200 ${
                  darkMode ? "hover:bg-black/20" : "hover:bg-gray-100"
                }`}
              >
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {property.name}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {property.type}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  ${property.price}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {property.location}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <span
                    className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                      property.status === "Available"
                        ? "bg-green-500 text-white"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    {property.status}
                  </span>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center flex justify-around">
                  <button
                    className="btn btn-circle"
                    onClick={() => openModal(property, false)}
                  >
                    <FaEye className="text-xl text-[#A91D3A]" />
                  </button>
                  <button
                    className="btn btn-circle"
                    onClick={() => handleStatusChange(property.id, property)}
                  >
                    Rent
                  </button>
                  <button
                    className="btn btn-circle"
                    onClick={() => openModal(property, true)}
                  >
                    <FaEdit className="text-xl text-[#186631]" />
                  </button>
                  <button
                    className="btn btn-circle"
                    onClick={() => handleDelete(property.id)}
                  >
                    <FaTrash className="text-xl text-[#151515]" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableMode;
