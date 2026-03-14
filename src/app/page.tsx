'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function MainPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-2xl mx-auto"
      >
        <p className="text-primary font-semibold tracking-widest text-sm uppercase mb-4">
          The Choice Lab
        </p>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          당신은 어떻게
          <br />
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            선택하는 사람인가요?
          </span>
        </h1>
        <p className="text-gray-400 text-lg mb-4">
          선택의 결과가 아닌, 선택하는 방식을 분석합니다.
          <br />
          윤리 딜레마, 행동 반응, 가치 판단을 통해
          <br />
          당신의 의사결정 패턴을 해석해드립니다.
        </p>
        <p className="text-gray-500 text-sm mb-10">
          100개 질문 풀 · 랜덤 15문항 · 6가지 분석 축 · 7가지 유형
        </p>

        <Link href="/intro">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="bg-gradient-to-r from-primary to-secondary text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow"
          >
            실험 시작하기
          </motion.button>
        </Link>

        <p className="mt-4 text-gray-500 text-sm">예상 소요 시간: 3~5분 · 총 15문항</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="mt-20 grid grid-cols-3 gap-4 max-w-2xl w-full px-4"
      >
        {[
          { label: '예측 가능성', desc: '선택 패턴이 얼마나 일정한지' },
          { label: '도덕 유연성', desc: '원칙과 결과 사이, 어디에 서는지' },
          { label: '의사결정 스타일', desc: '직관으로 고르는가, 계산 후 고르는가' },
        ].map((item) => (
          <div key={item.label} className="glass-card rounded-xl p-4 text-center">
            <div className="text-primary font-semibold text-sm">{item.label}</div>
            <div className="text-gray-500 text-xs mt-1">{item.desc}</div>
          </div>
        ))}
      </motion.div>
    </main>
  );
}
