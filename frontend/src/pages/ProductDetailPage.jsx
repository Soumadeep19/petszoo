import React, { useState, useEffect } from 'react';
import { Star, Heart, Share2, Check, Truck, ShieldCheck, MapPin, ChevronRight, ShoppingCart, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailPage = () => {
  const { selectedProductId, addToCart, navigateTo, wishlist, toggleWishlist, showToast } = useApp();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedWeight, setSelectedWeight] = useState('');
  const [pincode, setPincode] = useState('560034');
  const [pincodeChecked, setPincodeChecked] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!selectedProductId) return;
      setLoading(true);
      try {
        const data = await api.getProductById(selectedProductId);
        setProduct(data.product);
        setRelated(data.related || []);
        setSelectedWeight(data.product.selectedWeight || data.product.weights?.[0] || '');
        setActiveImageIndex(0);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
    window.scrollTo(0, 0);
  }, [selectedProductId]);

  if (loading || !product) {
    return (
      <div className="min-h-screen bg-white p-4 flex flex-col items-center justify-center space-y-3">
        <div className="w-10 h-10 border-4 border-[#2874f0] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs text-gray-500 font-medium">Loading pet product...</p>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);
  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  const handleBuyNow = () => {
    addToCart(product, selectedWeight);
    navigateTo('cart');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: `Check out ${product.title} on Petszoo!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      showToast('Product link copied to clipboard! 📋');
    }
  };

  return (
    <div className="pb-20 bg-gray-50">
      {/* Product Image Carousel */}
      <div className="relative bg-white pt-2 pb-4 border-b border-gray-100">
        <div className="relative w-full aspect-square max-h-80 mx-auto flex items-center justify-center overflow-hidden">
          <img
            src={images[activeImageIndex]}
            alt={product.title}
            className="w-full h-full object-contain p-4"
          />

          {/* Action icons */}
          <div className="absolute top-3 right-3 flex flex-col space-y-2 z-10">
            <button
              onClick={() => toggleWishlist(product.id)}
              className="w-9 h-9 bg-white/90 backdrop-blur-xs rounded-full flex items-center justify-center shadow-md border border-gray-100"
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
            </button>
            <button
              onClick={handleShare}
              className="w-9 h-9 bg-white/90 backdrop-blur-xs rounded-full flex items-center justify-center shadow-md border border-gray-100"
              aria-label="Share"
            >
              <Share2 className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Thumbnail Dots */}
        {images.length > 1 && (
          <div className="flex justify-center space-x-2 mt-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`h-2 rounded-full transition-all duration-200 ${
                  activeImageIndex === idx ? 'w-6 bg-[#2874f0]' : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Main Info */}
      <div className="bg-white p-3.5 border-b border-gray-100">
        <span className="text-xs font-bold text-[#2874f0] uppercase tracking-wider">
          {product.brand}
        </span>
        <h1 className="text-sm font-semibold text-gray-900 mt-1 leading-snug">
          {product.title}
        </h1>

        {/* Rating & Assured */}
        <div className="flex items-center space-x-2 mt-2">
          <div className="flex items-center bg-[#388e3c] text-white text-xs font-bold px-2 py-0.5 rounded">
            <span>{product.rating}</span>
            <Star className="w-3 h-3 fill-white text-white ml-0.5" />
          </div>
          <span className="text-xs text-gray-500">
            {product.ratingCount.toLocaleString()} Ratings & Reviews
          </span>

          {product.assured && (
            <span className="ml-auto text-xs font-black italic text-[#2874f0] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Petszoo Assured ✓
            </span>
          )}
        </div>

        {/* Price & Savings */}
        <div className="mt-3 flex items-baseline space-x-2">
          <span className="text-2xl font-black text-gray-900">₹{product.price}</span>
          <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
          <span className="text-sm font-bold text-[#388e3c]">{product.discountPercent}% off</span>
        </div>
        <p className="text-[11px] text-green-700 font-semibold mt-0.5">
          You save ₹{product.originalPrice - product.price} on this pet supply!
        </p>
      </div>

      {/* Weight / Pack Variant Selector */}
      {product.weights && product.weights.length > 0 && (
        <div className="bg-white p-3.5 mt-2 border-y border-gray-100">
          <label className="text-xs font-bold text-gray-800 block mb-2">
            Select Pack Size / Quantity:
          </label>
          <div className="flex flex-wrap gap-2">
            {product.weights.map((w) => (
              <button
                key={w}
                onClick={() => setSelectedWeight(w)}
                className={`px-3 py-1.5 rounded text-xs font-semibold border transition-all ${
                  selectedWeight === w
                    ? 'border-[#2874f0] bg-blue-50 text-[#2874f0] ring-1 ring-[#2874f0]'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400 bg-white'
                }`}
              >
                {w}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Available Offers Strip */}
      <div className="bg-white p-3.5 mt-2 border-y border-gray-100">
        <h3 className="text-xs font-bold text-gray-900 mb-2 flex items-center">
          <Zap className="w-3.5 h-3.5 text-yellow-500 mr-1 fill-yellow-500" />
          Available Bank & Store Offers
        </h3>
        <ul className="space-y-1.5 text-xs text-gray-600">
          <li className="flex items-start">
            <span className="text-[#388e3c] font-bold mr-1.5">Bank Offer</span>
            <span>5% Unlimited Cashback on Petszoo Axis Bank Card</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#388e3c] font-bold mr-1.5">Special Price</span>
            <span>Get extra ₹50 off with 50 SuperCoins</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#388e3c] font-bold mr-1.5">Freebie</span>
            <span>Free pet care consultation coupon with every bird & dog food order</span>
          </li>
        </ul>
      </div>

      {/* Delivery & Pincode Checker */}
      <div className="bg-white p-3.5 mt-2 border-y border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-gray-900 flex items-center">
            <Truck className="w-4 h-4 text-gray-600 mr-1" />
            Delivery Options
          </span>
          <div className="flex items-center text-xs">
            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 w-24 text-center text-xs focus:outline-[#2874f0]"
              placeholder="Pincode"
              maxLength={6}
            />
            <button
              onClick={() => {
                setPincodeChecked(true);
                showToast(`Pincode ${pincode} is serviceable for delivery! 🚚`);
              }}
              className="ml-1 text-xs font-bold text-[#2874f0] px-2 py-1 hover:underline"
            >
              Check
            </button>
          </div>
        </div>

        {pincodeChecked && (
          <div className="text-xs text-gray-600 space-y-1 pt-1 border-t border-gray-100">
            <p className="font-semibold text-gray-800 flex items-center text-green-700">
              <Check className="w-3.5 h-3.5 mr-1" />
              Delivery by {product.deliveryTime || 'Tomorrow by 11 AM'}
            </p>
            <p className="text-[11px] text-gray-500">Free delivery on this pet item | Cash on Delivery available</p>
          </div>
        )}
      </div>

      {/* Product Highlights & Specifications */}
      <div className="bg-white p-3.5 mt-2 border-y border-gray-100">
        <h3 className="text-xs font-bold text-gray-900 mb-2">Product Details & Specs</h3>
        <p className="text-xs text-gray-600 leading-relaxed mb-3">
          {product.description}
        </p>

        {product.specifications && (
          <div className="border border-gray-200 rounded-md overflow-hidden text-xs">
            {Object.entries(product.specifications).map(([key, val], idx) => (
              <div
                key={key}
                className={`flex py-2 px-3 ${
                  idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                } border-b border-gray-100 last:border-b-0`}
              >
                <span className="w-2/5 text-gray-500 font-medium">{key}</span>
                <span className="w-3/5 text-gray-900 font-semibold">{val}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Similar Pet Products */}
      {related.length > 0 && (
        <div className="bg-white p-3.5 mt-2 border-y border-gray-100">
          <h3 className="text-xs font-bold text-gray-900 mb-2">Similar Products for {product.petType}s</h3>
          <div className="grid grid-cols-2 gap-2">
            {related.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Flipkart Sticky Bottom Bar: Add to Cart + Buy Now */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 flex h-13 shadow-xl safe-bottom">
        <button
          onClick={() => addToCart(product, selectedWeight)}
          className="flex-1 bg-white hover:bg-gray-50 text-gray-900 font-bold text-sm flex items-center justify-center space-x-1.5 transition-colors border-r border-gray-200"
        >
          <ShoppingCart className="w-4 h-4 text-[#2874f0]" />
          <span>ADD TO CART</span>
        </button>

        <button
          onClick={handleBuyNow}
          className="flex-1 bg-[#fb641b] hover:bg-[#e85813] text-white font-bold text-sm flex items-center justify-center space-x-1.5 transition-colors shadow-inner"
        >
          <Zap className="w-4 h-4 fill-white" />
          <span>BUY NOW</span>
        </button>
      </div>
    </div>
  );
};
