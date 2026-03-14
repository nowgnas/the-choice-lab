export type QuestionCategory = 'preference' | 'cognitive' | 'moral' | 'action' | 'value';
export type QuestionType =
  | 'binary'
  | 'multiple'
  | 'likert'
  | 'action_click'
  | 'action_drag'
  | 'action_timer'
  | 'ranking';

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: number;
  category: QuestionCategory;
  type: QuestionType;
  text: string;
  subText?: string;
  options: QuestionOption[];
  tags: string[];
  animationType?: string;
  pairedQuestionId?: number;
  reverseQuestion?: boolean;
  timeLimit?: number;
}

export interface QuestionResponse {
  questionId: number;
  selectedOption: string;
  responseTimeMs: number;
  displayedOrder: number;
  changedAnswer?: boolean;
  actionSequence?: unknown;
}

export interface Session {
  id: string;
  startedAt: string;
  completedAt?: string;
  deviceType?: string;
}

export interface Result {
  id: string;
  sessionId: string;
  predictabilityScore: number;
  consistencyScore: number;
  moralFlexibility: number;
  riskPreference: number;
  socialWeight: number;
  reactionSpeedIndex: number;
  decisionStyle: string;
  moralTendency: string;
  personaType: string;
  summary: string;
}
