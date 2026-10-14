import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, CreditCard, Smartphone, Banknote, Building2, Lock, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';

export const CheckoutPage = () => {
  const {
    cart,
    finalPayable,
    cartDiscount,
    superCoinsDiscount,
    shippingAddress,
    setShippingAddress,
    clearCart,
    navigateTo,
    goBack,
    showToast
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'upi', 'cod', 'card', 'netbanking'
  const [upiId, setUpiId] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode] = useState('7429');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAddressEdit, setShowAddressEdit] = useState(false);

  const [addressForm, setAddressForm] = useState({ ...shippingAddress });

  const handleSaveAddress = (e) => {
    e.preventDefault();
    setShippingAddress(addressForm);
    setShowAddressEdit(false);
    showToast('Shipping address updated! 📍');
  };

  const handlePlaceOrder = async () => {
    if (paymentMethod === 'cod' && captchaInput !== captchaCode) {
      showToast('Please enter the correct 4-digit captcha code');
      return;
    }

    if (paymentMethod === 'upi' && !upiId.includes('@')) {
      showToast('Please enter a valid UPI ID (e.g. name@okhdfcbank)');
      return;
    }

    setIsSubmitting(true);

    const paymentLabel = 
      paymentMethod === 'cod' ? 'Cash on Delivery (COD)' :
      paymentMethod === 'upi' ? `UPI (${upiId || 'PhonePe / GPay'})` :
      paymentMethod === 'card' ? 'Credit / Debit Card' : 'Net Banking';

    const orderPayload = {
      items: cart,
      shippingAddress,
      paymentMethod: paymentLabel,
      totalAmount: finalPayable,
      discountAmount: cartDiscount,
      superCoinsUsed: superCoinsDiscount
    };

    try {
      const res = await api.createOrder(orderPayload);
      clearCart();
      navigateTo('order_success', { order: res.order });
    } catch (err) {
      console.error(err);
      showToast('Order placement failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pb-24 bg-[#f1f2f4]">
      {/* Checkout Steps Progress */}
      <div className="bg-[#2874f0] text-white px-4 py-3 flex items-center justify-between text-xs font-semibold">
        <button onClick={goBack} className="p-1 -ml-2 text-white">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-2">
          <span className="bg-white text-[#2874f0] rounded-full w-5 h-5 flex items-center justify-center font-bold text-[11px]">
            1
          </span>
          <span>Address</span>
        </div>
        <div className="h-[1px] w-6 bg-white/40" />
        <div className="flex items-center space-x-2">
          <span className="bg-white text-[#2874f0] rounded-full w-5 h-5 flex items-center justify-center font-bold text-[11px]">
            2
          </span>
          <span>Summary</span>
        </div>
        <div className="h-[1px] w-6 bg-white/40" />
        <div className="flex items-center space-x-2">
          <span className="bg-[#ffe500] text-gray-900 rounded-full w-5 h-5 flex items-center justify-center font-bold text-[11px]">
            3
          </span>
          <span className="text-[#ffe500] font-bold">Payment</span>
        </div>
      </div>

      {/* Shipping Address Card */}
      <div className="bg-white p-3.5 my-2 shadow-xs border-y border-gray-100">
        <div className="flex items-center justify-between mb-1.5">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Delivery Address
          </h3>
          <button
            onClick={() => setShowAddressEdit(!showAddressEdit)}
            className="text-xs font-bold text-[#2874f0]"
          >
            {showAddressEdit ? 'Cancel' : 'Change / Edit'}
          </button>
        </div>

        {!showAddressEdit ? (
          <div>
            <p className="text-sm font-bold text-gray-900">
              {shippingAddress.name} <span className="text-xs font-normal text-gray-500">({shippingAddress.phone})</span>
            </p>
            <p className="text-xs text-gray-600 mt-0.5">
              {shippingAddress.house}, {shippingAddress.area}, {shippingAddress.city}, {shippingAddress.state} - <span className="font-bold">{shippingAddress.pincode}</span>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSaveAddress} className="mt-2 space-y-2 text-xs">
            <input
              type="text"
              placeholder="Full Name"
              value={addressForm.name}
              onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
            <input
              type="tel"
              placeholder="10-digit Mobile Number"
              value={addressForm.phone}
              onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
            <input
              type="text"
              placeholder="Flat, House no., Building"
              value={addressForm.house}
              onChange={(e) => setAddressForm({ ...addressForm, house: e.target.value })}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
            <input
              type="text"
              placeholder="Area, Colony, Street"
              value={addressForm.area}
              onChange={(e) => setAddressForm({ ...addressForm, area: e.target.value })}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="City"
                value={addressForm.city}
                onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                className="w-1/2 border border-gray-300 rounded p-2"
                required
              />
              <input
                type="text"
                placeholder="Pincode"
                value={addressForm.pincode}
                onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                className="w-1/2 border border-gray-300 rounded p-2"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-[#2874f0] text-white font-bold py-1.5 px-4 rounded text-xs"
            >
              Save Address
            </button>
          </form>
        )}
      </div>

      {/* Payment Options */}
      <div className="bg-white p-3.5 my-2 shadow-xs border-y border-gray-100">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
          Select Payment Method
        </h3>

        <div className="space-y-3">
          {/* COD */}
          <label className={`block border rounded-lg p-3 cursor-pointer transition-colors ${
            paymentMethod === 'cod' ? 'border-[#2874f0] bg-blue-50/40' : 'border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <Banknote className="w-5 h-5 text-green-600" />
                <div>
                  <span className="text-xs font-bold text-gray-900 block">Cash on Delivery (COD)</span>
                  <span className="text-[10px] text-gray-500">Pay cash or scan QR when your pets food arrives</span>
                </div>
              </div>
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'cod'}
                onChange={() => setPaymentMethod('cod')}
                className="w-4 h-4 accent-[#2874f0]"
              />
            </div>

            {paymentMethod === 'cod' && (
              <div className="mt-3 pt-3 border-t border-gray-200 flex items-center space-x-3">
                <div className="bg-gray-100 border border-gray-300 font-mono font-black text-sm px-3 py-1 rounded tracking-widest text-gray-800">
                  {captchaCode}
                </div>
                <input
                  type="text"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  placeholder="Enter code"
                  className="border border-gray-300 rounded px-2.5 py-1 text-xs w-28 focus:outline-[#2874f0]"
                  maxLength={4}
                />
              </div>
            )}
          </label>

          {/* UPI */}
          <label className={`block border rounded-lg p-3 cursor-pointer transition-colors ${
            paymentMethod === 'upi' ? 'border-[#2874f0] bg-blue-50/40' : 'border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <Smartphone className="w-5 h-5 text-[#2874f0]" />
                <div>
                  <span className="text-xs font-bold text-gray-900 block">UPI (Google Pay, PhonePe, Paytm)</span>
                  <span className="text-[10px] text-gray-500">Instant refund & zero payment fees</span>
                </div>
              </div>
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'upi'}
                onChange={() => setPaymentMethod('upi')}
                className="w-4 h-4 accent-[#2874f0]"
              />
            </div>

            {paymentMethod === 'upi' && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <input
                  type="text"
                  placeholder="Enter UPI ID (e.g. mobile@upi)"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs focus:outline-[#2874f0]"
                />
              </div>
            )}
          </label>

          {/* Credit / Debit Card */}
          <label className={`block border rounded-lg p-3 cursor-pointer transition-colors ${
            paymentMethod === 'card' ? 'border-[#2874f0] bg-blue-50/40' : 'border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <CreditCard className="w-5 h-5 text-indigo-600" />
                <div>
                  <span className="text-xs font-bold text-gray-900 block">Credit / Debit / ATM Card</span>
                  <span className="text-[10px] text-gray-500">All Indian bank cards supported</span>
                </div>
              </div>
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'card'}
                onChange={() => setPaymentMethod('card')}
                className="w-4 h-4 accent-[#2874f0]"
              />
            </div>
          </label>

          {/* Net Banking */}
          <label className={`block border rounded-lg p-3 cursor-pointer transition-colors ${
            paymentMethod === 'netbanking' ? 'border-[#2874f0] bg-blue-50/40' : 'border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <Building2 className="w-5 h-5 text-purple-600" />
                <div>
                  <span className="text-xs font-bold text-gray-900 block">Net Banking</span>
                  <span className="text-[10px] text-gray-500">SBI, HDFC, ICICI, Axis and 50+ banks</span>
                </div>
              </div>
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'netbanking'}
                onChange={() => setPaymentMethod('netbanking')}
                className="w-4 h-4 accent-[#2874f0]"
              />
            </div>
          </label>
        </div>
      </div>

      {/* Security Guarantee */}
      <div className="flex items-center justify-center space-x-1 text-gray-500 text-xs py-2">
        <Lock className="w-3.5 h-3.5 text-green-600" />
        <span>256-Bit SSL Secured Payment via Petszoo Gateway</span>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-4 py-2.5 flex items-center justify-between shadow-xl safe-bottom">
        <div>
          <span className="text-[10px] text-gray-500 uppercase font-bold block">Amount to Pay</span>
          <span className="text-lg font-black text-gray-900">₹{finalPayable}</span>
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={isSubmitting}
          className="bg-[#fb641b] hover:bg-[#e85813] disabled:opacity-50 text-white font-bold text-sm px-7 py-2.5 rounded shadow-md flex items-center space-x-1.5 transition-colors"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <span>CONFIRM ORDER</span>
          )}
        </button>
      </div>
    </div>
  );
};
