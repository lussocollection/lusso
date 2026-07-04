/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  category: 'custom' | 'promotional' | 'catholic' | 'faith';
  description: string;
  price: number;
  image: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  details: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: { name: string; hex: string };
}

export interface CustomProposal {
  id: string;
  fullName: string;
  email: string;
  category: string;
  details: string;
  createdAt: string;
  status: 'Received' | 'Reviewing' | 'Quoted';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  details: string;
  image: string;
}
