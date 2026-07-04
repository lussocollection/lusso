/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Compass } from 'lucide-react';
import { collections } from '../data';

interface CollectionsProps {
  onOpenShop: (category?: string) => void;
}

export default function Collections({ onOpenShop }: CollectionsProps) {
  return (
    <section
      id="collections-section"
      className="py-24 bg-[#F5F5F5] dark:bg-[#151515] border-t border-b border-black/5 dark:border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Block with Flex Row Layout */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 text-left">
          <div>
            <span className="text-[11px] font-bold tracking-[0.25em] text-[#D4AF37] uppercase mb-4 block">
              OUR COLLECTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-black dark:text-white font-sans leading-tight">
              Curated Specialty Wear
            </h2>
          </div>
          <button
            onClick={() => onOpenShop()}
            className="mt-4 sm:mt-0 inline-flex items-center gap-1 text-xs font-bold tracking-wider uppercase text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white border-b border-transparent hover:border-[#D4AF37] pb-1 transition-all cursor-pointer"
          >
            View All Categories <Compass className="w-4 h-4 text-[#D4AF37]" />
          </button>
        </div>

        {/* 4-Column Card Grid with hover reveals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((col, index) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => onOpenShop(col.id)}
              className="group relative h-[420px] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer border border-black/5 dark:border-white/5"
            >
              {/* Card Image */}
              <img
                src={col.image}
                alt={col.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/5 group-hover:via-black/50 transition-all duration-300" />

              {/* Card Contents */}
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end text-left h-full">
                {/* Floating Top Right Arrow Indicator */}
                <div className="absolute top-6 right-6 w-9 h-9 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </div>

                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  {/* Category Eyebrow */}
                  <span className="text-[9px] font-bold tracking-[0.2em] text-[#D4AF37] uppercase mb-1 block">
                    CATEGORY {index + 1}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-tight">
                    {col.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/70 text-xs leading-relaxed line-clamp-3 mb-2 opacity-90 group-hover:opacity-100 transition-opacity">
                    {col.description}
                  </p>
                  
                  {/* Expandable highlight in hover state */}
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Browse Custom Catalog →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
