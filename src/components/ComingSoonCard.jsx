import React from "react";
import { useNavigate } from "react-router-dom";

const ComingSoonCard = ({ sectionName, bgColor = "bg-gray-100" }) => {
  const navigate = useNavigate();

  return (
    <div className={`w-full rounded-2xl shadow-md p-6 relative ${bgColor}`}>
      {/* Top-left Home Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 text-sm sm:text-base bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-100 transition"
      >
        ← Home
      </button>

      {/* Main Content */}
      <div className="text-center flex flex-col justify-between mt-8 sm:mt-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          {sectionName} Launching Soon...
        </h2>
        <p className="text-base sm:text-lg text-gray-600 mb-6">
          Stay tuned for something exciting! We’re working hard behind the scenes.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate("/contact")}
            className="w-full sm:w-auto bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition"
          >
            Contact Us
          </button>
          <button
            onClick={() => navigate("/vision")}
            className="w-full sm:w-auto border border-blue-600 text-blue-600 px-5 py-2 rounded-full hover:bg-blue-100 transition"
          >
            Know More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonCard;
