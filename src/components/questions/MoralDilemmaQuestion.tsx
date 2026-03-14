'use client';

import { motion } from 'framer-motion';
import { Question } from '@/types';
import { useQuizStore } from '@/stores/quizStore';

interface Props {
  question: Question;
  displayedOrder: number;
}

export default function MoralDilemmaQuestion({ question, displayedOrder }: Props) {
  const { responses, addResponse, updateResponse, getElapsedMs } = useQuizStore();
  const existing = responses.find((r) => r.questionId === question.id);

  const handleSelect = (optionId: string) => {
    const ms = getElapsedMs();
    if (existing) {
      updateResponse(question.id, { selectedOption: optionId, changedAnswer: true });
    } else {
      addResponse({ questionId: question.id, selectedOption: optionId, responseTimeMs: ms, displayedOrder, changedAnswer: false });
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-red-400 text-sm font-semibold">⚠ 윤리 딜레마</span>
      </div>
      <h2 className="text-xl font-bold mb-3">{question.text}</h2>
      {question.subText && (
        <div className="bg-dark-card border border-dark-border rounded-xl p-4 mb-6 text-gray-300 text-sm leading-relaxed">
          {question.subText}
        </div>
      )}

      {question.animationType === 'trolley_switch' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 p-4 bg-dark-card rounded-xl border border-yellow-500/20 text-center"
        >
          <div className="text-4xl mb-2">🚂</div>
          <div className="text-xs text-gray-500">트롤리 문제 — 레버를 당길 것인가?</div>
        </motion.div>
      )}

      {question.animationType === 'trolley_push' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 p-4 bg-dark-card rounded-xl border border-red-500/20 text-center"
        >
          <div className="text-4xl mb-2">🌉</div>
          <div className="text-xs text-gray-500">다리 위 문제 — 직접 행동할 것인가?</div>
        </motion.div>
      )}

      <div className="grid gap-3">
        {question.options.map((opt) => (
          <motion.button
            key={opt.id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => handleSelect(opt.id)}
            className={`p-4 rounded-xl border text-left transition-all ${
              existing?.selectedOption === opt.id
                ? 'border-red-400/60 bg-red-500/10 text-white'
                : 'border-dark-border bg-dark-card text-gray-300 hover:border-red-400/40'
            }`}
          >
            <span className="text-red-400 font-bold mr-2">{opt.id}.</span>
            {opt.text}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
