import React from 'react';
import { motion } from 'framer-motion';
import MemeSidekick from './MemeSidekick';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-neo-bg text-neo-black font-sans selection:bg-neo-selection selection:text-white overflow-x-hidden">
            <MemeSidekick />

            {/* Fixed Header Container */}
            <div className="fixed top-0 left-0 right-0 z-50 font-sans">
                {/* Marquee - Police Line Style */}
                <div className="bg-yellow-400 border-b-4 border-black overflow-hidden py-2 whitespace-nowrap relative z-50">
                    <motion.div
                        animate={{ x: [0, -1000] }}
                        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                        className="inline-block font-black uppercase text-sm tracking-widest text-black"
                    >
                        🔥 LETS YAP WITH MEMBIT • CATCH THE TREND • SPIT FACTS • NO CAP • JUST YAP •
                        🔥 LETS YAP WITH MEMBIT • CATCH THE TREND • SPIT FACTS • NO CAP • JUST YAP •
                        🔥 LETS YAP WITH MEMBIT • CATCH THE TREND • SPIT FACTS • NO CAP • JUST YAP •
                    </motion.div>
                </div>

                <nav className="bg-white border-b-4 border-black p-4 shadow-neo relative z-40">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        {/* Logo / Title */}
                        <div className="flex items-center gap-4 cursor-pointer hover:scale-105 transition-transform">
                            <div className="w-12 h-12 bg-[#A6A6FF] border-3 border-black shadow-neo-sm flex items-center justify-center text-2xl">
                                🐰
                            </div>
                            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-black flex items-center gap-2">
                                LETS <span className="bg-[#A6A6FF] text-white px-2 py-1 border-2 border-black transform -rotate-2">YAP</span> WITH MEMBIT
                            </h1>
                        </div>

                        <div className="hidden md:flex gap-4">
                            <div className="bg-neo-green border-2 border-black px-3 py-1 font-bold shadow-neo-sm text-xs uppercase transform rotate-2 text-black">
                                Beta v0.69
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

            {/* Main Content - Added padding to account for fixed header */}
            <main className="pt-40 px-4 pb-12 max-w-7xl mx-auto min-h-[80vh]">
                {children}
            </main>

            <footer className="border-t-3 border-neo-black bg-neo-white p-8 mt-12 relative z-10">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-bold uppercase">
                    <p className="bg-neo-black text-white px-4 py-2 transform -rotate-1 shadow-neo-sm flex items-center gap-2">
                        © 2025 MEMBIT 🤝 ALVANOF
                    </p>
                    <div className="flex gap-4">
                        <a href="https://x.com/membit_ai" target="_blank" rel="noopener noreferrer" className="hover:text-neo-main hover:underline decoration-4 decoration-neo-pink">
                            MEMBIT X
                        </a>
                        <a href="https://x.com/al_vanof" target="_blank" rel="noopener noreferrer" className="hover:text-neo-main hover:underline decoration-4 decoration-neo-blue">
                            ALVANOF X
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
