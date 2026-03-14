import { create } from 'zustand';
import { Question, QuestionResponse, Result } from '@/types';

interface QuizState {
  sessionId: string | null;
  questions: Question[];
  responses: QuestionResponse[];
  currentIndex: number;
  startTime: number | null;

  setSessionId: (id: string) => void;
  setQuestions: (questions: Question[]) => void;
  addResponse: (response: QuestionResponse) => void;
  updateResponse: (questionId: number, update: Partial<QuestionResponse>) => void;
  removeResponse: (questionId: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  startTimer: () => void;
  getElapsedMs: () => number;
  reset: () => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  sessionId: null,
  questions: [],
  responses: [],
  currentIndex: 0,
  startTime: null,

  setSessionId: (id) => set({ sessionId: id }),
  setQuestions: (questions) => set({ questions }),
  addResponse: (response) =>
    set((state) => ({ responses: [...state.responses, response] })),
  updateResponse: (questionId, update) =>
    set((state) => ({
      responses: state.responses.map((r) =>
        r.questionId === questionId ? { ...r, ...update } : r
      ),
    })),
  removeResponse: (questionId) =>
    set((state) => ({
      responses: state.responses.filter((r) => r.questionId !== questionId),
    })),
  nextQuestion: () =>
    set((state) => ({
      currentIndex: Math.min(state.currentIndex + 1, state.questions.length - 1),
    })),
  prevQuestion: () =>
    set((state) => ({ currentIndex: Math.max(state.currentIndex - 1, 0) })),
  startTimer: () => set({ startTime: Date.now() }),
  getElapsedMs: () => {
    const { startTime } = get();
    return startTime ? Date.now() - startTime : 0;
  },
  reset: () =>
    set({ sessionId: null, questions: [], responses: [], currentIndex: 0, startTime: null }),
}));

// localStorage helpers
export function saveResult(sessionId: string, result: Result): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`result_${sessionId}`, JSON.stringify(result));
}

export function loadResult(sessionId: string): Result | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(`result_${sessionId}`);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Result;
  } catch {
    return null;
  }
}
