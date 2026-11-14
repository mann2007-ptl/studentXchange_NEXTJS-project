'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ListingCard from '@/components/ListingCard';
import { IListing } from '@/types';
import {
  BookOpen,
  Laptop,
  Armchair,
  PenTool,
  Bike,
  Sparkles,
  SlidersHorizontal,
  PackageOpen,
} from 'lucide-react';

const CATEGORIES = [
  { label: 'All Items', value: 'All', icon: Sparkles },
  { label: 'Books', value: 'Books', icon: BookOpen },
  { label: 'Electronics', value: 'Electronics', icon: Laptop },
  { label: 'Furniture', value: 'Furniture', icon: Armchair },
  { label: 'Stationery', value: 'Stationery', icon: PenTool },
  { label: 'Transport', value: 'Transport', icon: Bike },
  { label: 'Other', value: 'Other', icon: SlidersHorizontal },
];

function MarketplaceContent() {
  const searchParams = useSearchParams();
  const querySearch = searchParams.get('search') || '';

  const [listings, setListings] = useState<IListing[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCondition, setSelectedCondition] = useState<string>('All');
  const [selectedSort, setSelectedSort] = useState<string>('newest');
  const [loading, setLoading] = useState<boolean>(true);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (querySearch) params.set('search', querySearch);
      if (selectedCategory !== 'All') params.set('category', selectedCategory);
      if (selectedCondition !== 'All') params.set('condition', selectedCondition);
      if (selectedSort !== 'newest') params.set('sort', selectedSort);

      const res = await fetch(`/api/listings?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setListings(data);
      }
    } catch (err) {
      console.error('Failed to fetch listings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [querySearch, selectedCategory, selectedCondition, selectedSort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Campus Marketplace
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Buy, sell, or exchange study materials, tech, and dorm items with fellow students.
        </p>

        {querySearch && (
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-lg text-xs font-semibold">
            <span>Search results for: &ldquo;{querySearch}&rdquo;</span>
            <a href="/" className="hover:text-indigo-900 ml-1">✕ Clear</a>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 scale-105'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 mb-8">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-500">Filter by:</span>

          <select
            value={selectedCondition}
            onChange={(e) => setSelectedCondition(e.target.value)}
            className="text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Conditions</option>
            <option value="Brand New">Brand New</option>
            <option value="Like New">Like New</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Sort by:</span>
          <select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
            className="text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500"
          >
            <option value="newest">Newest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-4 animate-pulse">
              <div className="aspect-[4/3] bg-slate-200 rounded-xl mb-4"></div>
              <div className="h-4 bg-slate-200 rounded w-1/3 mb-2"></div>
              <div className="h-5 bg-slate-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-slate-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : listings.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
            <PackageOpen className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No listings found</h3>
          <p className="text-slate-500 text-xs mt-1 mb-5">
            Try adjusting your search filter, or click below to populate the database with demo campus items.
          </p>
          <button
            onClick={async () => {
              await fetch('/api/seed', { method: 'POST' });
              fetchListings();
            }}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition"
          >
            Load Demo Campus Items
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {listings.map((item) => (
            <ListingCard key={item._id} listing={item} />
          ))}
        </div>
      )}

    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm text-slate-500">Loading marketplace...</div>}>
      <MarketplaceContent />
    </Suspense>
  );
}
