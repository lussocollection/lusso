/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Award, ShieldCheck, Mail, Calendar, Sparkles, Receipt, Trash } from 'lucide-react';
import { CustomProposal } from '../types';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserProfileModal({ isOpen, onClose }: UserProfileModalProps) {
  const [proposals, setProposals] = useState<CustomProposal[]>([]);

  // Pull local proposals on mount or updates
  useEffect(() => {
    if (isOpen) {
      try {
        const stored = localStorage.getItem('lusso_proposals');
        if (stored) {
          setProposals(JSON.parse(stored));
        } else {
          setProposals([]);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [isOpen]);

  const handleClearHistory = () => {
    try {
      localStorage.removeItem('lusso_proposals');
      setProposals([]);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          {/* Backdrop Click */}
          <div className="absolute inset-0" onClick={onClose} />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            className="bg-white dark:bg-[#1a1a1a] border border-black/10 dark:border-white/10 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative z-10 text-left"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-black dark:text-white">
                  VIP Concierge Portfolio
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-black dark:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Contents */}
            <div className="p-6 md:p-8 space-y-6">
              {/* Client Loyalty Badge Card */}
              <div className="relative overflow-hidden bg-gradient-to-r from-neutral-900 to-neutral-950 text-white rounded-2xl p-6 border border-white/5 shadow-lg">
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-48 h-48 bg-[#D4AF37]/5 blur-[60px] rounded-full pointer-events-none" />
                
                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <span className="text-[9px] font-bold tracking-[0.25em] text-[#D4AF37] uppercase block mb-1">
                      LUSSO COUTURE CLUB
                    </span>
                    <h4 className="text-lg font-bold tracking-wide">Laurence Sterling</h4>
                    <p className="text-white/55 text-xs flex items-center gap-1.5 mt-2">
                      <Mail className="w-3.5 h-3.5" /> premium@lussocollection.com
                    </p>
                  </div>
                  
                  <div className="bg-white/5 border border-white/10 rounded-full p-2.5 flex items-center justify-center text-[#D4AF37]">
                    <Award className="w-5 h-5 animate-pulse" />
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-white/10 flex justify-between items-center text-xs relative z-10">
                  <div>
                    <p className="text-white/40 text-[9px] uppercase tracking-wider font-semibold">Tier Status</p>
                    <p className="font-bold text-[#D4AF37] flex items-center gap-1">
                      Sartorial Patron <Sparkles className="w-3 h-3" />
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/40 text-[9px] uppercase tracking-wider font-semibold">Joined Ateliers</p>
                    <p className="font-bold text-white flex items-center gap-1.5 justify-end">
                      <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> July 2024
                    </p>
                  </div>
                </div>
              </div>

              {/* Active Proposals Section inside profile */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-[10px] font-bold tracking-widest text-black/45 dark:text-white/45 uppercase flex items-center gap-1">
                    <Receipt className="w-3.5 h-3.5" /> active bespoke custom proposals
                  </h4>
                  {proposals.length > 0 && (
                    <button
                      onClick={handleClearHistory}
                      className="text-[9px] font-bold uppercase tracking-widest text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      Clear History
                    </button>
                  )}
                </div>

                {proposals.length === 0 ? (
                  <div className="bg-[#fcfbf9] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-xl p-5 text-center text-black/40 dark:text-white/40">
                    <p className="text-xs font-semibold">No custom proposals submitted yet</p>
                    <p className="text-[10px] mt-1 leading-relaxed">
                      Submit a custom layout request in our proposal form to see it listed here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3.5 max-h-[190px] overflow-y-auto pr-2">
                    {proposals.map((p) => (
                      <div
                        key={p.id}
                        className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-xl p-3 flex items-center justify-between gap-4 text-xs"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold font-mono tracking-wider text-black dark:text-white">{p.id}</span>
                            <span className="bg-[#D4AF37]/10 text-[#D4AF37] px-2 py-0.5 rounded text-[9px] font-bold uppercase">
                              {p.category}
                            </span>
                          </div>
                          <p className="text-black/50 dark:text-white/50 text-[10px] mt-0.5">{p.createdAt}</p>
                        </div>
                        <span className="bg-green-600/15 text-green-500 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                          {p.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-[#FBFBFB] dark:bg-[#151515] border-t border-black/5 dark:border-white/5 flex justify-end">
              <button
                onClick={onClose}
                className="bg-black dark:bg-white text-white dark:text-black hover:opacity-90 px-5 py-2 rounded-lg text-xs font-bold tracking-widest uppercase transition-all cursor-pointer"
              >
                Close Portfolio
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
