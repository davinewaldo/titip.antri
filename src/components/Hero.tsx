import React from 'react';
import { ArrowDown, Zap, Clock, Bell, Users, CheckCircle2, Ticket } from 'lucide-react';
import { motion } from 'motion/react';
import { JatimCity } from '../types';

interface HeroProps {
  currentCity: JatimCity;
  onSelectCity: (city: JatimCity) => void;
  onExploreMerchants: () => void;
  onOpenQuickQueue: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentCity,
  onSelectCity,
  onExploreMerchants,
  onOpenQuickQueue
}) => {
  return (
    <section className="relative border-b border-white/10 bg-[#090A0E] overflow-hidden pt-8 pb-16 sm:py-20">
      
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-amber-400/10 blur-[130px] rounded-full" />
        <div className="absolute inset-0 bg-noise opacity-30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Mini Badge (QueQ System Live Status) */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 bg-zinc-900/90 border border-amber-400/40 px-3 py-1 rounded-full text-[11px] font-mono-code">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-amber-400 font-bold uppercase">QUEQ WAITING LIST SYSTEM</span>
            <span className="text-zinc-500">•</span>
            <span className="text-zinc-300">
              {currentCity === 'MALANG' ? 'MALANG RAYA' : 'SURABAYA RAYA'}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-xs font-mono-code text-zinc-400">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <span>🟢 12 Resto Buka Antrean</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5 text-amber-400">
              <span>⚡ Datang Pas Giliran</span>
            </div>
          </div>
        </div>

        {/* Center Big Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-left max-w-4xl"
        >
          <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl text-white uppercase tracking-tight leading-[0.92]">
            ANTRE DARI HP.<br />
            <span className="text-amber-400">DATANG PAS GILIRAN.</span>
          </h1>

          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-zinc-300 font-normal leading-relaxed max-w-2xl">
            Aplikasi waiting list restoran modern ala <strong>QueQ</strong>. Ambil tiket antrean digital dari mana saja, pantau sisa meja secara live, dan datang santai tepat saat giliran tiba tanpa perlu berdiri mengular di resto.
          </p>

          {/* Quick Action CTAs */}
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenQuickQueue}
              className="px-6 py-4 bg-amber-400 hover:bg-amber-300 text-black font-display font-black text-sm uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-amber-400/20 active:scale-95 flex items-center gap-2"
            >
              <Ticket className="w-4 h-4" />
              <span>Ambil Nomor Antrean</span>
            </button>

            <button
              onClick={onExploreMerchants}
              className="px-6 py-4 bg-zinc-900 hover:bg-zinc-800 text-white border border-white/20 hover:border-amber-400/50 font-mono-code text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2"
            >
              <span>Lihat Antrean Resto</span>
              <ArrowDown className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </motion.div>

        {/* QueQ 4 Core Features (Pure Waiting List / Anti Crowding) */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            {
              icon: Zap,
              title: 'Remote Queue',
              desc: 'Ambil tiket antrean dari HP sebelum tiba di lokasi resto.',
              accent: 'text-amber-400'
            },
            {
              icon: Clock,
              title: 'Live Monitor Meja',
              desc: 'Pantau nomor dipanggil & sisa antrean secara real-time.',
              accent: 'text-emerald-400'
            },
            {
              icon: Bell,
              title: 'Auto Buzzer Alert',
              desc: 'Notifikasi getar otomatis saat tersisa 2 antrean lagi.',
              accent: 'text-cyan-400'
            },
            {
              icon: CheckCircle2,
              title: 'Cegah Kerumunan',
              desc: 'Bebas jalan-jalan atau ngopi, datang pas nomor dipanggil.',
              accent: 'text-amber-400'
            }
          ].map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-amber-400/40 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center mb-3">
                  <Icon className={`w-4 h-4 ${feat.accent}`} />
                </div>
                <h2 className="font-display font-bold text-sm sm:text-base text-white">
                  {feat.title}
                </h2>
                <p className="mt-1 text-xs text-zinc-400 font-light">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
};
