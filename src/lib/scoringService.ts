import { questions } from './questions';
import { QuestionResponse, Result } from '@/types';

function clamp(value: number, min = 0, max = 100): number {
  return Math.round(Math.max(min, Math.min(max, value)));
}

function noise(range = 10): number {
  return Math.round((Math.random() - 0.5) * range);
}

function calcPredictability(responses: QuestionResponse[]): number {
  const questionMap = new Map(questions.map((q) => [q.id, q]));
  const pairs: Array<[QuestionResponse, QuestionResponse]> = [];

  for (const r of responses) {
    const q = questionMap.get(r.questionId);
    if (!q?.pairedQuestionId) continue;
    const paired = responses.find((p) => p.questionId === q.pairedQuestionId);
    if (paired) pairs.push([r, paired]);
  }

  if (pairs.length === 0) return clamp(55 + noise(20));

  let consistent = 0;
  for (const [a, b] of pairs) {
    const q = questionMap.get(a.questionId);
    const same = a.selectedOption === b.selectedOption;
    if (same === !q?.reverseQuestion) consistent++;
  }

  const base = (consistent / pairs.length) * 80;
  return clamp(base + noise(16), 20, 95);
}

function calcConsistency(responses: QuestionResponse[]): number {
  // 답변 변경 비율 기반 — 변경 없을수록 높지만 최대 92로 제한
  const changed = responses.filter((r) => r.changedAnswer).length;
  const changeRate = changed / responses.length;
  const base = 92 - Math.round(changeRate * 70);
  return clamp(base + noise(8), 25, 92);
}

function calcMoralFlexibility(responses: QuestionResponse[]): number {
  // 윤리 딜레마에서 공리주의(A) 선택 비율
  // A 선택 = 결과 중심 (유연), B 선택 = 원칙 중심 (경직)
  // 범위: 10(완전 원칙주의) ~ 95(완전 공리주의)
  const moral = responses.filter((r) => {
    const q = questions.find((q) => q.id === r.questionId);
    return q?.category === 'moral';
  });
  if (moral.length === 0) return 50;
  const utilitarian = moral.filter((r) => r.selectedOption === 'A').length;
  return clamp(10 + Math.round((utilitarian / moral.length) * 75) + noise(12), 10, 95);
}

function calcRiskPreference(responses: QuestionResponse[]): number {
  // risk 태그 질문에서 A(위험 수용) 비율
  // 범위: 10(극도 안전 지향) ~ 95(극도 위험 선호)
  // B만 선택해도 10~20 수준을 유지 — 0은 표시하지 않음
  const riskQ = responses.filter((r) => {
    const q = questions.find((q) => q.id === r.questionId);
    return q?.tags.includes('risk');
  });
  if (riskQ.length === 0) return clamp(40 + noise(10));
  const aCount = riskQ.filter((r) => r.selectedOption === 'A').length;
  return clamp(10 + Math.round((aCount / riskQ.length) * 82) + noise(8), 10, 95);
}

function calcSocialWeight(responses: QuestionResponse[]): number {
  // social/empathy 태그 질문에서 사회적 선택(A, C) 비율
  // 범위: 10(매우 개인 중심) ~ 95(매우 사회 중심)
  const socialQ = responses.filter((r) => {
    const q = questions.find((q) => q.id === r.questionId);
    return q?.tags.includes('social') || q?.tags.includes('empathy');
  });
  if (socialQ.length === 0) return clamp(40 + noise(10));
  const socialChoices = socialQ.filter((r) => ['A', 'C'].includes(r.selectedOption)).length;
  return clamp(10 + Math.round((socialChoices / socialQ.length) * 82) + noise(8), 10, 95);
}

function calcReactionSpeed(responses: QuestionResponse[]): number {
  // timeout 응답 제외하고 평균 응답 시간 계산
  const valid = responses.filter((r) => r.selectedOption !== 'timeout');
  if (valid.length === 0) return 30;
  const avg = valid.reduce((s, r) => s + r.responseTimeMs, 0) / valid.length;
  if (avg < 2000) return clamp(85 + noise(8));
  if (avg < 4000) return clamp(70 + noise(8));
  if (avg < 7000) return clamp(52 + noise(8));
  if (avg < 12000) return clamp(35 + noise(8));
  return clamp(22 + noise(8), 15, 38);
}

function determinePersona(
  p: number, c: number, m: number, r: number, s: number, speed: number
): { personaType: string; summary: string } {
  if (p > 75 && c > 70)
    return { personaType: '패턴형 전략가', summary: '당신은 직관적으로 보이지만 실제로는 매우 일관된 기준으로 선택하는 사람입니다. 높은 예측 가능성과 강한 판단 일관성을 가진 타입입니다.' };
  if (r > 70 && m > 60)
    return { personaType: '계산형 최적화가', summary: '당신은 손익과 효율을 빠르게 계산하는 경향이 있습니다. 공리적이고 전략적인 판단이 강한 타입입니다.' };
  if (c > 75 && m < 35)
    return { personaType: '원칙형 판단자', summary: '당신은 윤리와 규칙을 우선시합니다. 결과보다 과정과 정당성을 중시하는 타입입니다.' };
  if (speed > 75)
    return { personaType: '감각형 반응가', summary: '당신은 빠르게 반응하고 직관적으로 선택합니다. 일관성은 다소 낮지만 추진력이 높은 타입입니다.' };
  if (p < 40)
    return { personaType: '예측 불가 탐험가', summary: '당신은 기존 군집에 쉽게 속하지 않습니다. 선택 편차가 크고 독특한 응답 패턴을 보이는 타입입니다.' };
  if (s > 65 && m < 45)
    return { personaType: '관계형 공감자', summary: '당신은 사람과의 관계를 중심으로 판단합니다. 원칙보다 상황과 감정에 민감하게 반응하는 타입입니다.' };
  return { personaType: '상황형 생존가', summary: '당신은 절대 기준보다 맥락을 중시합니다. 문제에 따라 판단이 유연하게 변하는 타입입니다.' };
}

export function calculateResult(sessionId: string, responses: QuestionResponse[]): Result {
  const predictabilityScore = calcPredictability(responses);
  const consistencyScore    = calcConsistency(responses);
  const moralFlexibility    = calcMoralFlexibility(responses);
  const riskPreference      = calcRiskPreference(responses);
  const socialWeight        = calcSocialWeight(responses);
  const reactionSpeedIndex  = calcReactionSpeed(responses);

  const decisionStyle =
    reactionSpeedIndex > 70 && consistencyScore > 70 ? '원칙형'
    : reactionSpeedIndex > 70 ? '직관형'
    : riskPreference > 65     ? '계산형'
    : consistencyScore < 40   ? '상황형'
    : '숙고형';

  const moralTendency =
    moralFlexibility > 65 ? '공리주의 경향'
    : socialWeight > 65    ? '관계 중심'
    : moralFlexibility < 30 ? '원칙주의 경향'
    : '균형형';

  const { personaType, summary } = determinePersona(
    predictabilityScore, consistencyScore, moralFlexibility,
    riskPreference, socialWeight, reactionSpeedIndex
  );

  return {
    id: sessionId,
    sessionId,
    predictabilityScore,
    consistencyScore,
    moralFlexibility,
    riskPreference,
    socialWeight,
    reactionSpeedIndex,
    decisionStyle,
    moralTendency,
    personaType,
    summary,
  };
}
