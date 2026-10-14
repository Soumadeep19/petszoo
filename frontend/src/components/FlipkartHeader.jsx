import React, { useState } from 'react';
import { Search, Mic, Camera, ShoppingCart, Heart, Bell, ArrowLeft, Download, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FlipkartHeader = ({ showBack = false, title = null }) => {
  const { cartCount, wishlist, navigateTo, goBack, searchQuery, setSearchQuery } = useApp();
  const [showApkBanner, setShowApkBanner] = useState(true);

  return (
    <header className="sticky top-0 z-40 bg-[#2874f0] text-white shadow-md safe-top">
      {/* Download Android APK notification strip */}
      {showApkBanner && (
        <div className="bg-[#1c2230] text-white px-3 py-1.5 flex items-center justify-between text-[11px] border-b border-gray-800">
          <div className="flex items-center space-x-1.5 truncate">
            <span className="text-sm">🐾</span>
            <span className="font-medium text-gray-200 truncate">
              Install <strong className="text-[#ffe500]">Petszoo</strong> on Android
            </span>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <a
              href="./Petszoo.apk"
              download="Petszoo.apk"
              className="bg-[#ffe500] hover:bg-yellow-400 text-gray-900 font-black text-[10px] px-2.5 py-0.5 rounded flex items-center space-x-1 transition-colors shadow-xs"
            >
              <Download className="w-3 h-3 text-gray-900" />
              <span>APK (3.8 MB)</span>
            </a>
            <button
              onClick={() => setShowApkBanner(false)}
              className="text-gray-400 hover:text-white p-0.5"
              aria-label="Close"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Top row with Logo and Actions */}
      <div className="flex items-center justify-between px-3.5 pt-2 pb-1.5">
        <div className="flex items-center space-x-2">
          {showBack ? (
            <button
              onClick={goBack}
              className="p-1 -ml-1 text-white hover:bg-white/10 rounded-full transition-colors"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : null}

          {title ? (
            <h1 className="text-lg font-bold tracking-tight text-white">{title}</h1>
          ) : (
            <div 
              onClick={() => navigateTo('home')}
              className="cursor-pointer flex flex-col leading-none"
            >
              <div className="flex items-center space-x-1">
                <span className="text-xl font-black italic tracking-wide text-white font-sans">
                  Pets<span className="text-[#ffe500]">zoo</span>
                </span>
                <span className="text-xs">🐾</span>
              </div>
              <div className="flex items-center space-x-0.5 text-[10px] text-gray-200 italic font-medium">
                <span>Explore</span>
                <span className="text-[#ffe500] font-bold">Plus</span>
                <span className="text-[#ffe500] text-[8px]">✦</span>
              </div>
            </div>
          )}
        </div>

        {/* Right action icons */}
        <div className="flex items-center space-x-3 text-white">
          <button 
            onClick={() => navigateTo('notifications')}
            className="relative p-1 hover:bg-white/10 rounded-full transition-colors"
            title="Notifications & Deals"
          >
            <Bell className="w-5 h-5 text-white" />
            <span className="absolute 0 top-0.5 right-0.5 w-2 h-2 bg-yellow-400 rounded-full ring-2 ring-[#2874f0]"></span>
          </button>

          <button 
            onClick={() => navigateTo('categories')}
            className="relative p-1 hover:bg-white/10 rounded-full transition-colors"
            title="Wishlist"
          >
            <Heart className="w-5 h-5 text-white" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#fb641b] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-white">
                {wishlist.length}
              </span>
            )}
          </button>

          <button 
            onClick={() => navigateTo('cart')}
            className="relative p-1 hover:bg-white/10 rounded-full transition-colors"
            title="Cart"
          >
            <ShoppingCart className="w-5 h-5 text-white" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1.5 bg-[#ffe500] text-gray-900 text-[11px] font-black rounded-full px-1.5 py-0.2 min-w-[18px] text-center border border-blue-900 shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Flipkart Styled Search Bar */}
      {!title && (
        <div className="px-3 pb-2 pt-1">
          <div 
            onClick={() => navigateTo('search')}
            className="flex items-center bg-white rounded-md px-3 py-2 shadow-inner text-gray-400 cursor-pointer text-sm"
          >
            <Search className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" />
            <span className="flex-1 text-gray-500 text-xs truncate">
              {searchQuery ? searchQuery : "Search for Dog food, Bird seeds, Cat treats, Leashes..."}
            </span>
            <div className="flex items-center space-x-2 text-gray-400 border-l border-gray-200 pl-2">
              <Mic className="w-4 h-4 hover:text-blue-600 cursor-pointer" />
              <Camera className="w-4 h-4 hover:text-blue-600 cursor-pointer" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
