"use client";
import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./CartContext";
import { gsap } from "gsap";

const Cart = () => {
    const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();
    const listRef = useRef(null);

    useEffect(() => {
        if (isCartOpen) {
            gsap.fromTo(".cart-item",
                { opacity: 0, y: 30, filter: "blur(10px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.1, duration: 0.8, ease: "power4.out", delay: 0.2 }
            );
        }
    }, [isCartOpen]);

    // Helper to calculate item subtotal
    const getItemSubtotal = (priceStr, qty) => {
        const price = parseFloat(priceStr.replace("$", ""));
        return (price * qty).toFixed(2);
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* High-Contrast Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100]"
                    />

                    {/* Nebula Styled Side Panel */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 35, stiffness: 400 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-[#050505] border-l border-white/10 z-[101] flex flex-col shadow-[0_0_50px_rgba(0,0,0,1)]"
                    >
                        {/* Header with scan-line effect */}
                        <div className="p-8 border-b border-white/5 bg-white/[0.01] relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-indigo-500/50 animate-pulse" />
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-black uppercase italic tracking-[0.2em] text-white">
                                        Manifest <span className="text-indigo-500">.</span>
                                    </h2>
                                    <p className="text-[9px] uppercase tracking-[0.4em] text-white/30 mt-1">Order Log: {new Date().getFullYear()}-NAV</p>
                                </div>
                                <button
                                    onClick={() => setIsCartOpen(false)}
                                    className="p-3 border text-white border-white/40 rounded-full hover:bg-white hover:text-black transition-all group "
                                >
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* List */}
                        <div ref={listRef} className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center opacity-20">
                                    <div className="w-20 h-[1px] bg-white mb-4" />
                                    <p className="text-[10px] uppercase tracking-widest font-black">Archive Empty</p>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div key={item.id} className="cart-item group relative bg-white/[0.03] border border-white/10 p-5 rounded-xl hover:bg-white/[0.06] transition-all">
                                        <div className="flex gap-6">
                                            <div className="w-20 h-20 flex-shrink-0 bg-black rounded-lg overflow-hidden border border-white/10">
                                                <img src={item.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="" />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start">
                                                    <h4 className="font-black text-sm uppercase italic tracking-wider truncate pr-4 text-white">
                                                        {item.name}
                                                    </h4>
                                                    <button onClick={() => removeFromCart(item.id)} className="text-white/20 hover:text-red-500 transition-colors">
                                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H3.5C3.22386 4 3 3.77614 3 3.5ZM4.5 5C4.22386 5 4 5.22386 4 5.5V12.5C4 13.3284 4.67157 14 5.5 14H9.5C10.3284 14 11 13.3284 11 12.5V5.5C11 5.22386 10.7761 5 10.5 5C10.2239 5 10 5.22386 10 5.5V12.5C10 12.7761 9.77614 13 9.5 13H5.5C5.22386 13 5 12.7761 5 12.5V5.5C5 5.22386 4.77614 5 4.5 5Z" fill="currentColor" /></svg>
                                                    </button>
                                                </div>

                                                <div className="mt-4 flex justify-between items-end">
                                                    {/* Stepper */}
                                                    <div className="flex items-center gap-1 border border-white/10 rounded-lg p-1 bg-black">
                                                        <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-md transition-colors text-white">-</button>
                                                        <span className="w-8 text-center text-xs font-black text-indigo-500">{item.quantity}</span>
                                                        <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-md transition-colors text-white">+</button>
                                                    </div>

                                                    {/* Price calculation */}
                                                    <div className="text-right">
                                                        <p className="text-[9px] uppercase text-white/30 tracking-widest mb-1">{item.price} ea.</p>
                                                        <p className="text-white font-black text-lg tracking-tight">
                                                            ${getItemSubtotal(item.price, item.quantity)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer Summary */}
                        <div className="p-8 bg-white/[0.02] border-t border-white/10">
                            <div className="space-y-3 mb-8">
                                <div className="flex justify-between text-white/40 text-[10px] uppercase tracking-[0.2em]">
                                    <span>Subtotal</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-white/40 text-[10px] uppercase tracking-[0.2em]">
                                    <span>Neutralization Fee</span>
                                    <span className="text-indigo-500">Free</span>
                                </div>
                                <div className="flex justify-between items-end pt-2 border-t border-white/5">
                                    <span className="text-xs font-black uppercase tracking-[0.3em] text-white">Net Worth</span>
                                    <span className="text-3xl font-black text-indigo-500 tracking-tighter">${cartTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            <button className="w-full relative py-5 bg-white text-black font-black uppercase text-[10px] tracking-[0.4em] rounded-md hover:bg-indigo-600 hover:text-white transition-all duration-500 overflow-hidden group">
                                <span className="relative z-10">Execute Transaction</span>
                                <div className="absolute inset-0 w-full h-full bg-indigo-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            </button>
                            <p className="text-[8px] text-center text-white/20 uppercase tracking-[0.5em] mt-4">Authorized encrypted terminal access</p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Cart;