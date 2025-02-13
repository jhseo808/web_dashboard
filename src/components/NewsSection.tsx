'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OpenAI from 'openai';

interface NewsItem {
  title: string;
  description: string;
  source: string;
}

export default function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });

  const fetchNews = async () => {
    setLoading(true);
    setError(null);

    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `오늘의 주요 뉴스를 제공해주세요. 각 뉴스는 제목, 설명, 출처 링크를 포함해야 합니다. 
                     최소 3개의 주요 뉴스를 JSON 형식으로 반환해주세요.`
          },
          {
            role: "user",
            content: "오늘의 주요 뉴스를 알려주세요."
          }
        ],
        model: "gpt-4-turbo-preview",
        response_format: { type: "json_object" }
      });

      const response = completion.choices[0].message.content;
      if (response) {
        const newsData = JSON.parse(response);
        setNews(newsData.news || []);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '뉴스를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full"
    >
      <motion.button
        onClick={fetchNews}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mb-8 px-6 py-3 bg-gray-900/50 border border-gray-800 rounded-2xl
                 text-white text-lg font-medium shadow-lg hover:bg-gray-800/50
                 transition-colors flex items-center justify-center gap-2"
        disabled={loading}
      >
        {loading ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full"
            />
            <span>뉴스 불러오는 중...</span>
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>뉴스 새로고침</span>
          </>
        )}
      </motion.button>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-4 bg-red-500/20 border border-red-500/30 rounded-2xl text-red-400"
        >
          {error}
        </motion.div>
      )}

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