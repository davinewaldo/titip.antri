import React, { useState, useEffect } from 'react';
import { Clock, X } from 'lucide-react';
import { RECENT_ACTIVITIES } from '../data/merchants';
import { QueueActivity, JatimCity } from '../types';

interface LiveSocialProofProps {
  currentCity: JatimCity;
}

export const LiveSocialProof: React.FC<LiveSocialProofProps> = ({ currentCity }) => {
  const [currentToastIndex, setCurrentToastIndex] = useState(0);
  const [isToastVisible, setIsToastVisible] = useState(false);

  const filteredActivities = RECENT_ACTIVITIES.filter(
    (item) => currentCity === 'OUTSIDE_JATIM' || item.city === currentCity
  );
  const displayActivities = filteredActivities.length > 0 ? filteredActivities : RECENT_ACTIVITIES;

  useEffect(() => {
    // Show toast subtly every 9 seconds
    const interval = setInterval(() => {
      setCurrentToastIndex((prev) => (prev + 1) % displayActivities.length);
      setIsToastVisible(true);
    }, 9000);

    return () => clearInterval(interval);
  }, [displayActivities.length]);

  const activeActivity: QueueActivity = displayActivities[currentToastIndex % displayActivities.length];

  return (
    <section className="relative w-full border-b border-white/10 bg-black overflow-hidden z-20">
      
      {/* Infinite Marquee Strip (QueQ Live Ticker) */}
      <div className="py-2.5 border-y border-amber-400/20 bg-[#0E1015] overflow-hidden">
        <div className="animate-marquee flex items-center gap-8 text-xs font-mono-code uppercase tracking-wider text-zinc-300">
          {[...displayActivities, ...displayActivities, ...displayActivities].map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="flex items-center gap-3 shrink-0">
              <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                [QUEQ {item.city}]
              </span>
              <span className="font-semibold text-white">{item.userName}</span>
              <span className="text-zinc-400">{item.status} di</span>
              <span className="text-amber-300 font-bold">
                {item.merchantName}
              </span>
              <span className="bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded text-[10px]">
                {item.queueNumber}
              </span>
              <span className="text-zinc-500">• {item.timeAgo}</span>
              <span className="text-zinc-700 px-2">//</span>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle Toast in bottom left above floating bar */}
      {isToastVisible && activeActivity && (
        <div className="fixed bottom-24 left-4 sm:left-6 z-30 max-w-xs w-full bg-[#12151D]/95 border border-amber-400/30 rounded-2xl p-3 shadow-2xl backdrop-blur-md animate-in slide-in-from-left duration-200">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-1.5 text-[10px] font-mono-code text-amber-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>LIVE QUEUE ACTIVITY</span>
            </div>
            <button
              onClick={() => setIsToastVisible(false)}
              className="text-zinc-500 hover:text-white"
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          <p className="text-xs text-white mt-1 font-medium leading-tight">
            <span className="text-amber-300 font-bold">{activeActivity.userName}</span> {activeActivity.status.toLowerCase()} di{' '}
            <span className="text-white font-bold">{activeActivity.merchantName}</span>
          </p>

          <div className="flex items-center justify-between text-[10px] font-mono-code text-zinc-400 mt-1.5 pt-1.5 border-t border-white/5">
            <span className="text-emerald-400">{activeActivity.queueNumber}</span>
            <span className="text-zinc-500">{activeActivity.timeAgo}</span>
          </div>
        </div>
      )}

    </section>
  );
};
