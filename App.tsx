/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Mail, ShieldCheck, MapPin, Compass, ArrowRight, Instagram, Facebook, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Import our modular custom components
import Header from './components/Header';
import Hero from './components/Hero';
import Story from './components/Story';
import Collections from './components/Collections';
import LussoStandard from './components/LussoStandard';
import FaithCollection from './components/FaithCollection';
import Process from './components/Process';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import ProductShopModal from './components/ProductShopModal';
import CartDrawer from './components/CartDrawer';
import UserProfileModal from './components/UserProfileModal';
import WhatsAppWidget from './components/WhatsAppWidget';

import { Product, CartItem } from './types';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [shopCategory, setShopCategory] = useState<string>('all');
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Load cart state from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('lusso_cart');
      if (stored) {
        setCartItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Error loading cart from storage', e);
    }
  }, []);

  // Sync cart items to localStorage on changes
  const saveCartToStorage = (updatedCart: CartItem[]) => {
    setCartItems(updatedCart);
    try {
      localStorage.setItem('lusso_cart', JSON.stringify(updatedCart));
    } catch (e) {
      console.error('Error saving cart to storage', e);
    }
  };

  // Cart actions
  const handleAddToCart = (product: Product, size: string, color: { name: string; hex: string }) => {
    const existingIndex = cartItems.findIndex(
      (item) =>
        item.product.id === product.id &&
        item.selectedSize === size &&
        item.selectedColor.name === color.name
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += 1;
      saveCartToStorage(updated);
    } else {
      const newItem: CartItem = {
        product,
        quantity: 1,
        selectedSize: size,
        selectedColor: color,
      };
      saveCartToStorage([...cartItems, newItem]);
    }
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
    } else {
      const updated = [...cartItems];
      updated[index].quantity = newQty;
      saveCartToStorage(updated);
    }
  };

  const handleRemoveItem = (index: number) => {
    const updated = cartItems.filter((_, i) => i !== index);
    saveCartToStorage(updated);
  };

  const handleClearCart = () => {
    saveCartToStorage([]);
  };

  const handleOpenShop = (category: string = 'all') => {
    setShopCategory(category);
    setIsShopOpen(true);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSubscribed(false), 5000);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white dark:bg-[#111111] text-black dark:text-white transition-colors duration-500 font-sans antialiased overflow-x-hidden selection:bg-[#D4AF37]/30">
      {/* 1. STICKY HEADER */}
      <Header
        onOpenCart={() => setIsCartOpen(true)}
        onOpenShop={handleOpenShop}
        onOpenStory={() => setIsStoryOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        cartCount={cartCount}
      />

      {/* 2. HERO LANDING */}
      <Hero
        onRequestQuote={() => {
          const el = document.getElementById('custom-orders-section');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
        onExploreCollections={() => {
          const el = document.getElementById('collections-section');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
      />

      {/* 3. OUR STORY & CRAFTSMANSHIP */}
      <Story
        isOpen={isStoryOpen}
        onOpen={() => setIsStoryOpen(true)}
        onClose={() => setIsStoryOpen(false)}
      />

      {/* 4. CURATED COLLECTIONS SPECIALTY */}
      <Collections onOpenShop={handleOpenShop} />

      {/* 5. THE LUSSO QUALITY STANDARD */}
      <LussoStandard />

      {/* 6. WEAR YOUR FAITH WITH PURPOSE */}
      <FaithCollection onOpenShop={handleOpenShop} onAddToCart={handleAddToCart} />

      {/* 7. CREATION ROADMAP PROCESS */}
      <Process />

      {/* 8. DYNAMIC FAQ ACCORDION */}
      <FAQ />

      {/* 9. LET'S CREATE - CUSTOM PROPOSAL FORM */}
      <ContactForm />

      {/* 10. LUXURY ATELIER FOOTER */}
      <footer id="contact-footer" className="bg-black text-white py-16 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/5">
            {/* Logo/Description */}
            <div className="md:col-span-4 text-left">
              <h3 className="text-xl font-bold tracking-tight uppercase mb-4 text-[#D4AF37]">
                Lusso Collection
              </h3>
              <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                Premium custom apparel and promotional wear with faith-inspired designs and high-end craftsmanship. Built on values of honesty, perfection, and spiritual purpose.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Navigation Lists */}
            <div className="md:col-span-2 text-left">
              <h4 className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-4">
                Client Relations
              </h4>
              <ul className="space-y-2.5 text-xs text-white/70">
                <li>
                  <button
                    onClick={() => {
                      const el = document.getElementById('custom-orders-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                  >
                    Custom Inquiries
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleOpenShop()}
                    className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                  >
                    Shop Catalogues
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setIsStoryOpen(true)}
                    className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                  >
                    Atelier Heritage
                  </button>
                </li>
              </ul>
            </div>

            <div className="md:col-span-2 text-left">
              <h4 className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-4">
                Atelier Locations
              </h4>
              <p className="text-xs text-white/70 leading-relaxed font-sans mb-3 flex items-start gap-1.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                Rome Studio:<br />Via del Corso 110, Rome
              </p>
              <p className="text-xs text-white/70 leading-relaxed font-sans flex items-start gap-1.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                New York Studio:<br />740 Park Ave, New York
              </p>
            </div>

            {/* Newsletter Subscribe */}
            <div className="md:col-span-4 text-left">
              <h4 className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-4">
                Join the Couture Registry
              </h4>
              <p className="text-xs text-white/60 leading-relaxed mb-4 font-sans">
                Subscribe to receive private invitations for new limited edition liturgical and high-street faith drops.
              </p>
              
              <AnimatePresence mode="wait">
                {newsletterSubscribed ? (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-green-400 font-bold flex items-center gap-1.5 bg-green-500/10 p-3 rounded-lg border border-green-500/10"
                  >
                    <ShieldCheck className="w-4 h-4 text-green-400" /> Subscribed successfully! Welcome to Lusso.
                  </motion.div>
                ) : (
                  <motion.form
                    onSubmit={handleNewsletterSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex gap-2"
                  >
                    <input
                      type="email"
                      required
                      placeholder="Enter premium email..."
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="bg-white/5 border border-white/10 outline-none text-xs rounded-lg px-3 py-2.5 text-white focus:border-[#D4AF37] transition-all flex-1"
                    />
                    <button
                      type="submit"
                      className="bg-white text-black hover:bg-white/90 rounded-lg px-4 flex items-center justify-center cursor-pointer transition-transform active:scale-95"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Sub footer copyrights */}
          <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[10px] text-white/40">
            <p>
              Lusso Collection Atelier Roma © 2026. Made with faith & excellence. All rights reserved.
            </p>
            <div className="flex gap-4">
              <span className="hover:text-white transition-colors cursor-pointer">Security Rules Vetted</span>
              <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
              <span className="hover:text-white transition-colors cursor-pointer">Terms & Conditions</span>
            </div>
          </div>
        </div>
      </footer>

      {/* 11. MODAL OVERLAYS & DRAWER SIDEBARS */}
      {/* Dynamic Catalog Shop Modal */}
      <ProductShopModal
        isOpen={isShopOpen}
        onClose={() => setIsShopOpen(false)}
        initialCategory={shopCategory}
        onAddToCart={handleAddToCart}
      />

      {/* Shopping Bag / Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* User Profile Portfolio Modal */}
      <UserProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />

      {/* WhatsApp Virtual Concierge chatbot widget */}
      <WhatsAppWidget />
    </div>
  );
}
