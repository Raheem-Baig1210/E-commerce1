"use client";
import React, { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./CartContext";

// 1. DATA GENERATOR (Watches, Electronics, Gaming, Audio)
const allProducts = Array.from({ length: 50 }).map((_, i) => {
  const categories = ["Watches", "Electronics", "Gaming", "Audio"];
  const category = categories[i % categories.length];
  
  const images = {
    Watches: `https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop`,
    Electronics: `https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=800&auto=format&fit=crop`,
    Gaming: `https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop`,
    Audio: `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop`,
  };

  return {
    id: i + 1,
    name: `${category} Unit ${100 + i}`,
    price: `$${(Math.random() * 1500 + 200).toFixed(0)}`,
    category: category,
    image: images[category] + `&sig=${i}`,
  };
});

const ITEMS_PER_PAGE = 12;

const ExplorePage = () => {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  
  // Ref for the scroll-to-target
  const sectionStartRef = useRef(null);

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return activeCategory === "All"
      ? allProducts
      : allProducts.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Scroll function to jump to the grid section
  const scrollToSection = () => {
    if (sectionStartRef.current) {
      const yOffset = -100; // Account for your fixed Navbar height
      const y = sectionStartRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(1);
    scrollToSection();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    scrollToSection();
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6">
      
      {/* TARGET FOR SCROLLING */}
      <div ref={sectionStartRef} className="max-w-7xl mx-auto scroll-mt-32">
        
        {/* HEADER SECTION */}
        <header className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter mb-4">
              The <span className="text-white/10 italic">Archive</span>
            </h1>
            <div className="flex items-center justify-center gap-4">
              <span className="h-[1px] w-12 bg-indigo-500/50"></span>
              <p className="text-indigo-400 uppercase tracking-[0.5em] text-[10px] font-bold">
                Nebula Procurement Division
              </p>
              <span className="h-[1px] w-12 bg-indigo-500/50"></span>
            </div>
          </motion.div>
        </header>

        {/* FILTER BAR */}
        <div className="flex flex-wrap justify-center gap-3 mb-20">
          {["All", "Watches", "Electronics", "Gaming", "Audio"].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-10 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 border ${
                activeCategory === cat 
                ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]" 
                : "border-white/10 text-white/40 hover:border-white/40 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRID SECTION */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 min-h-[900px]"
        >
          <AnimatePresence mode="popLayout">
            {currentItems.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: "circOut" }}
                className="group relative bg-[#080808] border border-white/5 p-5 rounded-[2rem] hover:border-indigo-500/50 hover:bg-[#0c0c0c] transition-all duration-500"
              >
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden rounded-[1.5rem] mb-6 bg-black">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                </div>

                {/* Details */}
                <div className="px-2">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-black text-lg uppercase italic tracking-tight text-white group-hover:text-indigo-400 transition-colors">
                      {product.name}
                    </h4>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-white/30">{product.category}</p>
                    <span className="text-white font-bold text-sm tracking-tighter">{product.price}</span>
                  </div>
                </div>

                {/* Dynamic Action Button */}
                <button 
                  onClick={() => addToCart(product)}
                  className="w-full mt-8 py-4 bg-white text-black text-[9px] font-black uppercase tracking-[0.3em] rounded-xl opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 hover:bg-indigo-600 hover:text-white"
                >
                  Add to Vault
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* PAGINATION CONTROLS */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-32">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`w-14 h-14 rounded-2xl text-xs font-black transition-all duration-500 border ${
                  currentPage === i + 1 
                  ? "bg-indigo-600 border-indigo-600 text-white scale-110 shadow-[0_0_20px_rgba(79,70,229,0.4)]" 
                  : "bg-white/5 border-white/10 text-white/30 hover:border-white/40 hover:text-white"
                }`}
              >
                {String(i + 1).padStart(2, '0')}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;