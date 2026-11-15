'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Package,
  Inbox,
  Check,
  X,
  Trash2,
  ArrowUpRight,
  PlusCircle,
} from 'lucide-react';
import { IListing, IOffer } from '@/types';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'listings' | 'offers'>('listings');
  const [listings, setListings] = useState<IListing[]>([]);
  const [offers, setOffers] = useState<IOffer[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [resListings, resOffers] = await Promise.all([
        fetch('/api/listings'),
        fetch('/api/offers'),
      ]);

      if (resListings.ok) {
        const dataListings = await resListings.json();
        setListings(dataListings);
      }
      if (resOffers.ok) {
        const dataOffers = await resOffers.json();
        setOffers(dataOffers);
      }
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateListingStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/listings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setListings((prev) =>
          prev.map((item) => (item._id === id ? { ...item, status: status as any } : item))
        );
      }
    } catch (err) {
      alert('Failed to update listing status');
    }
  };

  const handleDeleteListing = async (id: string) => {
    if (!confirm('Are you sure you want to delete this listing?')) return;
    try {
      const res = await fetch(`/api/listings/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setListings((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      alert('Failed to delete listing');
    }
  };

  const handleUpdateOfferStatus = async (id: string, status: 'Accepted' | 'Rejected') => {
    try {
      const res = await fetch(`/api/offers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setOffers((prev) =>
          prev.map((offer) => (offer._id === id ? { ...offer, status } : offer))
        );
      }
    } catch (err) {
      alert('Failed to update offer status');
    }
  };

  const handleDeleteOffer = async (id: string) => {
    if (!confirm('Remove this offer?')) return;
    try {
      const res = await fetch(`/api/offers/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setOffers((prev) => prev.filter((offer) => offer._id !== id));
      }
    } catch (err) {
      alert('Failed to delete offer');
    }
  };

  const activeCount = listings.filter((l) => l.status === 'Available').length;
  const soldCount = listings.filter((l) => l.status === 'Sold').length;
  const pendingOffersCount = offers.filter((o) => o.status === 'Pending').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Seller Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage your campus listings and respond to buyer enquiries.
          </p>
        </div>

        <Link
          href="/sell"
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-200 transition"
        >
          <PlusCircle className="w-4 h-4" />
          Create New Listing
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500">Active Listings</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{activeCount}</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500">Items Sold</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">{soldCount}</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500">Pending Offers</div>
          <div className="text-2xl font-black text-indigo-600 mt-1">{pendingOffersCount}</div>
        </div>
      </div>

      <div className="flex items-center gap-2 border-b border-slate-200 pb-px mb-6">
        <button
          onClick={() => setActiveTab('listings')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-t-xl transition ${
            activeTab === 'listings'
              ? 'bg-white border-t border-x border-slate-200 text-indigo-600 shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Package className="w-4 h-4" />
          My Listings ({listings.length})
        </button>

        <button
          onClick={() => setActiveTab('offers')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-t-xl transition relative ${
            activeTab === 'offers'
              ? 'bg-white border-t border-x border-slate-200 text-indigo-600 shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Inbox className="w-4 h-4" />
          Offers & Enquiries ({offers.length})
          {pendingOffersCount > 0 && (
            <span className="bg-indigo-600 text-white text-[10px] px-1.5 py-0.2 rounded-full">
              {pendingOffersCount}
            </span>
          )}
        </button>
      </div>

      {loading ? (
        <div className="py-16 text-center text-slate-500 text-sm">
          <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-3"></div>
          Loading your dashboard...
        </div>
      ) : activeTab === 'listings' ? (
        listings.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <Package className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No listings posted yet</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">Post your first textbook, calculator, or dorm item.</p>
            <Link
              href="/sell"
              className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl inline-block"
            >
              Post an Item
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {listings.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover bg-slate-100 flex-shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {item.category}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          item.status === 'Sold'
                            ? 'bg-rose-100 text-rose-700'
                            : item.status === 'Reserved'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <Link
                      href={`/listings/${item._id}`}
                      className="font-bold text-slate-900 hover:text-indigo-600 text-sm sm:text-base line-clamp-1"
                    >
                      {item.title}
                    </Link>

                    <div className="text-xs text-slate-500 mt-0.5">
                      Price: <strong className="text-slate-800">${item.price}</strong> • Location: {item.location}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  {item.status !== 'Sold' ? (
                    <button
                      onClick={() => handleUpdateListingStatus(item._id!, 'Sold')}
                      className="px-3 py-1.5 text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition"
                    >
                      Mark as Sold
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUpdateListingStatus(item._id!, 'Available')}
                      className="px-3 py-1.5 text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg transition"
                    >
                      Relist as Available
                    </button>
                  )}

                  <Link
                    href={`/listings/${item._id}`}
                    className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition"
                    title="View item"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => handleDeleteListing(item._id!)}
                    className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition"
                    title="Delete listing"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        offers.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <Inbox className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No offers received yet</h3>
            <p className="text-xs text-slate-500 mt-1">When students send an offer on your items, they will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {offers.map((offer) => {
              const listingItem = typeof offer.listingId === 'object' ? (offer.listingId as IListing) : null;
              return (
                <div
                  key={offer._id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          offer.status === 'Accepted'
                            ? 'bg-emerald-100 text-emerald-700'
                            : offer.status === 'Rejected'
                            ? 'bg-rose-100 text-rose-700'
                            : 'bg-indigo-100 text-indigo-700'
                        }`}
                      >
                        {offer.status}
                      </span>

                      {listingItem && (
                        <Link
                          href={`/listings/${listingItem._id}`}
                          className="text-xs font-semibold text-slate-700 hover:text-indigo-600 flex items-center gap-1"
                        >
                          For: {listingItem.title}
                          <ArrowUpRight className="w-3 h-3" />
                        </Link>
                      )}
                    </div>

                    <div>
                      <div className="text-sm font-bold text-slate-900">
                        {offer.buyerName} offered <span className="text-indigo-600 text-base font-extrabold">${offer.offerPrice}</span>
                        {listingItem && (
                          <span className="text-xs text-slate-400 font-normal ml-2">
                            (Listed at ${listingItem.price})
                          </span>
                        )}
                      </div>

                      {offer.message && (
                        <p className="text-xs text-slate-600 italic bg-slate-50 p-2.5 rounded-lg border border-slate-100 mt-1.5">
                          &ldquo;{offer.message}&rdquo;
                        </p>
                      )}
                    </div>

                    <div className="text-xs text-slate-500 flex flex-wrap items-center gap-3">
                      <span>Email: <a href={`mailto:${offer.buyerEmail}`} className="text-indigo-600 hover:underline">{offer.buyerEmail}</a></span>
                      {offer.buyerPhone && <span>Phone: {offer.buyerPhone}</span>}
                      <span>Date: {offer.createdAt ? new Date(offer.createdAt).toLocaleDateString() : 'Recent'}</span>
                    </div>

                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center">
                    {offer.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => handleUpdateOfferStatus(offer._id!, 'Accepted')}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm transition"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Accept Offer
                        </button>
                        <button
                          onClick={() => handleUpdateOfferStatus(offer._id!, 'Rejected')}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg transition"
                        >
                          <X className="w-3.5 h-3.5" />
                          Reject
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => handleDeleteOffer(offer._id!)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition"
                      title="Remove offer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )
      )}

    </div>
  );
}
