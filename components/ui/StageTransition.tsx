'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StageTransitionProps {
    children: ReactNode;
}

export default function StageTransition({ children }: StageTransitionProps) {
    return (
        <motion.div
            className="w-full h-full"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            {/* Crimson flash overlay on enter */}
            <motion.div
                className="fixed inset-0 z-50 pointer-events-none bg-crimson"
                initial={{ opacity: 0.6 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            />
            {children}
        </motion.div>
    );
}
