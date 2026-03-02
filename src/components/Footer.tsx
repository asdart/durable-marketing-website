const footerLinks: { heading: string; links: string[] }[] = [
  {
    heading: 'Product',
    links: ['Pricing', 'Website Builder', 'Blog Builder', 'Brand Builder', 'Invoicing'],
  },
  {
    heading: 'Resources',
    links: ['Blog', 'Starter guide', 'Website templates', 'Customer stories', 'AI tools'],
  },
  {
    heading: 'Compare',
    links: ['Squarespace', 'Wix', 'Wordpress', '10web'],
  },
  {
    heading: 'Company',
    links: ['About', 'Careers', 'Newsletter', 'Privacy policy', 'Help center', 'Terms of service'],
  },
  {
    heading: 'Social',
    links: ['Facebook', 'X/Twitter', 'Instagram', 'LinkedIn', 'TikTok', 'YouTube'],
  },
];

export default function Footer() {
  return (
    <footer className="px-6 pb-6">
      <div
        className="rounded-3xl overflow-hidden relative"
        style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
      >
        <div className="max-w-[1200px] mx-auto px-6 pt-12 md:pt-[72px] pb-20 md:pb-32 flex flex-col md:flex-row items-start justify-between gap-10 md:gap-8">
          {/* Left: branding */}
          <div className="flex flex-col gap-6 w-full md:w-[294px] md:flex-shrink-0">
            {/* Durable logo icon */}
            <div className="w-6 h-6">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <path d="M6 18C6 12.477 10.477 8 16 8V20H6V18Z" fill="white" fillOpacity="0.8"/>
              </svg>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-[14px] font-medium text-white leading-5">
                Durable makes owning a business easier than having a job.
              </p>
              <p className="text-[12px] text-white/50">©2025 Durable Technologies Inc</p>
            </div>

            {/* Language select */}
            <div className="flex items-center gap-2 bg-white border border-black/10 rounded-2xl px-4 py-2 w-[145px] cursor-pointer">
              <span className="flex-1 text-[14px] text-black/30">English</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 8L10 13L15 8" stroke="rgba(0,0,0,0.55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Right: links grid */}
          <div className="grid grid-cols-2 md:flex md:flex-wrap md:justify-end gap-x-8 gap-y-8 flex-1 w-full">
            {footerLinks.map(col => (
              <div key={col.heading} className="flex flex-col gap-4 md:w-[140px]">
                <p className="text-[14px] font-medium text-white/50">{col.heading}</p>
                <div className="flex flex-col gap-2">
                  {col.links.map(link => (
                    <a key={link} href="#" className="text-[14px] font-medium text-white/80 hover:text-white transition-colors">
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative characters at bottom */}
        <div className="absolute bottom-0 right-0 left-0 h-20 pointer-events-none overflow-hidden">
          {/* Floating icons */}
          <div className="absolute bottom-4 right-[440px]">
            <div className="w-12 h-12 rounded-xl bg-[#fba026] flex items-center justify-center shadow-lg" style={{ transform: 'rotate(-15deg)' }}>
              <span className="text-[22px] font-serif font-light text-[#1e1e1e]">T</span>
            </div>
          </div>
          <div className="absolute bottom-4 right-[300px]">
            <div className="w-10 h-10 rounded-xl bg-[#498a67] flex items-center justify-center shadow-lg" style={{ transform: 'rotate(-12deg)' }}>
              <svg viewBox="0 0 18 18" fill="none" className="w-4 h-4">
                <circle cx="9" cy="9" r="8" fill="none" stroke="white" strokeWidth="1.5"/>
                <path d="M9 5v4l3 2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
          <div className="absolute bottom-4 right-[160px]">
            <div className="w-10 h-10 rounded-full bg-[#fe4d0e] flex items-center justify-center shadow-lg">
              <svg viewBox="0 0 18 18" fill="none" className="w-4 h-4">
                <circle cx="9" cy="8" r="5" fill="none" stroke="white" strokeWidth="1.5"/>
                <path d="M11.5 13.5L14 16" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
          <div className="absolute bottom-4 right-[60px]">
            <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
              <circle cx="20" cy="20" r="18" fill="rgba(255,255,255,0.15)"/>
              <path d="M13 20L20 27L27 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
}
