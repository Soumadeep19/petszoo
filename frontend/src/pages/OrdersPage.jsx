import React, { useState, useEffect } from 'react';
import { Package, ChevronRight, Truck, CheckCircle2, RotateCw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';

export const OrdersPage = () => {
  const { navigateTo, addToCart } = useApp();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      try {
        const data = await api.getOrders();
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, []);

  return (
    <div className="pb-20 bg-[#f1f2f4] min-h-screen">
      <div className="bg-white p-3.5 border-b border-gray-200">
        <h1 className="text-sm font-bold text-gray-900">My Pet Orders ({orders.length})</h1>
      </div>

      {loading ? (
        <div className="p-8 text-center text-xs text-gray-500">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="p-8 text-center bg-white m-3 rounded-lg shadow-xs">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-2" />
          <h3 className="text-xs font-bold text-gray-800">No Orders Placed Yet</h3>
          <p className="text-[11px] text-gray-500 mt-1">When you buy pet foods or toys, they will appear here.</p>
          <button
            onClick={() => navigateTo('home')}
            className="mt-4 bg-[#2874f0] text-white font-bold text-xs px-4 py-2 rounded"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-2.5 p-2">
          {orders.map((ord) => (
            <div key={ord.orderId} className="bg-white rounded-lg p-3.5 shadow-xs border border-gray-100">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100 text-xs">
                <div>
                  <span className="font-mono font-bold text-gray-900">{ord.orderId}</span>
                  <p className="text-[10px] text-gray-400">
                    {new Date(ord.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  {ord.status}
                </span>
              </div>

              {/* Items Preview */}
              <div className="py-2.5 space-y-2">
                {ord.items && ord.items.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2.5">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded border border-gray-200 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0 text-xs">
                      <p className="font-medium text-gray-900 truncate">{item.title}</p>
                      <p className="text-[10px] text-gray-500">
                        Qty: {item.quantity} • {item.selectedWeight}
                      </p>
                      <span className="font-bold text-gray-900">₹{item.price * item.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total & Action */}
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-500 block">Total Amount</span>
                  <span className="text-xs font-bold text-gray-900">₹{ord.totalAmount}</span>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => navigateTo('order_success', { order: ord })}
                    className="text-xs font-bold text-[#2874f0] bg-blue-50 px-3 py-1.5 rounded flex items-center"
                  >
                    <Truck className="w-3.5 h-3.5 mr-1" />
                    <span>Track</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
