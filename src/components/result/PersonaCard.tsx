'use client';

import { motion } from 'framer-motion';
import { Result } from '@/types';

interface Props {
  result: Result;
}

const personaEmoji: Record<string, string> = {
  '패턴형 전략가': '🎯',
  '원칙형 판단자': '⚖️',
  '감각형 반응가': '⚡',
  '상황형 생존가': '🌊',
  '예측 불가 탐험가': '🔮',
  '계산형 최적화가': '🧮',
};

export default function PersonaCard({ result }: Props) {
  const emoji = personaEmoji[result.personaType] || '🧠';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-8"
    >
      <div className="text-6xl mb-4">{emoji}</div>
      <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">
        당신은
      </p>
      <h1 className="text-4xl font-bold mb-4">{result.personaType}</h1>
      <p className="text-gray-400 text-lg max-w-md mx-auto leading-relaxed">{result.summary}</p>
      <div className="flex justify-center gap-3 mt-4">
        <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm">
          {result.decisionStyle}
        </span>
        <span className="px-3 py-1 rounded-full bg-secondary/20 text-secondary text-sm">
          {result.moralTendency}
        </span>
      </div>
    </motion.div>
  );
}
