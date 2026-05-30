import React, { useState, useEffect } from 'react';

export default function DigitalClock() {
  const [times, setTimes] = useState({});

  const timeZones = [
    { name: 'New York', zone: 'America/New_York', offset: -5 },
    { name: 'London', zone: 'Europe/London', offset: 0 },
    { name: 'Tokyo', zone: 'Asia/Tokyo', offset: 9 },
    { name: 'Sydney', zone: 'Australia/Sydney', offset: 10 },
    { name: 'Dubai', zone: 'Asia/Dubai', offset: 4 },
    { name: 'São Paulo', zone: 'America/Sao_Paulo', offset: -3 },
  ];

  useEffect(() => {
    const updateTime = () => {
      const newTimes = {};
      timeZones.forEach((tz) => {
        const now = new Date();
        const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
        const tzTime = new Date(utcTime + 3600000 * tz.offset);
        newTimes[tz.name] = {
          time: tzTime.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
            hour12: false 
          }),
          date: tzTime.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
          }),
        };
      });
      setTimes(newTimes);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            World Clock
          </h1>
          <p className="text-gray-400 text-lg">
            Real-time display across multiple time zones
          </p>
        </div>

        {/* Clock Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {timeZones.map((tz) => (
            <div
              key={tz.name}
              className="relative group"
            >
              {/* Gradient Border */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur" />
              
              {/* Card Content */}
              <div className="relative bg-gray-800/50 backdrop-blur-xl border border-gray-700 group-hover:border-gray-600 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl">
                {/* Location Name */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    {tz.name}
                  </h2>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                </div>

                {/* Time Display */}
                <div className="space-y-4">
                  {/* Large Time */}
                  <div className="font-mono text-5xl md:text-6xl font-black tracking-wider text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                    {times[tz.name]?.time || '00:00:00'}
                  </div>

                  {/* Date */}
                  <div className="text-gray-400 text-sm uppercase tracking-widest">
                    {times[tz.name]?.date || 'Loading...'}
                  </div>

                  {/* Timezone Offset */}
                  <div className="text-xs text-gray-500 pt-2 border-t border-gray-700">
                    UTC {tz.offset > 0 ? '+' : ''}{tz.offset}:00
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            Last updated: {new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
