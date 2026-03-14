'use client';

import { Question } from '@/types';
import PreferenceQuestion from './PreferenceQuestion';
import MoralDilemmaQuestion from './MoralDilemmaQuestion';
import ActionQuestion from './ActionQuestion';

interface Props {
  question: Question;
  displayedOrder: number;
}

export default function QuestionCard({ question, displayedOrder }: Props) {
  const renderQuestion = () => {
    if (question.category === 'moral') {
      return <MoralDilemmaQuestion question={question} displayedOrder={displayedOrder} />;
    }
    if (question.category === 'action') {
      return <ActionQuestion question={question} displayedOrder={displayedOrder} />;
    }
    return <PreferenceQuestion question={question} displayedOrder={displayedOrder} />;
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary capitalize">
          {question.category}
        </span>
        {question.tags.slice(0, 2).map((tag) => (
          <span key={tag} className="text-xs px-2 py-1 rounded-full bg-dark-card text-gray-400">
            #{tag}
          </span>
        ))}
      </div>
      {renderQuestion()}
    </div>
  );
}
