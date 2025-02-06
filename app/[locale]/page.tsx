'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import useUserStore from '@/lib/store/userStore';
import { motion } from 'framer-motion';

export default function Landing() {
  const t = useTranslations('landing');
  const router = useRouter();
  const isAuthenticated = useUserStore(state => state.isAuthenticated());

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, router]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <motion.div 
        className="container mx-auto px-4 py-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          className="text-center text-white"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            variants={itemVariants}
          >
            {t('title')}
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl mb-12"
            variants={itemVariants}
          >
            {t('description')}
          </motion.p>

          <motion.div 
            className="space-y-4 md:space-y-0 md:space-x-4"
            variants={itemVariants}
          >
            <button
              onClick={() => router.push('/auth')}
              className="inline-block px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-100 transform hover:scale-105 transition-all duration-200"
            >
              {t('getStarted')}
            </button>
          </motion.div>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8 mt-20"
          variants={itemVariants}
        >
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
        </motion.div>
      </motion.div>
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