"use client";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "./explore/CartContext.jsx";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const location = useLocation();

  // Helper to highlight active links
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-full px-8 py-3 shadow-2xl">
        
        {/* LEFT: Branding */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-black italic tracking-tighter text-white hover:text-indigo-400 transition-colors">
            NEBULA.
          </span>
        </Link>

        {/* MIDDLE: Navigation Links */}
        <div className="hidden md:flex items-center gap-10">
          <Link 
            to="/" 
            className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-all ${isActive('/') ? 'text-indigo-400' : 'text-white/50 hover:text-white'}`}
          >
            Home
          </Link>
          <Link 
            to="/explore" 
            className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-all ${isActive('/explore') ? 'text-indigo-400' : 'text-white/50 hover:text-white'}`}
          >
            Explore
          </Link>
        </div>

        {/* RIGHT: Actions (Login + Cart) */}
        <div className="flex items-center gap-6">
          <Link 
            to="/login" 
            className="hidden sm:block text-[10px] uppercase tracking-[0.3em] font-bold text-white/50 hover:text-white transition-all border-r border-white/10 pr-6"
          >
            Login
          </Link>

          {/* Cart Trigger */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center group"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" height="20" 
              viewBox="0 0 24 24" fill="none" 
              stroke="currentColor" strokeWidth="2" 
              strokeLinecap="round" strokeLinejoin="round" 
              className="text-white group-hover:text-indigo-400 transition-colors"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
              <path d="M3 6h18"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>

            {/* Notification Bubble */}
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(79,70,229,0.5)]"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;