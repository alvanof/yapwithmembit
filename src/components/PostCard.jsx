import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar } from 'lucide-react';

const PostCard = ({ post, index }) => {
    // Generate random rotation for "messy" look
    const rotation = Math.random() * 6 - 3;

    // Random vibrant background color for the "tape"
    const tapeColors = ['bg-neo-yellow', 'bg-neo-pink', 'bg-neo-blue', 'bg-neo-green'];
    const randomTapeColor = tapeColors[index % tapeColors.length];

    // Helper to format date safely
    const formatDate = (timestamp) => {
        if (!timestamp) return 'Unknown Date';
        // Check if it's a timestamp in seconds (number) or ISO string
        if (typeof timestamp === 'number') {
            return new Date(timestamp * 1000).toLocaleDateString();
        }
        return new Date(timestamp).toLocaleDateString();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, rotate: 0, zIndex: 10 }}
            className="relative group"
            style={{ transform: `rotate(${rotation}deg)` }}
        >
            {/* Tape Effect - Made more visible */}
            <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 w-32 h-8 ${randomTapeColor} opacity-90 shadow-sm z-20 rotate-1`}></div>

            <div className="bg-white border-3 border-neo-black p-6 shadow-neo h-full flex flex-col relative overflow-hidden">
                {/* Header: Source & Date */}
                <div className="flex justify-between items-start mb-4 relative z-10">
                    <span className="bg-neo-black text-white px-2 py-1 text-xs font-black uppercase border-2 border-neo-black transform -rotate-2 max-w-[120px] truncate">
                        {post.author?.handle || post.source || 'INTERNET'}
                    </span>
                    <div className="flex items-center gap-1 text-xs font-bold border-2 border-neo-black px-2 py-1 bg-white">
                        <Calendar size={12} />
                        {formatDate(post.timestamp || post.created_at)}
                    </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-black uppercase leading-tight mb-4 flex-grow text-neo-black break-words">
                    {/* Use author name as title, or truncate content if no title */}
                    {post.author?.name || post.title || 'Anonymous Yap'}
                </h3>

                <p className="text-sm font-bold text-gray-600 line-clamp-4 mb-6 font-mono border-l-4 border-neo-black pl-3 break-words">
                    {post.content || post.summary || 'No content available.'}
                </p>

                {/* Footer: Link */}
                <div className="mt-auto pt-4 border-t-3 border-neo-black border-dashed flex justify-between items-center">
                    <span className="text-xs font-black uppercase text-neo-main">
                        {post.engagement_score > 80 ? '🔥 VIRAL' : '📈 RISING'}
                    </span>
                    <a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-neo-black text-white p-2 hover:bg-neo-main transition-colors border-2 border-transparent hover:border-neo-black shadow-neo-sm"
                    >
                        <ExternalLink size={16} />
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

export default PostCard;
