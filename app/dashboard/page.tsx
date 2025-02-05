import DayCard from './DayCard';

const MEDITATION_DAYS = [
  {
    day: 1,
    title: 'Introduction to Meditation',
    description: 'Begin your journey with the basics of meditation and mindfulness.',
    duration: '10 min',
    isUnlocked: true,
  },
  {
    day: 2,
    title: 'Deep Breathing Techniques',
    description: 'Learn powerful breathing exercises for instant calm.',
    duration: '15 min',
    isUnlocked: false,
  },
  {
    day: 3,
    title: 'Mindfulness Practice',
    description: 'Develop awareness and presence in your daily life.',
    duration: '15 min',
    isUnlocked: false,
  },
  // Add more days as needed
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="text-white text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Your Meditation Journey</h1>
          <p className="text-lg opacity-90">
            Track your progress and continue your path to inner peace
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MEDITATION_DAYS.map((day) => (
            <DayCard key={day.day} {...day} />
          ))}
        </div>
      </div>
    </main>
  );
}
