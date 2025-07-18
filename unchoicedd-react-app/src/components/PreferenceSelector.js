// src/components/PreferenceSelector.js
import React from "react";

function PreferenceSelector({ handlePreferenceSelect }) {
  return (
    <div
      className="text-center mb-10 flex-grow flex flex-col justify-center items-center bg-cover bg-center rounded-2xl p-12 shadow-2xl relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('https://img.freepik.com/free-photo/top-view-circular-food-frame_23-2148723455.jpg?semt=ais_hybrid&w=740')`,
      }}
    >
      <h2 className="text-white text-4xl font-bold mb-10 text-shadow-md">
        What are you craving today?
      </h2>
      <div className="flex gap-5 flex-wrap justify-center">
        <button
          onClick={() => handlePreferenceSelect("veg")}
          className="bg-red-500 text-white py-4 px-8 rounded-xl text-xl font-bold cursor-pointer hover:bg-red-600 active:bg-red-700 transition-all min-w-[180px] shadow-lg"
        >
          Vegetarian
        </button>
        <button
          onClick={() => handlePreferenceSelect("non-veg")}
          className="bg-red-500 text-white py-4 px-8 rounded-xl text-xl font-bold cursor-pointer hover:bg-red-600 active:bg-red-700 transition-all min-w-[180px] shadow-lg"
        >
          Non-Vegetarian
        </button>
      </div>
    </div>
  );
}

export default PreferenceSelector;