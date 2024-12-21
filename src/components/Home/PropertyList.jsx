// import React, { useState, useEffect } from "react";
// import {
//   getPropertiesFromLocalStorage,
//   deletePropertyFromLocalStorage,
//   editPropertyInLocalStorage,
// } from "../../utils/localStorage";
// import Swal from "sweetalert2";
// import { usePropertyContext } from "../../Auth/StateContext";
// import { useDarkMode } from "../../Auth/DarkModeContext";
// import ViewDetails from "./ViewDetails";
// import EditForm from "./EditForm";
// import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
// import PropertyFilters from "./PropertyFilters";

// const PropertyList = () => {
//   const { darkMode } = useDarkMode();
//   const { properties, setProperties } = usePropertyContext();
//   const [filteredProperties, setFilteredProperties] = useState([]);
//   const [selectedProperty, setSelectedProperty] = useState(null);
//   const [isEdit, setIsEdit] = useState(false);

//   // Load properties from localStorage on mount
//   useEffect(() => {
//     const storedProperties = getPropertiesFromLocalStorage();
//     setProperties(storedProperties);
//     setFilteredProperties(storedProperties);
//   }, [setProperties]);

//   // Handle Delete
//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         const updatedProperties = deletePropertyFromLocalStorage(id);
//         setProperties(updatedProperties);
//         setFilteredProperties(updatedProperties);
//         Swal.fire("Deleted!", "The property has been deleted.", "success");
//       }
//     });
//   };

//   const modalClose = () => {
//     document.getElementById("property_modal").close();
//     setSelectedProperty(null);
//   };

//   // Handle Edit Save
//   const handleEditSave = (updatedProperty) => {
//     const updatedProperties = editPropertyInLocalStorage(updatedProperty);
//     setProperties(updatedProperties);
//     setFilteredProperties(updatedProperties);
//     Swal.fire("Updated!", "The property has been updated.", "success");
//     setSelectedProperty(null);
//     document.getElementById("property_modal").close();
//   };

//   // Open Modal
//   const openModal = (property, editMode = false) => {
//     setSelectedProperty(property);
//     setIsEdit(editMode);
//     document.getElementById("property_modal").showModal();
//   };

//   return (
//     <div
//       className={`container mx-auto p-6 rounded-lg shadow-lg ${
//         darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
//       }`}
//     >
//       <h2 className="text-3xl font-bold mb-6 text-center text-purple-600">
//         Property List
//       </h2>

//       <PropertyFilters
//         properties={properties}
//         setProperties={setFilteredProperties}
//       />

//       {/* Table */}
//       <div className="overflow-x-auto overflow-y-auto h-[400px]">
//         <table className="table-auto w-full border-collapse border border-gray-300">
//           <thead className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
//             <tr>
//               <th className="border border-gray-300 px-4 py-2">Name</th>
//               <th className="border border-gray-300 px-4 py-2">Type</th>
//               <th className="border border-gray-300 px-4 py-2">Price</th>
//               <th className="border border-gray-300 px-4 py-2">Location</th>
//               <th className="border border-gray-300 px-4 py-2">Status</th>
//               <th className="border border-gray-300 px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredProperties.length === 0 ? (
//               <tr>
//                 <td colSpan="6" className="text-center py-4">
//                   No properties found.
//                 </td>
//               </tr>
//             ) : (
//               filteredProperties.map((property) => (
//                 <tr
//                   key={property.id}
//                   className={`transition duration-200 ${
//                     darkMode ? "hover:bg-black/20" : "hover:bg-gray-100"
//                   }`}
//                 >
//                   <td className="border border-gray-300 px-4 py-2 text-center">
//                     {property.name}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2 text-center">
//                     {property.type}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2 text-center">
//                     ${property.price}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2 text-center">
//                     {property.location}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2 text-center">
//                     {property.status}
//                   </td>
//                   <td className="border flex gap-2 justify-center items-center border-gray-300 px-4 py-2">
//                     <button
//                       className="btn btn-circle"
//                       onClick={() => openModal(property, false)}
//                     >
//                       <FaEye className="text-xl" />
//                     </button>
//                     <button
//                       className="btn btn-circle"
//                       onClick={() => openModal(property, true)}
//                     >
//                       <FaEdit className="text-xl" />
//                     </button>
//                     <button
//                       className="btn btn-circle text-lg"
//                       onClick={() => handleDelete(property.id)}
//                     >
//                       ❌
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal */}
//       <dialog id="property_modal" className="modal modal-bottom sm:modal-middle">
//         <div
//           className={`modal-box rounded-lg shadow-lg ${
//             darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
//           }`}
//         >
//           <div className="py-4">
//             {isEdit ? (
//               <EditForm
//                 selectedProperty={selectedProperty}
//                 handleEditSave={handleEditSave}
//                 setSelectedProperty={setSelectedProperty}
//                 modalClose={modalClose}
//               />
//             ) : (
//               <ViewDetails
//                 selectedProperty={selectedProperty}
//                 modalClose={modalClose}
//               />
//             )}
//           </div>
//         </div>
//       </dialog>
//     </div>
//   );
// };

// export default PropertyList;

import React, { useState, useEffect } from "react";
import {
  getPropertiesFromLocalStorage,
  deletePropertyFromLocalStorage,
  editPropertyInLocalStorage,
} from "../../utils/localStorage";
import Swal from "sweetalert2";
import { usePropertyContext } from "../../Auth/StateContext";
import { useDarkMode } from "../../Auth/DarkModeContext";
import ViewDetails from "./ViewDetails";
import EditForm from "./EditForm";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import PropertyFilters from "./PropertyFilters";
import { getStatusClass } from "../../utils/helper_functions";

const PropertyList = () => {
  const { darkMode } = useDarkMode();
  const { properties, setProperties } = usePropertyContext();
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  // Load properties from localStorage on mount
  useEffect(() => {
    const storedProperties = getPropertiesFromLocalStorage();
    setProperties(storedProperties);
    setFilteredProperties(storedProperties);
  }, [setProperties, properties.length]);

  // Handle Delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedProperties = deletePropertyFromLocalStorage(id);
        setProperties(updatedProperties);
        setFilteredProperties(updatedProperties);
        Swal.fire("Deleted!", "The property has been deleted.", "success");
      }
    });
  };

  // Handle Status Change to Rented
  const handleStatusChange = (id, property) => {
    const updatedProperties = properties.map((property) =>
      property.id === id ? { ...property, status: "Rented" } : property
    );
    setProperties(updatedProperties);
    setFilteredProperties(updatedProperties);
    editPropertyInLocalStorage({ ...property, status: "Rented" });
    Swal.fire(
      "Updated!",
      "The property status has been updated to Rented.",
      "success"
    );
  };

  const modalClose = () => {
    document.getElementById("property_modal").close();
    setSelectedProperty(null);
  };

  // Handle Edit Save
  const handleEditSave = (updatedProperty) => {
    const updatedProperties = editPropertyInLocalStorage(updatedProperty);
    setProperties(updatedProperties);
    setFilteredProperties(updatedProperties);
    Swal.fire("Updated!", "The property has been updated.", "success");
    setSelectedProperty(null);
    document.getElementById("property_modal").close();
  };

  // Open Modal
  const openModal = (property, editMode = false) => {
    setSelectedProperty(property);
    setIsEdit(editMode);
    document.getElementById("property_modal").showModal();
  };

  return (
    <div
      className={`container mx-auto p-6 rounded-lg shadow-lg ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h2 className={`text-4xl font-bold mb-6 text-center ${darkMode == true ?  "text-white" : "text-purple-500"}`}>
        Property List
      </h2>

      <PropertyFilters
        properties={properties}
        setProperties={setFilteredProperties}
      />

      {/* Table */}
      <div className="overflow-x-auto overflow-y-auto h-[400px]">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
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
            {filteredProperties.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No properties found.
                </td>
              </tr>
            ) : (
              filteredProperties.map((property) => (
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
                  <td
                    className={`border border-gray-300 px-4 py-2 text-center text-white `}
                  >
                    <span
                      className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getStatusClass(
                        property.status
                      )}`}
                    >
                      {property.status}
                    </span>
                  </td>
                  <td className="border flex gap-2 justify-center items-center border-gray-300 px-4 py-2">
                    <button
                      className="btn btn-circle"
                      onClick={() => openModal(property, false)}
                    >
                      <FaEye className="text-xl text-[#aa25a1]" />
                    </button>
                    <button
                      className="btn btn-circle text-[#1b3082]"
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
                      className="btn btn-circle text-lg"
                      onClick={() => handleDelete(property.id)}
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <dialog
        id="property_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div
          className={`modal-box rounded-lg shadow-lg ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
        >
          <div className="py-4">
            {isEdit ? (
              <EditForm
                selectedProperty={selectedProperty}
                handleEditSave={handleEditSave}
                setSelectedProperty={setSelectedProperty}
                modalClose={modalClose}
              />
            ) : (
              <ViewDetails
                selectedProperty={selectedProperty}
                modalClose={modalClose}
              />
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default PropertyList;
