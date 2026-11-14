'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Heart, LayoutDashboard, PlusCircle, Sparkles, Search } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [savedCount, setSavedCount] = useState(0);
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    const updateSavedCount = () => {
      const saved = JSON.parse(localStorage.getItem('studentxchange_saved') || '[]');
      setSavedCount(saved.length);
    };

    updateSavedCount();
    window.addEventListener('storage', updateSavedCount);
    window.addEventListener('savedItemsUpdated', updateSavedCount);

    return () => {
      window.removeEventListener('storage', updateSavedCount);
      window.removeEventListener('savedItemsUpdated', updateSavedCount);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push('/');
    }
  };

  const handleSeed = async () => {
    if (!confirm('Populate database with 8 campus items and 2 sample offers?')) return;
    try {
      setSeeding(true);
      const res = await fetch('/api/seed', { method: 'POST' });
      if (res.ok) {
        alert('Database seeded successfully!');
        window.location.href = '/';
      } else {
        alert('Failed to seed database');
      }
    } catch (err) {
      alert('Error seeding database');
    } finally {
      setSeeding(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-slate-900 leading-none">
                Student<span className="text-indigo-600">Xchange</span>
              </span>
              <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Campus Market</span>
            </div>
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="Search books, calculators, bikes, furniture..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-100 hover:bg-slate-200/70 focus:bg-white text-sm text-slate-800 placeholder-slate-400 rounded-full pl-10 pr-4 py-2 border border-transparent focus:border-indigo-500 focus:outline-none transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </form>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleSeed}
              disabled={seeding}
              title="Reset with sample campus items"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              {seeding ? 'Seeding...' : 'Load Demo Data'}
            </button>

            <Link
              href="/saved"
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-700 hover:text-indigo-600 rounded-lg hover:bg-slate-100 transition relative"
            >
              <Heart className="w-4 h-4 text-rose-500" />
              <span className="hidden sm:inline">Saved</span>
              {savedCount > 0 && (
                <span className="bg-rose-500 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full">
                  {savedCount}
                </span>
              )}
            </Link>

            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-700 hover:text-indigo-600 rounded-lg hover:bg-slate-100 transition"
            >
              <LayoutDashboard className="w-4 h-4 text-indigo-600" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>

            <Link
              href="/sell"
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-sm shadow-indigo-300 hover:shadow-md transition active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Sell Item</span>
            </Link>
          </div>

        </div>

        <div className="md:hidden pb-3">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search campus items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-100 text-sm text-slate-800 placeholder-slate-400 rounded-full pl-10 pr-4 py-2 border border-slate-200 focus:outline-none focus:border-indigo-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </form>
        </div>
      </div>
    </header>
  );
}
