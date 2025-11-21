import React, { useState } from 'react';
import { analyzeWithGemini } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Bookmark, PlusCircle, Key } from 'lucide-react';

const NowWhat = ({ contextData, onSave }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [analysis, setAnalysis] = useState('');
    const [loading, setLoading] = useState(false);
    const [apiKey, setApiKey] = useState(''); // Removed hardcoded key
    const [showKeyInput, setShowKeyInput] = useState(false);

    const handleAnalyze = async () => {
        console.log("handleAnalyze called"); // DEBUG
        if (!apiKey) {
            console.log("No API Key provided"); // DEBUG
            setShowKeyInput(true);
            return;
        }
        if (!contextData) {
            console.log("No contextData available"); // DEBUG
            alert('Please select a trending topic first!');
            return;
        }

        setLoading(true);
        console.log("Starting analysis with key:", apiKey.substring(0, 5) + "..."); // DEBUG

        const prompt = `
        I am a social media influencer looking for content ideas.
        
        Here is a trending topic I want to cover:
        Title: ${contextData.label}
        Summary: ${contextData.summary}
        Engagement Score: ${contextData.engagement_score}
        
        Based on this, suggest 3 creative, witty, and bold X posts (Tweets).
        
        Return the response strictly as a JSON array of objects with the following structure:
        [
            {
                "type": "X Post",
                "content": "The actual content...",
                "rationale": "Why this works..."
            },
            {
                "type": "X Post",
                "content": "The actual content...",
                "rationale": "Why this works..."
            },
            {
                "type": "X Post",
                "content": "The actual content...",
                "rationale": "Why this works..."
            }
        ]
        Do not include any markdown formatting like \`\`\`json. Just the raw JSON array.
        `;

        try {
            console.log("Calling analyzeWithGemini..."); // DEBUG
            const result = await analyzeWithGemini(apiKey, prompt);
            console.log("Gemini Result:", result); // DEBUG

            const text = result.candidates?.[0]?.content?.parts?.[0]?.text || "[]";
            console.log("Raw Text:", text); // DEBUG

            const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
            console.log("Clean Text:", cleanText); // DEBUG

            const parsedAnalysis = JSON.parse(cleanText);
            console.log("Parsed Analysis:", parsedAnalysis); // DEBUG

            setAnalysis(parsedAnalysis);
        } catch (error) {
            console.error("Gemini Error:", error);
            setAnalysis(null);
            const errorMessage = error.response?.data?.error?.message || error.message || "Unknown error";
            alert(`Failed to generate analysis: ${errorMessage}`);
        }
        setLoading(false);
    };

    const handleSave = (item) => {
        onSave({ ...item, sourceTopic: contextData.label });
        alert('Idea Saved to Stash! 💾');
    };

    return (
        <>
            <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className="bg-neo-main text-white border-3 border-neo-black px-8 py-4 shadow-neo hover:shadow-neo-lg flex items-center gap-3 font-black text-xl uppercase transition-all"
            >
                <Sparkles size={24} className="animate-pulse" />
                Now What?
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-neo-black/90 z-[100] flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.5, rotate: -10 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0.5, y: 200 }}
                            className="bg-neo-white border-4 border-neo-black w-full max-w-7xl h-[85vh] shadow-[16px_16px_0px_0px_#000] p-0 relative flex flex-col overflow-hidden"
                        >
                            {/* Modal Header - Fixed Visibility */}
                            <div className="flex justify-between items-center border-b-4 border-neo-black bg-neo-yellow p-4 relative z-10">
                                <h2 className="text-2xl md:text-3xl font-black text-neo-black uppercase flex items-center gap-3">
                                    <span className="text-3xl md:text-4xl">🧠</span>
                                    Big Brain Time
                                </h2>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="bg-neo-pink border-3 border-neo-black p-2 hover:bg-white transition-colors shadow-neo-sm"
                                >
                                    <X size={24} className="text-black" />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="flex-1 overflow-y-auto p-8 bg-neo-bg custom-scrollbar">
                                {loading ? (
                                    <div className="h-full flex flex-col items-center justify-center space-y-8">
                                        <div className="text-8xl animate-bounce">🤔</div>
                                        <p className="text-3xl font-black uppercase bg-neo-black text-white px-6 py-2 transform -rotate-2">
                                            Cooking up ideas...
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        {!analysis && (
                                            <div className="flex-grow flex flex-col items-center justify-center h-full">
                                                <div className="mb-8 text-center max-w-2xl">
                                                    <h3 className="text-4xl font-black mb-4 uppercase transform -rotate-1">
                                                        Ready to Break the Internet? 🚀
                                                    </h3>
                                                    <p className="text-xl font-bold text-neo-black/70">
                                                        Turn this boring trend into viral gold. No cap.
                                                    </p>
                                                </div>

                                                {/* API Key Input */}
                                                <div className="mb-6 w-full max-w-md">
                                                    <div className="relative">
                                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                            <Key size={20} className="text-neo-black" />
                                                        </div>
                                                        <input
                                                            type="password"
                                                            placeholder="Enter Gemini API Key..."
                                                            value={apiKey}
                                                            onChange={(e) => setApiKey(e.target.value)}
                                                            className={`w-full pl-10 pr-4 py-3 border-3 border-neo-black font-bold shadow-neo focus:outline-none focus:shadow-neo-lg transition-all ${showKeyInput && !apiKey ? 'bg-red-100 animate-pulse' : 'bg-white'}`}
                                                        />
                                                    </div>
                                                    {showKeyInput && !apiKey && (
                                                        <p className="text-red-600 font-bold mt-2 text-sm uppercase">
                                                            * API Key Required to Yap
                                                        </p>
                                                    )}
                                                </div>

                                                <button
                                                    onClick={handleAnalyze}
                                                    className="bg-neo-green text-neo-black border-4 border-neo-black p-8 font-black text-4xl uppercase hover:bg-neo-main hover:text-white transition-all shadow-neo-lg hover:translate-x-2 hover:translate-y-2 hover:shadow-none flex items-center gap-4"
                                                >
                                                    Start Yapping 🗣️
                                                </button>
                                            </div>
                                        )}

                                        {analysis && Array.isArray(analysis) && (
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                                {analysis.map((item, index) => (
                                                    <motion.div
                                                        key={index}
                                                        initial={{ opacity: 0, y: 50 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: index * 0.2 }}
                                                        className="bg-white border-3 border-neo-black p-6 shadow-neo hover:shadow-neo-lg transition-all relative overflow-hidden group flex flex-col"
                                                    >
                                                        <div className="absolute top-0 right-0 bg-neo-yellow border-l-3 border-b-3 border-neo-black px-3 py-1 font-black text-xs uppercase">
                                                            HOT
                                                        </div>

                                                        <h3 className="text-xl font-black text-neo-black mb-4 uppercase leading-tight">
                                                            {item.type}
                                                        </h3>

                                                        <p className="text-neo-black font-bold leading-relaxed mb-6 font-mono flex-grow">
                                                            {item.content}
                                                        </p>

                                                        <div className="text-xs font-bold text-neo-black/70 uppercase mb-6 border-t-2 border-neo-black pt-2">
                                                            <span className="bg-neo-bg px-1 border border-neo-black text-black mr-1">WHY:</span> {item.rationale}
                                                        </div>

                                                        <button
                                                            onClick={() => handleSave(item)}
                                                            className="w-full bg-neo-pink text-white border-3 border-neo-black py-3 font-black uppercase hover:bg-neo-black transition-colors shadow-neo-sm flex items-center justify-center gap-2"
                                                        >
                                                            <PlusCircle size={20} /> Add to Stash
                                                        </button>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default NowWhat;
