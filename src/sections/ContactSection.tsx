import LeadForm from '../components/LeadForm';

export default function ContactSection() {
  return (
    <section id="contact" className="w-full bg-[#040404] py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-[800px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-12">
          <h2
            className="fade-blur-element font-heading font-bold text-white leading-tight mb-4"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
          >
            Оцените применимость ИИ-агента в вашем контуре
          </h2>
          <p className="fade-blur-element font-mono text-warmgray/60 text-sm max-w-[600px] mx-auto">
            Заполните форму для проведения технического аудита. Мы обсудим архитектурную схему, аппаратные требования и сценарии интеграции 100% локального RAG-агента в ваш ИТ-ландшафт.
          </p>
        </div>

        <div className="max-w-[500px] mx-auto">
          <LeadForm />
        </div>

        <div className="text-center mt-8 space-y-3">
          <p className="font-mono text-[11px] text-warmgray/30">
            Или свяжитесь напрямую:
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="https://www.linkedin.com/in/eugene-balandin"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] text-warmgray/40 hover:text-brand-base transition-colors underline underline-offset-2"
            >
              LinkedIn
            </a>
            <a
              href="https://t.me/BalandinEugene"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] text-warmgray/40 hover:text-brand-base transition-colors underline underline-offset-2"
            >
              Telegram
            </a>
            <a
              href="https://wa.me/79029824436"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] text-warmgray/40 hover:text-brand-base transition-colors underline underline-offset-2"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
