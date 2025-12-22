import React, { useState } from "react";
import { motion } from "framer-motion";

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Message received. Welcome to the void.");
  };

  return (
    <section className="bg-[#050505] text-white py-32 px-6 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">
        
        {/* LEFT SIDE: Heading & Info */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-between"
        >
          <div>
            <span className="text-indigo-400 text-xs tracking-[0.5em] uppercase font-bold mb-6 block">
              Inquiries
            </span>
            <h2 className="text-6xl md:text-8xl font-black italic uppercase leading-none tracking-tighter mb-10">
              Let's Build <br /> <span className="text-white/20">The Void.</span>
            </h2>
            <p className="text-white/50 max-w-md text-lg leading-relaxed">
              Whether you're looking for custom hardware or a digital partnership, our team is ready to scale your vision.
            </p>
          </div>

          <div className="mt-12 space-y-8">
            <div>
              <h4 className="text-[10px] uppercase tracking-widest text-white/30 mb-2">Direct Mail</h4>
              <p className="text-xl font-light hover:text-indigo-400 transition-colors cursor-pointer">hello@nebula.tech</p>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-widest text-white/30 mb-2">Studio Address</h4>
              <p className="text-xl font-light">221B Baker Void, <br />Digital Frontier, 10101</p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE: Contact Form */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/[0.02] backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="group relative">
              <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block group-focus-within:text-indigo-400 transition-colors">Your Name</label>
              <input 
                type="text"
                required
                className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-indigo-500 transition-all text-xl font-light"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="group relative">
              <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block group-focus-within:text-indigo-400 transition-colors">Email Address</label>
              <input 
                type="email"
                required
                className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-indigo-500 transition-all text-xl font-light"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="group relative">
              <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block group-focus-within:text-indigo-400 transition-colors">Project Details</label>
              <textarea 
                rows="4"
                className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-indigo-500 transition-all text-xl font-light resize-none"
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
            </div>

            <button 
              type="submit"
              className="relative w-full overflow-hidden group py-6 border border-white/20 rounded-full hover:border-indigo-500 transition-all duration-500"
            >
              <span className="relative z-10 text-xs font-black uppercase tracking-[0.5em] group-hover:text-white">
                Transmit Message
              </span>
              <div className="absolute inset-0 bg-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
          </form>
        </motion.div>

      </div>
    </section>
  );
};

export default ContactSection;