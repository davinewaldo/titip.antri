import React, { useState, useEffect } from 'react';
import { X, Users, MapPin, ArrowRight, ShieldCheck, Ticket, Check } from 'lucide-react';
import { Merchant, QueQBooking, UserProfile } from '../types';

interface QueQBookingModalProps {
  isOpen: boolean;
  merchant: Merchant | null;
  currentUser: UserProfile | null;
  onLoginWithGoogle: () => void;
  onClose: () => void;
  onConfirmBooking: (booking: QueQBooking) => void;
}

export const QueQBookingModal: React.FC<QueQBookingModalProps> = ({
  isOpen,
  merchant,
  currentUser,
  onLoginWithGoogle,
  onClose,
  onConfirmBooking
}) => {
  const [partySize, setPartySize] = useState<'1-2 Orang' | '3-4 Orang' | '5+ Orang'>('1-2 Orang');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  // Sync customer name from Google profile if available
  useEffect(() => {
    if (currentUser?.displayName && !customerName) {
      setCustomerName(currentUser.displayName);
    }
  }, [currentUser, isOpen]);

  if (!isOpen || !merchant) return null;

  // Calculate generated ticket number based on current calling
  const prefix = merchant.currentCallingNumber.charAt(0);
  const currentNum = parseInt(merchant.currentCallingNumber.replace(/\D/g, ''), 10) || 20;
  const generatedNum = currentNum + merchant.totalQueuesWaiting + 1;
  const ticketNumber = `${prefix}-${String(generatedNum).padStart(3, '0')}`;
  const queuesAhead = merchant.totalQueuesWaiting;
  const estWait = Math.round(queuesAhead * 3.5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const now = Date.now();
    const newBooking: QueQBooking = {
      ticketId: `queq-${now}`,
      merchantId: merchant.id,
      merchantName: merchant.name,
      merchantLocation: merchant.location,
      merchantCity: merchant.city,
      partySize,
      ticketNumber,
      currentCalling: merchant.currentCallingNumber,
      queuesAhead,
      estimatedWaitMinutes: estWait,
      customerName: customerName.trim() || (currentUser?.displayName ?? 'Pelanggan QueQ'),
      customerPhone: customerPhone.trim() || '08123456789',
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      createdAtMs: now,
      calledAtMs: null,
      verificationDeadlineMs: null, // Timer 5 menit HANYA berjalan saat nomor antrean dipanggil
      isCashierVerified: false,
      verifiedAt: null,
      status: 'waiting',
      userId: currentUser?.uid || null,
      userEmail: currentUser?.email || null
    };

    onConfirmBooking(newBooking);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-[#0E1015] border border-white/20 rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="relative h-28 bg-zinc-900 overflow-hidden">
          <img
            src={merchant.imageUrl}
            alt={merchant.name}
            className="w-full h-full object-cover opacity-40 filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E1015] via-[#0E1015]/60 to-transparent" />
          
          <div className="absolute top-3 left-4 right-4 flex items-center justify-between">
            <span className="bg-amber-400 text-black text-[10px] font-mono-code font-bold uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow">
              <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
              QUEQ TIKET RESMI
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-black/60 hover:bg-white text-zinc-300 hover:text-black border border-white/20 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="absolute bottom-2 left-4 right-4">
            <h3 className="font-display font-extrabold text-xl text-white tracking-tight uppercase">
              {merchant.name}
            </h3>
            <p className="text-[11px] text-zinc-400 flex items-center gap-1 truncate">
              <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
              {merchant.location}
            </p>
          </div>
        </div>

        {/* Live Queue Radar Strip */}
        <div className="bg-[#14171F] border-y border-white/10 px-4 py-2.5 grid grid-cols-3 gap-2 text-center font-mono-code text-xs">
          <div>
            <span className="text-[10px] text-zinc-500 uppercase block">Sedang Dipanggil</span>
            <span className="text-sm font-bold text-emerald-400">{merchant.currentCallingNumber}</span>
          </div>
          <div className="border-x border-white/10">
            <span className="text-[10px] text-zinc-500 uppercase block">Antrean Menunggu</span>
            <span className="text-sm font-bold text-amber-400">{merchant.totalQueuesWaiting} Meja</span>
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 uppercase block">Estimasi Waktu</span>
            <span className="text-sm font-bold text-white">~{estWait} Mnt</span>
          </div>
        </div>

        {/* Simple 1-Step Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          
          {/* Pilih Ukuran Meja */}
          <div>
            <label className="block text-xs font-mono-code font-bold text-zinc-300 uppercase mb-2">
              Ukuran Meja / Jumlah Tamu
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: '1-2 Orang', label: '1-2 Orang', sub: 'Tipe A' },
                { id: '3-4 Orang', label: '3-4 Orang', sub: 'Tipe B' },
                { id: '5+ Orang', label: '5+ Orang', sub: 'Tipe C' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPartySize(item.id as any)}
                  className={`p-2.5 text-center rounded-xl border transition-all ${
                    partySize === item.id
                      ? 'border-amber-400 bg-amber-400/15 text-white shadow-md'
                      : 'border-white/10 bg-zinc-900/60 text-zinc-400 hover:border-white/20'
                  }`}
                >
                  <Users className={`w-4 h-4 mx-auto mb-1 ${partySize === item.id ? 'text-amber-400' : 'text-zinc-500'}`} />
                  <span className="font-bold text-xs block text-white">{item.label}</span>
                  <span className="text-[10px] text-zinc-500 block">{item.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Google Account Status / Quick Connect */}
          {currentUser ? (
            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-between text-xs font-mono-code">
              <div className="flex items-center gap-2 overflow-hidden">
                {currentUser.photoURL ? (
                  <img src={currentUser.photoURL} alt="User" className="w-5 h-5 rounded-full object-cover shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-emerald-400 text-black font-bold flex items-center justify-center text-[10px]">
                    ✓
                  </div>
                )}
                <span className="text-zinc-300 truncate">
                  Akun: <strong className="text-white">{currentUser.displayName?.split(' ')[0]}</strong> ({currentUser.email})
                </span>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold shrink-0">TERHUBUNG</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={onLoginWithGoogle}
              className="w-full py-2 px-3 bg-zinc-900 hover:bg-zinc-800 border border-white/20 rounded-xl flex items-center justify-center gap-2 text-xs font-mono-code text-zinc-300 hover:text-white transition-colors"
            >
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Masuk dengan Google (Simpan Otomatis)</span>
            </button>
          )}

          {/* Simple Contact Input */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] font-mono-code uppercase text-zinc-400 mb-1">
                Nama Pemesan
              </label>
              <input
                type="text"
                placeholder="Contoh: Budi"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-zinc-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 font-mono-code"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono-code uppercase text-zinc-400 mb-1">
                No. WhatsApp
              </label>
              <input
                type="tel"
                placeholder="0812xxxx"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full bg-zinc-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 font-mono-code"
                required
              />
            </div>
          </div>

          {/* Anti-Crowding Guarantee & 5-Min Verification Policy */}
          <div className="space-y-2">
            <div className="p-2.5 bg-amber-400/10 border border-amber-400/30 rounded-xl flex items-start gap-2 text-xs text-amber-200">
              <span className="text-sm">⏱️</span>
              <div>
                <span className="font-bold text-amber-300 block">Jatah 5 Menit Saat Dipanggil</span>
                <span className="text-[11px] text-zinc-400 leading-tight block">
                  Bebas menunggu di mana saja. Saat nomor Anda dipanggil, Anda memiliki jatah 5 menit untuk menunjukkan tiket/barcode ke kasir agar tidak hangus.
                </span>
              </div>
            </div>
            
            <div className="p-2.5 bg-zinc-900/60 border border-white/10 rounded-xl flex items-center gap-2 text-xs text-zinc-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Nomor tiket resmi terbit secara digital & terhubung ke antrean resto.</span>
            </div>
          </div>

          {/* 1 Big Direct Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-black font-display font-extrabold text-sm uppercase tracking-wider rounded-xl transition-transform active:scale-95 shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2"
          >
            <Ticket className="w-4 h-4" />
            <span>Ambil Tiket Antrean Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
