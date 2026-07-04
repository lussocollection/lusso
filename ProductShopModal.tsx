/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, ShoppingBag, Check, Compass, Eye, Filter } from 'lucide-react';
import { products, collections } from '../data';
import { Product } from '../types';

interface ProductShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
  onAddToCart: (product: Product, size: string, color: { name: string; hex: string }) => void;
}

export default function ProductShopModal({
  isOpen,
  onClose,
  initialCategory = 'all',
  onAddToCart,
}: ProductShopModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Active configurations for the detailed product selector
  const [activeSize, setActiveSize] = useState<string>('');
  const [activeColor, setActiveColor] = useState<{ name: string; hex: string } | null>(null);
  const [isAdded, setIsAdded] = useState(false);

  // Update selectedCategory when the modal opens with an initial category
  React.useEffect(() => {
    setSelectedCategory(initialCategory || 'all');
    setSelectedProduct(null);
  }, [initialCategory, isOpen]);

  // Handle detailed product view selection
  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setActiveSize(product.sizes[0] || 'M');
    setActiveColor(product.colors[0] || null);
    setIsAdded(false);
  };

  // Filtered product items
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleAddToCart = () => {
    if (!selectedProduct || !activeColor || !activeSize) return;

    onAddToCart(selectedProduct, activeSize, activeColor);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-end bg-black/75 backdrop-blur-md"
        >
          {/* Main Slide-In Card */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-full max-w-5xl h-full bg-white dark:bg-[#111111] shadow-2xl flex flex-col relative"
          >
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#D4AF37]" />
                <h2 className="text-base font-bold tracking-widest uppercase text-black dark:text-white">
                  Lusso Atelier Catalog
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-black dark:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Split view if product detail is open */}
            <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
              {/* Product Catalog Grid list (left pane) */}
              <div className={`flex-1 overflow-y-auto p-6 space-y-6 ${selectedProduct ? 'hidden md:block' : 'w-full'}`}>
                {/* Search & Filter bar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-black/[0.02] dark:bg-white/[0.02] p-4 rounded-xl border border-black/5 dark:border-white/5">
                  {/* Category Filter Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase transition-colors shrink-0 cursor-pointer ${
                        selectedCategory === 'all'
                          ? 'bg-black text-white dark:bg-white dark:text-black'
                          : 'bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/10'
                      }`}
                    >
                      All Items
                    </button>
                    {collections.map((col) => (
                      <button
                        key={col.id}
                        onClick={() => setSelectedCategory(col.id)}
                        className={`px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase transition-colors shrink-0 cursor-pointer ${
                          selectedCategory === col.id
                            ? 'bg-black text-white dark:bg-white dark:text-black'
                            : 'bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/10'
                        }`}
                      >
                        {col.title.split(' ')[0]}
                      </button>
                    ))}
                  </div>

                  {/* Search Input Box */}
                  <div className="relative flex-1 max-w-xs">
                    <Search className="w-4 h-4 text-black/35 dark:text-white/35 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search items..."
                      className="w-full bg-black/5 dark:bg-white/5 outline-none text-xs rounded-lg pl-9 pr-4 py-2 text-black dark:text-white border border-transparent focus:border-[#D4AF37] transition-all"
                    />
                  </div>
                </div>

                {/* Catalog Grid */}
                {filteredProducts.length === 0 ? (
                  <div className="py-20 text-center text-black/40 dark:text-white/40">
                    <p className="text-sm font-semibold mb-2">No custom designs found</p>
                    <p className="text-xs">Try adjusting your category filter or search query.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => handleViewProduct(prod)}
                        className={`group bg-white dark:bg-[#1a1a1a] rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer ${
                          selectedProduct?.id === prod.id
                            ? 'border-[#D4AF37] shadow-lg shadow-[#D4AF37]/5'
                            : 'border-black/5 dark:border-white/5 shadow-sm hover:shadow-xl hover:border-black/15 dark:hover:border-white/15'
                        }`}
                      >
                        {/* Aspect Image Ratio container */}
                        <div className="relative aspect-[3/4] overflow-hidden bg-black/5">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-[#111111]/90 backdrop-blur-md flex items-center justify-center text-black dark:text-white border border-black/5 shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                            <Eye className="w-4 h-4" />
                          </div>
                        </div>

                        {/* Title Info */}
                        <div className="p-4 text-left">
                          <span className="text-[9px] font-bold tracking-widest text-[#D4AF37] uppercase mb-1 block">
                            {prod.category} collection
                          </span>
                          <h3 className="font-bold text-xs sm:text-sm text-black dark:text-white group-hover:text-[#D4AF37] transition-colors leading-snug line-clamp-1 mb-1">
                            {prod.name}
                          </h3>
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-xs sm:text-sm font-bold text-black dark:text-white">
                              ${prod.price}
                            </span>
                            <span className="text-[10px] uppercase font-bold tracking-widest text-black/45 dark:text-white/45 group-hover:text-black dark:group-hover:text-white transition-colors">
                              Customize Details →
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Detailed product configure panel (right pane) */}
              <AnimatePresence>
                {selectedProduct && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    className="w-full md:w-[420px] bg-[#f9f9f9] dark:bg-[#171717] border-l border-black/5 dark:border-white/5 overflow-y-auto p-6 md:p-8 flex flex-col justify-between"
                  >
                    {/* Back / Close Details button for mobile view */}
                    <div className="flex justify-between items-center mb-6">
                      <button
                        onClick={() => setSelectedProduct(null)}
                        className="text-xs font-bold uppercase tracking-widest text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white flex items-center gap-1 cursor-pointer"
                      >
                        ← Back to List
                      </button>
                      <span className="text-[10px] font-bold tracking-widest text-[#D4AF37] uppercase bg-black/5 dark:bg-white/5 px-2.5 py-1 rounded-md">
                        {selectedProduct.category}
                      </span>
                    </div>

                    <div className="space-y-6 text-left">
                      {/* Product Image Frame */}
                      <div className="aspect-[16/10] rounded-xl overflow-hidden shadow-md border border-black/5">
                        <img
                          src={selectedProduct.image}
                          alt={selectedProduct.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Product Name / Price */}
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-black dark:text-white font-sans leading-tight">
                          {selectedProduct.name}
                        </h3>
                        <p className="text-base font-bold text-[#D4AF37] mt-1">${selectedProduct.price}</p>
                        <p className="text-xs text-black/60 dark:text-white/60 mt-3 leading-relaxed font-sans">
                          {selectedProduct.description}
                        </p>
                      </div>

                      {/* Size Selector */}
                      <div>
                        <label className="text-[10px] font-bold tracking-widest uppercase text-black/45 dark:text-white/45 block mb-2.5">
                          Select Size: <strong className="text-black dark:text-white font-bold">{activeSize}</strong>
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {selectedProduct.sizes.map((size) => (
                            <button
                              key={size}
                              onClick={() => setActiveSize(size)}
                              className={`w-9 h-9 rounded-md border text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                                activeSize === size
                                  ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
                                  : 'border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white'
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Color Swatch Selector */}
                      <div>
                        <label className="text-[10px] font-bold tracking-widest uppercase text-black/45 dark:text-white/45 block mb-2.5">
                          Select Color:{' '}
                          <strong className="text-black dark:text-white font-bold">{activeColor?.name}</strong>
                        </label>
                        <div className="flex gap-3">
                          {selectedProduct.colors.map((color) => (
                            <button
                              key={color.name}
                              onClick={() => setActiveColor(color)}
                              className={`w-8 h-8 rounded-full border-2 relative transition-all flex items-center justify-center cursor-pointer ${
                                activeColor?.name === color.name
                                  ? 'border-[#D4AF37] scale-110'
                                  : 'border-transparent hover:scale-105'
                              }`}
                              title={color.name}
                            >
                              <span className="w-6 h-6 rounded-full block border border-black/10" style={{ backgroundColor: color.hex }} />
                              {activeColor?.name === color.name && (
                                <Check className="w-3.5 h-3.5 text-white mix-blend-difference absolute" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Material Spec Details */}
                      <div className="border-t border-black/5 dark:border-white/5 pt-5">
                        <label className="text-[10px] font-bold tracking-widest uppercase text-black/45 dark:text-white/45 block mb-2.5">
                          Atelier Tailoring Specs:
                        </label>
                        <ul className="space-y-1.5 pl-4 list-disc text-black/60 dark:text-white/60 text-[11px] leading-relaxed">
                          {selectedProduct.details.map((bullet, i) => (
                            <li key={i}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Add to Cart Actions */}
                    <div className="mt-8 pt-5 border-t border-black/5 dark:border-white/5">
                      <button
                        onClick={handleAddToCart}
                        disabled={isAdded}
                        className={`w-full py-4 rounded-md text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                          isAdded
                            ? 'bg-green-600 hover:bg-green-700 text-white'
                            : 'bg-black text-white hover:bg-black/95 dark:bg-white dark:text-black dark:hover:bg-white/95 active:scale-95'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" /> Added to Cart Successfully!
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-4 h-4 text-[#D4AF37]" /> Add to Atelier Bag
                          </>
                        )}
                      </button>
                      <p className="text-[10px] text-center text-black/40 dark:text-white/40 mt-3 leading-relaxed">
                        Handcrafted custom apparel made with premium Italian fabrics. Fully sustainable.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
