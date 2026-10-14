import React from 'react';
import { Star, Heart, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProductCard = ({ product }) => {
  const { navigateTo, wishlist, toggleWishlist, addToCart } = useApp();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <div 
      onClick={() => navigateTo('product_detail', { productId: product.id })}
      className="bg-white border border-gray-100 rounded-lg p-2.5 flex flex-col justify-between relative hover:shadow-lg transition-all duration-200 cursor-pointer group"
    >
      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product.id);
        }}
        className="absolute top-2 right-2 z-10 w-7 h-7 bg-white/90 backdrop-blur-xs rounded-full flex items-center justify-center shadow-xs border border-gray-100 hover:scale-110 transition-transform"
        aria-label="Wishlist"
      >
        <Heart 
          className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
        />
      </button>

      {/* Product Image */}
      <div className="relative w-full aspect-square mb-2 bg-gray-50 rounded-md overflow-hidden flex items-center justify-center">
        <img
          src={product.images ? product.images[0] : product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Pet Category Pill */}
        <span className="absolute bottom-1 left-1 bg-black/60 backdrop-blur-xs text-white text-[9px] font-semibold px-1.5 py-0.5 rounded">
          {product.petType}
        </span>
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col">
        {/* Brand */}
        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
          {product.brand}
        </span>

        {/* Title */}
        <h4 className="text-xs font-medium text-gray-800 line-clamp-2 mt-0.5 mb-1 leading-snug">
          {product.title}
        </h4>

        {/* Rating and Assured Ribbon */}
        <div className="flex items-center space-x-1.5 mb-1.5">
          <div className="flex items-center bg-[#388e3c] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            <span>{product.rating}</span>
            <Star className="w-2.5 h-2.5 fill-white text-white ml-0.5" />
          </div>
          <span className="text-[10px] text-gray-400">
            ({product.ratingCount > 1000 ? `${(product.ratingCount / 1000).toFixed(1)}k` : product.ratingCount})
          </span>

          {product.assured && (
            <span className="ml-auto text-[9px] font-extrabold italic text-[#2874f0] bg-blue-50 px-1 py-0.5 rounded flex items-center border border-blue-200">
              ✓ <span className="ml-0.5">Assured</span>
            </span>
          )}
        </div>

        {/* Price & Discount */}
        <div className="mt-auto">
          <div className="flex items-baseline space-x-1.5">
            <span className="text-sm font-black text-gray-900">₹{product.price}</span>
            <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
            <span className="text-xs font-bold text-[#388e3c]">{product.discountPercent}% off</span>
          </div>

          <div className="flex items-center justify-between mt-1 pt-1 border-t border-gray-100">
            <span className="text-[10px] text-gray-500 font-medium truncate">
              {product.deliveryTime || 'Free Delivery'}
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="text-[10px] font-bold text-[#2874f0] hover:text-[#1a5bc4] flex items-center space-x-0.5 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded transition-colors"
            >
              <ShoppingBag className="w-3 h-3" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
