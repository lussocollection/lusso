/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, FAQItem, Collection } from './types';

export const collections: Collection[] = [
  {
    id: 'custom',
    title: 'Custom Apparel',
    description: 'Tailored solutions for teams, schools, and private labels.',
    details: 'Our Bespoke Private Label program offers pattern development, custom dye lots, custom cut-and-sew construction, and high-fashion fits that stand out in the premium market.',
    image: '/src/assets/images/lusso_custom_apparel_1783195738701.jpg'
  },
  {
    id: 'promotional',
    title: 'Promotional Wear',
    description: 'Elevate your brand identity with high-performance textiles.',
    details: 'Corporate garments reimagined. We select fine sustainable blends with high-definition embroidery and custom branding options to elevate your staff apparel or client merchandise.',
    image: '/src/assets/images/lusso_promotional_wear_1783195758023.jpg'
  },
  {
    id: 'catholic',
    title: 'Catholic Apparel',
    description: 'Reverent designs crafted for parishes, ministries, and events.',
    details: 'We blend high-end craftsmanship with sacred geometry and sacred history. Designed for parish teams, ministries, retreat events, and clergy seeking a modern, reverent visual aesthetic.',
    image: '/src/assets/images/lusso_catholic_apparel_1783195767717.jpg'
  },
  {
    id: 'faith',
    title: 'Faith-Inspired',
    description: 'Modern aesthetics meeting deep spiritual messages.',
    details: 'Quiet luxury meets spiritual truth. Clean typography, premium heavy-weight fabrics, and hand-embroidered scripture citations designed for the modern believer to wear with purpose.',
    image: '/src/assets/images/lusso_faith_streetwear_1783195781450.jpg'
  }
];

export const products: Product[] = [
  {
    id: 'prod-1',
    name: 'Bespoke Heavyweight Crewneck',
    category: 'custom',
    description: 'Our signature heavy-knit cotton crewneck, offering a refined structured fit with custom hand-stitch details and drop shoulder design.',
    price: 110,
    image: '/src/assets/images/lusso_custom_apparel_1783195738701.jpg',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Alabaster White', hex: '#F9F6F0' },
      { name: 'Luxury Black', hex: '#111111' },
      { name: 'Sable Gray', hex: '#4A4A4A' }
    ],
    details: [
      '450 GSM Ultra-heavy organic French Terry',
      'Pre-shrunk and double silicon washed for soft handfeel',
      'Hand-crafted flatlock stitch detailing in Rome studio',
      'Responsibly sourced Egyptian long-staple cotton'
    ]
  },
  {
    id: 'prod-2',
    name: 'Atelier Premium Corporate Hoodie',
    category: 'promotional',
    description: 'Elevate your enterprise presence with a clean, low-profile corporate outer-layer. Highly suitable for executive gifts and modern tech uniforms.',
    price: 125,
    image: '/src/assets/images/lusso_promotional_wear_1783195758023.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Luxury Black', hex: '#111111' },
      { name: 'Imperial Blue', hex: '#002F6C' },
      { name: 'Charcoal Blend', hex: '#2C3539' }
    ],
    details: [
      'Double-lined structured hood without drawcords for high-fashion clean finish',
      'Concealed side-seam pockets',
      'Suited for micro-embroidery and precision high-density laser printing',
      '80% Ring-spun combed cotton, 20% Recycled poly filament'
    ]
  },
  {
    id: 'prod-3',
    name: 'Veritas Embroidered Parish Shirt',
    category: 'catholic',
    description: 'A luxurious button-down or folded Oxford shirt with a highly subtle, monochrome embroidered parish cross or customized sacred crest.',
    price: 95,
    image: '/src/assets/images/lusso_catholic_apparel_1783195767717.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Alabaster White', hex: '#F9F6F0' },
      { name: 'Slate Blue', hex: '#4F6B82' },
      { name: 'Clergy Black', hex: '#1E1E1E' }
    ],
    details: [
      '100% fine Italian linen blend with high breathability',
      'Mother of pearl buttons',
      'Reverent embroidered cross on wearers cuff or lower hem',
      'Optimized for formal liturgical parish assemblies and administrative staff'
    ]
  },
  {
    id: 'prod-4',
    name: 'Be Still & Know Signature Hoodie',
    category: 'faith',
    description: 'A stunning limited edition heavy fleece hoodie showcasing the timeless words of Psalm 46:10 in precise, high-definition gold script.',
    price: 140,
    image: '/src/assets/images/lusso_faith_hoodie_1783195726879.jpg',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Luxury Black', hex: '#111111' },
      { name: 'Deep Burgundy', hex: '#4A0404' },
      { name: 'Aureolin Gold', hex: '#D4AF37' }
    ],
    details: [
      '500 GSM Ultra-heavy cotton fleece build',
      'Gold foil or luxury high-thread count embroidery representing Psalm 46:10',
      'Reinforced side panels with double needle stitch',
      'Special Catholic Faith Collection limited edition release'
    ]
  },
  {
    id: 'prod-5',
    name: 'Sacred Heart Minimalist Tee',
    category: 'faith',
    description: 'A classic boxy-fit heavy jersey tee displaying a hand-sketched minimalist Sacred Heart icon on the center chest with premium vintage coloring.',
    price: 65,
    image: '/src/assets/images/lusso_faith_streetwear_1783195781450.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Sable Gray', hex: '#4A4A4A' },
      { name: 'Alabaster White', hex: '#F9F6F0' },
      { name: 'Deep Burgundy', hex: '#4A0404' }
    ],
    details: [
      '280 GSM Luxury combed carded cotton',
      'Water-based eco-friendly screen print with cracked antique texture',
      'Perfect styling piece for high-street faith layers',
      'Ethically manufactured in Portugal'
    ]
  }
];

export const faqs: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What is your minimum order quantity (MOQ)?',
    answer: 'For our custom and private label apparel, our standard MOQ is 50 pieces per design, which can be split across sizes. For standard promotional blank embroidery, the MOQ is 24 pieces. Select limited edition drops have no minimum purchase requirements.'
  },
  {
    id: 'faq-2',
    question: 'How long does production take?',
    answer: 'Digital design proofs and custom quotes are delivered within 2-3 business days. Once the digital mockup and custom sizing/sampling are approved, typical production takes 14-21 business days, followed by priority express courier shipping.'
  },
  {
    id: 'faq-3',
    question: 'Do you offer international shipping?',
    answer: 'Yes, we offer fully insured international express shipping from our ateliers in Rome and New York. All global shipments come with detailed visual tracking codes and signature delivery to guarantee your premium order arrives pristine.'
  },
  {
    id: 'faq-4',
    question: 'Can we receive physical samples before bulk production?',
    answer: 'Absolutely. We believe physical validation is key to luxury satisfaction. We offer physical sample creation for a nominal sample development fee, which is fully credited towards your bulk purchase order upon production confirmation.'
  }
];
