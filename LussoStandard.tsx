/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Award, Printer, Clock } from 'lucide-react';

export default function LussoStandard() {
  const standards = [
    {
      id: 1,
      icon: Award,
      title: 'Premium Materials',
      description: 'We source only the finest sustainable cottons and performance blends that retain their form and feel over time.',
    },
    {
      id: 2,
      icon: Printer,
      title: 'Masterful Printing',
      description: 'From screen printing to high-definition embroidery, our techniques ensure crisp details and vibrant, lasting colors.',
    },
    {
      id: 3,
      icon: Clock,
      title: 'Timely Delivery',
      description: 'Excellence includes respect for your time. We offer reliable, fast turnaround times without compromising on quality.',
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#111111] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        {/* Intro Header */}
        <div className="max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-bold tracking-[0.25em] text-[#D4AF37] uppercase mb-4 block">
            THE LUSSO QUALITY
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-black dark:text-white mb-4 font-sans">
            The Lusso Standard
          </h2>
          <p className="text-black/60 dark:text-white/60 text-sm sm:text-base leading-relaxed font-sans">
            We define luxury not by price, but by the integrity of our process and the impact of our products.
          </p>
        </div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {standards.map((std, index) => {
            const IconComponent = std.icon;
            return (
              <motion.div
                key={std.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group bg-[#F9F9F9] dark:bg-[#1A1A1A] p-8 rounded-2xl border border-black/5 dark:border-white/5 shadow-sm hover:shadow-xl transition-all duration-300 text-left relative overflow-hidden"
              >
                {/* Decorative gold background gradient on hover */}
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Icon Container */}
                <div className="w-12 h-12 bg-white dark:bg-[#2A2A2A] rounded-xl flex items-center justify-center text-[#D4AF37] border border-black/5 dark:border-white/5 shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-6 h-6" />
                </div>

                {/* Card Title */}
                <h3 className="text-lg font-bold text-black dark:text-white mb-3 font-sans uppercase tracking-wide">
                  {std.title}
                </h3>

                {/* Card Description */}
                <p className="text-black/60 dark:text-white/60 text-xs sm:text-sm leading-relaxed font-sans">
                  {std.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
