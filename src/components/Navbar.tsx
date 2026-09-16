import React, { useState, useEffect } from 'react';
import { Clock, Radio, FileText, ArrowUpRight, MapPin, Sparkles } from 'lucide-react';
import { JatimCity } from '../types';

interface NavbarProps {
  currentCity: JatimCity;
  onSelectCity: (city: JatimCity) => void;
  onOpenPRD: () => void;
  onOpenOutsideModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCity,
  onSelectCity,
  onOpenPRD,
  onOpenOutsideModal
}) => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      // WIB is UTC+7
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const targetTime = new Date(utc + (3600000 * 7));
      
      const hours = String(targetTime.getHours()).padStart(2, '0');
      const minutes = String(targetTime.getMinutes()).padStart(2, '0');
      const seconds = String(targetTime.getSeconds()).padStart(2, '0');
      setTime(`${hours}:${minutes}:${seconds}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#090A0C]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo (Left) */}
        <div className="flex items-center gap-3">
          <a href="#" className="group flex items-baseline gap-1.5 focus:outline-none">
            <span className="font-display font-extrabold text-2xl tracking-tighter text-white group-hover:text-amber-400 transition-colors">
              TITIP.ANTRI
            </span>
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          </a>
          <div className="hidden md:flex flex-col text-[10px] font-mono-code text-zinc-500 border-l border-white/10 pl-3">
            <span>[JATIM OPS // EST. 2026]</span>
            <span className="text-zinc-400">SURABAYA & MALANG CONCIERGE</span>
          </div>
        </div>

        {/* Real-Time Clock & City Selector (Center) */}
        <div className="hidden lg:flex items-center gap-3 bg-zinc-900/90 border border-white/10 px-4 py-2 rounded-full shadow-inner">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="font-mono-code text-sm font-semibold tracking-wider text-white">
              {time || '12:00:00'} WIB
            </span>
          </div>

          {/* City Toggle Selector */}
          <div className="flex items-center border-l border-white/10 pl-2 gap-1 text-[11px] font-mono-code">
            <button
              onClick={() => onSelectCity('SURABAYA')}
              className={`px-2 py-0.5 rounded transition-all ${
                currentCity === 'SURABAYA'
                  ? 'bg-amber-400 text-black font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
              title="Fokus wilayah Surabaya Raya"
            >
              SURABAYA
            </button>
            <button
              onClick={() => onSelectCity('MALANG')}
              className={`px-2 py-0.5 rounded transition-all ${
                currentCity === 'MALANG'
                  ? 'bg-amber-400 text-black font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
              title="Fokus wilayah Malang Raya"
            >
              MALANG
            </button>
            <button
              onClick={onOpenOutsideModal}
              className="text-zinc-500 hover:text-amber-300 px-1 text-[10px] underline"
              title="Simulasi jika pengunjung dari luar Jatim"
            >
              (Luar Jatim?)
            </button>
          </div>

          <div className="flex items-center gap-1.5 border-l border-white/10 pl-3 text-[11px] font-mono-code text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <Radio className="w-3 h-3 animate-pulse" />
            <span>94 PILOT AKTIF</span>
          </div>
        </div>

        {/* Minimal Navigation & PRD Trigger (Right) */}
        <div className="flex items-center gap-3 sm:gap-4">
          <nav className="hidden sm:flex items-center gap-5 text-xs font-mono-code uppercase tracking-wider text-zinc-400">
            <a href="#how-it-works" className="hover:text-white transition-colors">
              Alur Kerja
            </a>
            <a href="#merchants" className="hover:text-white transition-colors">
              Resto Jatim
            </a>
            <a href="#pricing" className="hover:text-white transition-colors">
              Tarif Flat
            </a>
          </nav>

          {/* PRD Spec Trigger */}
          <button
            onClick={onOpenPRD}
            id="btn-open-prd"
            className="flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 hover:text-white border border-amber-400/30 hover:border-amber-400 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-mono-code rounded transition-all shadow-sm"
            title="Buka Dokumen PRD Komprehensif (CPO & Lead UX Spec)"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-bold">BACA PRD</span>
            <span className="hidden xl:inline text-[10px] bg-amber-400/20 text-amber-300 px-1 rounded">
              JATIM
            </span>
          </button>

          {/* Quick CTA to Pricing */}
          <a
            href="#pricing"
            id="btn-nav-order"
            className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-black px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-mono-code font-bold uppercase tracking-wider rounded transition-transform active:scale-95 shadow-md shadow-amber-400/10"
          >
            <span>Pesan Pilot Cak</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </header>
  );
};
