interface ScoreGaugeProps {
  score: number; // 0–100, driven externally by animation
  color: string;
  size?: number;
}

export default function ScoreGauge({ score, color, size = 268 }: ScoreGaugeProps) {
  const r = (size / 2) - 14;
  const circumference = Math.PI * r;
  const progressDash = (score / 100) * circumference;

  return (
    <svg width={size} height={size / 2 + 20} viewBox={`0 0 ${size} ${size / 2 + 20}`} style={{ overflow: 'visible' }}>
      {/* Track */}
      <path
        d={`M ${14} ${size / 2} A ${r} ${r} 0 0 1 ${size - 14} ${size / 2}`}
        fill="none"
        stroke="rgba(0,0,0,0.08)"
        strokeWidth="12"
        strokeLinecap="round"
      />
      {/* Progress — no CSS transition; parent drives this via rAF */}
      <path
        d={`M ${14} ${size / 2} A ${r} ${r} 0 0 1 ${size - 14} ${size / 2}`}
        fill="none"
        stroke={color}
        strokeWidth="12"
        strokeLinecap="round"
        strokeDasharray={`${progressDash} ${circumference}`}
      />
    </svg>
  );
}
