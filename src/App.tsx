import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LiveSocialProof } from './components/LiveSocialProof';
import { HowItWorks } from './components/HowItWorks';
import { MerchantShowcase } from './components/MerchantShowcase';
import { OutsideJatimModal } from './components/OutsideJatimModal';
import { QueQBookingModal } from './components/QueQBookingModal';
import { QueQDigitalTicketModal } from './components/QueQDigitalTicketModal';
import { QueQFloatingTicketBar } from './components/QueQFloatingTicketBar';
import { Footer } from './components/Footer';
import { FirebaseAuthHelpModal } from './components/FirebaseAuthHelpModal';
import { JatimCity, Merchant, QueQBooking, UserProfile } from './types';
import { TOP_MERCHANTS } from './data/merchants';
import { 
  testFirestoreConnection, 
  initializeMerchantsInFirestore,
  saveQueueTicketToFirestore,
  updateQueueTicketInFirestore,
  cancelQueueTicketInFirestore,
  loginWithGoogle,
  loginWithGoogleRedirect,
  checkRedirectAuth,
  logoutUser,
  onAuthUserChange,
  fetchUserLatestTicketFromFirestore
} from './firebase';

export default function App() {
  const [currentCity, setCurrentCity] = useState<JatimCity>('SURABAYA');
  const [isOutsideModalOpen, setIsOutsideModalOpen] = useState(false);
  
  // Google Auth User State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  // QueQ Interactive States
  const [bookingMerchant, setBookingMerchant] = useState<Merchant | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [activeBooking, setActiveBooking] = useState<QueQBooking | null>(() => {
    try {
      const saved = localStorage.getItem('queq_active_ticket');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [authError, setAuthError] = useState<{
    isOpen: boolean;
    code?: string;
    message?: string;
  } | null>(null);

  // Initialize Firebase Auth & Firestore on mount
  useEffect(() => {
    // Check redirect auth result if user returned from mobile Google redirect flow
    checkRedirectAuth()
      .then(async (profile) => {
        if (profile) {
          setCurrentUser(profile);
          try {
            const userTicket = await fetchUserLatestTicketFromFirestore(profile.uid);
            if (userTicket) setActiveBooking(userTicket);
          } catch (e) {
            console.warn('Could not fetch ticket after redirect login:', e);
          }
        }
      })
      .catch((err) => {
        if (err?.code === 'auth/unauthorized-domain' || err?.code === 'auth/popup-blocked') {
          setAuthError({
            isOpen: true,
            code: err.code,
            message: err.message
          });
        }
      });

    // Listen for auth changes
    const unsubscribe = onAuthUserChange(async (user) => {
      setCurrentUser(user);

      // If user logs in and doesn't have an active local ticket, check cloud
      if (user && !activeBooking) {
        try {
          const cloudTicket = await fetchUserLatestTicketFromFirestore(user.uid);
          if (cloudTicket) {
            setActiveBooking(cloudTicket);
          }
        } catch (e) {
          console.warn('Could not sync user ticket on auth change:', e);
        }
      }
    });

    // Test connection and seed merchants in background
    testFirestoreConnection().then(() => {
      initializeMerchantsInFirestore();
    });

    return () => unsubscribe();
  }, []);

  // Save active ticket to localStorage whenever it changes
  useEffect(() => {
    if (activeBooking) {
      localStorage.setItem('queq_active_ticket', JSON.stringify(activeBooking));
    } else {
      localStorage.removeItem('queq_active_ticket');
    }
  }, [activeBooking]);

  // Gentle geolocation detection on mount
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          
          const distSby = Math.hypot(lat - (-7.2575), lon - 112.7521);
          const distMlg = Math.hypot(lat - (-7.9666), lon - 112.6326);

          if (distMlg < 0.35) {
            setCurrentCity('MALANG');
          } else if (distSby < 0.45) {
            setCurrentCity('SURABAYA');
          }
        },
        () => {},
        { timeout: 5000 }
      );
    }
  }, []);

  const handleLoginWithGoogle = async () => {
    try {
      const profile = await loginWithGoogle();
      setCurrentUser(profile);
      // Check if user has active ticket in Firestore
      const userTicket = await fetchUserLatestTicketFromFirestore(profile.uid);
      if (userTicket) {
        setActiveBooking(userTicket);
      }
    } catch (err: any) {
      if (err?.code === 'auth/popup-closed-by-user') {
        return;
      }
      console.error('Login error:', err);
      setAuthError({
        isOpen: true,
        code: err?.code,
        message: err?.message || 'Login dengan Google gagal'
      });
    }
  };

  const handleLoginWithGoogleRedirect = async () => {
    try {
      await loginWithGoogleRedirect();
    } catch (err: any) {
      setAuthError({
        isOpen: true,
        code: err?.code,
        message: err?.message
      });
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setCurrentUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

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

  const handleOpenQuickQueue = () => {
    const featured = TOP_MERCHANTS.find(m => m.city === (currentCity === 'MALANG' ? 'MALANG' : 'SURABAYA')) || TOP_MERCHANTS[0];
    setBookingMerchant(featured);
    setIsBookingModalOpen(true);
  };

  const handleOpenMerchantBooking = (merchant: Merchant) => {
    setBookingMerchant(merchant);
    setIsBookingModalOpen(true);
  };

  const handleConfirmBooking = async (newBooking: QueQBooking) => {
    const bookingWithUser: QueQBooking = {
      ...newBooking,
      userId: currentUser?.uid || newBooking.userId || null,
      userEmail: currentUser?.email || newBooking.userEmail || null
    };

    setActiveBooking(bookingWithUser);
    setIsBookingModalOpen(false);
    setIsTicketModalOpen(true);

    // Save to Firestore Database
    try {
      await saveQueueTicketToFirestore(bookingWithUser);
    } catch (e) {
      console.warn('Saved locally, Firestore sync pending:', e);
    }
  };

  // Background interval check for 5-minute cashier verification AFTER being called
  useEffect(() => {
    if (!activeBooking) return;
    if (activeBooking.isCashierVerified) return;
    // 5-minute timer only runs when user has been called
    if (activeBooking.status !== 'called') return;

    const interval = setInterval(() => {
      if (activeBooking.verificationDeadlineMs && Date.now() >= activeBooking.verificationDeadlineMs) {
        const expiredTicket: QueQBooking = {
          ...activeBooking,
          status: 'expired',
          cancellationReason: 'Batas waktu 5 menit setelah dipanggil telah habis tanpa konfirmasi di kasir. Antrean dibatalkan otomatis.'
        };
        setActiveBooking(expiredTicket);
        setIsTicketModalOpen(true); // Open modal to alert user immediately
        updateQueueTicketInFirestore(activeBooking.ticketId, {
          status: 'expired',
          cancellationReason: 'Batas waktu 5 menit setelah dipanggil telah habis tanpa konfirmasi di kasir. Antrean dibatalkan otomatis.'
        }).catch(err => console.warn('Sync expired error:', err));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [activeBooking]);

  const handleUpdateBooking = async (updated: QueQBooking) => {
    setActiveBooking(updated);

    // Update in Firestore Database
    try {
      await updateQueueTicketInFirestore(updated.ticketId, {
        queuesAhead: updated.queuesAhead,
        currentCalling: updated.currentCalling,
        estimatedWaitMinutes: updated.estimatedWaitMinutes,
        status: updated.status,
        calledAtMs: updated.calledAtMs ?? null,
        verificationDeadlineMs: updated.verificationDeadlineMs ?? null,
        isCashierVerified: updated.isCashierVerified ?? false,
        verifiedAt: updated.verifiedAt ?? null,
        cancellationReason: updated.cancellationReason ?? null
      });
    } catch (e) {
      console.warn('Updated locally, Firestore sync pending:', e);
    }
  };

  const handleCancelTicket = async () => {
    if (confirm('Apakah Anda yakin ingin membatalkan nomor antrean ini?')) {
      if (activeBooking) {
        try {
          await cancelQueueTicketInFirestore(activeBooking.ticketId);
        } catch (e) {
          console.warn('Deleted locally, Firestore pending:', e);
        }
      }
      setActiveBooking(null);
      setIsTicketModalOpen(false);
    }
  };

  const handleResetTicket = async () => {
    if (activeBooking) {
      try {
        await cancelQueueTicketInFirestore(activeBooking.ticketId);
      } catch (e) {
        console.warn('Error clearing ticket:', e);
      }
    }
    setActiveBooking(null);
    setIsTicketModalOpen(false);
    handleExploreMerchants();
  };

  return (
    <div className="min-h-screen bg-[#08090D] text-[#F3F4F6] font-sans relative selection:bg-amber-400 selection:text-black">
      
      {/* Main Top Navigation with Google Login & City Switcher */}
      <Navbar
        currentCity={currentCity}
        onSelectCity={handleSelectCity}
        onOpenOutsideModal={() => setIsOutsideModalOpen(true)}
        hasActiveTicket={!!activeBooking}
        onOpenTicket={() => setIsTicketModalOpen(true)}
        currentUser={currentUser}
        onLoginWithGoogle={handleLoginWithGoogle}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main>
        {/* 1. Cinematic QueQ Hero Section */}
        <Hero
          currentCity={currentCity}
          onSelectCity={handleSelectCity}
          onExploreMerchants={handleExploreMerchants}
          onOpenQuickQueue={handleOpenQuickQueue}
        />

        {/* 2. Live QueQ Social Proof Ticker */}
        <LiveSocialProof currentCity={currentCity} />

        {/* 3. Live QueQ Merchants Grid */}
        <MerchantShowcase
          currentCity={currentCity}
          onOpenBooking={handleOpenMerchantBooking}
        />

        {/* 4. How It Works: Solusi Anti-Penumpukan Waiting List */}
        <HowItWorks />
      </main>

      {/* Footer */}
      <Footer
        onOpenOutsideModal={() => setIsOutsideModalOpen(true)}
      />

      {/* QueQ Remote Booking Modal with Google Profile Integration */}
      <QueQBookingModal
        isOpen={isBookingModalOpen}
        merchant={bookingMerchant}
        currentUser={currentUser}
        onLoginWithGoogle={handleLoginWithGoogle}
        onClose={() => setIsBookingModalOpen(false)}
        onConfirmBooking={handleConfirmBooking}
      />

      {/* Viral QueQ Digital Boarding Pass Ticket Modal */}
      <QueQDigitalTicketModal
        isOpen={isTicketModalOpen}
        booking={activeBooking}
        onClose={() => setIsTicketModalOpen(false)}
        onCancelTicket={handleCancelTicket}
        onUpdateBooking={handleUpdateBooking}
        onResetTicket={handleResetTicket}
      />

      {/* Persistent Floating Bottom Ticket Bar */}
      {!isTicketModalOpen && (
        <QueQFloatingTicketBar
          booking={activeBooking}
          onOpenTicket={() => setIsTicketModalOpen(true)}
        />
      )}

      {/* Outside East Java Modal */}
      <OutsideJatimModal
        isOpen={isOutsideModalOpen}
        onClose={() => setIsOutsideModalOpen(false)}
      />

      {/* Firebase Auth Help Modal for Vercel / Domain Configuration */}
      <FirebaseAuthHelpModal
        isOpen={!!authError?.isOpen}
        errorCode={authError?.code}
        errorMessage={authError?.message}
        onClose={() => setAuthError(null)}
        onTryRedirectLogin={handleLoginWithGoogleRedirect}
      />
    </div>
  );
}
