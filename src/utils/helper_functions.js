
    export const getStatusClass = (status) => {
      switch (status) {
        case "Available":
          return "bg-green-100 text-green-700";
          case "Under Maintenance":
          return "bg-red-100 text-red-700";
          case "Pending":
            return "bg-orange-100 text-orange-700";
          case "Rented":
          return "bg-blue-100 text-blue-700";
        default:
          return "bg-gray-100 text-gray-700";
      }
    };
  