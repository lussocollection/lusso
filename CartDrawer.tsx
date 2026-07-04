/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, ShoppingBag, Trash, CreditCard, Sparkles, CheckCircle, ChevronRight, Loader2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [isCheckoutFlow, setIsCheckoutFlow] = useState(false);
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);
  const [completedOrderNumber, setCompletedOrderNumber] = useState<string | null>(null);

  // Checkout shipping input states
  const [address, setAddress] = useState('');
  const [zip, setZip] = useState('');

  const cartTotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleStartCheckout = () => {
    setIsCheckoutFlow(true);
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingCheckout(true);

    setTimeout(() => {
      const orderNum = 'LUSSO-ORDER-' + Math.floor(100000 + Math.random() * 900000);
      setCompletedOrderNumber(orderNum);
      setIsProcessingCheckout(false);
      onClearCart(); // empty cart
    }, 2000);
  };

  const handleCloseFlow = () => {
    setIsCheckoutFlow(false);
    setCompletedOrderNumber(null);
    setAddress('');
    setZip('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-md"
        >
          {/* Click outside backdrop to close */}
          <div className="absolute inset-0 z-0" onClick={onClose} />

          {/* Cart Sidebar container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 24, stiffness: 220 }}
            className="w-full max-w-md h-full bg-white dark:bg-[#111111] shadow-2xl relative z-10 flex flex-col justify-between"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
                <h2 className="text-base font-bold tracking-widest uppercase text-black dark:text-white">
                  Your Atelier Bag
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-black dark:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Interactive Panel */}
            <div className="flex-1 overflow-y-auto p-6">
              <AnimatePresence mode="wait">
                {completedOrderNumber ? (
                  // Success State screen
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center py-10 text-center text-black dark:text-white"
                  >
                    <div className="w-14 h-14 rounded-full bg-green-500/15 text-green-500 flex items-center justify-center mb-6 animate-pulse">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <span className="text-[10px] font-bold tracking-widest text-[#D4AF37] uppercase block mb-2">
                      PAYMENT CONFIRMED
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold mb-3">Order Placed Successfully!</h3>
                    <div className="bg-black/[0.03] dark:bg-white/[0.03] px-4 py-2.5 rounded-lg border border-black/5 dark:border-white/5 w-full mb-6 font-mono">
                      <p className="text-[10px] text-black/50 dark:text-white/50 uppercase">Atelier Receipt ID</p>
                      <p className="text-sm font-bold text-[#D4AF37] tracking-wider mt-0.5">{completedOrderNumber}</p>
                    </div>
                    <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed max-w-sm mb-8 font-sans">
                      Our craft artisans will begin preparing your premium apparel order immediately. A detailed digital invoice and express tracking link will be sent to your registered email address shortly.
                    </p>
                    <button
                      onClick={handleCloseFlow}
                      className="w-full bg-black hover:bg-black/95 dark:bg-white dark:text-black dark:hover:bg-white/95 text-xs font-bold tracking-widest uppercase py-4 rounded-md transition-all active:scale-95 cursor-pointer"
                    >
                      Continue Exploring
                    </button>
                  </motion.div>
                ) : isCheckoutFlow ? (
                  // Mock Checkout flow screen
                  <motion.form
                    key="checkout"
                    onSubmit={handleConfirmOrder}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6 text-left"
                  >
                    <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-black dark:text-white">
                        Atelier Checkout Details
                      </h3>
                      <button
                        type="button"
                        onClick={() => setIsCheckoutFlow(false)}
                        className="text-xs text-black/45 dark:text-white/45 hover:text-black dark:hover:text-white font-bold cursor-pointer"
                      >
                        ← Edit Bag
                      </button>
                    </div>

                    {/* Order summary small box */}
                    <div className="bg-[#fcfbf9] dark:bg-[#1C1C1C] rounded-xl p-4 border border-[#D4AF37]/20 text-xs">
                      <div className="flex justify-between font-bold text-black dark:text-white mb-2">
                        <span>Total Due:</span>
                        <span className="text-[#D4AF37] font-bold">${cartTotal}</span>
                      </div>
                      <p className="text-black/50 dark:text-white/50 text-[10px]">
                        Includes express worldwide priority courier with luxury signature packaging.
                      </p>
                    </div>

                    {/* Delivery Address */}
                    <div className="flex flex-col">
                      <label className="text-[9px] font-bold tracking-widest uppercase text-black/45 dark:text-white/45 mb-2">
                        Shipping Destination Address
                      </label>
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="740 Park Ave, New York"
                        className="bg-black/[0.02] dark:bg-white/[0.02] border-b border-black/15 dark:border-white/15 focus:border-[#D4AF37] outline-none text-xs py-2.5 text-black dark:text-white transition-all font-sans"
                      />
                    </div>

                    {/* Zip code / Phone */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label className="text-[9px] font-bold tracking-widest uppercase text-black/45 dark:text-white/45 mb-2">
                          Postal Zip Code
                        </label>
                        <input
                          type="text"
                          required
                          value={zip}
                          onChange={(e) => setZip(e.target.value)}
                          placeholder="10021"
                          className="bg-black/[0.02] dark:bg-white/[0.02] border-b border-black/15 dark:border-white/15 focus:border-[#D4AF37] outline-none text-xs py-2.5 text-black dark:text-white transition-all font-sans"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-[9px] font-bold tracking-widest uppercase text-black/45 dark:text-white/45 mb-2">
                          Atelier Contact Phone
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+1 (555) 0199"
                          className="bg-black/[0.02] dark:bg-white/[0.02] border-b border-black/15 dark:border-white/15 focus:border-[#D4AF37] outline-none text-xs py-2.5 text-black dark:text-white transition-all font-sans"
                        />
                      </div>
                    </div>

                    {/* Mock Payment Selector */}
                    <div>
                      <label className="text-[9px] font-bold tracking-widest uppercase text-black/45 dark:text-white/45 block mb-3">
                        Select Payment Method
                      </label>
                      <div className="p-4 rounded-xl border border-black/10 dark:border-white/10 flex items-center justify-between bg-black/[0.01] dark:bg-white/[0.01]">
                        <div className="flex items-center gap-3">
                          <CreditCard className="w-5 h-5 text-[#D4AF37]" />
                          <div>
                            <p className="text-xs font-bold text-black dark:text-white uppercase tracking-wider">
                              Atelier Credit Card
                            </p>
                            <p className="text-[10px] text-black/40 dark:text-white/40">Secured via Visa/MasterCard</p>
                          </div>
                        </div>
                        <span className="w-3.5 h-3.5 rounded-full border-4 border-[#D4AF37]" />
                      </div>
                    </div>

                    {/* Submit Order button */}
                    <button
                      type="submit"
                      disabled={isProcessingCheckout}
                      className="w-full bg-black hover:bg-black/95 dark:bg-white dark:text-black dark:hover:bg-white/95 text-xs font-bold tracking-widest uppercase py-4 rounded-md transition-all active:scale-95 duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      {isProcessingCheckout ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-[#D4AF37]" /> Authorizing payment...
                        </>
                      ) : (
                        <>
                          Authorize & Pay ${cartTotal} <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : cartItems.length === 0 ? (
                  // Empty state screen
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-24 text-center h-full text-black/50 dark:text-white/50"
                  >
                    <div className="w-12 h-12 bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 rounded-full flex items-center justify-center mb-4 text-[#D4AF37]">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-semibold mb-1 text-black dark:text-white">Your bag is empty</p>
                    <p className="text-xs leading-relaxed max-w-[200px] mb-6">
                      Explore our collections or request custom designs to add premium items.
                    </p>
                    <button
                      onClick={onClose}
                      className="bg-black dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-lg text-[10px] tracking-widest font-bold uppercase transition-colors hover:scale-102 cursor-pointer"
                    >
                      Start Shopping
                    </button>
                  </motion.div>
                ) : (
                  // Items list screen
                  <motion.div
                    key="list"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    {cartItems.map((item, idx) => (
                      <motion.div
                        key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex gap-4 bg-black/[0.01] dark:bg-white/[0.01] border border-black/5 dark:border-white/5 p-4 rounded-xl relative group"
                      >
                        {/* Item Image */}
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-20 object-cover rounded-md border border-black/5 shadow-sm"
                          referrerPolicy="no-referrer"
                        />

                        {/* Item detail */}
                        <div className="flex-1 text-left">
                          <h4 className="font-bold text-xs sm:text-sm text-black dark:text-white leading-snug line-clamp-1 mb-1">
                            {item.product.name}
                          </h4>
                          
                          {/* Selected configuration labels */}
                          <div className="flex items-center gap-3 text-[10px] text-black/50 dark:text-white/50 mb-3">
                            <span className="font-semibold bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded">
                              Size: {item.selectedSize}
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="w-2.5 h-2.5 rounded-full inline-block border border-black/10" style={{ backgroundColor: item.selectedColor.hex }} />
                              {item.selectedColor.name}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            {/* Quantity Editor Controls */}
                            <div className="flex items-center gap-2 border border-black/10 dark:border-white/10 rounded px-1.5 py-0.5 bg-white dark:bg-[#1a1a1a] shadow-sm">
                              <button
                                onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                                className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/5 text-black/60 dark:text-white/60 cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-bold px-1.5 min-w-4 text-center text-black dark:text-white">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                                className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/5 text-black/60 dark:text-white/60 cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <span className="text-xs sm:text-sm font-bold text-black dark:text-white">
                              ${item.product.price * item.quantity}
                            </span>
                          </div>
                        </div>

                        {/* Trash Delete icon */}
                        <button
                          onClick={() => onRemoveItem(idx)}
                          className="absolute top-3 right-3 text-black/30 dark:text-white/30 hover:text-red-500 p-1.5 rounded-full hover:bg-red-500/5 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash className="w-3.5 h-3.5" />
                        </button>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Calculations and CTA Footer block (only if items exist and not completed) */}
            {cartItems.length > 0 && !completedOrderNumber && (
              <div className="p-6 border-t border-black/5 dark:border-white/5 bg-[#FBFBFB] dark:bg-[#151515] text-left">
                <div className="space-y-2.5 mb-6 text-xs sm:text-sm">
                  <div className="flex justify-between text-black/60 dark:text-white/60">
                    <span>Atelier Items Subtotal:</span>
                    <span className="font-semibold text-black dark:text-white">${cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-black/60 dark:text-white/60">
                    <span>Shipping Courier:</span>
                    <span className="text-[#D4AF37] font-semibold">Complimentary Priority</span>
                  </div>
                  <div className="flex justify-between text-black/60 dark:text-white/60">
                    <span>Estimated Customs & Duties:</span>
                    <span className="text-green-500 font-semibold">$0.00 (Complimentary)</span>
                  </div>
                  <div className="border-t border-black/5 dark:border-white/5 pt-3 flex justify-between font-bold text-black dark:text-white text-sm sm:text-base">
                    <span>Total Valuation:</span>
                    <span className="text-[#D4AF37]">${cartTotal}</span>
                  </div>
                </div>

                {!isCheckoutFlow && (
                  <button
                    onClick={handleStartCheckout}
                    className="w-full bg-black hover:bg-black/95 dark:bg-white dark:text-black dark:hover:bg-white/95 text-xs font-bold tracking-widest uppercase py-4 rounded-md transition-all active:scale-95 duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                  >
                    Proceed to Delivery <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
