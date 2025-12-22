import { motion } from "framer-motion"; // Changed from "motion/react-client"
import React from 'react';

/**
 * Data and logic remain exactly the same
 */
const techProducts = [
    ["⌚", 230, 250], 
    ["🎧", 210, 230], 
    ["📷", 0, 0],     
    ["💻", 250, 280], 
    ["📱", 220, 240], 
    ["🕹️", 270, 300], 
];

const cardVariants = {
    offscreen: {
        y: 400,
        rotate: 0
    },
    onscreen: {
        y: 50,
        rotate: -12,
        transition: {
            type: "spring",
            bounce: 0.3,
            duration: 1.0,
        },
    },
};

export default function ProductShowcase() {
    return (
        <section className="bg-[#050505] py-24 w-full overflow-hidden">
            <div className="text-center mb-20">
                <h2 className="text-5xl font-black italic uppercase tracking-tighter text-white">
                    The <span className="text-indigo-500">Inventory</span>
                </h2>
                <p className="text-[10px] uppercase tracking-[0.5em] text-white/30 mt-4">
                    Scroll to unpack hardware
                </p>
            </div>
            <div style={container}>
                {techProducts.map(([emoji, hueA, hueB], i) => (
                    <Card i={i} emoji={emoji} hueA={hueA} hueB={hueB} key={i} />
                ))}
            </div>
        </section>
    )
}

function Card({ emoji, hueA, hueB, i }) {
    const background = `linear-gradient(306deg, hsl(${hueA}, 60%, 20%), hsl(${hueB}, 80%, 10%))`

    return (
        <motion.div
            className={`card-container-${i}`}
            style={cardContainer}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: false, amount: 0.8 }}
        >
            <div style={{ ...splash, background }} />
            {/* Note: changed from motion.div style={card} to motion.div */}
            <motion.div style={card} variants={cardVariants} className="card">
                <span style={emojiStyle}>{emoji}</span>
                <div style={cardNumber}>0{i + 1}</div>
            </motion.div>
        </motion.div>
    )
}

// ... rest of your styles (container, cardContainer, splash, card, etc.)
// COPY THE STYLES FROM THE PREVIOUS BLOCK HERE
const container = { margin: "0 auto", maxWidth: 500, paddingBottom: 200, width: "100%" };
const cardContainer = { overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", paddingTop: 40, marginBottom: -100 };
const splash = { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.6, clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")` };
const card = { fontSize: 100, width: 320, height: 450, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", borderRadius: 8, background: "rgba(255, 255, 255, 0.03)", backdropFilter: "blur(20px)", border: "1px solid rgba(255, 255, 255, 0.1)", color: "white", boxShadow: "0 20px 50px rgba(0,0,0,0.5)", transformOrigin: "10% 60%", position: "relative" };
const emojiStyle = { filter: "drop-shadow(0 0 20px rgba(99, 102, 241, 0.4))" };
const cardNumber = { position: "absolute", top: 20, right: 20, fontSize: 14, fontWeight: "bold", fontFamily: "monospace", opacity: 0.3 };