import MetallicInkBackground from '../components/MetallicInkBackground';

export default function HeroSection() {
  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-[#040404]"
      style={{ height: '100vh', minHeight: '600px' }}
    >
      <MetallicInkBackground />

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <h1
          className="font-display text-white leading-[1.1] tracking-tight max-w-[900px]"
          style={{
            fontSize: 'clamp(1.8rem, 5vw, 4rem)',
            textShadow: '0 4px 60px rgba(0,0,0,0.95), 0 0 100px rgba(0,0,0,0.8), 0 2px 30px rgba(0,0,0,0.9)',
          }}
        >
          ИИ-агент для автоматизации первой линии поддержки
        </h1>

        <p
          className="mt-8 font-mono text-warmgray max-w-[640px] leading-relaxed"
          style={{
            fontSize: 'clamp(0.8rem, 1.1vw, 1rem)',
            textShadow: '0 2px 20px rgba(0,0,0,0.9)',
          }}
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
            Калькулятор окупаемости
          </button>
          <button
            onClick={() => handleScrollTo('#pricing')}
            className="px-8 py-3 border border-brand-base text-brand-base font-heading text-sm rounded hover:bg-brand-base hover:text-[#040404] transition-all duration-300"
          >
            Стоимость владения
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
