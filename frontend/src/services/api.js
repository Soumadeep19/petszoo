import { MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_BANNERS } from '../data/mockProducts';

const API_BASE = 'http://localhost:5000/api';

export const api = {
  // Fetch Banners
  async getBanners() {
    try {
      const res = await fetch(`${API_BASE}/banners`, { signal: AbortSignal.timeout(1500) });
      if (res.ok) return await res.json();
    } catch (e) {
      // fallback
    }
    return MOCK_BANNERS;
  },

  // Fetch Categories
  async getCategories() {
    try {
      const res = await fetch(`${API_BASE}/categories`, { signal: AbortSignal.timeout(1500) });
      if (res.ok) return await res.json();
    } catch (e) {
      // fallback
    }
    return MOCK_CATEGORIES;
  },

  // Fetch Deals
  async getDeals() {
    try {
      const res = await fetch(`${API_BASE}/deals`, { signal: AbortSignal.timeout(1500) });
      if (res.ok) return await res.json();
    } catch (e) {
      // fallback
    }
    return MOCK_PRODUCTS.filter(p => p.isDealOfTheDay);
  },

  // Fetch Products with filters
  async getProducts(params = {}) {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE}/products?${query}`, { signal: AbortSignal.timeout(1500) });
      if (res.ok) return await res.json();
    } catch (e) {
      // fallback
    }

    let products = [...MOCK_PRODUCTS];
    if (params.petType && params.petType !== 'all') {
      products = products.filter(p => p.petType.toLowerCase() === params.petType.toLowerCase());
    }
    if (params.q) {
      const q = params.q.toLowerCase().trim();
      products = products.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.petType.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    if (params.sort === 'price_asc') {
      products.sort((a, b) => a.price - b.price);
    } else if (params.sort === 'price_desc') {
      products.sort((a, b) => b.price - a.price);
    } else if (params.sort === 'rating') {
      products.sort((a, b) => b.rating - a.rating);
    } else if (params.sort === 'discount') {
      products.sort((a, b) => b.discountPercent - a.discountPercent);
    }
    return products;
  },

  // Fetch Product Details
  async getProductById(id) {
    try {
      const res = await fetch(`${API_BASE}/products/${id}`, { signal: AbortSignal.timeout(1500) });
      if (res.ok) return await res.json();
    } catch (e) {
      // fallback
    }
    const product = MOCK_PRODUCTS.find(p => p.id === id) || MOCK_PRODUCTS[0];
    const related = MOCK_PRODUCTS.filter(p => p.id !== product.id && p.petType === product.petType).slice(0, 4);
    return { product, related };
  },

  // Create Order
  async createOrder(orderData) {
    try {
      const res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
        signal: AbortSignal.timeout(2000)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      // fallback to offline order creation
    }

    const orderId = 'PZ' + Math.floor(10000000 + Math.random() * 90000000);
    const date = new Date();
    const delivery = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
    const offlineOrder = {
      orderId,
      createdAt: date.toISOString(),
      expectedDelivery: delivery.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' }),
      items: orderData.items,
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod || 'Cash on Delivery (COD)',
      paymentStatus: orderData.paymentMethod === 'Cash on Delivery (COD)' ? 'Pending' : 'Paid',
      totalAmount: orderData.totalAmount,
      discountAmount: orderData.discountAmount || 0,
      superCoinsUsed: orderData.superCoinsUsed || 0,
      superCoinsEarned: Math.floor(orderData.totalAmount / 50),
      status: 'Order Placed',
      trackingSteps: [
        { step: 'Order Placed', time: 'Just now', completed: true, current: true },
        { step: 'Packed & Dispatched', time: 'Expected tomorrow', completed: false, current: false },
        { step: 'Shipped via Petszoo Express', time: 'In transit', completed: false, current: false },
        { step: 'Out for Delivery', time: 'Expected in 2 days', completed: false, current: false },
        { step: 'Delivered', time: 'Arriving soon', completed: false, current: false }
      ]
    };

    // Save in local storage
    const stored = JSON.parse(localStorage.getItem('petszoo_orders') || '[]');
    stored.unshift(offlineOrder);
    localStorage.setItem('petszoo_orders', JSON.stringify(stored));

    return { success: true, order: offlineOrder };
  },

  // Get Orders
  async getOrders() {
    try {
      const res = await fetch(`${API_BASE}/orders`, { signal: AbortSignal.timeout(1500) });
      if (res.ok) return await res.json();
    } catch (e) {
      // fallback
    }
    return JSON.parse(localStorage.getItem('petszoo_orders') || '[]');
  }
};
