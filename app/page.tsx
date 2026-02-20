'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Sparkles } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-b from-zinc-50 via-zinc-200 to-[#1a0505] text-charcoal-deep">

      {/* Background Decor: "NAO" Typography */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="font-black text-[25vw] leading-none text-crimson/5 tracking-tighter mix-blend-multiply"
        >
          NAO
        </motion.div>
      </div>

      {/* Character Image Layer - Moved out of grid to ignore padding */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full md:w-[60%] h-[85vh] z-10 flex items-end justify-center pointer-events-none"
      >
        <div className="relative w-full h-full">
          <Image
            src="/images/characters/arlecchino_principalcuerpo.png"
            alt="Arlecchino Character"
            fill
            className="object-contain object-bottom scale-110"
            priority
          />
        </div>
      </motion.div>

      {/* Foreground Content */}
      <div className="relative z-20 w-full h-full max-w-[1600px] mx-auto grid grid-cols-12 px-6 md:px-12 py-8 pointer-events-none">

        {/* Left Column: Mission Brief */}
        <div className="col-span-12 md:col-span-3 flex flex-col justify-center md:justify-end gap-8 order-2 md:order-1 pointer-events-auto md:pr-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-left"
          >
            <h2 className="font-serif text-crimson-light text-xl mb-4 uppercase font-bold tracking-widest border-b border-crimson/30 pb-2">
              Misión
            </h2>
            <p className="font-sans text-sm md:text-base leading-relaxed text-bone/90 drop-shadow-[0_0_15px_rgba(0,0,0,0.9)]">
              <strong className="text-crimson drop-shadow-none">ARLECCHINO</strong> TIENE UN PROBLEMA URGENTE.
              EL CUMPLEAÑOS DE <strong className="text-crimson drop-shadow-none">NAO</strong> HA LLEGADO Y LA TARTA PERFECTA AÚN NO EXISTE.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="hidden md:block"
          >
            <h3 className="font-sans font-bold text-6xl text-transparent bg-clip-text bg-gradient-to-br from-charcoal/50 to-crimson/50 opacity-20 -rotate-90 origin-bottom-left absolute bottom-0 left-0 translate-x-full">
              FATHER
            </h3>
          </motion.div>
        </div>

        {/* Center Column: Top Names (Overlay) */}
        <div className="col-span-12 md:col-span-6 flex flex-col items-center justify-start relative order-1 md:order-2 h-[20vh] md:h-full">
          <div className="w-full flex justify-between items-center px-4 mt-4 md:mt-0">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-sans font-bold text-xl md:text-2xl tracking-tight text-charcoal-deep"
            >
              Arlecchino
            </motion.h1>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="font-serif text-3xl md:text-5xl text-crimson-deep absolute left-1/2 -translate-x-1/2 top-4 md:top-12 whitespace-nowrap opacity-20 md:opacity-100 uppercase tracking-widest"
            >
              Misión de Cumpleaños
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-sans font-bold text-xl md:text-2xl tracking-tight text-crimson-deep"
            >
              Misión
            </motion.h1>
          </div>
        </div>
        {/* Right Column: Objective & CTA */}
        <div className="col-span-12 md:col-span-3 flex flex-col justify-center gap-8 order-3 relative z-20 mt-8 md:mt-0 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-right"
          >
            <h2 className="font-serif text-crimson-light text-xl mb-4 uppercase font-bold tracking-widest border-b border-crimson/30 pb-2 text-right ml-auto w-full">
              Objetivo
            </h2>
            <p className="font-sans text-sm md:text-base leading-relaxed text-bone/90 drop-shadow-[0_0_15px_rgba(0,0,0,0.9)] text-right">
              NECESITAREMOS LA AYUDA DE <strong className="text-blue-400 drop-shadow-none">FURINA</strong> PARA RECOLECTAR LOS INGREDIENTES.
              COMPLETA LOS 3 MINIJUEGOS PARA PREPARAR LA SORPRESA FINAL.
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex justify-end mt-4"
          >
            <button
              onClick={() => router.push('/game-guess')}
              className="group relative px-8 py-3 bg-crimson-deep text-bone font-sans font-bold tracking-widest uppercase text-sm overflow-hidden transition-all hover:bg-crimson shadow-lg hover:shadow-crimson/40"
            >
              <span className="relative z-10 flex items-center gap-2">
                Comenzar Misión
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
          </motion.div>
        </div>

      </div>

      {/* Subtle Particles/Noise */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none mix-blend-overlay">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Sparkles count={50} scale={10} size={2} speed={0.2} color="#000" opacity={0.2} />
        </Canvas>
      </div>
    </div>
  );
}
