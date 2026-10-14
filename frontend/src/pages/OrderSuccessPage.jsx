import React from 'react';
import { CheckCircle2, Package, MapPin, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const OrderSuccessPage = () => {
  const { lastPlacedOrder, navigateTo } = useApp();

  const order = lastPlacedOrder || {
    orderId: 'PZ' + Math.floor(10000000 + Math.random() * 90000000),
    expectedDelivery: 'Tomorrow, by 11:00 AM',
    totalAmount: 2570,
    paymentMethod: 'Cash on Delivery (COD)',
    superCoinsEarned: 51,
    items: [],
    trackingSteps: [
      { step: 'Order Placed', time: 'Just now', completed: true, current: true },
      { step: 'Packed & Dispatched', time: 'Expected tomorrow', completed: false, current: false },
      { step: 'Shipped via Petszoo Express', time: 'In transit', completed: false, current: false },
      { step: 'Out for Delivery', time: 'Expected 2 days', completed: false, current: false },
      { step: 'Delivered', time: 'Arriving soon', completed: false, current: false }
    ]
  };

  return (
    <div className="pb-20 bg-[#f1f2f4] min-h-screen">
      {/* Top Success Banner */}
      <div className="bg-[#388e3c] text-white px-4 py-8 text-center shadow-md">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-xl font-black">Order Placed Successfully!</h1>
        <p className="text-xs text-green-100 mt-1">
          Thank you for shopping at Petszoo. Your pets are going to love this! 🐾
        </p>
      </div>

      {/* Order Info Strip */}
      <div className="bg-white p-4 mx-3 -mt-4 rounded-lg shadow-md border border-gray-100 relative z-10">
        <div className="flex justify-between items-center pb-3 border-b border-gray-100 text-xs">
          <div>
            <span className="text-gray-500 block">Order ID</span>
            <span className="font-mono font-bold text-gray-900">{order.orderId}</span>
          </div>
          <div className="text-right">
            <span className="text-gray-500 block">Total Amount</span>
            <span className="font-black text-[#2874f0] text-sm">₹{order.totalAmount}</span>
          </div>
        </div>

        <div className="pt-3 flex items-center justify-between text-xs">
          <span className="text-gray-600">Payment Mode:</span>
          <span className="font-semibold text-gray-800">{order.paymentMethod}</span>
        </div>

        <div className="pt-2 flex items-center justify-between text-xs">
          <span className="text-gray-600">Expected Delivery:</span>
          <span className="font-bold text-[#388e3c]">{order.expectedDelivery}</span>
        </div>
      </div>

      {/* SuperCoins Earned Strip */}
      <div className="bg-gradient-to-r from-amber-50 to-yellow-100 border border-amber-300 p-3 mx-3 mt-3 rounded-lg flex items-center space-x-2.5">
        <div className="w-8 h-8 rounded-full bg-[#ffe500] text-gray-900 flex items-center justify-center font-bold text-base shadow-xs">
          🪙
        </div>
        <div>
          <span className="text-xs font-black text-gray-900">
            +{order.superCoinsEarned || 50} Petszoo SuperCoins Earned!
          </span>
          <p className="text-[10px] text-gray-600">Coins will be credited upon delivery</p>
        </div>
      </div>

      {/* Tracking Steps Stepper */}
      <div className="bg-white p-4 mx-3 mt-3 rounded-lg shadow-xs border border-gray-100">
        <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-4 flex items-center">
          <Package className="w-4 h-4 mr-1.5 text-[#2874f0]" />
          Petszoo Express Tracking
        </h3>

        <div className="space-y-4 relative pl-5 border-l-2 border-[#388e3c]">
          {order.trackingSteps && order.trackingSteps.map((step, idx) => (
            <div key={idx} className="relative">
              <div 
                className={`absolute -left-[27px] top-0.5 w-4 h-4 rounded-full border-2 border-white ${
                  step.completed ? 'bg-[#388e3c]' : 'bg-gray-300'
                }`} 
              />
              <p className={`text-xs font-bold ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                {step.step}
              </p>
              <p className="text-[10px] text-gray-500">{step.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-3 mt-6 space-y-2.5">
        <button
          onClick={() => navigateTo('orders')}
          className="w-full bg-[#2874f0] hover:bg-blue-600 text-white font-bold text-xs py-3 rounded-md shadow flex items-center justify-center space-x-1.5 transition-colors"
        >
          <span>VIEW ALL MY ORDERS</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => navigateTo('home')}
          className="w-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 font-bold text-xs py-3 rounded-md flex items-center justify-center space-x-1.5 transition-colors"
        >
          <ShoppingBag className="w-4 h-4 text-gray-600" />
          <span>CONTINUE SHOPPING</span>
        </button>
      </div>
    </div>
  );
};
