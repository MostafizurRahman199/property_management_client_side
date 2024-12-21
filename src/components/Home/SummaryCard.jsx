import React from "react";

const SummaryCard = ({ icon: Icon, title, value, gradient }) => {
  return (
    <div
      className={`bg-gradient-to-r ${gradient} hover:scale-105 transition-all duration-300 text-white p-4 rounded-lg shadow-md flex items-center gap-4`}
    >
      <Icon className="text-4xl text-white" />
      <div>
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
