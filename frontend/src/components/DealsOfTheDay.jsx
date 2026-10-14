import React, { useState, useEffect } from 'react';
import { Clock, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DealsOfTheDay = ({ deals = [] }) => {
  const { navigateTo } = useApp();
  const [timeLeft, setTimeLeft] = useState({ hours: 7, minutes: 42, seconds: 19 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!deals.length) return null;

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="bg-white my-2 py-3 shadow-xs border-y border-gray-100">
      {/* Header bar */}
      <div className="flex items-center justify-between px-3 mb-2.5">
        <div>
          <div className="flex items-center space-x-1.5">
            <h3 className="text-base font-black text-gray-900 tracking-tight">Deals of the Day</h3>
            <span className="bg-red-100 text-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded">
              HOT
            </span>
          </div>
          <div className="flex items-center text-xs text-gray-500 space-x-1 mt-0.5">
            <Clock className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span className="font-mono text-gray-700 font-semibold text-[11px]">
              {pad(timeLeft.hours)}h : {pad(timeLeft.minutes)}m : {pad(timeLeft.seconds)}s left
            </span>
          </div>
        </div>

        <button 
          onClick={() => navigateTo('categories')}
          className="flex items-center text-xs font-bold text-[#2874f0] bg-blue-50 px-2.5 py-1.5 rounded"
        >
          <span>View All</span>
          <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
        </button>
      </div>

      {/* Horizontal scrolling deals */}
      <div className="flex space-x-3 overflow-x-auto no-scrollbar px-3 scroll-smooth">
        {deals.map((item) => (
          <div
            key={item.id}
            onClick={() => navigateTo('product_detail', { productId: item.id })}
            className="flex-shrink-0 w-36 border border-gray-200 rounded-lg p-2 flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer bg-white"
          >
            <div className="relative w-full h-28 mb-2 flex items-center justify-center bg-gray-50 rounded overflow-hidden">
              <img
                src={item.images ? item.images[0] : item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
              />
              <span className="absolute top-1 left-1 bg-green-600 text-white text-[9px] font-bold px-1 py-0.5 rounded">
                {item.discountPercent}% OFF
              </span>
            </div>

            <div>
              <p className="text-[11px] font-semibold text-gray-800 line-clamp-1">
                {item.title}
              </p>
              <p className="text-[10px] text-gray-500 mb-1">{item.petType} • {item.brand}</p>
              
              <div className="flex items-baseline space-x-1">
                <span className="text-xs font-bold text-gray-900">₹{item.price}</span>
                <span className="text-[10px] text-gray-400 line-through">₹{item.originalPrice}</span>
              </div>
              <p className="text-[10px] text-green-700 font-medium">Free Delivery</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
