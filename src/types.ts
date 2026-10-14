export type JatimCity = 'SURABAYA' | 'MALANG' | 'OUTSIDE_JATIM';

export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

export interface Merchant {
  id: string;
  name: string;
  city: 'SURABAYA' | 'MALANG';
  location: string;
  category: string;
  categoryTag: 'bebek' | 'sate' | 'bakso' | 'cumi' | 'cafe' | 'all';
  avgWaitMinutes: number;
  crowdLevel: 'Sangat Ramai' | 'Padat Merayap' | 'Normal';
  badge: string;
  imageUrl: string;
  signatureDish: string;
  queueDifficulty: string;
  localQuote?: string;
  // QueQ live queue attributes
  currentCallingNumber: string;
  totalQueuesWaiting: number;
  isOpen: boolean;
  distanceKm: number;
}

export interface QueQBooking {
  ticketId: string;
  merchantId: string;
  merchantName: string;
  merchantLocation: string;
  merchantCity: 'SURABAYA' | 'MALANG';
  partySize: '1-2 Orang' | '3-4 Orang' | '5+ Orang';
  ticketNumber: string;
  currentCalling: string;
  queuesAhead: number;
  estimatedWaitMinutes: number;
  customerName: string;
  customerPhone: string;
  timestamp: string;
  status: 'waiting' | 'almost_ready' | 'called' | 'completed' | 'cancelled' | 'expired';
  userId?: string | null;
  userEmail?: string | null;
  // 5-Minute Cashier Verification & Countdown Timer (starts upon being called)
  createdAtMs: number;
  calledAtMs?: number | null;
  verificationDeadlineMs?: number | null;
  isCashierVerified: boolean;
  verifiedAt?: string | null;
  cancellationReason?: string | null;
}

export interface QueueActivity {
  id: string;
  userName: string;
  merchantName: string;
  city: 'SURABAYA' | 'MALANG';
  timeAgo: string;
  status: 'Dipanggil Masuk' | 'Ambil Tiket' | 'Meja Siap';
  queueNumber: string;
}

export type Timezone = 'WIB';
