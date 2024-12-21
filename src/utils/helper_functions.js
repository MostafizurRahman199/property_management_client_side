import jsPDF from "jspdf";
import "jspdf-autotable"; // For table support in jsPDF
import Papa from "papaparse";

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

// Export to PDF
export const exportToPDF = (filteredProperties) => {
  const doc = new jsPDF();
  doc.text("Dashboard Summary", 20, 10);
  doc.autoTable({
    head: [["Name", "Type", "Status", "Date", "Price"]],
    body: filteredProperties.map((p) => [
      p.name,
      p.type,
      p.status,
      new Date(p.date).toLocaleDateString(),
      `$${p.price}`,
    ]),
  });
  doc.save("dashboard_summary.pdf");
};

// Export to CSV
export const exportToCSV = (filteredProperties) => {
  const csvData = filteredProperties.map((property) => ({
    Name: property.name,
    Type: property.type,
    Status: property.status,
    Date: new Date(property.date).toLocaleDateString(),
    Price: property.price,
  }));
  const csv = Papa.unparse(csvData);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "dashboard_summary.csv";
  link.click();
};
