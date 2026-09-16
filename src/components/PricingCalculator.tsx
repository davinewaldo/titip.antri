import React, { useState } from 'react';
import { Shield, MessageSquare, ArrowUpRight, Copy, Sparkles, MapPin } from 'lucide-react';
import { JatimCity } from '../types';

interface PricingCalculatorProps {
  currentCity: JatimCity;
  selectedMerchant: string;
  onMerchantChange: (val: string) => void;
}

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({
  currentCity,
  selectedMerchant,
  onMerchantChange
}) => {
  // Pricing tiers: 'malang-flat' (30k), 'surabaya-flat' (35k), 'lintas-zona' (60k)
  const [tierSelection, setTierSelection] = useState<string>(
    currentCity === 'MALANG' ? 'malang-flat' : 'surabaya-flat'
  );
  const [deliveryRadius, setDeliveryRadius] = useState<string>('antar-ringan');
  const [isWeekendRush, setIsWeekendRush] = useState<boolean>(true);
  const [useThermalProtection, setUseThermalProtection] = useState<boolean>(true);
  const [customerName, setCustomerName] = useState<string>('');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Price Calculation Logic
  const getBasePrice = () => {
    switch (tierSelection) {
      case 'malang-flat':
        return 30000;
      case 'surabaya-flat':
        return 35000;
      case 'lintas-zona':
        return 65000;
      default:
        return 35000;
    }
  };

  const getDeliveryFee = () => {
    if (deliveryRadius === 'self-pickup') return 0;
    if (deliveryRadius === 'antar-ringan') return 10000;
    if (deliveryRadius === 'antar-jauh') return 25000;
    return 10000;
  };

  const getAddonTotal = () => {
    let addon = 0;
    if (isWeekendRush) addon += 15000;
    if (useThermalProtection) addon += 5000;
    return addon;
  };

  const totalPrice = getBasePrice() + getDeliveryFee() + getAddonTotal();

  // Generate WhatsApp Message Template with East Java touch
  const generateWhatsAppMessage = () => {
    const resto = selectedMerchant.trim() || 'Kuliner Legendaris Jatim (Custom)';
    const nama = customerName.trim() || 'Pelanggan Cak/Ning';
    const alamat = deliveryAddress.trim() || 'Alamat / Kos / Kantor di Jatim';
    const tierName =
      tierSelection === 'malang-flat'
        ? 'Tarif Flat Malang Kota (Rp 30.000)'
        : tierSelection === 'surabaya-flat'
        ? 'Tarif Flat Surabaya Pusat (Rp 35.000)'
        : 'Lintas Zona / Suramadu / Pakuwon / Batu (Rp 65.000)';

    return `Halo Admin Concierge TITIP.ANTRI Jatim!
Kulo/saya badhe pesen Pilot Joki Antri Profesional:

• Jeneng / Nama: ${nama}
• Resto Tujuan: ${resto}
• Paket Layanan: ${tierName}
• Radius Pengantaran: ${deliveryRadius === 'self-pickup' ? 'Ambil Sendiri di Resto' : deliveryRadius === 'antar-ringan' ? 'Antar Ringan Dalam Kota (+Rp 10.000)' : 'Antar Lintas Wilayah (+Rp 25.000)'}
• Lokasi Serah Terima: ${alamat}
• Priority Jam Sibuk / Weekend: ${isWeekendRush ? 'IYO (+Rp 15.000)' : 'TIDAK'}
• Thermal Bag Khusus: ${useThermalProtection ? 'IYO (+Rp 5.000)' : 'TIDAK'}
• Total Estimasi Jasa: Rp ${totalPrice.toLocaleString('id-ID')}

Catatan Khusus: ${notes.trim() || 'Sambel dipisah / bungkus rapi'}

Nyuwun tulung konfirmasi ketersediaan pilot cak paling cedhek dan barcode QRIS. Matur nuwun sanget!`;
  };

  const whatsappUrl = `https://wa.me/6281299998888?text=${encodeURIComponent(generateWhatsAppMessage())}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generateWhatsAppMessage());
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="pricing" className="py-20 sm:py-28 border-b border-white/10 bg-[#090A0C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="pb-12 border-b border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 bg-amber-400" />
            <span className="text-xs font-mono-code font-bold uppercase tracking-widest text-amber-400">
              04 // TRANSPARENT PRICING & DIRECT WHATSAPP DISPATCH
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
              TARIF FLAT JATIM.<br />
              <span className="text-zinc-500">BLAK-BLAKAN TANPA BIAYA SILUMAN.</span>
            </h2>
            <p className="max-w-md text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
              Biaya transparan di muka berdasarkan zona kota Surabaya dan Malang. Tanpa manipulasi ongkir dan tanpa biaya tersembunyi (*no hidden charge*).
            </p>
          </div>
        </div>

        {/* Interactive Calculator Matrix */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-8 bg-[#0F1116] p-6 sm:p-8 border border-white/10">
            
            {/* Step 1: Zona Tarif Regional */}
            <div>
              <label className="block text-xs font-mono-code font-bold text-zinc-300 uppercase tracking-wider mb-3">
                1. Pilih Wilayah Operasional & Durasi Antrean
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: 'malang-flat',
                    label: 'Flat Malang Kota',
                    cost: 'Rp 30.000',
                    desc: 'Suhat, Ijen, Klojen, Blimbing (s/d 45 mnt)'
                  },
                  {
                    id: 'surabaya-flat',
                    label: 'Flat Surabaya Pusat',
                    cost: 'Rp 35.000',
                    desc: 'Gubeng, Sungkono, Tunjungan (s/d 60 mnt)'
                  },
                  {
                    id: 'lintas-zona',
                    label: 'Lintas Zona Jatim',
                    cost: 'Rp 65.000',
                    desc: 'Suramadu, Pakuwon, Kota Batu (Hype 120 mnt)'
                  }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTierSelection(item.id)}
                    className={`p-4 text-left border transition-all ${
                      tierSelection === item.id
                        ? 'border-amber-400 bg-amber-400/10 text-white shadow-md'
                        : 'border-white/10 bg-zinc-950/60 text-zinc-400 hover:border-white/30'
                    }`}
                  >
                    <span className="text-xs font-mono-code text-amber-400 block mb-1">
                      {item.cost}
                    </span>
                    <span className="font-display font-bold text-base text-white block">
                      {item.label}
                    </span>
                    <span className="text-[11px] text-zinc-400 block mt-1">
                      {item.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Target Restoran */}
            <div>
              <label className="block text-xs font-mono-code font-bold text-zinc-300 uppercase tracking-wider mb-2">
                2. Jeneng / Nama Resto Tujuan
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Contoh: Bebek Sinjay, Sego Resek Kasin, Sate Ondomohen..."
                  value={selectedMerchant}
                  onChange={(e) => onMerchantChange(e.target.value)}
                  className="w-full bg-zinc-950 border border-white/15 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400 font-mono-code"
                />
              </div>
              <p className="text-[11px] font-mono-code text-zinc-500 mt-1">
                Tip: Pilih langsung dari kartu sampul majalah di atas untuk auto-fill nama resto.
              </p>
            </div>

            {/* Step 3: Opsi Pengantaran */}
            <div>
              <label className="block text-xs font-mono-code font-bold text-zinc-300 uppercase tracking-wider mb-3">
                3. Cara Serah Terima Makanan
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'self-pickup', title: 'Ketemuan di Resto', fee: '+Rp 0', sub: 'COD di depan kasir' },
                  { id: 'antar-ringan', title: 'Antar Kota Dekat', fee: '+Rp 10.000', sub: 'Ke meja kantor / kos' },
                  { id: 'antar-jauh', title: 'Antar Jarak Jauh', fee: '+Rp 25.000', sub: 'Area pinggiran kota' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setDeliveryRadius(item.id)}
                    className={`p-3 text-left border transition-all ${
                      deliveryRadius === item.id
                        ? 'border-amber-400 bg-amber-400/10 text-white'
                        : 'border-white/10 bg-zinc-950/60 text-zinc-400 hover:border-white/20'
                    }`}
                  >
                    <span className="text-[11px] font-mono-code text-amber-400 font-bold block">
                      {item.fee}
                    </span>
                    <span className="text-xs font-bold text-white block mt-0.5">
                      {item.title}
                    </span>
                    <span className="text-[10px] text-zinc-500 block">
                      {item.sub}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Add-on Checkboxes */}
            <div className="pt-2 border-t border-white/10 space-y-3">
              <label className="block text-xs font-mono-code font-bold text-zinc-300 uppercase tracking-wider">
                4. Fasilitas Tambahan (Add-Ons)
              </label>
              
              <div className="flex items-center justify-between p-3 border border-white/10 bg-zinc-950">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="chk-weekend-jatim"
                    checked={isWeekendRush}
                    onChange={(e) => setIsWeekendRush(e.target.checked)}
                    className="w-4 h-4 accent-amber-400 rounded cursor-pointer"
                  />
                  <div>
                    <label htmlFor="chk-weekend-jatim" className="text-xs font-medium text-white cursor-pointer">
                      Jaminan Prioritas Jam Makan Siang / Weekend Rush
                    </label>
                    <span className="block text-[10px] text-zinc-500">
                      Pilot siap siaga 20 menit lebih awal demi mengamankan tiket antrean terdepan
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono-code text-amber-400 font-bold shrink-0">
                  +Rp 15.000
                </span>
              </div>

              <div className="flex items-center justify-between p-3 border border-white/10 bg-zinc-950">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="chk-thermal-jatim"
                    checked={useThermalProtection}
                    onChange={(e) => setUseThermalProtection(e.target.checked)}
                    className="w-4 h-4 accent-amber-400 rounded cursor-pointer"
                  />
                  <div>
                    <label htmlFor="chk-thermal-jatim" className="text-xs font-medium text-white cursor-pointer">
                      Thermal Insulated Bag Protection
                    </label>
                    <span className="block text-[10px] text-zinc-500">
                      Kuah rawon/bakso tetap panas mendidih, es & dessert tidak meleleh
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono-code text-amber-400 font-bold shrink-0">
                  +Rp 5.000
                </span>
              </div>
            </div>

            {/* Optional Customer Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-[11px] font-mono-code text-zinc-400 uppercase mb-1">
                  Nama Anda / Panggilan
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Hendra (Sby) / Dinda (Mlg)"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-zinc-950 border border-white/10 px-3 py-2 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400 font-mono-code"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono-code text-zinc-400 uppercase mb-1">
                  Alamat / Drop Point
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Mayjen Sungkono / Kost Suhat / Ijen"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full bg-zinc-950 border border-white/10 px-3 py-2 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400 font-mono-code"
                />
              </div>
            </div>

          </div>

          {/* Checkout & Giant CTA Column (Right 5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Invoice Breakdown Card */}
            <div className="bg-[#111419] border-2 border-amber-400 p-6 sm:p-8 space-y-6 shadow-2xl">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono-code uppercase tracking-widest text-zinc-400 block">
                    INVOICE ESTIMATION JATIM #VIP-2026
                  </span>
                  <h3 className="font-display font-extrabold text-2xl text-white">
                    RINCIAN BIAYA JASA
                  </h3>
                </div>
                <div className="px-2 py-1 rounded bg-amber-400/20 text-amber-400 font-bold text-xs font-mono-code border border-amber-400/40">
                  {tierSelection === 'malang-flat' ? 'MALANG' : 'SURABAYA'}
                </div>
              </div>

              {/* Breakdown List */}
              <div className="space-y-3 font-mono-code text-xs">
                <div className="flex items-center justify-between text-zinc-300">
                  <span>Jasa Antri Fisik Terverifikasi</span>
                  <span className="font-bold text-white">
                    Rp {getBasePrice().toLocaleString('id-ID')}
                  </span>
                </div>

                <div className="flex items-center justify-between text-zinc-300">
                  <span>
                    Ongkir ({deliveryRadius === 'self-pickup' ? 'Ambil Sendiri' : 'Kurir Terlindungi'})
                  </span>
                  <span className="font-bold text-white">
                    Rp {getDeliveryFee().toLocaleString('id-ID')}
                  </span>
                </div>

                {isWeekendRush && (
                  <div className="flex items-center justify-between text-zinc-300">
                    <span>Priority Rush / Weekend</span>
                    <span className="font-bold text-amber-400">+Rp 15.000</span>
                  </div>
                )}

                {useThermalProtection && (
                  <div className="flex items-center justify-between text-zinc-300">
                    <span>Thermal Bag Protection</span>
                    <span className="font-bold text-amber-400">+Rp 5.000</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-emerald-400 pt-1">
                  <span>Bukti Foto Karcis Asli via WA</span>
                  <span className="font-bold">GRATIS</span>
                </div>
              </div>

              {/* Total Price Display */}
              <div className="pt-4 border-t border-white/15 flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] font-mono-code uppercase text-zinc-400 block">
                    TOTAL TARIF BERSIH
                  </span>
                  <span className="text-3xl sm:text-4xl font-display font-extrabold text-white">
                    Rp {totalPrice.toLocaleString('id-ID')}
                  </span>
                </div>
                <span className="text-[11px] font-mono-code text-zinc-500">
                  *Belum termasuk harga makanan riil resto
                </span>
              </div>

              {/* Giant CTA Button Connected to WhatsApp */}
              <div className="pt-2 space-y-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="btn-cta-whatsapp-giant"
                  className="group relative w-full flex items-center justify-center gap-3 bg-amber-400 hover:bg-white text-black py-5 px-6 font-mono-code font-extrabold text-sm sm:text-base uppercase tracking-wider transition-all duration-200 shadow-xl shadow-amber-400/20 active:scale-95 text-center"
                >
                  <MessageSquare className="w-6 h-6 shrink-0 group-hover:scale-110 transition-transform" />
                  <span>PESAN PILOT VIA WHATSAPP (ADMIN JATIM)</span>
                  <ArrowUpRight className="w-5 h-5 shrink-0" />
                </a>

                {/* Copy Formatted Text */}
                <button
                  type="button"
                  onClick={handleCopy}
                  className="w-full flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 py-2.5 px-4 text-xs font-mono-code transition-colors"
                >
                  <span>{copied ? 'Teks WhatsApp Berhasil Disalin!' : 'Salin Template Teks Pesan'}</span>
                </button>
              </div>

              {/* Trust Badge Guarantee */}
              <div className="flex items-center gap-2.5 pt-2 text-[11px] font-mono-code text-zinc-400 border-t border-white/10">
                <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  100% Uang Jasa Kembali jika pilot tidak berhasil mendapatkan nomor tiket fisik resmi.
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
