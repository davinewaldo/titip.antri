import React from 'react';
import { FileText, MapPin } from 'lucide-react';

interface FooterProps {
  onOpenPRD: () => void;
  onOpenOutsideModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPRD, onOpenOutsideModal }) => {
  return (
    <footer className="border-t border-white/10 bg-[#060709] text-zinc-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Col (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="font-display font-extrabold text-3xl tracking-tighter text-white">
                TITIP.ANTRI
              </span>
              <span className="w-2 h-2 rounded-full bg-amber-400" />
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 max-w-sm leading-relaxed font-light">
              Layanan VIP Food Queuing Concierge pertama di Jawa Timur, mendedikasikan waktu fisik untuk membebaskan arek-arek Surabaya dan Malang dari panasnya antrean kuliner viral.
            </p>

            <div className="pt-2 text-xs font-mono-code text-zinc-500 space-y-1">
              <div>WILAYAH RESMI: SURABAYA RAYA & MALANG RAYA</div>
              <div>JAM OPERASIONAL: SETIAP HARI 10:00 - 23:00 WIB</div>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-3 font-mono-code text-xs">
            <span className="text-white font-bold uppercase tracking-wider block">
              NAVIGASI JATIM
            </span>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <a href="#how-it-works" className="hover:text-amber-400 transition-colors">
                  Alur Kerja 3 Langkah
                </a>
              </li>
              <li>
                <a href="#merchants" className="hover:text-amber-400 transition-colors">
                  Resto Legendaris Jatim
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-amber-400 transition-colors">
                  Tarif Flat Surabaya & Malang
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenPRD}
                  className="text-amber-400 hover:underline flex items-center gap-1 font-bold"
                >
                  <FileText className="w-3 h-3" />
                  <span>Baca Dokumen PRD Jatim</span>
                </button>
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

          {/* Hub Status Jatim (4 cols) */}
          <div className="md:col-span-4 space-y-3 font-mono-code text-xs">
            <span className="text-white font-bold uppercase tracking-wider block">
              DISPATCH HUBS AKTIF JAWA TIMUR
            </span>
            <div className="grid grid-cols-2 gap-2 text-zinc-400">
              <div className="p-2 border border-white/5 bg-zinc-950">
                <span className="text-white font-bold block">HUB GUBENG & SUNGKONO</span>
                <span className="text-[10px] text-zinc-500">Surabaya Pusat & Barat</span>
              </div>
              <div className="p-2 border border-white/5 bg-zinc-950">
                <span className="text-white font-bold block">HUB SURAMADU & ATOM</span>
                <span className="text-[10px] text-zinc-500">Surabaya Utara / Timur</span>
              </div>
              <div className="p-2 border border-white/5 bg-zinc-950">
                <span className="text-white font-bold block">HUB SUHAT & IJEN</span>
                <span className="text-[10px] text-zinc-500">Malang Kota & Lowokwaru</span>
              </div>
              <div className="p-2 border border-white/5 bg-zinc-950">
                <span className="text-white font-bold block">HUB KLOJEN & DINOYO</span>
                <span className="text-[10px] text-zinc-500">Kampus UB / Rel Kereta</span>
              </div>
            </div>
          </div>

        </div>

        {/* Legal Disclaimer & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-code text-zinc-500">
          <p className="text-[11px] leading-relaxed max-w-2xl">
            Disclaimer: TITIP.ANTRI® Jawa Timur adalah penyedia jasa perwakilan antre fisik independen atas nama pemesan personal. Kami bukan afiliasi resmi dari resto yang disebutkan, semata-mata mewakili pelanggan secara sah dan amanah.
          </p>
          <div className="shrink-0 text-right">
            <span>© 2026 TITIP.ANTRI JAWA TIMUR. ALL RIGHTS RESERVED.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
