'use client';

import { useEffect, useState, Suspense, use, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import useUserStore from '@/lib/store/userStore';

interface MeditationPageProps {
  params: Promise<{
    id: string;
  }>;
}

const meditationContent = {
  1: {
    title: 'Introduction to Meditation',
    description: 'Learn the basics of meditation and mindfulness',
    audioFile: '/Day 1 Audio.mp3',
    duration: '10 minutes',
    article: `
      <h2>Getting Started with Meditation</h2>
      
      <p>Welcome to your first day of meditation! Today we'll learn the fundamentals of mindfulness practice.</p>
      
      <h3>What is Meditation?</h3>
      <p>Meditation is a practice where an individual uses a technique – such as mindfulness, or focusing the mind on a particular object, thought, or activity – to train attention and awareness, and achieve a mentally clear and emotionally calm and stable state.</p>
      
      <h3>Benefits of Regular Practice</h3>
      <ul>
        <li>Reduced stress and anxiety</li>
        <li>Improved focus and concentration</li>
        <li>Better emotional regulation</li>
        <li>Enhanced self-awareness</li>
        <li>Better sleep quality</li>
      </ul>

      <h3>Today's Practice</h3>
      <p>In today's session, we'll focus on:</p>
      <ul>
        <li>Finding a comfortable posture</li>
        <li>Basic breathing techniques</li>
        <li>Developing awareness of thoughts</li>
      </ul>

      <h3>Instructions</h3>
      <ol>
        <li>Find a quiet, comfortable place to sit</li>
        <li>Set a timer for 10 minutes</li>
        <li>Focus on your breath</li>
        <li>When your mind wanders, gently bring it back to your breath</li>
      </ol>
    `
  },
  2: {
    title: 'Breath Awareness',
    description: 'Focus on your breath to calm your mind',
    audioFile: '/Day 2 Audio.mp3',
    duration: '15 minutes',
    article: `
      <h2>Breath Awareness Meditation</h2>
      
      <p>Welcome to Day 2! Today we'll deepen our practice by focusing specifically on breath awareness, one of the most fundamental meditation techniques.</p>
      
      <h3>Understanding Breath Awareness</h3>
      <p>Breath awareness meditation, or mindful breathing, is a powerful practice that uses your breath as an anchor for your attention. By focusing on the natural rhythm of your breath, you can calm your mind and develop greater concentration.</p>
      
      <h3>Benefits of Breath Awareness</h3>
      <ul>
        <li>Immediate stress reduction</li>
        <li>Better emotional regulation</li>
        <li>Improved concentration</li>
        <li>Enhanced mindfulness</li>
        <li>Better sleep quality</li>
        <li>Reduced anxiety and worry</li>
      </ul>

      <h3>Today's Practice</h3>
      <p>In this session, we'll explore:</p>
      <ul>
        <li>Different aspects of the breath</li>
        <li>Natural breathing patterns</li>
        <li>The connection between breath and mind</li>
        <li>Techniques for maintaining focus</li>
      </ul>

      <h3>Key Points to Remember</h3>
      <ol>
        <li>Observe your breath without trying to change it</li>
        <li>Notice the sensation of breathing in your body</li>
        <li>Pay attention to the natural pauses between breaths</li>
        <li>When your mind wanders, gently return to the breath</li>
        <li>Stay patient and kind with yourself</li>
      </ol>

      <h3>Tips for Practice</h3>
      <ul>
        <li>Find a comfortable seated position</li>
        <li>Keep your back straight but relaxed</li>
        <li>You can close your eyes or keep them slightly open</li>
        <li>Start with focusing on the sensation at your nostrils</li>
        <li>Gradually expand awareness to the whole breathing process</li>
      </ul>

      <h3>After the Session</h3>
      <p>Take a moment to notice how you feel after the practice. Has your state of mind changed? Do you feel more relaxed or centered? These observations help build awareness of meditation's benefits.</p>
    `
  }
};

function MeditationContent({ id }: { id: number }) {
  const t = useTranslations('meditation');
  const router = useRouter();
  const { currentUser, isAuthenticated, updateProgress } = useUserStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [audioCompleted, setAudioCompleted] = useState(false);
  const [articleRead, setArticleRead] = useState(false);
  const [dayCompleted, setDayCompleted] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  
  const content = meditationContent[id as keyof typeof meditationContent];

  const handleDayCompletion = useCallback(async () => {
    if (!currentUser?.progress) return;

    const newProgress = {
      ...currentUser.progress,
      currentDay: Math.max(currentUser.progress.currentDay, id + 1),
      completedDays: Array.from(new Set([...currentUser.progress.completedDays, id])),
      lastSessionDate: new Date().toISOString(),
      streakCount: currentUser.progress.streakCount + 1
    };

    await updateProgress(newProgress);
  }, [currentUser?.progress, id, updateProgress]);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/auth');
      return;
    }

    if (!currentUser?.progress) {
      router.replace('/dashboard');
      return;
    }

    const { currentDay } = currentUser.progress;
    if (id > currentDay) {
      router.replace('/dashboard');
    }

    // Initialize audio
    if (typeof window !== 'undefined') {
      const audioElement = new Audio(content?.audioFile);
      setAudio(audioElement);

      // Add audio completion listener
      const handleEnded = () => {
        setAudioCompleted(true);
        setIsPlaying(false);
        setAudioProgress(100);
      };

      // Add progress listener
      const handleTimeUpdate = () => {
        const progress = (audioElement.currentTime / audioElement.duration) * 100;
        setAudioProgress(progress);
      };

      audioElement.addEventListener('ended', handleEnded);
      audioElement.addEventListener('timeupdate', handleTimeUpdate);

      return () => {
        audioElement.pause();
        audioElement.currentTime = 0;
        audioElement.removeEventListener('ended', handleEnded);
        audioElement.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [isAuthenticated, currentUser, router, id, content]);

  useEffect(() => {
    if (audioCompleted && articleRead) {
      setDayCompleted(true);
      handleDayCompletion();
    }
  }, [audioCompleted, articleRead, handleDayCompletion]);

  const toggleAudio = () => {
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const markArticleAsRead = () => {
    setArticleRead(true);
  };

  if (!currentUser || !currentUser.progress || !content) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <h1 className="text-3xl font-bold mb-6">
              {content.title}
            </h1>
            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">
                  {t('audioGuide')} - {content.duration}
                </h2>
                <div className="space-y-4">
                  <button
                    onClick={toggleAudio}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>{isPlaying ? t('pause') : t('play')}</span>
                    <svg 
                      className="w-5 h-5" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      {isPlaying ? (
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      ) : (
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      )}
                    </svg>
                  </button>

                  {/* Audio Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${audioProgress}%` }}
                    ></div>
                  </div>

                  {audioCompleted && (
                    <div className="flex items-center text-green-600">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{t('audioCompleted')}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content.article }} />
              
              <div className="mt-8 flex flex-col space-y-4">
                {!articleRead && (
                  <button
                    onClick={markArticleAsRead}
                    className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    {t('markAsRead')}
                  </button>
                )}
                
                {articleRead && (
                  <div className="flex items-center text-green-600">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{t('articleRead')}</span>
                  </div>
                )}

                {dayCompleted && (
                  <button
                    onClick={() => router.push('/dashboard')}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {t('nextDay')}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MeditationPage({ params }: MeditationPageProps) {
  const resolvedParams = use(params);
  const id = Number(resolvedParams.id);
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MeditationContent id={id} />
    </Suspense>
  );
}
