export const PRD_RAW_MARKDOWN = `# PRODUCT REQUIREMENT DOCUMENT (PRD)
## PROJECT: TITIP.ANTRI — HIGH-END FOOD QUEUING SERVICE (EAST JAVA EDITION)
**Kode Dokumen:** PRD-TITIPANTRI-JATIM-2026-V2  
**Penulis:** Chief Product Officer (CPO) & Lead UI/UX Designer  
**Target Rilis:** Q4 2026  
**Fokus Wilayah:** Jawa Timur (Eksklusif Surabaya Raya & Malang Raya)  
**Status Persetujuan:** *Approved for Engineering Execution*  

---

### 1. Product Vision & Strategy

#### 1.1 Elevator Pitch (Kultur Hustle Arek Jatim)
> *"TITIP.ANTRI mulihno wektu larangmu: Awak dewe sing gelem kepanasan, desek-desekan, lan ngantri sampek berjam-jam nang kuliner viral utawa legendaris Jawa Timur, ben koen kabeh iso panggah fokus nyambut gawe utawa santai ngrasakno panganan enak tanpa kudu sambat."*
> 
> *(TITIP.ANTRI mengembalikan kemewahan waktu Anda: Kami yang rela berpeluh, berdesakan, dan mengantre berjam-jam di kuliner viral maupun legendaris Jawa Timur, agar Anda tetap fokus berkarya dan tinggal menikmati santapan juara tanpa perlu mengorbankan kenyamanan.)*

#### 1.2 Latar Belakang & Nilai Bisnis Regional
Kultur masyarakat Jawa Timur—khususnya metropolitan Surabaya dan poros kreatif pendidikan Malang Raya—terkenal dengan etos kerja keras (*hustle culture*) yang dinamis, namun memiliki fanatisme cita rasa kuliner tingkat tinggi. Fenomena antrean ekstrem di resto legendaris seperti Bebek Sinjay (Suramadu/Sungkono), Sego Resek Kasin, Sate Klopo Ondomohen Bu Asih, Nasi Cumi Waspada Pasar Atom, hingga kafe hits di Suhat Malang, menguras 60 hingga 120 menit waktu produktif.

Bagi pengusaha Surabaya, profesional korporat Pakuwon/Gubeng, maupun mahasiswa dan pegiat kreatif di Malang, membuang waktu 2 jam demi antrean fisik adalah pemborosan energi yang tidak masuk akal. TITIP.ANTRI hadir memadukan efisiensi logistik perkotaan dengan sentuhan personal *concierge*: blak-blakan, jujur, cepat, dan terverifikasi secara visual.

#### 1.3 Key Success Metrics (KPI)

| Key Performance Indicator (KPI) | Target Benchmark | Metodologi & Tools Pengukuran | Implikasi Bisnis Jawa Timur |
| :--- | :--- | :--- | :--- |
| **Primary Conversion Rate (WhatsApp Click-Through)** | **≥ 15.8%** dari total pengunjung unik | GA4 Custom Event (\`click_cta_whatsapp_jatim\`) | Validasi bahwa kalkulator tarif flat Malang/Surabaya memicu pesanan instan. |
| **Pertumbuhan User Surabaya Raya** | **+45% MoM** (Bulan 1–3) | Mixpanel Cohort Tracking (Surabaya Segment) | Penetrasi segmen profesional CBD Mayjen Sungkono, Pakuwon, & Gubeng. |
| **Pertumbuhan User Malang Raya** | **+60% MoM** (Bulan 1–3) | Mixpanel Cohort Tracking (Malang Segment) | Penetrasi mahasiswa UB, UM, Polinema, & spot kuliner hits Suhat. |
| **Average Time on Site** | **≥ 2 Menit 30 Detik** | Google Analytics 4 User Engagement | Menilai interaksi cover majalah resto dan kalkulator tarif transparan. |
| **Bounce Rate Pengunjung Jatim** | **≤ 28%** | GA4 Geo-filtered (Jawa Timur IP) | Relevansi visual lokal mengurangi *drop-off* drastis. |
| **Conversion Waitlist Luar Jatim** | **≥ 35%** pengunjung non-Jatim isi waitlist | Event tracking (\`submit_waitlist_outer_jatim\`) | Mengukur potensi ekspansi ke Jabodetabek/Solo/Yogya. |

---

### 2. User Personas (Local Context)

#### 2.1 Persona 1: "Arek Suroboyo Sibuk" (The Relentless Hustler)
- **Nama Representatif:** Hendra Tanuwidjaja (35 tahun).
- **Profesi & Domisili:** Pengusaha Manufaktur / Senior Finance Manager, berdomisili di Pakuwon City / kantor di Koridor Mayjen Sungkono, Surabaya.
- **Karakter & Gaya Hidup:** Sangat menghargai waktu (*"Wektu iku dhuwit, Rek!"*), menyukai makanan bercita rasa medok dan otentik, menggunakan smartphone flagship, mobilitas tinggi menggunakan mobil dinas.
- **Pain Points:**
  - Butuh traktiran makan siang mendadak untuk relasi bisnis atau keluarga (misal: Bebek Sinjay atau Sate Klopo Ondomohen), namun antrean siang hari mencapai 40-75 orang di ruang tanpa pendingin udara.
  - Sering kecewa dengan jastip tidak resmi yang tidak transparan atau pesanan sambal pencit tidak lengkap.
  - Membenci proses registrasi aplikasi bertele-tele; ingin langsung pesan via WhatsApp dengan instruksi ringkas.
- **Motivations:**
  - *Time Arbitrage:* Membayar tarif flat jasa antri Surabaya (Rp 35.000–Rp 60.000) adalah investasi kecil dibanding reputasi deal bisnis jutaan rupiah yang terjaga.
  - Bukti fisik nomor tiket antrean dan foto selfie pilot di depan kasir resto untuk jaminan kepastian.

#### 2.2 Persona 2: "Mahasiswa FOMO Malang" (The Trend-Chasing Student)
- **Nama Representatif:** Dinda Maharani (21 tahun).
- **Status & Domisili:** Mahasiswi Semester Akhir Universitas Brawijaya (UB), kost di kawasan Soekarno-Hatta (Suhat), Malang.
- **Karakter & Gaya Hidup:** Konsumen konten TikTok/Instagram kuliner, suka mencoba tempat makan viral malam hari (Sego Resek Kasin, Bakso President pinggir rel sepur, atau kafe bakery estetik), aktif nongkrong hingga larut malam.
- **Pain Points:**
  - Sego Resek Kasin buka jam 18:00, namun antrean nomor tiket sudah mengular sejak jam 17:30 dalam cuaca dingin malam Malang.
  - Malas mengorbankan waktu belajar, nugas skripsi, atau nongkrong cantik hanya demi berdiri di pinggir jalan selama 1.5 jam.
  - Anggaran mahasiswa terukur; menuntut kepastian tarif flat transparan tanpa biaya siluman (*no hidden charge*).
- **Motivations:**
  - Tetap bisa menikmati kuliner *hits* tanpa lelah antre, lalu membuat konten review di media sosial.
  - Patungan jasa joki antri bersama 3-4 teman sekost (biaya per orang menjadi sangat terjangkau, sekitar Rp 7.500 - Rp 10.000/orang).

---

### 3. Detailed UI/UX & Page Architecture

Visual dirancang dengan perpaduan **"Cinematic Dark Mode + Brutalist-Minimalism"**: background bertema malam dramatis (siluet Jembatan Suramadu & hawa sejuk Ijen Boulevard Malang), tipografi raksasa tebal (*oversized display*), dan aksen warna emas Jawa Timur (\`#F59E0B\`).

\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│ TOP NAVIGATION: Logo TITIP.ANTRI | Clock WIB Jatim | City Switcher     │
├────────────────────────────────────────────────────────────────────────┤
│ CINEMATIC HERO: "KAMI YANG ANTRE. ANDA TINGGAL NIKMATI." | Suramadu/Ijen Night │
├────────────────────────────────────────────────────────────────────────┤
│ LIVE SOCIAL PROOF: Ticker Cak Budi di Bakso President | Toast Jatim   │
├────────────────────────────────────────────────────────────────────────┤
│ HOW IT WORKS: 3 Langkah (Titip -> Pilot Budhal -> Panganan Teko)       │
├────────────────────────────────────────────────────────────────────────┤
│ CURATED TOP MERCHANTS: Magazine Cover Jatim (Sinjay, Resek, Ondomohen) │
├────────────────────────────────────────────────────────────────────────┤
│ TRANSPARENT PRICING & CTA: Flat Surabaya & Malang + WhatsApp Admin     │
├────────────────────────────────────────────────────────────────────────┤
│ FOOTER: Dispatch Hubs Gubeng/Suhat + Geolocation Specs                 │
└────────────────────────────────────────────────────────────────────────┘
\`\`\`

#### 3.1 Top Navigation (Header Bar)
* **Kiri (Logo Brand):** Teks brutalist \`TITIP.ANTRI®\` dengan dot neon amber dan sub-teks \`[JATIM OPS // SBY-MLG]\`.
* **Tengah (Real-Time Clock & Location Selector):**
  * Jam digital live format \`HH:MM:SS WIB\` (Zona Waktu Indonesia Barat).
  * **City Switcher Interaktif:** Tombol pill \`SURABAYA RAYA\` dan \`MALANG RAYA\` yang dapat diklik untuk menyaring rekomendasi merchant secara dinamis.
  * Status radar pilot: \`[94 PILOT CAK AKTIF DI LAPANGAN]\` dengan indikator radar berdenyut.
* **Kanan (Navigasi Minimalis & Trigger PRD):**
  * Tautan anchor: \`Alur Kerja\`, \`Resto Jatim\`, \`Tarif Flat\`.
  * Tombol \`BACA PRD (CPO SPEC)\` untuk membuka dokumen arsitektur produk ini.
  * Tombol CTA cepat \`Pesan Pilot Cak\` langsung scroll ke formulir.

#### 3.2 Cinematic Hero Section
* **Background Visual Sinematik:**
  * Foto/video loop dramatis malam hari: transisi antara siluet kemegahan Jembatan Suramadu berlampu temaram dan jalanan rindang berkarakter Ijen Boulevard Malang.
  * Dilengkapi filter desaturasi gelap (80% black vignette overlay) dan tekstur *subtle noise* untuk menjamin keterbacaan teks utama secara mutlak.
* **Kinetic Typography (Main Text):**
  * Tipografi raksasa bergaya display tebal (*Syne font*):  
    \`KAMI YANG ANTRE.\`  
    \`ANDA TINGGAL NIKMATI.\`
  * Diberi penekanan aksen: frasa *"ANDA TINGGAL NIKMATI"* dibalut warna amber emas dengan *staggered animation* saat halaman dimuat.
* **Caption Pojok Kiri Bawah (The East Java Manifesto):**
  * Header editorial: \`01 // MANIFESTO AREK JATIM\`
  * Teks narasi: *"Ojo ngentekno 90 menit wektumu mung gawe ngadeg kepanasan nang trotoar ngenteni sego cumi utawa bebek viral. Pasukan pilot joki TITIP.ANTRI sing budhal berjuang nang barisan ngarep, koen kari lungguh anteng nyruput kopi."*
* **Aksen Pojok Kanan Bawah:**
  * Indikator koordinat geografis: \`SURABAYA (7.2575° S, 112.7521° E) // MALANG (7.9666° S, 112.6326° E)\`.

#### 3.3 Live Social Proof (Kepercayaan & Urgensi Riil)
* **Marquee Teks Berjalan (East Java Dispatch Ticker):**
  * Pita berjalan berkecepatan 28 detik looping mulus:  
    \`[LIVE DISPATCH JATIM]\` Cak Budi lagi ngantre nang Bakso President Malang (#MLG-104) • Cak Dimas ngamanake nomer antrean Sate Klopo Ondomohen Surabaya (#SBY-42) • Cak Slamet OTW ngeterno Bebek Sinjay Suramadu • Cak Gani budhal nang Sego Resek Kasin (#MLG-88) • 100% Bukti Tiket Asli & Amanah •
* **Floating Real-Time Toast Notification:**
  * Pop-up halus di pojok kiri bawah yang berganti setiap 7 detik, menampilkan foto status, nama pilot panggilan khas Jatim (Cak Budi, Cak Slamet), dan stempel menit lalu.

#### 3.4 How It Works (Alur Kerja 3 Langkah Mudah)
Struktur *architectural blueprint* dengan istilah lokal yang lugas:
1. **Langkah 01: Titip Pesanan & Menu Karepmu**  
   Pilih resto viral Jawa Timur, tulis detail pesanan (sambal pencit dipisah, es jangan terlalu manis, babat goreng garing), tanpa perlu unduh aplikasi berat.
2. **Langkah 02: Pilot "Cak" Budhal & Ceklis Tiket Fisik**  
   Pilot resmi TITIP.ANTRI terjun langsung ke lokasi, ambil nomor tiket antrean fisik, lalu kirim foto bukti karcis dan swafoto via WhatsApp.
3. **Langkah 03: Makanan Teko Hangat, Tinggal Madhang!**  
   Sajian diamankan dalam tas termal anti tumpah, diantarkan ke meja kantor / kos, dan pembayaran jasa diselesaikan via QRIS praktis.

#### 3.5 Curated Top Merchants (East Java Edition)
Desain berbentuk sampul majalah makanan (*editorial cover*) berasio 3:4 dengan grading visual gelap dramatis:
* **Bebek Sinjay (Suramadu / Mayjen Sungkono, Surabaya):** Menu khas Bebek Kremes Sambal Pencit, estimasi antre 85 menit, tingkat keramaian: Sangat Ramai.
* **Sego Resek Kasin (Kasin, Klojen, Malang):** Menu khas Nasi Goreng Arang Kuah Kaldu Ayam & Babat, estimasi antre 90 menit.
* **Sate Klopo Ondomohen Bu Asih (Jl. Walikota Mustajab, Surabaya Pusat):** Sate Daging Bumbu Kelapa Bakar gurih manis, estimasi antre 60 menit.
* **Bakso President Malang (Pinggir Rel Kereta Api Batanghari, Malang):** Bakso Urat & Pangsit Goreng Mekar kuah sumsum, estimasi antre 70 menit.
* **Nasi Cumi Waspada (Pasar Atom, Surabaya):** Nasi Cumi Hitam Komplit tengah malam, estimasi antre 75 menit.
* **Kafe Viral Suhat / Toko Oen (Malang):** Spot gelato & bakery kekinian favorit mahasiswa Brawijaya.

*Interaksi:* Setiap kartu memiliki tombol \`Titip Resto Iki Saiki\` yang langsung mengisi nama resto ke dalam kalkulator di bawah.

#### 3.6 Transparent Pricing & Giant WhatsApp CTA
* **Struktur Tarif Regional Jawa Timur:**
  * **Malang Kota Flat Tier:** Rp 30.000 (Durasi antre s/d 45 menit, radius area Suhat, Ijen, Klojen, Blimbing).
  * **Surabaya Pusat Flat Tier:** Rp 35.000 (Durasi antre s/d 60 menit, radius Gubeng, Tunjungan, Mayjen Sungkono).
  * **Ekstrem / Antar Lintas Zona (Suramadu / Pakuwon / Batu):** Rp 65.000–Rp 110.000.
  * **Add-On:** Thermal Bag Protection (+Rp 5.000), Jaminan Jam Sibuk Weekend (+Rp 15.000).
* **Tombol Call to Action Raksasa (Direct WhatsApp Admin):**
  * Tombol warna emas amber \`PESAN PILOT VIA WHATSAPP (ADMIN JATIM)\`.
  * Menghasilkan pesan teks otomatis dengan salam khas: *"Halo Admin Concierge TITIP.ANTRI Jatim, kulo badhe pesen pilot joki antri..."*

---

### 4. Micro-Interactions & Animation Guidelines

| Elemen UI | Jenis Interaksi & Physics | Parameter Teknis (Motion / CSS) | Tujuan Pengalaman |
| :--- | :--- | :--- | :--- |
| **Headline Kinetic Text** | Staggered character slide-up with mask | \`y: 35 -> 0\`, \`opacity: 0 -> 1\`, \`duration: 0.75s\`, \`ease: [0.16, 1, 0.3, 1]\` | Memberikan hentakan visual tegas khas karakter arek Jawa Timur. |
| **Parallax Background** | Translasi vertikal halus visual Suramadu/Ijen | \`translateY(scrollY * 0.12)\` | Membangun kedalaman dimensi kota malam hari. |
| **City Switcher Filter** | Layout transition spring animation | \`transition: layout, spring damping: 25, stiffness: 300\` | Perpindahan katalog resto Surabaya & Malang tanpa reload halaman. |
| **Cover Majalah Hover** | Image scale-up subtle 1.05x & contrast boost | \`transition: 500ms cubic-bezier(0.2, 0.8, 0.2, 1)\` | Memberikan kesan taktil mewah seperti katalog kurasi fisik. |
| **Giant CTA WhatsApp** | Inverted color transition & active squeeze scale | \`hover: bg-white text-black\`, \`active: scale(0.96)\` | Menghilangkan rasa ragu pemesan untuk segera bertransaksi. |

---

### 5. Technical Requirements & Stack

#### 5.1 Rekomendasi Modern Frontend Stack
* **Framework:** **React 19 / Next.js 15 (App Router)**  
  Menjamin skor First Contentful Paint (FCP) < 1.2s dan optimasi metadata SEO untuk pencarian lokal (*"jasa antri gacoan surabaya"*, *"joki sego resek malang"*).
* **Styling:** **Tailwind CSS v4** dengan utility typography fluid.
* **Motion Engine:** **Motion (Framer Motion v12)** untuk orkestrasi timeline animasi dan pergantian filter kota.
* **Typography:**
  * Headings: **Syne** (Google Fonts, 700 & 800) untuk judul brutalist.
  * Monospace Badges & Data: **JetBrains Mono** untuk timecode, koordinat, dan plat nomor antrean.
  * Body Text: **Plus Jakarta Sans** untuk kenyamanan membaca artikel editorial.

#### 5.2 Location Detection API (Surabaya vs Malang vs Luar Jatim)
Sistem menggunakan deteksi lokasi berbasis browser Geolocation API sederhana yang didukung *IP-lookup fallback* (Cloudflare / MaxMind GeoIP):
* **Algoritma Deteksi Geografis (Haversine Formula):**
  * Pusat Koordinat Surabaya: \`Lat -7.2575, Long 112.7521\`
  * Pusat Koordinat Malang: \`Lat -7.9666, Long 112.6326\`
  * Jika jarak pengguna < 40 km dari Surabaya -> Default filter disetel ke **SURABAYA**.
  * Jika jarak pengguna < 35 km dari Malang -> Default filter disetel ke **MALANG**.
  * Jika jarak > 70 km dari kedua kota (misal terdeteksi di Jakarta, Bandung, atau Medan) -> Tampilkan banner dan modal eksklusif **"Coming Soon / Wilayah Belum Terjangkau"** secara sopan dan anggun.

---

### 6. Edge Cases & Error Handling

#### 6.1 Pengunjung dari Luar Jawa Timur (Contoh: Pengakses dari Jakarta / Luar Pulau)
* **Penanganan Elegan:**
  * Sistem **tidak memblokir** akses web, melainkan menampilkan *gentle badge* dan modal interaktif:  
    \`[OPERASIONAL EKSKLUSIF JAWA TIMUR]\`  
    *"Matur nuwun sanget sampun mampir! Saat ini armada pilot TITIP.ANTRI beroperasi secara eksklusif di Surabaya Raya dan Malang Raya. Daftarkan nomor WhatsApp Anda untuk menjadi yang pertama diberi tahu saat kami berekspansi ke kota Anda."*
  * Pengunjung tetap dapat mengeksplorasi kalkulator, majalah makanan, dan membaca PRD ini sebagai bahan benchmark.

#### 6.2 Responsivitas pada Layar Smartphone Sempit (< 360px)
* **Ukuran Layar:** Pengujian ketat pada iPhone SE (375px) dan Android kompak (320px-360px).
* **Fluid Clamp Typography:** Headline \`clamp(2.2rem, 8vw, 5.5rem)\` memastikan tidak ada pemenggalan kata kaku (*word-break defect*) atau scrollbar horizontal yang bocor.
* **Touch Targets WCAG AAA:** Semua tombol filter kota, opsi radio kalkulator, dan tombol CTA utama memiliki tinggi minimal **48px** dengan padding jempol yang lapang (*one-thumb navigation*).

---

### 7. Kesimpulan & Status Eksekusi
Spesifikasi PRD ini telah disesuaikan 100% dengan denyut nadi masyarakat urban Jawa Timur. Versi live interaktif dari landing page ini telah aktif dan dapat langsung diuji coba pada preview sistem TITIP.ANTRI Jatim.
`;
