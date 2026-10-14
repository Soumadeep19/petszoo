import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CategoriesPage = () => {
  const { navigateTo, selectedCategory } = useApp();
  const [activeTab, setActiveTab] = useState(
    selectedCategory && selectedCategory !== 'all' ? selectedCategory : 'Dog'
  );

  const categoryTree = {
    Dog: {
      name: 'Dogs',
      icon: '🐶',
      banner: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&auto=format&fit=crop&q=80',
      tagline: 'Premium canine nutrition & treats',
      subcategories: [
        { name: 'Dry Dog Food', query: 'dry dog food', icon: '🥣' },
        { name: 'Puppy Food & Milk', query: 'puppy', icon: '🍼' },
        { name: 'Dog Treats & Bones', query: 'treats', icon: '🦴' },
        { name: 'Tick & Flea Care', query: 'tick', icon: '🧴' },
        { name: 'Leashes & Collars', query: 'leash', icon: '🦮' },
        { name: 'Dog Toys & Ropes', query: 'chew toy', icon: '🎾' }
      ]
    },
    Cat: {
      name: 'Cats',
      icon: '🐱',
      banner: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop&q=80',
      tagline: 'Feline feasts, wet gravy & scratchers',
      subcategories: [
        { name: 'Wet Cat Food Pouches', query: 'wet cat food', icon: '🐟' },
        { name: 'Dry Cat Kibble', query: 'dry cat food', icon: '🥣' },
        { name: 'Creamy Lickable Treats', query: 'creamy cat treats', icon: '🍢' },
        { name: 'Cat Litter & Sand', query: 'litter', icon: '📦' },
        { name: 'Scratching Posts & Trees', query: 'scratching post', icon: '🌳' },
        { name: 'Cat Nip & Teaser Toys', query: 'cat toy', icon: '🪶' }
      ]
    },
    Bird: {
      name: 'Birds',
      icon: '🦜',
      banner: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&auto=format&fit=crop&q=80',
      tagline: 'Aviary seeds, fruit pellets, cages & cuttlebone',
      subcategories: [
        { name: 'Budgie & Parrot Seeds', query: 'budgies', icon: '🌾' },
        { name: 'Fruit Pellets (ZuPreem)', query: 'zupreem', icon: '🫐' },
        { name: 'Cuttlefish Bone & Calcium', query: 'cuttlefish', icon: '🐚' },
        { name: 'Bird Cages & Aviaries', query: 'bird cage', icon: '🏠' },
        { name: 'Bird Swings & Perches', query: 'perch', icon: '🪜' },
        { name: 'Automatic Seed Drinker', query: 'feeder', icon: '💧' }
      ]
    },
    Fish: {
      name: 'Fish & Aqua',
      icon: '🐠',
      banner: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=600&auto=format&fit=crop&q=80',
      tagline: 'Aquarium pellets, internal filters & LED lights',
      subcategories: [
        { name: 'Floating Fish Pellets', query: 'fish food', icon: '🦐' },
        { name: 'Spirulina Color Enhancers', query: 'spirulina', icon: '🌿' },
        { name: 'Submersible Filter Pumps', query: 'filter', icon: '⚙️' },
        { name: 'Fish Tank Ornaments', query: 'aquarium', icon: '🏰' },
        { name: 'Aquarium LED Lights', query: 'light', icon: '💡' },
        { name: 'Water Conditioners', query: 'conditioner', icon: '🧪' }
      ]
    },
    'Small Pet': {
      name: 'Small Pets',
      icon: '🐰',
      banner: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&auto=format&fit=crop&q=80',
      tagline: 'Guinea pigs, rabbits & hamsters care',
      subcategories: [
        { name: 'Crispy Muesli Mix', query: 'crispy muesli', icon: '🌾' },
        { name: 'Timothy Hay & Alfalfa', query: 'hay', icon: '🌱' },
        { name: 'Hamster Running Wheels', query: 'wheel', icon: '🎡' },
        { name: 'Small Pet Hutches', query: 'hutch', icon: '🏡' },
        { name: 'Chew Sticks & Mineral Blocks', query: 'mineral', icon: '🪵' }
      ]
    }
  };

  const currentCategory = categoryTree[activeTab] || categoryTree['Dog'];

  return (
    <div className="pb-20 bg-white min-h-screen flex flex-col">
      {/* Search Header Redirect */}
      <div className="bg-[#2874f0] text-white p-3 text-xs flex items-center justify-between">
        <span className="font-bold">Browse All Pet Categories</span>
        <span className="text-[11px] text-yellow-300">Over 500+ Pet Essentials</span>
      </div>

      <div className="flex flex-1">
        {/* Left Vertical Category Nav (Flipkart style) */}
        <div className="w-24 bg-gray-100 border-r border-gray-200 flex flex-col py-2 flex-shrink-0">
          {Object.entries(categoryTree).map(([key, item]) => {
            const isSelected = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`py-3 px-1 text-center relative flex flex-col items-center transition-colors ${
                  isSelected ? 'bg-white font-bold text-[#2874f0]' : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                {isSelected && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#2874f0]" />
                )}
                <span className="text-2xl mb-1">{item.icon}</span>
                <span className="text-[11px] leading-tight">{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* Right Subcategory Content */}
        <div className="flex-1 p-3 overflow-y-auto">
          {/* Category Banner */}
          <div className="relative rounded-lg overflow-hidden h-28 mb-4 shadow-xs">
            <img
              src={currentCategory.banner}
              alt={currentCategory.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-2.5 text-white">
              <span className="text-sm font-bold flex items-center">
                {currentCategory.icon} {currentCategory.name} Store
              </span>
              <p className="text-[10px] text-gray-200">{currentCategory.tagline}</p>
            </div>
          </div>

          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5">
            Popular Subcategories
          </h3>

          <div className="grid grid-cols-2 gap-2.5">
            {currentCategory.subcategories.map((sub, idx) => (
              <div
                key={idx}
                onClick={() => navigateTo('search', { query: sub.query })}
                className="border border-gray-200 rounded-lg p-2.5 flex flex-col items-center text-center hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer shadow-xs"
              >
                <span className="text-2xl mb-1">{sub.icon}</span>
                <span className="text-xs font-semibold text-gray-800 line-clamp-2">
                  {sub.name}
                </span>
                <span className="text-[10px] text-[#2874f0] font-bold mt-1 flex items-center">
                  Shop <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            ))}
          </div>

          {/* Quick Filter Button */}
          <button
            onClick={() => navigateTo('home', { category: activeTab })}
            className="w-full mt-4 bg-blue-50 text-[#2874f0] border border-blue-200 font-bold text-xs py-2 rounded-md hover:bg-blue-100 transition-colors"
          >
            View All {currentCategory.name} Products →
          </button>
        </div>
      </div>
    </div>
  );
};
