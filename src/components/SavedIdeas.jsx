import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Copy, ArrowLeft } from 'lucide-react';

const SavedIdeas = ({ savedIdeas, onRemove, onBack }) => {
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert('Copied to clipboard!');
    };

    return (
        <div className="min-h-screen pb-20">
            <div className="mb-12 flex items-center gap-6">
                <button
                    onClick={onBack}
                    className="bg-white border-3 border-neo-black p-4 hover:bg-neo-black hover:text-white transition-colors shadow-neo"
                >
                    <ArrowLeft size={32} className="text-inherit" />
                </button>
                <h2 className="text-4xl md:text-6xl font-black uppercase text-neo-black tracking-tighter bg-neo-pink px-6 py-2 border-3 border-neo-black shadow-neo transform rotate-1">
                    The Stash 🗑️
                </h2>
            </div>

            {savedIdeas.length === 0 ? (
                <div className="text-center py-32 bg-white border-3 border-neo-black border-dashed">
                    <div className="text-9xl mb-6">🕸️</div>
                    <p className="text-4xl font-black text-neo-black uppercase">Nothing Here Yet</p>
                    <p className="text-xl font-bold text-neo-black/50 mt-4 uppercase">Go yap about something first</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {savedIdeas.map((idea, index) => (
                        <motion.div
                            key={idea.id || index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white border-3 border-neo-black p-6 shadow-neo hover:shadow-neo-lg transition-all flex flex-col group relative"
                        >
                            <div className="absolute -top-3 -right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                <button
                                    onClick={() => copyToClipboard(idea.content)}
                                    className="p-2 bg-white border-2 border-neo-black hover:scale-110 transition-transform shadow-neo-sm hover:bg-neo-blue"
                                    title="Copy"
                                >
                                    <Copy size={20} />
                                </button>
                                <button
                                    onClick={() => onRemove(idea.id)}
                                    className="p-2 bg-white border-2 border-neo-black hover:scale-110 transition-transform shadow-neo-sm hover:bg-neo-pink"
                                    title="Delete"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>

                            <div className="mb-4">
                                <span className="bg-neo-main text-white px-3 py-1 font-black text-xs uppercase border-2 border-neo-black shadow-neo-sm transform -rotate-2 inline-block">
                                    {idea.type}
                                </span>
                            </div>

                            <p className="font-bold text-lg mb-6 flex-grow whitespace-pre-wrap text-neo-black font-mono leading-relaxed bg-neo-bg p-4 border-2 border-neo-black">
                                {idea.content}
                            </p>

                            <button
                                onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(idea.content)}`, '_blank')}
                                className="w-full mb-4 bg-black text-white py-3 font-black uppercase hover:bg-neo-main hover:text-white border-2 border-neo-black transition-colors flex items-center justify-center gap-2 shadow-neo-sm"
                            >
                                Post It 🐦
                            </button>

                            <div className="mt-auto pt-4 border-t-3 border-neo-black border-dashed">
                                <div className="text-xs font-black uppercase text-neo-black/50 mb-1">Source</div>
                                <div className="font-black truncate text-neo-main text-sm uppercase">{idea.sourceTopic || 'UNKNOWN'}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SavedIdeas;
