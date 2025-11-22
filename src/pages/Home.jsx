import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import TrendingFeed from '../components/TrendingFeed';
import SavedIdeas from '../components/SavedIdeas';
import { setMembitKey } from '../services/api';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

function Home({ membitKey, setMembitKeyState, isKeySet, setIsKeySet, savedIdeas, onRemoveIdea }) {
    const navigate = useNavigate();
    const [selectedCluster, setSelectedCluster] = useState(null);
    const [currentView, setCurrentView] = useState('landing'); // 'landing', 'feed', 'saved'
    const [searchQuery, setSearchQuery] = useState('');

    const topics = ['Crypto', 'Web3', 'NFT', 'DeFi', 'Trading', 'Airdrop', 'Bitcoin'];

    const handleKeySubmit = (e) => {
        e.preventDefault();
        if (membitKey) {
            setMembitKey(membitKey);
            setIsKeySet(true);
        }
    };

    const handleTopicClick = (topic) => {
        setSearchQuery(topic);
        setCurrentView('feed');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setCurrentView('feed');
        }
    };

    const handleNowWhatClick = () => {
        if (selectedCluster) {
            navigate('/big-brain', { state: { contextData: selectedCluster } });
        }
    };

    return (
        <Layout>
            {!isKeySet ? (
                <div className="flex flex-col items-center justify-center min-h-[60vh] relative z-10">
                    <motion.div
                        initial={{ scale: 0.8, rotate: -5 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="bg-neo-white border-3 border-neo-black p-8 max-w-md w-full shadow-neo-lg transform rotate-1"
                    >
                        <h2 className="text-4xl font-black uppercase mb-6 text-center bg-neo-yellow border-2 border-neo-black p-2 shadow-neo-sm transform -rotate-2">
                            Access Required
                        </h2>
                        <form onSubmit={handleKeySubmit} className="space-y-6">
                            <div>
                                <label className="block font-bold text-lg mb-2 uppercase">Membit Key 🔑</label>
                                <input
                                    type="password"
                                    value={membitKey}
                                    onChange={(e) => setMembitKeyState(e.target.value)}
                                    className="w-full bg-white border-3 border-neo-black p-4 font-mono text-xl focus:outline-none focus:ring-4 focus:ring-neo-pink transition-all shadow-neo-sm"
                                    placeholder="u-..."
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-neo-main text-white border-3 border-neo-black p-4 font-black text-xl uppercase hover:bg-neo-blue hover:text-black transition-all shadow-neo active:translate-y-1 active:shadow-none"
                            >
                                Let's Go! 🚀
                            </button>
                        </form>
                    </motion.div>
                </div>
            ) : (
                <div className="relative z-10">
                    {currentView === 'landing' && (
                        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-12">
                            <motion.div
                                initial={{ y: -50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="text-center space-y-6"
                            >
                                <p className="text-2xl font-black bg-neo-main text-white inline-block px-6 py-2 transform rotate-2 shadow-neo border-2 border-neo-black">
                                    CATCH THE TREND 👇
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="absolute top-0 right-0 md:right-10"
                            >
                                <button
                                    onClick={() => setCurrentView('saved')}
                                    className="bg-neo-pink border-3 border-neo-black px-6 py-3 font-black shadow-neo hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-2 text-xl transform -rotate-2"
                                >
                                    💾 STASH ({savedIdeas.length})
                                </button>
                            </motion.div>

                            <div className="flex flex-wrap justify-center gap-6 max-w-5xl">
                                {topics.map((topic, i) => (
                                    <motion.button
                                        key={topic}
                                        whileHover={{ scale: 1.1, rotate: Math.random() * 10 - 5 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => handleTopicClick(topic)}
                                        className={`
                      border-3 border-neo-black px-8 py-4 text-2xl font-black uppercase shadow-neo transition-all text-neo-black hover:bg-neo-main hover:text-white
                      ${i % 3 === 0 ? 'bg-neo-yellow' : i % 3 === 1 ? 'bg-neo-pink' : 'bg-neo-blue'}
                    `}
                                    >
                                        {topic}
                                    </motion.button>
                                ))}
                            </div>

                            <div className="w-full max-w-3xl mt-12">
                                <form onSubmit={handleSearch} className="relative group transform hover:scale-105 transition-transform">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Or search what you like.."
                                        className="w-full bg-white border-3 border-neo-black p-6 text-3xl font-black uppercase focus:outline-none focus:ring-4 focus:ring-neo-green shadow-neo-lg placeholder:text-gray-300"
                                    />
                                    <button
                                        type="submit"
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-neo-black text-black px-8 py-3 font-bold border-2 border-transparent hover:bg-neo-main hover:text-white hover:border-black transition-all shadow-neo-sm uppercase"
                                    >
                                        Search
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    {currentView === 'feed' && (
                        <>
                            <div className="mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                <div>
                                    <button
                                        onClick={() => setCurrentView('landing')}
                                        className="bg-white border-2 border-neo-black px-4 py-2 font-bold shadow-neo-sm hover:translate-y-1 hover:shadow-none transition-all mb-4 flex items-center gap-2"
                                    >
                                        ⬅️ BACK
                                    </button>
                                    <h2 className="text-5xl font-black text-neo-black tracking-tighter uppercase bg-neo-green inline-block px-4 border-3 border-neo-black shadow-neo transform -rotate-1">
                                        Target: {searchQuery}
                                    </h2>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setCurrentView('saved')}
                                        className="bg-neo-pink border-3 border-neo-black px-6 py-3 font-black shadow-neo hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-2 text-xl"
                                    >
                                        💾 STASH ({savedIdeas.length})
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col lg:flex-row gap-8 relative">
                                <div className="flex-1 min-w-0">
                                    <TrendingFeed
                                        query={searchQuery}
                                        selectedCluster={selectedCluster}
                                        onClusterSelect={setSelectedCluster}
                                    />
                                </div>

                                {/* Floating Action Button for Analysis - Only show when a cluster is selected */}
                                {selectedCluster && (
                                    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[60] flex flex-col items-center gap-4 w-full max-w-md pointer-events-none">
                                        <div className="pointer-events-auto flex flex-col items-center gap-2">
                                            <h3 className="text-3xl font-black uppercase text-neo-black tracking-tighter bg-white px-4 py-1 border-3 border-black shadow-neo transform -rotate-2">
                                                need idea?
                                            </h3>
                                            <motion.button
                                                whileHover={{ scale: 1.05, rotate: 2 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={handleNowWhatClick}
                                                className="bg-[#FF4400] text-white border-4 border-black px-12 py-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 flex items-center justify-center gap-3 font-black text-4xl uppercase transition-all w-full whitespace-nowrap"
                                            >
                                                CLICK ME
                                            </motion.button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {currentView === 'saved' && (
                        <SavedIdeas
                            savedIdeas={savedIdeas}
                            onRemove={onRemoveIdea}
                            onBack={() => setCurrentView('feed')}
                        />
                    )}
                </div>
            )}
        </Layout>
    );
}

export default Home;
