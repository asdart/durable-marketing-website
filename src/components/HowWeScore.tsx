import { useState } from 'react';

// Figma assets
const imgEllipse763 = "https://www.figma.com/api/mcp/asset/ce684dd7-1433-4e17-8750-7296d81f9754";
const imgEllipse764 = "https://www.figma.com/api/mcp/asset/5b415485-c3d0-4799-a922-5650668d7da2";
const imgGroup1     = "https://www.figma.com/api/mcp/asset/50f91943-1ad1-4d5b-a795-a21a9f5e29da";
const imgShadow     = "https://www.figma.com/api/mcp/asset/432edc93-e8c6-4f47-a1d3-e3959a155eb0";
const imgBellIcon   = "https://www.figma.com/api/mcp/asset/08d31beb-bdad-40b3-b42a-3922510c7485";

interface Criterion {
  name: string;
  weight: number;
  desc: string;
  scoring: string;
}

interface Category {
  id: string;
  label: string;
  weight: number;
  criteria: Criterion[];
}

const categories: Category[] = [
  {
    id: 'uiux',
    label: 'UI & UX Design',
    weight: 34,
    criteria: [
      {
        name: 'Clarity',
        weight: 9,
        desc: '"Does the generated site communicate business purpose immediately?"',
        scoring: 'Scored by Claude AI using an above-the-fold screenshot. Sub-criteria: business type identifiable within 5 seconds, core offering clearly stated, business name or location visible, headline specific to this business rather than generic placeholder text.',
      },
      {
        name: 'Navigation',
        weight: 9,
        desc: '"Can users find what they need?"',
        scoring: 'Primary nav evaluated for presence of essential pages (Home, Services, Contact). Points deducted for broken links, missing anchor scrolling, or no mobile hamburger menu.',
      },
      {
        name: 'Visual Hierarchy',
        weight: 8,
        desc: '"Is information organized logically?"',
        scoring: 'Visual flow assessed by human reviewers using a standardized rubric. Sub-criteria: clear heading sizes, logical content order, consistent spacing, and scannable layout.',
      },
      {
        name: 'Calls to Action',
        weight: 8,
        desc: '"Are CTAs clear, relevant, and conversion-oriented?"',
        scoring: 'Human review of above-the-fold and full-page CTAs. Sub-criteria: primary CTA visible without scrolling, action-oriented language, business-specific (not generic "Click here").',
      },
    ],
  },
  {
    id: 'content',
    label: 'Content',
    weight: 12,
    criteria: [
      {
        name: 'Copy quality',
        weight: 6,
        desc: '"Is the generated copy specific, useful, and professional?"',
        scoring: 'Professional copywriters evaluated generated text for specificity, professionalism, and relevance to the business. Generic placeholder text scored 0. Spelling and grammar errors deducted 5 points each.',
      },
      {
        name: 'Brand voice',
        weight: 3,
        desc: '"Does the content maintain a consistent, professional tone throughout?"',
        scoring: 'Human reviewers assessed tone consistency across headline, body copy, and CTAs. Sub-criteria: consistent formality level, no jarring tonal shifts, voice appropriate to industry (e.g. professional for law, friendly for retail).',
      },
      {
        name: 'Content completeness',
        weight: 3,
        desc: '"Is all essential business information present on the generated site?"',
        scoring: 'Checklist review for: services offered, location/service area, contact method, business hours (where applicable), and a brief about/story section. Each missing element deducts points proportionally.',
      },
    ],
  },
  {
    id: 'technical',
    label: 'Technical',
    weight: 36,
    criteria: [
      {
        name: 'Performance speed',
        weight: 8,
        desc: '"How fast does the page load on desktop and mobile?"',
        scoring: 'Google Lighthouse performance score. Desktop and mobile averaged. Score 90+ = 100 pts, 80–89 = 75 pts, 70–79 = 50 pts, below 70 = 25 pts.',
      },
      {
        name: 'Mobile responsiveness',
        weight: 10,
        desc: '"Does it work well on mobile devices?"',
        scoring: 'Manual review on iPhone 14 and Pixel 7 at 390px width. Sub-criteria: readable text without pinch-zoom, functional navigation, no horizontal overflow, images resize properly.',
      },
      {
        name: 'Accessibility',
        weight: 10,
        desc: '"Does it meet WCAG standards for HTML and navigation?"',
        scoring: 'Automated axe-core audit plus manual keyboard navigation test. Each critical issue deducts 10 points. Minor issues deduct 5 points each.',
      },
      {
        name: 'SEO readiness',
        weight: 8,
        desc: '"Are the basic on-page SEO fundamentals in place?"',
        scoring: 'Lighthouse SEO audit. Sub-criteria: title tag, meta description, heading hierarchy, image alt text, canonical URL, and mobile-friendliness.',
      },
    ],
  },
  {
    id: 'business',
    label: 'Business readiness',
    weight: 18,
    criteria: [
      {
        name: 'Trust',
        weight: 6,
        desc: '"Does the site show credibility through branding and social proof?"',
        scoring: 'Human review checking for logo, consistent brand colors, business address/phone, about page, and social proof (reviews, certifications, photos of real work).',
      },
      {
        name: 'Production',
        weight: 6,
        desc: '"Is the output usable as a live business site without manual editing?"',
        scoring: '100 = launch-ready as-is, 75 = minor copy edits only, 50 = moderate rework needed, 25 = major edits required, 0 = must rebuild from scratch.',
      },
      {
        name: 'Time to live',
        weight: 6,
        desc: '"How fast can a non-technical user publish a working site?"',
        scoring: 'Timed from account creation to first public publish. Under 5 min = 100, 5–10 min = 75, 10–20 min = 50, 20–30 min = 25, over 30 min = 0.',
      },
    ],
  },
];

function WeightBadge({ weight }: { weight: number }) {
  return (
    <div className="flex items-center gap-1.5 h-8">
      <span className="text-[12px] font-medium text-black/55 tracking-[0.12px]">weight</span>
      <div className="relative w-8 h-8">
        {/* gray ring */}
        <div className="absolute inset-0">
          <img src={imgEllipse763} alt="" className="block w-full h-full" />
        </div>
        {/* colored arc */}
        <div className="absolute" style={{ bottom: '83.89%', left: '21.9%', right: '50%', top: '0.23%' }}>
          <img src={imgEllipse764} alt="" className="block w-full h-full" />
        </div>
        <span className="absolute inset-0 flex items-center justify-center text-[12px] font-semibold text-black/80">
          {weight}%
        </span>
      </div>
    </div>
  );
}

function CriterionCard({ criterion }: { criterion: Criterion }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-black/[0.03] rounded-3xl flex flex-col overflow-hidden">
      {/* Top content */}
      <div className="flex flex-col gap-4 p-5">
        <div className="flex items-start justify-between">
          <p className="text-[16px] font-semibold text-black/80 leading-6">{criterion.name}</p>
          <WeightBadge weight={criterion.weight} />
        </div>
        <p className="text-[14px] leading-5 text-black/55">{criterion.desc}</p>
      </div>

      {/* Footer */}
      <div className="p-1">
        <div className="bg-black/[0.05] rounded-[20px] overflow-hidden">
          <button
            onClick={() => setOpen(v => !v)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 hover:bg-black/[0.03] transition-colors"
          >
            <span className="text-[12px] font-medium text-black/55 tracking-[0.12px]">How it's scored</span>
            <svg
              width="20" height="20" viewBox="0 0 20 20" fill="none"
              className="transition-transform duration-300 flex-shrink-0"
              style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >
              <path d="M5 8L10 13L15 8" stroke="rgba(0,0,0,0.55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Expanded scoring detail */}
          <div
            className="overflow-hidden transition-all duration-300 ease-in-out"
            style={{ maxHeight: open ? '200px' : '0px' }}
          >
            <p className="text-[14px] leading-5 text-black/55 px-4 pb-4">
              {criterion.scoring}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HowWeScore() {
  const [activeId, setActiveId] = useState('uiux');
  const activeCategory = categories.find(c => c.id === activeId)!;

  return (
    <section className="pb-16 md:pb-32 flex flex-col items-center px-6">
      <div className="max-w-[1200px] w-full flex flex-col gap-8 md:gap-12 items-center">

        {/* Header */}
        <div className="flex flex-col gap-4 items-center text-center max-w-[480px]">
          <p className="text-[14px] font-semibold leading-5 text-[#7d5d9a]">Full comparison</p>
          <h2 className="font-display text-[48px] leading-[44px] md:text-[72px] md:leading-[68px] text-black/80">How we score</h2>
          <p className="text-[14px] leading-6 text-black/55">
            Every platform was evaluated across 12 criteria, each weighted by its impact on real-world business outcomes. Scores are 0–100; overall scores are weighted averages.
          </p>
        </div>

        {/* Browser mockup — desktop only */}
        <div className="relative w-full h-[310px] hidden md:block">

          {/* ── Browser frame (behind the card) ── */}
          <div className="absolute inset-0">
            {/* Bottom-fade shadow blur */}
            <div
              className="absolute left-[74px] right-[74px] top-[74px] h-[262px] rounded-[12px] opacity-60"
              style={{
                background: 'linear-gradient(to right, white, #999 48%, white)',
                filter: 'blur(23.8px)',
                maskImage: `url('${imgShadow}')`,
                maskSize: '113.88% 316px',
                maskPosition: '-6.94% -74px',
                maskRepeat: 'no-repeat',
              }}
            />
            {/* White browser rectangle */}
            <div
              className="absolute left-px right-px top-[72px] h-[286px] bg-white border border-black/[0.05] rounded-3xl"
              style={{
                maskImage: `url('${imgShadow}')`,
                maskSize: '100% 316px',
                maskPosition: '0% -72px',
                maskRepeat: 'no-repeat',
              }}
            />
            {/* Window dots */}
            <div className="absolute left-[21px] top-[89px] w-2 h-2 rounded-full bg-black/10"
              style={{ maskImage: `url('${imgShadow}')`, maskSize: '1198px 316px', maskPosition: '-20px -89px', maskRepeat: 'no-repeat' }} />
            <div className="absolute left-[34px] top-[89px] w-2 h-2 rounded-full bg-black/10"
              style={{ maskImage: `url('${imgShadow}')`, maskSize: '1198px 316px', maskPosition: '-33px -89px', maskRepeat: 'no-repeat' }} />
            <div className="absolute left-[47px] top-[89px] w-2 h-2 rounded-full bg-black/10"
              style={{ maskImage: `url('${imgShadow}')`, maskSize: '1198px 316px', maskPosition: '-46px -89px', maskRepeat: 'no-repeat' }} />
            {/* Content image */}
            <div
              className="absolute left-[17px] top-[106px] w-[1166px] h-[314px]"
              style={{
                maskImage: `url('${imgShadow}')`,
                maskSize: '1198px 316px',
                maskPosition: '-16px -106px',
                maskRepeat: 'no-repeat',
              }}
            >
              <img src={imgGroup1} alt="" className="absolute block w-full h-full object-cover" />
            </div>
          </div>

          {/* White card overlay */}
          <div className="absolute inset-x-[120px] top-0 bg-white border border-black/[0.05] rounded-3xl p-6 flex flex-col gap-4 shadow-sm">
            {/* Prompt */}
            <div className="flex flex-col gap-2">
              <p className="text-[14px] font-medium text-black/80">Prompt used</p>
              <div className="bg-black/[0.03] rounded-2xl px-6 py-4">
                <p className="text-[16px] text-black/80 text-center">
                  "Build a website for New Era Landscaping, a landscaping company in Phoenix, Arizona"
                </p>
              </div>
            </div>

            {/* Alert */}
            <div className="bg-[rgba(251,159,40,0.1)] rounded-2xl px-4 py-4 flex gap-4 items-start">
              <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center mt-0.5">
                <img src={imgBellIcon} alt="" className="w-[15px] h-4 object-contain" />
              </div>
              <p className="text-[14px] font-medium leading-5 text-[#9f4c04]">
                Some site builders do not support free-text AI prompts. Where prompt-based generation was unavailable, the same business name, location, and industry were entered manually and the fastest available setup method was used. All other conditions — device, browser, network, and account tier — were kept as close to identical as possible across all platforms.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile prompt + alert card */}
        <div className="flex flex-col gap-4 w-full md:hidden">
          <div className="flex flex-col gap-2">
            <p className="text-[14px] font-medium text-black/80">Prompt used</p>
            <div className="bg-black/[0.03] rounded-2xl px-4 py-4">
              <p className="text-[16px] text-black/80 text-center">
                "Build a website for New Era Landscaping, a landscaping company in Phoenix, Arizona"
              </p>
            </div>
          </div>
          <div className="bg-[rgba(251,159,40,0.1)] rounded-2xl px-4 py-4 flex gap-3 items-start">
            <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center mt-0.5">
              <img src={imgBellIcon} alt="" className="w-[15px] h-4 object-contain" />
            </div>
            <p className="text-[14px] font-medium leading-5 text-[#9f4c04]">
              Some site builders do not support free-text AI prompts. Where prompt-based generation was unavailable, the same business name, location, and industry were entered manually.
            </p>
          </div>
        </div>

        {/* Category tabs + criteria grid */}
        <div className="flex flex-col gap-8 md:gap-12 items-center w-full">

          {/* Tabs — horizontally scrollable on mobile */}
          <div className="w-full overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 w-max mx-auto">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveId(cat.id)}
                  className={`flex items-center gap-2 pl-4 pr-3 py-3 rounded-3xl text-[14px] font-semibold transition-colors whitespace-nowrap ${
                    activeId === cat.id
                      ? 'bg-black/80 text-white/80'
                      : 'bg-black/[0.03] text-black/80 hover:bg-black/[0.06]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[14px] font-semibold px-1 py-0.5 rounded-2xl ${
                    activeId === cat.id
                      ? 'bg-white/10 text-white/80'
                      : 'bg-black/10 text-black/80'
                  }`}>
                    {cat.weight}%
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Criteria grid — 1 col on mobile, 3 on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full items-start">
            {activeCategory.criteria.map(criterion => (
              <CriterionCard key={criterion.name} criterion={criterion} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
