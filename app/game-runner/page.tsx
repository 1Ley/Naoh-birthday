'use client';

import GrungeOverlay from '@/components/ui/GrungeOverlay';
import RunnerStage from '@/components/stages/RunnerStage';

export default function GameRunnerPage() {
    return (
        <div className="relative w-screen h-screen overflow-hidden bg-charcoal-deep">
            <div className="absolute inset-0 z-10">
                <RunnerStage />
            </div>
            <GrungeOverlay />
        </div>
    );
}
