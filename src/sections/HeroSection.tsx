import { useEffect, useRef, useCallback } from 'react';
import MetallicInkBackground from '../components/MetallicInkBackground';

export default function HeroSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const rotateRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const nx = (e.clientX / window.innerWidth - 0.5) * 2;
    const ny = (e.clientY / window.innerHeight - 0.5) * 2;
    rotateRef.current = {
      x: -ny * 30,
      y: nx * 25,
    };
    if (titleRef.current) {
      titleRef.current.style.transform = `rotateX(${rotateRef.current.x}deg) rotateY(${rotateRef.current.y}deg)`;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="letter" data-text={char}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ height: '100vh', minHeight: '600px' }}
    >
      <MetallicInkBackground />

      {/* Fallback image behind canvas */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/hero-fallback.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <div
          ref={titleRef}
          className="animated-title"
          style={{ perspective: '1000px', perspectiveOrigin: 'center' }}
        >
          <h1
            className="font-display text-white leading-[1.05] tracking-tight"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 6rem)',
              textShadow: '0 4px 40px rgba(0,0,0,0.5), 0 0 120px rgba(0,0,0,0.3)',
            }}
          >
            {splitText('Automate the First Line')}
          </h1>
        </div>

        <p
          className="mt-8 font-mono text-warmgray max-w-[640px] leading-relaxed"
          style={{ fontSize: 'clamp(0.8rem, 1.1vw, 1rem)' }}
        >
          Локальный ИИ-агент для автоматизации первой линии поддержки.
          <br />
          Закрывает до 70% типовых обращений 24/7. Без абонентской платы и риска утечки данных.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center">
          <button
            onClick={() => handleScrollTo('#demo')}
            className="px-8 py-3 bg-brand-base text-[#040404] font-heading font-bold text-sm rounded hover:brightness-110 transition-all duration-300"
          >
            Испытать на демо-стенде
          </button>
          <button
            onClick={() => handleScrollTo('#pricing')}
            className="px-8 py-3 border border-brand-base text-brand-base font-heading text-sm rounded hover:bg-brand-base hover:text-[#040404] transition-all duration-300"
          >
            Получить расчет окупаемости (ROI)
          </button>
        </div>
      </div>

      {/* Bottom marquee */}
      <div className="absolute bottom-0 left-0 w-full z-10 border-t border-white/10 bg-[#040404]/60 backdrop-blur-sm py-3 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          <span className="font-mono text-[11px] text-warmgray tracking-widest mx-8">
            On-Premise LLM Inference • n8n Orchestration • Qdrant Vector DB • Full Air-Gap • 152-FZ Compliant •
          </span>
          <span className="font-mono text-[11px] text-warmgray tracking-widest mx-8">
            On-Premise LLM Inference • n8n Orchestration • Qdrant Vector DB • Full Air-Gap • 152-FZ Compliant •
          </span>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
