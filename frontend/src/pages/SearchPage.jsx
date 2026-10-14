import React, { useState, useEffect } from 'react';
import { Search, X, ArrowLeft, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { ProductCard } from '../components/ProductCard';

export const SearchPage = () => {
  const { searchQuery, setSearchQuery, goBack } = useApp();
  const [localQuery, setLocalQuery] = useState(searchQuery || '');
  const [products, setProducts] = useState([]);
  const [selectedPet, setSelectedPet] = useState('all');
  const [selectedSort, setSelectedSort] = useState('popularity');
  const [loading, setLoading] = useState(false);

  const trendingTags = [
    'Bird Seeds', 'Pedigree Dog Food', 'Whiskas Gravy', 'ZuPreem Pellets', 
    'Cuttlebone', 'Bird Cage', 'Royal Canin Maxi', 'Cat Litter', 'Fish Food'
  ];

  useEffect(() => {
    async function doSearch() {
      setLoading(true);
      try {
        const results = await api.getProducts({
          q: localQuery,
          petType: selectedPet !== 'all' ? selectedPet : undefined,
          sort: selectedSort
        });
        setProducts(results);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(doSearch, 200);
    return () => clearTimeout(timer);
  }, [localQuery, selectedPet, selectedSort]);

  const handleTagClick = (tag) => {
    setLocalQuery(tag);
    setSearchQuery(tag);
  };

  return (
    <div className="pb-20 bg-[#f1f2f4] min-h-screen">
      {/* Search Header */}
      <div className="sticky top-0 z-30 bg-[#2874f0] p-2.5 shadow-md flex items-center space-x-2 safe-top">
        <button onClick={goBack} className="p-1 text-white hover:bg-white/10 rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex-1 relative flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            autoFocus
            value={localQuery}
            onChange={(e) => {
              setLocalQuery(e.target.value);
              setSearchQuery(e.target.value);
            }}
            placeholder="Search for bird food, pedigree, cages, catnip..."
            className="w-full bg-white text-gray-900 rounded-md pl-9 pr-8 py-2 text-xs focus:outline-none shadow-inner"
          />
          {localQuery && (
            <button
              onClick={() => {
                setLocalQuery('');
                setSearchQuery('');
              }}
              className="absolute right-2.5 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter and Sort Chips */}
      <div className="bg-white p-2 border-b border-gray-200 flex items-center space-x-2 overflow-x-auto no-scrollbar">
        <div className="flex items-center space-x-1 text-xs text-gray-500 font-bold px-1">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Filters:</span>
        </div>

        {['all', 'Dog', 'Cat', 'Bird', 'Fish', 'Small Pet'].map((pet) => (
          <button
            key={pet}
            onClick={() => setSelectedPet(pet)}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedPet === pet
                ? 'bg-[#2874f0] text-white shadow-xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {pet === 'all' ? 'All Pets' : `${pet}s`}
          </button>
        ))}
      </div>

      {/* Sort Options Bar */}
      <div className="bg-white px-3 py-1.5 border-b border-gray-100 flex items-center justify-between text-xs text-gray-600">
        <div className="flex items-center space-x-1">
          <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
          <span>Sort By:</span>
        </div>

        <select
          value={selectedSort}
          onChange={(e) => setSelectedSort(e.target.value)}
          className="bg-transparent text-xs font-bold text-[#2874f0] focus:outline-none cursor-pointer"
        >
          <option value="popularity">Popularity</option>
          <option value="price_asc">Price -- Low to High</option>
          <option value="price_desc">Price -- High to Low</option>
          <option value="rating">Customer Rating</option>
          <option value="discount">Biggest Discount</option>
        </select>
      </div>

      {/* Trending Search Tags (when query is short) */}
      {!localQuery && (
        <div className="bg-white p-3.5 my-2 shadow-xs">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            Trending Searches for Pets
          </h3>
          <div className="flex flex-wrap gap-2">
            {trendingTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className="bg-gray-100 hover:bg-blue-50 hover:text-[#2874f0] text-gray-700 text-xs px-3 py-1.5 rounded-full transition-colors border border-gray-200"
              >
                🔍 {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search Results Count */}
      <div className="px-3 pt-2 text-xs text-gray-500 font-medium">
        Found {products.length} pet {products.length === 1 ? 'item' : 'items'}
      </div>

      {/* Results Grid */}
      {loading ? (
        <div className="p-8 text-center text-xs text-gray-500">Searching Petszoo catalog...</div>
      ) : products.length === 0 ? (
        <div className="p-8 text-center bg-white m-3 rounded-lg shadow-xs">
          <p className="text-2xl mb-1">🐾</p>
          <h3 className="text-sm font-bold text-gray-800">No pet products found</h3>
          <p className="text-xs text-gray-500 mt-1">Try searching for "bird seeds", "whiskas", or "dog food".</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 p-2">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};
