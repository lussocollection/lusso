/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, X, Award, CheckCircle, ShieldAlert } from 'lucide-react';

interface StoryProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export default function Story({ isOpen, onOpen, onClose }: StoryProps) {
  return (
    <>
      <section
        id="craftsmanship-section"
        className="py-24 md:py-32 bg-white dark:bg-[#111111] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-5 flex flex-col justify-center text-left">
              <span className="text-[11px] font-bold tracking-[0.25em] text-[#D4AF37] uppercase mb-4 block">
                OUR HERITAGE
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white mb-8 font-sans leading-tight">
                Quality Craftsmanship <br />
                Meets Creative Vision
              </h2>
              <p className="text-black/70 dark:text-white/70 text-sm sm:text-base leading-relaxed mb-6 font-sans">
                At Lusso Collection, we believe that clothing is more than just fabric—it’s a testament to identity and belief. Our approach combines the precision of industrial printing with the delicate touch of artisanal tailoring.
              </p>
              <p className="text-black/70 dark:text-white/70 text-sm sm:text-base leading-relaxed mb-10 font-sans">
                Founded on principles of faith and excellence, we serve organizations, communities, and individuals who refuse to compromise on quality. Every piece that leaves our studio is a promise of durability, comfort, and aesthetic brilliance.
              </p>
              <div>
                <button
                  onClick={onOpen}
                  className="inline-flex items-center gap-2 group text-xs uppercase font-bold tracking-widest text-black dark:text-white border-b-2 border-black/15 dark:border-white/15 pb-2 hover:border-[#D4AF37] transition-all cursor-pointer"
                >
                  Our Story
                  <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Graphic/Image Column with Quote Overlays */}
            <div className="lg:col-span-7 relative">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl shadow-black/5 border border-black/5 dark:border-white/5">
                <img
                  src="/src/assets/images/lusso_craft_1783195715870.jpg"
                  alt="Lusso Collection Gold Embroidery Craftsmanship"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Floating Quote Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute bottom-[-30px] left-4 md:left-12 right-4 md:max-w-md bg-white/90 dark:bg-[#1a1a1a]/90 backdrop-blur-xl border border-black/15 dark:border-white/15 p-6 md:p-8 rounded-xl shadow-2xl z-20"
              >
                <span className="text-[10px] font-bold tracking-widest text-[#D4AF37] uppercase block mb-3">
                  ARTISANAL VALUES
                </span>
                <p className="text-black/85 dark:text-white/90 text-xs sm:text-sm italic leading-relaxed font-sans">
                  "Design is not just what it looks like and feels like. Design is how it works and what it represents."
                </p>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* "Our Story" Detailed Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white dark:bg-[#1a1a1a] border border-black/10 dark:border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative shadow-2xl text-left"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-black dark:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-[#D4AF37] mb-4">
                <Award className="w-6 h-6" />
                <span className="text-xs font-bold uppercase tracking-widest">ABOUT LUSSO COLLECTION</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-6">
                Our Heritage & Faith Foundation
              </h3>

              <div className="space-y-6 text-black/70 dark:text-white/70 text-sm leading-relaxed font-sans">
                <p>
                  Established with a vision to build apparel that matters, <strong className="text-black dark:text-white font-semibold">Lusso Collection</strong> operates at the intersection of sophisticated, contemporary fashion and sacred traditional themes. "Lusso" stands for luxury in Italian, but our interpretation is rooted in the perfection of service, ethical sourcing, and artistic respect for divine creations.
                </p>
                <p>
                  We began as a small private workshop in Rome, sewing custom liturgical linens and high-quality vestments. Discovering a profound need for elegant, everyday clothing that speaks of deep faith without loud, unrefined slogans, we launched our <strong className="text-black dark:text-white font-semibold">Faith Collection</strong>. This collection introduces minimalist, quiet-luxury streetwear featuring gold-embroidered scriptures, high-density prints, and timeless silhouettes.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8 p-4 bg-black/[0.02] dark:bg-white/[0.02] rounded-xl border border-black/5 dark:border-white/5">
                  <div className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-[#D4AF37] shrink-0" />
                    <div>
                      <h4 className="font-semibold text-black dark:text-white text-xs uppercase mb-1">PREMIUM MATERIALS</h4>
                      <p className="text-[11px]">Sourced only from responsible organic farms, combed ring-spun cotton and premium silk blends.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-[#D4AF37] shrink-0" />
                    <div>
                      <h4 className="font-semibold text-black dark:text-white text-xs uppercase mb-1">SACRED INSPIRATION</h4>
                      <p className="text-[11px]">Carefully curated symbols and scriptures vetted for deep liturgical and theological accuracy.</p>
                    </div>
                  </div>
                </div>
                <p>
                  Today, Lusso is a global concierge assisting diocese organizations, parish ministries, top-tier schools, corporate brands, and thousands of believers worldwide. We remain committed to keeping our work honest, our designs inspiring, and our service fully custom.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/5 flex justify-end">
                <button
                  onClick={onClose}
                  className="bg-black dark:bg-white text-white dark:text-black hover:bg-black/95 px-6 py-2.5 rounded-lg text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer"
                >
                  Close Story
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
