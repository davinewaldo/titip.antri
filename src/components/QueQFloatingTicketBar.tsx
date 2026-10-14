import React, { useState, useEffect } from 'react';
import { Ticket, Clock, ArrowUpRight, Bell, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { QueQBooking } from '../types';

interface QueQFloatingTicketBarProps {
  booking: QueQBooking | null;
  onOpenTicket: () => void;
}

export const QueQFloatingTicketBar: React.FC<QueQFloatingTicketBarProps> = ({
  booking,
  onOpenTicket
}) => {
  const [nowMs, setNowMs] = useState(Date.now());

  useEffect(() => {
    if (!booking) return;
    const interval = setInterval(() => {
      setNowMs(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, [booking]);

  if (!booking || booking.status === 'cancelled') return null;

  const isExpired = booking.status === 'expired';
  const isCalled = booking.status === 'called';
  const isVerified = booking.isCashierVerified;

  const remainingSecs = isCalled && booking.verificationDeadlineMs 
    ? Math.max(0, Math.floor((booking.verificationDeadlineMs - nowMs) / 1000))
    : 0;
  
  const timerMins = String(Math.floor(remainingSecs / 60)).padStart(2, '0');
  const timerSecs = String(remainingSecs % 60).padStart(2, '0');

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-xl animate-in slide-in-from-bottom duration-300">
      <div 
        onClick={onOpenTicket}
        className={`cursor-pointer rounded-2xl p-3 sm:p-4 shadow-2xl shadow-black/80 flex items-center justify-between gap-3 transition-all group ${
          isExpired
            ? 'bg-red-950/90 border-2 border-red-500/80 hover:border-red-400'
            : isCalled && !isVerified
              ? remainingSecs <= 60
                ? 'bg-red-950 border-2 border-red-500 animate-pulse'
                : 'bg-amber-950/90 border-2 border-amber-400 animate-pulse'
              : isVerified
                ? 'bg-[#0E1713] border-2 border-emerald-500/80 hover:border-emerald-400'
                : 'bg-[#10131B] border-2 border-amber-400/90 hover:border-amber-300'
        }`}
      >
        
        {/* Left Badge */}
        <div className="flex items-center gap-3 overflow-hidden">
          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex flex-col items-center justify-center font-display font-extrabold text-sm sm:text-base leading-none shrink-0 shadow-md ${
            isExpired 
              ? 'bg-red-500 text-white' 
              : isCalled && !isVerified
                ? 'bg-red-500 text-white animate-bounce'
                : isVerified
                  ? 'bg-emerald-400 text-black'
                  : 'bg-amber-400 text-black'
          }`}>
            <span className="text-[9px] font-mono-code font-bold">
              {isExpired ? 'BATAL' : isCalled && !isVerified ? 'PANGGIL' : 'NO'}
            </span>
            <span>{booking.ticketNumber.split('-')[1] || booking.ticketNumber}</span>
          </div>

          <div className="overflow-hidden">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-amber-400 transition-colors">
                {booking.merchantName}
              </span>
              <span className={`w-2 h-2 rounded-full shrink-0 ${
                isExpired ? 'bg-red-400' : isCalled && !isVerified ? 'bg-red-500 animate-ping' : 'bg-emerald-400 animate-ping'
              }`} />
            </div>

            <div className="flex items-center gap-2 text-[11px] font-mono-code text-zinc-400 mt-0.5 truncate">
              {isExpired ? (
                <span className="text-red-300 font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-red-400" />
                  Batas 5 menit habis (Nomor Hangus)
                </span>
              ) : isCalled && !isVerified ? (
                <span className={`font-bold flex items-center gap-1.5 ${remainingSecs <= 60 ? 'text-red-400' : 'text-amber-300'}`}>
                  <Clock className="w-3.5 h-3.5 animate-spin" />
                  <span>DIPANGGIL! Sisa Ke Kasir: <strong>{timerMins}:{timerSecs}</strong></span>
                </span>
              ) : isVerified ? (
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Terverifikasi di Kasir • Meja Siap
                </span>
              ) : (
                <>
                  <span className="text-amber-400 font-bold">
                    {booking.queuesAhead > 0 ? `${booking.queuesAhead} antrean di depan` : 'Giliran Anda!'}
                  </span>
                  <span>•</span>
                  <span className="text-zinc-400">
                    Bebas Santai (~{booking.estimatedWaitMinutes} mnt)
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-2 shrink-0">
          <span className={`hidden sm:inline-block text-xs font-mono-code font-bold uppercase px-3 py-1 rounded-lg border ${
            isExpired
              ? 'bg-red-500/20 text-red-300 border-red-500/40'
              : isCalled && !isVerified
                ? 'bg-red-500 text-white border-red-400 animate-pulse'
                : isVerified
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-amber-400/10 text-amber-300 border-amber-400/30'
          }`}>
            {isExpired 
              ? 'Lihat Status' 
              : isCalled && !isVerified 
                ? `Ke Kasir (${timerMins}:${timerSecs})` 
                : 'Buka Tiket'}
          </span>
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform ${
            isExpired 
              ? 'bg-red-500 text-white' 
              : isCalled && !isVerified
                ? 'bg-red-500 text-white'
                : isVerified
                  ? 'bg-emerald-400 text-black'
                  : 'bg-amber-400 text-black'
          }`}>
            <ArrowUpRight className="w-4 h-4 font-bold" />
          </div>
        </div>

      </div>
    </div>
  );
};
