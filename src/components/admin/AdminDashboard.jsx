import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import gsap from 'gsap';

// --- 3D Background Element ---
function AnimatedBackground() {
  const mesh = useRef();
  useFrame((state) => {
    mesh.current.rotation.x = state.clock.getElapsedTime() * 0.1;
    mesh.current.rotation.y = state.clock.getElapsedTime() * 0.15;
  });
  return (
    <Sphere ref={mesh} args={[1, 100, 100]} scale={2.5}>
      <MeshDistortMaterial color="#4338ca" distort={0.5} speed={2} roughness={0.1} metalness={0.8} opacity={0.15} transparent />
    </Sphere>
  );
}

const revenueData = [
  { name: 'Jan', val: 4000 }, { name: 'Feb', val: 3000 }, { name: 'Mar', val: 5000 },
  { name: 'Apr', val: 4500 }, { name: 'May', val: 6000 }, { name: 'Jun', val: 5500 },
];

const AdminDashboard = () => {
  const mainRef = useRef();
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal", { y: 20, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" });
    }, mainRef);
    return () => ctx.revert();
  }, [activeTab]);

  const navItems = [
    { id: "overview", label: "Intelligence" },
    { id: "inventory", label: "Cargo Bay" },
    { id: "orders", label: "Logistics" },
    { id: "customers", label: "Entities" }
  ];

  const SidebarContent = () => (
    <>
      <div className="mb-12">
        <div className="text-2xl font-black italic tracking-tighter text-indigo-500">NEBULA.</div>
        <p className="text-[10px] text-white/20 uppercase tracking-[0.3em]">Command Terminal</p>
      </div>
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
            className={`w-full text-left px-4 py-3 rounded-xl text-[10px] uppercase tracking-widest transition-all ${
              activeTab === item.id ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" : "text-white/40 hover:bg-white/5"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <div className="pt-8 border-t border-white/5">
        <button onClick={() => { localStorage.clear(); window.location.href = "/login"; }} className="text-[10px] uppercase tracking-widest text-red-500/50 hover:text-red-400">
          Terminate Session
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col lg:flex-row overflow-hidden font-sans">
      
      {/* --- MOBILE HEADER --- */}
      <div className="lg:hidden flex items-center justify-between p-6 border-b border-white/5 bg-black/50 backdrop-blur-xl z-[60]">
        <div className="text-xl font-black italic tracking-tighter text-indigo-500">NEBULA.</div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 space-y-1.5">
          <div className={`w-6 h-0.5 bg-white transition-all ${isSidebarOpen ? "rotate-45 translate-y-2" : ""}`} />
          <div className={`w-6 h-0.5 bg-white transition-all ${isSidebarOpen ? "opacity-0" : ""}`} />
          <div className={`w-6 h-0.5 bg-white transition-all ${isSidebarOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="hidden lg:flex w-72 border-r border-white/5 bg-black/40 backdrop-blur-3xl p-8 flex-col z-50">
        <SidebarContent />
      </aside>

      {/* --- MOBILE SIDEBAR DRAWER --- */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside 
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 w-full h-full bg-black z-[55] p-10 flex flex-col lg:hidden"
          >
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* --- MAIN CONTENT --- */}
      <main ref={mainRef} className="flex-1 relative overflow-y-auto custom-scrollbar bg-black">
        
        {/* ThreeJS Background - Hidden on small mobile for performance */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-20 lg:opacity-40">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Float speed={3}><AnimatedBackground /></Float>
          </Canvas>
        </div>

        <div className="relative z-10 p-6 lg:p-12 pb-24">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 reveal">
            <div>
              <h1 className="text-3xl lg:text-5xl font-black uppercase italic tracking-tighter">
                {activeTab}
              </h1>
              <div className="flex items-center gap-4 mt-2">
                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-ping"></span>
                <p className="text-white/30 text-[9px] uppercase tracking-[0.4em]">Subspace Connected</p>
              </div>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md w-full md:w-auto">
              <p className="text-[9px] text-white/40 uppercase mb-1">Total Revenue</p>
              <p className="text-xl lg:text-2xl font-mono font-bold text-indigo-400">$2,409,102</p>
            </div>
          </header>

          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div key="ov" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                  {[
                    { label: "Conversion", value: "4.8%", color: "text-indigo-400" },
                    { label: "Active Carts", value: "842", color: "text-blue-400" },
                    { label: "Uptime", value: "99.9%", color: "text-emerald-400" }
                  ].map((stat, i) => (
                    <div key={i} className="reveal p-6 lg:p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md transition-all hover:border-indigo-500/30">
                      <p className="text-[9px] uppercase tracking-[0.3em] text-white/30 mb-2">{stat.label}</p>
                      <h3 className={`text-3xl lg:text-4xl font-black italic ${stat.color}`}>{stat.value}</h3>
                    </div>
                  ))}
                </div>

                {/* Main Graph */}
                <div className="reveal p-4 lg:p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md h-[300px] lg:h-[400px]">
                  <h3 className="text-[9px] uppercase tracking-[0.3em] text-white/30 mb-8">Revenue Stream</h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" hide />
                      <YAxis hide />
                      <Tooltip contentStyle={{ background: '#000', border: 'none', borderRadius: '8px', fontSize: '10px' }} />
                      <Area type="monotone" dataKey="val" stroke="#6366f1" strokeWidth={3} fill="url(#colorVal)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            )}

            {activeTab === "inventory" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="reveal overflow-x-auto rounded-3xl border border-white/5 bg-white/[0.02]">
                <table className="w-full text-left min-w-[600px]">
                  <thead className="bg-white/5">
                    <tr>{["Product", "Status", "Price"].map(h => <th key={h} className="p-6 text-[10px] uppercase text-white/40">{h}</th>)}</tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[{ n: "Nebula Core", s: "In Transit", p: "$4,200" }, { n: "Void Visor", s: "Stocked", p: "$899" }].map((r, i) => (
                      <tr key={i} className="hover:bg-white/[0.02]">
                        <td className="p-6 text-sm font-bold">{r.n}</td>
                        <td className="p-6"><span className="px-2 py-1 bg-indigo-500/10 text-indigo-400 text-[9px] uppercase rounded-full">{r.s}</span></td>
                        <td className="p-6 font-mono text-sm">{r.p}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating Action Button - Position adjusted for mobile */}
        <motion.button 
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-6 right-6 lg:bottom-12 lg:right-12 px-6 lg:px-8 py-3 lg:py-4 bg-white text-black text-[9px] font-black uppercase tracking-widest rounded-full shadow-2xl z-50"
        >
          NEW ASSET
        </motion.button>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #ffffff10; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default AdminDashboard;