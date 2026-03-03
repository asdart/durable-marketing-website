import { useState } from 'react';

// Figma asset URLs
const durableLogo     = "https://www.figma.com/api/mcp/asset/3284ab22-4619-4518-aee7-04dba102aca2";
const wixLogo         = "https://www.figma.com/api/mcp/asset/77d6dda6-ddee-4bd8-be86-e4e99360a94a";
const squarespaceLogo = "https://www.figma.com/api/mcp/asset/2b4f9420-24d5-4552-a713-a7f8e4d12f5f";

interface Criterion {
  name: string;
  desc: string;
  durable: number;
  wix: number;
  squarespace: number;
}

interface Section {
  title: string;
  criteria: Criterion[];
}

const sections: Section[] = [
  {
    title: 'UI/UX Design',
    criteria: [
      { name: 'Clarity',          desc: 'Does the site communicate business purpose?',             durable: 100, wix: 100, squarespace: 100 },
      { name: 'Navigation',       desc: 'Can users find what they need?',                          durable: 90,  wix: 55,  squarespace: 90  },
      { name: 'Visual hierarchy', desc: 'Is information organized logically?',                     durable: 80,  wix: 55,  squarespace: 80  },
      { name: 'Calls to action',  desc: 'Are CTAs clear, relevant, and conversion-oriented?',      durable: 90,  wix: 100, squarespace: 90  },
    ],
  },
  {
    title: 'Content',
    criteria: [
      { name: 'Copy quality', desc: 'Is the generated copy specific, useful, and professional?',   durable: 100, wix: 100, squarespace: 40  },
    ],
  },
  {
    title: 'Technical',
    criteria: [
      { name: 'Performance speed',      desc: 'How fast does the page load on desktop and mobile?',        durable: 50,  wix: 35,  squarespace: 40  },
      { name: 'Mobile responsiveness',  desc: 'Does it work well on mobile devices?',                      durable: 100, wix: 100, squarespace: 60  },
      { name: 'Accessibility',          desc: 'Does it meet WCAG standards for HTML and navigation?',       durable: 90,  wix: 70,  squarespace: 60  },
      { name: 'SEO readiness',          desc: 'Does it meet WCAG standards for HTML and navigation?',       durable: 100, wix: 100, squarespace: 90  },
    ],
  },
  {
    title: 'Business readiness',
    criteria: [
      { name: 'Trust',        desc: 'Does the site show credibility through branding?',             durable: 100, wix: 100, squarespace: 100 },
      { name: 'Production',   desc: 'Is the output usable as a live business site?',               durable: 90,  wix: 80,  squarespace: 48  },
      { name: 'Time to live', desc: 'How fast can a non-technical user publish?',                  durable: 90,  wix: 100, squarespace: 65  },
    ],
  },
];

// Overall scores displayed in the column headers
const overall = {
  durable:     { score: 90, label: 'Excellent', color: '#3e7457', bg: 'rgba(255,255,255,0.25)' },
  wix:         { score: 82, label: 'Good',      color: '#3e7457', bg: 'rgba(73,138,103,0.2)'   },
  squarespace: { score: 72, label: 'Fair',      color: '#9f4c04', bg: 'rgba(251,159,40,0.2)'   },
};

type PlatformKey = 'durable' | 'wix' | 'squarespace';

const mobilePlatforms: { key: PlatformKey; label: string; logo: string; logoClass: string }[] = [
  { key: 'durable',     label: 'Durable',     logo: durableLogo,     logoClass: 'w-5 h-5' },
  { key: 'wix',         label: 'Wix Harmony', logo: wixLogo,         logoClass: 'w-8 h-6' },
  { key: 'squarespace', label: 'Squarespace', logo: squarespaceLogo, logoClass: 'w-6 h-6' },
];

function scoreColor(v: number) {
  if (v >= 85) return '#519a73';
  if (v >= 65) return '#fb9f28';
  if (v >= 50) return '#ff4b0a';
  return '#f8563f';
}

function ScoreBar({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-[100px] h-[6px] rounded-full overflow-hidden flex-shrink-0" style={{ backgroundColor: 'rgba(0,0,0,0.07)' }}>
        <div
          className="h-full rounded-full"
          style={{ width: `${score}%`, backgroundColor: scoreColor(score) }}
        />
      </div>
      <span className="text-[14px] font-semibold text-black/80 w-[26px] text-right tabular-nums">{score}</span>
    </div>
  );
}

const methodology = (
  <div className="w-full bg-white border border-black/[0.03] rounded-[24px] p-6 flex flex-col gap-6">
    <div className="flex flex-col gap-1">
      <p className="text-[14px] font-medium leading-5 text-black/80">How we tested</p>
      <p className="text-[14px] leading-5 text-black/55">
        We created identical business profiles (New Era Landscaping, a landscaping company in Phoenix, Arizona) on each platform using their AI or fastest setup option. Performance scores are from Google Lighthouse. UX criteria were evaluated by a panel of 3 UX specialists. Copy quality was scored by professional copywriters. Accessibility was audited with axe-core. Tests conducted January 2026.
      </p>
    </div>
    <button className="self-start bg-black/5 rounded-[12px] px-2 py-1 text-[14px] font-medium leading-5 text-black/55 hover:bg-black/[0.08] transition-colors">
      Read full methodology
    </button>
  </div>
);

export default function ComparisonTable() {
  const [activePlatform, setActivePlatform] = useState<PlatformKey>('durable');

  return (
    <section className="pb-16 md:pb-32 flex flex-col items-center px-6">
      <div className="max-w-[1200px] w-full flex flex-col gap-8 md:gap-12 items-center">

        {/* Header */}
        <div className="flex flex-col gap-4 items-center text-center">
          <p className="text-[14px] font-semibold leading-5 text-[#7d5d9a]">Full comparison</p>
          <h2 className="font-display text-[48px] leading-[44px] md:text-[72px] md:leading-[68px] text-black/80">
            Side-by-side breakdown
          </h2>
          <p className="text-[14px] leading-6 text-black/55">
            All 12 criteria, every platform.
          </p>
        </div>

        {/* ── MOBILE VIEW ── */}
        <div className="w-full flex flex-col gap-4 md:hidden">
          {/* Platform tabs */}
          <div className="flex items-center gap-2">
            {mobilePlatforms.map(p => (
              <button
                key={p.key}
                onClick={() => setActivePlatform(p.key)}
                className={`flex-1 py-3 px-3 rounded-2xl text-[14px] font-semibold transition-colors text-center ${
                  activePlatform === p.key
                    ? 'bg-black/80 text-white/80'
                    : 'bg-black/[0.03] text-black/80 hover:bg-black/[0.06]'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Active platform header */}
          {(() => {
            const p = mobilePlatforms.find(p => p.key === activePlatform)!;
            const ov = overall[activePlatform];
            return (
              <div className="flex items-center justify-between px-4 py-3 bg-black/[0.03] rounded-2xl">
                <div className="flex items-center gap-2">
                  <img src={p.logo} alt={p.label} className={`${p.logoClass} object-contain`} />
                  <span className="text-[16px] font-medium text-black/80">{p.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-medium px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: ov.bg, color: ov.color }}>
                    {ov.label}
                  </span>
                  <span className="text-[14px] font-semibold text-black/80 w-[26px] text-center">{ov.score}</span>
                </div>
              </div>
            );
          })()}

          {/* Criteria list */}
          <div className="w-full rounded-3xl overflow-clip border border-black/[0.06]">
            {sections.map(section => (
              <div key={section.title}>
                <div className="px-4 py-3 bg-black/[0.03] border-b border-black/[0.06]">
                  <span className="text-[13px] font-semibold text-black/55 uppercase tracking-wider">{section.title}</span>
                </div>
                {section.criteria.map(row => (
                  <div key={row.name} className="flex items-center justify-between px-4 py-4 border-t border-black/[0.06] bg-white gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-semibold text-black/80 leading-5">{row.name}</p>
                      <p className="text-[12px] text-black/40 leading-4 mt-0.5 line-clamp-2">{row.desc}</p>
                    </div>
                    <ScoreBar score={row[activePlatform]} />
                  </div>
                ))}
              </div>
            ))}
          </div>

          {methodology}
        </div>

        {/* ── DESKTOP VIEW ── */}
        <div className="w-full hidden md:flex flex-col gap-12">
          <div className="w-full rounded-3xl overflow-clip border border-black/[0.06]">

            {/* Column headers */}
            <div className="flex items-stretch border-b border-black/10 sticky top-[60px] z-10 bg-white">
              <div className="w-[268px] flex-shrink-0 px-6 py-4 flex items-end">
                <span className="text-[16px] font-medium text-black/80">Criterion</span>
              </div>

              <div className="flex flex-1 items-stretch">
                {/* Durable */}
                <div className="flex-1 bg-[#519a73] rounded-t-[16px] px-6 py-4 flex items-center justify-between border-l-2 border-r-2 border-[#519a73]">
                  <div className="flex items-center gap-1">
                    <img src={durableLogo} alt="Durable" className="w-5 h-5 object-contain flex-shrink-0" />
                    <span className="text-[16px] font-medium text-white/80">Durable</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-medium px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: 'rgba(73,138,103,0.2)', color: '#3e7457' }}>
                      {overall.durable.label}
                    </span>
                    <span className="text-[14px] font-semibold text-white/80 w-[26px] text-center">{overall.durable.score}</span>
                  </div>
                </div>

                {/* Wix */}
                <div className="flex-1 px-6 py-4 flex items-center justify-between">
                  <img src={wixLogo} alt="Wix" className="w-8 h-6 object-contain flex-shrink-0" />
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-medium px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: overall.wix.bg, color: overall.wix.color }}>
                      {overall.wix.label}
                    </span>
                    <span className="text-[14px] font-semibold text-black/80 w-[26px] text-center">{overall.wix.score}</span>
                  </div>
                </div>

                {/* Squarespace */}
                <div className="flex-1 px-6 py-4 flex items-center justify-between border-l border-black/10">
                  <div className="flex items-center gap-1.5">
                    <img src={squarespaceLogo} alt="Squarespace" className="w-6 h-6 object-contain flex-shrink-0" />
                    <span className="text-[16px] font-medium text-black/80">Squarespace</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-medium px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: overall.squarespace.bg, color: overall.squarespace.color }}>
                      {overall.squarespace.label}
                    </span>
                    <span className="text-[14px] font-semibold text-black/80 w-[26px] text-center">{overall.squarespace.score}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sections + rows */}
            {sections.map((section, si) => (
              <div key={section.title}>
                <div className="flex border-t border-black/[0.06]">
                  <div className="w-[268px] flex-shrink-0 px-6 py-3 bg-black/[0.03]">
                    <span className="text-[13px] font-semibold text-black/55 uppercase tracking-wider">{section.title}</span>
                  </div>
                  <div className="relative z-[1] flex-1 bg-black/[0.03] border-l-2 border-r-2 border-[#519a73]" />
                  <div className="flex-[2] bg-black/[0.03]" />
                </div>

                {section.criteria.map((row, ri) => {
                  const isLastRow = si === sections.length - 1 && ri === section.criteria.length - 1;
                  return (
                    <div key={row.name} className="flex items-stretch border-t border-black/[0.06]">
                      <div className="w-[268px] flex-shrink-0 px-6 py-4 bg-white">
                        <p className="text-[14px] font-semibold text-black/80 leading-5">{row.name}</p>
                        <p className="text-[12px] text-black/40 leading-4 mt-0.5">{row.desc}</p>
                      </div>
                      <div className="flex flex-1 items-center">
                        <div className={`relative z-[1] flex-1 px-6 py-4 bg-white self-stretch flex items-center justify-center border-l-2 border-r-2 border-[#519a73] ${isLastRow ? 'rounded-b-2xl border-b-2' : ''}`}>
                          <ScoreBar score={row.durable} />
                        </div>
                        <div className="flex-1 px-6 py-4 bg-white self-stretch flex items-center justify-center">
                          <ScoreBar score={row.wix} />
                        </div>
                        <div className="flex-1 px-6 py-4 bg-white border-l border-black/[0.06] self-stretch flex items-center justify-center">
                          <ScoreBar score={row.squarespace} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {methodology}
        </div>

      </div>
    </section>
  );
}
