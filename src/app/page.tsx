'use client';

import DigitalClock from '../components/DigitalClock';
import Weather from '../components/Weather';
import TodoList from '../components/TodoList';
import NewsSection from '../components/NewsSection';
import WorkTime from '../components/WorkTime';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center z-10"
        >
          <h1 className="text-8xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-2xl text-gray-400">Your personal command center</p>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
      </section>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4">
        {/* Clock & Weather Section */}
        <section className="py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-8"
          >
            <div className="space-y-4">
              <h2 className="text-5xl font-semibold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Time & Weather
              </h2>
              <DigitalClock />
            </div>
            <div className="flex items-center justify-center">
              <Weather />
            </div>
          </motion.div>
        </section>

        {/* Work Management Section */}
        <section className="py-12 border-t border-gray-800">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-8"
          >
            <div className="space-y-4">
              <h2 className="text-5xl font-semibold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Work Management
              </h2>
              <WorkTime />
            </div>
            <div className="flex items-center justify-center">
              <TodoList />
            </div>
          </motion.div>
        </section>

        {/* News Section */}
        <section className="py-12 border-t border-gray-800">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-semibold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Latest News
            </h2>
            <NewsSection />
          </motion.div>
        </section>

        {/* Notion & Calendar Section */}
        <section className="py-12 border-t border-gray-800">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-8"
          >
            {/* Notion Link */}
            <div>
              <h2 className="text-5xl font-semibold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Workspace
              </h2>
              <motion.a
                href="https://jhseo808.notion.site/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                className="block p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl
                         border border-gray-800 hover:border-gray-700 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <img 
                    src="https://www.notion.so/images/logo-ios.png" 
                    alt="Notion" 
                    className="w-12 h-12"
                  />
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">Notion Workspace</h3>
                    <p className="text-gray-400">Open workspace in new tab →</p>
                  </div>
                </div>
              </motion.a>
            </div>

            {/* Calendar */}
            <div>
              <h2 className="text-5xl font-semibold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Calendar
              </h2>
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-gray-800">
                <iframe
                  src="https://calendar.google.com/calendar/embed?height=400&wkst=1&bgcolor=%23ffffff&ctz=Asia%2FSeoul&showTitle=0&showNav=1&showPrint=0&showTabs=0&showCalendars=0&showTz=0"
                  className="w-full h-[300px] rounded-2xl"
                  frameBorder="0"
                  scrolling="no"
                />
              </div>
            </div>
          </motion.div>
        </section>
      </div>

      {/* Subtle background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none" />
    </main>
  );
}
