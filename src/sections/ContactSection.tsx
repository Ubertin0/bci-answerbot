import { useState } from 'react';

export default function ContactSection() {
  const [email, setEmail] = useState('');
  const [telegram, setTelegram] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

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
            Оставьте заявку, и мы пришлем закрытый технический One-Pager для вашего ИТ-отдела и службы ИБ: детальная архитектурная схема, спецификации API, бенчмарки и точные аппаратные требования.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="fade-blur-element max-w-[500px] mx-auto">
            <div className="space-y-4 mb-6">
              <div>
                <label className="block font-mono text-[10px] text-warmgray/40 tracking-widest uppercase mb-2">
                  Корпоративный Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.ru"
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg font-mono text-sm text-white placeholder:text-warmgray/20 focus:outline-none focus:border-brand-base/50 transition-colors"
                />
              </div>
              <div>
                <label className="block font-mono text-[10px] text-warmgray/40 tracking-widest uppercase mb-2">
                  Telegram для связи
                </label>
                <input
                  type="text"
                  value={telegram}
                  onChange={(e) => setTelegram(e.target.value)}
                  placeholder="@username"
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg font-mono text-sm text-white placeholder:text-warmgray/20 focus:outline-none focus:border-brand-base/50 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-brand-base text-[#040404] font-heading font-bold text-sm rounded-lg hover:brightness-110 transition-all duration-300"
            >
              Запросить технический One-Pager
            </button>

            <p className="text-center mt-4">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Форма бронирования звонка будет доступна после отправки заявки.');
                }}
                className="font-mono text-[11px] text-warmgray/30 hover:text-brand-base transition-colors underline underline-offset-2"
              >
                Или забронировать 30-минутный технический звонок с инженером внедрения
              </a>
            </p>
          </form>
        ) : (
          <div className="fade-blur-element text-center py-12">
            <div className="w-16 h-16 rounded-full bg-brand-ink/20 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-brand-base" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-heading font-bold text-white text-xl mb-3">
              Заявка отправлена
            </h3>
            <p className="font-mono text-warmgray/50 text-sm max-w-[400px] mx-auto">
              Мы подготовим технический One-Pager и отправим его вам в течение 24 часов. Также вы можете забронировать звонок с инженером.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
