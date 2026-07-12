import { Check, AlertTriangle } from 'lucide-react';
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

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <h1
          className="font-display text-white leading-[1.1] tracking-tight max-w-[900px]"
          style={{
            fontSize: 'clamp(1.8rem, 5vw, 4rem)',
            textShadow: '0 4px 60px rgba(0,0,0,0.95), 0 0 100px rgba(0,0,0,0.8), 0 2px 30px rgba(0,0,0,0.9)',
          }}
        >
          Вы теряете до{' '}
          <span className="text-brand-base">3 млн ₽</span>{' '}
          в месяц на рутинных тикетах
        </h1>

        <p
          className="mt-3 font-mono text-warmgray/50 max-w-[640px] leading-relaxed"
          style={{
            fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
            textShadow: '0 2px 20px rgba(0,0,0,0.9)',
          }}
        >
          * Расчёт для штата L1 от 10 человек с учётом ФОТ, налогов и HR-издержек.
        </p>

        <p
          className="mt-6 font-mono text-warmgray max-w-[640px] leading-relaxed"
          style={{
            fontSize: 'clamp(0.8rem, 1.1vw, 1rem)',
            textShadow: '0 2px 20px rgba(0,0,0,0.9)',
          }}
        >
          Пока ваши операторы L1 отвечают на одни и те же вопросы,
          <br />
          ИИ-агенты забирают до 70% нагрузки.
        </p>

        <p
          className="mt-4 font-mono text-warmgray/80 max-w-[640px] leading-relaxed"
          style={{
            fontSize: 'clamp(0.75rem, 1vw, 0.9rem)',
            textShadow: '0 2px 20px rgba(0,0,0,0.9)',
          }}
        >
          BCI — локальный RAG-агент, который закрывает тикеты за 30 секунд вместо 15 минут.
          <br />
          Без облаков. Без утечек. Строго по 152-ФЗ.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center">
          <a
            href="#calculator"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo('#calculator');
            }}
            className="px-8 py-3 bg-brand-base text-[#040404] font-heading font-bold text-sm rounded hover:brightness-110 transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.3)]"
          >
            Рассчитать, сколько я теряю
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo('#contact');
            }}
            className="px-8 py-3 border border-brand-base text-brand-base font-heading text-sm rounded hover:bg-brand-base hover:text-[#040404] transition-all duration-300"
          >
            Обсудить архитектуру
          </a>
        </div>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-4 max-w-[700px]">
          {[
            'SLA ответа — 30 секунд',
            'Потенциал автоматизации L1 — до 70%',
            '100% On-Premise (Air-Gap)',
            'Работает на вашем железе',
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 text-warmgray/90 text-xs font-mono"
            >
              <Check className="w-4 h-4 text-brand-base flex-shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-3 px-5 py-3 rounded-lg border border-yellow-500/30 bg-yellow-500/5">
          <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
          <span className="text-yellow-500/90 text-xs font-mono">
            Беру в интеграцию не более 3 инфраструктур в месяц для гарантии SLA.
          </span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full z-10 border-t border-white/10 bg-[#040404]/60 backdrop-blur-sm py-3 overflow-hidden">
        <div className="inline-flex whitespace-nowrap animate-marquee">
          <span className="font-mono text-[11px] text-warmgray tracking-widest mx-8">
            On-Premise LLM Inference • n8n Orchestration • Qdrant Vector DB • Full Air-Gap • 152-FZ Compliant •
          </span>
          <span className="font-mono text-[11px] text-warmgray tracking-widest mx-8" aria-hidden="true">
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
