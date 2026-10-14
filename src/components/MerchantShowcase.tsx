import React, { useState } from 'react';
import { TOP_MERCHANTS } from '../data/merchants';
import { Merchant, JatimCity } from '../types';
import { Clock, MapPin, Search, Ticket, Users } from 'lucide-react';
import { motion } from 'motion/react';

interface MerchantShowcaseProps {
  currentCity: JatimCity;
  onOpenBooking: (merchant: Merchant) => void;
}

export const MerchantShowcase: React.FC<MerchantShowcaseProps> = ({
  currentCity,
  onOpenBooking
}) => {
  const [cityFilter, setCityFilter] = useState<'ALL' | 'SURABAYA' | 'MALANG'>(
    currentCity === 'MALANG' ? 'MALANG' : currentCity === 'SURABAYA' ? 'SURABAYA' : 'ALL'
  );
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredMerchants = TOP_MERCHANTS.filter((m) => {
    // City filter
    if (cityFilter !== 'ALL' && m.city !== cityFilter) return false;
    // Category filter
    if (categoryFilter !== 'all' && m.categoryTag !== categoryFilter) return false;
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = m.name.toLowerCase().includes(q);
      const matchLoc = m.location.toLowerCase().includes(q);
      const matchDish = m.signatureDish.toLowerCase().includes(q);
      if (!matchName && !matchLoc && !matchDish) return false;
    }
    return true;
  });

  return (
    <section id="merchants" className="py-16 sm:py-24 border-b border-white/10 bg-[#0B0D12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-emerald-400">
                LIVE QUEQ WAITING LIST // REAL-TIME MONITOR
              </span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight uppercase">
              STATUS ANTREAN <span className="text-amber-400">RESTORAN</span>
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-zinc-400">
              Lihat nomor yang sedang dipanggil saat ini & ambil antrean remote untuk mengamankan meja Anda.
            </p>
          </div>

          {/* City Filter Pills */}
          <div className="flex items-center bg-zinc-900 border border-white/10 p-1 rounded-xl font-mono-code text-xs">
            <button
              onClick={() => setCityFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                cityFilter === 'ALL' ? 'bg-amber-400 text-black font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              SEMUA
            </button>
            <button
              onClick={() => setCityFilter('SURABAYA')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                cityFilter === 'SURABAYA' ? 'bg-amber-400 text-black font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              SURABAYA
            </button>
            <button
              onClick={() => setCityFilter('MALANG')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                cityFilter === 'MALANG' ? 'bg-amber-400 text-black font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              MALANG
            </button>
          </div>
        </div>

        {/* Search Bar & Quick Categories */}
        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari resto (contoh: Sinjay, Sego Resek, Bakso President...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-400 font-mono-code"
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none font-mono-code text-[11px]">
            {[
              { id: 'all', label: '🔥 Semua Viral' },
              { id: 'bebek', label: '🍗 Bebek & Nasi' },
              { id: 'sate', label: '🍢 Sate & Daging' },
              { id: 'bakso', label: '🍲 Bakso Kuah' },
              { id: 'cafe', label: '☕ Cafe & Dessert' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all border ${
                  categoryFilter === cat.id
                    ? 'border-amber-400 bg-amber-400 text-black font-bold shadow-sm'
                    : 'border-white/10 bg-zinc-900/60 text-zinc-400 hover:text-white hover:border-white/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* Merchant Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMerchants.map((merchant) => (
            <motion.article
              key={merchant.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-[#12141C] border border-white/10 hover:border-amber-400/70 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xl group hover:shadow-amber-400/5"
            >
              {/* Card Photo Header */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900">
                <img
                  src={merchant.imageUrl}
                  alt={merchant.name}
                  className="w-full h-full object-cover object-center filter contrast-110 brightness-90 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12141C] via-[#12141C]/30 to-transparent" />

                {/* Distance & City Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="bg-black/80 backdrop-blur-md border border-white/20 text-white font-mono-code text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    {merchant.distanceKm} km
                  </span>
                  <span className="bg-amber-400 text-black font-mono-code font-bold text-[10px] px-2 py-0.5 rounded-full uppercase">
                    {merchant.city}
                  </span>
                </div>

                {/* Open Status Badge */}
                <div className="absolute top-3 right-3">
                  <span className="bg-emerald-500/90 text-black font-mono-code font-bold text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
                    <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
                    ANTREAN BUKA
                  </span>
                </div>

                {/* Title & Signature Dish on image */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-display font-extrabold text-2xl text-white tracking-tight uppercase drop-shadow-md">
                    {merchant.name}
                  </h3>
                  <p className="text-xs text-zinc-300 truncate">
                    {merchant.signatureDish}
                  </p>
                </div>
              </div>

              {/* QueQ Real-Time Queue Stats Box */}
              <div className="p-4 sm:p-5 space-y-4">
                
                {/* 3 Metrics Box */}
                <div className="bg-[#0A0C10] border border-white/10 rounded-xl p-3 grid grid-cols-3 gap-2 text-center font-mono-code">
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase block">Dipanggil</span>
                    <span className="text-sm sm:text-base font-bold text-emerald-400">
                      {merchant.currentCallingNumber}
                    </span>
                  </div>
                  <div className="border-x border-white/10">
                    <span className="text-[10px] text-zinc-500 uppercase block">Menunggu</span>
                    <span className="text-sm sm:text-base font-bold text-amber-400">
                      {merchant.totalQueuesWaiting} Meja
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase block">Estimasi</span>
                    <span className="text-sm sm:text-base font-bold text-white">
                      ~{Math.round(merchant.totalQueuesWaiting * 3.5)} Mnt
                    </span>
                  </div>
                </div>

                {/* 1 Big Direct Action Button */}
                <button
                  onClick={() => onOpenBooking(merchant)}
                  className="w-full py-3.5 px-4 bg-amber-400 hover:bg-amber-300 text-black font-display font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-amber-400/10 flex items-center justify-center gap-2 active:scale-95"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Ambil Nomor Antrean</span>
                </button>

              </div>
            </motion.article>
          ))}
        </div>

        {/* Empty Search State */}
        {filteredMerchants.length === 0 && (
          <div className="text-center py-12 text-zinc-500 font-mono-code text-xs">
            Tidak ditemukan restoran yang sesuai dengan pencarian Anda. Coba kata kunci lain.
          </div>
        )}

      </div>
    </section>
  );
};
