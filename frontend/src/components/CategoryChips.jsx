import React from 'react';
import { useApp } from '../context/AppContext';

export const CategoryChips = ({ categories, activeCategory, onSelectCategory }) => {
  return (
    <div className="bg-white py-2.5 px-2 border-b border-gray-100 shadow-xs">
      <div className="flex space-x-3 overflow-x-auto no-scrollbar scroll-smooth px-1">
        {categories.map((cat) => {
          const isSelected = (activeCategory || 'all').toLowerCase() === (cat.petType || cat.id).toLowerCase();
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.petType || cat.id)}
              className="flex flex-col items-center flex-shrink-0 group focus:outline-none"
            >
              <div 
                className={`w-13 h-13 rounded-full flex items-center justify-center text-2xl transition-all duration-200 ${
                  isSelected 
                    ? 'bg-blue-50 border-2 border-[#2874f0] shadow-sm scale-105' 
                    : 'bg-gray-100 border border-gray-200 group-hover:bg-blue-50'
                }`}
                style={{ width: '52px', height: '52px' }}
              >
                <span>{cat.icon}</span>
              </div>
              <span 
                className={`text-[11px] mt-1 font-medium transition-colors ${
                  isSelected ? 'text-[#2874f0] font-bold' : 'text-gray-700'
                }`}
              >
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
