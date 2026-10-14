import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation
  const [currentTab, setCurrentTab] = useState('home'); // home, categories, notifications, account, cart, search, product_detail, checkout, order_success, orders
  const [navigationHistory, setNavigationHistory] = useState(['home']);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Cart
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('petszoo_cart');
      return saved ? JSON.parse(saved) : [
        {
          id: 'dog-1',
          title: 'Pedigree Adult Dry Dog Food - Meat & Rice (10 kg Pack)',
          brand: 'Pedigree',
          price: 2150,
          originalPrice: 2799,
          discountPercent: 23,
          selectedWeight: '10 kg',
          image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&auto=format&fit=crop&q=80',
          quantity: 1
        },
        {
          id: 'bird-1',
          title: 'Vitapol Premium Economic Daily Food for Budgies (1.2 kg)',
          brand: 'Vitapol',
          price: 420,
          originalPrice: 650,
          discountPercent: 35,
          selectedWeight: '1.2 kg',
          image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&auto=format&fit=crop&q=80',
          quantity: 2
        }
      ];
    } catch {
      return [];
    }
  });

  // Wishlist
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('petszoo_wishlist');
      return saved ? JSON.parse(saved) : ['cat-1', 'bird-3'];
    } catch {
      return [];
    }
  });

  // SuperCoins & User Profile
  const [superCoins, setSuperCoins] = useState(180);
  const [useSuperCoins, setUseSuperCoins] = useState(false);
  const [lastPlacedOrder, setLastPlacedOrder] = useState(null);

  // User Profile
  const [userProfile, setUserProfile] = useState({
    name: 'Rahul Sharma',
    phone: '+91 98765 43210',
    email: 'rahul.petszoo@gmail.com',
    memberTier: 'Petszoo Plus Member 🌟',
    pets: [
      { id: 1, name: 'Bruno', type: 'Dog', breed: 'Golden Retriever', age: '2 Years' },
      { id: 2, name: 'Kiwi', type: 'Bird', breed: 'Budgerigar Parrot', age: '1 Year' }
    ]
  });

  // Default Shipping Address
  const [shippingAddress, setShippingAddress] = useState({
    name: 'Rahul Sharma',
    phone: '9876543210',
    pincode: '560034',
    house: 'Flat 304, Palm Grove Heights',
    area: '1st Block, Koramangala',
    city: 'Bengaluru',
    state: 'Karnataka',
    type: 'Home'
  });

  // Toast Notification
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  useEffect(() => {
    localStorage.setItem('petszoo_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('petszoo_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Navigate helper
  const navigateTo = (tab, data = null) => {
    if (data?.productId) {
      setSelectedProductId(data.productId);
    }
    if (data?.category) {
      setSelectedCategory(data.category);
    }
    if (data?.query !== undefined) {
      setSearchQuery(data.query);
    }
    if (data?.order) {
      setLastPlacedOrder(data.order);
    }
    setNavigationHistory(prev => [...prev, tab]);
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (navigationHistory.length > 1) {
      const newHistory = [...navigationHistory];
      newHistory.pop();
      const prevTab = newHistory[newHistory.length - 1];
      setNavigationHistory(newHistory);
      setCurrentTab(prevTab);
    } else {
      setCurrentTab('home');
    }
  };

  // Cart operations
  const addToCart = (product, weight = null) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.id === product.id && (!weight || item.selectedWeight === weight));
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          brand: product.brand,
          price: product.price,
          originalPrice: product.originalPrice,
          discountPercent: product.discountPercent,
          selectedWeight: weight || product.selectedWeight || 'Standard',
          image: product.images ? product.images[0] : product.image,
          quantity: 1
        }
      ];
    });
    showToast(`Added "${product.title.slice(0, 24)}..." to Cart 🛒`);
  };

  const updateCartQty = (id, weight, delta) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.id === id && item.selectedWeight === weight) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (id, weight) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.selectedWeight === weight)));
    showToast('Item removed from cart');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        showToast('Removed from Wishlist 💔');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to Wishlist ❤️');
        return [...prev, productId];
      }
    });
  };

  // Totals calculations
  const cartTotalMRP = cart.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
  const cartTotalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartDiscount = cartTotalMRP - cartTotalPrice;
  const superCoinsDiscount = useSuperCoins ? Math.min(50, superCoins) : 0;
  const finalPayable = Math.max(0, cartTotalPrice - superCoinsDiscount);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        currentTab,
        navigateTo,
        goBack,
        selectedProductId,
        setSelectedProductId,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        cart,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        wishlist,
        toggleWishlist,
        superCoins,
        setSuperCoins,
        useSuperCoins,
        setUseSuperCoins,
        cartTotalMRP,
        cartTotalPrice,
        cartDiscount,
        superCoinsDiscount,
        finalPayable,
        cartCount,
        userProfile,
        setUserProfile,
        shippingAddress,
        setShippingAddress,
        lastPlacedOrder,
        setLastPlacedOrder,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
