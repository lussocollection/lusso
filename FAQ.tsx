/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { faqs } from '../data';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-24 bg-white dark:bg-[#111111] overflow-hidden border-b border-black/5 dark:border-white/5">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        {/* Intro */}
        <div className="mb-16">
          <span className="text-[11px] font-bold tracking-[0.25em] text-[#D4AF37] uppercase mb-4 block">
            CONCIERGE INQUIRIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-black dark:text-white mb-4 font-sans">
            Frequently Asked Questions
          </h2>
          <p className="text-black/50 dark:text-white/50 text-xs sm:text-sm">
            Everything you need to know about our custom fabric formulations, Rome and NY ateliers, and bulk deliveries.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4 text-left">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`border rounded-xl transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-[#D4AF37] bg-black/[0.01] dark:bg-white/[0.01]'
                    : 'border-black/10 dark:border-white/10 bg-[#FBFBFB] dark:bg-[#1A1A1A]/30 hover:border-black/25 dark:hover:border-white/25'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer group"
                >
                  <span className="font-semibold text-sm sm:text-base text-black dark:text-white font-sans pr-4 group-hover:text-[#D4AF37] transition-colors">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                      isOpen
                        ? 'border-[#D4AF37] bg-[#D4AF37] text-black'
                        : 'border-black/10 dark:border-white/10 text-black dark:text-white group-hover:bg-black/5 dark:group-hover:bg-white/5'
                    }`}
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-1 text-black/70 dark:text-white/70 text-xs sm:text-sm leading-relaxed border-t border-black/5 dark:border-white/5 font-sans">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
