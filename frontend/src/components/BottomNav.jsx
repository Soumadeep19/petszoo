import React from 'react';
import { Home, LayoutGrid, Bell, User, ShoppingCart } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BottomNav = () => {
  const { currentTab, navigateTo, cartCount } = useApp();

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'categories', label: 'Categories', icon: LayoutGrid },
    { id: 'notifications', label: 'Deals & Alerts', icon: Bell },
    { id: 'account', label: 'Account', icon: User },
    { id: 'cart', label: 'Cart', icon: ShoppingCart, badge: cartCount }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg safe-bottom">
      <div className="flex items-center justify-around h-13 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => navigateTo(tab.id)}
              className="flex-1 flex flex-col items-center justify-center py-1 relative focus:outline-none"
            >
              <div className="relative">
                <Icon 
                  className={`w-5 h-5 transition-transform duration-150 ${
                    isActive ? 'text-[#2874f0] scale-110' : 'text-gray-500'
                  }`} 
                />
                {tab.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-[#fb641b] text-white text-[10px] font-black rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span 
                className={`text-[10px] mt-0.5 font-medium transition-colors ${
                  isActive ? 'text-[#2874f0] font-bold' : 'text-gray-600'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
