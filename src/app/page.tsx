import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-4 text-crimson">ARLECCHINO BIRTHDAY</h1>
      <p className="text-xl mb-8">Si ves esto, la web está funcionando.</p>
      <Link 
        href="/intro" 
        className="px-6 py-3 bg-crimson text-white rounded hover:bg-red-700 transition-colors text-lg"
      >
        ENTRAR A LA EXPERIENCIA
      </Link>
    </div>
  );
}
