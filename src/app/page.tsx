import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <p>Redirecting to <Link href="/intro" className="text-crimson underline">Intro</Link>...</p>
    </div>
  );
}
