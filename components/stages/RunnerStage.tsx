'use client';

import { useState, useEffect, useCallback, useRef, type CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const LANE_COUNT = 3;
const LANE_POSITIONS = [20, 50, 80]; // % from top
const GAME_TICK = 33; // ~30fps
const SLIME_SPAWN_MS = 1200;
const STAR_SPAWN_MS = 3500;
const FURINA_BASE_SPEED = 0.08; // % per tick (approach speed)
const FURINA_STAR_BOOST = 0.25;
const FURINA_HIT_PENALTY = 8; // % pushed back on hit
const SLIME_SPEED = 2.2; // % per tick moving left
const STAR_SPEED = 1.8;
const ARLE_X = 12; // Arle's fixed X position (%)
const FURINA_START_X = 95; // Furina starts at right edge
const CAPTURE_THRESHOLD = 22; // When Furina X <= this, captured

interface Obstacle {
    id: string;
    lane: number;
    x: number;
    type: 'slime' | 'star';
}

let obstacleCounter = 0;

// Tiled background band. It pans one full tile per cycle, so the loop never shows a seam.
function panLayer(src: string, tileWidth: number): CSSProperties {
    return {
        backgroundImage: `url(${src})`,
        backgroundSize: `${tileWidth}px 100%`,
        backgroundRepeat: 'repeat-x',
        backgroundPosition: 'bottom left',
        '--pan': `-${tileWidth}px`,
    } as CSSProperties;
}

export default function RunnerStage() {
    const router = useRouter();
    const [playerLane, setPlayerLane] = useState(1); // 0, 1, 2
    const [furinaX, setFurinaX] = useState(FURINA_START_X);
    const [obstacles, setObstacles] = useState<Obstacle[]>([]);
    const [gameActive, setGameActive] = useState(true);
    const [isCaptured, setIsCaptured] = useState(false);
    const [hitFlash, setHitFlash] = useState(false);
    const [starBoost, setStarBoost] = useState(false);
    const [showCountdown, setShowCountdown] = useState(true);
    const [countdownNum, setCountdownNum] = useState(3);
    const [comboCount, setComboCount] = useState(0);
    const [showStarEffect, setShowStarEffect] = useState(false);

    const gameLoopRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const spawnSlimeRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const spawnStarRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const lastLaneChangeRef = useRef(0);
    const starBoostTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const playerLaneRef = useRef(1);

    useEffect(() => { playerLaneRef.current = playerLane; }, [playerLane]);

    useEffect(() => {
        if (!showCountdown) return;
        const timers = [
            setTimeout(() => setCountdownNum(2), 1000),
            setTimeout(() => setCountdownNum(1), 2000),
            setTimeout(() => {
                setCountdownNum(0);
                setTimeout(() => setShowCountdown(false), 500);
            }, 3000),
        ];
        return () => timers.forEach(clearTimeout);
    }, [showCountdown]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Lane switching with debounce
            const now = Date.now();
            if (now - lastLaneChangeRef.current < 150) return;

            if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
                setPlayerLane(prev => Math.max(0, prev - 1));
                lastLaneChangeRef.current = now;
            }
            if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
                setPlayerLane(prev => Math.min(LANE_COUNT - 1, prev + 1));
                lastLaneChangeRef.current = now;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleLaneClick = useCallback((lane: number) => {
        if (!gameActive || showCountdown) return;
        setPlayerLane(lane);
    }, [gameActive, showCountdown]);

    useEffect(() => {
        if (!gameActive || showCountdown) return;

        spawnSlimeRef.current = setInterval(() => {
            const lane = Math.floor(Math.random() * LANE_COUNT);
            setObstacles(prev => [
                ...prev,
                {
                    id: `obs-${obstacleCounter++}`,
                    lane,
                    x: 105,
                    type: 'slime',
                },
            ]);
        }, SLIME_SPAWN_MS);

        return () => {
            if (spawnSlimeRef.current) clearInterval(spawnSlimeRef.current);
        };
    }, [gameActive, showCountdown]);

    useEffect(() => {
        if (!gameActive || showCountdown) return;

        spawnStarRef.current = setInterval(() => {
            const lane = Math.floor(Math.random() * LANE_COUNT);
            setObstacles(prev => [
                ...prev,
                {
                    id: `star-${obstacleCounter++}`,
                    lane,
                    x: 105,
                    type: 'star',
                },
            ]);
        }, STAR_SPAWN_MS);

        return () => {
            if (spawnStarRef.current) clearInterval(spawnStarRef.current);
        };
    }, [gameActive, showCountdown]);

    // Main game loop
    useEffect(() => {
        if (!gameActive || showCountdown) return;

        gameLoopRef.current = setInterval(() => {
            setFurinaX(prev => {
                const speed = starBoost ? FURINA_STAR_BOOST : FURINA_BASE_SPEED;
                const next = prev - speed;
                if (next <= CAPTURE_THRESHOLD) {
                    setGameActive(false);
                    setIsCaptured(true);
                    return CAPTURE_THRESHOLD;
                }
                return next;
            });

            setObstacles(prev => {
                const currentLane = playerLaneRef.current;
                const remaining: Obstacle[] = [];

                for (const obs of prev) {
                    const newX = obs.x - (obs.type === 'slime' ? SLIME_SPEED : STAR_SPEED);

                    const inPlayerZone = newX >= ARLE_X - 6 && newX <= ARLE_X + 10;
                    const inPlayerLane = obs.lane === currentLane;

                    if (inPlayerZone && inPlayerLane) {
                        if (obs.type === 'slime') {
                            setFurinaX(f => Math.min(FURINA_START_X, f + FURINA_HIT_PENALTY));
                            setHitFlash(true);
                            setComboCount(0);
                            setTimeout(() => setHitFlash(false), 300);
                        } else {
                            setStarBoost(true);
                            setShowStarEffect(true);
                            setComboCount(c => c + 1);
                            setTimeout(() => setShowStarEffect(false), 600);
                            if (starBoostTimerRef.current) clearTimeout(starBoostTimerRef.current);
                            starBoostTimerRef.current = setTimeout(() => setStarBoost(false), 2500);
                        }
                        continue; // Remove this obstacle
                    }

                    // Remove if off screen
                    if (newX > -10) {
                        remaining.push({ ...obs, x: newX });
                    }
                }
                return remaining;
            });
        }, GAME_TICK);

        return () => {
            if (gameLoopRef.current) clearInterval(gameLoopRef.current);
        };
    }, [gameActive, showCountdown, starBoost]);

    useEffect(() => {
        if (!isCaptured) return;
        // Let the victory overlay play out before navigating
        const timer = setTimeout(() => router.push('/cart-birthday'), 5000);
        return () => clearTimeout(timer);
    }, [isCaptured, router]);

    // Progress 0-100
    const progress = Math.min(100, Math.max(0, ((FURINA_START_X - furinaX) / (FURINA_START_X - CAPTURE_THRESHOLD)) * 100));

    // Scenery freezes during the countdown and once Furina is caught
    const worldMoving = gameActive && !showCountdown;

    return (
        <div className="flex flex-col items-center justify-center w-full h-full relative overflow-hidden select-none">

            {/* Sky: charcoal up top, crimson down at the horizon */}
            <div
                className="absolute top-0 left-0 right-0 h-[35%] z-0 overflow-hidden"
                style={{ background: 'linear-gradient(to bottom, #0a0a0a 0%, #150808 48%, #2b0c0c 100%)' }}
            >
                {/* Crimson sun, half sunk behind the road */}
                <div
                    className="absolute left-[62%] bottom-[-32%] -translate-x-1/2"
                    style={{
                        height: '125%',
                        aspectRatio: '1 / 1',
                        backgroundImage: 'url(/textures/runner-sun.svg)',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                    }}
                />

                {/* Ridge line, slowest layer */}
                <div
                    className="absolute bottom-0 left-0 w-[300%] h-[58%]"
                    style={{
                        ...panLayer('/textures/runner-hills.svg', 900),
                        animation: 'runner-pan 34s linear infinite',
                        animationPlayState: worldMoving ? 'running' : 'paused',
                    }}
                />

                {/* Aqueduct arches, faster so it reads as closer */}
                <div
                    className="absolute bottom-0 left-0 w-[300%] h-[64%]"
                    style={{
                        ...panLayer('/textures/runner-arcade.svg', 520),
                        animation: 'runner-pan 9s linear infinite',
                        animationPlayState: worldMoving ? 'running' : 'paused',
                    }}
                />
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-[65%] z-[2] overflow-hidden">
                {/* Road base */}
                <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to bottom, #240e0e 0%, #170909 38%, #0c0505 100%)' }}
                />

                {/* Lane background tints: alternate shading so lanes are obvious */}
                {[0, 1, 2].map((i) => (
                    <div
                        key={`lane-bg-${i}`}
                        className="absolute left-0 right-0"
                        style={{
                            top: `${(i / 3) * 100}%`,
                            height: `${100 / 3}%`,
                            background: i % 2 === 0
                                ? 'rgba(196, 48, 48, 0.05)'
                                : 'rgba(245, 240, 235, 0.015)',
                        }}
                    />
                ))}

                {/* Dust streaks on the asphalt, just to sell the speed */}
                {[18, 42, 68, 88].map((top, i) => (
                    <div
                        key={`streak-${top}`}
                        className="absolute left-0 w-[300%] h-[1px]"
                        style={{
                            top: `${top}%`,
                            backgroundImage: 'repeating-linear-gradient(90deg, rgba(245,240,235,0.28) 0px, rgba(245,240,235,0.28) 30px, transparent 30px, transparent 200px)',
                            opacity: 0.16,
                            ['--pan' as string]: '-200px',
                            animation: `runner-pan ${0.85 - i * 0.13}s linear infinite`,
                            animationPlayState: worldMoving ? 'running' : 'paused',
                        }}
                    />
                ))}

                {/* Lane dividers */}
                {[33.33, 66.66].map((top) => (
                    <div key={top} className="absolute left-0 right-0" style={{ top: `${top}%` }}>
                        <div className="absolute left-0 right-0 h-[1px] bg-gold/10" />
                        <div
                            className="absolute left-0 w-[300%] h-[2px] -top-[0.5px]"
                            style={{
                                backgroundImage: 'repeating-linear-gradient(90deg, rgba(201,168,76,0.5) 0px, rgba(201,168,76,0.5) 44px, transparent 44px, transparent 120px)',
                                ['--pan' as string]: '-120px',
                                animation: 'runner-pan 0.5s linear infinite',
                                animationPlayState: worldMoving ? 'running' : 'paused',
                            }}
                        />
                    </div>
                ))}

                {/* Road edges */}
                <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-crimson/25 to-transparent" />
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-crimson-glow/25 to-transparent" />
            </div>

            {/* Vignette to keep the eye on the lanes */}
            <div
                className="absolute inset-0 z-[4] pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% 55%, transparent 45%, rgba(6,3,3,0.55) 100%)' }}
            />

            {/* Lane tap zones (mobile) */}
            <div className="absolute bottom-0 left-0 right-0 h-[65%] z-[3] md:pointer-events-none">
                {LANE_POSITIONS.map((_, i) => (
                    <div
                        key={`tap-${i}`}
                        className="absolute left-0 right-0 cursor-pointer"
                        style={{
                            top: `${(i / LANE_COUNT) * 100}%`,
                            height: `${100 / LANE_COUNT}%`,
                        }}
                        onClick={() => handleLaneClick(i)}
                    />
                ))}
            </div>

            {/* Arlecchino (player) */}
            <motion.div
                className="absolute z-[10] w-24 h-28 md:w-32 md:h-36"
                style={{ left: `${ARLE_X}%` }}
                animate={{
                    top: `${35 + LANE_POSITIONS[playerLane] * 0.65 - 14}%`,
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
                {/* Running animation (bob effect) */}
                <motion.div
                    className="relative w-full h-full"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.4, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <Image
                        src="/images/characters/arlecchino_chibi2.png"
                        alt="Arlecchino"
                        fill
                        className="object-contain drop-shadow-[0_0_20px_rgba(196,48,48,0.5)]"
                        style={{ transform: 'scaleX(1)' }}
                        priority
                    />
                    {/* Speed lines behind Arle */}
                    <div className="absolute top-1/2 -left-8 -translate-y-1/2 flex flex-col gap-1 opacity-40">
                        {[0, 1, 2].map(i => (
                            <motion.div
                                key={i}
                                className="h-[2px] bg-gradient-to-l from-crimson-glow to-transparent"
                                animate={{ width: ['20px', '40px', '20px'], opacity: [0.3, 0.7, 0.3] }}
                                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Hit flash overlay */}
                <AnimatePresence>
                    {hitFlash && (
                        <motion.div
                            initial={{ opacity: 0.8 }}
                            animate={{ opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 bg-red-500/50 rounded-lg pointer-events-none"
                        />
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Furina (target) */}
            <motion.div
                className="absolute z-[10] w-20 h-24 md:w-28 md:h-32"
                style={{
                    left: `${furinaX}%`,
                    top: `${35 + LANE_POSITIONS[1] * 0.65 - 12}%`, // Always in center lane
                }}
                animate={{
                    rotate: [-3, 3, -3],
                }}
                transition={{ duration: 0.5, repeat: Infinity }}
            >
                <motion.div
                    className="relative w-full h-full"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 0.35, repeat: Infinity }}
                >
                    <Image
                        src="/images/characters/chibi_furina.png"
                        alt="Furina"
                        fill
                        className="object-contain drop-shadow-[0_0_15px_rgba(74,144,226,0.5)]"
                        priority
                    />
                </motion.div>

                {/* Panic indicators */}
                {progress > 60 && (
                    <motion.div
                        className="absolute -top-6 left-1/2 -translate-x-1/2 text-lg"
                        animate={{ scale: [1, 1.3, 1], rotate: [-10, 10, -10] }}
                        transition={{ duration: 0.4, repeat: Infinity }}
                    >
                        💦
                    </motion.div>
                )}
            </motion.div>

            {obstacles.map((obs) => (
                <motion.div
                    key={obs.id}
                    className={`absolute z-[8] ${obs.type === 'slime' ? 'w-14 h-14 md:w-16 md:h-16' : 'w-10 h-10 md:w-12 md:h-12'}`}
                    style={{
                        left: `${obs.x}%`,
                        top: `${35 + LANE_POSITIONS[obs.lane] * 0.65 - (obs.type === 'slime' ? 8 : 6)}%`,
                    }}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                >
                    {obs.type === 'slime' ? (
                        <div className="relative w-full h-full">
                            <Image
                                src="/images/iconos/Enemy_Large_Hydro_Slime.webp"
                                alt="Hydro Slime"
                                fill
                                className="object-contain drop-shadow-[0_0_10px_rgba(74,144,226,0.6)]"
                            />
                            {/* Hydro glow */}
                            <div className="absolute inset-0 rounded-full bg-blue-400/10 blur-md" />
                        </div>
                    ) : (
                        <motion.div
                            className="relative w-full h-full flex items-center justify-center"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        >
                            <div className="text-3xl md:text-4xl drop-shadow-[0_0_12px_rgba(201,168,76,0.8)]">✦</div>
                            <div className="absolute inset-0 rounded-full bg-yellow-400/10 blur-md" />
                        </motion.div>
                    )}
                </motion.div>
            ))}

            <AnimatePresence>
                {showStarEffect && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1.5 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute z-[15] text-4xl pointer-events-none"
                        style={{ left: `${ARLE_X + 5}%`, top: `${35 + LANE_POSITIONS[playerLane] * 0.65 - 20}%` }}
                    >
                        ⚡
                    </motion.div>
                )}
            </AnimatePresence>

            {/* HUD */}
            <div className="absolute top-0 left-0 right-0 z-[20] p-4 md:p-6">
                {/* Top Bar */}
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <p className="text-[10px] font-tech text-crimson-glow/80 tracking-[0.3em] uppercase mb-1">
                            Persecución en Curso
                        </p>
                        <h2 className="font-gfx font-bold text-lg md:text-xl text-white uppercase italic tracking-tighter">
                            ¡Atrapa a Furina!
                        </h2>
                    </div>
                    <div className="text-right flex items-center gap-3">
                        {/* Boost indicator */}
                        {starBoost && (
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                                className="px-2 py-1 bg-gold/20 border border-gold/40 rounded text-[10px] font-tech text-gold uppercase"
                            >
                                ⚡ Boost
                            </motion.div>
                        )}
                        {/* Combo */}
                        {comboCount > 1 && (
                            <div className="px-2 py-1 bg-purple-500/20 border border-purple-500/40 rounded text-[10px] font-tech text-purple-300 uppercase">
                                x{comboCount} Combo
                            </div>
                        )}
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="relative w-full max-w-lg mx-auto">
                    <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/10 backdrop-blur-sm">
                        <motion.div
                            className="h-full rounded-full relative overflow-hidden"
                            style={{
                                width: `${progress}%`,
                                background: progress > 80
                                    ? 'linear-gradient(90deg, #c43030, #ff6b6b)'
                                    : progress > 50
                                        ? 'linear-gradient(90deg, #c9a84c, #e6d18e)'
                                        : 'linear-gradient(90deg, #4a90d9, #6bb5ff)',
                            }}
                            transition={{ duration: 0.1 }}
                        >
                            {/* Shimmer effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                animate={{ x: ['-100%', '200%'] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                            />
                        </motion.div>
                    </div>
                    {/* Progress labels */}
                    <div className="flex justify-between mt-1">
                        <div className="flex items-center gap-1">
                            <div className="w-3 h-3 rounded-full bg-crimson-glow/60" />
                            <span className="text-[9px] font-tech text-bone/40">ARLE</span>
                        </div>
                        <span className="text-[9px] font-tech text-bone/40">{Math.round(progress)}%</span>
                        <div className="flex items-center gap-1">
                            <span className="text-[9px] font-tech text-bone/40">FURINA</span>
                            <div className="w-3 h-3 rounded-full bg-blue-400/60" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[20] text-center"
            >
                <div className="flex items-center gap-3 px-4 py-2 bg-black/40 backdrop-blur-sm rounded-full border border-white/10">
                    <div className="flex flex-col items-center gap-[2px]">
                        <div className="w-6 h-5 rounded bg-white/10 border border-white/20 flex items-center justify-center text-[8px] font-tech text-bone/60">W</div>
                        <div className="w-6 h-5 rounded bg-white/10 border border-white/20 flex items-center justify-center text-[8px] font-tech text-bone/60">S</div>
                    </div>
                    <p className="text-[10px] font-tech text-bone/40">
                        Cambiar carril • Esquiva slimes • Recoge estrellas
                    </p>
                </div>
            </motion.div>

            <AnimatePresence>
                {showCountdown && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-[30] flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={countdownNum}
                                initial={{ scale: 2, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.5, opacity: 0 }}
                                transition={{ duration: 0.4, ease: 'backOut' }}
                                className="text-center"
                            >
                                {countdownNum > 0 ? (
                                    <span className="font-gfx text-8xl md:text-9xl font-black text-white italic drop-shadow-[0_0_40px_rgba(196,48,48,0.5)]">
                                        {countdownNum}
                                    </span>
                                ) : (
                                    <span className="font-gfx text-5xl md:text-7xl font-black text-crimson-glow italic tracking-tight drop-shadow-[0_0_40px_rgba(196,48,48,0.8)]">
                                        ¡A CORRER!
                                    </span>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Full screen flash on hit */}
            <AnimatePresence>
                {hitFlash && (
                    <motion.div
                        initial={{ opacity: 0.6 }}
                        animate={{ opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 z-[25] bg-red-600/20 pointer-events-none border-4 border-red-500/40"
                    />
                )}
            </AnimatePresence>

            {starBoost && (
                <motion.div
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute inset-0 z-[5] pointer-events-none border-2 border-gold/30 rounded-lg"
                    style={{ boxShadow: 'inset 0 0 60px rgba(201,168,76,0.1)' }}
                />
            )}

            {/* Victory overlay */}
            <AnimatePresence>
                {isCaptured && (
                    <motion.div
                        initial={{ clipPath: 'inset(0 100% 0 0)' }}
                        animate={{ clipPath: 'inset(0 0 0 0)' }}
                        transition={{ duration: 0.6, ease: 'circOut' }}
                        className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
                    >
                        {/* Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a2e]/95 via-[#0f0520]/95 to-[#1a0a2e]/95 backdrop-blur-md" />

                        {/* Decorative radial glow */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-radial from-purple-500/10 via-blue-500/5 to-transparent blur-3xl" />
                        </div>

                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
                            className="relative z-10 flex flex-col items-center text-center px-6"
                        >
                            {/* Furina capturada image */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.7, duration: 0.6, ease: 'backOut' }}
                                className="relative w-64 h-64 md:w-80 md:h-80 mb-6"
                            >
                                <Image
                                    src="/images/characters/furina_capturada.png"
                                    alt="Furina Capturada"
                                    fill
                                    className="object-contain drop-shadow-[0_0_30px_rgba(74,144,226,0.4)]"
                                />
                            </motion.div>

                            {/* Title */}
                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.0, duration: 0.5 }}
                                className="font-gfx text-3xl md:text-5xl font-bold text-white italic tracking-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                            >
                                Felicidades, capturaste a Furina
                            </motion.h2>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
