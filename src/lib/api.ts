import axios from 'axios';
import { Question, QuestionResponse, Result, Session } from '@/types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
  headers: { 'Content-Type': 'application/json' },
});

export const sessionsApi = {
  create: (deviceType?: string): Promise<Session> =>
    api.post('/sessions', { deviceType }).then((r) => r.data),
  complete: (id: string): Promise<Session> =>
    api.patch(`/sessions/${id}/complete`).then((r) => r.data),
  saveResponses: (id: string, responses: QuestionResponse[]): Promise<void> =>
    api.post(`/sessions/${id}/responses`, { responses }).then((r) => r.data),
};

export const questionsApi = {
  getRandom: (): Promise<{ questions: Question[]; total: number }> =>
    api.get('/questions/random').then((r) => r.data),
};

export const resultsApi = {
  calculate: (sessionId: string): Promise<Result> =>
    api.post(`/results/${sessionId}`).then((r) => r.data),
  get: (sessionId: string): Promise<Result> =>
    api.get(`/results/${sessionId}`).then((r) => r.data),
};

export default api;
