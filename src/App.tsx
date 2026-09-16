import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LiveSocialProof } from './components/LiveSocialProof';
import { HowItWorks } from './components/HowItWorks';
import { MerchantShowcase } from './components/MerchantShowcase';
import { PricingCalculator } from './components/PricingCalculator';
import { PRDViewerModal } from './components/PRDViewerModal';
import { OutsideJatimModal } from './components/OutsideJatimModal';
import { Footer } from './components/Footer';
import { FileText, MapPin, X, Sparkles } from 'lucide-react';
import { JatimCity } from './types';

export default function App() {
  const [currentCity, setCurrentCity] = useState<JatimCity>('SURABAYA');
  const [isPRDOpen, setIsPRDOpen] = useState(false);
  const [isOutsideModalOpen, setIsOutsideModalOpen] = useState(false);
  const [selectedMerchant, setSelectedMerchant] = useState('');
  const [showTopAlert, setShowTopAlert] = useState(true);

  // Attempt gentle geolocation detection on mount
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          
          // Distance to Surabaya (-7.2575, 112.7521)
          const distSby = Math.hypot(lat - (-7.2575), lon - 112.7521);
          // Distance to Malang (-7.9666, 112.6326)
          const distMlg = Math.hypot(lat - (-7.9666), lon - 112.6326);

          if (distMlg < 0.35) {
            setCurrentCity('MALANG');
          } else if (distSby < 0.45) {
            setCurrentCity('SURABAYA');
          }
        },
        () => {
          // Default to Surabaya on permission denied or error
        },
        { timeout: 5000 }
      );
    }
  }, []);

  const handleSelectCity = (city: JatimCity) => {
    if (city === 'OUTSIDE_JATIM') {
      setIsOutsideModalOpen(true);
    } else {
      setCurrentCity(city);
    }
  };

  const handleExploreMerchants = () => {
    const el = document.getElementById('merchants');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#090A0C] text-[#F3F4F6] font-sans relative selection:bg-amber-400 selection:text-black">
      
      {/* Top Banner Alert */}
      {showTopAlert && (
        <aside aria-label="Pengumuman Spesifikasi PRD" className="bg-amber-400 text-black px-4 py-2 text-xs font-mono-code flex items-center justify-between gap-4 border-b border-black/20 z-50 relative">
          <div className="flex items-center gap-2 overflow-hidden truncate">
            <span className="bg-black text-amber-300 px-1.5 py-0.5 text-[10px] font-bold uppercase shrink-0">
              JATIM EDITION // PRD v2.0 APPROVED
            </span>
            <span className="truncate">
              Eksklusif Jawa Timur (Surabaya & Malang). Klik "BACA PRD" untuk spesifikasi CPO & UX.
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsPRDOpen(true)}
              className="underline font-bold hover:text-zinc-800 text-[11px] flex items-center gap-1"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Buka Dokumen PRD Jatim</span>
            </button>
            <button
              onClick={() => setShowTopAlert(false)}
              className="text-black/70 hover:text-black"
              aria-label="Tutup banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>
      )}

      {/* Main Top Navigation */}
      <Navbar
        currentCity={currentCity}
        onSelectCity={handleSelectCity}
        onOpenPRD={() => setIsPRDOpen(true)}
        onOpenOutsideModal={() => setIsOutsideModalOpen(true)}
      />

      {/* Main Sections */}
      <main>
        {/* 1. Cinematic Hero Section */}
        <Hero
          currentCity={currentCity}
          onSelectCity={handleSelectCity}
          onExploreMerchants={handleExploreMerchants}
        />

        {/* 2. Live Social Proof (East Java Marquee & Toasts) */}
        <LiveSocialProof currentCity={currentCity} />

        {/* 3. How It Works 3-Step Interactive Blueprint */}
        <HowItWorks />

        {/* 4. Curated Top Merchants (East Java Edition Magazine Covers) */}
        <MerchantShowcase
          currentCity={currentCity}
          onSelectMerchant={(m) => setSelectedMerchant(m)}
        />

        {/* 5. Transparent Pricing Matrix & Giant WhatsApp CTA */}
        <PricingCalculator
          currentCity={currentCity}
          selectedMerchant={selectedMerchant}
          onMerchantChange={setSelectedMerchant}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenPRD={() => setIsPRDOpen(true)}
        onOpenOutsideModal={() => setIsOutsideModalOpen(true)}
      />

      {/* Comprehensive PRD Document Reader Modal */}
      <PRDViewerModal isOpen={isPRDOpen} onClose={() => setIsPRDOpen(false)} />

      {/* Outside East Java Elegant Notice Modal */}
      <OutsideJatimModal
        isOpen={isOutsideModalOpen}
        onClose={() => setIsOutsideModalOpen(false)}
      />

    </div>
  );
}
