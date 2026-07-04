/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ShoppingBag, User, Menu, X, ChevronDown, Award, Sparkles, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { collections } from '../data';

interface HeaderProps {
  onOpenCart: () => void;
  onOpenShop: (category?: string) => void;
  onOpenStory: () => void;
  onOpenProfile: () => void;
  cartCount: number;
}

export default function Header({
  onOpenCart,
  onOpenShop,
  onOpenStory,
  onOpenProfile,
  cartCount,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollectionsHovered, setIsCollectionsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Header height approximate
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <header
        id="lusso-header"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/80 dark:bg-[#111111]/85 backdrop-blur-xl border-b border-black/5 dark:border-white/5 py-3 shadow-lg shadow-black/[0.02]'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-2xl font-bold tracking-tight text-black dark:text-white font-sans transition-transform active:scale-95 cursor-pointer"
          >
            Lusso Collection
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10 text-sm font-medium">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={onOpenStory}
              className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => onOpenShop()}
              className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
            >
              Shop
            </button>
            
            {/* Collections Hover Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => setIsCollectionsHovered(true)}
              onMouseLeave={() => setIsCollectionsHovered(false)}
            >
              <button
                onClick={() => scrollToSection('collections-section')}
                className="flex items-center gap-1 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
              >
                Collections
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isCollectionsHovered ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isCollectionsHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[520px] bg-white dark:bg-[#1a1a1a] border border-black/10 dark:border-white/10 rounded-xl p-6 shadow-2xl z-50"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      {collections.map((col) => (
                        <button
                          key={col.id}
                          onClick={() => {
                            setIsCollectionsHovered(false);
                            onOpenShop(col.id);
                          }}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-black/[0.03] dark:hover:bg-white/[0.03] text-left transition-all duration-200 group"
                        >
                          <img
                            src={col.image}
                            alt={col.title}
                            className="w-14 h-18 object-cover rounded-md border border-black/5 dark:border-white/5 shadow-sm group-hover:scale-105 transition-transform"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <h4 className="font-semibold text-black dark:text-white text-xs uppercase tracking-wider mb-1 group-hover:text-[#D4AF37] transition-colors">
                              {col.title}
                            </h4>
                            <p className="text-black/50 dark:text-white/50 text-[11px] leading-relaxed line-clamp-2">
                              {col.description}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-black/5 dark:border-white/5 flex justify-between items-center text-xs">
                      <span className="text-black/40 dark:text-white/40 flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-[#D4AF37]" /> High-Fashion Standards
                      </span>
                      <button
                        onClick={() => {
                          setIsCollectionsHovered(false);
                          onOpenShop();
                        }}
                        className="text-black dark:text-white hover:text-[#D4AF37] font-semibold flex items-center gap-1"
                      >
                        Explore All <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => scrollToSection('custom-orders-section')}
              className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
            >
              Custom Orders
            </button>
            <button
              onClick={() => scrollToSection('contact-footer')}
              className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Quick Actions (Cart, Profile, Mobile Menu Toggle) */}
          <div className="flex items-center space-x-6">
            {/* User Profile Button */}
            <button
              onClick={onOpenProfile}
              className="p-2 text-black/80 dark:text-white/80 hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition-all relative rounded-full hover:bg-black/[0.03] dark:hover:bg-white/[0.03] active:scale-95 cursor-pointer"
              title="Account & Orders"
            >
              <User className="w-[1.35rem] h-[1.35rem]" />
            </button>

            {/* Shopping Bag Icon with item count */}
            <button
              onClick={onOpenCart}
              className="p-2 text-black/80 dark:text-white/80 hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition-all relative rounded-full hover:bg-black/[0.03] dark:hover:bg-white/[0.03] active:scale-95 cursor-pointer"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-[1.35rem] h-[1.35rem]" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 bg-black dark:bg-[#D4AF37] text-white dark:text-black font-semibold text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white dark:border-[#111111]"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-black/80 dark:text-white/80 hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition-all rounded-full hover:bg-black/[0.03] dark:hover:bg-white/[0.03] active:scale-95 cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-[60px] left-0 w-full bg-white dark:bg-[#111111] border-b border-black/5 dark:border-white/5 z-45 lg:hidden overflow-hidden shadow-2xl"
          >
            <div className="px-6 py-8 flex flex-col space-y-5 text-base font-semibold">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-left py-2 text-black/70 dark:text-white/70 hover:text-[#D4AF37] transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenStory();
                }}
                className="text-left py-2 text-black/70 dark:text-white/70 hover:text-[#D4AF37] transition-colors"
              >
                Our Story
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenShop();
                }}
                className="text-left py-2 text-[#D4AF37] font-bold flex items-center gap-1.5"
              >
                <Compass className="w-4 h-4" /> Browse Shop Catalog
              </button>
              
              {/* Mobile Collections Sub-Links */}
              <div className="border-t border-black/5 dark:border-white/5 pt-3">
                <span className="text-[10px] tracking-widest text-black/40 dark:text-white/40 uppercase font-bold block mb-2">
                  Collections
                </span>
                <div className="grid grid-cols-2 gap-2 pl-1">
                  {collections.map((col) => (
                    <button
                      key={col.id}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onOpenShop(col.id);
                      }}
                      className="text-left py-1.5 text-xs text-black/60 dark:text-white/60 hover:text-[#D4AF37] transition-colors font-medium"
                    >
                      {col.title}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => scrollToSection('custom-orders-section')}
                className="text-left py-2 text-black/70 dark:text-white/70 hover:text-[#D4AF37] transition-colors border-t border-black/5 dark:border-white/5 pt-3"
              >
                Custom Orders
              </button>
              <button
                onClick={() => scrollToSection('contact-footer')}
                className="text-left py-2 text-black/70 dark:text-white/70 hover:text-[#D4AF37] transition-colors"
              >
                Contact Concierge
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
