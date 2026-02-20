'use client';

import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function BirthdayGFX() {
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);
    const [showAchievement, setShowAchievement] = useState(false);
    const [showSecretMessages, setShowSecretMessages] = useState(false);
    
    // Cinematic State
    const [cinematicStep, setCinematicStep] = useState(0);
    const [showCinematic, setShowCinematic] = useState(true);

    // Cinematic Logic
    useEffect(() => {
        if (!showCinematic) return;

        const timers = [
            setTimeout(() => setCinematicStep(1), 3000),
            setTimeout(() => setCinematicStep(2), 6000),
            setTimeout(() => setCinematicStep(3), 9500),
            setTimeout(() => setCinematicStep(4), 13000),
            setTimeout(() => setCinematicStep(5), 16500),
            setTimeout(() => setShowCinematic(false), 20500),
        ];

        return () => timers.forEach(clearTimeout);
    }, [showCinematic]);

    // Animation variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                staggerChildren: 0.1,
                delayChildren: 0.3,
                when: "beforeChildren" // Asegura que el contenedor esté visible antes de los hijos
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
        }
    };

    const scaleVariants: Variants = {
        hidden: { scale: 1.1, opacity: 0 },
        visible: { 
            scale: 1, 
            opacity: 1,
            transition: { duration: 1.2, ease: "easeOut" }
        }
    };

    return (
        <div className="relative w-full h-full overflow-hidden bg-[#0a0608] text-bone select-none">
            <motion.div
                className="w-full h-full"
                initial="hidden"
                animate={showCinematic ? "hidden" : "visible"}
                variants={containerVariants}
            >
            {/* ════════════ BACKGROUND LAYER ════════════ */}
            <div className="absolute inset-0 z-0">
                <motion.div 
                    className="relative w-full h-full"
                    variants={scaleVariants}
                >
                    <Image
                        src="/images/ui/fondo.jpeg"
                        alt="Background"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />

                    {/* Gradient Overlays for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0608] via-transparent to-[#0a0608]/80" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0608]/90 via-transparent to-[#0a0608]/90" />
                    
                    {/* Noise texture overlay */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                </motion.div>
            </div>

            {/* ════════════ DECORATIVE TYPOGRAPHY (BEHIND CHARACTER) ════════════ */}
            <div className="absolute inset-0 z-10 flex flex-col justify-center items-center overflow-hidden pointer-events-none">
                <motion.div 
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute top-[10%] left-[-5%] whitespace-nowrap"
                >
                    <h1 className="font-gfx text-[25vh] leading-none text-transparent opacity-20"
                        style={{ WebkitTextStroke: '2px rgba(255,255,255,0.1)' }}>
                        ARLECCHINO
                    </h1>
                </motion.div>
                
                <motion.div 
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                    className="absolute bottom-[10%] right-[-5%] whitespace-nowrap"
                >
                    <h1 className="font-gfx text-[25vh] leading-none text-transparent opacity-20"
                        style={{ WebkitTextStroke: '2px rgba(201, 168, 76, 0.1)' }}>
                        FATHER
                    </h1>
                </motion.div>
            </div>

            {/* ════════════ MAIN CHARACTER ════════════ */}
            <motion.div 
                className="absolute inset-0 z-20 flex items-end justify-center md:justify-end md:pr-[10%]"
                initial={{ y: 50, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            >
                <div className="relative w-[140vw] h-[90vh] md:w-[65vh] md:h-[95vh] max-w-none">
                    {/* ════════════ BEHIND CHARACTER ════════════ */}
                    
                    {/* XMANDI - Halo/Background Effect */}
                    <div className="absolute top-[-20%] left-[40%] -translate-x-1/2 w-[80%] h-[50%] z-0 pointer-events-none">
                         <Image
                            src="/images/iconos/XMANDI-19-2-2026-removebg-preview.png"
                            alt="XMANDI Halo"
                            fill
                            className="object-contain opacity-90"
                        />
                    </div>

                    {/* Diamond Sword - Back */}
                    <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[30%] h-[50%] z-30 pointer-events-none rotate-180">
                         <Image
                            src="/images/iconos/diamond_sword.png"
                            alt="Diamond Sword"
                            fill
                            className="object-contain"
                            style={{ imageRendering: 'pixelated' }}
                        />
                    </div>

                    {/* ════════════ MAIN IMAGE ════════════ */}
                    <Image
                        src="/images/ui/9e6cfdda6daa9aab220e49cc9cbf6da3.png"
                        alt="Arlecchino"
                        fill
                        className="object-contain object-bottom drop-shadow-[0_0_50px_rgba(0,0,0,0.5)] z-10 relative"
                        priority
                    />

                    {/* ════════════ FRONT CHARACTER ════════════ */}

                    {/* Totem of Undying - Near Hand (Left) */}
                    <div 
                        className="absolute top-[26%] left-[5%] md:left-[5%] w-[8vh] h-[8vh] z-20 pointer-events-auto cursor-pointer hover:scale-110 transition-transform duration-300 rotate-[-12deg]"
                        onClick={() => setShowAchievement(true)}
                    >
                         <Image
                            src="/images/iconos/Totem_of_Undying_JE2_BE2.webp"
                            alt="Totem of Undying"
                            fill
                            className="object-contain drop-shadow-[0_0_15px_rgba(255,215,0,0.4)]"
                            style={{ imageRendering: 'pixelated' }}
                        />
                    </div>

                    {/* Minecraft Hotbar - Bottom/Feet */}
                    <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[95%] md:w-[65%] h-[9vh] z-20 pointer-events-none rotate-[-2deg]">
                         <div className="relative w-full h-full drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                             <Image
                                src="/images/iconos/Minecraft-Hotbar-Crafting-Resource-Organizer-PNG.png"
                                alt="Hotbar"
                                fill
                                className="object-contain"
                                style={{ imageRendering: 'pixelated' }}
                            />
                            {/* GFX Rainbow/Glass Light Effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 opacity-50 mix-blend-overlay rounded-lg"></div>
                         </div>
                    </div>

                    {/* Acrylic Tag - Weapon (Left/Top) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                        className="absolute top-[25%] left-[5%] md:-left-[15%] w-14 h-20 md:w-20 md:h-28 bg-white/5 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)] z-30"
                    >
                        <div className="relative w-10 h-16 md:w-14 md:h-20">
                            <Image
                                src="/images/iconos/lanza.webp"
                                alt="Weapon"
                                fill
                                className="object-contain drop-shadow-md"
                            />
                        </div>
                        {/* Decorative corner accents */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/50 rounded-tl-xl"></div>
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/50 rounded-br-xl"></div>
                    </motion.div>

                    {/* Acrylic Tag - Pyro (Right/Bottom) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.4, duration: 0.8 }}
                        className="absolute bottom-[25%] right-[5%] md:-right-[10%] w-14 h-14 md:w-20 md:h-20 bg-crimson/10 backdrop-blur-md border border-crimson/30 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(220,20,60,0.2)] z-30"
                    >
                        <div className="relative w-8 h-8 md:w-12 md:h-12">
                            <Image
                                src="/images/iconos/pyro.png"
                                alt="Pyro"
                                fill
                                className="object-contain drop-shadow-md"
                            />
                        </div>
                         {/* Rotating ring effect */}
                         <div className="absolute inset-0 border border-crimson/20 rounded-full border-dashed animate-spin-slow"></div>
                    </motion.div>
                </div>
            </motion.div>

            {/* ════════════ FOREGROUND CONTENT (MAGAZINE STYLE) ════════════ */}
            <div className="absolute inset-0 z-30 p-4 md:p-6 lg:p-8 2xl:p-10 min-[2000px]:p-12 flex flex-col justify-between h-full overflow-hidden">
                
                {/* ─── TOP HEADER ─── */}
                <div className="flex justify-between items-start w-full border-b border-white/10 pb-4 mb-2 lg:pb-4 lg:mb-2 2xl:pb-6 2xl:mb-4 shrink-0">
                    <motion.div variants={itemVariants} className="flex flex-col max-w-xl">
                        <span className="font-tech text-[10px] md:text-xs tracking-[0.3em] text-crimson-light uppercase mb-1 md:mb-2">
                            Misión especial de cumpleaños
                        </span>
                        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl min-[2000px]:text-6xl font-bold text-white tracking-tight leading-none mb-2 md:mb-3 italic">
                            Arlecchino - Genshin Impact
                        </h2>
                        <p className="font-sans text-xs md:text-sm lg:text-base text-white/70 leading-relaxed max-w-md lg:max-w-none">
                            &quot;El café negro suele ser suficiente, pero supongo que algo dulce es aceptable por hoy. ¿Pastel? No te acostumbres, es una excepción única.&quot;
                        </p>
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="text-right hidden md:block pr-8">
                        <span className="font-serif text-6xl md:text-8xl leading-none block text-white italic mb-2">
                            19
                        </span>
                        <span className="font-tech text-sm tracking-widest uppercase text-white/60 block">
                            February 2026
                        </span>
                    </motion.div>
                </div>

                {/* ─── MIDDLE / LEFT CONTENT ─── */}
                <div className="flex-1 flex flex-row items-center gap-6 md:gap-12 mt-4 md:mt-0 relative z-30 min-h-0">
                    
                    {/* VERTICAL BANNER (New) */}
                    <motion.div 
                        variants={itemVariants}
                        className="hidden md:block relative w-24 md:w-24 lg:w-28 2xl:w-30 min-[2000px]:w-32 h-[35vh] md:h-[350px] lg:h-[400px] 2xl:h-[400px] min-[2000px]:h-[450px] max-h-[450px] shrink-0 border border-white/10 bg-black/20 p-2 backdrop-blur-sm shadow-2xl rotate-[-2deg]"
                    >
                        <div className="relative w-full h-full overflow-hidden border border-white/5 bg-[#1a1a1a]">
                            <Image 
                                src="/images/characters/arlecchino_gfxrender1.png"
                                alt="Arlecchino GFX"
                                fill
                                className="object-cover object-top opacity-80 hover:opacity-100 transition-opacity duration-500"
                            />
                            {/* Overlay details */}
                            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent"></div>
                            <div className="absolute bottom-4 left-0 right-0 text-center z-10">
                                <span className="font-tech text-[8px] tracking-[0.3em] text-crimson-light uppercase block mb-1">Target</span>
                                <span className="font-serif text-xl italic text-white/90">001</span>
                            </div>
                            {/* Decorative lines */}
                            <div className="absolute top-0 left-2 w-[1px] h-full bg-white/10"></div>
                            <div className="absolute top-0 right-2 w-[1px] h-full bg-white/10"></div>
                        </div>
                    </motion.div>

                    {/* TEXT CONTENT (Shifted right via flex gap) */}
                    <div className="flex flex-col justify-center max-w-md shrink-0">
                        <motion.div variants={itemVariants} className="mb-4 lg:mb-4 2xl:mb-6 min-[2000px]:mb-8 pl-4">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="h-[1px] w-12 bg-crimson-glow"></div>
                                <span className="font-tech text-xs uppercase tracking-widest text-crimson-glow">
                                    Special Edition
                                </span>
                            </div>
                            <h1 className="font-gfx text-5xl md:text-6xl lg:text-7xl min-[2000px]:text-8xl uppercase leading-[0.85] mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-bone to-white/50">
                                NAOMI
                            </h1>
                            <p className="font-serif text-xl md:text-2xl italic text-gold-light ml-1">
                                xmandi
                            </p>
                        </motion.div>
    
                        <motion.div variants={itemVariants} className="bg-black/40 backdrop-blur-md border-l-2 border-crimson p-4 lg:p-6 rounded-r-lg max-w-lg ml-4">
                            <p className="font-serif text-sm md:text-base lg:text-lg leading-relaxed text-bone/90 italic">
                                &quot;Hoy el mundo brilla un poco más porque existes tú. Cada momento a tu lado es un regalo que atesoro con todo el corazón. Esta celebración es solo una pequeña muestra de lo especial que eres.&quot;
                            </p>
                            <div className="mt-2 lg:mt-4 flex items-center gap-2">
                                <span className="font-tech text-[10px] uppercase tracking-widest text-white/40">
                                    Message from Father
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* ─── RIGHT CONTENT (Floating Elements) ─── */}
                <div className="absolute top-[20%] right-[5%] md:right-[8%] flex flex-col items-end gap-16 pointer-events-auto z-40 hidden md:flex">
                    {/* Stacked Polaroids */}
                    <motion.div 
                        variants={itemVariants} 
                        className="relative w-48 h-60 cursor-pointer group perspective-[800px]"
                    >
                        {/* Back Photo (Hidden by default, peeks on hover) */}
                        <div 
                            className="absolute inset-0 bg-white p-3 pb-8 shadow-xl transform transition-all duration-500 ease-out group-hover:rotate-[-12deg] group-hover:translate-x-[-40px] group-hover:translate-y-[10px] rotate-[-5deg]"
                            onClick={() => setLightboxImage('/images/ui/birthday_photo.jpg')}
                        >
                            <div className="relative w-full h-full overflow-hidden bg-gray-900">
                                <Image
                                    src="/images/ui/birthday_photo.jpg"
                                    alt="Memory Back"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* Front Photo */}
                        <div 
                            className="absolute inset-0 bg-white p-3 pb-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform transition-transform duration-500 group-hover:rotate-[5deg] rotate-[3deg] z-10"
                            onClick={() => setLightboxImage('/images/ui/ebf93306fcf883b9b44c131387478417.jpg')}
                        >
                            <div className="relative w-full h-full overflow-hidden bg-gray-900">
                                <Image
                                    src="/images/ui/ebf93306fcf883b9b44c131387478417.jpg"
                                    alt="Memory Front"
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div className="absolute bottom-2 right-3">
                                <span className="font-serif text-black/60 text-xs italic font-bold">#forever</span>
                            </div>
                            {/* Tape effect */}
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-white/30 backdrop-blur-sm rotate-[-2deg] shadow-sm"></div>
                        </div>
                    </motion.div>

                    {/* Secondary Message Card */}
                    <motion.div 
                        variants={itemVariants} 
                        className="w-72 bg-black/60 backdrop-blur-xl border border-white/10 p-5 rounded-xl shadow-2xl mt-8"
                    >
                         <p className="font-serif text-sm text-bone-muted italic leading-relaxed">
                            &quot;La distancia nunca podrá apagar lo que siento. Cada día que pasa me convenzo más de que encontrarte fue lo mejor que me pudo pasar. Feliz cumpleaños, mi persona favorita.&quot;
                         </p>
                         <div className="w-full h-[1px] bg-white/10 my-3"></div>
                         <p className="text-right text-[10px] text-gold mt-1 font-tech uppercase tracking-widest flex items-center justify-end gap-2">
                            <span>Lei Dan</span>
                            <span className="w-2 h-2 rounded-full bg-crimson"></span>
                         </p>
                    </motion.div>
                </div>

                {/* ─── BOTTOM FOOTER ─── */}
                <div className="w-full flex items-end justify-between mt-auto pt-2 lg:pt-4 2xl:pt-6 min-[2000px]:pt-8 shrink-0 relative">
                    <motion.div variants={itemVariants} className="flex items-end gap-3 md:gap-4 lg:gap-6 relative z-50">
                        <div className="flex flex-col gap-2 lg:gap-2 min-[2000px]:gap-3 max-w-lg">
                            <h3 className="font-gfx text-lg md:text-xl lg:text-xl min-[2000px]:text-2xl text-white/90 border-b border-white/10 pb-1 flex items-center gap-2 mb-1">
                                <span className="w-1.5 h-1.5 bg-crimson rounded-full animate-pulse"></span>
                                SKILLS INFORMATION
                            </h3>
                            
                            {/* Skill 1: Minecraft */}
                            <div className="flex gap-2 lg:gap-2 min-[2000px]:gap-3 group hover:bg-white/5 p-1.5 lg:p-1.5 min-[2000px]:p-2 rounded-lg transition-colors border border-transparent hover:border-white/5">
                                <div className="w-8 h-8 lg:w-8 lg:h-8 min-[2000px]:w-10 min-[2000px]:h-10 bg-emerald-400 flex items-center justify-center shrink-0 rounded backdrop-blur-sm shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                                    {/* Cube Icon */}
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" className="w-4 h-4 lg:w-5 lg:h-5">
                                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                                        <line x1="12" y1="22.08" x2="12" y2="12" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-tech text-emerald-400 text-[9px] lg:text-[10px] tracking-[0.2em] uppercase mb-0.5">Minecraft Architect</h4>
                                    <p className="font-sans text-[10px] lg:text-[11px] text-bone/80 leading-snug">
                                        Decoradora y constructora experta, con diplomado de &quot;La Familia de Nation&quot;. Se dice que tiene esclavizados a pobres almas para minar cuarzo en el Nether.
                                    </p>
                                </div>
                            </div>

                            {/* Skill 2: Valorant */}
                            <div className="flex gap-2 lg:gap-2 min-[2000px]:gap-3 group hover:bg-white/5 p-1.5 lg:p-1.5 min-[2000px]:p-2 rounded-lg transition-colors border border-transparent hover:border-white/5">
                                <div className="w-8 h-8 lg:w-8 lg:h-8 min-[2000px]:w-10 min-[2000px]:h-10 bg-rose-400 flex items-center justify-center shrink-0 rounded backdrop-blur-sm shadow-[0_0_15px_rgba(251,113,133,0.3)]">
                                    {/* Target Icon */}
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" className="w-4 h-4 lg:w-5 lg:h-5">
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="22" y1="12" x2="18" y2="12" />
                                        <line x1="6" y1="12" x2="2" y2="12" />
                                        <line x1="12" y1="6" x2="12" y2="2" />
                                        <line x1="12" y1="22" x2="12" y2="18" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-tech text-rose-400 text-[9px] lg:text-[10px] tracking-[0.2em] uppercase mb-0.5">Valorant Syndrome</h4>
                                    <p className="font-sans text-[10px] lg:text-[11px] text-bone/80 leading-snug">
                                        Según ella, el juego que más estrés y rechazo le causa. Aún así, lo sigue jugando. Masoquismo en su máxima expresión.
                                    </p>
                                </div>
                            </div>

                            {/* Skill 3: Genshin */}
                            <div className="flex gap-2 lg:gap-2 min-[2000px]:gap-3 group hover:bg-white/5 p-1.5 lg:p-1.5 min-[2000px]:p-2 rounded-lg transition-colors border border-transparent hover:border-white/5">
                                <div className="w-8 h-8 lg:w-8 lg:h-8 min-[2000px]:w-10 min-[2000px]:h-10 bg-indigo-400 flex items-center justify-center shrink-0 rounded backdrop-blur-sm shadow-[0_0_15px_rgba(129,140,248,0.3)]">
                                    {/* Star Icon */}
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" className="w-4 h-4 lg:w-5 lg:h-5">
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-tech text-indigo-400 text-[9px] lg:text-[10px] tracking-[0.2em] uppercase mb-0.5">Genshin Parenting</h4>
                                    <p className="font-sans text-[10px] lg:text-[11px] text-bone/80 leading-snug">
                                        Llevando su experiencia latinoamericana al límite: tiene más de 3 hijos (cuentas) y las abandona como buen ejemplo.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* New Vertical Banners */}
                        <div className="relative flex gap-2 lg:gap-3">
                             {/* Banner 1 */}
                             <div className="relative w-16 h-36 md:w-16 md:h-36 lg:w-16 lg:h-40 min-[2000px]:w-20 min-[2000px]:h-48 border border-white/10 bg-black/20 p-1 backdrop-blur-sm shadow-lg group hover:scale-105 transition-transform">
                                <div className="relative w-full h-full overflow-hidden border border-white/5 bg-[#1a1a1a]">
                                    <Image 
                                        src="/images/characters/arlecchino_principalcuerpo.png"
                                        alt="Arlecchino Detail 1"
                                        fill
                                        className="object-cover object-top opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                                    />
                                </div>
                            </div>
                             {/* Banner 2 */}
                             <div className="relative w-16 h-36 md:w-16 md:h-36 lg:w-16 lg:h-40 min-[2000px]:w-20 min-[2000px]:h-48 border border-white/10 bg-black/20 p-1 backdrop-blur-sm shadow-lg group hover:scale-105 transition-transform delay-75">
                                <div className="relative w-full h-full overflow-hidden border border-white/5 bg-[#1a1a1a]">
                                    <Image 
                                        src="/images/characters/arlecchino_fullbody.png"
                                        alt="Arlecchino Detail 2"
                                        fill
                                        className="object-cover object-top scale-125 opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                                    />
                                </div>
                            </div>
                             {/* Banner 3 */}
                             <div className="relative w-16 h-36 md:w-16 md:h-36 lg:w-16 lg:h-40 min-[2000px]:w-20 min-[2000px]:h-48 border border-white/10 bg-black/20 p-1 backdrop-blur-sm shadow-lg group hover:scale-105 transition-transform delay-150 z-50">
                                <div className="relative w-full h-full overflow-hidden border border-white/5 bg-[#1a1a1a]">
                                    <Image 
                                        src="/images/ui/ebf93306fcf883b9b44c131387478417.jpg"
                                        alt="Arlecchino Detail 3"
                                        fill
                                        className="object-cover object-[80%_center] opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                                    />
                                </div>
                            </div>

                            <motion.div
                                className="absolute left-1/2 -translate-x-1/2 -top-48 md:-top-64 w-40 h-40 md:w-56 md:h-56 z-[70] cursor-pointer"
                                whileTap={{ scale: [1, 0.85, 1.2, 1] }}
                                onClick={() => setShowSecretMessages(true)}
                            >
                                <div className="relative w-full h-full hover:scale-110 transition-transform duration-300">
                                    <Image
                                        src="/images/iconos/image-removebg-preview.png"
                                        alt="Alfajor Sorpresa"
                                        fill
                                        className="object-contain drop-shadow-2xl"
                                    />
                                    <div className="absolute bottom-2 right-2 w-12 h-12 rotate-[-12deg] pointer-events-none animate-bounce">
                                        <Image
                                            src="/images/iconos/pngimg.com - cursor_PNG45.png"
                                            alt="Click"
                                            fill
                                            className="object-contain drop-shadow-md"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center relative group cursor-pointer hover:bg-white/5 transition-colors">
                            <span className="font-serif italic text-2xl text-gold">N</span>
                            <div className="absolute inset-0 border border-transparent group-hover:border-white/20 rounded-full transition-all duration-500 scale-110"></div>
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* ════════════ SECRET MESSAGES (ALFAJOR INTERACTION) ════════════ */}
            <AnimatePresence>
                {showSecretMessages && (
                    <div className="absolute inset-0 z-[120] pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/20"
                        />

                        <div className="absolute inset-0">
                            <motion.div
                                initial={{ opacity: 0, x: -30, y: -20, scale: 0.9 }}
                                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                className="absolute left-1/2 top-1/2 -translate-x-[72%] -translate-y-[120%] w-[320px] md:w-[400px] bg-black/90 backdrop-blur-xl border border-crimson/50 p-6 rounded-xl shadow-[0_0_30px_rgba(220,20,60,0.3)] pointer-events-auto"
                            >
                                <div className="absolute -top-12 -left-8 w-24 h-24 animate-bounce">
                                    <Image
                                        src="/images/characters/arlecchino_chibi2.png"
                                        alt="Arlecchino Chibi"
                                        fill
                                        className="object-contain drop-shadow-xl"
                                    />
                                </div>
                                <p className="font-serif text-white/90 text-sm md:text-base italic leading-relaxed">
                                    &quot;¡Feliz cumple, Naoh! Un año más cerca de convertirte en esa señora que le grita a las nubes. No te preocupes, aunque ya estés entrando en modo &apos;vintage&apos;, te sigo queriendo igual. Disfruta tu día antes de que la espalda te empiece a doler por existir.&quot;
                                </p>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); setShowSecretMessages(false); }}
                                    className="absolute top-2 right-2 text-white/30 hover:text-white text-xs uppercase tracking-widest"
                                >
                                    [X]
                                </button>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -30, y: 20, scale: 0.9 }}
                                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                                className="absolute left-1/2 top-1/2 -translate-x-[44%] translate-y-[25%] w-[320px] md:w-[400px] bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.1)] pointer-events-auto"
                            >
                                <div className="absolute -right-8 -top-12 w-24 h-24 animate-pulse">
                                    <Image
                                        src="/images/characters/chibi_furi1.png"
                                        alt="Furina Chibi"
                                        fill
                                        className="object-contain drop-shadow-xl"
                                    />
                                </div>
                                <p className="font-serif text-bone text-sm md:text-base italic leading-relaxed">
                                    &quot;Naomi, conocerte fue como resolver un dilema complejo sin buscar la respuesta. Eres alguien importante de mi entorno y que paradójicamente a quien más pone a prueba mi mente con ese humor de serie. Mi propuesta es simple, no cambies nada. Feliz cumpleaños.&quot;
                                </p>
                            </motion.div>
                        </div>
                    </div>
                )}
            </AnimatePresence>

            {/* ════════════ OVERLAY TEXTURES ════════════ */}
            {/* Corner Frames */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/30 z-40"></div>
            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/30 z-40"></div>
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/30 z-40"></div>
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/30 z-40"></div>

            {/* Vertical lines */}
            <div className="absolute top-0 bottom-0 left-[10%] w-[1px] bg-white/5 z-0 hidden md:block"></div>
            <div className="absolute top-0 bottom-0 right-[10%] w-[1px] bg-white/5 z-0 hidden md:block"></div>

            {/* ════════════ MINECRAFT ACHIEVEMENT NOTIFICATION ════════════ */}
            <motion.div
                className="fixed top-28 right-0 z-[100] cursor-pointer"
                initial={{ x: "85%" }} // Peeking state (sobresalida)
                animate={{ x: showAchievement ? "0%" : "85%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={() => setShowAchievement(!showAchievement)}
                whileHover={{ x: showAchievement ? "0%" : "82%" }} // Slight peek on hover
            >
                <div className="relative w-96 h-24 filter drop-shadow-lg">
                    {/* Background Image Container */}
                    <div className="relative w-full h-full">
                        <Image
                            src="/images/iconos/achievement.png"
                            alt="Minecraft Achievement"
                            fill
                            className="object-contain"
                            style={{ imageRendering: 'pixelated' }}
                        />
                    </div>
                </div>
            </motion.div>

            </motion.div>
            
            {/* ════════════ LIGHTBOX ════════════ */}
            <AnimatePresence>
                {lightboxImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 cursor-pointer"
                        onClick={() => setLightboxImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-4xl h-[80vh]"
                            onClick={(e) => e.stopPropagation()} 
                        >
                            <Image
                                src={lightboxImage}
                                alt="Full size memory"
                                fill
                                className="object-contain"
                            />
                            <button 
                                className="absolute top-4 right-4 text-white/50 hover:text-white uppercase tracking-widest text-sm"
                                onClick={() => setLightboxImage(null)}
                            >
                                [Close]
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* ════════════ CINEMATIC INTRO ════════════ */}
            <AnimatePresence>
                {showCinematic && (
                    <motion.div
                        className="fixed inset-0 z-[9999] bg-[#0a0608] flex flex-col items-center justify-center p-8 text-center"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                    >
                        {/* Grid decorativo del fondo */}
                        <div className="absolute inset-0 opacity-[0.05]"
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

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={cinematicStep}
                                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                className="flex flex-col items-center gap-8 relative z-20"
                            >
                                {/* Image Logic */}
                                {(cinematicStep === 0 || cinematicStep === 1) && (
                                     <motion.div 
                                        className="relative w-64 h-64 md:w-80 md:h-80"
                                        animate={{ y: [0, -8, 0, -4, 0], rotate: [0, -2, 0, 2, 0] }}
                                        transition={{ y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' } }}
                                     >
                                         <Image 
                                            src="/images/characters/arlecchino_chibi2.png" 
                                            alt="Arlecchino" 
                                            fill 
                                            className="object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]" 
                                            priority
                                         />
                                     </motion.div>
                                )}
                                {(cinematicStep === 3 || cinematicStep === 4) && (
                                     <motion.div 
                                        className="relative w-64 h-64 md:w-80 md:h-80"
                                        animate={{ y: [0, -8, 0, -4, 0], rotate: [0, -2, 0, 2, 0] }}
                                        transition={{ y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' } }}
                                     >
                                         <Image 
                                            src="/images/characters/chibi_furi1.png" 
                                            alt="Furina Thinking" 
                                            fill 
                                            className="object-contain drop-shadow-[0_0_30px_rgba(100,200,255,0.3)]" 
                                         />
                                     </motion.div>
                                )}
                                {cinematicStep === 5 && (
                                     <motion.div 
                                        className="relative w-64 h-64 md:w-80 md:h-80"
                                        animate={{ y: [0, -8, 0, -4, 0], rotate: [0, -2, 0, 2, 0] }}
                                        transition={{ y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' } }}
                                     >
                                         <Image 
                                            src="/images/characters/chibi_furi2.png" 
                                            alt="Furina Working" 
                                            fill 
                                            className="object-contain drop-shadow-[0_0_30px_rgba(255,215,0,0.3)]" 
                                         />
                                     </motion.div>
                                )}

                                {/* Text Logic */}
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-16 h-[1px] bg-crimson-light/50 mx-auto opacity-50" />
                                    <h2 className="font-serif text-xl md:text-3xl text-bone italic max-w-2xl leading-relaxed drop-shadow-[0_0_15px_rgba(0,0,0,0.9)]">
                                        {cinematicStep === 0 && "Calmas a Furina"}
                                        {cinematicStep === 1 && "Le explicas la situacion a furina"}
                                        {cinematicStep === 2 && "*Furina empieza a escuchar la situacion*"}
                                        {cinematicStep === 3 && "*Furina esta pensando en algo*"}
                                        {cinematicStep === 4 && "Furina: un poster sera lo mejor"}
                                        {cinematicStep === 5 && "Furina empieza a hacer la targeta"}
                                    </h2>
                                    <div className="w-16 h-[1px] bg-crimson-light/50 mx-auto opacity-50" />
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Esquinas decorativas */}
                        <div className="absolute top-4 left-4 z-30 w-8 h-8 border-t border-l border-crimson/20" />
                        <div className="absolute top-4 right-4 z-30 w-8 h-8 border-t border-r border-crimson/20" />
                        <div className="absolute bottom-4 left-4 z-30 w-8 h-8 border-b border-l border-crimson/20" />
                        <div className="absolute bottom-4 right-4 z-30 w-8 h-8 border-b border-r border-crimson/20" />
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
