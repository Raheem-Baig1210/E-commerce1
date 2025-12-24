"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const products = [
  { id: 1, name: "Nebula Core X", price: "$2,400", category: "Processors", image: "https://images.unsplash.com/photo-1591405351990-4726e331f141?auto=format&fit=crop&q=80&w=1000" },
  { id: 2, name: "Aether Lens", price: "$890", category: "Optics", image: "https://media.istockphoto.com/id/1338477122/photo/black-friday-concept.webp?a=1&b=1&s=612x612&w=0&k=20&c=KaLCgyPxVB3TEHpqeKumXhefU3qgaxvLHvConHpgQ98=" },
  { id: 3, name: "Void Drive", price: "$1,200", category: "Storage", image: "https://images.unsplash.com/photo-1701056035604-6a7dd0efa0d7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 4, name: "Pulse Monitor", price: "$450", category: "Biometrics", image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=1000" },
];

const ExplorePage = () => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const sections = gsap.utils.toArray(".explore-section");
    
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: scrollRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => "+=" + scrollRef.current.offsetWidth,
      },
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <div className="bg-[#050505] text-white overflow-x-hidden">
      {/* Fixed Navigation Overlay */}
      {/* <nav className="fixed top-0 w-full z-50 p-8 flex justify-between items-center mix-blend-difference">
        <Link to="/" className="text-2xl font-black italic tracking-tighter">NEBULA.</Link>
        <div className="text-[10px] uppercase tracking-[0.4em] opacity-50">Scroll to Explore</div>
      </nav> */}

      <div ref={scrollRef} className="flex h-screen w-[400vw]">
        {products.map((product, index) => (
          <section 
            key={product.id} 
            className="explore-section w-screen h-screen flex items-center justify-center p-10 md:p-20 relative"
          >
            {/* Background Number */}
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black text-white/[0.02] select-none">
              0{index + 1}
            </span>

            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
              {/* Product Image Container */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="relative group"
              >
                <div className="absolute -inset-4 bg-indigo-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full aspect-square object-cover rounded-2xl border border-white/10 grayscale hover:grayscale-0 transition-all duration-700"
                />
              </motion.div>

              {/* Product Info */}
              <div className="flex flex-col items-start">
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-indigo-500 text-xs font-bold tracking-[0.5em] uppercase mb-4"
                >
                  {product.category}
                </motion.span>
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-6xl md:text-8xl font-black italic uppercase leading-none mb-6"
                >
                  {product.name}
                </motion.h2>
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-3xl font-light text-white/40 mb-10"
                >
                  {product.price}
                </motion.div>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-full hover:bg-indigo-600 hover:text-white transition-all duration-300"
                >
                  Aquire Unit
                </motion.button>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;