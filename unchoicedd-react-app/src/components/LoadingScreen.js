// src/components/LoadingScreen.js
import React from "react";

function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
      {/* SVG Spinner */}
      <svg
        className="animate-spin h-16 w-16 text-red-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>

      <h1 className="text-2xl font-semibold text-gray-700 mt-6">Loading...</h1>
      <p className="text-gray-500 mt-2">Preparing your choices</p>
    </div>
  );
}

export default LoadingScreen;
