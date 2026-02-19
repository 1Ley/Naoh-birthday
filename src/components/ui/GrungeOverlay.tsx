export default function GrungeOverlay() {
    return (
        <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
                backgroundImage: 'url(/textures/grunge.svg)',
                backgroundSize: '512px 512px',
                backgroundRepeat: 'repeat',
                mixBlendMode: 'overlay',
                opacity: 0.15,
            }}
            aria-hidden="true"
        />
    );
}
