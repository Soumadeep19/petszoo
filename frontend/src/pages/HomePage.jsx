import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { CategoryChips } from '../components/CategoryChips';
import { BannerSlider } from '../components/BannerSlider';
import { DealsOfTheDay } from '../components/DealsOfTheDay';
import { ProductCard } from '../components/ProductCard';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';

export const HomePage = () => {
  const { navigateTo, superCoins } = useApp();
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [deals, setDeals] = useState([]);
  const [products, setProducts] = useState([]);
  const [activePetFilter, setActivePetFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [b, c, d, p] = await Promise.all([
          api.getBanners(),
          api.getCategories(),
          api.getDeals(),
          api.getProducts()
        ]);
        setBanners(b);
        setCategories(c);
        setDeals(d);
        setProducts(p);
      } catch (err) {
        console.error('Failed to fetch home data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSelectCategory = (catType) => {
    setActivePetFilter(catType);
  };

  const filteredProducts = activePetFilter === 'all' 
    ? products 
    : products.filter(p => p.petType.toLowerCase() === activePetFilter.toLowerCase());

  // Bird special section
  const birdProducts = products.filter(p => p.petType === 'Bird');
  // Dog special section
  const dogProducts = products.filter(p => p.petType === 'Dog');
  // Cat special section
  const catProducts = products.filter(p => p.petType === 'Cat');

  return (
    <div className="pb-16 bg-[#f1f2f4]">
      {/* Category Chips Bar */}
      <CategoryChips 
        categories={categories} 
        activeCategory={activePetFilter} 
        onSelectCategory={handleSelectCategory} 
      />

      {/* Main Promo Banners */}
      <BannerSlider banners={banners} />

      {/* Flipkart SuperCoins Strip */}
      <div 
        onClick={() => navigateTo('account')}
        className="mx-2 my-2 bg-gradient-to-r from-amber-50 to-yellow-100 border border-amber-200 rounded-md p-2 flex items-center justify-between shadow-xs cursor-pointer"
      >
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full bg-[#ffe500] text-gray-900 flex items-center justify-center font-black text-xs shadow-xs border border-amber-400">
            🪙
          </div>
          <span className="text-xs font-bold text-gray-800">
            {superCoins} Petszoo SuperCoins
          </span>
          <span className="text-[10px] text-gray-600 hidden sm:inline">• Save ₹50 on your orders</span>
        </div>
        <div className="flex items-center text-xs font-bold text-[#2874f0]">
          <span>View Balance</span>
          <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
        </div>
      </div>

      {/* Value Badges Strip */}
      <div className="bg-white py-2 px-3 mx-2 rounded-md shadow-xs flex justify-around text-gray-600 text-[10px] font-semibold border border-gray-100">
        <div className="flex items-center space-x-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#2874f0]" />
          <span>100% Genuine Pet Food</span>
        </div>
        <div className="flex items-center space-x-1">
          <Truck className="w-3.5 h-3.5 text-[#388e3c]" />
          <span>Express Delivery</span>
        </div>
        <div className="flex items-center space-x-1">
          <RefreshCw className="w-3.5 h-3.5 text-[#fb641b]" />
          <span>Easy Returns</span>
        </div>
      </div>

      {/* Deals of the Day (Live Countdown) */}
      <DealsOfTheDay deals={deals} />

      {/* Birds & Aviary Special Spotlight */}
      {activePetFilter === 'all' && (
        <div className="bg-white my-2 py-3 shadow-xs border-y border-gray-100">
          <div className="flex items-center justify-between px-3 mb-2">
            <div className="flex items-center space-x-1.5">
              <span className="text-lg">🦜</span>
              <div>
                <h3 className="text-sm font-black text-gray-900 leading-tight">
                  Birds & Aviary Special
                </h3>
                <p className="text-[10px] text-gray-500">Millet, fruit pellets, cuttlebone & bird cages</p>
              </div>
            </div>
            <button 
              onClick={() => handleSelectCategory('Bird')}
              className="text-xs font-bold text-[#2874f0] bg-blue-50 px-2 py-1 rounded"
            >
              See All
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 px-2.5">
            {birdProducts.slice(0, 2).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

      {/* Dogs & Cats Hot Picks */}
      {activePetFilter === 'all' && (
        <div className="bg-white my-2 py-3 shadow-xs border-y border-gray-100">
          <div className="flex items-center justify-between px-3 mb-2">
            <div className="flex items-center space-x-1.5">
              <span className="text-lg">🐶 🐱</span>
              <div>
                <h3 className="text-sm font-black text-gray-900 leading-tight">
                  Canine & Feline Nutrition
                </h3>
                <p className="text-[10px] text-gray-500">Royal Canin, Pedigree & Whiskas</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 px-2.5">
            {dogProducts.slice(0, 1).concat(catProducts.slice(0, 1)).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

      {/* Main Catalog Header */}
      <div className="bg-white px-3 py-2.5 mt-2 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-black text-gray-900">
            {activePetFilter === 'all' ? 'All Pet Supplies & Food' : `${activePetFilter} Store`}
          </h3>
          <p className="text-[10px] text-gray-500">
            Showing {filteredProducts.length} items
          </p>
        </div>

        {activePetFilter !== 'all' && (
          <button 
            onClick={() => setActivePetFilter('all')}
            className="text-xs text-[#2874f0] font-bold underline"
          >
            Clear Filter
          </button>
        )}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-2 p-2">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
