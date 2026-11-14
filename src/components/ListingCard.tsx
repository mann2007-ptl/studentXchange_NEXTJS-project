'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Heart, MapPin, Tag } from 'lucide-react';
import { IListing } from '@/types';

export default function ListingCard({ listing }: { listing: IListing }) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('studentxchange_saved') || '[]');
    setIsSaved(saved.some((item: any) => item._id === listing._id));
  }, [listing._id]);

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    let saved = JSON.parse(localStorage.getItem('studentxchange_saved') || '[]');
    if (isSaved) {
      saved = saved.filter((item: any) => item._id !== listing._id);
      setIsSaved(false);
    } else {
      saved.push(listing);
      setIsSaved(true);
    }
    localStorage.setItem('studentxchange_saved', JSON.stringify(saved));
    window.dispatchEvent(new Event('savedItemsUpdated'));
  };

  const getConditionColor = (cond: string) => {
    switch (cond) {
      case 'Brand New':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Like New':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Good':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const isSold = listing.status === 'Sold';
  const isReserved = listing.status === 'Reserved';

  return (
    <Link
      href={`/listings/${listing._id}`}
      className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col relative"
    >
      <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={listing.imageUrl}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80';
          }}
        />

        <button
          onClick={toggleSave}
          title={isSaved ? 'Remove from saved' : 'Save item'}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-slate-600 hover:text-rose-500 shadow-md backdrop-blur-sm transition active:scale-90"
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {isSold ? (
            <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-lg bg-rose-600 text-white shadow-sm">
              SOLD
            </span>
          ) : isReserved ? (
            <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-lg bg-amber-500 text-white shadow-sm">
              RESERVED
            </span>
          ) : listing.listingType === 'Free' ? (
            <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-lg bg-emerald-600 text-white shadow-sm">
              FREE
            </span>
          ) : listing.listingType === 'Exchange' ? (
            <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-lg bg-purple-600 text-white shadow-sm">
              EXCHANGE
            </span>
          ) : null}
        </div>

        <div className="absolute bottom-2.5 left-3">
          <span className="px-2 py-0.5 text-[11px] font-medium bg-black/60 backdrop-blur-md text-white rounded-md flex items-center gap-1">
            <Tag className="w-3 h-3" />
            {listing.category}
          </span>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <div className="text-xl font-bold text-slate-900">
              {listing.listingType === 'Free' ? (
                <span className="text-emerald-600">FREE</span>
              ) : (
                `$${listing.price}`
              )}
            </div>
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${getConditionColor(
                listing.condition
              )}`}
            >
              {listing.condition}
            </span>
          </div>

          <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition line-clamp-1 text-base">
            {listing.title}
          </h3>

          <p className="text-slate-500 text-xs line-clamp-2 mt-1">
            {listing.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1 truncate max-w-[180px]">
            <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate">{listing.location}</span>
          </div>
          <span className="font-medium text-slate-700 truncate">{listing.sellerName}</span>
        </div>
      </div>
    </Link>
  );
}
