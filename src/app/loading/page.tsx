'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  '당신의 선택 패턴을 분석 중입니다...',
  '윤리 판단과 행동 반응을 정리하고 있습니다...',
  '당신과 비슷한 패턴을 탐색하고 있습니다...',
  '결과 리포트를 생성하고 있습니다...',
];

export default function LoadingPage() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % messages.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="relative w-24 h-24 mx-auto mb-10">
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-primary/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            style={{ borderTopColor: '#6366f1' }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-3xl">🧠</div>
        </div>

        <h2 className="text-2xl font-bold mb-4">분석 중...</h2>

        <AnimatePresence mode="wait">
          <motion.p
            key={msgIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-gray-400"
          >
            {messages[msgIndex]}
          </motion.p>
        </AnimatePresence>
      </motion.div>
    </main>
  );
}
