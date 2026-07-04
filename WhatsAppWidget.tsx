/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, BadgeCheck, PhoneCall, Globe } from 'lucide-react';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    { sender: 'concierge' | 'user'; text: string; time: string }[]
  >([
    {
      sender: 'concierge',
      text: 'Welcome to the Lusso Collection Virtual Atelier. I am Beatrice, your private concierge. How may I assist your custom bespoke orders today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    'How do I book a Rome consultation?',
    'What is the price of gold embroidery?',
    'Can you ship samples globally?',
  ];

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const updatedMessages = [...messages, { sender: 'user' as const, text, time: userTime }];
    setMessages(updatedMessages);
    setInputValue('');

    // Concierge premium replies
    setTimeout(() => {
      let replyText = "Thank you for reaching out. Our atelier team will gladly review your inquiry. Feel free to fill our custom proposal form on the website for quick digital proofs!";
      
      const lowercaseText = text.toLowerCase();
      if (lowercaseText.includes('rome') || lowercaseText.includes('consultation')) {
        replyText = "We would be honored to host you. Our physical atelier is located on Via del Corso, Rome. Physical bookings can be made by sending a formal proposal on this site, or emailing concierge@lussocollection.com directly.";
      } else if (lowercaseText.includes('price') || lowercaseText.includes('gold') || lowercaseText.includes('embroidery')) {
        replyText = "Gold embroidery is our artisan specialty! Our high-thread metallic gold embroideries are tailored to order and typically priced between $85 to $140 per garment, depending on stitches complexity and bulk volume discount.";
      } else if (lowercaseText.includes('sample') || lowercaseText.includes('ship')) {
        replyText = "Yes, we ship physical fabric swatches and fully customized sizing samples worldwide via insured DHL Express delivery. Sizing samples are typically ready in 5 business days!";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'concierge',
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-45 flex flex-col items-end">
      {/* WhatsApp Window Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="w-[320px] sm:w-[350px] h-[480px] bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-2xl border border-black/10 dark:border-white/10 overflow-hidden flex flex-col mb-4 text-left"
          >
            {/* Header with WhatsApp Branding */}
            <div className="bg-[#075e54] text-white p-4 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm text-[#D4AF37] border border-white/25">
                    LC
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 absolute bottom-0 right-0 border-2 border-[#075e54]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold flex items-center gap-1 uppercase tracking-wider">
                    Lusso Concierge <BadgeCheck className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                  </h4>
                  <p className="text-[10px] text-white/70">Online · Beatrice Sterling</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat message space */}
            <div className="flex-1 bg-[#ECE5DD] dark:bg-neutral-900 p-4 overflow-y-auto space-y-3.5 flex flex-col">
              <div className="mx-auto bg-black/5 dark:bg-white/5 rounded px-3 py-1 text-[9px] text-black/55 dark:text-white/55 font-semibold text-center uppercase tracking-widest max-w-fit border border-black/5">
                Encrypted Virtual Chat
              </div>

              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-xs shadow-sm flex flex-col relative ${
                    m.sender === 'user'
                      ? 'bg-[#DCF8C6] text-black self-end rounded-tr-none'
                      : 'bg-white dark:bg-[#2A2A2A] text-black dark:text-white self-start rounded-tl-none'
                  }`}
                >
                  <p className="leading-relaxed font-sans">{m.text}</p>
                  <span className="text-[9px] text-black/35 dark:text-white/35 self-end mt-1 font-mono">
                    {m.time}
                  </span>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Quick action questions helper list */}
            <div className="bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur border-t border-black/5 px-3 py-2 flex gap-1.5 overflow-x-auto scrollbar-none">
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSendMessage(q)}
                  className="bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-[10px] rounded-full px-3 py-1 font-semibold text-black dark:text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all whitespace-nowrap cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Chat Input Area */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-3 border-t border-black/5 dark:border-white/5 bg-white dark:bg-[#1a1a1a] flex gap-2 items-center"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type bespoke message..."
                className="flex-1 bg-black/5 dark:bg-white/5 outline-none text-xs rounded-xl px-4 py-2.5 text-black dark:text-white border border-transparent focus:border-[#D4AF37] transition-all"
              />
              <button
                type="submit"
                className="w-9 h-9 rounded-full bg-[#075e54] hover:bg-[#065047] flex items-center justify-center text-white shrink-0 active:scale-95 transition-transform cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating green click circular button (WhatsApp branding widget) */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-[#20ba5a] transition-all relative z-40 cursor-pointer"
        title="Lusso WhatsApp Concierge"
      >
        <MessageSquare className="w-6 h-6 text-white" />
        {!isOpen && (
          <span className="absolute -top-1 -right-1 bg-black border border-[#25D366] text-white font-bold text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded-full">
            LIVE
          </span>
        )}
      </motion.button>
    </div>
  );
}
