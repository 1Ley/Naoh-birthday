'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { QUIZ_QUESTIONS } from '@/lib/constants';

// Imágenes que rotarán según el progreso del quiz
const CHARACTER_IMAGES = [
    '/images/characters/arlecchino_gfxrender1.png', // Preguntas 1-2
    '/images/characters/arlecchino_fullbody.png',  // Preguntas 3-4
    '/images/ui/b1e03c89bc8aa8946cd76a34fb01c6f0.png', // Pregunta 5 (Requested UI Asset)
];

export default function QuizStage() {
    const router = useRouter();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    // Calcular imagen actual basada en el progreso
    const currentImageIndex = Math.min(
        Math.floor(currentQuestion / 2),
        CHARACTER_IMAGES.length - 1
    );

    const question = QUIZ_QUESTIONS[currentQuestion];

    const handleAnswer = useCallback(
        (index: number) => {
            if (selectedAnswer !== null) return;

            setSelectedAnswer(index);
            const correct = index === question.correctIndex;
            setIsCorrect(correct);
            setShowResult(true);

            setTimeout(() => {
                if (correct) {
                    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
                        setCurrentQuestion((prev) => prev + 1);
                        setSelectedAnswer(null);
                        setIsCorrect(null);
                        setShowResult(false);
                    } else {
                        setIsComplete(true);
                        setTimeout(() => router.push('/game-memory'), 2500);
                    }
                } else {
                    setSelectedAnswer(null);
                    setIsCorrect(null);
                    setShowResult(false);
                }
            }, 1500);
        },
        [selectedAnswer, question, currentQuestion, router]
    );

    return (
        <div className="relative w-full h-full flex flex-col md:flex-row overflow-hidden">
            {/* ════════════════════════════════════════════
                BACKGROUND & DECOR
            ════════════════════════════════════════════ */}
            {/* Texto gigante de fondo "THE KNAVE" */}
            <div className="absolute top-20 left-10 z-0 opacity-[0.03] select-none pointer-events-none">
                <h1 className="font-black text-[20vw] leading-none tracking-tighter text-white">
                    KNAVE
                </h1>
            </div>

            {/* ════════════════════════════════════════════
                COLUMNA IZQUIERDA: QUIZ UI
            ════════════════════════════════════════════ */}
            <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-8 md:px-24 relative z-40 bg-gradient-to-r from-charcoal-deep/95 via-charcoal-deep/80 to-transparent">

                {/* Header GFX */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-12 ml-4 md:ml-12"
                >
                    <div className="flex items-center gap-4 mb-2">
                        <span className="px-3 py-1 bg-bone text-charcoal-deep font-bold text-xs uppercase tracking-widest rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                            Arlecchino
                        </span>
                        <span className="px-3 py-1 border border-bone/30 text-bone/60 font-mono text-xs uppercase tracking-widest rounded-full backdrop-blur-sm">
                            The Knave
                        </span>
                    </div>
                    <h2 className="font-black italic text-5xl md:text-7xl text-white tracking-tighter leading-[0.9] drop-shadow-2xl">
                        CONOCE A <br /> <span className="text-crimson text-glow">ARLECCHINO</span>
                    </h2>
                    <p className="mt-6 text-bone/60 font-mono text-xs md:text-sm max-w-md border-l-2 border-crimson pl-4 leading-relaxed">
                        &quot;Un niño debe crecer y superar a sus padres. Solo así la familia puede prosperar.&quot;
                    </p>
                </motion.div>

                {/* Pregunta Activa */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={question.id}
                        initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
                        transition={{ duration: 0.4, ease: 'circOut' }}
                        className="w-full max-w-lg ml-4 md:ml-12"
                    >
                        {/* Contador de pregunta */}
                        <div className="flex items-end gap-2 mb-6">
                            <span className="text-5xl font-black text-crimson-glow/80 tracking-tighter">
                                0{currentQuestion + 1}
                            </span>
                            <span className="text-sm font-mono text-bone/30 mb-2">
                                / 0{QUIZ_QUESTIONS.length}
                            </span>
                            <div className="h-[2px] flex-1 bg-gradient-to-r from-crimson/50 to-transparent mb-3 ml-4" />
                        </div>

                        <h3 className="text-xl md:text-2xl font-serif text-white mb-8 leading-relaxed drop-shadow-lg">
                            {question.question}
                        </h3>

                        <div className="grid grid-cols-1 gap-3">
                            {question.options.map((option, index) => {
                                const isSelected = selectedAnswer === index;
                                const isCorrectOption = index === question.correctIndex;
                                const showHighlight = showResult && isCorrectOption;

                                return (
                                    <motion.button
                                        key={index}
                                        onClick={() => handleAnswer(index)}
                                        disabled={selectedAnswer !== null}
                                        whileHover={selectedAnswer === null ? { x: 10, backgroundColor: 'rgba(255,255,255,0.05)' } : {}}
                                        whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                                        className={`
                                            group relative w-full text-left p-4 md:p-5 border-l-4 transition-all duration-300 overflow-hidden
                                            ${showHighlight
                                                ? 'border-l-green-500 bg-green-500/10 shadow-[0_0_30px_rgba(34,197,94,0.1)]'
                                                : isSelected && !isCorrect
                                                    ? 'border-l-red-500 bg-red-500/10 shadow-[0_0_30px_rgba(239,68,68,0.1)]'
                                                    : 'border-l-bone/20 hover:border-l-crimson bg-white/[0.03] hover:bg-white/[0.05]'
                                            }
                                        `}
                                    >
                                        <div className="relative z-10 flex justify-between items-center">
                                            <span className={`font-mono text-sm tracking-wider uppercase transition-colors ${showHighlight ? 'text-green-400 font-bold' : isSelected && !isCorrect ? 'text-red-400 font-bold' : 'text-bone/80 group-hover:text-white'
                                                }`}>
                                                {option}
                                            </span>
                                            {showHighlight && <span className="text-green-400 font-bold text-xs tracking-widest">CORRECTO</span>}
                                            {isSelected && !isCorrect && <span className="text-red-400 font-bold text-xs tracking-widest">ERROR</span>}
                                        </div>

                                        {/* Barra de progreso de selección (animación) */}
                                        {isSelected && (
                                            <motion.div
                                                layoutId="selection-bar"
                                                className={`absolute inset-0 z-0 ${isCorrect ? 'bg-green-500/10' : 'bg-red-500/10'}`}
                                            />
                                        )}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* ════════════════════════════════════════════
                COLUMNA DERECHA: IMAGEN DE PERSONAJE
            ════════════════════════════════════════════ */}
            <div className="hidden md:block w-1/2 h-full relative z-10 pointer-events-none">
                {/* Círculo decorativo rotando detrás del personaje (Centrado en la columna) */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vh] h-[60vh] rounded-full border border-white/40 opacity-50 z-0 shadow-[0_0_60px_rgba(255,255,255,0.15)]">
                    <div className="absolute inset-0 rounded-full border-[4px] border-t-white/90 border-r-transparent border-b-white/30 border-l-transparent animate-[spin_8s_linear_infinite]" />
                    <div className="absolute inset-4 rounded-full border-[1px] border-white/20" />
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0, x: 50, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -20, scale: 1.05 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute inset-0 flex items-end justify-center"
                    >
                        <div className={`relative w-full transition-all duration-700 ${currentImageIndex === 0 ? 'h-[95%] scale-105 origin-bottom' : 'h-[85%]'}`}>
                            <Image
                                src={CHARACTER_IMAGES[currentImageIndex]}
                                alt="Arlecchino GFX"
                                fill
                                className="object-contain object-bottom drop-shadow-[0_0_50px_rgba(0,0,0,0.8)]"
                                priority
                            />
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* DEGRADADO INFERIOR GLOBAL (Fixed: Full width bottom gradient) */}
            <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-charcoal-deep via-charcoal-deep/90 to-transparent pointer-events-none z-10" />

            {/* Overlay de Victoria (Estilo GFX) */}
            <AnimatePresence>
                {isComplete && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-[60] bg-black/90 flex flex-col items-center justify-center pointer-events-none"
                    >
                        <motion.h1
                            initial={{ scale: 2, filter: 'blur(20px)' }}
                            animate={{ scale: 1, filter: 'blur(0px)' }}
                            transition={{ duration: 0.5, type: 'spring' }}
                            className="font-black italic text-6xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 tracking-tighter"
                        >
                            COMPLETE
                        </motion.h1>
                        <p className="mt-4 font-mono text-crimson text-xl tracking-[0.5em] uppercase">
                            Procediendo a la siguiente fase
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
