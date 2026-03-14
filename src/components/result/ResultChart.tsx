'use client';

import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';
import { Result } from '@/types';

interface Props {
  result: Result;
}

export default function ResultChart({ result }: Props) {
  const data = [
    { subject: '예측가능성', value: result.predictabilityScore },
    { subject: '일관성', value: result.consistencyScore },
    { subject: '도덕유연성', value: result.moralFlexibility },
    { subject: '위험선호', value: result.riskPreference },
    { subject: '사회성', value: result.socialWeight },
    { subject: '반응속도', value: result.reactionSpeedIndex },
  ];

  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-lg font-bold mb-4">레이더 분석</h2>
      <ResponsiveContainer width="100%" height={280}>
        <RadarChart data={data}>
          <PolarGrid stroke="#2d2d4e" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 12 }} />
          <Radar
            name="score"
            dataKey="value"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
