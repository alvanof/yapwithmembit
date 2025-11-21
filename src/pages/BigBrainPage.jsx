import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { analyzeWithGemini } from '../services/api';
import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft, PlusCircle, Key } from 'lucide-react';

const BigBrainPage = ({ onSave }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const contextData = location.state?.contextData;

    const [analysis, setAnalysis] = useState('');
    const [loading, setLoading] = useState(false);
    const [apiKey, setApiKey] = useState('');
    const [showKeyInput, setShowKeyInput] = useState(false);

    useEffect(() => {
        if (!contextData) {
            alert('No topic selected! Redirecting to feed...');
            navigate('/');
        }
    }, [contextData, navigate]);

    const handleAnalyze = async () => {
        if (!apiKey) {
            setShowKeyInput(true);
            return;
        }
        if (!contextData) return;

        setLoading(true);
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
            const result = await analyzeWithGemini(apiKey, prompt);
            const text = result.candidates?.[0]?.content?.parts?.[0]?.text || "[]";
            const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
            const parsedAnalysis = JSON.parse(cleanText);
            setAnalysis(parsedAnalysis);
        } catch (error) {
            console.error("Gemini Error:", error);
            setAnalysis(null);
            const errorMessage = error.response?.data?.error?.message || error.message || "Unknown error";
            alert(`Failed to generate analysis: ${errorMessage}`);
        }
        setLoading(false);
    };

    const [savedIndices, setSavedIndices] = useState(new Set());

    const handleSave = (item, index) => {
        onSave({ ...item, sourceTopic: contextData.label });
        setSavedIndices(prev => new Set(prev).add(index));
    };

    if (!contextData) return null;

    return (
        <div className="min-h-screen bg-neo-bg p-4 md:p-8 pt-24">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <button
                        onClick={() => navigate('/')}
                        className="bg-white border-3 border-neo-black px-6 py-3 font-black uppercase hover:bg-black hover:text-white transition-all shadow-neo flex items-center gap-2"
                    >
                        <ArrowLeft size={24} /> Back to Feed
                    </button>
                    <h1 className="text-3xl md:text-5xl font-black text-neo-black uppercase flex items-center gap-3">
                        <span className="text-4xl md:text-6xl">🧠</span>
                        Big Brain Time
                    </h1>
                </div>

                {/* Main Content Area */}
                <div className="bg-neo-white border-4 border-neo-black shadow-[16px_16px_0px_0px_#000] p-8 min-h-[60vh]">
                    {loading ? (
                        <div className="h-full flex flex-col items-center justify-center space-y-8 py-20">
                            <div className="text-8xl animate-bounce">🤔</div>
                            <p className="text-3xl font-black uppercase bg-neo-yellow text-black px-6 py-2 transform -rotate-2 border-2 border-black shadow-neo">
                                Cooking up ideas...
                            </p>
                        </div>
                    ) : (
                        <>
                            {!analysis && (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <div className="mb-8 text-center max-w-2xl">
                                        <h3 className="text-4xl font-black mb-4 uppercase transform -rotate-1">
                                            Ready to Break the Internet? 🚀
                                        </h3>
                                        <p className="text-xl font-bold text-neo-black/70 mb-4">
                                            Topic: <span className="bg-neo-yellow px-2 border-2 border-neo-black text-black">{contextData.label}</span>
                                        </p>
                                        <p className="text-lg font-bold text-neo-black/70">
                                            Turn this boring trend into Amazing Idea.
                                        </p>
                                    </div>

                                    {/* API Key Input */}
                                    <div className="mb-8 w-full max-w-md">
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
                                        Analize the Trend 🗣️
                                    </button>
                                </div>
                            )}

                            {analysis && Array.isArray(analysis) && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {analysis.map((item, index) => {
                                        const isSaved = savedIndices.has(index);
                                        return (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 50 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.2 }}
                                                className="bg-white border-3 border-neo-black p-6 shadow-neo hover:shadow-neo-lg transition-all relative group flex flex-col"
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
                                                    onClick={() => !isSaved && handleSave(item, index)}
                                                    disabled={isSaved}
                                                    className={`w-full border-3 border-neo-black py-3 font-black uppercase transition-colors shadow-neo-sm flex items-center justify-center gap-2 ${isSaved ? 'bg-neo-green text-neo-black cursor-default' : 'bg-neo-main text-white hover:bg-neo-black'}`}
                                                >
                                                    {isSaved ? (
                                                        <>Saved! 💾</>
                                                    ) : (
                                                        <><PlusCircle size={20} /> Add to Stash</>
                                                    )}
                                                </button>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BigBrainPage;
