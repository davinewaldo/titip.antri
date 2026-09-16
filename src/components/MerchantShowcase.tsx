import React, { useState } from 'react';
import { TOP_MERCHANTS } from '../data/merchants';
import { Merchant, JatimCity } from '../types';
import { Clock, ChevronLeft, ChevronRight, ArrowUpRight, Sparkles, MapPin, Quote } from 'lucide-react';
import { motion } from 'motion/react';

interface MerchantShowcaseProps {
  currentCity: JatimCity;
  onSelectMerchant: (merchantName: string) => void;
}

export const MerchantShowcase: React.FC<MerchantShowcaseProps> = ({ currentCity, onSelectMerchant }) => {
  const [cityFilter, setCityFilter] = useState<'ALL' | 'SURABAYA' | 'MALANG'>(
    currentCity === 'MALANG' ? 'MALANG' : currentCity === 'SURABAYA' ? 'SURABAYA' : 'ALL'
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  const displayedMerchants = TOP_MERCHANTS.filter((m) => {
    if (cityFilter === 'ALL') return true;
    return m.city === cityFilter;
  });

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % displayedMerchants.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + displayedMerchants.length) % displayedMerchants.length);
  };

  return (
    <section id="merchants" className="py-20 sm:py-28 border-b border-white/10 bg-[#0C0E12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with City Filter and Carousel Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 bg-amber-400" />
              <span className="text-xs font-mono-code font-bold uppercase tracking-widest text-amber-400">
                03 // CURATED TOP MERCHANTS (EAST JAVA EDITION)
              </span>
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
              KULINER LEGENDARIS &<br />
              <span className="text-amber-400">VIRAL JAWA TIMUR</span>
            </h2>
          </div>

          {/* City Filter Pills & Navigation Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center bg-zinc-900 border border-white/10 p-1 font-mono-code text-xs">
              <button
                onClick={() => setCityFilter('ALL')}
                className={`px-3 py-1.5 transition-colors ${
                  cityFilter === 'ALL' ? 'bg-amber-400 text-black font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                KABEH JATIM
              </button>
              <button
                onClick={() => setCityFilter('SURABAYA')}
                className={`px-3 py-1.5 transition-colors ${
                  cityFilter === 'SURABAYA' ? 'bg-amber-400 text-black font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                SURABAYA
              </button>
              <button
                onClick={() => setCityFilter('MALANG')}
                className={`px-3 py-1.5 transition-colors ${
                  cityFilter === 'MALANG' ? 'bg-amber-400 text-black font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                MALANG
              </button>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={prevSlide}
                aria-label="Merchant sebelumnya"
                className="p-3 border border-white/10 bg-zinc-900 text-zinc-300 hover:text-white hover:border-amber-400 rounded-none transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Merchant berikutnya"
                className="p-3 border border-white/10 bg-zinc-900 text-zinc-300 hover:text-white hover:border-amber-400 rounded-none transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Magazine Cover Carousel Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedMerchants.map((merchant, idx) => {
            const isFeatured = idx === currentIndex;

            return (
              <motion.article
                key={merchant.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`group relative flex flex-col justify-between overflow-hidden border transition-all duration-300 ${
                  isFeatured
                    ? 'border-amber-400/90 shadow-2xl shadow-amber-400/10'
                    : 'border-white/10 hover:border-white/40'
                } bg-zinc-950`}
              >
                {/* Magazine Visual Header Image */}
                <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden bg-zinc-900">
                  <img
                    src={merchant.imageUrl}
                    alt={merchant.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center filter contrast-110 brightness-90 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700"
                  />
                  {/* High contrast gradient overlay for magazine readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
                  
                  {/* Editorial Magazine Badge */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <span className="bg-amber-400 text-black font-mono-code font-bold text-[10px] uppercase px-2 py-1 tracking-wider">
                      {merchant.badge}
                    </span>
                    <span className="bg-black/80 backdrop-blur-md border border-white/20 text-zinc-300 font-mono-code text-[10px] px-2 py-1">
                      {merchant.city} REGION
                    </span>
                  </div>

                  {/* Wait Time Gauge & Crowd Indicator */}
                  <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1.5 bg-black/85 backdrop-blur-md border border-red-500/40 px-2.5 py-1 text-xs font-mono-code font-bold text-red-400">
                      <Clock className="w-3.5 h-3.5 animate-spin" />
                      <span>{merchant.avgWaitMinutes} MENIT</span>
                    </div>
                    <span className="text-[10px] font-mono-code text-zinc-400 bg-black/60 px-1.5 py-0.5">
                      {merchant.crowdLevel}
                    </span>
                  </div>

                  {/* Magazine Cover Title & Category Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <span className="text-[11px] font-mono-code uppercase tracking-widest text-amber-300">
                      {merchant.category}
                    </span>
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-tight uppercase mt-0.5">
                      {merchant.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-zinc-300 mt-1">
                      <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                      <span className="truncate">{merchant.location}</span>
                    </div>
                  </div>
                </div>

                {/* Magazine Editorial Body & Details */}
                <div className="p-5 sm:p-6 bg-[#0E1014] border-t border-white/10 space-y-4">
                  <div>
                    <span className="text-[10px] font-mono-code uppercase text-zinc-500 block mb-1">
                      MENU WAJIB COBA:
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-200 font-semibold italic">
                      "{merchant.signatureDish}"
                    </p>
                  </div>

                  {merchant.localQuote && (
                    <div className="p-2.5 border-l-2 border-amber-400/80 bg-zinc-900/60 text-xs text-amber-200/90 font-light italic">
                      "{merchant.localQuote}"
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[11px] font-mono-code text-zinc-400 pt-1 border-t border-white/5">
                    <span>Tingkat Antrean:</span>
                    <span className="text-amber-400 font-bold">{merchant.queueDifficulty}</span>
                  </div>

                  {/* Direct Action Button */}
                  <button
                    onClick={() => {
                      onSelectMerchant(`${merchant.name} (${merchant.city})`);
                      const el = document.getElementById('pricing');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-zinc-900 hover:bg-amber-400 text-zinc-200 hover:text-black border border-white/15 hover:border-amber-400 py-3 text-xs font-mono-code font-bold uppercase tracking-wider transition-all active:scale-95"
                  >
                    <span>Titip Resto Iki Saiki</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Footnote */}
        <div className="mt-12 p-4 border border-white/10 bg-zinc-950/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-code text-zinc-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Punya warung/resto langganan lain di Surabaya atau Malang? Pilot kami siap antrekan ke mana pun!</span>
          </div>
          <a
            href="#pricing"
            className="text-amber-400 hover:underline uppercase font-bold text-[11px] flex items-center gap-1"
          >
            Pesan Resto Kustom Di Bawah <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>

      </div>
    </section>
  );
};
