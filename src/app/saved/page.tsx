'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import ListingCard from '@/components/ListingCard';
import { IListing } from '@/types';

export default function SavedPage() {
  const [savedItems, setSavedItems] = useState<IListing[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSaved = () => {
    try {
      const saved = JSON.parse(localStorage.getItem('studentxchange_saved') || '[]');
      setSavedItems(saved);
    } catch (e) {
      setSavedItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSaved();
    window.addEventListener('savedItemsUpdated', loadSaved);
    return () => window.removeEventListener('savedItemsUpdated', loadSaved);
  }, []);

  const handleClearAll = () => {
    if (!confirm('Clear all saved items?')) return;
    localStorage.removeItem('studentxchange_saved');
    setSavedItems([]);
    window.dispatchEvent(new Event('savedItemsUpdated'));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 mb-6 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Marketplace
      </Link>

      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Saved Listings</h1>
          </div>
          <p className="text-slate-500 text-sm mt-1">
            Items you have bookmarked to review or contact sellers later.
          </p>
        </div>

        {savedItems.length > 0 && (
          <button
            onClick={handleClearAll}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear All
          </button>
        )}
      </div>

      {loading ? (
        <div className="py-16 text-center text-slate-500 text-sm">
          Loading saved items...
        </div>
      ) : savedItems.length === 0 ? (
        <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No saved items yet</h3>
          <p className="text-slate-500 text-xs mt-1 mb-5">
            Click the heart icon on any listing in the marketplace to save it here.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition"
          >
            <ShoppingBag className="w-4 h-4" />
            Explore Listings
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {savedItems.map((item) => (
            <ListingCard key={item._id} listing={item} />
          ))}
        </div>
      )}

    </div>
  );
}
