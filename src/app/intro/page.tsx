'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { getRandomQuestions } from '@/lib/questionService';
import { useQuizStore } from '@/stores/quizStore';

const infoItems = [
  { icon: '🎲', text: '총 100개 질문 풀에서 랜덤으로 15개 출제' },
  { icon: '🧠', text: '일반 선택형 / 심리 성향형 / 윤리 딜레마형 / 행동 반응형 포함' },
  { icon: '⚖️', text: '윤리 딜레마는 비슷한 유형이 겹치지 않도록 유형별로 1개씩 출제' },
  { icon: '📊', text: '결과는 예측 가능성 및 판단 패턴 중심으로 분석' },
  { icon: '✅', text: '정답은 없습니다. 솔직하게 답할수록 더 흥미로운 결과가 나옵니다' },
  { icon: '⏱️', text: '예상 소요 시간: 3~5분' },
];

export default function IntroPage() {
  const router = useRouter();
  const { setSessionId, setQuestions, reset } = useQuizStore();

  const handleStart = () => {
    reset();
    const sessionId = crypto.randomUUID();
    const questions = getRandomQuestions();
    setSessionId(sessionId);
    setQuestions(questions);
    router.push('/quiz');
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg w-full"
      >
        <h1 className="text-3xl font-bold mb-2 text-center">실험 안내</h1>
        <p className="text-gray-400 text-center mb-10">시작 전 아래 내용을 확인하세요</p>

        <div className="space-y-4 mb-10">
          {infoItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-xl p-4 flex items-start gap-3"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-gray-300 text-sm">{item.text}</span>
            </motion.div>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => router.back()}
            className="flex-1 py-3 rounded-full border border-dark-border text-gray-400 hover:text-white transition-colors"
          >
            돌아가기
          </button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleStart}
            className="flex-2 flex-grow py-3 rounded-full bg-gradient-to-r from-primary to-secondary font-semibold"
          >
            실험 시작하기
          </motion.button>
        </div>
      </motion.div>
    </main>
  );
}
