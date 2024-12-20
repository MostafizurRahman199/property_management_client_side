export const saveToLocalStorage = (property) => {
    const storedProperties = JSON.parse(localStorage.getItem("properties")) || [];
    localStorage.setItem("properties", JSON.stringify([...storedProperties, property]));
   
  };