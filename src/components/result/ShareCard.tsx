'use client';

import { RefObject } from 'react';
import { motion } from 'framer-motion';
import { Result } from '@/types';

interface Props {
  result: Result;
  captureRef: RefObject<HTMLDivElement>;
}

export default function ShareCard({ result, captureRef }: Props) {
  const handleDownload = async () => {
    if (!captureRef.current) return;
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(captureRef.current, {
        backgroundColor: '#0f0f23',
        scale: 2,
        useCORS: true,
      });
      const link = document.createElement('a');
      link.download = 'human-algorithm-result.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch {
      alert('이미지 저장에 실패했습니다.');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('링크가 복사되었습니다!');
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-lg font-bold mb-4">결과 공유</h2>
      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          onClick={handleDownload}
          className="flex-1 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-sm font-semibold"
        >
          이미지 저장
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          onClick={handleCopyLink}
          className="flex-1 py-3 rounded-full border border-dark-border text-gray-300 text-sm hover:text-white"
        >
          링크 복사
        </motion.button>
      </div>
    </div>
  );
}
