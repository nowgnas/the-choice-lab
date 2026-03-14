'use client';

import { motion } from 'framer-motion';
import { Question } from '@/types';
import { useQuizStore } from '@/stores/quizStore';

interface Props {
  question: Question;
  displayedOrder: number;
}

export default function PreferenceQuestion({ question, displayedOrder }: Props) {
  const { responses, addResponse, updateResponse, getElapsedMs } = useQuizStore();
  const existing = responses.find((r) => r.questionId === question.id);

  const handleSelect = (optionId: string) => {
    const ms = getElapsedMs();
    if (existing) {
      updateResponse(question.id, {
        selectedOption: optionId,
        changedAnswer: existing.selectedOption !== optionId,
      });
    } else {
      addResponse({
        questionId: question.id,
        selectedOption: optionId,
        responseTimeMs: ms,
        displayedOrder,
        changedAnswer: false,
      });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">{question.text}</h2>
      {question.subText && (
        <p className="text-gray-400 text-sm mb-6">{question.subText}</p>
      )}
      <div className={`grid gap-3 ${question.options.length === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {question.options.map((opt) => (
          <motion.button
            key={opt.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(opt.id)}
            className={`p-4 rounded-xl border text-left transition-all ${
              existing?.selectedOption === opt.id
                ? 'border-primary bg-primary/10 text-white'
                : 'border-dark-border bg-dark-card text-gray-300 hover:border-primary/50'
            }`}
          >
            <span className="text-primary font-bold mr-2">{opt.id}.</span>
            {opt.text}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
