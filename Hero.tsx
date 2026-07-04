/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';

interface HeroProps {
  onRequestQuote: () => void;
  onExploreCollections: () => void;
}

export default function Hero({ onRequestQuote, onExploreCollections }: HeroProps) {
  return (
    <section className="relative min-h-[92vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-[#faf9f6]">
      {/* Background Image with elegant overlay for text readability */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/lusso_hero_1783195702324.jpg"
          alt="Lusso Collection Luxury Atelier Mannequin"
          className="w-full h-full object-cover object-center select-none"
          referrerPolicy="no-referrer"
        />
        {/* Editorial radial overlay and dark-tinted linear gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/25 to-transparent dark:from-black/75 dark:via-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-20 pb-12 flex flex-col justify-between h-full min-h-[80vh]">
        {/* Main callout */}
        <div className="max-w-2xl mt-auto mb-auto text-left">
          {/* Eyebrow Label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-4 md:mb-6"
          >
            <span className="h-px w-8 bg-[#D4AF37]" />
            <span className="text-[11px] font-bold tracking-[0.25em] text-[#D4AF37] uppercase font-sans">
              EXCELLENCE IN EVERY STITCH
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-bold text-white leading-[1.1] tracking-tight font-sans drop-shadow-sm mb-6"
          >
            Premium Custom <br />
            Apparel Crafted with <br />
            <span className="text-[#D4AF37]">Purpose</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="text-white/85 dark:text-white/90 text-sm sm:text-base md:text-lg leading-relaxed font-sans mb-10 max-w-xl drop-shadow-sm"
          >
            From custom apparel and promotional wear to Catholic and faith-inspired clothing, we blend high-end craftsmanship with meaningful design.
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <button
              onClick={onRequestQuote}
              className="bg-[#D4AF37] hover:bg-[#C09B2F] text-black font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded-md shadow-lg shadow-[#D4AF37]/10 transition-all hover:scale-[1.02] active:scale-[0.98] duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              Request a Quote <Sparkles className="w-4 h-4 text-black" />
            </button>
            <button
              onClick={onExploreCollections}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded-md transition-all hover:scale-[1.02] active:scale-[0.98] duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              Explore Collections <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-col items-center justify-center text-white/50 text-[10px] tracking-[0.3em] uppercase mt-auto cursor-pointer group"
          onClick={() => {
            const el = document.getElementById('craftsmanship-section');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
        >
          <span className="mb-2 group-hover:text-white transition-colors">SCROLL</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4 text-[#D4AF37]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
