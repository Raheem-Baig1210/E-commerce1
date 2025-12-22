import React, { useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, PerspectiveCamera, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- 1. Water Ripple Shader Component ---
const RippleShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uRadius: { value: 0.12 },
    uStrength: { value: 0.3 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uRadius;
    uniform float uStrength;
    void main() {
      vec2 uv = vUv;
      float dist = distance(uv, uMouse);
      float ripple = sin(dist * 25.0 - uTime * 4.0) * uStrength;
      float mask = smoothstep(uRadius, 0.0, dist);
      vec2 distortedUv = uv + (ripple * mask);
      gl_FragColor = vec4(vec3(1.0), 1.0);
    }
  `
};

const InteractiveHeroText = () => {
  const { viewport } = useThree();
  const shaderMaterial = useMemo(() => new THREE.ShaderMaterial(RippleShaderMaterial), []);

  useFrame((state) => {
    shaderMaterial.uniforms.uMouse.value.x = (state.mouse.x + 1) / 2;
    shaderMaterial.uniforms.uMouse.value.y = (state.mouse.y + 1) / 2;
    shaderMaterial.uniforms.uTime.value = state.clock.getElapsedTime();
  });

  return (
    <Float speed={2} rotationIntensity={0.5}>
      <Text fontSize={viewport.width * 0.18} font="/fonts/Inter-Black.woff" textAlign="center">
        CREATE
        <primitive object={shaderMaterial} attach="material" />
      </Text>
    </Float>
  );
};

// --- 2. Main Page Component ---
const MainExperience = () => {
  const containerRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal Scroll Logic for Page 2
      const sections = gsap.utils.toArray(".panel");
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: ".horizontal-wrapper",
          pin: true,
          scrub: 1,
          end: "+=3000",
        }
      });

      // Product Stagger Reveal
      gsap.from(".product-card", {
        scrollTrigger: {
          trigger: ".product-section",
          start: "top 70%",
        },
        y: 80,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "expo.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const products = [
    { id: 1, name: "Element 01", price: "$190", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800" },
    { id: 2, name: "Vortex Unit", price: "$340", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800" },
    { id: 3, name: "Aether Shell", price: "$520", img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=800" },
  ];

  return (
    <div ref={containerRef} className="bg-[#050505] text-white overflow-x-hidden">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-[100] flex justify-between items-center px-12 py-8 mix-blend-difference">
        <div className="text-2xl font-black italic tracking-tighter">NEBULA.</div>
        <div className="flex gap-10 items-center">
          <button className="text-[10px] tracking-[0.3em] uppercase opacity-50 hover:opacity-100 transition-opacity">Archive</button>
          <button className="px-8 py-2 border border-white/20 rounded-full bg-white/5 backdrop-blur-xl hover:bg-white hover:text-black transition-all text-xs uppercase font-bold">
            Login
          </button>
        </div>
      </nav>

      {/* PAGE 1: INTERACTIVE HERO */}
      <section className="relative h-screen w-full flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <InteractiveHeroText />
          </Canvas>
        </div>
        <div className="absolute bottom-10 left-12 text-[10px] uppercase tracking-[0.5em] opacity-30">
          [ Interaction Active ]
        </div>
      </section>

      {/* PAGE 2: HORIZONTAL SHOWCASE (Replacing Purple with Images) */}
      <div className="horizontal-wrapper relative h-screen overflow-hidden">
        <div className="flex h-full w-[300vw]">
          {/* Panel 1: Large Statement */}
          <section className="panel w-screen h-full flex items-center justify-center px-20">
            <h2 className="text-[12vw] font-black uppercase italic outline-text">Visionary</h2>
          </section>

          {/* Panel 2: The "Suited" Image (Industrial/Futuristic) */}
          <section className="panel w-screen h-full relative overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600" 
              className="w-full h-full object-cover scale-110 brightness-50"
              alt="Futuristic Architecture"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center max-w-2xl px-6">
                <span className="text-indigo-400 text-xs tracking-[1em] uppercase mb-4 block">Core Philosophy</span>
                <p className="text-4xl md:text-6xl font-light leading-tight italic">
                  Minimalism is not a lack of something. It is the perfect amount of everything.
                </p>
              </div>
            </div>
          </section>

          {/* Panel 3: Abstract Tech Image */}
          <section className="panel w-screen h-full">
            <img 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600" 
              className="w-full h-full object-cover opacity-60"
              alt="Digital Network"
            />
          </section>
        </div>
      </div>

      {/* PAGE 3: PRODUCT GRID */}
      <section className="product-section relative min-h-screen py-32 px-12 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-20">
            <h2 className="text-6xl font-black italic uppercase">The Drop.01</h2>
            <p className="text-xs opacity-40 uppercase tracking-widest">[ 2025 Edition ]</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {products.map((p) => (
              <div key={p.id} className="product-card group cursor-pointer">
                <div className="aspect-[4/5] overflow-hidden bg-zinc-900 mb-8 rounded-sm">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold uppercase tracking-tighter">{p.name}</h3>
                    <p className="text-[10px] text-indigo-400 uppercase tracking-widest mt-1">Limited Supply</p>
                  </div>
                  <span className="text-xl font-light opacity-60">{p.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAGE 4: FINAL CTA */}
      <section className="h-screen flex flex-col items-center justify-center relative">
        <div className="text-center z-10">
          <h2 className="text-[10vw] font-black uppercase italic leading-none mb-10">Join the <br/> Future.</h2>
          <button className="group relative px-16 py-6 overflow-hidden border border-white/20 rounded-full transition-all hover:border-indigo-500">
            <span className="relative z-10 text-sm font-bold tracking-[0.5em] uppercase">Enter Nebula</span>
            <div className="absolute inset-0 bg-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </button>
        </div>
        
        <footer className="absolute bottom-10 w-full flex justify-between px-12 text-[10px] uppercase tracking-widest opacity-20 border-t border-white/5 pt-10">
          <span>Nebula Tech</span>
          <span>Terms / Privacy</span>
          <span>Built for the void</span>
        </footer>
      </section>

      <style jsx>{`
        .outline-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.3);
          color: transparent;
        }
      `}</style>
    </div>
  );
};

export default MainExperience;