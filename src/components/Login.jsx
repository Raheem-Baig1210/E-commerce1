"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Assuming you use react-router

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Authenticating with Nebula...", { email, password });
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 overflow-hidden relative">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
      >
        
        {/* LEFT SIDE: Visual/Brand Side */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-indigo-600/20 to-transparent relative overflow-hidden">
          <div className="relative z-10">
            <div className="text-2xl font-black italic tracking-tighter mb-2">NEBULA.</div>
            <p className="text-white/40 text-sm tracking-widest uppercase">Commerce Frontier</p>
          </div>

          <div className="relative z-10">
            <h2 className="text-5xl font-black italic uppercase leading-none tracking-tighter mb-6">
              Access <br /> <span className="text-white/20 text-7xl">The Void.</span>
            </h2>
            <p className="text-white/50 text-sm max-w-xs leading-relaxed">
              Log in to manage your hardware assets and track your interstellar deliveries.
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-white/5 rounded-full animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 border border-white/10 rounded-full" />
        </div>

        {/* RIGHT SIDE: Form Side */}
        <div className="p-8 md:p-16 flex flex-col justify-center bg-[#080808]/50">
          <div className="mb-10 lg:hidden">
             <div className="text-2xl font-black italic tracking-tighter">NEBULA.</div>
          </div>

          <h3 className="text-2xl font-bold mb-2">Initialize Session</h3>
          <p className="text-white/40 text-sm mb-8 font-light">Enter your credentials to continue.</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold ml-1">Identity (Email)</label>
              <input 
                type="email" 
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-white/10"
                placeholder="commander@nebula.tech"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold">Access Key</label>
                <span className="text-[10px] uppercase tracking-widest text-indigo-400 cursor-pointer hover:text-white transition-colors">Forgot?</span>
              </div>
              <input 
                type="password" 
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-white/10"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-white text-black text-xs font-black uppercase tracking-[0.3em] rounded-xl hover:bg-indigo-500 hover:text-white transition-all duration-500 shadow-xl shadow-white/5"
            >
              Auth Session
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-white/30 text-xs tracking-widest uppercase">
              No account? <span className="text-indigo-400 cursor-pointer hover:text-white transition-colors">Establish Identity</span>
            </p>
          </div>
        </div>

      </motion.div>
    </div>
  );
};

export default LoginPage;