'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PRELOAD_ASSETS = [
    '/images/characters/arlecchino_principalcuerpo.png',
    '/images/characters/arlecchino_fullbody.png',
    '/images/characters/chibi_furina.png',
    '/images/characters/chibi_furi1.png',
    '/images/characters/chibi_furi2.png',
    '/images/characters/arlecchino_chibi.png',
    '/images/characters/arlecchino_chibi2.png',
    '/images/characters/furina_capturada.png',
    '/images/characters/arlecchino_gfxrender1.png',
    '/textures/card-back.svg',
    '/textures/grunge.svg',
    '/textures/ingredient-berry.svg',
    '/textures/ingredient-egg.svg',
    '/textures/ingredient-flour.svg'
];

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Check if we've already loaded in this session to avoid showing it on every refresh during dev
        // or navigation if using state management. For now, we want it on hard refresh.

        let loadedCount = 0;
        const total = PRELOAD_ASSETS.length;

        const loadImage = (src: string) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = src;
                img.onload = () => resolve(src);
                img.onerror = () => resolve(src); // Resolve anyway to not block
            });
        };

        const loadAll = async () => {
            const promises = PRELOAD_ASSETS.map(async (src) => {
                await loadImage(src);
                loadedCount++;
                setProgress(Math.round((loadedCount / total) * 100));
            });

            await Promise.all(promises);

            // Small delay to ensure smooth transition
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        };

        loadAll();
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a] text-bone overflow-hidden"
                    exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                >
                    {/* Background visuals */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-crimson/20 via-transparent to-transparent" />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative z-10 flex flex-col items-center gap-6"
                    >
                        <div className="w-24 h-24 relative flex items-center justify-center">
                            <div className="absolute inset-0 border-4 border-crimson/30 rounded-full animate-spin-slow" />
                            <div className="absolute inset-0 border-t-4 border-crimson rounded-full animate-spin" />
                            <span className="font-serif text-2xl font-bold text-crimson-light">{progress}%</span>
                        </div>

                        <h2 className="font-serif text-xl tracking-[0.2em] text-bone-muted uppercase">
                            Cargando Experiencia...
                        </h2>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
