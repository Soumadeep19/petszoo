import React from 'react';
import { Bell, Tag, Sparkles, Truck, Gift } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NotificationsPage = () => {
  const { navigateTo } = useApp();

  const notifications = [
    {
      id: 1,
      title: '🦜 Flash Sale on Bird Seeds & Cuttlebones!',
      desc: 'Stock up for your budgies, cockatiels, and parrots. Extra 15% discount using code BIRD15.',
      time: '15 mins ago',
      type: 'deal',
      actionTab: 'categories',
      actionData: { category: 'Bird' }
    },
    {
      id: 2,
      title: '🐶 Pedigree Meat & Rice Price Dropped!',
      desc: 'Pedigree 10kg pack is now at ₹2,150 (Lowest price of the month with Free Delivery).',
      time: '2 hours ago',
      type: 'price_drop',
      actionTab: 'product_detail',
      actionData: { productId: 'dog-1' }
    },
    {
      id: 3,
      title: '🪙 50 Bonus SuperCoins Credited',
      desc: 'Welcome bonus added to your Petszoo wallet. Use them to save ₹50 on any pet food order.',
      time: 'Yesterday',
      type: 'coins',
      actionTab: 'account'
    },
    {
      id: 4,
      title: '🐱 Whiskas Gravy Pouches Restocked',
      desc: 'Tuna & Ocean Fish multipacks are back in stock. Guaranteed fresh batch with long shelf life.',
      time: '2 days ago',
      type: 'stock',
      actionTab: 'product_detail',
      actionData: { productId: 'cat-1' }
    }
  ];

  return (
    <div className="pb-20 bg-[#f1f2f4] min-h-screen">
      <div className="bg-white p-3.5 border-b border-gray-200">
        <h1 className="text-sm font-bold text-gray-900">Notifications & Hot Deals</h1>
      </div>

      <div className="divide-y divide-gray-100 bg-white">
        {notifications.map((item) => (
          <div
            key={item.id}
            onClick={() => navigateTo(item.actionTab, item.actionData)}
            className="p-3.5 flex space-x-3 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-blue-50 text-[#2874f0] flex items-center justify-center flex-shrink-0">
              {item.type === 'deal' ? (
                <Tag className="w-5 h-5 text-red-500" />
              ) : item.type === 'coins' ? (
                <span className="text-lg">🪙</span>
              ) : (
                <Bell className="w-5 h-5 text-[#2874f0]" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-xs font-bold text-gray-900 leading-snug">{item.title}</h3>
              <p className="text-[11px] text-gray-600 mt-0.5 leading-relaxed">{item.desc}</p>
              <span className="text-[10px] text-gray-400 mt-1 block">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
