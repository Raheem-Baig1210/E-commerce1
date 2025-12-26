import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Center, Float } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

// 1. Interactive 3D Particle Background
function ParticleField() {
  const ref = useRef();
  const [sphere] = useState(() => {
    const arr = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      const stride = i * 3;
      arr[stride] = (Math.random() - 0.5) * 10;
      arr[stride + 1] = (Math.random() - 0.5) * 10;
      arr[stride + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  });

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t / 10;
    ref.current.rotation.x = Math.sin(t / 4) / 5;
    // Mouse interaction
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, state.mouse.x * 0.5, 0.1);
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, state.mouse.y * 0.5, 0.1);
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#6366f1"
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

const Home = () => {
  const containerRef = useRef();
  const titleRef = useRef();
  const navRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Animation for Nav
      if (navRef.current && navRef.current.children.length > 0){
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out"
      });
    }
      // Split text-style animation for the main title
      const chars = titleRef.current.querySelectorAll('.char');
      gsap.from(chars, {
        y: 150,
        rotateX: -90,
        stagger: 0.05,
        duration: 1.5,
        ease: "expo.out",
        delay: 0.5
      });

      // Floating animation for the CTA button
      gsap.to(".cta-btn", {
        y: 15,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "sine.inOut"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen w-full bg-[#050505] overflow-hidden font-sans text-white">
      
      {/* 3D Scene Layer */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <color attach="background" args={['#050505']} />
          <ambientLight intensity={0.5} />
          <ParticleField />
        </Canvas>
      </div>

      {/* Navigation */}
      {/* <nav ref={navRef} className="absolute top-0 w-full z-50 flex justify-between items-center px-12 py-8">
        <div className="text-2xl font-black tracking-tighter italic">NEBULA.</div>
        <div className="flex items-center gap-12 text-sm uppercase tracking-[0.2em] font-light">
          <a href="#" className="hover:text-indigo-400 transition-colors">Catalog</a>
          <a href="#" className="hover:text-indigo-400 transition-colors">Archive</a>
          <button className="px-6 py-2 border border-white/20 rounded-full bg-white/5 backdrop-blur-md hover:bg-white hover:text-black transition-all duration-500">
            Login
          </button>
        </div>
      </nav> */}

      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center select-none pointer-events-none">
        <h1 ref={titleRef} className="flex overflow-hidden text-[15vw] leading-[0.8] font-black uppercase italic">
          {"CREATE".split("").map((char, i) => (
            <span key={i} className="char inline-block">{char}</span>
          ))}
        </h1>
        
        <div className="mt-8 flex flex-col items-center">
          <p className="max-w-md text-center text-indigo-200/60 uppercase tracking-[0.3em] text-[10px] mb-12 leading-relaxed">
            The next generation of digital commerce. <br /> Built for the decentralized web.
          </p>
          
          <button className="cta-btn pointer-events-auto px-10 py-5 bg-indigo-600 rounded-full text-xs uppercase tracking-[0.5em] font-bold hover:bg-white hover:text-indigo-600 transition-colors duration-300">
            Explore Space
          </button>
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="absolute bottom-10 w-full flex justify-between px-12 text-[10px] uppercase tracking-widest opacity-30">
        <span>Est. 2025</span>
        <span>Scroll to immerse</span>
        <span>© All Rights Reserved</span>
      </div>

      <style>{`
        .char {
          display: inline-block;
          transform-origin: bottom;
        }
      `}</style>
    </div>
  );
};

export default Home;