'use client';

import { useGameStore } from '@/store/gameStore';
import { Float, Sparkles } from '@react-three/drei';

function QuizScene() {
    return (
        <>
            <ambientLight intensity={0.3} color="#4a0404" />
            <pointLight position={[2, 3, 4]} intensity={0.6} color="#8b1a1a" />
            <Sparkles
                count={40}
                scale={8}
                size={2}
                speed={0.3}
                color="#8b1a1a"
                opacity={0.4}
            />
        </>
    );
}

function MemoryScene() {
    return (
        <>
            <ambientLight intensity={0.15} color="#1a1a1a" />
            <spotLight
                position={[0, 5, 3]}
                angle={0.5}
                penumbra={0.8}
                intensity={1.2}
                color="#f5f0eb"
                castShadow
            />
            <pointLight position={[-3, 2, 2]} intensity={0.3} color="#4a0404" />
        </>
    );
}

function RunnerScene() {
    return (
        <>
            <ambientLight intensity={0.2} color="#1a0a0a" />
            <directionalLight position={[0, 5, 5]} intensity={0.8} color="#f5f0eb" />
            <pointLight position={[0, 1, -5]} intensity={0.5} color="#8b1a1a" />
            <fog attach="fog" args={['#0a0a0a', 5, 20]} />
        </>
    );
}

function FinaleScene() {
    const rand = (seed: number) => {
        const x = Math.sin(seed * 9999) * 10000;
        return x - Math.floor(x);
    };

    const shards = Array.from({ length: 8 }).map((_, i) => {
        const r1 = rand(i + 1);
        const r2 = rand(i + 11);
        const r3 = rand(i + 21);
        const r4 = rand(i + 31);
        const r5 = rand(i + 41);

        return {
            id: i,
            speed: 1 + r1 * 2,
            position: [(r2 - 0.5) * 10, (r3 - 0.5) * 6, (r4 - 0.5) * 4 - 2] as [number, number, number],
            radius: 0.15 + r5 * 0.2,
        };
    });

    return (
        <>
            <ambientLight intensity={0.2} color="#1a0a0a" />
            <pointLight position={[0, 3, 3]} intensity={0.8} color="#c9a84c" />
            <pointLight position={[-3, 1, 2]} intensity={0.4} color="#8b1a1a" />

            {/* Floating crystal shards */}
            {shards.map((shard) => (
                <Float
                    key={shard.id}
                    speed={shard.speed}
                    rotationIntensity={0.5}
                    floatIntensity={0.8}
                    position={shard.position}
                >
                    <mesh>
                        <octahedronGeometry args={[shard.radius, 0]} />
                        <meshStandardMaterial
                            color="#4a0404"
                            metalness={0.8}
                            roughness={0.2}
                            emissive="#8b1a1a"
                            emissiveIntensity={0.3}
                            transparent
                            opacity={0.6}
                        />
                    </mesh>
                </Float>
            ))}

            {/* Ember sparkles rising from the bottom */}
            <Sparkles
                count={80}
                scale={[10, 8, 4]}
                size={3}
                speed={0.5}
                color="#c9a84c"
                opacity={0.6}
                position={[0, -2, 0]}
            />

            <Sparkles
                count={40}
                scale={[8, 6, 3]}
                size={2}
                speed={0.3}
                color="#8b1a1a"
                opacity={0.4}
                position={[0, 0, -1]}
            />
        </>
    );
}

export default function SceneManager() {
    const currentStage = useGameStore((s) => s.currentStage);

    return (
        <>
            {/* Global scene elements */}
            <color attach="background" args={['#0a0a0a']} />

            {currentStage === 'quiz' && <QuizScene />}
            {currentStage === 'memory' && <MemoryScene />}
            {currentStage === 'runner' && <RunnerScene />}
            {currentStage === 'finale' && <FinaleScene />}
        </>
    );
}
