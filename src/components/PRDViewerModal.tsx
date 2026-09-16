import React, { useState } from 'react';
import { PRD_RAW_MARKDOWN } from '../data/prdContent';
import { X, Copy, Check, Download, FileText, ExternalLink, ShieldCheck, MapPin } from 'lucide-react';

interface PRDViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PRDViewerModal: React.FC<PRDViewerModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'all' | 'vision' | 'personas' | 'architecture' | 'interactions' | 'tech' | 'edge'
  >('all');

  if (!isOpen) return null;

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(PRD_RAW_MARKDOWN);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([PRD_RAW_MARKDOWN], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'PRD_TITIP_ANTRI_JATIM_CPO_SPEC.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const tabs = [
    { id: 'all', label: 'DOKUMEN PENUH' },
    { id: 'vision', label: '1. VISI & KPI JATIM' },
    { id: 'personas', label: '2. PERSONA AREK JATIM' },
    { id: 'architecture', label: '3. ARSITEKTUR UI/UX' },
    { id: 'interactions', label: '4. INTERAKSI & MOTION' },
    { id: 'tech', label: '5. TECH STACK & GEOLOKASI' },
    { id: 'edge', label: '6. EDGE CASES & LUAR JATIM' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-md overflow-hidden">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl h-full max-h-[92vh] flex flex-col bg-[#0D0F14] border-2 border-amber-400 shadow-2xl overflow-hidden">
        
        {/* Modal Top Header Bar */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-zinc-950 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-400 text-black font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono-code font-bold uppercase tracking-wider text-amber-400">
                  CPO & LEAD UI/UX SPECIFICATION // EAST JAVA EDITION
                </span>
                <span className="text-[10px] font-mono-code bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded">
                  v2.0 APPROVED
                </span>
              </div>
              <h3 className="font-display font-extrabold text-lg sm:text-xl text-white">
                PRD: TITIP.ANTRI JATIM (SURABAYA & MALANG)
              </h3>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              title="Salin isi PRD dalam format Markdown mentah"
              className="hidden sm:flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-white/10 px-3 py-1.5 text-xs font-mono-code transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
              <span>{copied ? 'Tersalin!' : 'Salin Markdown'}</span>
            </button>

            <button
              onClick={handleDownloadMarkdown}
              title="Download file .md"
              className="hidden sm:flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-white/10 px-3 py-1.5 text-xs font-mono-code transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Unduh .MD</span>
            </button>

            <button
              onClick={onClose}
              aria-label="Tutup PRD Modal"
              className="p-2 bg-zinc-900 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 border border-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Filter Bar */}
        <div className="flex items-center gap-1 px-4 py-2 border-b border-white/10 bg-zinc-900/60 overflow-x-auto font-mono-code text-xs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-amber-400 text-black font-bold'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable PRD Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-8 text-zinc-300 text-sm leading-relaxed">
          
          {/* Section 1: Vision & Strategy */}
          {(activeTab === 'all' || activeTab === 'vision') && (
            <section className="space-y-4 border-b border-white/10 pb-8">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono-code font-bold text-amber-400 uppercase">
                  BAB 1 // PRODUCT VISION & STRATEGY (EAST JAVA)
                </span>
              </div>
              <h4 className="font-display font-bold text-2xl text-white">
                1. Product Vision, Elevator Pitch & KPI Regional
              </h4>
              
              <div className="p-4 border-l-4 border-amber-400 bg-zinc-900/80 italic text-zinc-100 text-base">
                "TITIP.ANTRI mulihno wektu larangmu: Awak dewe sing gelem kepanasan, desek-desekan, lan ngantri sampek berjam-jam nang kuliner viral utawa legendaris Jawa Timur, ben koen kabeh iso panggah fokus nyambut gawe utawa santai ngrasakno panganan enak tanpa kudu sambat."
              </div>

              <p className="text-zinc-400">
                Kultur kuliner Jawa Timur didorong etos kerja keras (*hustle culture*) dan fanatisme kuliner otentik tinggi. Antre fisik berjam-jam di Bebek Sinjay, Sego Resek Kasin, atau Sate Klopo Ondomohen membuang 60-120 menit waktu berharga. TITIP.ANTRI hadir sebagai *lifestyle concierge* penjinak antrean khas arek Jatim: blak-blakan, cepat, transparan, dan terverifikasi secara visual.
              </p>

              <div className="overflow-x-auto pt-2">
                <table className="w-full text-left font-mono-code text-xs border border-white/10">
                  <thead className="bg-zinc-900 text-amber-400 border-b border-white/10">
                    <tr>
                      <th className="p-3">Key Performance Indicator (KPI)</th>
                      <th className="p-3">Target Benchmark</th>
                      <th className="p-3">Metodologi & Implikasi Bisnis</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr>
                      <td className="p-3 font-semibold text-white">Primary Conversion (Klik WhatsApp Jatim)</td>
                      <td className="p-3 text-emerald-400 font-bold">≥ 15.8%</td>
                      <td className="p-3 text-zinc-400">Kalkulator tarif flat memicu order instan</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-white">Pertumbuhan User Surabaya Raya</td>
                      <td className="p-3 text-emerald-400 font-bold">+45% MoM</td>
                      <td className="p-3 text-zinc-400">Segmen profesional Pakuwon, Mayjen Sungkono, & Gubeng</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-white">Pertumbuhan User Malang Raya</td>
                      <td className="p-3 text-emerald-400 font-bold">+60% MoM</td>
                      <td className="p-3 text-zinc-400">Segmen mahasiswa UB/Polinema & kafe viral Suhat</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-white">Bounce Rate Pengunjung Jatim</td>
                      <td className="p-3 text-emerald-400 font-bold">≤ 28%</td>
                      <td className="p-3 text-zinc-400">Relevansi visual Suramadu/Ijen menekan drop-off</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Section 2: User Personas */}
          {(activeTab === 'all' || activeTab === 'personas') && (
            <section className="space-y-4 border-b border-white/10 pb-8">
              <span className="text-xs font-mono-code font-bold text-amber-400 uppercase">
                BAB 2 // USER PERSONAS (LOCAL CONTEXT)
              </span>
              <h4 className="font-display font-bold text-2xl text-white">
                2. Profil Pengguna Utama Jawa Timur
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Persona A */}
                <div className="p-5 border border-white/10 bg-zinc-950 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono-code text-amber-400 font-bold">
                      PERSONA A // THE SURABAYA RELENTLESS HUSTLER
                    </span>
                    <span className="text-[10px] font-mono-code bg-zinc-800 text-zinc-300 px-2 py-0.5">
                      35 TAHUN
                    </span>
                  </div>
                  <h5 className="font-display font-bold text-lg text-white">
                    "Arek Suroboyo Sibuk" (Hendra Tanuwidjaja)
                  </h5>
                  <p className="text-xs text-zinc-400">
                    Pengusaha Manufaktur / Senior Finance Manager, domisili Pakuwon City, kantor koridor Mayjen Sungkono, Surabaya.
                  </p>
                  
                  <div className="space-y-1.5 pt-2 text-xs">
                    <span className="font-bold text-red-400 block font-mono-code">Pain Points:</span>
                    <p className="text-zinc-400">
                      • Butuh traktiran makan siang mendadak (Bebek Sinjay / Sate Klopo Ondomohen), tapi antrean siang mencapai 50 orang tanpa AC.<br />
                      • Kecewa dengan jastip tidak resmi yang sambal pencitnya sering tertinggal atau kurang fresh.
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-1 text-xs">
                    <span className="font-bold text-emerald-400 block font-mono-code">Motivations:</span>
                    <p className="text-zinc-400">
                      • <em>Time Arbitrage:</em> Bayar flat Rp 35.000–Rp 60.000 sebanding dengan deal bisnis jutaan yang terjaga.<br />
                      • Butuh kepastian foto tiket fisik dan selfie pilot di kasir resto.
                    </p>
                  </div>
                </div>

                {/* Persona B */}
                <div className="p-5 border border-white/10 bg-zinc-950 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono-code text-amber-400 font-bold">
                      PERSONA B // THE MALANG TREND-CHASING STUDENT
                    </span>
                    <span className="text-[10px] font-mono-code bg-zinc-800 text-zinc-300 px-2 py-0.5">
                      21 TAHUN
                    </span>
                  </div>
                  <h5 className="font-display font-bold text-lg text-white">
                    "Mahasiswa FOMO Malang" (Dinda Maharani)
                  </h5>
                  <p className="text-xs text-zinc-400">
                    Mahasiswi Semester Akhir Universitas Brawijaya (UB), kost di kawasan Soekarno-Hatta (Suhat), Malang.
                  </p>
                  
                  <div className="space-y-1.5 pt-2 text-xs">
                    <span className="font-bold text-red-400 block font-mono-code">Pain Points:</span>
                    <p className="text-zinc-400">
                      • Sego Resek Kasin buka jam 18:00 tapi antrean nomor tiket sudah ludes dari 17:30 dalam cuaca dingin malam Malang.<br />
                      • Malas berdiri 1.5 jam di trotoar saat harus nugas skripsi atau nongkrong cantik di kafe Suhat.
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-1 text-xs">
                    <span className="font-bold text-emerald-400 block font-mono-code">Motivations:</span>
                    <p className="text-zinc-400">
                      • Tetap update kuliner viral tanpa lelah fisik, lalu upload konten review media sosial.<br />
                      • Patungan bersama 3 teman kos (tarif per orang hanya Rp 7.500 - Rp 10.000).
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Section 3: Detailed UI/UX & Page Architecture */}
          {(activeTab === 'all' || activeTab === 'architecture') && (
            <section className="space-y-4 border-b border-white/10 pb-8">
              <span className="text-xs font-mono-code font-bold text-amber-400 uppercase">
                BAB 3 // DETAILED UI/UX & PAGE ARCHITECTURE
              </span>
              <h4 className="font-display font-bold text-2xl text-white">
                3. Arsitektur Komponen Halaman (Top-to-Bottom)
              </h4>

              <div className="space-y-4 text-xs font-mono-code">
                <div className="p-4 border border-white/10 bg-zinc-950">
                  <span className="text-amber-400 font-bold block mb-1">
                    3.1 TOP NAVIGATION
                  </span>
                  <p className="text-zinc-300 font-sans text-xs">
                    • <strong>Logo Kiri:</strong> TITIP.ANTRI® dengan tag status [JATIM OPS // SBY-MLG].<br />
                    • <strong>Center Clock Widget:</strong> Live digital clock format HH:MM:SS WIB + Switcher Kota Interaktif [SURABAYA | MALANG] + Radar 94 Pilot Aktif.<br />
                    • <strong>Right Minimalist Menu:</strong> Anchor links, trigger Dokumen PRD CPO Spec, dan tombol Pesan Pilot Cak.
                  </p>
                </div>

                <div className="p-4 border border-white/10 bg-zinc-950">
                  <span className="text-amber-400 font-bold block mb-1">
                    3.2 CINEMATIC HERO SECTION
                  </span>
                  <p className="text-zinc-300 font-sans text-xs">
                    • <strong>Kinetic Typography:</strong> Headline raksasa "KAMI YANG ANTRE. ANDA TINGGAL NIKMATI." dengan font Syne bold berkontras tinggi.<br />
                    • <strong>Cinematic Background:</strong> Foto/video visual Suramadu & Ijen Boulevard malam hari dengan 80% dark overlay & subtle noise texture.<br />
                    • <strong>Overlay Caption Pojok Kiri Bawah:</strong> "01 // MANIFESTO AREK JATIM" mengedukasi time-saving value secara blak-blakan.
                  </p>
                </div>

                <div className="p-4 border border-white/10 bg-zinc-950">
                  <span className="text-amber-400 font-bold block mb-1">
                    3.3 LIVE SOCIAL PROOF
                  </span>
                  <p className="text-zinc-300 font-sans text-xs">
                    • <strong>Infinite Marquee Strip:</strong> Ticker berjalan tanpa henti berisi dispatch pilot riil (Cak Budi di Bakso President Malang #MLG-104, Cak Dimas di Sate Ondomohen #SBY-42, dll).<br />
                    • <strong>Floating Real-Time Toast:</strong> Notifikasi berkala di pojok kiri bawah memperkuat keaslian operasional pilot Jatim.
                  </p>
                </div>

                <div className="p-4 border border-white/10 bg-zinc-950">
                  <span className="text-amber-400 font-bold block mb-1">
                    3.4 HOW IT WORKS (ALUR KERJA 3 LANGKAH)
                  </span>
                  <p className="text-zinc-300 font-sans text-xs">
                    • 01. Titip Pesanan & Menu Karepmu, 02. Pilot "Cak" Budhal & Ceklis Tiket Fisik, 03. Panganan Teko Hangat, Tinggal Madhang!
                  </p>
                </div>

                <div className="p-4 border border-white/10 bg-zinc-950">
                  <span className="text-amber-400 font-bold block mb-1">
                    3.5 CURATED TOP MERCHANTS (EAST JAVA EDITION)
                  </span>
                  <p className="text-zinc-300 font-sans text-xs">
                    • Format sampul majalah kuliner (Editorial Magazine Cover) rasio 3:4 dengan filter Surabaya vs Malang (Bebek Sinjay, Sego Resek Kasin, Sate Klopo Ondomohen, Bakso President, Nasi Cumi Waspada, Kafe Suhat).
                  </p>
                </div>

                <div className="p-4 border border-white/10 bg-zinc-950">
                  <span className="text-amber-400 font-bold block mb-1">
                    3.6 TRANSPARENT PRICING & GIANT WHATSAPP CTA
                  </span>
                  <p className="text-zinc-300 font-sans text-xs">
                    • Kalkulator transparan tarif flat Malang Kota (Rp 30.000) & Surabaya Pusat (Rp 35.000) + tombol raksasa direct WhatsApp yang langsung membuat salam format lokal siap kirim ke Admin Jatim.
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Section 4: Micro-Interactions & Animation Guidelines */}
          {(activeTab === 'all' || activeTab === 'interactions') && (
            <section className="space-y-4 border-b border-white/10 pb-8">
              <span className="text-xs font-mono-code font-bold text-amber-400 uppercase">
                BAB 4 // MICRO-INTERACTIONS & ANIMATIONS
              </span>
              <h4 className="font-display font-bold text-2xl text-white">
                4. Panduan Micro-Interactions untuk Developer
              </h4>

              <div className="overflow-x-auto pt-2">
                <table className="w-full text-left font-mono-code text-xs border border-white/10">
                  <thead className="bg-zinc-900 text-amber-400 border-b border-white/10">
                    <tr>
                      <th className="p-3">Elemen UI</th>
                      <th className="p-3">Jenis Animasi & Physics</th>
                      <th className="p-3">Parameter Motion / CSS</th>
                      <th className="p-3">Tujuan Pengalaman</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr>
                      <td className="p-3 font-semibold text-white">Kinetic Headline</td>
                      <td className="p-3 text-zinc-300">Staggered text reveal with mask</td>
                      <td className="p-3 text-zinc-400">y: 35px -&gt; 0, opacity: 0-&gt;1, ease [0.16, 1, 0.3, 1]</td>
                      <td className="p-3 text-zinc-400">Hentakan visual tegas karakter arek Jatim</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-white">City Switcher</td>
                      <td className="p-3 text-zinc-300">Layout spring animation</td>
                      <td className="p-3 text-zinc-400">damping: 25, stiffness: 300</td>
                      <td className="p-3 text-zinc-400">Filter instan Surabaya & Malang tanpa reload</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-white">Magazine Cover Hover</td>
                      <td className="p-3 text-zinc-300">Image scale 1.05x & contrast boost</td>
                      <td className="p-3 text-zinc-400">transition 700ms cubic-bezier</td>
                      <td className="p-3 text-zinc-400">Tampilan katalog fisik mewah</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-white">Giant CTA Button</td>
                      <td className="p-3 text-zinc-300">Inversion hover & active scale 0.95</td>
                      <td className="p-3 text-zinc-400">bg-amber-400 -&gt; bg-white</td>
                      <td className="p-3 text-zinc-400">Mendorong konversi tanpa friksi</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Section 5: Technical Requirements & Stack */}
          {(activeTab === 'all' || activeTab === 'tech') && (
            <section className="space-y-4 border-b border-white/10 pb-8">
              <span className="text-xs font-mono-code font-bold text-amber-400 uppercase">
                BAB 5 // TECHNICAL REQUIREMENTS & STACK
              </span>
              <h4 className="font-display font-bold text-2xl text-white">
                5. Tech Stack, Geolocation & WhatsApp Integration
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono-code">
                <div className="p-4 border border-white/10 bg-zinc-950 space-y-2">
                  <span className="text-amber-400 font-bold block">
                    MODERN FRONTEND STACK
                  </span>
                  <ul className="space-y-1 text-zinc-300 list-disc list-inside">
                    <li>Core: React 19 / Next.js 15 App Router</li>
                    <li>Styling: Tailwind CSS v4 Utility-First</li>
                    <li>Animations: Motion (Framer Motion v12)</li>
                    <li>Icons: Lucide-React SVG precision icons</li>
                    <li>Fonts: Syne, Plus Jakarta Sans, JetBrains Mono</li>
                    <li>SEO: Optimized for East Java culinary search keywords</li>
                  </ul>
                </div>

                <div className="p-4 border border-white/10 bg-zinc-950 space-y-2">
                  <span className="text-amber-400 font-bold block">
                    GEOLOCATION LOGIC (SBY vs MLG vs NON-JATIM)
                  </span>
                  <p className="text-zinc-400 font-sans text-xs">
                    • Haversine formula mendeteksi jarak pengguna ke Surabaya (-7.2575, 112.7521) atau Malang (-7.9666, 112.6326).<br />
                    • Jika jarak &gt; 70 km dari kedua kota, sistem otomatis memicu modal "Matur Nuwun! Coming Soon di Kotamu" dengan formulir waitlist.
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Section 6: Edge Cases & Error Handling */}
          {(activeTab === 'all' || activeTab === 'edge') && (
            <section className="space-y-4">
              <span className="text-xs font-mono-code font-bold text-amber-400 uppercase">
                BAB 6 // EDGE CASES & REGIONAL RESTRICTIONS
              </span>
              <h4 className="font-display font-bold text-2xl text-white">
                6. Penanganan Pengunjung Luar Jatim & Responsivitas Layar Sempit
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 border border-white/10 bg-zinc-950 space-y-2">
                  <span className="font-mono-code text-amber-400 font-bold block">
                    PENGUNJUNG LUAR JAWA TIMUR (JAKARTA / BALI / DLL)
                  </span>
                  <p className="text-zinc-400 leading-relaxed">
                    • Sistem tidak memblokir akses secara kasar, melainkan menampilkan notifikasi santun bertuliskan "Matur Nuwun Sanget Sampun Mampir!" dan mengajak mengisi formulir waitlist kota ekspansi.<br />
                    • Pengunjung tetap dapat menguji kalkulator dan melihat isi PRD.
                  </p>
                </div>

                <div className="p-4 border border-white/10 bg-zinc-950 space-y-2">
                  <span className="font-mono-code text-amber-400 font-bold block">
                    RESPONSIVITAS MOBILE SEMPIT (&lt; 360PX)
                  </span>
                  <p className="text-zinc-400 leading-relaxed">
                    • Menggunakan CSS clamp() pada kinetic typography agar tidak ada teks meluber (no horizontal scroll).<br />
                    • Minimal touch target 48x48px pada seluruh kontrol kalkulator & tombol WhatsApp.
                  </p>
                </div>
              </div>
            </section>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-white/10 bg-zinc-950 flex flex-wrap items-center justify-between gap-4 text-xs font-mono-code text-zinc-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>SIAP DIEKSEKUSI OLEH TIM ENGINEERING // AGILITY GRADE A JATIM</span>
          </div>
          <button
            onClick={onClose}
            className="bg-amber-400 hover:bg-amber-300 text-black font-bold px-4 py-2 uppercase tracking-wider transition-colors"
          >
            Tutup & Kembali Ke Live Landing Page
          </button>
        </div>

      </div>

    </div>
  );
};
