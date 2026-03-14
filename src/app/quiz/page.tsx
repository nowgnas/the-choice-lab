'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuizStore, saveResult } from '@/stores/quizStore';
import { calculateResult } from '@/lib/scoringService';
import ProgressBar from '@/components/questions/ProgressBar';
import QuestionCard from '@/components/questions/QuestionCard';

export default function QuizPage() {
  const router = useRouter();
  const {
    sessionId,
    questions,
    responses,
    currentIndex,
    nextQuestion,
    startTimer,
  } = useQuizStore();

  useEffect(() => {
    if (!sessionId || questions.length === 0) {
      router.replace('/');
    } else {
      startTimer();
    }
  }, [sessionId, questions, router, startTimer]);

  if (!sessionId || questions.length === 0) return null;

  const currentQuestion = questions[currentIndex];
  const currentResponse = responses.find((r) => r.questionId === currentQuestion.id);
  const isLast = currentIndex === questions.length - 1;
  const canProceed = !!currentResponse;

  const handleFinish = () => {
    router.push('/loading');
    const result = calculateResult(sessionId, responses);
    saveResult(sessionId, result);
    setTimeout(() => {
      router.replace(`/result/${sessionId}`);
    }, 2200);
  };

  return (
    <main className="min-h-screen flex flex-col px-4 py-6 max-w-2xl mx-auto">
      <ProgressBar current={currentIndex + 1} total={questions.length} />

      <div className="flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
          >
            <QuestionCard question={currentQuestion} displayedOrder={currentIndex} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-3 mt-6">
        {isLast ? (
          <button
            onClick={handleFinish}
            disabled={!canProceed}
            className="flex-1 py-3 rounded-full bg-gradient-to-r from-primary to-secondary font-semibold disabled:opacity-40"
          >
            결과 확인하기
          </button>
        ) : (
          <button
            onClick={nextQuestion}
            disabled={!canProceed}
            className="flex-1 py-3 rounded-full bg-gradient-to-r from-primary to-secondary font-semibold disabled:opacity-40"
          >
            다음
          </button>
        )}
      </div>
    </main>
  );
}
