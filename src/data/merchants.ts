import { Merchant, QueueActivity } from '../types';

export const TOP_MERCHANTS: Merchant[] = [
  {
    id: 'm-sby-1',
    name: 'Bebek Sinjay',
    city: 'SURABAYA',
    location: 'Suramadu & Jl. Mayjen Sungkono, Surabaya',
    category: 'Legendary Crispy Duck & Sambal Pencit',
    avgWaitMinutes: 85,
    crowdLevel: 'Sangat Ramai',
    badge: 'SURABAYA #01 HOTSPOT',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop',
    signatureDish: 'Bebek Goreng Kremes + Sambal Mangga Muda (Pencit)',
    queueDifficulty: 'Ekstrem (60-120 Menit)',
    localQuote: 'Antriane nggilani, tapi sambel pencite marai nagih!'
  },
  {
    id: 'm-mlg-1',
    name: 'Sego Resek Kasin',
    city: 'MALANG',
    location: 'Jl. Brigjend Katamso, Kasin, Klojen, Malang',
    category: 'Legendary Charcoal Night Rice Institution',
    avgWaitMinutes: 90,
    crowdLevel: 'Sangat Ramai',
    badge: 'MALANG HERITAGE #01',
    imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=1000&auto=format&fit=crop',
    signatureDish: 'Sego Goreng Arang Kuah Kaldu + Babat & Suwir Ayam',
    queueDifficulty: 'Ekstrem (75-110 Menit)',
    localQuote: 'Buka jam 6 sore, jam 7 nomer antrean wis ludes sam!'
  },
  {
    id: 'm-sby-2',
    name: 'Sate Klopo Ondomohen Bu Asih',
    city: 'SURABAYA',
    location: 'Jl. Walikota Mustajab No. 36, Surabaya Pusat',
    category: 'Iconic Grated Coconut Beef & Chicken Satay',
    avgWaitMinutes: 60,
    crowdLevel: 'Padat Merayap',
    badge: 'SURABAYA HERITAGE',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000&auto=format&fit=crop',
    signatureDish: 'Sate Daging & Lemak Bumbu Kelapa Bakar + Bumbu Kacang Kental',
    queueDifficulty: 'Tinggi (45-75 Menit)',
    localQuote: 'Ambune gurih sangit, pejabat sampe artis nek neng Suroboyo mesti mrene.'
  },
  {
    id: 'm-mlg-2',
    name: 'Bakso President Malang',
    city: 'MALANG',
    location: 'Jl. Batanghari No. 5 (Pinggir Rel Kereta Api), Malang',
    category: 'Iconic Trackside Meatball & Crispy Wonton',
    avgWaitMinutes: 70,
    crowdLevel: 'Padat Merayap',
    badge: 'MALANG ICONIC',
    imageUrl: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?q=80&w=1000&auto=format&fit=crop',
    signatureDish: 'Bakso Campur Spesial (Urat + Gorengan Mekar + Ati Ampela)',
    queueDifficulty: 'Tinggi (45-80 Menit)',
    localQuote: 'Sensasi mangan bakso pas sepur lewat, antreane ndowo sam!'
  },
  {
    id: 'm-sby-3',
    name: 'Nasi Cumi Waspada (Pasar Atom)',
    city: 'SURABAYA',
    location: 'Jl. Waspada No. 2-4, Pabean Cantian, Surabaya',
    category: 'Midnight Black Squid & Offal Legend',
    avgWaitMinutes: 75,
    crowdLevel: 'Sangat Ramai',
    badge: 'MIDNIGHT LEGEND',
    imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=1000&auto=format&fit=crop',
    signatureDish: 'Nasi Cumi Hitam Komplit + Empal Manis + Serundeng & Sambal Pencit',
    queueDifficulty: 'Ekstrem (60-90 Menit)',
    localQuote: 'Kulier wengi paling laris, antriane gak tau sepi 24 jam.'
  },
  {
    id: 'm-mlg-3',
    name: 'Kafe Viral Suhat / Toko Oen',
    city: 'MALANG',
    location: 'Kawasan Soekarno-Hatta & Jl. Basuki Rahmat, Malang',
    category: 'Artisanal Bakery & Trendy Hangout Spot',
    avgWaitMinutes: 50,
    crowdLevel: 'Normal',
    badge: 'KAFE VIRAL MAHASISWA',
    imageUrl: 'https://images.unsplash.com/photo-1527515862127-a4fc05baf7a5?q=80&w=1000&auto=format&fit=crop',
    signatureDish: 'Artisanal Croissant, Gelato Heritage & Manual Brew Coffee',
    queueDifficulty: 'Sedang (35-60 Menit)',
    localQuote: 'Spot favorit mahasiswa Brawijaya & Polinema nongkrong akhir pekan.'
  }
];

export const RECENT_ACTIVITIES: QueueActivity[] = [
  {
    id: 'act-1',
    driverName: 'Cak Budi Santoso',
    merchantName: 'Bakso President Malang',
    city: 'MALANG',
    timeAgo: '5 menit lalu',
    status: 'Sedang Mengantre',
    queueNumber: '#MLG-104'
  },
  {
    id: 'act-2',
    driverName: 'Cak Dimas Pratama',
    merchantName: 'Sate Klopo Ondomohen Bu Asih',
    city: 'SURABAYA',
    timeAgo: '8 menit lalu',
    status: 'Pesanan Siap',
    queueNumber: '#SBY-42'
  },
  {
    id: 'act-3',
    driverName: 'Cak Slamet Raharjo',
    merchantName: 'Bebek Sinjay Suramadu',
    city: 'SURABAYA',
    timeAgo: '12 menit lalu',
    status: 'Menuju Lokasi Pemesan',
    queueNumber: '#SBY-VIP09'
  },
  {
    id: 'act-4',
    driverName: 'Cak Gani Alamsyah',
    merchantName: 'Sego Resek Kasin Malang',
    city: 'MALANG',
    timeAgo: '15 menit lalu',
    status: 'Sedang Mengantre',
    queueNumber: '#MLG-88'
  },
  {
    id: 'act-5',
    driverName: 'Cak Arifin Wijaya',
    merchantName: 'Nasi Cumi Waspada Pasar Atom',
    city: 'SURABAYA',
    timeAgo: '19 menit lalu',
    status: 'Pesanan Siap',
    queueNumber: '#SBY-CUMI18'
  }
];
