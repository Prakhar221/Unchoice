// src/components/DishDetailPage.js
import React from "react";

function DishDetailPage({ selectedDish, handleBackToHome }) {
  if (!selectedDish) {
    return (
      <div className="min-h-screen flex flex-col max-w-xl mx-auto p-6 bg-gray-100 justify-center items-center">
        <p className="text-red-500 text-lg">Dish not found.</p>
        <button
          onClick={handleBackToHome}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col max-w-xl mx-auto p-6 bg-gray-100">
      <nav className="mb-8 pb-4 border-b border-gray-200">
        <button
          onClick={handleBackToHome}
          className="bg-transparent border-none text-gray-800 text-lg cursor-pointer py-2 px-4 rounded-md hover:bg-gray-100 transition-colors"
        >
          ← Back
        </button>
      </nav>
      <main className="flex justify-center items-center flex-grow pb-5">
        <div className="w-full bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-scale">
          <div className="p-8 text-center">
            <h1 className="text-5xl font-bold text-red-500 mb-4 leading-tight">
              {selectedDish.placeName}
            </h1>
            <p className="text-gray-800 text-xl italic mb-8 leading-relaxed">
              {selectedDish.why}
            </p>
            <div className="text-gray-500 text-base leading-relaxed border-t border-dashed border-gray-300 pt-5 mt-8">
              <p>{`Address: ${selectedDish.address}`}</p>
              <p>{`Source: ${selectedDish.source}`}</p>
            </div>
          </div>
          <a
            href={selectedDish.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-red-500 text-white font-bold py-5 text-xl text-center uppercase tracking-wider cursor-pointer hover:bg-red-600 active:bg-red-700 transition-all rounded-b-2xl"
          >
            GET DIRECTIONS
          </a>
        </div>
      </main>
    </div>
  );
}

export default DishDetailPage;
