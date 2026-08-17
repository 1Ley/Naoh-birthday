'use client';

import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import GrungeOverlay from '@/components/ui/GrungeOverlay';
import QuizStage from '@/components/stages/QuizStage';

function QuizScene() {
    return (
        <>
            <color attach="background" args={['#0a0a0a']} />
            <ambientLight intensity={0.2} color="#4a0404" />
            <pointLight position={[2, 3, 4]} intensity={0.5} color="#8b1a1a" />
            <Sparkles count={60} scale={12} size={2} speed={0.2} color="#8b1a1a" opacity={0.3} />
            <fog attach="fog" args={['#0a0a0a', 3, 15]} />
        </>
    );
}

function IntroParticles() {
    const count = 30;
    const positions = new Float32Array(count * 3);

    const rand = (seed: number) => {
        const x = Math.sin(seed * 9999) * 10000;
        return x - Math.floor(x);
    };

    for (let i = 0; i < count * 3; i++) {
        positions[i] = (rand(i + 1) - 0.5) * 20;
    }

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial size={0.03} color="#8b1a1a" transparent opacity={0.4} sizeAttenuation />
        </points>
    );
}

function FloatingChibi() {
    return (
        <motion.div
            className="relative z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{
                opacity: 1,
                y: [0, -8, 0, -4, 0],
                rotate: [0, -2, 0, 2, 0],
            }}
            transition={{
                opacity: { duration: 1, delay: 0.5 },
                y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
                rotate: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
            }}
        >
            <motion.div
                animate={{ x: [-20, 20, -20] }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            >
                <Image
                    src="/images/characters/arlecchino_chibi.png"
                    alt="Arlecchino Chibi"
                    width={180}
                    height={180}
                    className="drop-shadow-[0_0_40px_rgba(139,26,26,0.6)] pointer-events-none"
                    priority
                />
            </motion.div>
        </motion.div>
    );
}

const INTRO_LINES = [
    { text: 'OPERACIÓN EN CURSO', style: 'mono', delay: 0.3 },
    { text: 'Yendo hacia la casa de Furina...', style: 'serif', delay: 1.2 },
    { text: 'Inicia el Cuestionario', style: 'serif-large', delay: 3.5 },
];

export default function GameGuessPage() {
    const [introPhase, setIntroPhase] = useState(0); // 0=cinematic, 1=quiz
    const [textIndex, setTextIndex] = useState(0);

    // Avanzar textos cinemáticos
    useEffect(() => {
        if (introPhase !== 0) return;

        const timers = [
            setTimeout(() => setTextIndex(1), 2500),
            setTimeout(() => setTextIndex(2), 6000),
            setTimeout(() => setIntroPhase(1), 9500),
        ];

        return () => timers.forEach(clearTimeout);
    }, [introPhase]);

    return (
        <div className="relative w-screen h-screen overflow-hidden">
            {/* Fondo degradado (mismo estilo que intro) */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-zinc-100 via-zinc-300 to-[#1a0505]" />

            {/* Canvas 3D */}
            <div className="absolute inset-0 z-[1] mix-blend-multiply opacity-60">
                <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 2]}>
                    <Suspense fallback={null}>
                        <QuizScene />
                        {introPhase === 0 && <IntroParticles />}
                    </Suspense>
                </Canvas>
            </div>

            {/* Overlay grunge */}
            <GrungeOverlay />

            {/* Fase 0: intro cinemática */}
            <AnimatePresence>
                {introPhase === 0 && (
                    <motion.div
                        key="cinematic-intro"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0 z-20 flex flex-col items-center justify-center"
                    >
                        {/* Grid decorativo del fondo */}
                        <div className="absolute inset-0 opacity-[0.03]"
                            style={{
                                backgroundImage: 'linear-gradient(rgba(139,26,26,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,26,26,0.3) 1px, transparent 1px)',
                                backgroundSize: '60px 60px',
                            }}
                        />

                        {/* Líneas decorativas horizontales */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 2, ease: 'easeOut' }}
                            className="absolute top-[30%] w-3/4 h-[1px] bg-gradient-to-r from-transparent via-crimson/30 to-transparent"
                        />
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 2, delay: 0.2, ease: 'easeOut' }}
                            className="absolute bottom-[30%] w-3/4 h-[1px] bg-gradient-to-r from-transparent via-crimson/30 to-transparent"
                        />

                        {/* Chibi Arlecchino (independiente de los textos) */}
                        <div className="mb-8">
                            <FloatingChibi />
                        </div>

                        {/* Textos cinemáticos */}
                        <div className="flex flex-col items-center gap-4 relative z-20 mt-8">
                            <AnimatePresence mode="wait">
                                {textIndex >= 0 && textIndex < INTRO_LINES.length && (
                                    <motion.div
                                        key={textIndex}
                                        initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                        exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
                                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                        className="text-center"
                                    >
                                        {INTRO_LINES[textIndex].style === 'mono' && (
                                            <p className="font-mono text-xs md:text-sm uppercase tracking-[0.5em] text-crimson-light/80 drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
                                                {INTRO_LINES[textIndex].text}
                                            </p>
                                        )}
                                        {INTRO_LINES[textIndex].style === 'serif' && (
                                            <p className="font-serif text-xl md:text-3xl text-bone/90 italic drop-shadow-[0_0_15px_rgba(0,0,0,0.9)]">
                                                {INTRO_LINES[textIndex].text}
                                            </p>
                                        )}
                                        {INTRO_LINES[textIndex].style === 'serif-large' && (
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="w-16 h-[1px] bg-crimson-light/50 mx-auto" />
                                                <h1 className="font-serif text-3xl md:text-5xl text-bone font-bold tracking-wider drop-shadow-[0_0_20px_rgba(0,0,0,0.9)]">
                                                    {INTRO_LINES[textIndex].text}
                                                </h1>
                                                <div className="w-16 h-[1px] bg-crimson-light/50 mx-auto" />
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Indicador de carga */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="absolute bottom-12 flex flex-col items-center gap-2"
                        >
                            <div className="w-32 h-[2px] bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-crimson-light/60 rounded-full"
                                    initial={{ width: '0%' }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: 9, ease: 'linear' }}
                                />
                            </div>
                            <p className="text-[9px] font-mono text-bone/20 uppercase tracking-widest">
                                Preparando cuestionario
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Fase 1: quiz activo */}
            <AnimatePresence>
                {introPhase === 1 && (
                    <motion.div
                        key="quiz-phase"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="absolute inset-0 z-20"
                    >
                        <QuizStage />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Esquinas decorativas (siempre visibles) */}
            <div className="absolute top-4 left-4 z-30 w-8 h-8 border-t border-l border-crimson/20" />
            <div className="absolute top-4 right-4 z-30 w-8 h-8 border-t border-r border-crimson/20" />
            <div className="absolute bottom-4 left-4 z-30 w-8 h-8 border-b border-l border-crimson/20" />
            <div className="absolute bottom-4 right-4 z-30 w-8 h-8 border-b border-r border-crimson/20" />
        </div>
    );
}
