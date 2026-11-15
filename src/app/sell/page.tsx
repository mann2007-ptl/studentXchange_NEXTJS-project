'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Upload, DollarSign } from 'lucide-react';

const SAMPLE_IMAGES = [
  { label: '📚 Textbook', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80' },
  { label: '💻 Electronics', url: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=800&q=80' },
  { label: '🪑 Furniture', url: 'https://images.unsplash.com/photo-1580481077195-c328a37ea71a?auto=format&fit=crop&w=800&q=80' },
  { label: '🚲 Bicycle', url: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80' },
];

export default function SellPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Books');
  const [condition, setCondition] = useState('Like New');
  const [listingType, setListingType] = useState('For Sale');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [location, setLocation] = useState('Main Campus Library');
  const [sellerName, setSellerName] = useState('');
  const [sellerEmail, setSellerEmail] = useState('');
  const [sellerPhone, setSellerPhone] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title || !description || !sellerName || !sellerEmail) {
      setError('Please fill in all required fields.');
      return;
    }

    const finalImage = imageUrl.trim() || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80';
    const finalPrice = listingType === 'Free' ? 0 : Number(price) || 0;

    try {
      setLoading(true);
      const res = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          category,
          condition,
          listingType,
          price: finalPrice,
          imageUrl: finalImage,
          location,
          sellerName,
          sellerEmail,
          sellerPhone,
          status: 'Available',
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to create listing');
      }

      const created = await res.json();
      router.push(`/listings/${created._id}`);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 mb-6 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Marketplace
      </Link>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10">
        
        <div className="border-b border-slate-100 pb-5 mb-6">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Post an Item</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            List an Item for Fellow Students
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Sell or give away unused textbooks, electronics, notes, and study supplies.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-600 font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Item Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Engineering Mathematics Textbook (8th Edition)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Books">Books & Textbooks</option>
                <option value="Electronics">Electronics & Tech</option>
                <option value="Furniture">Dorm & Furniture</option>
                <option value="Stationery">Stationery & Supplies</option>
                <option value="Transport">Bikes & Transport</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Item Condition *
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Brand New">Brand New (Unopened)</option>
                <option value="Like New">Like New (Barely used)</option>
                <option value="Good">Good (Minor wear)</option>
                <option value="Fair">Fair (Noticeable wear)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Listing Type *
              </label>
              <select
                value={listingType}
                onChange={(e) => setListingType(e.target.value)}
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-indigo-500"
              >
                <option value="For Sale">For Sale</option>
                <option value="Free">Free (Giving Away)</option>
                <option value="Exchange">Open to Exchange</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Price ($) *
              </label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  min="0"
                  disabled={listingType === 'Free'}
                  placeholder={listingType === 'Free' ? '0' : '25'}
                  value={listingType === 'Free' ? '0' : price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full text-sm pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 disabled:bg-slate-100 disabled:text-slate-400 font-bold"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Description *
            </label>
            <textarea
              rows={4}
              required
              placeholder="Describe the condition, edition, reason for selling, or any included accessories..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Image URL
            </label>
            <input
              type="url"
              placeholder="Paste an image URL (e.g. from Unsplash or online image)"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500"
            />

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-slate-500">Quick sample photos:</span>
              {SAMPLE_IMAGES.map((sample) => (
                <button
                  key={sample.label}
                  type="button"
                  onClick={() => setImageUrl(sample.url)}
                  className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition"
                >
                  {sample.label}
                </button>
              ))}
            </div>

            {imageUrl && (
              <div className="mt-4 relative aspect-[16/9] max-w-xs rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 text-white text-[10px] rounded">
                  Live Preview
                </span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Campus Pickup Location *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Main Library 1st Floor / Hostel 4 Common Room"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-4">
            <h3 className="text-sm font-bold text-slate-800">Your Contact Details</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Rahul Sharma"
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                  className="w-full text-sm px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">University Email *</label>
                <input
                  type="email"
                  required
                  placeholder="student@univ.edu"
                  value={sellerEmail}
                  onChange={(e) => setSellerEmail(e.target.value)}
                  className="w-full text-sm px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  placeholder="9876543210"
                  value={sellerPhone}
                  onChange={(e) => setSellerPhone(e.target.value)}
                  className="w-full text-sm px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <Link
              href="/"
              className="px-5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-200 hover:shadow-lg transition active:scale-95 disabled:opacity-50"
            >
              <Upload className="w-4 h-4" />
              {loading ? 'Publishing...' : 'Publish Listing'}
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}
