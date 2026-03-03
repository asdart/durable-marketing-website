import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setVisible(true), 400);
    return () => clearTimeout(id);
  }, []);

  return (
    <section className="pt-32 pb-16 md:pt-[148px] md:pb-32 flex flex-col items-center px-4 md:px-6">
      <div
        className="max-w-[1200px] w-full flex flex-col gap-10 md:gap-14 items-center"
        style={{
          transform: visible ? 'translateY(0)' : 'translateY(28px)',
          opacity: visible ? 1 : 0,
          transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1), opacity 0.7s ease',
        }}
      >

        {/* Title Block */}
        <div className="flex flex-col gap-8 items-center">
          <div className="flex flex-col gap-4 items-center">
            <p className="text-[14px] font-medium leading-5 text-[#ff4b0a] text-center">
              Updated January 2026 • 3 platforms analyzed
            </p>
            <div className="max-w-[580px] text-center flex flex-col gap-4">
              <h1 className="font-display font-normal text-[56px] leading-[52px] md:text-[96px] md:leading-[92px] text-black/80">
                The ultimate website builder comparison
              </h1>
              <p className="text-[16px] md:text-[14px] leading-6 text-black/55">
                We built the same business on every major platform and scored them across 12 real-world evaluation criteria. From copy quality to production readiness.
              </p>
            </div>
          </div>

          <button className="bg-black/80 text-white text-[14px] font-medium px-4 py-2 rounded-2xl shadow-sm hover:bg-black/70 transition-colors">
            See results
          </button>
        </div>

        {/* Platform illustration — desktop */}
        <img
          src="/illustration-container.png"
          alt="Platform comparison illustration"
          className="hidden md:block w-full max-w-[1200px] object-contain"
        />

        {/* Platform illustration — mobile */}
        <img
          src="/illustration-mobile.png"
          alt="Platform comparison illustration"
          className="md:hidden w-full object-contain"
        />

      </div>
    </section>
  );
}
