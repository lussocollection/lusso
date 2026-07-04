/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Sparkles, ShoppingBag, Check } from 'lucide-react';
import { products } from '../data';

interface FaithCollectionProps {
  onOpenShop: (category?: string) => void;
  onAddToCart: (product: any, size: string, color: any) => void;
}

export default function FaithCollection({ onOpenShop, onAddToCart }: FaithCollectionProps) {
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  const quotes = [
    {
      text: "I can do all things through Christ who strengthens me.",
      citation: "PHILIPPIANS 4:13",
      context: "A profound statement of reliance on divine strength to endure all challenges, encouraging spiritual resilience.",
    },
    {
      text: "It is no longer I who live, but Christ lives in me.",
      citation: "GALATIANS 2:20",
      context: "A statement of profound spiritual union, representing self-giving devotion and the grace of divine presence within.",
    },
    {
      text: "Be Still & Know that I am God.",
      citation: "PSALM 46:10",
      context: "A call to quiet contemplative trust, setting aside anxiety to recognize absolute divine sovereignty.",
    }
  ];

  // Quick purchase of the "Be Still & Know Signature Hoodie" (prod-4)
  const handleQuickAdd = () => {
    const hoodie = products.find(p => p.id === 'prod-4');
    if (hoodie) {
      onAddToCart(hoodie, 'L', hoodie.colors[0]); // Default size L, color Luxury Black
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  return (
    <section className="py-24 bg-black text-white relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column Text & Interactive Quotes */}
          <div className="lg:col-span-6 text-left">
            <span className="text-[11px] font-bold tracking-[0.25em] text-[#D4AF37] uppercase mb-4 block">
              FAITH COLLECTION
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-8 font-sans leading-tight">
              Wear Your Faith <br />
              with Purpose
            </h2>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-12 font-sans max-w-xl">
              Our Faith Collection is more than apparel; it’s a quiet declaration of what matters most. Elegant, reverent, and crafted for the modern believer.
            </p>

            {/* Interactive Scripture Quotes */}
            <div className="space-y-6 border-l border-white/10 pl-6 mb-12">
              {quotes.map((q, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveQuoteIndex(idx)}
                  className={`group cursor-pointer transition-all duration-300 relative ${
                    activeQuoteIndex === idx ? 'opacity-100' : 'opacity-40 hover:opacity-75'
                  }`}
                >
                  <p className="text-base sm:text-lg italic font-serif leading-relaxed mb-2 text-white group-hover:text-white transition-colors">
                    "{q.text}"
                  </p>
                  <p className="text-xs font-bold tracking-widest text-[#D4AF37] flex items-center gap-2">
                    {q.citation}
                    {activeQuoteIndex === idx && (
                      <motion.span
                        layoutId="active-indicator"
                        className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"
                      />
                    )}
                  </p>

                  <AnimatePresence>
                    {activeQuoteIndex === idx && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mt-3"
                      >
                        <p className="text-[11px] text-white/50 leading-relaxed font-sans bg-white/[0.03] p-3 rounded border border-white/5">
                          {q.context}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <button
              onClick={() => onOpenShop('faith')}
              className="bg-[#D4AF37] hover:bg-[#C09B2F] text-black font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-md transition-all active:scale-95 duration-300 cursor-pointer"
            >
              Explore Faith Lookbook
            </button>
          </div>

          {/* Right Column Custom Hoodie Showcase Mockup */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full rounded-2xl overflow-hidden aspect-[16/10] border border-white/10 shadow-2xl shadow-black">
              <img
                src="/src/assets/images/lusso_faith_hoodie_1783195726879.jpg"
                alt="Be Still & Know Signature Hoodie Showcase"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              
              {/* Image Badge overlay */}
              <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md px-3 py-1 border border-white/10 rounded-full flex items-center gap-1.5 text-[10px] tracking-widest text-[#D4AF37] uppercase font-bold">
                <BookOpen className="w-3 h-3" /> Psalm 46:10 Special
              </div>
            </div>

            {/* Quick buy panel below the mockup */}
            <div className="w-full bg-[#111111] border border-white/5 rounded-2xl p-6 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase block mb-1">
                  EXCLUSIVE FEATURED ART
                </span>
                <h4 className="text-sm font-bold tracking-wide text-white uppercase">
                  Be Still & Know Signature Hoodie
                </h4>
                <p className="text-xs text-white/50 mt-1">
                  Heavy 500 GSM Fleece · Rome Embroidery · Gold Detailing
                </p>
              </div>
              
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
                <span className="text-lg font-bold text-[#D4AF37]">$140</span>
                <button
                  onClick={handleQuickAdd}
                  disabled={isAdded}
                  className={`px-5 py-3 rounded-md text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                    isAdded
                      ? 'bg-green-600 text-white'
                      : 'bg-white hover:bg-white/90 text-black active:scale-95'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Added!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
