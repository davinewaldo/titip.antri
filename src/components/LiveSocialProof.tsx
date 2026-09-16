import React, { useState, useEffect } from 'react';
import { Radio, Clock, X, MapPin } from 'lucide-react';
import { RECENT_ACTIVITIES } from '../data/merchants';
import { QueueActivity, JatimCity } from '../types';

interface LiveSocialProofProps {
  currentCity: JatimCity;
}

export const LiveSocialProof: React.FC<LiveSocialProofProps> = ({ currentCity }) => {
  const [currentToastIndex, setCurrentToastIndex] = useState(0);
  const [isToastVisible, setIsToastVisible] = useState(true);
  const [isAutoCycling, setIsAutoCycling] = useState(true);

  // Filter activities matching city or show all
  const filteredActivities = RECENT_ACTIVITIES.filter(
    (item) => currentCity === 'OUTSIDE_JATIM' || item.city === currentCity
  );
  const displayActivities = filteredActivities.length > 0 ? filteredActivities : RECENT_ACTIVITIES;

  useEffect(() => {
    if (!isAutoCycling) return;

    const interval = setInterval(() => {
      setCurrentToastIndex((prev) => (prev + 1) % displayActivities.length);
      setIsToastVisible(true);
    }, 7000);

    return () => clearInterval(interval);
  }, [isAutoCycling, displayActivities.length]);

  const activeActivity: QueueActivity = displayActivities[currentToastIndex % displayActivities.length];

  return (
    <section className="relative w-full border-b border-white/10 bg-black overflow-hidden z-20">
      
      {/* Infinite Marquee Strip (East Java Dispatch Ticker) */}
      <div className="py-2.5 sm:py-3 border-y border-amber-400/20 bg-[#0E1013] overflow-hidden">
        <div className="animate-marquee flex items-center gap-8 text-xs font-mono-code uppercase tracking-wider text-zinc-300">
          {[...displayActivities, ...displayActivities, ...displayActivities].map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="flex items-center gap-3 shrink-0">
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                [DISPATCH {item.city}]
              </span>
              <span className="font-semibold text-white">{item.driverName}</span>
              <span className="text-zinc-400">{item.status} di</span>
              <span className="text-amber-300 underline underline-offset-4 decoration-amber-400/30">
                {item.merchantName}
              </span>
              <span className="bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded text-[10px]">
                {item.queueNumber}
              </span>
              <span className="text-zinc-500">• {item.timeAgo}</span>
              <span className="text-zinc-600 px-2">//</span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Dynamic Social Proof Toast (Bottom-Left UI) */}
      {isToastVisible && activeActivity && (
        <div className="fixed bottom-5 left-5 z-50 max-w-sm w-full bg-[#111317]/95 border border-amber-400/30 shadow-2xl p-4 backdrop-blur-md transition-all duration-300">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-mono-code font-bold uppercase tracking-wider text-amber-400">
                LIVE PILOT JATIM TERVERIFIKASI
              </span>
            </div>
            
            <button
              onClick={() => setIsToastVisible(false)}
              className="text-zinc-500 hover:text-zinc-300 transition-colors"
              title="Tutup notifikasi"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-2 space-y-1">
            <p className="text-xs text-white font-medium">
              <span className="font-bold text-amber-300">{activeActivity.driverName}</span>{' '}
              {activeActivity.status.toLowerCase()} di{' '}
              <span className="font-semibold text-white">{activeActivity.merchantName}</span> ({activeActivity.city})
            </p>

            <div className="flex items-center justify-between text-[11px] font-mono-code text-zinc-400 pt-1">
              <span className="text-emerald-400 font-medium">
                Tiket Fisik: {activeActivity.queueNumber}
              </span>
              <span className="flex items-center gap-1 text-zinc-500">
                <Clock className="w-3 h-3" />
                {activeActivity.timeAgo}
              </span>
            </div>
          </div>

          {/* Toast Footer Controls */}
          <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono-code text-zinc-500">
            <span>Dispatched from Hub {activeActivity.city}</span>
            <button
              onClick={() => setIsAutoCycling(!isAutoCycling)}
              className="text-zinc-400 hover:text-amber-300 underline"
            >
              {isAutoCycling ? 'Jeda Rotasi' : 'Lanjut Rotasi'}
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
