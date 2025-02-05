import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-4">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h1 className="text-5xl font-bold mb-6">Welcome to Inner Peace</h1>
        
        <div className="space-y-4">
          <p className="text-xl">
            Begin your journey to mindfulness and inner peace through guided meditation.
          </p>
          <p className="text-lg opacity-90">
            Experience reduced stress, better focus, improved sleep, and enhanced well-being
            through our step-by-step meditation journey.
          </p>
        </div>

        <div className="mt-12">
          <Link 
            href="/auth"
            className="inline-block px-8 py-4 text-lg font-semibold text-white bg-white/20 rounded-full 
                     backdrop-blur-sm hover:bg-white/30 transition-all duration-300 
                     border border-white/30 hover:scale-105"
          >
            Tap to Continue
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-4 rounded-lg bg-white/10 backdrop-blur-sm">
            <h3 className="font-semibold mb-2">Daily Practice</h3>
            <p className="text-sm opacity-90">Step-by-step guided meditation journey</p>
          </div>
          <div className="p-4 rounded-lg bg-white/10 backdrop-blur-sm">
            <h3 className="font-semibold mb-2">Expert Guidance</h3>
            <p className="text-sm opacity-90">Audio guides and detailed articles</p>
          </div>
          <div className="p-4 rounded-lg bg-white/10 backdrop-blur-sm">
            <h3 className="font-semibold mb-2">Track Progress</h3>
            <p className="text-sm opacity-90">Monitor your meditation journey</p>
          </div>
        </div>
      </div>
    </main>
  );
}
