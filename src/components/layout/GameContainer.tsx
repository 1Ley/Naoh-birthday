'use client';

import { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import SceneManager from '@/components/layout/SceneManager';
import GrungeOverlay from '@/components/ui/GrungeOverlay';
import StageTransition from '@/components/ui/StageTransition';
import QuizStage from '@/components/stages/QuizStage';
import MemoryStage from '@/components/stages/MemoryStage';
import RunnerStage from '@/components/stages/RunnerStage';
import FinaleStage from '@/components/stages/FinaleStage';

function StageUI() {
    const currentStage = useGameStore((s) => s.currentStage);

    return (
        <AnimatePresence mode="wait">
            {currentStage === 'quiz' && <StageTransition key="quiz"><QuizStage /></StageTransition>}
            {currentStage === 'memory' && <StageTransition key="memory"><MemoryStage /></StageTransition>}
            {currentStage === 'runner' && <StageTransition key="runner"><RunnerStage /></StageTransition>}
            {currentStage === 'finale' && <StageTransition key="finale"><FinaleStage /></StageTransition>}
        </AnimatePresence>
    );
}

export default function GameContainer() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef} className="relative w-screen h-screen overflow-hidden bg-charcoal-deep">
            {/* Capa 0: Canvas R3F (fondo) */}
            <div className="absolute inset-0 z-0">
                <Canvas
                    camera={{ position: [0, 0, 5], fov: 60 }}
                    gl={{ antialias: true, alpha: true }}
                    dpr={[1, 2]}
                >
                    <Suspense fallback={null}>
                        <SceneManager />
                        <Preload all />
                    </Suspense>
                </Canvas>
            </div>

            {/* Capa 1: Overlay grunge (decorativo) */}
            <GrungeOverlay />

            {/* Capa 2: Interfaz UI (primer plano) */}
            <div className="absolute inset-0 z-20">
                <StageUI />
            </div>

            {/* Panel de desarrollo — selector de etapas temporal */}
            <DevPanel />
        </div>
    );
}

function DevPanel() {
    const { currentStage, setStage } = useGameStore();
    const stages = ['quiz', 'memory', 'runner', 'finale'] as const;

    if (process.env.NODE_ENV !== 'development') return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 flex gap-2 bg-black/80 backdrop-blur-sm p-3 rounded-lg border border-crimson-light/30">
            {stages.map((stage) => (
                <button
                    key={stage}
                    onClick={() => setStage(stage)}
                    className={`px-3 py-1.5 text-xs rounded font-mono uppercase tracking-wider transition-all ${currentStage === stage
                            ? 'bg-crimson text-bone'
                            : 'bg-charcoal text-bone/50 hover:text-bone hover:bg-charcoal/80'
                        }`}
                >
                    {stage}
                </button>
            ))}
        </div>
    );
}
