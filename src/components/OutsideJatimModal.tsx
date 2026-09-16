import React, { useState } from 'react';
import { X, MapPin, CheckCircle, Bell, Sparkles } from 'lucide-react';

interface OutsideJatimModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OutsideJatimModal: React.FC<OutsideJatimModalProps> = ({ isOpen, onClose }) => {
  const [cityInput, setCityInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cityInput || !phoneInput) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#0E1015] border-2 border-amber-400 p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="text-[10px] font-mono-code font-bold uppercase tracking-widest text-amber-400">
                REGIONAL RESTRICTION NOTICE
              </span>
            </div>
            <h3 className="font-display font-extrabold text-2xl text-white">
              MATUR NUWUN SAMPUN MAMPIR!
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white"
            aria-label="Tutup dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Text */}
        <div className="space-y-3 text-sm text-zinc-300 font-light leading-relaxed">
          <p>
            Armada pilot <strong className="text-white font-semibold">TITIP.ANTRI</strong> saat ini beroperasi secara <strong className="text-amber-400">eksklusif di wilayah Jawa Timur (Surabaya Raya & Malang Raya)</strong> demi menjaga standar kualitas nomor antrean fisik 100% otentik dan kecepatan antar.
          </p>
          <p className="text-xs text-zinc-400">
            Apakah Anda berdomisili di luar Jawa Timur (misal Jakarta, Bandung, Semarang, atau Bali)? Daftarkan kota Anda untuk menjadi prioritas ekspansi berikutnya.
          </p>
        </div>

        {/* Form */}
        {isSubmitted ? (
          <div className="p-4 border border-emerald-500/40 bg-emerald-950/30 flex items-center gap-3 text-emerald-300 font-mono-code text-xs">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Matur nuwun! Kota Anda telah tercatat dalam prioritas rilis ekspansi berikutnya.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 pt-2">
            <div>
              <label className="block text-[11px] font-mono-code uppercase text-zinc-400 mb-1">
                Kota Domisili Anda:
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Jakarta Selatan / Bandung / Solo"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                className="w-full bg-zinc-950 border border-white/15 px-3 py-2 text-xs text-white font-mono-code focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono-code uppercase text-zinc-400 mb-1">
                Nomor WhatsApp:
              </label>
              <input
                type="tel"
                required
                placeholder="0812xxxxxxx"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                className="w-full bg-zinc-950 border border-white/15 px-3 py-2 text-xs text-white font-mono-code focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-mono-code text-zinc-400 hover:text-white"
              >
                Tetap Lihat Web Jatim
              </button>
              <button
                type="submit"
                className="bg-amber-400 hover:bg-amber-300 text-black font-mono-code font-bold text-xs uppercase px-5 py-2.5 transition-all"
              >
                Ikut Waitlist Kota Saya
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
