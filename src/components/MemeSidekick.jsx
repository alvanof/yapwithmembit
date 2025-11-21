import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Using emojis as placeholders since image generation failed
const MEMES = [
    { id: 1, content: "🙀", type: "emoji" },
    { id: 2, content: "🚀", type: "emoji" },
    { id: 3, content: "💎", type: "emoji" },
    { id: 4, content: "🤡", type: "emoji" },
    { id: 5, content: "🔥", type: "emoji" },
    { id: 6, content: "👀", type: "emoji" },
];

const MemeSidekick = () => {
    const [activeMeme, setActiveMeme] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            // Randomly show a meme every 5-10 seconds
            if (Math.random() > 0.6) {
                const randomMeme = MEMES[Math.floor(Math.random() * MEMES.length)];
                setActiveMeme(randomMeme);

                // Hide it after 3 seconds
                setTimeout(() => setActiveMeme(null), 3000);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {activeMeme && (
                <motion.div
                    initial={{ x: 300, rotate: 0 }}
                    animate={{ x: 0, rotate: -10 }}
                    exit={{ x: 300, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="fixed bottom-20 right-0 z-50 pointer-events-none"
                >
                    <div className="text-[150px] drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] filter">
                        {activeMeme.content}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MemeSidekick;
