import React, { useState, useEffect, useRef } from 'react';
import { Clock, Ticket, LogIn, LogOut, User, Check, ChevronDown } from 'lucide-react';
import { JatimCity, UserProfile } from '../types';

interface NavbarProps {
  currentCity: JatimCity;
  onSelectCity: (city: JatimCity) => void;
  onOpenOutsideModal: () => void;
  hasActiveTicket?: boolean;
  onOpenTicket?: () => void;
  currentUser: UserProfile | null;
  onLoginWithGoogle: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCity,
  onSelectCity,
  onOpenOutsideModal,
  hasActiveTicket,
  onOpenTicket,
  currentUser,
  onLoginWithGoogle,
  onLogout
}) => {
  const [time, setTime] = useState<string>('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user dropdown if clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const targetTime = new Date(utc + (3600000 * 7));
      
      const hours = String(targetTime.getHours()).padStart(2, '0');
      const minutes = String(targetTime.getMinutes()).padStart(2, '0');
      const seconds = String(targetTime.getSeconds()).padStart(2, '0');
      setTime(`${hours}:${minutes}:${seconds}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#090A0E]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo (Left) */}
        <div className="flex items-center gap-3">
          <a href="#" className="group flex items-baseline gap-1.5 focus:outline-none">
            <span className="font-display font-extrabold text-2xl tracking-tighter text-white group-hover:text-amber-400 transition-colors">
              TITIP.ANTRI
            </span>
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          </a>
          <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono-code font-bold bg-amber-400/10 text-amber-300 border border-amber-400/30 px-2.5 py-0.5 rounded-full">
            <span>QUEQ SYSTEM</span>
          </div>
        </div>

        {/* Real-Time Clock & City Selector (Center) */}
        <div className="hidden lg:flex items-center gap-3 bg-zinc-900/90 border border-white/10 px-4 py-2 rounded-full shadow-inner">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="font-mono-code text-xs font-semibold tracking-wider text-white">
              {time || '12:00:00'} WIB
            </span>
          </div>

          {/* City Toggle Selector */}
          <div className="flex items-center border-l border-white/10 pl-2 gap-1 text-[11px] font-mono-code">
            <button
              onClick={() => onSelectCity('SURABAYA')}
              className={`px-2.5 py-0.5 rounded-full transition-all ${
                currentCity === 'SURABAYA'
                  ? 'bg-amber-400 text-black font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              SURABAYA
            </button>
            <button
              onClick={() => onSelectCity('MALANG')}
              className={`px-2.5 py-0.5 rounded-full transition-all ${
                currentCity === 'MALANG'
                  ? 'bg-amber-400 text-black font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              MALANG
            </button>
            <button
              onClick={onOpenOutsideModal}
              className="text-zinc-500 hover:text-amber-300 px-1 text-[10px] underline"
            >
              (Luar Jatim?)
            </button>
          </div>

          <div className="flex items-center gap-1.5 border-l border-white/10 pl-3 text-[11px] font-mono-code text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>SISTEM ONLINE</span>
          </div>
        </div>

        {/* Right Nav & Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          <nav className="hidden md:flex items-center gap-4 text-xs font-mono-code uppercase tracking-wider text-zinc-400">
            <a href="#merchants" className="hover:text-white transition-colors">
              Restoran
            </a>
            <a href="#how-it-works" className="hover:text-white transition-colors">
              Cara Kerja
            </a>
          </nav>

          {/* Active Ticket Button if booked */}
          {hasActiveTicket && (
            <button
              onClick={onOpenTicket}
              className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-black font-mono-code font-bold text-xs px-3 py-1.5 rounded-xl shadow-lg shadow-emerald-500/20 animate-pulse transition-transform"
            >
              <Ticket className="w-4 h-4" />
              <span className="hidden sm:inline">Tiket Aktif</span>
            </button>
          )}

          {/* Google Account Authentication */}
          {currentUser ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-white/15 px-2.5 py-1.5 rounded-xl transition-all text-xs font-mono-code"
              >
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName || 'User'}
                    className="w-6 h-6 rounded-full object-cover border border-amber-400/50"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-amber-400 text-black font-bold flex items-center justify-center text-xs">
                    {(currentUser.displayName || 'U').charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-white font-medium max-w-[90px] truncate hidden sm:inline">
                  {currentUser.displayName?.split(' ')[0] || 'Akun'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-[#11131A] border border-white/15 rounded-2xl p-3 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                    {currentUser.photoURL ? (
                      <img
                        src={currentUser.photoURL}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover border border-amber-400/60"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-amber-400 text-black font-bold flex items-center justify-center text-sm">
                        {(currentUser.displayName || 'U').charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="overflow-hidden">
                      <div className="font-bold text-xs text-white truncate">
                        {currentUser.displayName || 'Pengguna QueQ'}
                      </div>
                      <div className="text-[11px] text-zinc-400 font-mono-code truncate">
                        {currentUser.email}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-emerald-400 mt-0.5">
                        <Check className="w-3 h-3" />
                        <span>Akun Google Terhubung</span>
                      </div>
                    </div>
                  </div>

                  <div className="py-2 space-y-1">
                    {hasActiveTicket && (
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          if (onOpenTicket) onOpenTicket();
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-mono-code text-amber-300 hover:bg-amber-400/10 rounded-lg flex items-center gap-2 transition-colors"
                      >
                        <Ticket className="w-3.5 h-3.5" />
                        <span>Lihat Tiket Antrean Saya</span>
                      </button>
                    )}
                  </div>

                  <div className="pt-2 border-t border-white/10">
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onLogout();
                      }}
                      className="w-full px-3 py-2 text-xs font-mono-code text-red-400 hover:bg-red-500/10 rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Keluar (Logout)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onLoginWithGoogle}
              className="flex items-center gap-2 bg-white hover:bg-zinc-100 text-black px-3 py-2 rounded-xl text-xs font-mono-code font-bold transition-all shadow-md active:scale-95 shrink-0"
              title="Masuk dengan Akun Google"
            >
              {/* Official Google 'G' Icon */}
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Masuk Google</span>
            </button>
          )}

          {/* Quick CTA to Merchant Grid */}
          <a
            href="#merchants"
            className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-black px-3 sm:px-4 py-2 text-xs font-display font-extrabold uppercase tracking-wider rounded-xl transition-transform active:scale-95 shadow-md shadow-amber-400/10"
          >
            <span>Antre</span>
          </a>

        </div>

      </div>
    </header>
  );
};
