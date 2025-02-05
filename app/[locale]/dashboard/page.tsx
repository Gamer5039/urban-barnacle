'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import useUserStore from '@/lib/store/userStore';

interface DayCardProps {
  day: number;
  title: string;
  description: string;
  duration: string;
  status: 'locked' | 'completed' | 'inProgress';
  onClick?: () => void;
}

function DayCard({ day, title, description, duration, status, onClick }: DayCardProps) {
  const t = useTranslations('dashboard.days');
  
  return (
    <div 
      onClick={onClick}
      className={`p-6 rounded-lg shadow-md cursor-pointer transition-all duration-200 ${
        status === 'locked' 
          ? 'bg-gray-100 cursor-not-allowed' 
          : status === 'completed'
          ? 'bg-green-50 hover:bg-green-100'
          : 'bg-white hover:bg-gray-50'
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Day {day}</h3>
        <span className={`px-3 py-1 rounded-full text-sm ${
          status === 'locked' 
            ? 'bg-gray-200 text-gray-600' 
            : status === 'completed'
            ? 'bg-green-200 text-green-800'
            : 'bg-blue-200 text-blue-800'
        }`}>
          {t(status)}
        </span>
      </div>
      <h4 className="font-medium mb-2">{title}</h4>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <div className="text-sm text-gray-500">{duration}</div>
    </div>
  );
}

export default function DashboardPage() {
  const t = useTranslations('dashboard');
  const router = useRouter();
  const { currentUser, isAuthenticated } = useUserStore();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/auth');
    }
  }, [isAuthenticated, router]);

  if (!currentUser || !currentUser.progress) {
    return null;
  }

  const currentDay = currentUser.progress.currentDay || 1;

  const days = [
    {
      day: 1,
      title: 'Introduction to Meditation',
      description: 'Learn the basics of meditation and mindfulness',
      duration: '10 minutes',
      status: currentDay === 1 ? 'inProgress' : 
             currentDay > 1 ? 'completed' : 'locked'
    },
    {
      day: 2,
      title: 'Breath Awareness',
      description: 'Focus on your breath to calm your mind',
      duration: '15 minutes',
      status: currentDay === 2 ? 'inProgress' :
             currentDay > 2 ? 'completed' : 'locked'
    },
    {
      day: 3,
      title: 'Body Scan Meditation',
      description: 'Practice mindfulness through body awareness',
      duration: '20 minutes',
      status: currentDay === 3 ? 'inProgress' :
             currentDay > 3 ? 'completed' : 'locked'
    },
    {
      day: 4,
      title: 'Loving-Kindness',
      description: 'Develop compassion for yourself and others',
      duration: '15 minutes',
      status: currentDay === 4 ? 'inProgress' :
             currentDay > 4 ? 'completed' : 'locked'
    },
    {
      day: 5,
      title: 'Mindful Walking',
      description: 'Practice meditation in motion',
      duration: '20 minutes',
      status: currentDay === 5 ? 'inProgress' :
             currentDay > 5 ? 'completed' : 'locked'
    },
    {
      day: 6,
      title: 'Sound Meditation',
      description: 'Use sound as an anchor for mindfulness',
      duration: '15 minutes',
      status: currentDay === 6 ? 'inProgress' :
             currentDay > 6 ? 'completed' : 'locked'
    }
  ] as const;

  const handleDayClick = (day: number, status: 'locked' | 'completed' | 'inProgress') => {
    if (status === 'locked') {
      return;
    }
    router.push(`/meditation/day/${day}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {t('welcome')}
          </h1>
          <button
            onClick={() => {
              useUserStore.getState().logoutUser();
              router.replace('/auth');
            }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            {t('logout')}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {days.map((day) => (
            <DayCard
              key={day.day}
              {...day}
              onClick={() => handleDayClick(day.day, day.status)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
