import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#050505] text-white pt-32 pb-10 overflow-hidden border-t border-white/5">
      {/* Background Large Text Effect */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 select-none pointer-events-none">
        <h2 className="text-[25vw] font-black italic uppercase text-white/[0.02] leading-none whitespace-nowrap">
          Nebula
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="text-2xl font-black italic tracking-tighter mb-6">NEBULA.</div>
            <p className="text-white/40 text-sm leading-relaxed max-w-[200px]">
              Defining the frontier of digital commerce through visionary design.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-indigo-500 font-bold mb-6">Shop</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li className="hover:text-white transition-colors cursor-pointer">New Arrivals</li>
              <li className="hover:text-white transition-colors cursor-pointer">Hardware</li>
              <li className="hover:text-white transition-colors cursor-pointer">Wearables</li>
              <li className="hover:text-white transition-colors cursor-pointer">Archive</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-indigo-500 font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li className="hover:text-white transition-colors cursor-pointer">Tracking</li>
              <li className="hover:text-white transition-colors cursor-pointer">Contact</li>
              <li className="hover:text-white transition-colors cursor-pointer">Returns</li>
              <li className="hover:text-white transition-colors cursor-pointer">Privacy</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-indigo-500 font-bold mb-6">Access</h4>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-white/5 border border-white/10 rounded-sm py-3 px-4 text-sm focus:outline-none focus:border-indigo-500/50 transition-colors"
              />
              <button className="mt-4 w-full bg-white text-black text-xs font-bold py-3 uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] text-white/30">
            <span className="hover:text-white cursor-pointer transition-colors">Instagram</span>
            <span className="hover:text-white cursor-pointer transition-colors">Twitter</span>
            <span className="hover:text-white cursor-pointer transition-colors">Discord</span>
          </div>
          
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/20">
            © {currentYear} Nebula Tech — All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;