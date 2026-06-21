import { useEffect, useRef, useState } from 'react';

interface NavigationProps {
  lenisRef: React.MutableRefObject<any>;
}

const NAV_LINKS = [
  { label: 'Возможности', target: '#features' },
  { label: 'Демо-стенд', target: '#demo' },
  { label: 'Архитектура', target: '#architecture' },
  { label: 'Стоимость', target: '#pricing' },
];

export default function Navigation({ lenisRef }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (target: string) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: -80 });
    }
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#040404]/80 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex flex-col">
          <span className="text-white font-heading font-bold text-sm tracking-wide">
            BCI <span className="text-warmgray">|</span> Balandin Cloud
          </span>
          <span className="font-mono text-[10px] text-warmgray tracking-widest uppercase">
            Private Enterprise Infrastructure
          </span>
        </div>

        {/* Center nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.target}
              onClick={() => handleNavClick(link.target)}
              className="text-sm text-warmgray hover:text-white transition-colors duration-300 font-heading"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <button
          onClick={() => handleNavClick('#contact')}
          className="hidden md:block px-5 py-2 border border-brand-base text-brand-base text-sm font-heading rounded hover:bg-brand-base hover:text-[#040404] transition-all duration-300"
        >
          Связаться с инженером
        </button>
      </div>
    </header>
  );
}
