import React, { useState } from 'react';
import { TOP_MERCHANTS } from '../data/merchants';
import { Merchant, JatimCity } from '../types';
import { MapPin, Search, Ticket, Sparkles, Coffee, Crown, Flame, Quote, UtensilsCrossed } from 'lucide-react';
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
    
    // Category / Style filter
    if (categoryFilter !== 'all') {
      if (categoryFilter === 'fancy') {
        if (m.categoryTag !== 'fancy' && m.diningStyle !== 'Fancy & Fine Dining') return false;
      } else if (categoryFilter === 'cafe') {
        if (m.categoryTag !== 'cafe' && m.diningStyle !== 'Cafe & Dessert') return false;
      } else if (categoryFilter === 'legendary') {
        if (m.categoryTag !== 'legendary' && m.diningStyle !== 'Legendaris & Heritage') return false;
      } else if (categoryFilter === 'bebek') {
        if (m.categoryTag !== 'bebek') return false;
      } else if (categoryFilter === 'rawon') {
        if (m.categoryTag !== 'rawon') return false;
      } else if (categoryFilter === 'bakso_sate') {
        if (m.categoryTag !== 'bakso' && m.categoryTag !== 'sate') return false;
      }
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = m.name.toLowerCase().includes(q);
      const matchLoc = m.location.toLowerCase().includes(q);
      const matchDish = m.signatureDish.toLowerCase().includes(q);
      const matchCategory = m.category.toLowerCase().includes(q);
      const matchBadge = m.badge.toLowerCase().includes(q);
      if (!matchName && !matchLoc && !matchDish && !matchCategory && !matchBadge) return false;
    }
    return true;
  });

  const categoryChips = [
    { id: 'all', label: 'Semua Resto', icon: Flame, count: TOP_MERCHANTS.length },
    { id: 'fancy', label: 'Fancy & Fine Dining', icon: Sparkles, count: TOP_MERCHANTS.filter(m => m.categoryTag === 'fancy' || m.diningStyle === 'Fancy & Fine Dining').length },
    { id: 'cafe', label: 'Cafe & Dessert Hits', icon: Coffee, count: TOP_MERCHANTS.filter(m => m.categoryTag === 'cafe' || m.diningStyle === 'Cafe & Dessert').length },
    { id: 'legendary', label: 'Legendaris & Heritage', icon: Crown, count: TOP_MERCHANTS.filter(m => m.categoryTag === 'legendary' || m.diningStyle === 'Legendaris & Heritage').length },
    { id: 'bebek', label: 'Bebek & Ayam', icon: UtensilsCrossed, count: TOP_MERCHANTS.filter(m => m.categoryTag === 'bebek').length },
    { id: 'rawon', label: 'Rawon & Kuah', icon: Flame, count: TOP_MERCHANTS.filter(m => m.categoryTag === 'rawon').length },
    { id: 'bakso_sate', label: 'Bakso & Sate', icon: UtensilsCrossed, count: TOP_MERCHANTS.filter(m => m.categoryTag === 'bakso' || m.categoryTag === 'sate').length },
  ];

  return (
    <section id="merchants" className="py-16 sm:py-24 border-b border-white/10 bg-[#0B0D12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-emerald-400">
                LIVE QUEQ WAITING LIST // REAL-TIME MONITOR JATIM
              </span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight uppercase">
              STATUS ANTREAN <span className="text-amber-400">RESTORAN</span>
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-zinc-400 max-w-2xl">
              Mulai dari <span className="text-amber-300 font-semibold">Fine Dining Mewah</span>, <span className="text-rose-300 font-semibold">Aesthetic Cafe</span>, hingga <span className="text-emerald-300 font-semibold">Kuliner Legendaris Jatim</span>. Amankan nomor antrean sebelum datang!
            </p>
          </div>

          {/* City Filter Pills */}
          <div className="flex items-center bg-zinc-900 border border-white/10 p-1 rounded-xl font-mono-code text-xs self-start md:self-auto">
            <button
              onClick={() => setCityFilter('ALL')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors font-medium ${
                cityFilter === 'ALL' ? 'bg-amber-400 text-black font-bold shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              SEMUA ({TOP_MERCHANTS.length})
            </button>
            <button
              onClick={() => setCityFilter('SURABAYA')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors font-medium ${
                cityFilter === 'SURABAYA' ? 'bg-amber-400 text-black font-bold shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              SURABAYA ({TOP_MERCHANTS.filter(m => m.city === 'SURABAYA').length})
            </button>
            <button
              onClick={() => setCityFilter('MALANG')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors font-medium ${
                cityFilter === 'MALANG' ? 'bg-amber-400 text-black font-bold shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              MALANG ({TOP_MERCHANTS.filter(m => m.city === 'MALANG').length})
            </button>
          </div>
        </div>

        {/* Search Bar & Quick Categories */}
        <div className="mt-6 flex flex-col gap-4">
          
          {/* Search Box & Summary Count */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-lg">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari resto, hidangan, atau area (cth: De Soematra, Toko Oen, Rawon, Sinjay...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900 border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-400 font-mono-code transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white text-xs"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="text-zinc-400 font-mono-code text-xs">
              Menampilkan <span className="text-amber-400 font-bold">{filteredMerchants.length}</span> dari {TOP_MERCHANTS.length} restoran favorit
            </div>
          </div>

          {/* Category Chips Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none font-mono-code text-[11px]">
            {categoryChips.map((cat) => {
              const Icon = cat.icon;
              const isActive = categoryFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all border flex items-center gap-1.5 ${
                    isActive
                      ? 'border-amber-400 bg-amber-400 text-black font-bold shadow-md shadow-amber-400/10'
                      : 'border-white/10 bg-zinc-900/80 text-zinc-300 hover:text-white hover:border-white/20'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-amber-400'}`} />
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-black/20 text-black font-bold' : 'bg-white/10 text-zinc-400'}`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Merchant Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMerchants.map((merchant) => {
            const isFancy = merchant.diningStyle === 'Fancy & Fine Dining' || merchant.categoryTag === 'fancy';
            const isCafe = merchant.diningStyle === 'Cafe & Dessert' || merchant.categoryTag === 'cafe';

            return (
              <motion.article
                key={merchant.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className={`bg-[#12141C] border rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xl group hover:shadow-2xl ${
                  isFancy 
                    ? 'border-amber-400/40 hover:border-amber-400 hover:shadow-amber-400/10' 
                    : isCafe 
                    ? 'border-rose-400/30 hover:border-rose-400/80 hover:shadow-rose-400/10'
                    : 'border-white/10 hover:border-amber-400/70 hover:shadow-amber-400/5'
                }`}
              >
                {/* Card Photo Header */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900">
                  <img
                    src={merchant.imageUrl}
                    alt={merchant.name}
                    className="w-full h-full object-cover object-center filter contrast-110 brightness-90 group-hover:scale-105 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12141C] via-[#12141C]/40 to-transparent" />

                  {/* Top Badges Row */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="bg-black/80 backdrop-blur-md border border-white/20 text-white font-mono-code text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-400" />
                        {merchant.distanceKm} km
                      </span>
                      <span className="bg-amber-400 text-black font-mono-code font-bold text-[10px] px-2 py-0.5 rounded-full uppercase">
                        {merchant.city}
                      </span>
                      {merchant.priceRange && (
                        <span className="bg-zinc-900/90 text-emerald-400 border border-emerald-400/30 font-mono-code font-bold text-[10px] px-2 py-0.5 rounded-full">
                          {merchant.priceRange}
                        </span>
                      )}
                    </div>

                    {/* Dining Style Tag */}
                    <div>
                      {isFancy && (
                        <span className="bg-gradient-to-r from-amber-500 to-yellow-300 text-black font-mono-code font-bold text-[9px] px-2 py-0.5 rounded-full uppercase flex items-center gap-1 shadow-sm">
                          <Sparkles className="w-2.5 h-2.5" />
                          FANCY
                        </span>
                      )}
                      {isCafe && (
                        <span className="bg-rose-500/90 text-white font-mono-code font-bold text-[9px] px-2 py-0.5 rounded-full uppercase flex items-center gap-1 shadow-sm">
                          <Coffee className="w-2.5 h-2.5" />
                          CAFE
                        </span>
                      )}
                      {!isFancy && !isCafe && (
                        <span className="bg-zinc-800/90 border border-white/20 text-amber-300 font-mono-code font-bold text-[9px] px-2 py-0.5 rounded-full uppercase flex items-center gap-1">
                          <Crown className="w-2.5 h-2.5 text-amber-400" />
                          LEGENDA
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Signature Dish on image */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="text-[10px] font-mono-code text-amber-400 font-semibold tracking-wider uppercase mb-0.5">
                      {merchant.badge}
                    </div>
                    <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight uppercase drop-shadow-md">
                      {merchant.name}
                    </h3>
                    <p className="text-xs text-zinc-300 truncate mt-0.5">
                      {merchant.signatureDish}
                    </p>
                  </div>
                </div>

                {/* Card Content & Queue Stats */}
                <div className="p-4 sm:p-5 space-y-3.5 flex-1 flex flex-col justify-between">
                  
                  {/* Local Quote / Signature review */}
                  {merchant.localQuote && (
                    <div className="bg-zinc-900/60 border border-white/5 rounded-xl p-2.5 flex items-start gap-2">
                      <Quote className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5 rotate-180" />
                      <p className="text-[11px] text-zinc-400 italic line-clamp-2 leading-relaxed">
                        "{merchant.localQuote}"
                      </p>
                    </div>
                  )}

                  {/* 3 Metrics Box */}
                  <div className="bg-[#0A0C10] border border-white/10 rounded-xl p-2.5 grid grid-cols-3 gap-2 text-center font-mono-code">
                    <div>
                      <span className="text-[9px] text-zinc-500 uppercase block">Dipanggil</span>
                      <span className="text-sm font-bold text-emerald-400">
                        {merchant.currentCallingNumber}
                      </span>
                    </div>
                    <div className="border-x border-white/10">
                      <span className="text-[9px] text-zinc-500 uppercase block">Menunggu</span>
                      <span className="text-sm font-bold text-amber-400">
                        {merchant.totalQueuesWaiting} Meja
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] text-zinc-500 uppercase block">Estimasi</span>
                      <span className="text-sm font-bold text-white">
                        ~{Math.round(merchant.totalQueuesWaiting * 3.5)} Mnt
                      </span>
                    </div>
                  </div>

                  {/* Direct Action Button */}
                  <button
                    onClick={() => onOpenBooking(merchant)}
                    className="w-full py-3 px-4 bg-amber-400 hover:bg-amber-300 text-black font-display font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-amber-400/10 flex items-center justify-center gap-2 active:scale-95"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>Ambil Nomor Antrean</span>
                  </button>

                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Empty Search State */}
        {filteredMerchants.length === 0 && (
          <div className="text-center py-16 bg-zinc-900/30 border border-white/10 rounded-2xl mt-8">
            <UtensilsCrossed className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-white font-bold text-base font-display uppercase">Restoran Tidak Ditemukan</h3>
            <p className="text-zinc-500 font-mono-code text-xs mt-1">
              Tidak ada restoran yang cocok dengan pencarian "{searchQuery}". Coba kata kunci lain atau reset filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('all');
                setCityFilter('ALL');
              }}
              className="mt-4 px-4 py-2 bg-amber-400 text-black font-bold font-mono-code text-xs rounded-lg hover:bg-amber-300"
            >
              Reset Semua Filter
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
