/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

export default function Process() {
  const steps = [
    {
      num: '01',
      title: 'Consultation',
      desc: 'Discuss your vision and material preferences with our experts.',
      isSolid: false,
    },
    {
      num: '02',
      title: 'Design',
      desc: 'Receive digital proofs and mockups for your approval.',
      isSolid: false,
    },
    {
      num: '03',
      title: 'Sampling',
      desc: 'We create physical samples to ensure quality meets expectations.',
      isSolid: false,
    },
    {
      num: '04',
      title: 'Production',
      desc: 'Our artisans begin the meticulous manufacturing process.',
      isSolid: false,
    },
    {
      num: '05',
      title: 'Delivery',
      desc: 'Your premium apparel is packaged and shipped to your door.',
      isSolid: true, // The last step has a solid black fill in the blueprint!
    },
  ];

  return (
    <section className="py-24 bg-[#F9F9F9] dark:bg-[#111111] border-b border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        {/* Intro */}
        <div className="max-w-xl mx-auto mb-16">
          <span className="text-[11px] font-bold tracking-[0.25em] text-[#D4AF37] uppercase mb-4 block">
            THE ATELIER ROADMAP
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-black dark:text-white mb-4 font-sans">
            From Concept to Creation
          </h2>
          <p className="text-black/50 dark:text-white/50 text-xs sm:text-sm">
            Our luxury creation roadmap ensures flawless communication, exquisite tactile quality, and structured timelines.
          </p>
        </div>

        {/* Process Horizontal Row/Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 relative">
          {/* Connector line for desktop */}
          <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-[1px] bg-black/10 dark:bg-white/10 z-0" />

          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="flex flex-col items-center relative z-10 text-center"
            >
              {/* Number Circle */}
              <div
                className={`w-22 h-22 rounded-full flex items-center justify-center text-sm font-bold font-mono border-2 mb-6 shadow-sm transition-all duration-300 ${
                  step.isSolid
                    ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white scale-105 shadow-md shadow-black/10'
                    : 'bg-white dark:bg-[#1a1a1a] text-black dark:text-white border-[#D4AF37] hover:border-black dark:hover:border-white'
                }`}
              >
                {step.num}
              </div>

              {/* Title */}
              <h3 className="text-sm font-bold text-black dark:text-white uppercase tracking-wider mb-2 font-sans">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-black/60 dark:text-white/60 text-xs leading-relaxed max-w-[180px] font-sans">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
