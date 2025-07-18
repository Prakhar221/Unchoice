// src/components/CategoryCard.js
import React from "react";

function CategoryCard({ dish, onSelect }) {
  return (
    <button
      onClick={() => onSelect(dish.id)}
      className="w-full bg-white border border-gray-200 rounded-lg p-5 text-left text-lg font-medium cursor-pointer transition-all hover:translate-y-[-3px] hover:shadow-lg flex items-center justify-between group"
    >
      {dish.category}
      <span className="text-gray-400 text-2xl transition-transform group-hover:translate-x-1">
        →
      </span>
    </button>
  );
}

export default CategoryCard;
