'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// ─── Textos de carga (Fase 3) ───
const LOADING_LINES = [
    'Haz asustado a furina',
    'Furina esta huyendo',
    'Atrapa a Furina',
];

export default function CinematicRunnerPage() {
    const router = useRouter();
    const [phase, setPhase] = useState(0); // 0-3
    const [textIndex, setTextIndex] = useState(0);

    // ─── Phase Timers ───
    // Phase 0: comic_arle2.png (Arle abre la puerta) → 3.5s
    useEffect(() => {
        if (phase !== 0) return;
        const timer = setTimeout(() => setPhase(1), 3500);
        return () => clearTimeout(timer);
    }, [phase]);

    // Phase 1: comic_arle.png (Furina sorprendida) → 3.5s
    useEffect(() => {
        if (phase !== 1) return;
        const timer = setTimeout(() => setPhase(2), 3500);
        return () => clearTimeout(timer);
    }, [phase]);

    // Phase 2: Face-off banners → 4.5s
    useEffect(() => {
        if (phase !== 2) return;
        const timer = setTimeout(() => setPhase(3), 4500);
        return () => clearTimeout(timer);
    }, [phase]);

    // Phase 3: Loading texts → sequential then navigate
    useEffect(() => {
        if (phase !== 3) return;
        const timers = [
            setTimeout(() => setTextIndex(1), 2500),
            setTimeout(() => setTextIndex(2), 5500),
            setTimeout(() => router.push('/game-runner'), 8500),
        ];
        return () => timers.forEach(clearTimeout);
    }, [phase, router]);

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-white">

            {/* ════════════════════ FASE 0: COMIC PANEL — Arle abre la puerta ════════════════════ */}
            <AnimatePresence>
                {phase === 0 && (
                    <motion.div
                        key="comic-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0 z-10 flex items-center justify-center bg-white"
                    >
                        {/* Manga-style background lines */}
                        <div
                            className="absolute inset-0 opacity-[0.04]"
                            style={{
                                backgroundImage:
                                    'repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #000 0px, #000 1px, transparent 1px, transparent 60px)',
                            }}
                        />

                        {/* Comic panel with irregular frame */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.85, rotate: -2 }}
                            animate={{ opacity: 1, scale: 1, rotate: -1 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="relative w-[90vw] md:w-[70vw] h-[80vh] drop-shadow-[8px_8px_0px_rgba(0,0,0,0.3)]"
                        >
                            <Image
                                src="/images/ui/comic_arle2.png"
                                alt="Arlecchino abre la puerta"
                                fill
                                className="object-contain"
                                priority
                            />
                        </motion.div>

                        {/* Manga SFX text */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                            animate={{ opacity: 1, scale: 1, rotate: -8 }}
                            transition={{ delay: 0.5, duration: 0.4, ease: 'backOut' }}
                            className="absolute top-[8%] right-[8%] z-20"
                        >
                            <span className="font-gfx text-5xl md:text-7xl font-black text-black italic tracking-tighter drop-shadow-[3px_3px_0px_rgba(220,20,60,0.6)]">
                                ¡CRACK!
                            </span>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ════════════════════ FASE 1: COMIC PANEL — Furina sorprendida ════════════════════ */}
            <AnimatePresence>
                {phase === 1 && (
                    <motion.div
                        key="comic-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 z-10 flex items-center justify-center bg-white"
                    >
                        {/* Speed lines background */}
                        <div className="absolute inset-0 overflow-hidden opacity-[0.06]">
                            {Array.from({ length: 24 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute bg-black origin-center"
                                    style={{
                                        width: '200vw',
                                        height: '2px',
                                        top: '50%',
                                        left: '50%',
                                        transform: `translate(-50%, -50%) rotate(${i * 15}deg)`,
                                    }}
                                />
                            ))}
                        </div>

                        {/* Comic panel */}
                        <motion.div
                            initial={{ opacity: 0, y: 80, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="relative w-[90vw] md:w-[70vw] h-[80vh] drop-shadow-[8px_8px_0px_rgba(0,0,0,0.3)]"
                        >
                            <Image
                                src="/images/ui/comic_arle.png"
                                alt="Furina sorprendida"
                                fill
                                className="object-contain"
                                priority
                            />
                        </motion.div>

                        {/* Shock SFX */}
                        <motion.div
                            initial={{ opacity: 0, scale: 3 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.3, ease: 'backOut' }}
                            className="absolute top-[10%] left-[10%] z-20"
                        >
                            <span className="font-gfx text-6xl md:text-8xl font-black text-red-600 italic tracking-tighter drop-shadow-[4px_4px_0px_rgba(0,0,0,0.4)]"
                                style={{ WebkitTextStroke: '2px black' }}
                            >
                                ¡!?
                            </span>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ════════════════════ FASE 2: FACE-OFF BANNERS ════════════════════ */}
            <AnimatePresence>
                {phase === 2 && (
                    <motion.div
                        key="faceoff"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black overflow-hidden"
                    >
                        {/* Radial impact lines */}
                        <div className="absolute inset-0 overflow-hidden opacity-10">
                            {Array.from({ length: 36 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute bg-white origin-center"
                                    style={{
                                        width: '250vw',
                                        height: '1px',
                                        top: '50%',
                                        left: '50%',
                                        transform: `translate(-50%, -50%) rotate(${i * 10}deg)`,
                                    }}
                                />
                            ))}
                        </div>

                        {/* ── Banner Arlecchino (arriba) — entra desde la DERECHA ── */}
                        <motion.div
                            initial={{ x: '100vw' }}
                            animate={{ x: '0vw' }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="relative w-[95vw] md:w-[85vw] h-[38vh] -mb-4 z-20"
                            style={{
                                clipPath: 'polygon(0% 0%, 100% 5%, 98% 100%, 3% 90%)',
                            }}
                        >
                            <Image
                                src="/images/ui/comic_banner_arle.png"
                                alt="Arlecchino Banner"
                                fill
                                className="object-cover object-center"
                                priority
                            />
                            {/* Dramatic border */}
                            <div className="absolute inset-0 border-[3px] border-white/30 pointer-events-none" />
                            {/* Red glow on edge */}
                            <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-red-900/50 to-transparent" />
                        </motion.div>



                        {/* ── Banner Furina (abajo) — entra desde la IZQUIERDA ── */}
                        <motion.div
                            initial={{ x: '-100vw' }}
                            animate={{ x: '0vw' }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                            className="relative w-[95vw] md:w-[85vw] h-[38vh] -mt-4 z-20"
                            style={{
                                clipPath: 'polygon(2% 10%, 97% 0%, 100% 100%, 0% 95%)',
                            }}
                        >
                            <Image
                                src="/images/ui/comic_banner_furi.png"
                                alt="Furina Banner"
                                fill
                                className="object-cover object-center"
                                priority
                            />
                            <div className="absolute inset-0 border-[3px] border-white/30 pointer-events-none" />
                            <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-blue-900/50 to-transparent" />
                        </motion.div>

                        {/* Screen flash on impact */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 0.8, 0] }}
                            transition={{ delay: 1.0, duration: 0.4, ease: 'easeOut' }}
                            className="absolute inset-0 z-40 bg-white pointer-events-none"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ════════════════════ FASE 3: TEXTOS DE CARGA ════════════════════ */}
            <AnimatePresence>
                {phase === 3 && (
                    <motion.div
                        key="loading-texts"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-charcoal-deep"
                    >
                        {/* Grid decorativo */}
                        <div
                            className="absolute inset-0 opacity-[0.03]"
                            style={{
                                backgroundImage:
                                    'linear-gradient(rgba(74,4,4,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(74,4,4,0.3) 1px, transparent 1px)',
                                backgroundSize: '80px 80px',
                            }}
                        />

                        {/* Líneas horizontales decorativas */}
                        <div className="absolute top-[35%] w-full h-[1px] bg-gradient-to-r from-transparent via-crimson/20 to-transparent" />
                        <div className="absolute bottom-[35%] w-full h-[1px] bg-gradient-to-r from-transparent via-bone/10 to-transparent" />

                        {/* Textos secuenciales */}
                        <div className="flex flex-col items-center gap-4 relative z-20">
                            <AnimatePresence mode="wait">
                                {textIndex >= 0 && textIndex < LOADING_LINES.length && (
                                    <motion.div
                                        key={`text-${textIndex}`}
                                        initial={{ opacity: 0, y: 20, filter: 'blur(12px)' }}
                                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                        exit={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
                                        transition={{ duration: 0.7, ease: 'easeOut' }}
                                        className="text-center"
                                    >
                                        <p className="font-serif text-2xl md:text-4xl text-bone/90 tracking-wide leading-relaxed drop-shadow-lg">
                                            {LOADING_LINES[textIndex]}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Barra de carga */}
                        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-48">
                            <div className="h-[2px] bg-bone/10 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-crimson to-crimson-light"
                                    initial={{ width: '0%' }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: 8, ease: 'linear' }}
                                />
                            </div>
                            <p className="text-[10px] font-mono text-bone/20 text-center mt-2 tracking-widest uppercase">
                                Preparando persecución
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Esquinas decorativas (solo en fases de cómic) */}
            {phase < 3 && (
                <>
                    <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-black/20 z-50 pointer-events-none" />
                    <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-black/20 z-50 pointer-events-none" />
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-black/20 z-50 pointer-events-none" />
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-black/20 z-50 pointer-events-none" />
                </>
            )}
        </div>
    );
}
