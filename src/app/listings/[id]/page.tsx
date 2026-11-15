'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  MapPin,
  Mail,
  Phone,
  Tag,
  ShieldCheck,
  Heart,
  DollarSign,
  Share2,
} from 'lucide-react';
import { IListing } from '@/types';
import OfferModal from '@/components/OfferModal';
import ListingCard from '@/components/ListingCard';

export default function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [listing, setListing] = useState<IListing | null>(null);
  const [similarItems, setSimilarItems] = useState<IListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listings/${id}`);
        if (!res.ok) {
          router.push('/');
          return;
        }
        const data: IListing = await res.json();
        setListing(data);

        const saved = JSON.parse(localStorage.getItem('studentxchange_saved') || '[]');
        setIsSaved(saved.some((item: any) => item._id === data._id));

        const similarRes = await fetch(`/api/listings?category=${data.category}`);
        if (similarRes.ok) {
          const similarData: IListing[] = await similarRes.json();
          setSimilarItems(similarData.filter((item) => item._id !== data._id).slice(0, 4));
        }
      } catch (err) {
        console.error('Error fetching listing:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id, router]);

  const toggleSave = () => {
    if (!listing) return;
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: listing?.title,
        text: `Check out ${listing?.title} on StudentXchange!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center text-slate-500">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        Loading item details...
      </div>
    );
  }

  if (!listing) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 mb-6 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Marketplace
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        
        <div className="space-y-4">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 shadow-inner">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={listing.imageUrl}
              alt={listing.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80';
              }}
            />

            <div className="absolute top-4 left-4 flex gap-2">
              {listing.status === 'Sold' ? (
                <span className="px-3 py-1 bg-rose-600 text-white text-xs font-bold rounded-lg shadow">
                  SOLD
                </span>
              ) : listing.status === 'Reserved' ? (
                <span className="px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-lg shadow">
                  RESERVED
                </span>
              ) : null}

              {listing.listingType === 'Free' && (
                <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-lg shadow">
                  FREE
                </span>
              )}
              {listing.listingType === 'Exchange' && (
                <span className="px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-lg shadow">
                  EXCHANGE
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 px-2">
            <span>Posted: {listing.createdAt ? new Date(listing.createdAt).toLocaleDateString() : 'Recently'}</span>
            <button
              onClick={handleShare}
              className="flex items-center gap-1 text-slate-600 hover:text-indigo-600 font-medium"
            >
              <Share2 className="w-3.5 h-3.5" />
              Share listing
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 text-xs font-semibold bg-indigo-50 text-indigo-700 rounded-lg flex items-center gap-1">
                <Tag className="w-3 h-3" />
                {listing.category}
              </span>
              <span className="px-2.5 py-1 text-xs font-semibold bg-slate-100 text-slate-700 rounded-lg">
                Condition: {listing.condition}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {listing.title}
            </h1>

            <div className="text-3xl font-black text-slate-900">
              {listing.listingType === 'Free' ? (
                <span className="text-emerald-600">FREE</span>
              ) : (
                `$${listing.price}`
              )}
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-600">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>Campus Pickup: <strong className="text-slate-800">{listing.location}</strong></span>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Description</h3>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {listing.description}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2 mt-4">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Verified Student Seller</span>
              </div>
              <div className="text-sm font-bold text-slate-900">{listing.sellerName}</div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
                <a
                  href={`mailto:${listing.sellerEmail}`}
                  className="flex items-center gap-1 text-indigo-600 hover:underline"
                >
                  <Mail className="w-3.5 h-3.5" />
                  {listing.sellerEmail}
                </a>
                {listing.sellerPhone && (
                  <a
                    href={`tel:${listing.sellerPhone}`}
                    className="flex items-center gap-1 text-slate-700 hover:text-indigo-600"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    {listing.sellerPhone}
                  </a>
                )}
              </div>
            </div>

          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={listing.status === 'Sold'}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm shadow-md shadow-indigo-200 hover:shadow-lg transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <DollarSign className="w-4 h-4" />
              {listing.status === 'Sold' ? 'Item Already Sold' : 'Make an Offer / Enquire'}
            </button>

            <button
              onClick={toggleSave}
              className={`p-3 rounded-xl border transition ${
                isSaved
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              title={isSaved ? 'Remove from saved' : 'Save for later'}
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>

        </div>
      </div>

      {similarItems.length > 0 && (
        <div className="mt-14">
          <h2 className="text-xl font-bold text-slate-900 mb-6">
            Similar Items in {listing.category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {similarItems.map((item) => (
              <ListingCard key={item._id} listing={item} />
            ))}
          </div>
        </div>
      )}

      <OfferModal
        listing={listing}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

    </div>
  );
}
