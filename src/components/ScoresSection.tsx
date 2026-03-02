import { useEffect, useRef, useState } from 'react';
import ScoreGauge from './ScoreGauge';

// Logo assets — local PNGs in /public/logos/
const durableLogo     = "/logos/Durable.png";
const wixLogo         = "/logos/Wix.png";
const squarespaceLogo = "/logos/Squarespace.png";
const hostingerLogo   = "/logos/Hostinger.png";
const godaddyLogo     = "/logos/GoDaddy.png";
const replitLogo      = "/logos/Replit.png";
const tenWebLogo      = "/logos/10Web.png";
const dudaLogo        = "/logos/Duda.png";
const jimdoLogo       = "/logos/Jimdo.png";

const DURATION = 1200;

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function scoreColor(score: number) {
  if (score >= 85) return '#519a73';
  if (score >= 65) return '#fb9f28';
  if (score >= 50) return '#ff4b0a';
  return '#f8563f';
}

interface Criterion {
  label: string;
  score: number;
}

// ─── Criteria data (12 per platform, avg = overall score) ────────────────────

const DURABLE_CRITERIA: Criterion[] = [
  { label: 'Clarity',       score: 100 },
  { label: 'Navigation',    score: 90  },
  { label: 'Hierarchy',     score: 78  },
  { label: "CTA's",         score: 90  },
  { label: 'Copy quality',  score: 100 },
  { label: 'Performance',   score: 50  },
  { label: 'Mobile',        score: 100 },
  { label: 'Accessibility', score: 90  },
  { label: 'SEO',           score: 100 },
  { label: 'Trust',         score: 100 },
  { label: 'Production',    score: 90  },
  { label: 'Time to live',  score: 90  },
  // avg = 1078/12 ≈ 90 ✓
];

const WIX_CRITERIA: Criterion[] = [
  { label: 'Clarity',       score: 100 },
  { label: 'Navigation',    score: 72  },
  { label: 'Hierarchy',     score: 78  },
  { label: "CTA's",         score: 85  },
  { label: 'Copy quality',  score: 90  },
  { label: 'Performance',   score: 60  },
  { label: 'Mobile',        score: 88  },
  { label: 'Accessibility', score: 85  },
  { label: 'SEO',           score: 88  },
  { label: 'Trust',         score: 80  },
  { label: 'Production',    score: 75  },
  { label: 'Time to live',  score: 83  },
  // avg = 984/12 = 82 ✓
];

const TENWEB_CRITERIA: Criterion[] = [
  { label: 'Clarity',       score: 88 },
  { label: 'Navigation',    score: 85 },
  { label: 'Hierarchy',     score: 72 },
  { label: "CTA's",         score: 78 },
  { label: 'Copy quality',  score: 75 },
  { label: 'Performance',   score: 82 },
  { label: 'Mobile',        score: 82 },
  { label: 'Accessibility', score: 75 },
  { label: 'SEO',           score: 80 },
  { label: 'Trust',         score: 78 },
  { label: 'Production',    score: 72 },
  { label: 'Time to live',  score: 78 },
  // avg = 945/12 ≈ 79 ✓
];

const GODADDY_CRITERIA: Criterion[] = [
  { label: 'Clarity',       score: 85 },
  { label: 'Navigation',    score: 80 },
  { label: 'Hierarchy',     score: 68 },
  { label: "CTA's",         score: 75 },
  { label: 'Copy quality',  score: 68 },
  { label: 'Performance',   score: 65 },
  { label: 'Mobile',        score: 78 },
  { label: 'Accessibility', score: 70 },
  { label: 'SEO',           score: 75 },
  { label: 'Trust',         score: 80 },
  { label: 'Production',    score: 70 },
  { label: 'Time to live',  score: 72 },
  // avg = 886/12 ≈ 74 ✓
];

const SQUARESPACE_CRITERIA: Criterion[] = [
  { label: 'Clarity',       score: 100 },
  { label: 'Navigation',    score: 90  },
  { label: 'Hierarchy',     score: 78  },
  { label: "CTA's",         score: 75  },
  { label: 'Copy quality',  score: 40  },
  { label: 'Performance',   score: 48  },
  { label: 'Mobile',        score: 78  },
  { label: 'Accessibility', score: 72  },
  { label: 'SEO',           score: 75  },
  { label: 'Trust',         score: 68  },
  { label: 'Production',    score: 70  },
  { label: 'Time to live',  score: 70  },
  // avg = 864/12 = 72 ✓
];

const HOSTINGER_CRITERIA: Criterion[] = [
  { label: 'Clarity',       score: 68 },
  { label: 'Navigation',    score: 65 },
  { label: 'Hierarchy',     score: 65 },
  { label: "CTA's",         score: 65 },
  { label: 'Copy quality',  score: 72 },
  { label: 'Performance',   score: 80 },
  { label: 'Mobile',        score: 72 },
  { label: 'Accessibility', score: 68 },
  { label: 'SEO',           score: 78 },
  { label: 'Trust',         score: 70 },
  { label: 'Production',    score: 68 },
  { label: 'Time to live',  score: 75 },
  // avg = 846/12 ≈ 71 ✓
];

const DUDA_CRITERIA: Criterion[] = [
  { label: 'Clarity',       score: 60 },
  { label: 'Navigation',    score: 58 },
  { label: 'Hierarchy',     score: 65 },
  { label: "CTA's",         score: 60 },
  { label: 'Copy quality',  score: 55 },
  { label: 'Performance',   score: 62 },
  { label: 'Mobile',        score: 68 },
  { label: 'Accessibility', score: 60 },
  { label: 'SEO',           score: 65 },
  { label: 'Trust',         score: 62 },
  { label: 'Production',    score: 60 },
  { label: 'Time to live',  score: 58 },
  // avg = 733/12 ≈ 61 ✓
];

const JIMDO_CRITERIA: Criterion[] = [
  { label: 'Clarity',       score: 55 },
  { label: 'Navigation',    score: 52 },
  { label: 'Hierarchy',     score: 58 },
  { label: "CTA's",         score: 50 },
  { label: 'Copy quality',  score: 45 },
  { label: 'Performance',   score: 58 },
  { label: 'Mobile',        score: 60 },
  { label: 'Accessibility', score: 52 },
  { label: 'SEO',           score: 55 },
  { label: 'Trust',         score: 50 },
  { label: 'Production',    score: 48 },
  { label: 'Time to live',  score: 45 },
  // avg = 628/12 ≈ 52 ✓
];

const REPLIT_CRITERIA: Criterion[] = [
  { label: 'Clarity',       score: 42 },
  { label: 'Navigation',    score: 38 },
  { label: 'Hierarchy',     score: 60 },
  { label: "CTA's",         score: 40 },
  { label: 'Copy quality',  score: 30 },
  { label: 'Performance',   score: 72 },
  { label: 'Mobile',        score: 65 },
  { label: 'Accessibility', score: 55 },
  { label: 'SEO',           score: 40 },
  { label: 'Trust',         score: 35 },
  { label: 'Production',    score: 55 },
  { label: 'Time to live',  score: 60 },
  // avg = 592/12 ≈ 49 ✓
];

// ─── Platform configs sorted by score descending ─────────────────────────────

interface PlatformConfig {
  rank: string;
  rankColor: string;
  rankBg: string;
  score: number;
  gaugeColor: string;
  logoSrc: string;
  logoAlt: string;
  platformName: string;
  description: string;
  criteria: Criterion[];
}

const PLATFORMS: PlatformConfig[] = [
  {
    rank: 'Excellent',
    rankColor: 'rgba(255,255,255,0.8)',
    rankBg: 'rgba(255,255,255,0.10)',
    score: 90,
    gaugeColor: '#519a73',
    logoSrc: durableLogo,
    logoAlt: 'Durable',
    platformName: 'Durable',
    description: 'AI-powered business websites in 30 seconds',
    criteria: DURABLE_CRITERIA,
  },
  {
    rank: 'Good',
    rankColor: '#3e7457',
    rankBg: 'rgba(73,138,103,0.2)',
    score: 82,
    gaugeColor: '#519a73',
    logoSrc: wixLogo,
    logoAlt: 'Wix',
    platformName: 'Wix Harmony',
    description: 'AI-assisted drag-and-drop builder',
    criteria: WIX_CRITERIA,
  },
  {
    rank: 'Fair',
    rankColor: '#9f4c04',
    rankBg: 'rgba(251,159,40,0.2)',
    score: 72,
    gaugeColor: '#fb9f28',
    logoSrc: squarespaceLogo,
    logoAlt: 'Squarespace',
    platformName: 'Squarespace',
    description: 'Design-focused website templates',
    criteria: SQUARESPACE_CRITERIA,
  },
  {
    rank: 'Fair',
    rankColor: '#9f4c04',
    rankBg: 'rgba(251,159,40,0.2)',
    score: 71,
    gaugeColor: '#fb9f28',
    logoSrc: hostingerLogo,
    logoAlt: 'Hostinger',
    platformName: 'Hostinger',
    description: 'Web hosting with AI website builder',
    criteria: HOSTINGER_CRITERIA,
  },
  {
    rank: 'Poor',
    rankColor: '#8b1a0a',
    rankBg: 'rgba(248,86,63,0.2)',
    score: 49,
    gaugeColor: '#f8563f',
    logoSrc: replitLogo,
    logoAlt: 'Replit',
    platformName: 'Replit',
    description: 'AI coding environment for developers',
    criteria: REPLIT_CRITERIA,
  },
  {
    rank: 'Fair',
    rankColor: '#9f4c04',
    rankBg: 'rgba(251,159,40,0.2)',
    score: 74,
    gaugeColor: '#fb9f28',
    logoSrc: godaddyLogo,
    logoAlt: 'GoDaddy',
    platformName: 'GoDaddy',
    description: 'Domain registrar & website builder',
    criteria: GODADDY_CRITERIA,
  },
  {
    rank: 'Good',
    rankColor: '#3e7457',
    rankBg: 'rgba(73,138,103,0.2)',
    score: 79,
    gaugeColor: '#519a73',
    logoSrc: tenWebLogo,
    logoAlt: '10Web',
    platformName: '10Web',
    description: 'AI-powered WordPress website builder',
    criteria: TENWEB_CRITERIA,
  },
  {
    rank: 'Fair',
    rankColor: '#9f4c04',
    rankBg: 'rgba(251,159,40,0.2)',
    score: 61,
    gaugeColor: '#fb9f28',
    logoSrc: dudaLogo,
    logoAlt: 'Duda',
    platformName: 'Duda',
    description: 'White-label website builder platform',
    criteria: DUDA_CRITERIA,
  },
  {
    rank: 'Below avg',
    rankColor: '#9f4c04',
    rankBg: 'rgba(251,159,40,0.2)',
    score: 52,
    gaugeColor: '#fb9f28',
    logoSrc: jimdoLogo,
    logoAlt: 'Jimdo',
    platformName: 'Jimdo',
    description: 'Simple website creator for small business',
    criteria: JIMDO_CRITERIA,
  },
];

const PREVIEW_COUNT = 4;

interface CriteriaBarProps {
  label: string;
  score: number;
  active: boolean;
}

function CriteriaBar({ label, score, active }: CriteriaBarProps) {
  return (
    <div className="flex items-center gap-4 h-5">
      <span className="flex-1 text-[14px] leading-5 text-black/80">{label}</span>
      <div className="w-[100px] h-[6px] rounded-full bg-black/5 overflow-hidden relative shadow-[0px_1px_0px_0px_white]">
        <div
          className="h-full rounded-full"
          style={{
            width: active ? `${score}%` : '0%',
            backgroundColor: scoreColor(score),
            transition: active ? `width ${DURATION}ms ease` : 'none',
          }}
        />
      </div>
      <span className="w-[26px] text-[14px] leading-5 font-semibold text-black/80 text-right">{score}</span>
    </div>
  );
}

interface PlatformCardProps extends PlatformConfig {
  started: boolean;
  delay?: number;
  expanded: boolean;
  onToggle: () => void;
}

function PlatformCard({
  rank, rankColor, rankBg, score, gaugeColor,
  logoSrc, logoAlt, platformName, description, criteria,
  started, delay = 0, expanded, onToggle,
}: PlatformCardProps) {
  const [animated, setAnimated] = useState(0);
  const [extraActive, setExtraActive] = useState(false);

  useEffect(() => {
    if (!started) return;
    let rafId: number;
    const begin = performance.now() + delay;
    const tick = (now: number) => {
      if (now < begin) { rafId = requestAnimationFrame(tick); return; }
      const t = Math.min((now - begin) / DURATION, 1);
      setAnimated(Math.round(easeInOut(t) * score));
      if (t < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [started, score, delay]);

  useEffect(() => {
    if (expanded && started) {
      const id = setTimeout(() => setExtraActive(true), 80);
      return () => clearTimeout(id);
    }
  }, [expanded, started]);

  const preview = criteria.slice(0, PREVIEW_COUNT);
  const extra = criteria.slice(PREVIEW_COUNT);

  return (
    <div className="w-full md:w-[385px] md:flex-shrink-0 bg-black/[0.03] rounded-3xl flex flex-col items-center">
      <div className="flex flex-col gap-10 items-center pt-8 pb-6 px-8 w-full">
        {/* Gauge + badge + number */}
        <div className="flex flex-col items-center w-full">
          <div className="relative w-[268px] h-[160px]">
            <ScoreGauge score={animated} color={gaugeColor} size={268} />
            <div className="absolute top-[48px] left-0 right-0 flex flex-col items-center gap-2">
              <span
                className="text-[12px] font-medium leading-4 px-2 py-0.5 rounded-full"
                style={{ backgroundColor: rankBg, color: rankColor }}
              >
                {rank}
              </span>
              <span className="text-[56px] font-semibold leading-[60px] text-black/80 tracking-[0.56px]">
                {animated}
              </span>
            </div>
          </div>

          {/* Platform info */}
          <div className="flex flex-col items-center gap-0.5 mt-6">
            <img
              src={logoSrc}
              alt={logoAlt}
              className="w-8 h-8 object-contain"
            />
            <p className="text-[16px] font-semibold leading-6 text-black/80 text-center">{platformName}</p>
            <p className="text-[14px] leading-5 text-black/55 text-center">{description}</p>
          </div>
        </div>

        {/* Criteria bars */}
        <div className="flex flex-col gap-4 w-full">
          {preview.map(c => (
            <CriteriaBar key={c.label} label={c.label} score={c.score} active={started} />
          ))}

          <div
            className="overflow-hidden transition-all duration-300 ease-in-out"
            style={{ maxHeight: expanded ? `${extra.length * 36}px` : '0px' }}
          >
            <div className="flex flex-col gap-4 pt-0">
              {extra.map(c => (
                <CriteriaBar key={c.label} label={c.label} score={c.score} active={extraActive} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer toggle */}
      <div className="w-full p-1 mt-auto">
        <button
          onClick={onToggle}
          className="w-full bg-black/5 rounded-[20px] py-3 px-4 flex items-center justify-center gap-2 hover:bg-black/[0.07] transition-colors"
        >
          <span className="text-[12px] font-medium text-black/55 tracking-[0.12px]">
            {expanded ? 'Hide all criterias' : 'Click to see all criterias'}
          </span>
          <svg
            width="20" height="20" viewBox="0 0 20 20" fill="none"
            className="transition-transform duration-300"
            style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            <path d="M5 8L10 13L15 8" stroke="rgba(0,0,0,0.55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── Custom pill scrollbar ────────────────────────────────────────────────────

function CustomScrollbar({ scrollRef }: { scrollRef: React.RefObject<HTMLDivElement | null> }) {
  const [progress, setProgress] = useState(0);
  const [visibleRatio, setVisibleRatio] = useState(0.33);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
      setVisibleRatio(el.clientWidth / el.scrollWidth);
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [scrollRef]);

  const TRACK_W = 100;
  const thumbW = Math.max(24, visibleRatio * TRACK_W);
  const maxOffset = TRACK_W - thumbW;
  const thumbLeft = progress * maxOffset;

  function handleThumbMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    const el = scrollRef.current;
    if (!el) return;
    e.preventDefault();
    e.stopPropagation();
    isDragging.current = true;

    const startX = e.clientX;
    const startScroll = el.scrollLeft;
    const maxScroll = el.scrollWidth - el.clientWidth;

    const onMove = (ev: MouseEvent) => {
      const dx = ev.clientX - startX;
      const scrollDelta = maxOffset > 0 ? (dx / maxOffset) * maxScroll : 0;
      el.scrollLeft = Math.max(0, Math.min(maxScroll, startScroll + scrollDelta));
    };
    const onUp = () => {
      isDragging.current = false;
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }

  function handleTrackClick(e: React.MouseEvent<HTMLDivElement>) {
    const el = scrollRef.current;
    const track = trackRef.current;
    if (!el || !track) return;
    const rect = track.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const p = Math.max(0, Math.min(1, maxOffset > 0 ? (x - thumbW / 2) / maxOffset : 0));
    el.scrollTo({ left: p * (el.scrollWidth - el.clientWidth), behavior: 'smooth' });
  }

  return (
    <div className="flex justify-center mt-6">
      <div className="bg-black/[0.05] rounded-full flex items-center h-[22px] px-[5px] gap-3">
        {/* Track */}
        <div
          ref={trackRef}
          className="relative cursor-pointer"
          style={{ width: TRACK_W, height: 22 }}
          onClick={handleTrackClick}
        >
          <div
            className="absolute top-1/2 -translate-y-1/2 bg-black/[0.28] rounded-full cursor-grab active:cursor-grabbing select-none"
            style={{
              width: thumbW,
              left: thumbLeft,
              height: 12,
              transition: isDragging.current ? 'none' : 'left 0.08s ease',
            }}
            onMouseDown={handleThumbMouseDown}
            onClick={e => e.stopPropagation()}
          />
        </div>

      </div>
    </div>
  );
}

export default function ScoresSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);
  const [expandedSet, setExpandedSet] = useState<Set<number>>(new Set());

  function handleToggle(index: number) {
    setExpandedSet(prev => {
      const next = new Set(prev);
      next.has(index) ? next.delete(index) : next.add(index);
      return next;
    });
  }

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setStarted(true); observer.disconnect(); }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cards = PLATFORMS.map((platform, i) => (
    <PlatformCard
      key={platform.logoAlt}
      {...platform}
      started={started}
      delay={i * 80}
      expanded={expandedSet.has(i)}
      onToggle={() => handleToggle(i)}
    />
  ));

  return (
    <section ref={sectionRef} className="pb-16 md:pb-32 flex flex-col items-center">
      {/* Header */}
      <div className="max-w-[1200px] w-full flex flex-col gap-6 md:gap-12 items-center px-6 mb-6 md:mb-12">
        <div className="flex flex-col gap-4 items-center">
          <p className="text-[14px] font-semibold leading-5 text-[#7d5d9a] text-center">Overall Rankings</p>
          <div className="max-w-[480px] flex flex-col gap-4 items-center text-center">
            <h2 className="font-display text-[48px] leading-[44px] md:text-[72px] md:leading-[68px] text-black/80">
              How each platform scored
            </h2>
            <p className="text-[14px] leading-6 text-black/55">
              Weighted scores across 12 evaluation criteria — UX, content, technical performance, and business readiness. Click any card to see the full breakdown.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile: stacked full-width cards */}
      <div className="flex flex-col gap-4 w-full px-6 md:hidden">
        {cards}
      </div>

      {/* Desktop: horizontal scroll — full viewport width */}
      <div ref={scrollRef} className="hidden md:block w-full overflow-x-auto no-scrollbar">
        <div
          className="flex gap-[17px] items-start pb-2"
          style={{
            paddingLeft: 'max(24px, calc((100vw - 1200px) / 2 + 24px))',
            paddingRight: 'max(24px, calc((100vw - 1200px) / 2 + 24px))',
          }}
        >
          {cards}
        </div>
      </div>

      {/* Custom pill scrollbar — desktop only */}
      <div className="hidden md:block">
        <CustomScrollbar scrollRef={scrollRef} />
      </div>
    </section>
  );
}
