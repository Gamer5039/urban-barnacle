'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { useMeditationProgress } from '@/lib/store/meditationProgress';
import useUserStore from '@/lib/store/userStore';

interface MeditationContent {
  title: string;
  audioUrl: string;
  article: string;
}

interface LocaleContent {
  [key: string]: MeditationContent;
}

interface MeditationData {
  en: LocaleContent;
  hi: LocaleContent;
}

export default function MeditationDay() {
  const t = useTranslations('meditation');
  const params = useParams();
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [isArticleRead, setIsArticleRead] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const { isDayUnlocked, markDayCompleted } = useMeditationProgress();
  const { currentUser } = useUserStore();

  const day = params.day as string;
  const dayNumber = parseInt(day.replace('day-', ''));
  const locale = params.locale as 'en' | 'hi';

  const meditationData: MeditationData = {
    en: {
      'day-1': {
        title: 'Ek aadat banana',
        audioUrl: `/api/audio?day=${dayNumber}&locale=${locale}`,
        article: `
          Meditation is a practice that has been used for thousands of years to develop awareness of the present moment. It involves focusing your mind on a particular object, thought, or activity to achieve mental clarity and emotional calmness.

          In this first session, we'll learn the basic posture and breathing techniques that form the foundation of meditation practice.
          hello
          TEST CHANGE - PLEASE CHECK IF THIS APPEARS
          Key Points:
          1. Find a comfortable seated position
          2. Keep your back straight but not rigid
          3. Rest your hands on your lap or knees
          4. Close your eyes or maintain a soft gaze
          5. Focus on your natural breath

          As you begin, don't worry about doing it "perfectly." The goal is simply to observe your experience without judgment.
        `,
      },
      'day-2': {
        title: 'Deep Breathing Techniques',
        audioUrl: `/api/audio?day=${dayNumber}&locale=${locale}`,
        article: `
          Deep breathing is one of the most effective ways to start meditating and reduce stress instantly. Today, we'll explore various breathing techniques that can help you achieve a state of calm and relaxation.

          The 4-7-8 Breathing Technique:
          1. Exhale completely through your mouth
          2. Close your mouth and inhale through your nose for 4 counts
          3. Hold your breath for 7 counts
          4. Exhale completely through your mouth for 8 counts
          5. Repeat this cycle 4 times

          Remember to be gentle with yourself and don't force the breath. The counts should be comfortable for you.
        `,
      },
    },
    hi: {
      'day-1': {
        title: 'ध्यान का परिचय',
        audioUrl: `/api/audio?day=${dayNumber}&locale=${locale}`,
        article: `
          ध्यान एक ऐसी प्रथा है जिसका उपयोग हजारों वर्षों से वर्तमान क्षण की जागरूकता विकसित करने के लिए किया जाता है। इसमें मानसिक स्पष्टता और भावनात्मक शांति प्राप्त करने के लिए अपने मन को किसी विशेष वस्तु, विचार या गतिविधि पर केंद्रित करना शामिल है।

          इस पहले सत्र में, हम बुनियादी मुद्रा और श्वास तकनीकों को सीखेंगे जो ध्यान अभ्यास की नींव बनाते हैं।

          मुख्य बिंदु:
          1. एक आरामदायक बैठने की स्थिति खोजें
          2. अपनी पीठ सीधी रखें लेकिन कड़ी नहीं
          3. अपने हाथों को गोद या घुटनों पर रखें
          4. अपनी आंखें बंद करें या नरम दृष्टि बनाए रखें
          5. अपनी प्राकृतिक सांस पर ध्यान दें

          शुरुआत करते समय, इसे "पूरी तरह से सही" करने की चिंता न करें। लक्ष्य बस बिना किसी निर्णय के अपने अनुभव को देखना है।
        `,
      },
      'day-2': {
        title: 'गहरी श्वास तकनीकें',
        audioUrl: `/api/audio?day=${dayNumber}&locale=${locale}`,
        article: `
          गहरी सांस लेना ध्यान शुरू करने और तुरंत तनाव कम करने के सबसे प्रभावी तरीकों में से एक है। आज, हम विभिन्न श्वास तकनीकों का अन्वेषण करेंगे जो आपको शांति और आराम की स्थिति प्राप्त करने में मदद कर सकती हैं।

          4-7-8 श्वास तकनीक:
          1. अपने मुंह से पूरी तरह से सांस छोड़ें
          2. अपना मुंह बंद करें और 4 गिनती के लिए नाक से सांस लें
          3. 7 गिनती के लिए अपनी सांस रोकें
          4. 8 गिनती के लिए अपने मुंह से पूरी तरह से सांस छोड़ें
          5. इस चक्र को 4 बार दोहराएं

          अपने साथ नरम रहें और सांस को जबरदस्ती न करें। गिनती आपके लिए आरामदायक होनी चाहिए।
        `,
      },
    },
  };

  const content = meditationData[locale]?.[day];

  const handleAudioEnded = useCallback(() => {
    setIsPlaying(false);
    if (currentUser?.email) {
      markDayCompleted(dayNumber);
    }
  }, [currentUser?.email, dayNumber, markDayCompleted]);

  useEffect(() => {
    const currentAudio = audioRef.current;
    if (!currentAudio) return;
    
    currentAudio.addEventListener('ended', handleAudioEnded);
    return () => {
      currentAudio.removeEventListener('ended', handleAudioEnded);
    };
  }, [handleAudioEnded]);

  if (!content || !isDayUnlocked(dayNumber)) {
    router.push(`/${locale}/dashboard`);
    return null;
  }

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error('Audio playback error:', error);
          setAudioError(true);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">{content.title}</h1>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
          <div className="flex flex-col items-center space-y-6">
            <audio
              ref={audioRef}
              src={content.audioUrl}
              onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
              onError={() => setAudioError(true)}
            />
            
            {audioError ? (
              <div className="text-red-300">
                Audio file not found or cannot be played. Please try again later.
              </div>
            ) : (
              <div className="space-y-4">
                <button
                  onClick={togglePlayPause}
                  className="px-8 py-4 bg-white/20 rounded-full hover:bg-white/30 transition-all duration-300"
                >
                  {isPlaying ? 'Pause' : 'Play'} {t('guidedMeditation')}
                </button>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    onChange={(e) => {
                      if (audioRef.current) {
                        audioRef.current.currentTime = Number(e.target.value);
                      }
                    }}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer
                             [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 
                             [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full 
                             [&::-webkit-slider-thumb]:bg-purple-500"
                  />
                  <div className="flex justify-between text-sm text-white/80">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">{t('todaysLearning')}</h2>
          <div className="prose prose-invert max-w-none">
            {content.article.split('\n\n').map((paragraph: string, index: number) => (
              <p key={index} className="mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          <button
            onClick={() => setIsArticleRead(true)}
            className="mt-6 px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors"
          >
            {t('markAsRead')}
          </button>
        </div>

        {isArticleRead && (
          <div className="mt-6">
            <button
              onClick={handleAudioEnded}
              className="w-full py-3 px-4 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition-colors"
            >
              {t('unlockNext')}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
