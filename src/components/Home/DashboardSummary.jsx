import React, { useEffect, useState } from "react";
import {
  FaBuilding,
  FaSignInAlt,
  FaSignOutAlt,
  FaClock,
  FaTools,
  FaDollarSign,
} from "react-icons/fa";
import { MdOutlinePriceCheck } from "react-icons/md";
import { PiBuildingApartment } from "react-icons/pi";
import { MdOutlineHouse } from "react-icons/md";
import { BiBuildingHouse } from "react-icons/bi";
import jsPDF from "jspdf";
import "jspdf-autotable"; // For table support in jsPDF
import Papa from "papaparse";
import { usePropertyContext } from "../../Auth/StateContext";
import AddPropertyForm from "./AddPropertyForm";
import { useDarkMode } from "../../Auth/DarkModeContext";
import SummaryCard from "./SummaryCard";
import { exportToCSV, exportToPDF } from "../../utils/helper_functions";
import { IoIosAddCircleOutline } from "react-icons/io";



const DashboardSummary = () => {

  const { properties, setProperties } = usePropertyContext();
  const { darkMode, setDarkMode } = useDarkMode();
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    resetFilters();
  }, [properties]); // Run when properties change

  // Function to reset filters
  const resetFilters = () => {
    setSelectedMonth(""); // Reset to "All Months"
    setSelectedYear(""); // Reset to "All Years"
  };

  // Months Array
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Extract available years from property data
  const years = [
    ...new Set(properties.map((p) => new Date(p.date).getFullYear())),
  ].sort((a, b) => b - a);
  

  // Filter properties by month and year
  const filteredProperties = properties.filter((property) => {
    const propertyDate = new Date(property.date);

    const matchesMonth = selectedMonth
      ? propertyDate.getMonth() === parseInt(selectedMonth)
      : true;

    const matchesYear = selectedYear
      ? propertyDate.getFullYear() === parseInt(selectedYear)
      : true;
    return matchesMonth && matchesYear;
  });

  const totalProperties = filteredProperties.length;
  const checkIns = filteredProperties.filter(
    (p) => p.status === "Available"
  ).length;
  const house = filteredProperties.filter((p) => p.type === "House").length;
  const commercial = filteredProperties.filter(
    (p) => p.type === "Commercial"
  ).length;
  const apartment = filteredProperties.filter(
    (p) => p.type === "Apartment"
  ).length;
  const checkOuts = filteredProperties.filter(
    (p) => p.status === "Rented"
  ).length;
  const pendingApprovals = filteredProperties.filter(
    (p) => p.status === "Pending"
  ).length;
  const maintenanceRequired = filteredProperties.filter(
    (p) => p.status === "Under Maintenance"
  ).length;

  const totalRevenue = filteredProperties
    .filter((p) => p.status === "Rented")
    .reduce((sum, property) => sum + (parseFloat(property.price) || 0), 0);

  const totalPrice = filteredProperties.reduce(
    (sum, property) => sum + (parseFloat(property.price) || 0),
    0
  );



  const openModal = () =>
    document.getElementById("add_property_modal").showModal();
  const closeModal = () =>
    document.getElementById("add_property_modal").close();

  // summary Data
  const summaryData = [
    {
      icon: FaBuilding,
      title: "Total Properties",
      value: totalProperties,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: FaSignInAlt,
      title: "Check-Ins (Available)",
      value: checkIns,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: FaSignOutAlt,
      title: "Check-Outs (Rented)",
      value: checkOuts,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: FaClock,
      title: "Pending Approvals",
      value: pendingApprovals,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: FaTools,
      title: "Maintenance Required",
      value: maintenanceRequired,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: FaDollarSign,
      title: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: MdOutlinePriceCheck,
      title: "Total Price",
      value: `$${totalPrice.toFixed(2)}`,
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="md:p-6 rounded-lg shadow-lg">
      <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${darkMode == true ?  "text-white" : "text-purple-500"}`}>
        <FaBuilding className="text-3xl" /> Dashboard Summary
      </h2>

      {/* Month and Year Filter */}
      <div className="flex flex-col md:flex md:flex-row md:justify-between gap-4 mb-6">

       <div>
         {/* Add Property Button */}
         <button className="btn bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition-all duration-300 text-white " onClick={openModal}>
        <IoIosAddCircleOutline className="text-white text-2xl" />

          Add Property
        </button>

        {/* Modal for Add Property Form */}
        <div className="relative">
          <dialog
            id="add_property_modal"
            className={`modal modal-bottom sm:modal-middle`}
          >
            <div
              className={`modal-box ${
                darkMode == true ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              <div className="modal-action absolute  right-2 -top-4">
                <button className="btn btn-circle" onClick={closeModal}>
                  ❌
                </button>
              </div>
              <h3 className="font-bold text-lg">Add New Property</h3>
              <AddPropertyForm closeModal={closeModal} />
            </div>
          </dialog>
        </div>
       </div>

       <div className="grid grid-cols-2 md:grid md:grid-cols-4 gap-2">
           {/* Month Selector */}
           <select
          onChange={(e) => setSelectedMonth(e.target.value)}
          value={selectedMonth}
          className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-[#df1f6c] hover:text-white transition focus:outline-none"
        >
          <option value="">All Months</option>
          {months.map((month, index) => (
            <option key={month} value={index}>
              {month}
            </option>
          ))}
        </select>

        {/* Year Selector */}
        <select
          onChange={(e) => setSelectedYear(e.target.value)}
          value={selectedYear}
          className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-[#df1f6c] hover:text-white transition focus:outline-none"
        >
          <option value="">All Years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        {/* button to generate PDF */}
        <button
          onClick={()=>exportToPDF(filteredProperties)}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-green-800 hover:scale-105 transition-all duration-300 text-white "
        >
          Export to PDF
        </button>

        {/* button to generate CSV file */}
        <button
          onClick={()=>exportToCSV(filteredProperties)}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-800 hover:scale-105 transition-all duration-300 text-white "
        >
          Export to CSV
        </button>
     </div>


      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {summaryData.map((data, index) => (
          <SummaryCard
            key={index}
            icon={data.icon}
            title={data.title}
            value={data.value}
            gradient={data.gradient}
          />
        ))}

        <div className="bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition-all duration-300 text-white  p-4 rounded-lg shadow-md flex items-center  gap-4">
          <div className="flex flex-wrap gap-2 md:gap-2">
            <div className="flex gap-1">
              <div className="flex items-center gap-1">
                <PiBuildingApartment className="text-2xl" />
                <p className="text-lg font-semibold">Apartment : </p>
              </div>
              <p className="text-lg font-bold">{apartment}</p>
            </div>

            <div className="flex gap-1">
              <div className="flex items-center gap-1">
                <MdOutlineHouse className="text-2xl" />
                <p className="text-lg font-semibold">House : </p>
              </div>
              <p className="text-lg font-bold">{house}</p>
            </div>

            <div className="flex gap-1">
              <div className="flex items-center gap-1">
                <BiBuildingHouse className="text-2xl" />
                <p className="text-lg font-semibold">Commercial : </p>
              </div>
              <p className="text-lg font-bold">{commercial}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;
