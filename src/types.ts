export type JatimCity = 'SURABAYA' | 'MALANG' | 'OUTSIDE_JATIM';

export interface Merchant {
  id: string;
  name: string;
  city: 'SURABAYA' | 'MALANG';
  location: string;
  category: string;
  avgWaitMinutes: number;
  crowdLevel: 'Sangat Ramai' | 'Padat Merayap' | 'Normal';
  badge: string;
  imageUrl: string;
  signatureDish: string;
  queueDifficulty: string;
  localQuote?: string;
}

export interface QueueActivity {
  id: string;
  driverName: string;
  merchantName: string;
  city: 'SURABAYA' | 'MALANG';
  timeAgo: string;
  status: 'Sedang Mengantre' | 'Pesanan Siap' | 'Menuju Lokasi Pemesan';
  queueNumber: string;
}

export interface PricingOption {
  id: string;
  name: string;
  baseWait: string;
  price: number;
  description: string;
  features: string[];
  recommended?: boolean;
}

export type Timezone = 'WIB';

