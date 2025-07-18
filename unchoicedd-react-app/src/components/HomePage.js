// src/components/HomePage.js
import React from "react";
import PreferenceSelector from "./PreferenceSelector";
import CategoryCard from "./CategoryCard";

function HomePage({
  user,
  handleLogout,
  currentFoodType,
  handlePreferenceSelect,
  foodData,
  showDishPage,
  handleBackToPreferences,
}) {
  const filteredDishes = foodData.filter(
    (dish) => dish.type === currentFoodType || dish.type === "both"
  );

  return (
    <div className="min-h-screen flex flex-col max-w-xl mx-auto p-6 bg-gray-100">
      <header className="flex justify-between items-center mb-5 pb-4 border-b border-gray-200 flex-wrap gap-2">
        {/* --- NAME CHANGED HERE --- */}
        <span className="font-bold text-xl text-red-500">EatHere</span>
        <div className="flex items-center gap-4 flex-wrap justify-end">
          <span className="text-gray-500 text-sm">
            You are in <strong className="text-gray-800">New Delhi</strong>
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-2 px-4 rounded-md text-sm hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>
      <div className="text-gray-500 text-sm mb-5 pb-4 border-b border-dashed border-gray-300">
        <p>User ID: {user ? user.uid : "Not signed in"}</p>
      </div>

      {currentFoodType === null ? (
        <PreferenceSelector handlePreferenceSelect={handlePreferenceSelect} />
      ) : (
        <>
          <main className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
            {filteredDishes.length > 0 ? (
              filteredDishes.map((dish) => (
                <CategoryCard
                  key={dish.id}
                  dish={dish}
                  onSelect={showDishPage}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No dishes found for this category.
              </p>
            )}
          </main>
          <button
            onClick={handleBackToPreferences}
            className="mt-6 bg-transparent border-none text-gray-800 text-lg cursor-pointer py-2 px-4 rounded-md hover:bg-gray-100 transition-colors self-start"
          >
            ← Back to Preferences
          </button>
        </>
      )}
    </div>
  );
}

export default HomePage;
