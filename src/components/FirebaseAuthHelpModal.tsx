import React, { useState } from 'react';
import { ShieldAlert, Copy, Check, ExternalLink, X, AlertTriangle, ArrowRight, Smartphone } from 'lucide-react';

interface FirebaseAuthHelpModalProps {
  isOpen: boolean;
  errorCode?: string;
  errorMessage?: string;
  onClose: () => void;
  onTryRedirectLogin?: () => void;
}

export const FirebaseAuthHelpModal: React.FC<FirebaseAuthHelpModalProps> = ({
  isOpen,
  errorCode,
  errorMessage,
  onClose,
  onTryRedirectLogin
}) => {
  const [copied, setCopied] = useState(false);
  const currentHostname = typeof window !== 'undefined' ? window.location.hostname : 'domain-anda.vercel.app';
  const isUnauthorizedDomain = errorCode === 'auth/unauthorized-domain' || (errorMessage && errorMessage.includes('unauthorized-domain'));
  const isPopupBlocked = errorCode === 'auth/popup-blocked';

  if (!isOpen) return null;

  const handleCopyDomain = () => {
    navigator.clipboard.writeText(currentHostname);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-[#0f1117] border border-amber-400/40 rounded-2xl p-6 sm:p-7 shadow-2xl text-left overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-mono-code font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-md">
              Panduan Otorisasi Vercel & Firebase
            </span>
            <h3 className="text-lg sm:text-xl font-display font-extrabold text-white mt-1">
              {isUnauthorizedDomain 
                ? 'Domain Vercel Belum Didaftarkan di Firebase' 
                : isPopupBlocked 
                ? 'Pop-up Login Terblokir oleh Browser' 
                : 'Perlu Konfigurasi Otorisasi Firebase'}
            </h3>
          </div>
        </div>

        {/* Core explanation */}
        <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl mb-4 text-xs text-amber-200/90 leading-relaxed">
          <p className="font-semibold text-amber-300 mb-1">
            ⚠️ Mengapa sebelumnya tombol Google login tidak berfungsi / refresh-refresh terus?
          </p>
          <p>
            Secara keamanan standar, <strong>Firebase Authentication menolak login Google</strong> jika domain website tujuan belum dimasukkan ke dalam daftar putih (<strong>Authorized Domains</strong>) di Firebase Console. Akibatnya jendela login langsung tertutup atau browser me-refresh halaman tanpa menyimpan status login.
          </p>
        </div>

        {/* Detected Domain Box with Copy Button */}
        <div className="mb-5 bg-zinc-900 border border-white/15 rounded-xl p-3.5">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono-code mb-2">
            <span>DOMAIN AKTIF ANDA (YANG HARUS DIDAFTARKAN):</span>
            <span className="text-amber-400 font-bold">Auto-detected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-black/60 border border-white/20 rounded-lg px-3 py-2 text-sm font-mono-code text-white font-bold select-all truncate">
              {currentHostname}
            </div>
            <button
              onClick={handleCopyDomain}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-mono-code font-bold transition-all shrink-0 ${
                copied 
                  ? 'bg-emerald-500 text-black' 
                  : 'bg-amber-400 hover:bg-amber-300 text-black active:scale-95'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Tersalin!' : 'Salin Domain'}</span>
            </button>
          </div>
        </div>

        {/* Step-by-step solution */}
        <div className="space-y-3 mb-6">
          <h4 className="text-xs font-mono-code uppercase tracking-wider text-zinc-300 font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            Langkah Mudah Mengatasi (Hanya 1 Menit):
          </h4>

          <ol className="space-y-2.5 text-xs text-zinc-300 font-sans">
            <li className="flex items-start gap-2.5 p-2.5 bg-zinc-900/60 border border-white/10 rounded-xl">
              <span className="w-5 h-5 rounded-full bg-amber-400 text-black font-mono-code font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <div>
                <span>Buka </span>
                <a 
                  href="https://console.firebase.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-amber-400 font-bold underline hover:text-amber-300 inline-flex items-center gap-1"
                >
                  Firebase Console <ExternalLink className="w-3 h-3 inline" />
                </a>
                <span> dan pilih project Anda: </span>
                <code className="bg-white/10 text-amber-300 px-1.5 py-0.5 rounded font-mono-code">flash-hologram-m3skh</code>
              </div>
            </li>

            <li className="flex items-start gap-2.5 p-2.5 bg-zinc-900/60 border border-white/10 rounded-xl">
              <span className="w-5 h-5 rounded-full bg-amber-400 text-black font-mono-code font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <div>
                <span>Masuk ke menu <strong>Build &gt; Authentication</strong> di bilah navigasi kiri, lalu klik tab <strong>Settings</strong> di atas.</span>
              </div>
            </li>

            <li className="flex items-start gap-2.5 p-2.5 bg-zinc-900/60 border border-white/10 rounded-xl">
              <span className="w-5 h-5 rounded-full bg-amber-400 text-black font-mono-code font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <div>
                <span>Scroll ke bagian <strong>Authorized domains</strong>, klik tombol <strong>"Add domain"</strong>.</span>
              </div>
            </li>

            <li className="flex items-start gap-2.5 p-2.5 bg-zinc-900/60 border border-white/10 rounded-xl">
              <span className="w-5 h-5 rounded-full bg-amber-400 text-black font-mono-code font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                4
              </span>
              <div>
                <span>Tempel domain yang disalin di atas: <code className="bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded font-mono-code">{currentHostname}</code> (atau cukup tambahkan <code className="bg-white/10 text-white px-1.5 py-0.5 rounded font-mono-code">vercel.app</code> untuk mencakup seluruh deployment Vercel Anda), lalu klik <strong>Add / Simpan</strong>.</span>
              </div>
            </li>
          </ol>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-3 border-t border-white/10">
          <a
            href="https://console.firebase.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:flex-1 py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-black text-center font-mono-code font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md shadow-amber-400/20"
          >
            <span>Buka Firebase Console Sekarang</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {onTryRedirectLogin && (
            <button
              onClick={() => {
                onClose();
                onTryRedirectLogin();
              }}
              className="w-full sm:w-auto py-2.5 px-4 bg-zinc-900 hover:bg-zinc-800 border border-white/20 text-zinc-300 hover:text-white font-mono-code text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <Smartphone className="w-3.5 h-3.5 text-amber-400" />
              <span>Coba Mode Redirect</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="w-full sm:w-auto py-2.5 px-4 bg-transparent hover:bg-white/5 border border-white/10 text-zinc-400 hover:text-white font-mono-code text-xs rounded-xl transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
