import React, { useState, useEffect } from 'react';

export default function DigitalClock() {
  const [times, setTimes] = useState({});
  const [selectedZone, setSelectedZone] = useState(null);

  const timeZones = [
    { name: 'New York', zone: 'America/New_York', offset: -5, emoji: '🗽' },
    { name: 'London', zone: 'Europe/London', offset: 0, emoji: '🇬🇧' },
    { name: 'Paris', zone: 'Europe/Paris', offset: 1, emoji: '🇫🇷' },
    { name: 'Dubai', zone: 'Asia/Dubai', offset: 4, emoji: '🇦🇪' },
    { name: 'Mumbai', zone: 'Asia/Kolkata', offset: 5.5, emoji: '🇮🇳' },
    { name: 'Bangkok', zone: 'Asia/Bangkok', offset: 7, emoji: '🇹🇭' },
    { name: 'Hong Kong', zone: 'Asia/Hong_Kong', offset: 8, emoji: '🇭🇰' },
    { name: 'Tokyo', zone: 'Asia/Tokyo', offset: 9, emoji: '🇯🇵' },
    { name: 'Sydney', zone: 'Australia/Sydney', offset: 10, emoji: '🇦🇺' },
    { name: 'São Paulo', zone: 'America/Sao_Paulo', offset: -3, emoji: '🇧🇷' },
    { name: 'Mexico City', zone: 'America/Mexico_City', offset: -6, emoji: '🇲🇽' },
    { name: 'Los Angeles', zone: 'America/Los_Angeles', offset: -8, emoji: '🌴' },
  ];

  useEffect(() => {
    const updateTime = () => {
      const newTimes = {};
      timeZones.forEach((tz) => {
        const now = new Date();
        const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
        const tzTime = new Date(utcTime + 3600000 * tz.offset);
        
        const hours = String(tzTime.getHours()).padStart(2, '0');
        const minutes = String(tzTime.getMinutes()).padStart(2, '0');
        const seconds = String(tzTime.getSeconds()).padStart(2, '0');
        
        newTimes[tz.name] = {
          time: `${hours}:${minutes}:${seconds}`,
          date: tzTime.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
          }),
          hour: parseInt(hours),
          period: parseInt(hours) >= 12 ? 'PM' : 'AM',
        };
      });
      setTimes(newTimes);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-black mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            ⏰ World Clock
          </h1>
          <p className="text-gray-300 text-lg md:text-xl">
            Real-time display across {timeZones.length} global time zones
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-400">Live • {new Date().toUTCString().slice(0, 16)}</span>
          </div>
        </div>

        {/* Featured Clock */}
        {selectedZone && times[selectedZone.name] && (
          <div className="mb-12">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-20 blur-2xl" />
              <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-12 shadow-2xl">
                <button
                  onClick={() => setSelectedZone(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
                >
                  ✕
                </button>
                <div className="text-center">
                  <div className="text-6xl mb-2">{selectedZone.emoji}</div>
                  <h2 className="text-4xl font-bold mb-6">{selectedZone.name}</h2>
                  <div className="font-mono text-8xl font-black text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text mb-4">
                    {times[selectedZone.name]?.time}
                  </div>
                  <p className="text-2xl text-gray-400 mb-4">
                    {times[selectedZone.name]?.date}
                  </p>
                  <p className="text-gray-500">
                    UTC {selectedZone.offset > 0 ? '+' : ''}{selectedZone.offset === Math.floor(selectedZone.offset) ? selectedZone.offset + ':00' : selectedZone.offset + ':00'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Clock Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {timeZones.map((tz) => (
            <div
              key={tz.name}
              onClick={() => setSelectedZone(tz)}
              className="group cursor-pointer"
            >
              {/* Gradient Border */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur" />
              
              {/* Card Content */}
              <div className="relative bg-gray-800/40 backdrop-blur-md border border-gray-700/50 group-hover:border-purple-500/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:scale-105">
                {/* Location Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{tz.emoji}</span>
                    <h3 className="text-lg font-bold">{tz.name}</h3>
                  </div>
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                </div>

                {/* Time Display */}
                <div className="space-y-3">
                  {/* Large Time */}
                  <div className="font-mono text-3xl md:text-4xl font-black text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                    {times[tz.name]?.time || '00:00:00'}
                  </div>

                  {/* Date */}
                  <div className="text-gray-400 text-xs uppercase tracking-widest">
                    {times[tz.name]?.date || 'Loading...'}
                  </div>

                  {/* Timezone Info */}
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-700/30">
                    <span>UTC {tz.offset > 0 ? '+' : ''}{tz.offset === Math.floor(tz.offset) ? tz.offset + ':00' : tz.offset}</span>
                    <span className="text-gray-600">{times[tz.name]?.period}</span>
                  </div>
                </div>

                {/* Hover Indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Stats Footer */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-gray-800/30 backdrop-blur rounded-lg border border-gray-700/30">
            <p className="text-gray-400 text-sm">Total Zones</p>
            <p className="text-3xl font-bold text-blue-400">{timeZones.length}</p>
          </div>
          <div className="p-4 bg-gray-800/30 backdrop-blur rounded-lg border border-gray-700/30">
            <p className="text-gray-400 text-sm">Coverage</p>
            <p className="text-3xl font-bold text-purple-400">Global</p>
          </div>
          <div className="p-4 bg-gray-800/30 backdrop-blur rounded-lg border border-gray-700/30">
            <p className="text-gray-400 text-sm">Status</p>
            <p className="text-3xl font-bold text-green-400">Live</p>
          </div>
        </div>
      </div>
    </div>
  );
}
