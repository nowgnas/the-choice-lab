'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Question } from '@/types';
import { useQuizStore } from '@/stores/quizStore';

interface Props {
  question: Question;
  displayedOrder: number;
}

export default function ActionQuestion({ question, displayedOrder }: Props) {
  const { responses, addResponse, updateResponse, removeResponse, getElapsedMs } = useQuizStore();
  const existing = responses.find((r) => r.questionId === question.id);
  const [timeLeft, setTimeLeft] = useState(question.timeLimit || 0);
  const [expired, setExpired] = useState(false);
  const [clickOrder, setClickOrder] = useState<string[]>(() =>
    existing?.actionSequence ? (existing.actionSequence as string[]) : []
  );
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // 이미 응답했거나 만료된 경우 타이머 시작 안함
    if (question.type !== 'action_timer' || !question.timeLimit) return;
    if (existing) return;

    setTimeLeft(question.timeLimit);
    setExpired(false);

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          setExpired(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [question.id]);

  // 타이머 만료 시 자동으로 'timeout' 응답 저장 → 다음 버튼 활성화
  useEffect(() => {
    if (expired && !existing) {
      addResponse({
        questionId: question.id,
        selectedOption: 'timeout',
        responseTimeMs: getElapsedMs(),
        displayedOrder,
        changedAnswer: false,
      });
    }
  }, [expired]);

  const isTimerLocked = question.type === 'action_timer' && (expired || !!existing);

  const handleSelect = (optionId: string) => {
    if (isTimerLocked) return;
    const ms = getElapsedMs();

    if (question.type === 'action_click') {
      const newOrder = [...clickOrder, optionId];
      setClickOrder(newOrder);
      if (existing) {
        updateResponse(question.id, { selectedOption: optionId, changedAnswer: true, actionSequence: newOrder });
      } else {
        addResponse({ questionId: question.id, selectedOption: optionId, responseTimeMs: ms, displayedOrder, changedAnswer: false, actionSequence: newOrder });
      }
    } else {
      if (existing) {
        updateResponse(question.id, { selectedOption: optionId, changedAnswer: existing.selectedOption !== optionId });
      } else {
        addResponse({ questionId: question.id, selectedOption: optionId, responseTimeMs: ms, displayedOrder, changedAnswer: false });
      }
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const handleReset = () => {
    setClickOrder([]);
    removeResponse(question.id);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-green-400 text-sm font-semibold">⚡ 행동 반응형</span>
          {question.type === 'action_timer' && (
            <span className={`text-sm font-bold ${expired ? 'text-gray-500' : timeLeft <= 2 ? 'text-red-400' : 'text-yellow-400'}`}>
              {expired ? '시간 초과' : `${timeLeft}초`}
            </span>
          )}
        </div>
        {question.type === 'action_click' && (clickOrder.length > 0) && (
          <button
            onClick={handleReset}
            className="text-xs text-gray-400 hover:text-white border border-dark-border rounded-full px-3 py-1 transition-colors"
          >
            초기화
          </button>
        )}
      </div>

      <h2 className="text-xl font-bold mb-2">{question.text}</h2>
      {question.subText && <p className="text-gray-400 text-sm mb-4">{question.subText}</p>}

      {question.type === 'action_timer' && question.timeLimit && !existing && !expired && (
        <div className="mb-4 h-1.5 bg-dark-card rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-yellow-400 rounded-full"
            initial={{ width: '100%' }}
            animate={{ width: `${(timeLeft / question.timeLimit) * 100}%` }}
            transition={{ duration: 0.9, ease: 'linear' }}
          />
        </div>
      )}

      {expired && existing?.selectedOption === 'timeout' && (
        <div className="mb-4 p-3 rounded-xl bg-gray-800/50 border border-gray-700 text-gray-400 text-sm text-center">
          시간이 초과되었습니다. 다음 문제로 넘어가세요.
        </div>
      )}

      <div className={`grid gap-3 ${question.options.length <= 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {question.options.map((opt) => (
          <motion.button
            key={opt.id}
            whileHover={!isTimerLocked ? { scale: 1.02 } : {}}
            whileTap={!isTimerLocked ? { scale: 0.98 } : {}}
            onClick={() => handleSelect(opt.id)}
            disabled={isTimerLocked}
            className={`p-4 rounded-xl border text-left transition-all relative ${
              existing?.selectedOption === opt.id
                ? 'border-green-400/60 bg-green-500/10 text-white'
                : clickOrder.includes(opt.id)
                ? 'border-yellow-400/40 bg-yellow-500/5 text-gray-400'
                : isTimerLocked
                ? 'border-dark-border opacity-40 cursor-not-allowed'
                : 'border-dark-border bg-dark-card text-gray-300 hover:border-green-400/40'
            }`}
          >
            {clickOrder.includes(opt.id) && (
              <span className="absolute top-2 right-2 text-xs text-yellow-400 font-bold">
                #{clickOrder.indexOf(opt.id) + 1}
              </span>
            )}
            <span className="text-green-400 font-bold mr-2">{opt.id}.</span>
            {opt.text}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
