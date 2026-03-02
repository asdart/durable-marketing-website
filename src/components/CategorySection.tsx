import { useEffect, useRef, useState } from 'react';

// Platform logo assets — local PNGs in /public/logos/
const imgDurableLogo = "/logos/Durable.png";     // Durable
const imgWixLogo     = "/logos/Wix.png";          // Wix
const imgSquarespace = "/logos/Squarespace.png";  // Squarespace
const imgHostinger   = "/logos/Hostinger.png";    // Hostinger
const imgGoDaddy     = "/logos/GoDaddy.png";      // GoDaddy
const imgReplit      = "/logos/Replit.png";        // Replit
const img10Web       = "/logos/10Web.png";         // 10Web
const imgDuda        = "/logos/Duda.png";          // Duda
const imgJimdo       = "/logos/Jimdo.png";         // Jimdo
const imgBarLines    = "https://www.figma.com/api/mcp/asset/147d4bd0-eafd-4cea-8de6-2acc08580b41"; // bar texture

const categories = [
  'Clarity', 'Navigation', 'Copy quality', 'Performance', "CTA's",
  'Mobile', 'Accessibility', 'Hierarchy', 'Trust', 'SEO', 'Production', 'Time to live',
];

interface PlatformScores {
  durable: number; wix: number; squarespace: number; hostinger: number;
  godaddy: number; replit: number; tenWeb: number; duda: number; jimdo: number;
}

const categoryData: Record<string, PlatformScores> = {
  'Clarity':       { durable: 93, wix: 67, squarespace: 72, hostinger: 68, godaddy: 85, replit: 42, tenWeb: 88, duda: 60, jimdo: 55 },
  'Navigation':    { durable: 93, wix: 72, squarespace: 80, hostinger: 65, godaddy: 80, replit: 38, tenWeb: 85, duda: 58, jimdo: 52 },
  'Copy quality':  { durable: 97, wix: 80, squarespace: 40, hostinger: 72, godaddy: 68, replit: 30, tenWeb: 75, duda: 55, jimdo: 45 },
  'Performance':   { durable: 88, wix: 75, squarespace: 48, hostinger: 80, godaddy: 65, replit: 72, tenWeb: 82, duda: 62, jimdo: 58 },
  "CTA's":         { durable: 85, wix: 78, squarespace: 75, hostinger: 65, godaddy: 75, replit: 40, tenWeb: 78, duda: 60, jimdo: 50 },
  'Mobile':        { durable: 90, wix: 82, squarespace: 78, hostinger: 72, godaddy: 78, replit: 65, tenWeb: 82, duda: 68, jimdo: 60 },
  'Accessibility': { durable: 88, wix: 70, squarespace: 72, hostinger: 68, godaddy: 70, replit: 55, tenWeb: 75, duda: 60, jimdo: 52 },
  'Hierarchy':     { durable: 78, wix: 78, squarespace: 80, hostinger: 65, godaddy: 68, replit: 60, tenWeb: 72, duda: 65, jimdo: 58 },
  'Trust':         { durable: 92, wix: 80, squarespace: 68, hostinger: 70, godaddy: 80, replit: 35, tenWeb: 78, duda: 62, jimdo: 50 },
  'SEO':           { durable: 95, wix: 85, squarespace: 75, hostinger: 78, godaddy: 75, replit: 40, tenWeb: 80, duda: 65, jimdo: 55 },
  'Production':    { durable: 90, wix: 72, squarespace: 70, hostinger: 68, godaddy: 70, replit: 55, tenWeb: 72, duda: 60, jimdo: 48 },
  'Time to live':  { durable: 95, wix: 65, squarespace: 50, hostinger: 75, godaddy: 72, replit: 60, tenWeb: 78, duda: 58, jimdo: 45 },
};

// Order matches Figma node 25022:69670
const platforms = [
  { key: 'durable',     logo: imgDurableLogo, alt: 'Durable'     },
  { key: 'wix',         logo: imgWixLogo,     alt: 'Wix'         },
  { key: 'squarespace', logo: imgSquarespace, alt: 'Squarespace' },
  { key: 'hostinger',   logo: imgHostinger,   alt: 'Hostinger'   },
  { key: 'godaddy',     logo: imgGoDaddy,     alt: 'GoDaddy'     },
  { key: 'replit',      logo: imgReplit,      alt: 'Replit'      },
  { key: 'tenWeb',      logo: img10Web,       alt: '10Web'       },
  { key: 'duda',        logo: imgDuda,        alt: 'Duda'        },
  { key: 'jimdo',       logo: imgJimdo,       alt: 'Jimdo'       },
] as const;

function getBarColor(score: number) {
  if (score >= 85) return '#519a73';
  if (score >= 65) return '#fb9f28';
  if (score >= 50) return '#ff4b0a';
  return '#f8563f';
}

function useAnimatedValue(target: number, duration = 450) {
  const [value, setValue] = useState(target);
  const valueRef = useRef(target);

  useEffect(() => {
    const from = valueRef.current;
    if (from === target) return;
    const start = performance.now();
    let rafId: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const next = Math.round(from + (target - from) * eased);
      valueRef.current = next;
      setValue(next);
      if (t < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration]);

  return value;
}

const CHART_HEIGHT = 352;

function BarItem({ score }: { score: number }) {
  const animated = useAnimatedValue(score);
  const color = getBarColor(score);
  const barHeight = Math.round(CHART_HEIGHT * animated / 100);
  // White text only on green bars (>=85); dark on yellow/orange/red
  const textColor = animated >= 85 ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.55)';

  return (
    <div
      className="flex-1 relative flex items-center justify-center bg-black/[0.05] rounded-2xl overflow-hidden shadow-[0px_1px_0px_0px_white]"
      style={{ height: CHART_HEIGHT }}
    >
      {/* Horizontal lines texture — anchored to bottom, 320px tall */}
      <div className="absolute bottom-0 inset-x-0 h-[320px]">
        <img src={imgBarLines} alt="" className="block w-full h-full object-cover" />
      </div>
      {/* Colored fill — grows from bottom */}
      <div
        className="absolute bottom-0 inset-x-0 rounded-2xl"
        style={{
          height: `${barHeight}px`,
          backgroundColor: color,
          boxShadow: 'inset 0px 4px 4px rgba(255,255,255,0.39)',
          transition: 'height 0.45s ease, background-color 0.45s ease',
        }}
      />
      {/* Score text — vertically centered in the full 352px container */}
      <span
        className="relative z-10 text-[20px] font-semibold leading-7 tracking-[0.2px] text-center"
        style={{ color: textColor, transition: 'color 0.45s ease' }}
      >
        {animated}
      </span>
      {/* Inner shadow overlay */}
      <div className="absolute inset-0 pointer-events-none rounded-2xl shadow-[inset_0px_2px_8px_rgba(0,0,0,0.09)]" />
    </div>
  );
}

function SmallScoreCircle({ score, color }: { score: number; color: string }) {
  const animated = useAnimatedValue(score);
  const r = 20;
  const circumference = 2 * Math.PI * r;
  const progress = (animated / 100) * circumference;

  return (
    <div className="relative w-[48px] h-[48px] flex-shrink-0">
      <svg width="48" height="48" viewBox="0 0 48 48">
        <circle cx={24} cy={24} r={r} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="4" />
        <circle
          cx={24} cy={24} r={r}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={`${progress} ${circumference}`}
          transform="rotate(-90 24 24)"
          style={{ transition: 'stroke-dasharray 0.45s ease, stroke 0.45s ease' }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[13px] font-semibold text-black/80">
        {animated}
      </span>
    </div>
  );
}

function AnimatedSpread({ spread }: { spread: number }) {
  const animated = useAnimatedValue(spread);
  return <>{animated} point spread</>;
}

function AnimatedRange({ min, max }: { min: number; max: number }) {
  const animMin = useAnimatedValue(min);
  const animMax = useAnimatedValue(max);
  return <>{animMin} – {animMax}</>;
}

function MobileHorizontalBar({ platform, score }: { platform: typeof platforms[number]; score: number }) {
  const animated = useAnimatedValue(score);
  const color = getBarColor(score);
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex items-center gap-2 rounded-2xl px-3 py-2.5 flex-1 min-w-0"
        style={{ backgroundColor: color }}
      >
        <img src={platform.logo} alt={platform.alt} className="w-5 h-5 object-contain flex-shrink-0" />
        <span className="text-[14px] font-medium text-white/90 truncate">{platform.alt}</span>
      </div>
      <span
        className="text-[16px] font-semibold text-black/80 w-8 text-right flex-shrink-0"
      >
        {animated}
      </span>
    </div>
  );
}

export default function CategorySection() {
  const [selected, setSelected] = useState('Navigation');
  const data = categoryData[selected];
  const scores = Object.values(data) as number[];
  const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  const rangeMin = Math.min(...scores);
  const rangeMax = Math.max(...scores);
  const spread = rangeMax - rangeMin;

  // Shared stats row
  const statsRow = (
    <div className="flex flex-col md:flex-row gap-3 md:gap-4">
      <div className="flex-1 bg-black/5 rounded-3xl px-4 py-4 flex items-center gap-4">
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <p className="text-[14px] font-medium text-black/80">Durable</p>
          <span className="text-[12px] font-medium rounded-full px-2 py-0.5 self-start" style={{ backgroundColor: 'rgba(73,138,103,0.2)', color: '#3e7457' }}>
            Best in class
          </span>
        </div>
        <SmallScoreCircle score={data.durable} color={getBarColor(data.durable)} />
      </div>
      <div className="flex-1 bg-black/5 rounded-3xl px-4 py-4 flex items-center gap-4">
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <p className="text-[14px] font-medium text-black/80">Across all platforms</p>
          <span className="text-[12px] font-medium rounded-full px-2 py-0.5 self-start bg-black/5 text-black/55">Average score</span>
        </div>
        <SmallScoreCircle score={avg} color="#fb9f28" />
      </div>
      <div className="flex-1 bg-black/5 rounded-3xl px-4 py-4 flex items-center gap-4">
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <p className="text-[14px] font-medium text-black/80"><AnimatedSpread spread={spread} /></p>
          <span className="text-[12px] font-medium rounded-full px-2 py-0.5 self-start bg-black/5 text-black/55">Range</span>
        </div>
        <div className="bg-black/5 rounded-2xl px-5 py-3 flex-shrink-0">
          <span className="text-[16px] font-medium text-black/80"><AnimatedRange min={rangeMin} max={rangeMax} /></span>
        </div>
      </div>
    </div>
  );

  return (
    <section className="pb-16 md:pb-32 flex flex-col items-center px-6 bg-white">
      <div className="max-w-[1200px] w-full flex flex-col gap-6">
        <h2 className="font-display text-[40px] leading-[44px] text-black/80">
          Category breakdown
        </h2>

        {/* ── MOBILE VIEW ── */}
        <div className="flex flex-col gap-4 md:hidden">
          {/* Dropdown */}
          <div className="relative">
            <select
              value={selected}
              onChange={e => setSelected(e.target.value)}
              className="w-full appearance-none bg-black/[0.03] rounded-2xl px-4 py-3 pr-10 text-[14px] font-medium text-black/80 outline-none cursor-pointer"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 8L10 13L15 8" stroke="rgba(0,0,0,0.55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Horizontal bars */}
          <div className="bg-black/[0.03] rounded-3xl p-4 flex flex-col gap-2">
            {platforms.map(p => (
              <MobileHorizontalBar key={p.key} platform={p} score={data[p.key as keyof PlatformScores]} />
            ))}
          </div>

          {statsRow}
        </div>

        {/* ── DESKTOP VIEW ── */}
        <div className="hidden md:flex gap-4 items-start">
          {/* Category list */}
          <div className="flex flex-col gap-2 flex-1 max-w-[389px] flex-shrink-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelected(cat)}
                className={`flex items-center gap-8 pl-4 pr-2 py-2 rounded-2xl transition-colors text-left ${
                  selected === cat ? 'bg-black/80' : 'bg-black/[0.03] hover:bg-black/[0.06]'
                }`}
              >
                <span className={`flex-1 text-[14px] font-medium leading-5 ${selected === cat ? 'text-white/80' : 'text-black/80'}`}>
                  {cat}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${selected === cat ? 'bg-white/10' : 'bg-black/10'}`}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 4L10 8L6 12" stroke={selected === cat ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>
            ))}
          </div>

          {/* Chart + stats */}
          <div className="flex flex-col gap-4 flex-1 min-w-0">
            <div className="bg-black/[0.03] rounded-3xl p-10 flex flex-col gap-4">
              <div className="flex gap-4 items-center">
                {platforms.map(p => (
                  <div key={p.key} className="flex-1 flex justify-center">
                    <img src={p.logo} alt={p.alt} className="w-8 h-8 object-contain" />
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                {platforms.map(p => (
                  <BarItem key={p.key} score={data[p.key as keyof PlatformScores]} />
                ))}
              </div>
            </div>
            {statsRow}
          </div>
        </div>

      </div>
    </section>
  );
}
