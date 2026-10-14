import React from 'react';
import { MapPin, ShieldCheck, Ticket } from 'lucide-react';

interface FooterProps {
  onOpenOutsideModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenOutsideModal }) => {
  return (
    <footer className="border-t border-white/10 bg-[#060709] text-zinc-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Col (6 cols) */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="font-display font-extrabold text-3xl tracking-tighter text-white">
                TITIP.ANTRI
              </span>
              <span className="w-2 h-2 rounded-full bg-amber-400" />
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 max-w-md leading-relaxed font-light">
              Platform antrean digital & manajemen waiting list restoran viral ala <strong>QueQ</strong> di Jawa Timur. Nikmati waktu luang tanpa harus berdiri mengular di resto, cukup pantau dari HP dan tiba tepat saat meja siap.
            </p>

            <div className="pt-2 text-xs font-mono-code text-zinc-500 space-y-1">
              <div>WILAYAH OPERASIONAL: SURABAYA RAYA & MALANG RAYA</div>
              <div>LAYANAN DIGITAL: 24 JAM ONLINE • TIKET REAL-TIME</div>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-3 font-mono-code text-xs">
            <span className="text-white font-bold uppercase tracking-wider block">
              NAVIGASI
            </span>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <a href="#merchants" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <Ticket className="w-3.5 h-3.5 text-amber-400" />
                  <span>Daftar Resto & Antrean</span>
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-amber-400 transition-colors">
                  Cara Kerja Smart Queue
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenOutsideModal}
                  className="text-zinc-500 hover:text-white underline text-[11px]"
                >
                  Cek Layanan Luar Jatim
                </button>
              </li>
            </ul>
          </div>

          {/* Coverage Areas (3 cols) */}
          <div className="md:col-span-3 space-y-3 font-mono-code text-xs">
            <span className="text-white font-bold uppercase tracking-wider block">
              CAKUPAN RESTORAN
            </span>
            <div className="space-y-1.5 text-zinc-400 text-[11px]">
              <div className="flex items-center gap-1.5 text-zinc-300">
                <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                <span>Surabaya: Sungkono, Gubeng, Suramadu</span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-300">
                <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                <span>Malang: Soekarno-Hatta, Ijen, Dinoyo</span>
              </div>
              <div className="pt-1 text-zinc-500">
                <span>Sinkronisasi otomatis dengan server antrean resto.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Legal Disclaimer & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-code text-zinc-500">
          <p className="text-[11px] leading-relaxed max-w-2xl">
            TITIP.ANTRI — Sistem antrean digital mandiri terinspirasi dari QueQ untuk menciptakan ekosistem kuliner Jawa Timur yang tertib, nyaman, dan higienis tanpa antrean berdesakan.
          </p>
          <div className="shrink-0 text-right">
            <span>© 2026 TITIP.ANTRI. ALL RIGHTS RESERVED.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
