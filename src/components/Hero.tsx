import React, { useState } from 'react';
import { ArrowDown, Zap, Compass, Play, Pause, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { JatimCity } from '../types';

interface HeroProps {
  currentCity: JatimCity;
  onSelectCity: (city: JatimCity) => void;
  onExploreMerchants: () => void;
}

export const Hero: React.FC<HeroProps> = ({ currentCity, onSelectCity, onExploreMerchants }) => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(true);

  return (
    <section className="relative min-h-[90vh] lg:min-h-[94vh] flex flex-col justify-between border-b border-white/10 bg-[#090A0C] overflow-hidden">
      
      {/* Cinematic Dark Background Layer (Suramadu / Ijen Boulevard Night Atmosphere) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          src={
            currentCity === 'MALANG'
              ? 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1920&auto=format&fit=crop'
              : 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1920&auto=format&fit=crop'
          }
          alt="Atmospheric night urban scene in East Java"
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover object-center opacity-25 filter contrast-125 brightness-75 transition-transform duration-1000 ${
            isPlayingVideo ? 'scale-105' : 'scale-100'
          }`}
        />
        {/* Editorial Gradients & Noise Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090A0C] via-[#090A0C]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090A0C] via-[#090A0C]/65 to-transparent" />
        <div className="absolute inset-0 bg-noise opacity-40" />
      </div>

      {/* Top Banner Tagline & Coordinates (Editorial Brutalism) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 bg-amber-400" />
          <span className="text-[11px] sm:text-xs font-mono-code font-bold uppercase tracking-widest text-zinc-300">
            JAWA TIMUR PREMIUM QUEUE // SURABAYA RAYA & MALANG RAYA
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] font-mono-code text-zinc-400">
          <div className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {currentCity === 'MALANG'
                ? 'MALANG (7.9666° S, 112.6326° E)'
                : 'SURABAYA (7.2575° S, 112.7521° E)'}
            </span>
          </div>
          <button
            onClick={() => setIsPlayingVideo(!isPlayingVideo)}
            className="hidden sm:flex items-center gap-1 text-zinc-400 hover:text-white transition-colors border border-white/10 px-2 py-0.5 rounded text-[10px]"
            title="Toggle Cinematic Motion"
          >
            {isPlayingVideo ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5" />}
            <span>{isPlayingVideo ? 'CINEMATIC ACTIVE' : 'CINEMATIC PAUSED'}</span>
          </button>
        </div>
      </div>

      {/* Center Kinetic Typography (Oversized Bold Text - East Java Tone) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-1 sm:space-y-3"
        >
          <div className="overflow-hidden">
            <h1 className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-white uppercase leading-[0.9] select-none">
              KAMI YANG <span className="text-zinc-600 hover:text-zinc-400 transition-colors">ANTRE.</span>
            </h1>
          </div>
          <div className="overflow-hidden flex flex-wrap items-baseline gap-4 sm:gap-8">
            <h2 className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-amber-400 uppercase leading-[0.9] select-none">
              ANDA TINGGAL NIKMATI.
            </h2>
            <div className="flex items-center gap-2 self-center">
              <span className="text-xs sm:text-sm font-mono-code text-zinc-300 border border-amber-400/40 bg-zinc-950/80 px-3 py-1 uppercase">
                {currentCity === 'MALANG' ? 'EDISI MALANG RAYA' : 'EDISI SURABAYA RAYA'}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Quick Value Metrics Ribbon */}
        <div className="mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/10 max-w-4xl font-mono-code text-xs">
          <div>
            <span className="text-zinc-500 block text-[10px] uppercase">Rata-Rata Hemat Waktu</span>
            <span className="text-base sm:text-lg font-bold text-white">88 Menit / Order</span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[10px] uppercase">Akurasi Tiket Fisik</span>
            <span className="text-base sm:text-lg font-bold text-emerald-400">100% Ceklis Foto WA</span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[10px] uppercase">Proteksi Sajian</span>
            <span className="text-base sm:text-lg font-bold text-white">Thermal Insulated Bag</span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[10px] uppercase">Tarif Flat Kota</span>
            <span className="text-base sm:text-lg font-bold text-amber-400">Mulai Rp 30.000</span>
          </div>
        </div>
      </div>

      {/* Bottom Architectural Row (Caption / Overlay Deskripsi di Pojok Kiri Bawah) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end border-t border-white/10 pt-6">
        
        {/* Bottom-Left Caption Overlay */}
        <div className="lg:col-span-7 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono-code font-bold text-amber-400 uppercase tracking-widest">
              01 // MANIFESTO AREK JATIM
            </span>
            <span className="h-px w-12 bg-amber-400/40" />
          </div>
          <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed max-w-2xl">
            Ojo ngentekno 90 menit wektumu mung gawe ngadeg kepanasan nang trotoar ngenteni sego cumi, sate klopo, bebek sinjay, utawa sego resek. Pasukan pilot joki TITIP.ANTRI sing budhal berjuang nang barisan ngarep kasir, koen kari lungguh anteng nyruput kopi neng kantor utawa kosan.
          </p>
        </div>

        {/* Bottom-Right Interaction Trigger */}
        <div className="lg:col-span-5 flex flex-wrap sm:flex-nowrap items-center justify-start lg:justify-end gap-3">
          <button
            onClick={onExploreMerchants}
            id="btn-hero-explore"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white border border-white/20 hover:border-amber-400/60 px-5 py-3 text-xs font-mono-code uppercase tracking-wider rounded transition-all"
          >
            <span>Delok Kuliner Legendaris</span>
            <ArrowDown className="w-3.5 h-3.5 text-amber-400" />
          </button>
          <a
            href="#pricing"
            id="btn-hero-order"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-black px-5 py-3 text-xs font-mono-code font-bold uppercase tracking-wider rounded transition-transform active:scale-95 shadow-lg shadow-amber-400/10"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Hitung Tarif Flat Jatim</span>
          </a>
        </div>

      </div>

    </section>
  );
};
