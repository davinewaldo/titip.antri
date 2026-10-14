import React from 'react';
import { Smartphone, Clock, Utensils, CheckCircle2, ShieldCheck } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      icon: Smartphone,
      title: 'Ambil Antrean dari HP',
      desc: 'Pilih resto & ambil nomor tiket digital secara instan dari HP tanpa perlu berdiri di kerumunan antrean resto.',
      tag: 'REMOTE E-TICKET'
    },
    {
      num: '02',
      icon: Clock,
      title: 'Bebas Beraktivitas Sambil Menunggu',
      desc: 'Nomor antrean berkurang secara real-time di HP. Anda bebas jalan-jalan, belanja di mall, atau ngopi santai di sekitar.',
      tag: 'BEBAS BERAKTIVITAS'
    },
    {
      num: '03',
      icon: Utensils,
      title: 'Jatah 5 Mnt ke Kasir Saat Dipanggil',
      desc: 'Saat nomor Anda dipanggil, tunjukkan barcode tiket di kasir dalam batas 5 menit agar nomor tidak hangus dan langsung dapat meja.',
      tag: 'GRACE PERIOD 5 MNT'
    }
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 border-b border-white/10 bg-[#090A0E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Simple & Clean Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-white/10">
          <div>
            <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-amber-400">
              SOLUSI WAITING LIST QUEQ
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight uppercase mt-1">
              ANTRE LEBIH SANTAI, <span className="text-amber-400">DATANG PAS GILIRAN</span>
            </h2>
          </div>
          <span className="text-xs font-mono-code text-zinc-500">
            PRAKTIS • BEBAS BERDIRI LAMA • 100% DIGITAL
          </span>
        </div>

        {/* 3 Step Visual Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="relative bg-[#11131A] border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-400/50 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display font-black text-4xl text-zinc-700 group-hover:text-amber-400 transition-colors">
                      {s.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-amber-400" />
                    </div>
                  </div>

                  <span className="text-[10px] font-mono-code font-bold text-amber-400/90 tracking-wider uppercase block mb-1">
                    {s.tag}
                  </span>

                  <h3 className="font-display font-bold text-xl text-white">
                    {s.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono-code text-zinc-500">
                  <span>LANGKAH {s.num}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
