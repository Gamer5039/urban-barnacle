'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useMeditationProgress } from '@/lib/store/meditationProgress';

interface DayCardProps {
  day: number;
  title: string;
  description: string;
  duration: string;
}

export default function DayCard({ day, title, description, duration }: DayCardProps) {
  const t = useTranslations('meditation');
  const params = useParams();
  const locale = params.locale;
  const { isDayUnlocked, isDayCompleted } = useMeditationProgress();
  const isUnlocked = isDayUnlocked(day);
  const isCompleted = isDayCompleted(day);

  return (
    <div className={`
      relative rounded-xl overflow-hidden
      ${isCompleted ? 'bg-green-500/20' : isUnlocked ? 'bg-white/20' : 'bg-white/10'}
      backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]
    `}>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <span className="text-white/60 font-medium">{t('day')} {day}</span>
          <span className="text-white/60 text-sm">{duration}</span>
        </div>

        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-white/80 text-sm mb-6">{description}</p>

        {isUnlocked ? (
          <Link
            href={`/${locale}/meditation/day-${day}`}
            className={`
              inline-block w-full py-3 px-4 rounded-lg font-semibold text-center transition-colors
              ${isCompleted 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : 'bg-purple-600 hover:bg-purple-700 text-white'
              }
            `}
          >
            {isCompleted ? t('revisit') : t('beginSession')}
          </Link>
        ) : (
          <button
            disabled
            className="w-full py-3 px-4 bg-white/20 text-white/60 
                     rounded-lg font-semibold flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            {t('completePrevious')}
          </button>
        )}
      </div>

      {isCompleted && (
        <div className="absolute top-0 right-0 p-2">
          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
