import React, { useState, useEffect } from 'react';
import { 
  Share2, 
  Bell, 
  MapPin, 
  QrCode, 
  ChevronDown,
  Volume2,
  VolumeX,
  Play,
  Check,
  Clock,
  AlertTriangle,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  FastForward,
  Megaphone,
  Sparkles
} from 'lucide-react';
import { QueQBooking } from '../types';

interface QueQDigitalTicketModalProps {
  isOpen: boolean;
  booking: QueQBooking | null;
  onClose: () => void;
  onCancelTicket: () => void;
  onResetTicket?: () => void;
  onUpdateBooking: (updated: QueQBooking) => void;
}

export const QueQDigitalTicketModal: React.FC<QueQDigitalTicketModalProps> = ({
  isOpen,
  booking,
  onClose,
  onCancelTicket,
  onResetTicket,
  onUpdateBooking
}) => {
  const [alertNotice, setAlertNotice] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [nowMs, setNowMs] = useState(Date.now());

  // Real-time ticking clock for exact 5-minute countdown calculation
  useEffect(() => {
    if (!isOpen || !booking) return;
    const interval = setInterval(() => {
      setNowMs(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, booking]);

  // Play audio beeps using Web Audio API
  const playBeep = (freq = 880, type: OscillatorType = 'sine', duration = 0.3) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch {
      // AudioContext not allowed or unsupported in some browsers
    }
  };

  // Play a call chime when called
  const playCallChime = () => {
    if (!soundEnabled) return;
    try {
      playBeep(523.25, 'sine', 0.2); // C5
      setTimeout(() => playBeep(659.25, 'sine', 0.2), 220); // E5
      setTimeout(() => playBeep(783.99, 'sine', 0.35), 440); // G5
      setTimeout(() => playBeep(1046.50, 'sine', 0.5), 700); // C6
    } catch {
      // Audio fallback
    }
  };

  // Check 5-minute deadline expiration ONLY when status is 'called' and NOT yet cashier verified
  useEffect(() => {
    if (!booking) return;
    if (booking.status !== 'called') return;
    if (booking.isCashierVerified) return;

    if (booking.verificationDeadlineMs && nowMs >= booking.verificationDeadlineMs) {
      // Trigger ticket expiration / hangus
      playBeep(350, 'sawtooth', 0.7);
      onUpdateBooking({
        ...booking,
        status: 'expired',
        cancellationReason: 'Batas waktu 5 menit setelah dipanggil telah habis tanpa konfirmasi di kasir. Antrean dibatalkan otomatis.'
      });
    }
  }, [nowMs, booking]);

  if (!isOpen || !booking) return null;

  const isExpired = booking.status === 'expired';
  const isCalled = booking.status === 'called';
  const isVerified = booking.isCashierVerified;
  const isWaiting = booking.status === 'waiting' || booking.status === 'almost_ready';

  // Calculate remaining seconds for the 5-minute cashier verification AFTER being called
  const totalSecondsAllowed = 5 * 60; // 300 seconds
  const remainingSeconds = (isCalled && booking.verificationDeadlineMs)
    ? Math.max(0, Math.floor((booking.verificationDeadlineMs - nowMs) / 1000))
    : 0;
  
  const timerMinutes = String(Math.floor(remainingSeconds / 60)).padStart(2, '0');
  const timerSecs = String(remainingSeconds % 60).padStart(2, '0');
  const percentProgress = Math.max(0, Math.min(100, (remainingSeconds / totalSecondsAllowed) * 100));

  // Handler for Cashier Verification (showing barcode at the cashier)
  const handleVerifyAtCashier = () => {
    setIsVerifying(true);
    playBeep(1046, 'sine', 0.15);
    setTimeout(() => {
      playBeep(1318, 'sine', 0.3);
      const verifiedTime = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
      onUpdateBooking({
        ...booking,
        status: 'completed',
        isCashierVerified: true,
        verifiedAt: verifiedTime
      });
      setIsVerifying(false);
      setAlertNotice('✅ TIKET SAH & TERVERIFIKASI DI KASIR! Meja Anda siap, selamat menikmati hidangan.');
    }, 450);
  };

  // Helper for quick demo/test: sets remaining time to 10 seconds so user/dosen can test automatic cancellation
  const handleFastForwardTimer = () => {
    const fastForwardDeadline = Date.now() + 10 * 1000;
    onUpdateBooking({
      ...booking,
      verificationDeadlineMs: fastForwardDeadline
    });
    setAlertNotice('⚡ Timer dipercepat: tersisa 10 detik untuk menguji pembatalan otomatis tiket!');
    playBeep(700, 'sine', 0.2);
  };

  // Trigger call immediately (simulation button)
  const handleSimulateCallNow = () => {
    const now = Date.now();
    playCallChime();
    onUpdateBooking({
      ...booking,
      queuesAhead: 0,
      currentCalling: booking.ticketNumber,
      estimatedWaitMinutes: 0,
      status: 'called',
      calledAtMs: now,
      verificationDeadlineMs: now + 5 * 60 * 1000
    });
    setAlertNotice('🚨 NOMOR ANDA DIPANGGIL SEKARANG! Segera tunjukkan barcode ke kasir dalam 5 menit.');
  };

  // Simulate queue movement forward (+1)
  const handleAdvanceQueue = () => {
    if (!booking) return;
    if (booking.queuesAhead <= 0 || booking.status === 'called') {
      setAlertNotice('🎉 NOMOR ANDA SUDAH DIPANGGIL! Segera lapor ke kasir.');
      playCallChime();
      return;
    }

    const nextQueues = booking.queuesAhead - 1;
    const currentNumInt = parseInt(booking.currentCalling.replace(/\D/g, ''), 10) || 30;
    const prefix = booking.currentCalling.charAt(0);
    const nextCurrentCalling = `${prefix}-${String(currentNumInt + 1).padStart(3, '0')}`;
    const nextEst = Math.max(0, nextQueues * 3);

    if (nextQueues === 0) {
      // Reached 0: Trigger Call!
      const now = Date.now();
      playCallChime();
      onUpdateBooking({
        ...booking,
        queuesAhead: 0,
        currentCalling: booking.ticketNumber,
        estimatedWaitMinutes: 0,
        status: 'called',
        calledAtMs: now,
        verificationDeadlineMs: now + 5 * 60 * 1000 // 5-minute timer starts HERE
      });
      setAlertNotice('🚨 NOMOR ANDA DIPANGGIL SEKARANG! Segera ke kasir dalam 5 menit sebelum tiket hangus.');
    } else if (nextQueues <= 2) {
      playBeep(980);
      onUpdateBooking({
        ...booking,
        queuesAhead: nextQueues,
        currentCalling: nextCurrentCalling,
        estimatedWaitMinutes: nextEst,
        status: 'almost_ready'
      });
      setAlertNotice(`🔔 PERHATIAN: Tersisa ${nextQueues} antrean di depan Anda! Segera mendekat ke resto.`);
    } else {
      playBeep(650);
      onUpdateBooking({
        ...booking,
        queuesAhead: nextQueues,
        currentCalling: nextCurrentCalling,
        estimatedWaitMinutes: nextEst,
        status: 'waiting'
      });
    }
  };

  // WhatsApp formatted ticket slip
  const generateWaTicketUrl = () => {
    const text = `🎟️ *TIKET ANTREAN DIGITAL QUEQ* 🎟️
-----------------------------------
🏢 *Resto:* ${booking.merchantName}
📍 *Lokasi:* ${booking.merchantLocation} (${booking.merchantCity})
🎫 *NOMOR ANTREAN:* *${booking.ticketNumber}*
👥 *Ukuran Meja:* ${booking.partySize}
⏱️ *Sisa Antrean:* ${booking.queuesAhead} antrean (~${booking.estimatedWaitMinutes} menit)
📢 *Nomor Terkini:* ${booking.currentCalling}
✅ *Status:* ${isVerified ? 'TERVERIFIKASI DI KASIR' : isCalled ? 'SEDANG DIPANGGIL (Jatah 5 Mnt)' : 'Menunggu Giliran (Bebas Santai)'}
👤 *Nama:* ${booking.customerName}
⏰ *Waktu Ambil:* ${booking.timestamp} WIB
-----------------------------------
_Tunjukkan tiket digital ini langsung di kasir/resepsionis resto saat nomor dipanggil._`;

    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Container */}
      <div 
        className="relative w-full max-w-sm sm:max-w-md bg-[#0D0F14] border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-zinc-950 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${
              isExpired ? 'bg-red-500' : isCalled && !isVerified ? 'bg-red-500 animate-ping' : 'bg-emerald-400 animate-ping'
            }`} />
            <span className={`text-xs font-mono-code font-bold uppercase tracking-wider ${
              isExpired ? 'text-red-400' : isCalled && !isVerified ? 'text-red-400 animate-pulse' : 'text-emerald-400'
            }`}>
              {isExpired ? 'TIKET HANGUS / BATAL' : isCalled && !isVerified ? 'SEDANG DIPANGGIL (5 MNT)' : 'LIVE QUEUE TICKET'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
              title={soundEnabled ? 'Matikan Suara Beep' : 'Aktifkan Suara Beep'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-zinc-500" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
              title="Tutup / Minimize Tiket"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Ticket Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          
          {/* 1. EXPIRED / CANCELLED VIEW (5-Minute Window Missed) */}
          {isExpired ? (
            <div className="bg-red-950/40 border-2 border-red-500/60 rounded-2xl p-6 text-center space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 mx-auto rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center text-red-400">
                <AlertTriangle className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[10px] font-mono-code uppercase tracking-widest text-red-400 font-bold bg-red-500/20 px-3 py-1 rounded-full border border-red-500/30">
                  WAKTU 5 MENIT HABIS
                </span>
                <h3 className="font-display font-black text-2xl text-white uppercase mt-2">
                  NOMOR ANTREAN TELAH HANGUS
                </h3>
                <p className="text-xs text-zinc-300 mt-2 leading-relaxed font-light">
                  Nomor antrean <strong>#{booking.ticketNumber}</strong> di <strong>{booking.merchantName}</strong> telah dibatalkan otomatis karena tidak menunjukkan tiket di kasir dalam batas <strong>5 menit setelah dipanggil</strong>.
                </p>
              </div>

              <div className="p-3 bg-black/40 rounded-xl border border-red-500/30 text-xs font-mono-code text-zinc-400 text-left space-y-1">
                <div className="flex justify-between">
                  <span>Nomor Antrean:</span>
                  <span className="text-white font-bold">{booking.ticketNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span>Restoran:</span>
                  <span className="text-white">{booking.merchantName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Alasan Batal:</span>
                  <span className="text-red-400">Tidak hadir di kasir dalam 5 mnt</span>
                </div>
              </div>

              <div className="p-3 bg-zinc-900/60 rounded-xl border border-white/10 text-[11px] text-zinc-400 text-left">
                💡 <em>Aturan QueQ: Jatah 5 menit diberikan agar meja tidak terbengkalai dan pengunjung di urutan berikutnya mendapatkan giliran secara adil.</em>
              </div>

              <button
                onClick={onResetTicket || onCancelTicket}
                className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-black font-display font-extrabold text-sm uppercase rounded-xl transition-all shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ambil Tiket Antrean Baru</span>
              </button>
            </div>
          ) : (
            <>
              {/* Alert Notice Banner if any */}
              {alertNotice && (
                <div className="p-3 bg-amber-400/10 border border-amber-400/40 rounded-xl text-xs text-amber-200 flex items-start gap-2 animate-in fade-in duration-200">
                  <span className="text-base shrink-0">🔔</span>
                  <div className="flex-1">
                    <span className="font-mono-code leading-tight block">{alertNotice}</span>
                  </div>
                  <button 
                    onClick={() => setAlertNotice(null)} 
                    className="text-zinc-400 hover:text-white text-xs font-mono-code ml-1"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* 2. DYNAMIC WORKFLOW BANNER (WAITING vs CALLED vs VERIFIED) */}
              
              {/* CASE A: CALLED (Meja Siap & 5-Minute Timer Active!) */}
              {isCalled && !isVerified && (
                <div className="p-4 bg-gradient-to-r from-red-950/80 via-[#220B0E] to-red-950/80 border-2 border-red-500 rounded-2xl shadow-xl shadow-red-950/50 space-y-3 animate-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                      </span>
                      <span className="text-xs font-mono-code font-extrabold uppercase tracking-wider text-red-300">
                        🚨 NOMOR ANDA DIPANGGIL!
                      </span>
                    </div>

                    {/* Digital Countdown Timer */}
                    <div className="flex items-center gap-1 font-mono-code font-extrabold">
                      <span className={`text-xl sm:text-2xl px-2.5 py-0.5 rounded-lg border shadow-inner ${
                        remainingSeconds <= 60
                          ? 'bg-red-500 text-white border-white animate-bounce'
                          : 'bg-black/80 text-amber-300 border-amber-400/40'
                      }`}>
                        {timerMinutes}:{timerSecs}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden border border-red-500/30 p-0.5">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${
                        remainingSeconds <= 60
                          ? 'bg-red-500'
                          : remainingSeconds <= 120
                            ? 'bg-orange-400'
                            : 'bg-amber-400'
                      }`}
                      style={{ width: `${percentProgress}%` }}
                    />
                  </div>

                  <p className="text-xs text-zinc-200 font-light leading-relaxed">
                    Segera tunjukkan <strong>barcode/tiket</strong> ini ke kasir resto sekarang. Jika dalam <strong>5 menit ({timerMinutes}:{timerSecs})</strong> tidak lapor di kasir, tiket otomatis <strong>HANGUS</strong>.
                  </p>

                  {/* Cashier Verification Action */}
                  <div className="flex flex-col sm:flex-row gap-2 pt-1">
                    <button
                      onClick={handleVerifyAtCashier}
                      disabled={isVerifying}
                      className="flex-1 py-3 px-3 bg-emerald-400 hover:bg-emerald-300 active:scale-95 text-black font-mono-code font-black text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-400/25 transition-all"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>{isVerifying ? 'Memproses Kasir...' : 'Tunjukkan & Verifikasi di Kasir'}</span>
                    </button>

                    {/* Quick Demo Helper: 10s Fast-Forward */}
                    <button
                      onClick={handleFastForwardTimer}
                      title="Percepat timer ke 10 detik untuk demonstrasi dosen/penguji bahwa tiket otomatis hangus"
                      className="py-2.5 px-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-amber-400 border border-white/10 rounded-xl font-mono-code text-[11px] flex items-center justify-center gap-1.5 transition-colors shrink-0"
                    >
                      <FastForward className="w-3.5 h-3.5" />
                      <span>Tes Sisa 10 Detik</span>
                    </button>
                  </div>
                </div>
              )}

              {/* CASE B: COMPLETED / VERIFIED */}
              {isVerified && (
                <div className="p-3.5 bg-emerald-950/40 border border-emerald-500/50 rounded-2xl">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/60 flex items-center justify-center text-emerald-400 shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-mono-code font-bold uppercase text-emerald-400">
                          TERVERIFIKASI DI KASIR
                        </span>
                        <span className="text-[10px] font-mono-code text-zinc-400">
                          • {booking.verifiedAt || 'Resmi'}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-300 font-light leading-tight mt-0.5">
                        Antrean sah & check-in kasir berhasil. Silakan menuju meja yang telah disiapkan!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* CASE C: WAITING (Relaxed, No Timer Running Yet) */}
              {isWaiting && !isVerified && (
                <div className="p-3.5 bg-zinc-900/80 border border-white/10 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                      <span className="text-xs font-mono-code font-bold uppercase text-amber-300">
                        {booking.status === 'almost_ready' ? 'HAMPIR GILIRAN ANDA' : 'MENUNGGU GILIRAN'}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono-code bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded border border-white/10">
                      BEBAS BERAKTIVITAS
                    </span>
                  </div>
                  
                  <p className="text-xs text-zinc-300 font-light leading-relaxed">
                    Anda bebas jalan-jalan, belanja, atau santai tanpa antre fisik di loket. Jatah <strong>5 menit ke kasir</strong> baru akan mulai berjalan saat nomor tiket Anda <strong>resmi dipanggil</strong>.
                  </p>

                  {/* Queue Simulation Buttons for Easy Testing */}
                  <div className="pt-1 flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={handleSimulateCallNow}
                      className="flex-1 py-2 px-3 bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/40 rounded-xl font-mono-code text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Megaphone className="w-3.5 h-3.5 text-amber-400" />
                      <span>Simulasi Dipanggil Sekarang</span>
                    </button>
                    <button
                      onClick={handleAdvanceQueue}
                      className="py-2 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-white/10 rounded-xl font-mono-code text-xs flex items-center justify-center gap-1.5 transition-colors shrink-0"
                    >
                      <Play className="w-3 h-3 fill-zinc-300" />
                      <span>Maju 1 Antrean</span>
                    </button>
                  </div>
                </div>
              )}

              {/* THE QUEQ PASS CARD (Notches & Perforations) */}
              <div className="relative bg-[#13161F] border border-amber-400/50 rounded-2xl overflow-hidden shadow-2xl">
                
                {/* Left & Right Notch Cutouts for Boarding Pass Look */}
                <div className="absolute top-[170px] -left-3 w-6 h-6 rounded-full bg-[#0D0F14] border-r border-amber-400/50 z-20" />
                <div className="absolute top-[170px] -right-3 w-6 h-6 rounded-full bg-[#0D0F14] border-l border-amber-400/50 z-20" />

                {/* Ticket Header */}
                <div className="p-5 pb-4 bg-gradient-to-b from-amber-400/10 via-transparent to-transparent">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono-code font-bold uppercase bg-amber-400 text-black px-2 py-0.5 rounded">
                      QUEQ DIGITAL PASS
                    </span>
                    <span className="text-xs font-mono-code text-zinc-400">
                      {booking.timestamp} WIB
                    </span>
                  </div>

                  <h2 className="font-display font-extrabold text-2xl text-white tracking-tight uppercase mt-2">
                    {booking.merchantName}
                  </h2>
                  <p className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{booking.merchantLocation}</span>
                  </p>
                </div>

                {/* GIANT QUEUE NUMBER (The Viral Screen) */}
                <div className="px-6 py-4 text-center bg-[#0B0D12] border-y border-white/10 relative">
                  <span className="text-[11px] font-mono-code uppercase tracking-widest text-zinc-400 block mb-1">
                    NOMOR TIKET ANTREAN ANDA
                  </span>
                  <div className={`font-display font-black text-6xl sm:text-7xl tracking-wider filter drop-shadow-[0_0_20px_rgba(251,191,36,0.3)] ${
                    isCalled && !isVerified ? 'text-red-400 animate-pulse' : 'text-amber-400'
                  }`}>
                    {booking.ticketNumber}
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <span className="inline-block text-xs font-mono-code text-zinc-300 border border-white/10 px-3 py-0.5 rounded-full bg-zinc-900/60">
                      {booking.partySize}
                    </span>
                    {booking.userEmail && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono-code text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full bg-emerald-500/10">
                        <Check className="w-2.5 h-2.5" />
                        <span>Tersimpan di Cloud</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Perforation Dashed Line */}
                <div className="relative border-b-2 border-dashed border-white/20 mx-4" />

                {/* Real-time Status Gauge */}
                <div className="p-5 space-y-4">
                  
                  <div className="grid grid-cols-2 gap-3 text-center font-mono-code">
                    <div className="p-3 rounded-xl bg-zinc-900/80 border border-white/10">
                      <span className="text-[10px] text-zinc-500 uppercase block">Sedang Dipanggil</span>
                      <span className="text-xl font-bold text-emerald-400">{booking.currentCalling}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-zinc-900/80 border border-white/10">
                      <span className="text-[10px] text-zinc-500 uppercase block">Sisa Antrean</span>
                      <span className={`text-xl font-bold ${booking.queuesAhead > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {booking.queuesAhead > 0 ? `${booking.queuesAhead} Meja` : 'Giliran Anda!'}
                      </span>
                    </div>
                  </div>

                  {/* Progress Visual Bar */}
                  <div>
                    <div className="flex justify-between text-xs font-mono-code text-zinc-400 mb-1.5">
                      <span>Estimasi Waktu Tunggu:</span>
                      <span className="text-white font-bold">~{booking.estimatedWaitMinutes} Menit</span>
                    </div>
                    <div className="w-full h-2.5 bg-zinc-900 rounded-full overflow-hidden border border-white/10 p-0.5">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.max(10, 100 - (booking.queuesAhead * 12))}%`
                        }}
                      />
                    </div>
                  </div>

                  {/* Barcode & QR Code Section */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 bg-white rounded-lg">
                        <QrCode className="w-8 h-8 text-black" />
                      </div>
                      <div className="text-[10px] font-mono-code text-zinc-400">
                        <span className="text-white font-bold block">KODE VALIDASI KASIR</span>
                        <span>ID: {booking.ticketId.slice(-8).toUpperCase()}</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <span className="text-[9px] font-mono-code text-zinc-500 block">SCAN DI LOKET</span>
                      <div className="font-mono-code tracking-widest text-[11px] text-zinc-400 font-bold">
                        ||||| | |||| |||
                      </div>
                    </div>
                  </div>

                </div>

              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={generateWaTicketUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-3 bg-emerald-500 hover:bg-emerald-400 text-black font-mono-code font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/10 transition-transform active:scale-95"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Simpan ke WA</span>
                </a>

                <button
                  onClick={onClose}
                  className="py-3 px-3 bg-zinc-800 hover:bg-zinc-700 text-white font-mono-code text-xs rounded-xl transition-colors border border-white/10"
                >
                  <span>Minimize Tiket</span>
                </button>
              </div>

              {/* Cancel Ticket */}
              <div className="text-center pt-1">
                <button
                  onClick={onCancelTicket}
                  className="text-[11px] font-mono-code text-zinc-500 hover:text-red-400 underline transition-colors"
                >
                  Batalkan Nomor Antrean Ini
                </button>
              </div>
            </>
          )}

        </div>

      </div>

    </div>
  );
};
