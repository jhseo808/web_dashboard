'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface TimeRecord {
  startTime: Date | null;
  endTime: Date | null;
  expectedEndTime: Date | null;
}

export default function WorkTime() {
  const [timeRecord, setTimeRecord] = useState<TimeRecord>({
    startTime: null,
    endTime: null,
    expectedEndTime: null,
  });

  const handleStartWork = () => {
    const now = new Date();
    const expected = new Date(now.getTime() + (9 * 60 * 60 * 1000)); // 9시간 후
    setTimeRecord({
      startTime: now,
      endTime: null,
      expectedEndTime: expected,
    });
  };

  const handleEndWork = () => {
    setTimeRecord(prev => ({
      ...prev,
      endTime: new Date(),
    }));
  };

  const handleReset = () => {
    setTimeRecord({
      startTime: null,
      endTime: null,
      expectedEndTime: null,
    });
  };

  const formatTime = (date: Date | null) => {
    if (!date) return '--:--';
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative p-4 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl overflow-hidden
                 border border-transparent bg-clip-padding"
      style={{
        backgroundImage: `
          linear-gradient(to right, #000, #000),
          linear-gradient(to right, rgba(37, 99, 235, 0.5), rgba(147, 51, 234, 0.5))
        `,
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
      }}
    >
      <div className="relative z-10">
        <div className="flex gap-2 mb-3">
          <motion.button
            onClick={handleStartWork}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 px-3 py-1.5 bg-green-500 text-white text-sm rounded-lg shadow-lg
                     hover:bg-green-600 transition-colors duration-200
                     backdrop-blur-sm bg-opacity-80 hover:bg-opacity-90"
            disabled={timeRecord.startTime !== null}
          >
            출근
          </motion.button>
          <motion.button
            onClick={handleEndWork}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 px-3 py-1.5 bg-blue-500 text-white text-sm rounded-lg shadow-lg
                     hover:bg-blue-600 transition-colors duration-200
                     backdrop-blur-sm bg-opacity-80 hover:bg-opacity-90"
            disabled={!timeRecord.startTime || timeRecord.endTime !== null}
          >
            퇴근
          </motion.button>
          <motion.button
            onClick={handleReset}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-8 h-8 flex items-center justify-center bg-gray-500 text-white text-sm rounded-lg shadow-lg
                     hover:bg-gray-600 transition-colors duration-200
                     backdrop-blur-sm bg-opacity-80 hover:bg-opacity-90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </motion.button>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
            <div className="text-[10px] text-gray-400 mb-0.5">출근 시간</div>
            <div className="text-sm font-bold text-white">
              {formatTime(timeRecord.startTime)}
            </div>
          </div>
          <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
            <div className="text-[10px] text-gray-400 mb-0.5">예상 퇴근</div>
            <div className="text-sm font-bold text-white">
              {formatTime(timeRecord.expectedEndTime)}
            </div>
          </div>
          <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
            <div className="text-[10px] text-gray-400 mb-0.5">퇴근 시간</div>
            <div className="text-sm font-bold text-white">
              {formatTime(timeRecord.endTime)}
            </div>
          </div>
        </div>
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-20 blur-xl" />
    </motion.div>
  );
} 