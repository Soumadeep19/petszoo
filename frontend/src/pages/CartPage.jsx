import React from 'react';
import { Trash2, Plus, Minus, ShieldCheck, Tag, ShoppingBag, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartPage = () => {
  const {
    cart,
    updateCartQty,
    removeFromCart,
    cartTotalMRP,
    cartTotalPrice,
    cartDiscount,
    superCoinsDiscount,
    finalPayable,
    cartCount,
    superCoins,
    useSuperCoins,
    setUseSuperCoins,
    shippingAddress,
    navigateTo
  } = useApp();

  if (!cart.length) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center bg-gray-50 pb-20">
        <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-4">
          <ShoppingBag className="w-12 h-12 text-[#2874f0]" />
        </div>
        <h2 className="text-lg font-bold text-gray-800">Your Petszoo Cart is Empty!</h2>
        <p className="text-xs text-gray-500 mt-1 max-w-xs">
          Explore delicious treats, healthy pet foods, bird feeds, and toys for your furry and feathered friends.
        </p>
        <button
          onClick={() => navigateTo('home')}
          className="mt-5 bg-[#2874f0] text-white font-bold text-xs px-6 py-2.5 rounded shadow hover:bg-blue-600 transition-colors"
        >
          SHOP PET SUPPLIES NOW
        </button>
      </div>
    );
  }

  return (
    <div className="pb-24 bg-[#f1f2f4]">
      {/* Address Header Bar */}
      <div className="bg-white p-3 border-b border-gray-200 flex items-center justify-between text-xs">
        <div>
          <span className="text-gray-500">Deliver to: </span>
          <span className="font-bold text-gray-900">{shippingAddress.name}, {shippingAddress.pincode}</span>
          <p className="text-[11px] text-gray-500 truncate max-w-[260px]">
            {shippingAddress.house}, {shippingAddress.area}
          </p>
        </div>
        <button
          onClick={() => navigateTo('account')}
          className="text-[#2874f0] font-bold border border-blue-200 px-2 py-1 rounded bg-blue-50 text-[11px]"
        >
          Change
        </button>
      </div>

      {/* Cart Items List */}
      <div className="space-y-2 mt-2">
        {cart.map((item) => (
          <div key={`${item.id}-${item.selectedWeight}`} className="bg-white p-3 shadow-xs">
            <div className="flex space-x-3">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-cover rounded border border-gray-100 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold text-gray-400 uppercase">{item.brand}</span>
                <h3 className="text-xs font-semibold text-gray-800 line-clamp-2 leading-snug">
                  {item.title}
                </h3>
                <span className="text-[11px] text-gray-500 font-medium inline-block mt-0.5">
                  Pack Size: {item.selectedWeight}
                </span>

                <div className="flex items-baseline space-x-2 mt-1.5">
                  <span className="text-sm font-black text-gray-900">₹{item.price}</span>
                  <span className="text-xs text-gray-400 line-through">₹{item.originalPrice}</span>
                  <span className="text-xs font-bold text-[#388e3c]">
                    {item.discountPercent}% Off
                  </span>
                </div>
              </div>
            </div>

            {/* Quantity and Actions Bar */}
            <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateCartQty(item.id, item.selectedWeight, -1)}
                  className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                <button
                  onClick={() => updateCartQty(item.id, item.selectedWeight, 1)}
                  className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              <div className="flex items-center space-x-4 text-xs font-bold text-gray-600">
                <button
                  onClick={() => removeFromCart(item.id, item.selectedWeight)}
                  className="flex items-center text-red-600 hover:text-red-700 space-x-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SuperCoins Redemption Strip */}
      <div className="bg-white p-3.5 mt-2 shadow-xs border-y border-gray-100">
        <label className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center space-x-2">
            <span className="text-lg">🪙</span>
            <div>
              <p className="text-xs font-bold text-gray-800">Use Petszoo SuperCoins</p>
              <p className="text-[10px] text-gray-500">Available: {superCoins} Coins (Redeem 50 Coins for ₹50 Off)</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={useSuperCoins}
            onChange={(e) => setUseSuperCoins(e.target.checked)}
            className="w-4 h-4 accent-[#2874f0] rounded cursor-pointer"
          />
        </label>
      </div>

      {/* Price Details Breakdown */}
      <div className="bg-white p-3.5 mt-2 shadow-xs border-y border-gray-100">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5">
          Price Details ({cartCount} {cartCount === 1 ? 'Item' : 'Items'})
        </h3>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between text-gray-700">
            <span>Total MRP</span>
            <span>₹{cartTotalMRP}</span>
          </div>

          <div className="flex justify-between text-gray-700">
            <span>Discount on MRP</span>
            <span className="text-[#388e3c] font-semibold">- ₹{cartDiscount}</span>
          </div>

          {useSuperCoins && (
            <div className="flex justify-between text-gray-700">
              <span>SuperCoins Discount</span>
              <span className="text-[#388e3c] font-semibold">- ₹{superCoinsDiscount}</span>
            </div>
          )}

          <div className="flex justify-between text-gray-700">
            <span>Delivery Charges</span>
            <span className="text-[#388e3c] font-semibold">FREE</span>
          </div>

          <div className="flex justify-between text-gray-700">
            <span>Packaging & Safe Handling</span>
            <span className="text-[#388e3c] font-semibold">FREE</span>
          </div>

          <div className="border-t border-dashed border-gray-300 pt-2 flex justify-between font-black text-sm text-gray-900">
            <span>Total Payable Amount</span>
            <span>₹{finalPayable}</span>
          </div>
        </div>

        <div className="mt-3 bg-green-50 text-green-800 p-2 rounded text-xs font-bold flex items-center border border-green-200">
          <Tag className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
          <span>You will save ₹{cartDiscount + superCoinsDiscount} on this pet order!</span>
        </div>
      </div>

      {/* Safe and secure checkout badge */}
      <div className="flex items-center justify-center space-x-1 text-gray-400 text-[11px] py-4">
        <ShieldCheck className="w-4 h-4 text-gray-500" />
        <span>Safe and Secure Payments • 100% Authentic Petszoo Products</span>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-4 py-2.5 flex items-center justify-between shadow-xl safe-bottom">
        <div>
          <span className="text-[10px] text-gray-500 uppercase font-bold block">Total Amount</span>
          <span className="text-lg font-black text-gray-900">₹{finalPayable}</span>
        </div>

        <button
          onClick={() => navigateTo('checkout')}
          className="bg-[#fb641b] hover:bg-[#e85813] text-white font-bold text-sm px-6 py-2.5 rounded shadow-md flex items-center space-x-1.5 transition-colors"
        >
          <span>PLACE ORDER</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
