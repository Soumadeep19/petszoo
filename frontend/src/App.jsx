import React from 'react';
import { useApp } from './context/AppContext';
import { FlipkartHeader } from './components/FlipkartHeader';
import { BottomNav } from './components/BottomNav';
import { HomePage } from './pages/HomePage';
import { CategoriesPage } from './pages/CategoriesPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { OrdersPage } from './pages/OrdersPage';
import { SearchPage } from './pages/SearchPage';
import { AccountPage } from './pages/AccountPage';
import { NotificationsPage } from './pages/NotificationsPage';

export const App = () => {
  const { currentTab, toastMessage } = useApp();

  const renderContent = () => {
    switch (currentTab) {
      case 'home':
        return <HomePage />;
      case 'categories':
        return <CategoriesPage />;
      case 'product_detail':
        return <ProductDetailPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'order_success':
        return <OrderSuccessPage />;
      case 'orders':
        return <OrdersPage />;
      case 'search':
        return <SearchPage />;
      case 'account':
        return <AccountPage />;
      case 'notifications':
        return <NotificationsPage />;
      default:
        return <HomePage />;
    }
  };

  // Determine header behavior
  const showHeader = !['checkout', 'order_success', 'search'].includes(currentTab);
  const showBack = ['product_detail', 'cart', 'orders'].includes(currentTab);
  const headerTitle = 
    currentTab === 'cart' ? 'My Cart' :
    currentTab === 'orders' ? 'My Orders' :
    null;

  // Determine if bottom nav should show
  const showBottomNav = !['checkout', 'order_success', 'product_detail'].includes(currentTab);

  return (
    <div className="min-h-screen bg-[#f1f2f4] text-gray-900 font-sans flex flex-col max-w-md mx-auto shadow-2xl relative select-none">
      {/* Flipkart Header */}
      {showHeader && (
        <FlipkartHeader showBack={showBack} title={headerTitle} />
      )}

      {/* Main View Area */}
      <main className="flex-1">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      {showBottomNav && <BottomNav />}

      {/* Toast Notification Notification Pill */}
      {toastMessage && (
        <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 z-50 bg-gray-900/95 backdrop-blur-xs text-white px-4 py-2 rounded-full text-xs font-semibold shadow-2xl flex items-center space-x-2 animate-bounce border border-gray-700 pointer-events-none">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default App;
