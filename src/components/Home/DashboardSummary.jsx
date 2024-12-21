import React from "react";
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

const DashboardSummary = ({ properties }) => {


  const totalProperties = properties.length;
  const checkIns = properties.filter((p) => p.status === "Available").length;
  const house = properties.filter((p) => p.type === "House").length;
  const commercial = properties.filter((p) => p.type === "Commercial").length;
  const apartment = properties.filter((p) => p.type === "Apartment").length;
  const checkOuts = properties.filter((p) => p.status === "Rented").length;
  const pendingApprovals = properties.filter((p) => p.status === "Pending").length;
  const maintenanceRequired = properties.filter((p) => p.status === "Under Maintenance").length;

  const totalRevenue = properties
    .filter((p) => p.status === "Rented")
    .reduce((sum, property) => sum + (parseFloat(property.price )|| 0), 0);

  const totalPrice = properties.reduce((sum, property) => sum + (parseFloat(property.price )|| 0), 0);

  return (
    <div className=" p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FaBuilding className="text-3xl" /> Dashboard Summary
      </h2>
     
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Total Properties */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition-all duration-300 text-white  p-4 rounded-lg shadow-md flex items-center gap-4">
          <FaBuilding className="text-4xl  text-white" />
          <div>
            <p className="text-lg font-semibold">Total Properties</p>
            <p className="text-2xl font-bold">{totalProperties}</p>
          </div>
        </div>

        {/* Check-Ins */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition-all duration-300 text-white  p-4 rounded-lg shadow-md flex items-center gap-4">
          <FaSignInAlt className="text-4xl  text-white" />
          <div>
            <p className="text-lg font-semibold">Check-Ins (Available)</p>
            <p className="text-2xl font-bold">{checkIns}</p>
          </div>
        </div>

        {/* Check-Outs */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition-all duration-300 text-white  p-4 rounded-lg shadow-md flex items-center gap-4">
          <FaSignOutAlt className="text-4xl text-white" />
          <div>
            <p className="text-lg font-semibold">Check-Outs (Rented)</p>
            <p className="text-2xl font-bold">{checkOuts}</p>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition-all duration-300 text-white  p-4 rounded-lg shadow-md flex items-center gap-4">
          <FaClock className="text-4xl text-white" />
          <div>
            <p className="text-lg font-semibold">Pending Approvals</p>
            <p className="text-2xl font-bold">{pendingApprovals}</p>
          </div>
        </div>

        {/* Maintenance Required */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition-all duration-300 text-white  p-4 rounded-lg shadow-md flex items-center gap-4">
          <FaTools className="text-4xl text-white" />
          <div>
            <p className="text-lg font-semibold">Maintenance Required</p>
            <p className="text-2xl font-bold">{maintenanceRequired}</p>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition-all duration-300 text-white  p-4 rounded-lg shadow-md flex items-center gap-4">
          <FaDollarSign className="text-4xl text-white" />
          <div>
            <p className="text-lg font-semibold">Total Revenue</p>
            <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
          </div>
        </div>

        {/* total price */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition-all duration-300 text-white  p-4 rounded-lg shadow-md flex items-center gap-4">
        <MdOutlinePriceCheck className="text-5xl text-white" />
          <div>
            <p className="text-lg font-semibold">Total Price</p>
            <p className="text-2xl font-bold">${totalPrice.toFixed(2)}</p>
          </div>
        </div>


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
            <MdOutlineHouse className="text-2xl"  />
            <p className="text-lg font-semibold">House : </p>
            </div>
            <p className="text-lg font-bold">{house}</p>
          </div>


          <div className="flex gap-1">
            <div className="flex items-center gap-1">
            <BiBuildingHouse className="text-2xl"  />
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
