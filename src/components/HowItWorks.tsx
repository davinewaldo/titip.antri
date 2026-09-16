import React, { useState } from 'react';
import { ShoppingBag, Camera, Utensils, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: '01',
      title: 'Titip Pesanan & Menu Karepmu',
      subtitle: 'INSTANT BRIEF VIA WHATSAPP CONCIERGE',
      icon: ShoppingBag,
      description:
        'Pilih resto viral utawa legendaris Jatim pilihanmu. Tulis rincian pesanan spesifik (sambal pencit dipisah, bebek bagian paha, kuah rawon kental) tanpa kudu registrasi aplikasi ruwet.',
      technicalBadge: 'ZERO APP INSTALL / DIRECT TO CAK DISPATCH',
      keyPoints: [
        'Langsung kirim rincian via chat WhatsApp tanpa login',
        'Bisa request menu rahasia atau catatan khusus',
        'Konfirmasi estimasi waktu tunggu instan oleh admin Jatim'
      ]
    },
    {
      number: '02',
      title: 'Pilot "Cak" Budhal & Ceklis Tiket Fisik',
      subtitle: 'VERIFIED PHYSICAL TICKET & REAL-TIME SELFIE',
      icon: Camera,
      description:
        'Pilot resmi TITIP.ANTRI budhal neng lokasi resto, ngamanake nomer antrean kasir, banjur ngirim foto bukti karcis asli dan swafoto via chat WhatsApp.',
      technicalBadge: '100% BUKTI TIKET ASLI / ZERO JASTIP GHOIB',
      keyPoints: [
        'Transparansi penuh: Anda melihat nomor antrean resmi',
        'Pilot menjaga posisi tanpa meninggalkan barisan fisik',
        'Pembaruan berkala sisa antrean setiap 15 menit'
      ]
    },
    {
      number: '03',
      title: 'Panganan Teko Hangat, Tinggal Madhang!',
      subtitle: 'THERMAL BAG PROTECTION & EFFORTLESS HANDOVER',
      icon: Utensils,
      description:
        'Nalika panganan wis mateng, pilot nglebokake neng tas termal khusus anti tumpah. Diantarkan langsung nang meja kantor, lobi apartemen, utawa kosanmu.',
      technicalBadge: 'HOT & FRESH GUARANTEE / FOOD INTEGRITY',
      keyPoints: [
        'Suhu makanan terjaga maksimal (bebek garing / kuah panas)',
        'Penyerahan langsung tanpa perantara acak',
        'Bayar jasa via QRIS praktis setelah pesanan tiba'
      ]
    }
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 border-b border-white/10 bg-[#090A0C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 bg-amber-400" />
              <span className="text-xs font-mono-code font-bold uppercase tracking-widest text-amber-400">
                02 // ALUR KERJA LAYANAN JATIM
              </span>
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
              TELUNG LANGKAH.<br />
              <span className="text-zinc-500">BEBAS KEPANASAN NGANTRE.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
            Sistem terstandarisasi yang dirancang untuk arek-arek Jawa Timur yang butuh kepastian. Setiap langkah diverifikasi dengan foto tiket fisik real-time.
          </p>
        </div>

        {/* 3-Step Interactive Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isHovered = activeStep === idx;

            return (
              <motion.div
                key={step.number}
                onMouseEnter={() => setActiveStep(idx)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className={`relative flex flex-col justify-between p-6 sm:p-8 border transition-all duration-300 ${
                  isHovered
                    ? 'border-amber-400/80 bg-zinc-900/90 shadow-xl shadow-amber-400/5'
                    : 'border-white/10 bg-[#0D0F13] hover:border-white/30'
                }`}
              >
                {/* Step Header */}
                <div>
                  <div className="flex items-start justify-between">
                    <span className="font-display font-extrabold text-5xl sm:text-6xl text-zinc-700 tracking-tighter group-hover:text-amber-400 transition-colors">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded border border-white/10 flex items-center justify-center bg-black/40">
                      <Icon className="w-5 h-5 text-amber-400" />
                    </div>
                  </div>

                  <span className="inline-block mt-4 text-[10px] font-mono-code font-bold tracking-wider text-amber-400/90 uppercase">
                    {step.subtitle}
                  </span>

                  <h3 className="mt-2 font-display font-bold text-xl sm:text-2xl text-white">
                    {step.title}
                  </h3>

                  <p className="mt-4 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Key Benefits List */}
                <div className="mt-8 pt-6 border-t border-white/10 space-y-2.5">
                  <div className="text-[10px] font-mono-code uppercase text-zinc-500 font-bold mb-2">
                    {step.technicalBadge}
                  </div>
                  {step.keyPoints.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom Step Indicator Bar */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono-code text-zinc-500">
                  <span>TAHAP {step.number} / 03</span>
                  <span className="text-amber-400 flex items-center gap-1">
                    VERIFIED JATIM <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
