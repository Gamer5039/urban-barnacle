'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';

const MEDITATION_CONTENT = {
  'day-1': {
    title: 'Introduction to Meditation',
    audioUrl: '/Day 1 Audio.mp3',
    article: `
      Meditation is a practice that has been used for thousands of years to develop awareness of the present moment. It involves focusing your mind on a particular object, thought, or activity to achieve mental clarity and emotional calmness.

      In this first session, we'll learn the basic posture and breathing techniques that form the foundation of meditation practice.

      Key Points:
      1. Find a comfortable seated position
      2. Keep your back straight but not rigid
      3. Rest your hands on your lap or knees
      4. Close your eyes or maintain a soft gaze
      5. Focus on your natural breath

      As you begin, don't worry about doing it "perfectly." The goal is simply to observe your experience without judgment.
    `,
  },
  // Add more days as needed
};

export default function MeditationPage() {
  const params = useParams();
  const [isAudioCompleted, setIsAudioCompleted] = useState(false);
  const [isArticleRead, setIsArticleRead] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const day = typeof params.day === 'string' ? params.day : '';
  const content = MEDITATION_CONTENT[day as keyof typeof MEDITATION_CONTENT];

  if (!content) {
    return <div>Session not found</div>;
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">{content.title}</h1>

        <div className="space-y-8">
          {/* Audio Section */}
          <section className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Guided Meditation</h2>
            <div className="bg-white/5 rounded-lg p-6">
              <div className="max-w-md mx-auto">
                <audio
                  src={content.audioUrl}
                  onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                  onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                  onEnded={() => {
                    setIsPlaying(false);
                    setIsAudioCompleted(true);
                  }}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  id="meditation-audio"
                  className="hidden"
                />
                
                {/* Custom Audio Player */}
                <div className="space-y-4">
                  <div className="flex items-center justify-center mb-4">
                    <button
                      onClick={() => {
                        const audio = document.getElementById('meditation-audio') as HTMLAudioElement;
                        if (isPlaying) {
                          audio.pause();
                        } else {
                          audio.play();
                        }
                      }}
                      className="w-16 h-16 rounded-full bg-purple-600 hover:bg-purple-700 
                               flex items-center justify-center transition-all duration-300
                               shadow-lg hover:scale-105"
                    >
                      {isPlaying ? (
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  </div>

                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max={duration}
                      value={currentTime}
                      onChange={(e) => {
                        const audio = document.getElementById('meditation-audio') as HTMLAudioElement;
                        audio.currentTime = Number(e.target.value);
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
              </div>
            </div>
          </section>

          {/* Article Section */}
          <section className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Today's Learning</h2>
            <div className="prose prose-invert max-w-none">
              <p key={0} className="mb-4">
                Let&apos;s begin today&apos;s meditation session.
              </p>
              {content.article.split('\n\n').map((paragraph, index) => (
                <p key={index + 1} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
            <button
              onClick={() => setIsArticleRead(true)}
              className="mt-6 px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors"
            >
              Mark as Read
            </button>
          </section>

          {/* Progress Section */}
          <section className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Progress</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isAudioCompleted ? 'bg-green-500' : 'bg-white/20'}`}>
                  {isAudioCompleted && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                    </svg>
                  )}
                </div>
                <span>Complete Audio Session</span>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isArticleRead ? 'bg-green-500' : 'bg-white/20'}`}>
                  {isArticleRead && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                    </svg>
                  )}
                </div>
                <span>Read Article</span>
              </div>
            </div>

            {isAudioCompleted && isArticleRead && (
              <div className="mt-6">
                <button
                  onClick={() => {
                    // TODO: Implement unlock next day logic
                    alert('Great job! Next day unlocked!');
                  }}
                  className="w-full py-3 px-4 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition-colors"
                >
                  Complete & Unlock Next Day
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
