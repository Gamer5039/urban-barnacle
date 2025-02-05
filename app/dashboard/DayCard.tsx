'use client';

import Link from 'next/link';

interface DayCardProps {
  day: number;
  title: string;
  description: string;
  duration: string;
  isUnlocked: boolean;
}

export default function DayCard({ day, title, description, duration, isUnlocked }: DayCardProps) {
  return (
    <div className={`
      relative rounded-xl overflow-hidden
      ${isUnlocked ? 'bg-white/20' : 'bg-white/10'}
      backdrop-blur-sm transition-all duration-300
    `}>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <span className="text-white/60 font-medium">Day {day}</span>
          <span className="text-white/60 text-sm">{duration}</span>
        </div>

        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-white/80 text-sm mb-6">{description}</p>

        {isUnlocked ? (
          <Link
            href={`/meditation/day-${day}`}
            className="inline-block w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 
                     text-white rounded-lg font-semibold text-center transition-colors"
          >
            Begin Session
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
            Complete Previous Day
          </button>
        )}
      </div>

      {isUnlocked && (
        <div className="absolute top-0 right-0 p-2">
          <div className="w-2 h-2 rounded-full bg-green-400"></div>
        </div>
      )}
    </div>
  );
}
