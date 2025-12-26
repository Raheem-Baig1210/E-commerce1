"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Added for redirection

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (result.success) {
        // Storing the token and mock ID in localStorage
        localStorage.setItem("nebula_token", result.data.tokens);
        localStorage.setItem("nebula_id", "admin_01"); // Mock ID as per requirement
        
        console.log("Access Granted:", result.message);
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        alert("Authentication Failed: " + result.message);
      }
    } catch (error) {
      console.error("Auth Error:", error);
      alert("System Offline. Check local server connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 overflow-hidden relative text-white">
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-white/5 rounded-full animate-pulse" />
        </div>

        {/* RIGHT SIDE: Form Side */}
        <div className="p-8 md:p-16 flex flex-col justify-center bg-[#080808]/50">
          <h3 className="text-2xl font-bold mb-2">Initialize Session</h3>
          <p className="text-white/40 text-sm mb-8 font-light">Enter credentials to continue.</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold ml-1">Identity</label>
              <input 
                type="email" 
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm focus:outline-none focus:border-indigo-500/50 transition-all"
                placeholder="commander@nebula.tech"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold">Access Key</label>
              </div>
              <input 
                type="password" 
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm focus:outline-none focus:border-indigo-500/50 transition-all"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className={`w-full py-4 ${loading ? 'bg-white/20' : 'bg-white hover:bg-indigo-500'} text-black text-xs font-black uppercase tracking-[0.3em] rounded-xl transition-all duration-500`}
            >
              {loading ? "Decrypting..." : "Auth Session"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;