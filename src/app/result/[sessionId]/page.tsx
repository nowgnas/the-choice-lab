'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Result } from '@/types';
import { loadResult } from '@/stores/quizStore';
import { useQuizStore } from '@/stores/quizStore';
import ScoreCard from '@/components/result/ScoreCard';
import PersonaCard from '@/components/result/PersonaCard';
import ResultChart from '@/components/result/ResultChart';
import ShareCard from '@/components/result/ShareCard';

export default function ResultPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const router = useRouter();
  const reset = useQuizStore((s) => s.reset);
  const [result, setResult] = useState<Result | null>(null);
  const captureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sessionId) return;
    const stored = loadResult(sessionId);
    if (stored) {
      setResult(stored);
    } else {
      router.replace('/');
    }
  }, [sessionId, router]);

  if (!result) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-gray-400">결과를 불러오는 중...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-12 max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
        <div ref={captureRef} className="space-y-8 bg-dark pb-4">
          <PersonaCard result={result} />
          <ScoreCard result={result} />
          <ResultChart result={result} />
        </div>
        <ShareCard result={result} captureRef={captureRef} />

        <div className="flex gap-3 pt-4">
          <button
            onClick={() => { reset(); router.push('/'); }}
            className="flex-1 py-3 rounded-full border border-dark-border text-gray-400 hover:text-white transition-colors"
          >
            다시 테스트하기
          </button>
        </div>
      </motion.div>
    </main>
  );
}
