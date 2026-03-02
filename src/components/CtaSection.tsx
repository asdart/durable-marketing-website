// Figma node 25040:134265
const imgRandomize = "https://www.figma.com/api/mcp/asset/c2ad2129-d0be-4677-a603-c6d18af2ad04";
const imgArrow     = "https://www.figma.com/api/mcp/asset/42fadd57-1913-4ed5-a3e7-368accc7a582";
const imgStarFull  = "https://www.figma.com/api/mcp/asset/21fb5ce7-4405-497f-8eff-7abf800c17d2";
const imgStarHalf  = "https://www.figma.com/api/mcp/asset/91392db8-50f7-47d7-829c-583d523537b0";
const imgStarMask  = "https://www.figma.com/api/mcp/asset/5c584985-daf9-4dd5-9a73-2881acc17b46";

export default function CtaSection() {
  return (
    <section className="pb-8 px-6">
      <div className="bg-black/[0.03] rounded-3xl py-24 px-8 flex flex-col items-center gap-8 text-center">
        {/* Mobile title */}
        <h2 className="font-display text-[56px] leading-[52px] text-black/80 md:hidden">
          Get started for free
        </h2>
        {/* Desktop title */}
        <h2 className="font-display text-[72px] leading-[68px] text-black/80 max-w-[560px] hidden md:block">
          Ready to build the best website for your business?
        </h2>

        {/* Mobile description */}
        <p className="text-[16px] leading-6 text-black/55 max-w-[480px] md:hidden">
          Build your website and launch your business today.
        </p>
        {/* Desktop description */}
        <p className="text-[16px] leading-6 text-black/55 max-w-[480px] hidden md:block">
          Durable builds you a complete, professional website in 30 seconds using AI. No design skills required.
        </p>

        {/* Input card + trust row */}
        <div className="flex flex-col gap-4 items-center mt-2 w-full max-w-[560px]">

          {/* Textarea card */}
          <div className="bg-black/[0.03] rounded-3xl w-full overflow-hidden">
            <div className="flex flex-col max-h-[360px] min-h-[56px] overflow-auto pt-6 px-6 pb-0">
              <textarea
                placeholder="What type of business are you building?"
                rows={3}
                className="w-full bg-transparent text-[16px] leading-6 text-black/80 placeholder-black/50 outline-none resize-none"
              />
            </div>
            {/* Bottom bar */}
            <div className="flex items-center justify-between px-4 pb-4 pt-2">
              <button className="p-2 rounded-[12px] hover:bg-black/5 transition-colors">
                <img src={imgRandomize} alt="Randomize" className="w-5 h-5" />
              </button>
              <button className="flex items-center gap-1 bg-black/80 text-white/75 text-[14px] font-medium pl-4 pr-3 py-2 rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.05)] hover:bg-black/70 transition-colors relative overflow-hidden">
                <span>Start for free</span>
                <img src={imgArrow} alt="" className="w-5 h-5" />
                <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-4px_3px_0px_rgba(0,0,0,0.02),inset_0px_1px_0px_0px_rgba(255,255,255,0.2)]" />
              </button>
            </div>
          </div>

          {/* Trust row — vertical on mobile, horizontal on desktop */}
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            {/* Stars + Trustpilot */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1 h-4">
                {[0, 1, 2, 3].map(i => (
                  <img key={i} src={imgStarFull} alt="" className="w-4 h-4" />
                ))}
                {/* 4th star — partial fill via mask */}
                <div className="relative w-4 h-4">
                  <img src={imgStarHalf} alt="" className="absolute inset-0 w-full h-full" />
                  <div
                    className="absolute inset-0"
                    style={{ maskImage: `url('${imgStarMask}')`, maskSize: '100% 100%', maskRepeat: 'no-repeat' }}
                  >
                    <img src={imgStarFull} alt="" className="w-full h-full" />
                  </div>
                </div>
              </div>
              <span className="text-[14px] leading-5 text-black/50">4.8 Stars on Trustpilot</span>
            </div>

            {/* Separator dot — desktop only */}
            <div className="hidden md:block w-1 h-1 rounded-full bg-black/30 flex-shrink-0" />

            <span className="text-[14px] leading-5 text-black/50">Trusted by 3 million business owners</span>
          </div>

        </div>
      </div>
    </section>
  );
}
