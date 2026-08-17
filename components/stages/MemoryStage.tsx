'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { MEMORY_PAIRS } from '@/lib/constants';

interface Card {
    id: string;
    pairId: string;
    label: string;
    image: string;
    isFlipped: boolean;
    isMatched: boolean;
}

function createShuffledDeck(): Card[] {
    const cards: Card[] = [];

    MEMORY_PAIRS.forEach((pair) => {
        cards.push(
            { id: `${pair.id}-a`, pairId: pair.id, label: pair.label, image: pair.image, isFlipped: false, isMatched: false },
            { id: `${pair.id}-b`, pairId: pair.id, label: pair.label, image: pair.image, isFlipped: false, isMatched: false }
        );
    });

    // Fisher-Yates shuffle
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    return cards;
}

function MemoryCard({
    card,
    onClick,
}: {
    card: Card;
    onClick: () => void;
}) {
    const isRevealed = card.isFlipped || card.isMatched;

    return (
        <motion.div
            onClick={!isRevealed ? onClick : undefined}
            className={`
                relative aspect-[4/5] cursor-pointer group
                ${card.isMatched ? 'opacity-50 grayscale' : ''}
            `}
            style={{ perspective: '1000px' }}
            whileHover={!isRevealed ? { scale: 1.05, z: 20 } : {}}
            whileTap={!isRevealed ? { scale: 0.95 } : {}}
        >
            <motion.div
                className="w-full h-full relative transition-all duration-300"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: isRevealed ? 180 : 0 }}
                transition={{ duration: 0.25, ease: 'circOut' }}
            >
                {/* reverso de la carta */}
                <div
                    className="absolute inset-0 bg-[#0f0f0f] border border-white/10 flex items-center justify-center overflow-hidden"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <div className="absolute inset-0 opacity-30 mix-blend-overlay"
                        style={{
                            backgroundImage: 'url(/images/ui/de675e563185717d385ad932558bef4a.jpg)',
                            backgroundSize: 'cover',
                        }}
                    />

                    <div className="absolute inset-2 border border-white/5 opacity-50">
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-crimson/50" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-crimson/50" />
                    </div>

                    <div className="relative z-10">
                        <div className="w-8 h-8 rounded-full border border-crimson/30 flex items-center justify-center bg-crimson/5">
                            <span className="text-crimson text-xs font-tech">X</span>
                        </div>
                    </div>

                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-crimson/10 to-transparent" />
                </div>

                {/* frente de la carta */}
                <div
                    className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center overflow-hidden backdrop-blur-sm rounded-lg"
                    style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                    }}
                >
                    <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-white/10 to-transparent" />

                    <div className="relative w-16 h-16 md:w-20 md:h-20 z-10 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                        <Image
                            src={card.image}
                            alt={card.label}
                            fill
                            className="object-contain"
                            style={{ imageRendering: 'pixelated' }}
                        />
                    </div>

                    <div className="absolute bottom-2 left-0 w-full text-center opacity-80">
                        <p className="text-[9px] font-tech text-bone/60 uppercase tracking-widest leading-none">
                            {card.label}
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function MemoryStage() {
    const router = useRouter();
    const [cards, setCards] = useState<Card[]>(() => createShuffledDeck());
    const [flippedIds, setFlippedIds] = useState<string[]>([]);
    const [matchCount, setMatchCount] = useState(0);
    const [isChecking, setIsChecking] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const handleCardClick = useCallback(
        (cardId: string) => {
            if (isChecking) return;
            if (flippedIds.length >= 2) return;
            if (flippedIds.includes(cardId)) return;

            const newFlipped = [...flippedIds, cardId];
            setFlippedIds(newFlipped);

            setCards((prev) =>
                prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c))
            );

            if (newFlipped.length === 2) {
                setIsChecking(true);
                const [firstId, secondId] = newFlipped;
                const first = cards.find((c) => c.id === firstId)!;
                const second = cards.find((c) => c.id === secondId)!;

                if (first.pairId === second.pairId) {
                    setTimeout(() => {
                        setCards((prev) =>
                            prev.map((c) =>
                                c.pairId === first.pairId ? { ...c, isMatched: true, isFlipped: false } : c
                            )
                        );
                        setMatchCount((prev) => prev + 1);
                        setFlippedIds([]);
                        setIsChecking(false);
                    }, 500);
                } else {
                    setTimeout(() => {
                        setCards((prev) =>
                            prev.map((c) =>
                                newFlipped.includes(c.id) ? { ...c, isFlipped: false } : c
                            )
                        );
                        setFlippedIds([]);
                        setIsChecking(false);
                    }, 750);
                }
            }
        },
        [cards, flippedIds, isChecking]
    );

    useEffect(() => {
        if (matchCount === MEMORY_PAIRS.length) {
            setTimeout(() => setIsComplete(true), 500);
            setTimeout(() => router.push('/cinematic-runner'), 3000);
        }
    }, [matchCount, router]);

    return (
        <div className="relative w-full h-full flex overflow-hidden">

            {/* scanlines de fondo */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20" />

            <div className="absolute -bottom-10 -right-10 w-[40rem] h-52 z-0 opacity-60 rotate-[-5deg] pointer-events-none hidden md:block">
                <Image
                    src="/images/ui/de675e563185717d385ad932558bef4a.jpg"
                    alt="Banner"
                    fill
                    className="object-contain mix-blend-screen"
                />
            </div>

            {/* columna izquierda: personaje */}
            <div className="hidden md:flex w-[45%] h-full relative items-end justify-center z-10">
                <div className="relative w-full h-[95%]">
                    <Image
                        src="/images/characters/arlecchino_gfxrender1.png"
                        alt="Arlecchino"
                        fill
                        className="object-contain object-bottom drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                        priority
                    />
                </div>

                <div className="absolute top-1/2 left-10 -translate-y-1/2 -z-10 opacity-5">
                    <h1 className="text-[15vh] font-black text-white leading-none writing-vertical-rl rotate-180 uppercase tracking-tighter mix-blend-overlay">
                        MEMORY
                    </h1>
                </div>
            </div>

            {/* columna derecha: tablero */}
            <div className="w-full md:w-[55%] h-full relative z-20 flex flex-col items-center justify-center p-6 md:p-12">

                <div className="w-full max-w-xl flex justify-between items-end mb-8 border-b border-white/10 pb-4">
                    <div>
                        <p className="font-tech text-[10px] text-crimson tracking-[0.3em] uppercase mb-1">
                            System_Check: Active
                        </p>
                        <h2 className="font-gfx font-bold text-2xl md:text-3xl text-white uppercase italic tracking-tighter flex items-center gap-2">
                            Resuelve el acertijo
                        </h2>
                    </div>
                    <div className="text-right">
                        <div className="flex gap-[2px] justify-end mb-1 h-4 items-end">
                            {MEMORY_PAIRS.map((_, i) => (
                                <motion.div
                                    key={i}
                                    className={`w-1 bg-white/20 ${i < matchCount ? 'bg-crimson h-full' : 'h-2'}`}
                                    animate={i < matchCount ? { height: '100%', backgroundColor: '#DC143C' } : {}}
                                />
                            ))}
                        </div>
                        <p className="font-tech text-xs text-white/40">
                            DATA: {matchCount}/{MEMORY_PAIRS.length}
                        </p>
                    </div>
                </div>

                <div className="relative w-full max-w-xl">

                    <div className="absolute -top-10 -right-10 w-40 h-40 opacity-20 pointer-events-none rotate-12 z-0">
                        <Image
                            src="/images/ui/e43c4b2798aa02de174ec32b6df4d2ba-removebg-preview.png"
                            alt="Deco"
                            fill
                            className="object-contain"
                        />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="grid grid-cols-4 gap-3 md:gap-4 relative z-10"
                    >
                        {cards.map((card) => (
                            <MemoryCard
                                key={card.id}
                                card={card}
                                onClick={() => handleCardClick(card.id)}
                            />
                        ))}
                    </motion.div>
                </div>

                <div className="absolute bottom-8 right-12 text-right opacity-30 hidden md:block">
                    <p className="font-tech text-[9px] uppercase tracking-widest">
                        Arlecchino Birthday Event<br />
                        Protocol: Memory_Link
                    </p>
                </div>
            </div>

            {/* overlay de victoria */}
            <AnimatePresence>
                {isComplete && (
                    <motion.div
                        initial={{ clipPath: 'inset(0 100% 0 0)' }}
                        animate={{ clipPath: 'inset(0 0 0 0)' }}
                        transition={{ duration: 0.5, ease: 'circOut' }}
                        className="fixed inset-0 z-50 bg-crimson/90 mix-blend-multiply flex items-center justify-center pointer-events-none"
                    >
                        <div className="relative z-10 text-center transform -skew-x-12">
                            <h2 className="text-8xl md:text-[10rem] font-black text-white italic tracking-tighter leading-none">
                                LINK<br />ESTABLISHED
                            </h2>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
