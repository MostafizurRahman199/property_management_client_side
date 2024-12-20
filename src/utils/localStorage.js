export const saveToLocalStorage = (property) => {
    const storedProperties = JSON.parse(localStorage.getItem("properties")) || [];
    localStorage.setItem("properties", JSON.stringify([...storedProperties, property]));
  };
  
  export const getPropertiesFromLocalStorage = () => {
    try {
      const storedProperties = JSON.parse(localStorage.getItem("properties"));
      return storedProperties || []; // Return an empty array if no properties exist
    } catch (error) {
      console.error("Error retrieving properties from localStorage:", error);
      return [];
    }
  };
  
  export const deletePropertyFromLocalStorage = (id) => {
    const storedProperties = JSON.parse(localStorage.getItem("properties")) || [];
    const updatedProperties = storedProperties.filter((property) => property.id !== id);
    localStorage.setItem("properties", JSON.stringify(updatedProperties));
    return updatedProperties; // Return the updated list
  };


  
  
  export const editPropertyInLocalStorage = (updatedProperty) => {
    deletePropertyFromLocalStorage(updatedProperty.id);
    saveToLocalStorage(updatedProperty);
    return getPropertiesFromLocalStorage();

  };
  
//   export const editPropertyInLocalStorage = (updatedProperty) => {
//     // Log the updated property for debugging
//     console.log("Updating property:", updatedProperty);
  
//     // Retrieve the existing properties from localStorage
//     const storedProperties = JSON.parse(localStorage.getItem("properties")) || [];
//     console.log("Stored properties before update:", storedProperties);
  
//     // Update the property if it exists
//     const updatedProperties = storedProperties.map((property) => {
//       if (property.id === updatedProperty.id) {
//         console.log(`Property with ID ${property.id} found. Updating...`);
//         return updatedProperty; // Replace with the updated property
//       }
//       return property; // Keep the existing property
//     });
  
//     // Check if the property was actually updated
//     const propertyExists = storedProperties.some(
//       (property) => property.id === updatedProperty.id
//     );
  
//     if (!propertyExists) {
//       console.warn(
//         `Property with ID ${updatedProperty.id} not found. No update performed.`
//       );
//       return storedProperties; // Return the original properties
//     }
  
//     // Save the updated properties back to localStorage
//     localStorage.setItem("properties", JSON.stringify(updatedProperties));
//     console.log("Updated properties saved to localStorage:", updatedProperties);
  
//     return updatedProperties;
//   };
  