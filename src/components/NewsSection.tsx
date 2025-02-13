'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NewsItem {
  title: string;
  description: string;
  source: string;
}

const STATIC_NEWS: NewsItem[] = [
  {
    title: "새로운 기술 트렌드",
    description: "2024년 주목해야 할 새로운 기술 트렌드와 혁신적인 변화들을 소개합니다.",
    source: "https://news.google.com"
  },
  {
    title: "AI 발전 동향",
    description: "인공지능 기술의 최신 발전 동향과 산업에 미치는 영향에 대해 알아봅니다.",
    source: "https://news.google.com"
  },
  {
    title: "개발자 커리어",
    description: "소프트웨어 개발자의 성장과 커리어 개발을 위한 인사이트를 공유합니다.",
    source: "https://news.google.com"
  }
];

export default function NewsSection() {
  const [news] = useState<NewsItem[]>(STATIC_NEWS);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full"
    >
      <motion.div
        className="space-y-4 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar"
        layout
      >
        <AnimatePresence mode="popLayout">
          {news.map((item, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 bg-gray-900/50 border border-gray-800 rounded-2xl
                       hover:bg-gray-800/50 transition-colors"
            >
              <motion.h3
                className="text-xl font-semibold text-white mb-3
                         bg-gradient-to-r from-white to-white bg-clip-text"
              >
                {item.title}
              </motion.h3>
              <motion.p
                className="text-gray-400 mb-4 line-clamp-2"
              >
                {item.description}
              </motion.p>
              <motion.a
                href={item.source}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-400 hover:text-blue-300
                         transition-colors group-hover:translate-x-1 duration-200"
              >
                자세히 보기
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.a>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
} 