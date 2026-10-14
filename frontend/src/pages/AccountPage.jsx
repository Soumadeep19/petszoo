import React, { useState } from 'react';
import { User, Package, Heart, MapPin, HelpCircle, ChevronRight, Award, Plus, Sparkles, LogOut, PhoneCall } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AccountPage = () => {
  const { userProfile, setUserProfile, superCoins, navigateTo, wishlist, showToast } = useApp();
  const [showAddPet, setShowAddPet] = useState(false);
  const [newPetName, setNewPetName] = useState('');
  const [newPetType, setNewPetType] = useState('Dog');
  const [newPetBreed, setNewPetBreed] = useState('');

  const handleAddPet = (e) => {
    e.preventDefault();
    if (!newPetName.trim()) return;

    const newPet = {
      id: Date.now(),
      name: newPetName,
      type: newPetType,
      breed: newPetBreed || 'Companion Breed',
      age: 'Puppy / Young'
    };

    setUserProfile({
      ...userProfile,
      pets: [...userProfile.pets, newPet]
    });
    setNewPetName('');
    setNewPetBreed('');
    setShowAddPet(false);
    showToast(`Added ${newPet.name} to your Pet Profiles! 🐾`);
  };

  return (
    <div className="pb-20 bg-[#f1f2f4] min-h-screen">
      {/* Flipkart Plus Header Profile */}
      <div className="bg-[#2874f0] text-white p-4 shadow-md safe-top">
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/50 text-2xl font-bold">
            🐶
          </div>
          <div>
            <h2 className="text-base font-bold">{userProfile.name}</h2>
            <p className="text-xs text-blue-100">{userProfile.phone}</p>
            <div className="mt-1 inline-flex items-center space-x-1 bg-[#ffe500] text-gray-900 px-2 py-0.5 rounded text-[10px] font-black uppercase">
              <Award className="w-3 h-3 text-gray-900" />
              <span>Plus Member ✦</span>
            </div>
          </div>
        </div>
      </div>

      {/* SuperCoins & Plus Zone Banner */}
      <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 p-3 mx-3 -mt-2 rounded-lg shadow-md text-gray-900 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <span className="text-2xl">🪙</span>
          <div>
            <span className="text-sm font-black">{superCoins} SuperCoins</span>
            <p className="text-[10px] text-gray-800 font-medium">Use coins to get discounts on pet foods</p>
          </div>
        </div>
        <button 
          onClick={() => showToast('SuperCoins Rewards: Redeem up to 50 coins per order!')}
          className="bg-gray-900 text-white font-bold text-[11px] px-3 py-1.5 rounded shadow hover:bg-gray-800 transition-colors"
        >
          Rewards
        </button>
      </div>

      {/* My Pets Profile Section */}
      <div className="bg-white p-3.5 mx-3 mt-3 rounded-lg shadow-xs border border-gray-100">
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center">
            <span>My Pet Companions</span>
            <span className="ml-1 text-[10px] bg-blue-100 text-[#2874f0] px-1.5 py-0.2 rounded-full font-bold">
              {userProfile.pets.length}
            </span>
          </h3>
          <button
            onClick={() => setShowAddPet(!showAddPet)}
            className="text-xs font-bold text-[#2874f0] flex items-center"
          >
            <Plus className="w-3.5 h-3.5 mr-0.5" />
            <span>Add Pet</span>
          </button>
        </div>

        {/* Pet Cards List */}
        <div className="grid grid-cols-2 gap-2">
          {userProfile.pets.map((pet) => (
            <div key={pet.id} className="border border-gray-200 rounded-lg p-2.5 bg-gray-50 flex items-center space-x-2">
              <span className="text-2xl">
                {pet.type === 'Dog' ? '🐶' : pet.type === 'Cat' ? '🐱' : pet.type === 'Bird' ? '🦜' : '🐠'}
              </span>
              <div className="min-w-0">
                <p className="text-xs font-bold text-gray-900 truncate">{pet.name}</p>
                <p className="text-[10px] text-gray-500 truncate">{pet.breed}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Add Pet Form */}
        {showAddPet && (
          <form onSubmit={handleAddPet} className="mt-3 pt-3 border-t border-gray-100 space-y-2 text-xs">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Pet Name (e.g. Bella)"
                value={newPetName}
                onChange={(e) => setNewPetName(e.target.value)}
                className="w-1/2 border border-gray-300 rounded p-1.5 text-xs focus:outline-[#2874f0]"
                required
              />
              <select
                value={newPetType}
                onChange={(e) => setNewPetType(e.target.value)}
                className="w-1/2 border border-gray-300 rounded p-1.5 text-xs bg-white"
              >
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
                <option value="Fish">Fish</option>
                <option value="Small Pet">Small Pet</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Breed (e.g. Cockatiel / Persian / Labrador)"
              value={newPetBreed}
              onChange={(e) => setNewPetBreed(e.target.value)}
              className="w-full border border-gray-300 rounded p-1.5 text-xs focus:outline-[#2874f0]"
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowAddPet(false)}
                className="px-3 py-1 text-gray-500 font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#2874f0] text-white font-bold px-3 py-1 rounded"
              >
                Save Pet
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Account Navigation Grid */}
      <div className="bg-white mx-3 mt-3 rounded-lg shadow-xs border border-gray-100 divide-y divide-gray-100 text-xs">
        <button
          onClick={() => navigateTo('orders')}
          className="w-full p-3.5 flex items-center justify-between hover:bg-gray-50 text-left transition-colors"
        >
          <div className="flex items-center space-x-3 text-gray-700">
            <Package className="w-5 h-5 text-[#2874f0]" />
            <div>
              <span className="font-bold text-gray-900 block">My Orders</span>
              <span className="text-[10px] text-gray-500">Track current orders & view history</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>

        <button
          onClick={() => navigateTo('categories')}
          className="w-full p-3.5 flex items-center justify-between hover:bg-gray-50 text-left transition-colors"
        >
          <div className="flex items-center space-x-3 text-gray-700">
            <Heart className="w-5 h-5 text-red-500" />
            <div>
              <span className="font-bold text-gray-900 block">Wishlist ({wishlist.length})</span>
              <span className="text-[10px] text-gray-500">Items saved for your pets</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>

        <button
          onClick={() => showToast('Vet Consult Support: Available 9AM - 9PM')}
          className="w-full p-3.5 flex items-center justify-between hover:bg-gray-50 text-left transition-colors"
        >
          <div className="flex items-center space-x-3 text-gray-700">
            <PhoneCall className="w-5 h-5 text-green-600" />
            <div>
              <span className="font-bold text-gray-900 block">24/7 Vet & Dietitian Support</span>
              <span className="text-[10px] text-gray-500">Talk to certified veterinarian nutritionists</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>

        <button
          onClick={() => showToast('Petszoo 24x7 Help Center is ready to assist you!')}
          className="w-full p-3.5 flex items-center justify-between hover:bg-gray-50 text-left transition-colors"
        >
          <div className="flex items-center space-x-3 text-gray-700">
            <HelpCircle className="w-5 h-5 text-purple-600" />
            <div>
              <span className="font-bold text-gray-900 block">Help Center & FAQ</span>
              <span className="text-[10px] text-gray-500">Delivery, returns & payment queries</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* App Version Info */}
      <div className="text-center py-6 text-gray-400 text-xs">
        <p className="font-bold text-gray-500">Petszoo Mobile v1.0.0</p>
        <p className="text-[10px] mt-0.5">Flipkart Clone for Pet Food & Aviary Supplies</p>
      </div>
    </div>
  );
};
