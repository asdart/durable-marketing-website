export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5 h-[60px] flex items-center px-6">
      <div className="max-w-[1200px] mx-auto w-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="rgba(0,0,0,0.8)" />
            <path d="M2 17L12 22L22 17" stroke="rgba(0,0,0,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 12L12 17L22 12" stroke="rgba(0,0,0,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-semibold text-[14px] text-black/80">Durable</span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-6 text-[13px] font-medium text-black/55">
          <a href="#" className="hover:text-black/80 transition-colors">Product</a>
          <a href="#" className="hover:text-black/80 transition-colors">Blog</a>
          <a href="#" className="hover:text-black/80 transition-colors">Pricing</a>
          <a href="#" className="hover:text-black/80 transition-colors">Compare</a>
        </div>

        {/* CTA */}
        <button className="bg-black/80 text-white text-[13px] font-semibold px-4 py-2 rounded-2xl hover:bg-black/70 transition-colors">
          Get started free
        </button>
      </div>
    </nav>
  );
}
