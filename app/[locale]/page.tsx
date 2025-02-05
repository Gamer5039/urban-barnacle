'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import useUserStore from '@/lib/store/userStore';

export default function Landing() {
  const t = useTranslations('landing');
  const router = useRouter();
  const isAuthenticated = useUserStore(state => state.isAuthenticated());

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, router]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl mb-12">
            {t('description')}
          </p>
          <button
            onClick={() => router.push('/auth')}
            className="bg-white text-indigo-600 px-8 py-3 rounded-lg text-lg font-semibold 
                     hover:bg-indigo-100 transition-colors duration-200"
          >
            {t('getStarted')}
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <FeatureCard
            title={t('features.daily.title')}
            description={t('features.daily.description')}
          />
          <FeatureCard
            title={t('features.guided.title')}
            description={t('features.guided.description')}
          />
          <FeatureCard
            title={t('features.progress.title')}
            description={t('features.progress.description')}
          />
        </div>
      </div>
    </main>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-white">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p>{description}</p>
    </div>
  );
}