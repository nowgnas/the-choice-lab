import { Question, QuestionCategory } from '@/types';
import { questions } from './questions';

const MORAL_GROUPS: number[][] = [
  [51, 52, 53, 58, 69],
  [54, 65, 66],
  [56, 57, 68],
  [59, 67],
  [60, 61, 62, 70],
  [55, 63, 64],
];

const ACTION_GROUPS: number[][] = [
  [71, 73, 78, 79, 81],
  [72, 76, 83],
  [74, 80, 82, 85],
  [75, 77],
];

function pickOne<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomSubset<T>(arr: T[], count: number): T[] {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, Math.min(count, arr.length));
}

function pickOnePerGroup(groups: number[][]): Question[] {
  return groups.map((group) => {
    const candidates = questions.filter((q) => group.includes(q.id));
    return pickOne(candidates);
  });
}

export function getRandomQuestions(): Question[] {
  const byCategory = (cat: QuestionCategory) =>
    questions.filter((q) => q.category === cat);

  const moralSelected = getRandomSubset(pickOnePerGroup(MORAL_GROUPS), 4);
  const actionSelected = getRandomSubset(pickOnePerGroup(ACTION_GROUPS), 3);

  const selected: Question[] = [
    ...getRandomSubset(byCategory('preference'), 5),
    ...getRandomSubset(byCategory('cognitive'), 2),
    ...moralSelected,
    ...actionSelected,
    ...getRandomSubset(byCategory('value'), 1),
  ];

  return selected.sort(() => Math.random() - 0.5);
}
