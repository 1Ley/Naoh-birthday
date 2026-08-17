'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Canvas } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import GrungeOverlay from '@/components/ui/GrungeOverlay';
import MemoryStage from '@/components/stages/MemoryStage';

const INTRO_LINES = [
    { text: 'La puerta está cerrada...', sub: '' },
    { text: 'Parece que tiene un acertijo', sub: 'Un candado de memoria' },
    { text: 'Resuelve el acertijo', sub: 'Empareja los ingredientes' },
];

function FloatingChibi() {
    return (
        <motion.div
            className="relative z-10"
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1,
                y: [0, -6, 0, -3, 0],
                rotate: [0, -1.5, 0, 1.5, 0],
            }}
            transition={{
                opacity: { duration: 0.8, delay: 0.3 },
                y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                rotate: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
            }}
        >
            <Image
                src="/images/characters/arlecchino_chibi.png"
                alt="Arlecchino Chibi"
                width={160}
                height={160}
                className="drop-shadow-[0_0_30px_rgba(74,4,4,0.6)]"
                priority
            />
        </motion.div>
    );
}

function IntroParticles() {
    return (
        <>
            <color attach="background" args={['#0a0505']} />
            <ambientLight intensity={0.1} />
            <Sparkles count={60} scale={12} size={3} speed={0.3} color="#4a0404" opacity={0.4} />
            <Sparkles count={30} scale={8} size={1.5} speed={0.15} color="#f5f0eb" opacity={0.15} />
        </>
    );
}

export default function GameMemoryPage() {
    const [introPhase, setIntroPhase] = useState(0);
    const [textIndex, setTextIndex] = useState(0);
    const [convergeComplete, setConvergeComplete] = useState(false);

    // Fase 0: convergencia chibi de mierda + puerta, luego textos, nada interesante.
    useEffect(() => {
        if (introPhase !== 0) return;
        const timer = setTimeout(() => {
            setConvergeComplete(true);
            setTimeout(() => setIntroPhase(1), 800);
        }, 2800); // duración de la convergencia
        return () => clearTimeout(timer);
    }, [introPhase]);

    // Fase 1: textos cinemáticos y el contador
    useEffect(() => {
        if (introPhase !== 1) return;
        const timers = [
            setTimeout(() => setTextIndex(1), 2500),
            setTimeout(() => setTextIndex(2), 5500),
            setTimeout(() => setIntroPhase(2), 8500),
        ];
        return () => timers.forEach(clearTimeout);
    }, [introPhase]);

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-charcoal-deep">
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 2]}>
                    <Suspense fallback={null}>
                        <IntroParticles />
                    </Suspense>
                </Canvas>
            </div>

            <GrungeOverlay />

            {/* Fase 0: convergencia */}
            <AnimatePresence>
                {introPhase === 0 && (
                    <motion.div
                        key="converge-phase"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0 z-30 flex items-center justify-center"
                    >
                        <motion.div
                            initial={{ x: '-50vw', opacity: 0 }}
                            animate={{
                                x: convergeComplete ? '-5vw' : '-5vw',
                                opacity: 1,
                            }}
                            transition={{
                                x: { duration: 2.5, ease: [0.05, 0.9, 0.3, 1] },
                                opacity: { duration: 0.5 },
                            }}
                            className="absolute z-10"
                        >
                            <FloatingChibi />
                        </motion.div>

                        <motion.div
                            initial={{ x: '50vw', opacity: 0 }}
                            animate={{
                                x: convergeComplete ? '5vw' : '5vw',
                                opacity: 1,
                            }}
                            transition={{
                                x: { duration: 2.5, ease: [0.05, 0.9, 0.3, 1] },
                                opacity: { duration: 0.5 },
                            }}
                            className="absolute z-10"
                        >
                            <motion.div
                                animate={{
                                    y: [0, -4, 0, -2, 0],
                                }}
                                transition={{
                                    y: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
                                }}
                            >
                                <Image
                                    src="/images/iconos/puerta_minecraft.png"
                                    alt="Puerta Minecraft"
                                    width={140}
                                    height={180}
                                    className="drop-shadow-[0_0_40px_rgba(139,90,43,0.5)]"
                                    priority
                                />
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ scaleY: 0, opacity: 0 }}
                            animate={{ scaleY: 1, opacity: 0.3 }}
                            transition={{ delay: 1.5, duration: 1 }}
                            className="absolute w-[1px] h-[40vh] bg-gradient-to-b from-transparent via-bone to-transparent"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Fase 1: textos */}
            <AnimatePresence>
                {introPhase === 1 && (
                    <motion.div
                        key="text-phase"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 z-30 flex flex-col items-center justify-center"
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

                        <div className="absolute top-[35%] w-full h-[1px] bg-gradient-to-r from-transparent via-crimson/20 to-transparent" />
                        <div className="absolute bottom-[35%] w-full h-[1px] bg-gradient-to-r from-transparent via-bone/10 to-transparent" />

                        <div className="flex flex-col items-center gap-4 relative z-20">
                            <AnimatePresence mode="wait">
                                {textIndex >= 0 && textIndex < INTRO_LINES.length && (
                                    <motion.div
                                        key={`text-${textIndex}`}
                                        initial={{ opacity: 0, y: 20, filter: 'blur(12px)' }}
                                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                        exit={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
                                        transition={{ duration: 0.7, ease: 'easeOut' }}
                                        className="text-center"
                                    >
                                        <p className="font-serif text-2xl md:text-4xl text-bone/90 tracking-wide leading-relaxed drop-shadow-lg">
                                            {INTRO_LINES[textIndex].text}
                                        </p>
                                        {INTRO_LINES[textIndex].sub && (
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.4 }}
                                                className="font-mono text-xs md:text-sm text-crimson-light/50 tracking-[0.3em] uppercase mt-3"
                                            >
                                                {INTRO_LINES[textIndex].sub}
                                            </motion.p>
                                        )}
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
                                Preparando acertijo
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Fase 2: juego de memoria */}
            <AnimatePresence>
                {introPhase === 2 && (
                    <motion.div
                        key="game-phase"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="absolute inset-0 z-20"
                    >
                        <MemoryStage />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-crimson/20 z-50 pointer-events-none" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-crimson/20 z-50 pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-crimson/20 z-50 pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-crimson/20 z-50 pointer-events-none" />
        </div>
    );
}
