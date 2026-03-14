'use client';

import { motion } from 'framer-motion';
import { Result } from '@/types';

interface Props {
  result: Result;
}

const scores = (r: Result) => [
  { label: 'Predictability', value: r.predictabilityScore, color: 'from-blue-500 to-indigo-500', desc: '예측 가능성' },
  { label: 'Consistency', value: r.consistencyScore, color: 'from-purple-500 to-violet-500', desc: '판단 일관성' },
  { label: 'Moral Flexibility', value: r.moralFlexibility, color: 'from-red-500 to-rose-500', desc: '도덕 유연성' },
  { label: 'Risk Preference', value: r.riskPreference, color: 'from-orange-500 to-amber-500', desc: '위험 선호도' },
  { label: 'Social Weight', value: r.socialWeight, color: 'from-green-500 to-emerald-500', desc: '사회적 가중치' },
  { label: 'Reaction Speed', value: r.reactionSpeedIndex, color: 'from-cyan-500 to-teal-500', desc: '반응 속도 지수' },
];

export default function ScoreCard({ result }: Props) {
  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-lg font-bold mb-5">점수 분석</h2>
      <div className="space-y-4">
        {scores(result).map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">{s.desc}</span>
              <span className="font-bold">{s.value} / 100</span>
            </div>
            <div className="h-2 bg-dark-card rounded-full overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${s.color} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${s.value}%` }}
                transition={{ delay: i * 0.1 + 0.3, duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
