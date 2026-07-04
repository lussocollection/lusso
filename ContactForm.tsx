/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Send, CheckCircle, FileText, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CustomProposal } from '../types';

export default function ContactForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Custom Apparel');
  const [details, setDetails] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedProposal, setSubmittedProposal] = useState<CustomProposal | null>(null);
  const [proposalsList, setProposalsList] = useState<CustomProposal[]>([]);

  // Load past proposals from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('lusso_proposals');
      if (stored) {
        setProposalsList(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Error loading proposals from storage', e);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !details) return;

    setIsSubmitting(true);

    // Simulate luxury server response
    setTimeout(() => {
      const randomId = 'LUSSO-PROP-' + Math.floor(10000 + Math.random() * 90000);
      const newProposal: CustomProposal = {
        id: randomId,
        fullName,
        email,
        category,
        details,
        createdAt: new Date().toLocaleString(),
        status: 'Received',
      };

      const updatedList = [newProposal, ...proposalsList];
      setProposalsList(updatedList);
      try {
        localStorage.setItem('lusso_proposals', JSON.stringify(updatedList));
      } catch (err) {
        console.error('Error saving proposals to storage', err);
      }

      setSubmittedProposal(newProposal);
      setIsSubmitting(false);

      // Reset form fields
      setFullName('');
      setEmail('');
      setCategory('Custom Apparel');
      setDetails('');
    }, 1500);
  };

  const deleteProposal = (id: string) => {
    const updated = proposalsList.filter(p => p.id !== id);
    setProposalsList(updated);
    try {
      localStorage.setItem('lusso_proposals', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    if (submittedProposal?.id === id) {
      setSubmittedProposal(null);
    }
  };

  return (
    <section
      id="custom-orders-section"
      className="py-24 bg-[#F5F5F5] dark:bg-[#151515] border-b border-black/5 dark:border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column Description */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            <span className="text-[11px] font-bold tracking-[0.25em] text-[#D4AF37] uppercase mb-4 block">
              COLLABORATIVE DESIGN
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white font-sans leading-tight mb-8">
              Let's Create <br />
              Something Amazing <br />
              Together
            </h2>
            <p className="text-black/60 dark:text-white/60 text-sm sm:text-base leading-relaxed mb-10 font-sans">
              Whether you’re looking for a bespoke corporate collection or a series of faith-inspired garments, we’re here to help bring your vision to life with unparalleled quality.
            </p>

            {/* Concierge Details Cards */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-white dark:bg-[#1C1C1C] p-4 rounded-xl border border-black/5 dark:border-white/5 shadow-sm max-w-sm">
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold tracking-widest text-black/40 dark:text-white/40 uppercase">
                    DIRECT EMAIL
                  </h4>
                  <a
                    href="mailto:concierge@lussocollection.com"
                    className="text-xs sm:text-sm font-semibold text-black dark:text-white hover:text-[#D4AF37] transition-colors"
                  >
                    concierge@lussocollection.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white dark:bg-[#1C1C1C] p-4 rounded-xl border border-black/5 dark:border-white/5 shadow-sm max-w-sm">
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold tracking-widest text-black/40 dark:text-white/40 uppercase">
                    ATELIER SITES
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold text-black dark:text-white">
                    Lusso Atelier, Rome & New York
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Form or Success Panel */}
          <div className="lg:col-span-7 bg-white dark:bg-[#1C1C1C] border border-black/5 dark:border-white/5 shadow-xl rounded-2xl p-8 sm:p-10 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {submittedProposal ? (
                <motion.div
                  key="success-proposal"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="flex flex-col items-center py-8 text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] mb-6 animate-pulse">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <span className="text-[10px] font-bold tracking-widest text-[#D4AF37] uppercase block mb-2">
                    PROPOSAL DISPATCHED SUCCESSFULLY
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white mb-3">
                    Thank you, {submittedProposal.fullName}
                  </h3>
                  <div className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-xl px-4 py-3 mb-6 max-w-md w-full">
                    <p className="text-xs text-black/50 dark:text-white/50 mb-1 font-mono uppercase">Inquiry Tracking ID</p>
                    <p className="text-sm font-bold tracking-wider text-[#D4AF37] font-mono">{submittedProposal.id}</p>
                  </div>
                  <p className="text-black/60 dark:text-white/60 text-xs sm:text-sm leading-relaxed max-w-md mb-8">
                    Our atelier concierge team has received your project details for <strong className="text-black dark:text-white">{submittedProposal.category}</strong>. We will contact you at <strong className="text-black dark:text-white">{submittedProposal.email}</strong> within 24 business hours to deliver digital design options.
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setSubmittedProposal(null)}
                      className="bg-black hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/95 text-white text-xs font-bold tracking-widest uppercase px-6 py-3 rounded-lg transition-all active:scale-95 cursor-pointer"
                    >
                      Submit Another Proposal
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="proposal-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 text-left"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="flex flex-col">
                      <label className="text-[10px] font-bold tracking-widest uppercase text-black/50 dark:text-white/50 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe"
                        className="bg-black/[0.02] dark:bg-white/[0.02] border-b border-black/15 dark:border-white/15 focus:border-[#D4AF37] dark:focus:border-[#D4AF37] outline-none text-sm px-1 py-3 text-black dark:text-white transition-all font-sans"
                      />
                    </div>

                    {/* Email Address */}
                    <div className="flex flex-col">
                      <label className="text-[10px] font-bold tracking-widest uppercase text-black/50 dark:text-white/50 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="bg-black/[0.02] dark:bg-white/[0.02] border-b border-black/15 dark:border-white/15 focus:border-[#D4AF37] dark:focus:border-[#D4AF37] outline-none text-sm px-1 py-3 text-black dark:text-white transition-all font-sans"
                      />
                    </div>
                  </div>

                  {/* Service Category */}
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-black/50 dark:text-white/50 mb-2">
                      Service Category
                    </label>
                    <div className="relative">
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-black/[0.02] dark:bg-white/[0.02] border-b border-black/15 dark:border-white/15 focus:border-[#D4AF37] dark:focus:border-[#D4AF37] outline-none text-sm px-1 py-3.5 text-black dark:text-white transition-all font-sans appearance-none cursor-pointer"
                      >
                        <option value="Custom Apparel" className="text-black bg-white dark:bg-[#1a1a1a] dark:text-white">Custom Apparel (Bespoke Private Label)</option>
                        <option value="Promotional Wear" className="text-black bg-white dark:bg-[#1a1a1a] dark:text-white">Promotional Wear (Corporate Teams)</option>
                        <option value="Catholic Apparel" className="text-black bg-white dark:bg-[#1a1a1a] dark:text-white">Catholic Apparel (Parishes & Ministries)</option>
                        <option value="Faith-Inspired Clothing" className="text-black bg-white dark:bg-[#1a1a1a] dark:text-white">Faith-Inspired Collection</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-black/40 dark:text-white/40">
                        ▼
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-black/50 dark:text-white/50 mb-2">
                      Project Details
                    </label>
                    <textarea
                      required
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="Tell us about your project..."
                      rows={4}
                      className="bg-black/[0.02] dark:bg-white/[0.02] border-b border-black/15 dark:border-white/15 focus:border-[#D4AF37] dark:focus:border-[#D4AF37] outline-none text-sm px-1 py-3 text-black dark:text-white resize-none transition-all font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 text-white font-bold text-xs uppercase tracking-widest py-4 rounded-md transition-all active:scale-95 duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#D4AF37]" /> Dispaching...
                      </>
                    ) : (
                      <>
                        Submit Proposal <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Past Proposals List inside card (durable state showcase!) */}
            {proposalsList.length > 0 && (
              <div className="mt-10 pt-8 border-t border-black/10 dark:border-white/10 text-left">
                <h4 className="text-[10px] font-bold tracking-widest text-[#D4AF37] uppercase mb-4 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5" /> Your Active Ateliers inquiries ({proposalsList.length})
                </h4>
                <div className="space-y-3 max-h-[160px] overflow-y-auto pr-2">
                  {proposalsList.map((p) => (
                    <div
                      key={p.id}
                      className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-xl p-3 flex items-center justify-between gap-4 text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold font-mono tracking-wider text-black dark:text-white">{p.id}</span>
                          <span className="bg-[#D4AF37]/10 text-[#D4AF37] px-2 py-0.5 rounded text-[9px] font-bold tracking-widest uppercase">
                            {p.category}
                          </span>
                        </div>
                        <p className="text-black/50 dark:text-white/50 text-[10px] mt-1">Submitted: {p.createdAt}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="bg-green-600/10 text-green-500 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                          {p.status}
                        </span>
                        <button
                          onClick={() => deleteProposal(p.id)}
                          className="text-red-500 hover:text-red-700 text-[10px] uppercase font-bold cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
