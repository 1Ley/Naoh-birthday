'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import gsap from 'gsap';

// ═══════════════════════════════════════════════════════════════════
// GFX Birthday Card — Arlecchino × Naomi (xmandi)
// Style: Bright gradients, prismatic lens flares, acrylic panels,
//        bold overlapping typography, magazine editorial layout
// ═══════════════════════════════════════════════════════════════════

export default function FinaleStage() {
    const containerRef = useRef<HTMLDivElement>(null);

    // ─── GSAP Staggered Entrance ───
    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

            // Fade in background elements
            tl.fromTo('.gfx-bg-element', { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: 1.5, stagger: 0.1 }, 0);

            // Character entry
            tl.fromTo('.gfx-hero-character',
                { opacity: 0, y: 60, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 1.4, ease: 'power3.out' },
                0.2
            );

            // Big typography
            tl.fromTo('.gfx-big-text',
                { opacity: 0, x: -80, skewX: -5 },
                { opacity: 1, x: 0, skewX: 0, duration: 1.0, stagger: 0.15 },
                0.5
            );

            // Acrylic panels
            tl.fromTo('.gfx-panel',
                { opacity: 0, y: 30, backdropFilter: 'blur(0px)' },
                { opacity: 1, y: 0, backdropFilter: 'blur(16px)', duration: 0.8, stagger: 0.12 },
                0.9
            );

            // Info labels
            tl.fromTo('.gfx-label',
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
                1.3
            );

            // Prismatic flares
            tl.fromTo('.gfx-flare',
                { opacity: 0, scale: 0.5 },
                { opacity: 1, scale: 1, duration: 1.2, stagger: 0.2 },
                1.0
            );

            // Bottom tags
            tl.fromTo('.gfx-tag',
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.4, stagger: 0.06 },
                1.8
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full overflow-hidden select-none"
            style={{ WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}
        >
            {/* ═══════════ BACKGROUND: Bright gradient base ═══════════ */}
            <div className="gfx-bg-element absolute inset-0 z-0"
                style={{
                    background: `
                        radial-gradient(ellipse at 30% 20%, rgba(180, 140, 255, 0.25) 0%, transparent 50%),
                        radial-gradient(ellipse at 70% 80%, rgba(255, 120, 180, 0.15) 0%, transparent 50%),
                        radial-gradient(ellipse at 80% 30%, rgba(120, 180, 255, 0.12) 0%, transparent 45%),
                        radial-gradient(ellipse at 20% 70%, rgba(200, 170, 255, 0.1) 0%, transparent 40%),
                        linear-gradient(135deg, #1a1028 0%, #0f0a1a 25%, #150d22 50%, #0d0815 75%, #12091c 100%)
                    `,
                }}
            />

            {/* Soft light wash overlay */}
            <div className="gfx-bg-element absolute inset-0 z-[1] opacity-0"
                style={{
                    background: 'linear-gradient(160deg, rgba(255,255,255,0.03) 0%, transparent 40%, rgba(255,255,255,0.015) 70%, transparent 100%)',
                }}
            />

            {/* ═══════════ PRISMATIC LENS FLARES (Rainbow light reflections) ═══════════ */}
            {/* Main prismatic flare — top right */}
            <div className="gfx-flare absolute z-[5] pointer-events-none opacity-0"
                style={{ top: '-5%', right: '10%', width: '350px', height: '350px' }}
            >
                <div className="w-full h-full rounded-full"
                    style={{
                        background: 'conic-gradient(from 120deg, rgba(255,50,50,0.12), rgba(255,160,50,0.1), rgba(255,255,50,0.08), rgba(50,255,100,0.1), rgba(50,150,255,0.12), rgba(150,50,255,0.1), rgba(255,50,150,0.08), rgba(255,50,50,0.12))',
                        filter: 'blur(50px)',
                    }}
                />
                {/* Inner bright core */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(200,180,255,0.05) 60%, transparent 100%)',
                        filter: 'blur(15px)',
                    }}
                />
            </div>

            {/* Secondary prismatic — bottom left */}
            <div className="gfx-flare absolute z-[5] pointer-events-none opacity-0"
                style={{ bottom: '10%', left: '-3%', width: '280px', height: '280px' }}
            >
                <div className="w-full h-full rounded-full"
                    style={{
                        background: 'conic-gradient(from 240deg, rgba(100,200,255,0.1), rgba(200,100,255,0.1), rgba(255,150,200,0.08), rgba(150,255,200,0.06), rgba(100,200,255,0.1))',
                        filter: 'blur(45px)',
                    }}
                />
            </div>

            {/* Small prismatic spots scattered */}
            {[
                { top: '30%', left: '15%', size: 80 },
                { top: '60%', right: '25%', size: 100 },
                { top: '15%', left: '45%', size: 60 },
                { bottom: '35%', right: '5%', size: 90 },
                { bottom: '60%', left: '60%', size: 70 },
            ].map((pos, i) => (
                <motion.div
                    key={`prism-${i}`}
                    className="gfx-flare absolute z-[5] pointer-events-none opacity-0"
                    style={{ ...pos, width: pos.size, height: pos.size } as React.CSSProperties}
                    animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.95, 1.05, 0.95] }}
                    transition={{ duration: 3 + i * 0.7, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <div className="w-full h-full rounded-full"
                        style={{
                            background: `conic-gradient(from ${i * 72}deg, rgba(255,100,100,0.15), rgba(100,255,200,0.12), rgba(100,100,255,0.15), rgba(255,200,100,0.1), rgba(255,100,100,0.15))`,
                            filter: `blur(${15 + i * 5}px)`,
                        }}
                    />
                </motion.div>
            ))}

            {/* ═══════════ ACRYLIC GLOW SHAPES (Soft light panels) ═══════════ */}
            {/* Large soft glow behind character */}
            <div className="gfx-bg-element absolute z-[2] pointer-events-none opacity-0"
                style={{
                    top: '5%', right: '-10%',
                    width: '70vw', height: '90vh',
                    background: 'radial-gradient(ellipse at center, rgba(130,80,200,0.08) 0%, rgba(80,40,140,0.04) 40%, transparent 70%)',
                    filter: 'blur(30px)',
                }}
            />

            {/* ═══════════ BIG TYPOGRAPHY — Behind character ═══════════ */}
            <div className="absolute inset-0 z-[6] pointer-events-none overflow-hidden">
                {/* Giant "ARLECCHINO" watermark */}
                <div className="gfx-big-text absolute top-[12%] left-[5%] opacity-0" >
                    <h1 className="font-gfx text-[11vw] font-black uppercase italic leading-[0.85] tracking-[-0.04em]"
                        style={{
                            color: 'transparent',
                            WebkitTextStroke: '1px rgba(255,255,255,0.06)',
                        }}
                    >
                        ARLEC
                    </h1>
                </div>
                <div className="gfx-big-text absolute top-[28%] left-[8%] opacity-0">
                    <h1 className="font-gfx text-[11vw] font-black uppercase italic leading-[0.85] tracking-[-0.04em]"
                        style={{
                            color: 'transparent',
                            WebkitTextStroke: '1px rgba(255,255,255,0.04)',
                        }}
                    >
                        CHINO
                    </h1>
                </div>
            </div>

            {/* ═══════════ HERO CHARACTER IMAGE ═══════════ */}
            <div className="gfx-hero-character absolute z-[12] opacity-0"
                style={{
                    right: '-3%',
                    bottom: '-4%',
                    width: '60vw',
                    maxWidth: '780px',
                    height: '100vh',
                }}
            >
                <Image
                    src="/images/characters/arlecchino_gfxrender1.png"
                    alt="Arlecchino"
                    fill
                    className="object-contain object-bottom"
                    style={{
                        filter: 'drop-shadow(0 0 80px rgba(140,60,200,0.2)) drop-shadow(0 0 40px rgba(200,100,150,0.15))',
                    }}
                    priority
                />
                {/* Glow underneath character */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-48"
                    style={{
                        background: 'radial-gradient(ellipse at bottom, rgba(140,60,200,0.12) 0%, rgba(200,100,150,0.06) 40%, transparent 70%)',
                        filter: 'blur(20px)',
                    }}
                />
            </div>

            {/* ═══════════ MAIN CONTENT LAYER ═══════════ */}
            <div className="absolute inset-0 z-[20] p-6 md:p-10 flex flex-col justify-between pointer-events-none">

                {/* ──── TOP: Header bar ──── */}
                <div className="flex justify-between items-start">
                    <div className="gfx-label opacity-0">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-3 h-3 rounded-sm bg-gradient-to-br from-red-500 to-red-700" />
                            <span className="font-tech text-[9px] tracking-[0.3em] uppercase text-white/50">
                                Design by xmandi
                            </span>
                        </div>
                    </div>
                    <div className="gfx-label opacity-0 text-right">
                        <p className="font-gfx text-sm md:text-base font-bold uppercase italic text-white/70 tracking-wider">
                            Genshin Impact
                        </p>
                        <p className="font-tech text-[8px] tracking-[0.3em] text-white/30 mt-0.5">
                            18/02/2026
                        </p>
                    </div>
                </div>

                {/* ──── LEFT SIDE: Title + Name + Info ──── */}
                <div className="flex-1 flex flex-col justify-center max-w-[50%] md:max-w-[42%] mt-4">
                    {/* Main Title */}
                    <div className="mb-6">
                        <h1 className="gfx-big-text font-gfx text-[10vw] md:text-[7vw] font-black text-white uppercase italic leading-[0.9] tracking-[-0.03em] opacity-0"
                            style={{
                                textShadow: '0 0 60px rgba(180,140,255,0.2), 0 0 120px rgba(140,100,220,0.1)',
                            }}
                        >
                            Happy
                        </h1>
                        <div className="flex items-baseline gap-3">
                            <h1 className="gfx-big-text font-gfx text-[10vw] md:text-[7vw] font-black uppercase italic leading-[0.9] tracking-[-0.03em] opacity-0"
                                style={{
                                    background: 'linear-gradient(135deg, #e8d5ff 0%, #c9a84c 40%, #f5e6b8 70%, #dbb8ff 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    textShadow: 'none',
                                    filter: 'drop-shadow(0 0 30px rgba(200,170,255,0.2))',
                                }}
                            >
                                Birthday
                            </h1>
                        </div>
                        {/* Handwritten-style accent */}
                        <motion.p
                            className="gfx-label font-serif text-xl md:text-2xl italic text-pink-300/60 -mt-1 ml-2 opacity-0"
                            animate={{ rotate: [-2, -1, -2] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            ✦ para ti
                        </motion.p>
                    </div>

                    {/* Name section */}
                    <div className="gfx-panel mb-6 opacity-0">
                        <p className="font-serif text-4xl md:text-6xl font-bold text-white italic tracking-wide"
                            style={{
                                textShadow: '0 0 40px rgba(200,170,255,0.15)',
                            }}
                        >
                            Naomi
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                            <p className="font-tech text-sm md:text-base text-purple-300/70 tracking-[0.25em] uppercase">
                                xmandi
                            </p>
                            <div className="h-[1px] flex-1 max-w-[100px] bg-gradient-to-r from-purple-400/40 to-transparent" />
                        </div>
                    </div>

                    {/* Description / Birthday Message */}
                    <div className="gfx-panel opacity-0 max-w-sm">
                        <p className="font-serif text-white/70 text-sm md:text-base leading-relaxed italic">
                            Hoy el mundo brilla un poco más porque existes tú. Cada momento
                            a tu lado es un regalo que atesoro con todo el corazón. Esta
                            celebración es solo una pequeña muestra de lo especial que eres.
                        </p>
                    </div>
                </div>

                {/* ──── BOTTOM SECTION ──── */}
                <div className="flex items-end justify-between gap-4">
                    {/* Bottom left info tags */}
                    <div className="flex flex-wrap gap-2">
                        {['Arlecchino Main', 'The Knave', 'Fatui Harbinger', 'Snezhnaya', 'Feliz Cumpleaños'].map((tag) => (
                            <div key={tag}
                                className="gfx-tag px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm opacity-0"
                            >
                                <span className="font-tech text-[9px] tracking-[0.15em] uppercase text-white/50">
                                    {tag}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Bottom right mini banner */}
                    <div className="gfx-label opacity-0 hidden md:block">
                        <div className="relative w-36 h-12 rounded overflow-hidden border border-white/5">
                            <Image
                                src="/images/ui/de675e563185717d385ad932558bef4a.jpg"
                                alt="Banner"
                                fill
                                className="object-cover opacity-50"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#1a1028]/80 to-transparent" />
                        </div>
                    </div>
                </div>
            </div>

            {/* ═══════════ FLOATING ACRYLIC PANELS (Character data) ═══════════ */}

            {/* Panel: Character Info — left side */}
            <div className="gfx-panel absolute z-[22] left-6 md:left-10 top-[58%] opacity-0"
                style={{ maxWidth: '200px' }}
            >
                <div className="rounded-xl p-4 border border-white/[0.08] overflow-hidden relative"
                    style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                        backdropFilter: 'blur(16px) saturate(1.2)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)',
                    }}
                >
                    {/* Glass reflection line */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    <p className="font-tech text-[7px] tracking-[0.3em] uppercase text-purple-300/50 mb-2">Character</p>
                    <p className="font-gfx text-xl font-bold text-white italic tracking-tight">Arlecchino</p>
                    <p className="font-tech text-[9px] text-white/40 mt-1">The Knave · Harbinger IV</p>
                    <p className="font-tech text-[9px] text-white/30 mt-0.5">Fatui · Snezhnaya</p>

                    {/* Star rating */}
                    <div className="flex gap-1 mt-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className="text-[10px]" style={{ color: i < 5 ? '#c9a84c' : '#333' }}>★</span>
                        ))}
                    </div>

                    {/* Inner prismatic reflection */}
                    <div className="absolute bottom-0 right-0 w-16 h-16 rounded-full opacity-30"
                        style={{
                            background: 'conic-gradient(from 0deg, rgba(255,100,150,0.2), rgba(100,200,255,0.15), rgba(255,200,100,0.1), rgba(255,100,150,0.2))',
                            filter: 'blur(12px)',
                        }}
                    />
                </div>
            </div>

            {/* Panel: Birthday Date — right side floating */}
            <div className="gfx-panel absolute z-[22] right-[35%] md:right-[38%] top-[15%] opacity-0 hidden md:block">
                <div className="rounded-xl px-5 py-4 border border-white/[0.08] relative overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)',
                        backdropFilter: 'blur(16px) saturate(1.2)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)',
                    }}
                >
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <p className="font-tech text-[7px] tracking-[0.3em] uppercase text-pink-300/50 mb-1">Birthday</p>
                    <p className="font-gfx text-3xl font-bold text-white italic">18</p>
                    <p className="font-tech text-[9px] text-white/40">Febrero</p>
                </div>
            </div>

            {/* Panel: Qualities — right side */}
            <div className="gfx-panel absolute z-[22] right-[32%] md:right-[35%] top-[38%] opacity-0 hidden md:block">
                <div className="rounded-xl px-4 py-3 border border-white/[0.06] relative overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                        backdropFilter: 'blur(12px)',
                        boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
                    }}
                >
                    <p className="font-serif text-sm text-pink-200/70 italic">Hermosa</p>
                    <p className="font-serif text-sm text-purple-200/60 italic">Increíble</p>
                    <p className="font-serif text-sm text-blue-200/60 italic">Especial</p>
                </div>
            </div>

            {/* ═══════════ BIRTHDAY PHOTO (Arle & Furina) ═══════════ */}
            <div className="gfx-panel absolute z-[18] left-[5%] bottom-[18%] opacity-0 hidden md:block">
                <div className="relative rounded-xl overflow-hidden border border-white/[0.08] shadow-2xl"
                    style={{
                        width: '160px', height: '200px',
                        transform: 'rotate(-3deg)',
                        boxShadow: '0 12px 40px rgba(0,0,0,0.3), 0 0 60px rgba(140,80,200,0.08)',
                    }}
                >
                    {/* Glass shine overlay */}
                    <div className="absolute inset-0 z-10"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.04) 100%)',
                        }}
                    />
                    <Image
                        src="/images/ui/birthday_photo.jpg"
                        alt="Arle & Furina Birthday"
                        fill
                        className="object-cover"
                    />
                    {/* Photo label */}
                    <div className="absolute bottom-2 left-2 z-20">
                        <p className="font-tech text-[6px] text-white/60 tracking-widest uppercase bg-black/40 backdrop-blur-sm px-1.5 py-0.5 rounded"
                        >Arle × Furina</p>
                    </div>
                    {/* Prismatic corner reflection */}
                    <div className="absolute top-0 right-0 w-12 h-12 z-10"
                        style={{
                            background: 'conic-gradient(from 300deg, rgba(255,100,100,0.25), rgba(100,255,200,0.2), rgba(100,100,255,0.25), transparent)',
                            filter: 'blur(8px)',
                        }}
                    />
                </div>
            </div>

            {/* ═══════════ SECONDARY IMAGE (Arle & Furina together) ═══════════ */}
            <div className="gfx-panel absolute z-[15] right-[5%] top-[5%] opacity-0 hidden lg:block">
                <div className="relative rounded-lg overflow-hidden border border-white/[0.06]"
                    style={{
                        width: '180px', height: '120px',
                        transform: 'rotate(2deg)',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                    }}
                >
                    <div className="absolute inset-0 z-10"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%)',
                        }}
                    />
                    <Image
                        src="/images/ui/ebf93306fcf883b9b44c131387478417.jpg"
                        alt="Arlecchino & Furina"
                        fill
                        className="object-cover opacity-80"
                    />
                    <div className="absolute bottom-1 right-1 z-20">
                        <p className="font-tech text-[5px] text-white/40 tracking-widest uppercase">REF_001</p>
                    </div>
                </div>
            </div>

            {/* ═══════════ MESSAGE PANEL — Bottom right area ═══════════ */}
            <div className="gfx-panel absolute z-[22] right-[5%] bottom-[20%] md:right-[8%] max-w-[280px] opacity-0 hidden md:block">
                <div className="rounded-xl p-5 border border-white/[0.08] relative overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)',
                        backdropFilter: 'blur(16px) saturate(1.2)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)',
                    }}
                >
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    <p className="font-tech text-[7px] tracking-[0.3em] uppercase text-gold/50 mb-3">
                        Mensaje Especial
                    </p>
                    <p className="font-serif text-white/75 text-xs leading-relaxed italic">
                        &ldquo;La distancia nunca podrá apagar lo que siento. Cada día
                        que pasa me convenzo más de que encontrarte fue lo mejor que
                        me pudo pasar. Feliz cumpleaños, mi persona favorita.&rdquo;
                    </p>
                    <div className="w-10 h-[1px] bg-gradient-to-r from-gold/30 to-transparent my-3" />
                    <p className="font-tech text-[7px] text-white/25 tracking-[0.2em] uppercase">
                        Con todo mi amor ♥
                    </p>

                    {/* Corner accents */}
                    <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-white/10" />
                    <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-white/10" />

                    {/* Inner prismatic */}
                    <div className="absolute top-0 right-0 w-20 h-20 opacity-20"
                        style={{
                            background: 'conic-gradient(from 90deg, rgba(255,200,100,0.3), rgba(200,100,255,0.2), rgba(100,200,255,0.2), rgba(255,200,100,0.3))',
                            filter: 'blur(15px)',
                        }}
                    />
                </div>
            </div>

            {/* ═══════════ CHIBI FLOATING ═══════════ */}
            <motion.div
                className="gfx-label absolute z-[25] opacity-0 hidden md:block"
                style={{ bottom: '8%', left: '35%', width: '70px', height: '80px' }}
                animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
                <Image
                    src="/images/characters/arlecchino_chibi2.png"
                    alt="Arle Chibi"
                    fill
                    className="object-contain drop-shadow-[0_0_20px_rgba(140,60,200,0.25)]"
                />
            </motion.div>

            {/* ═══════════ ADDITIONAL CONGRATULATIONS TEXT (scattered) ═══════════ */}

            {/* Top center text */}
            <div className="gfx-label absolute z-[20] top-[22%] left-[10%] opacity-0">
                <p className="font-tech text-[8px] tracking-[0.3em] uppercase text-white/20">
                    Que todos tus deseos se hagan realidad
                </p>
            </div>

            {/* Side text */}
            <div className="gfx-label absolute z-[20] top-[45%] left-[3%] opacity-0 hidden md:block"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
                <p className="font-tech text-[7px] tracking-[0.4em] uppercase text-white/15">
                    Feliz Cumpleaños Naomi · 2026
                </p>
            </div>

            {/* Floating quote */}
            <div className="gfx-label absolute z-[20] top-[72%] left-[22%] opacity-0 max-w-[180px] hidden md:block">
                <p className="font-serif text-[11px] text-purple-200/40 italic leading-relaxed">
                    &ldquo;Eres la estrella más brillante en mi cielo&rdquo;
                </p>
            </div>

            {/* Tech-style label */}
            <div className="gfx-label absolute z-[20] bottom-[5%] left-[45%] opacity-0">
                <p className="font-tech text-[7px] tracking-[0.2em] uppercase text-white/15">
                    ✦ Celebración Especial · ID: ARLCN-2026 · Status: Feliz ✦
                </p>
            </div>

            {/* ═══════════ SPARKLE PARTICLES ═══════════ */}
            <div className="absolute inset-0 z-[4] pointer-events-none overflow-hidden">
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={`sparkle-${i}`}
                        className="absolute"
                        style={{
                            left: `${(i * 5.3) % 100}%`,
                            top: `${(i * 7.1) % 100}%`,
                            width: 2 + (i % 3),
                            height: 2 + (i % 3),
                            borderRadius: '50%',
                            background: i % 3 === 0
                                ? 'rgba(200,170,255,0.6)'
                                : i % 3 === 1
                                    ? 'rgba(255,200,220,0.5)'
                                    : 'rgba(180,220,255,0.5)',
                        }}
                        animate={{
                            opacity: [0, 0.8, 0],
                            scale: [0.5, 1.2, 0.5],
                        }}
                        transition={{
                            duration: 2 + (i % 4),
                            repeat: Infinity,
                            delay: i * 0.4,
                            ease: 'easeInOut',
                        }}
                    />
                ))}
            </div>

            {/* ═══════════ CORNER BRACKETS ═══════════ */}
            <div className="absolute top-4 left-4 w-5 h-5 border-t border-l border-white/15 z-[30]" />
            <div className="absolute top-4 right-4 w-5 h-5 border-t border-r border-white/15 z-[30]" />
            <div className="absolute bottom-4 left-4 w-5 h-5 border-b border-l border-white/15 z-[30]" />
            <div className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-white/15 z-[30]" />

            {/* ═══════════ ANIMATED LIGHT STREAK (diagonal) ═══════════ */}
            <motion.div
                className="absolute z-[3] pointer-events-none"
                style={{
                    top: 0, left: '-20%',
                    width: '140%', height: '100%',
                    background: 'linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.015) 45%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.015) 55%, transparent 60%)',
                }}
                animate={{ x: ['-20%', '20%'] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* ═══════════ NOISE OVERLAY (subtle grain) ═══════════ */}
            <div
                className="absolute inset-0 z-[28] pointer-events-none opacity-[0.025]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
                    backgroundSize: '128px 128px',
                }}
            />
        </div>
    );
}
