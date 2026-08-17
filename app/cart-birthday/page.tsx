'use client';

import GrungeOverlay from '@/components/ui/GrungeOverlay';
import BirthdayGFX from '@/components/stages/BirthdayGFX';
// mis viejas w
export default function CartBirthdayPage() {
    return (
        <div className="relative w-screen h-screen overflow-hidden bg-[#0a0608]">
            <div className="absolute inset-0 z-10">
                <BirthdayGFX />
            </div>
            <GrungeOverlay />
        </div>
    );
}
