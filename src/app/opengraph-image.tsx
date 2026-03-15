import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'The Choice Lab — 당신은 어떻게 선택하는 사람인가요?';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0f0f23 100%)',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* 배경 원형 장식 */}
        <div
          style={{
            position: 'absolute',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
            top: -80,
            right: -80,
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)',
            bottom: -60,
            left: -60,
          }}
        />

        {/* 서비스 이름 */}
        <p
          style={{
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#818cf8',
            marginBottom: 20,
          }}
        >
          The Choice Lab
        </p>

        {/* 메인 타이틀 */}
        <h1
          style={{
            fontSize: 62,
            fontWeight: 800,
            color: '#ffffff',
            textAlign: 'center',
            lineHeight: 1.2,
            margin: '0 80px 24px',
          }}
        >
          당신은 어떻게
        </h1>
        <h1
          style={{
            fontSize: 62,
            fontWeight: 800,
            background: 'linear-gradient(90deg, #818cf8, #a855f7)',
            backgroundClip: 'text',
            color: 'transparent',
            textAlign: 'center',
            lineHeight: 1.2,
            margin: '0 80px 32px',
          }}
        >
          선택하는 사람인가요?
        </h1>

        {/* 설명 */}
        <p
          style={{
            fontSize: 24,
            color: '#9ca3af',
            textAlign: 'center',
            margin: '0 100px 48px',
            lineHeight: 1.6,
          }}
        >
          선택의 결과가 아닌, 선택하는 방식을 분석합니다
        </p>

        {/* 태그 칩 */}
        <div style={{ display: 'flex', gap: 12 }}>
          {['윤리 딜레마', '행동 반응', '가치 판단', '15문항'].map((tag) => (
            <div
              key={tag}
              style={{
                padding: '8px 20px',
                borderRadius: 9999,
                border: '1px solid rgba(129,140,248,0.4)',
                color: '#a5b4fc',
                fontSize: 18,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
