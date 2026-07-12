export default function Footer() {
  return (
    <footer className="w-full bg-[#040404] border-t border-white/5">
      {/* Main footer content */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left column - legal */}
          <div>
            <div className="flex flex-col mb-6">
              <span className="text-white font-heading font-bold text-lg tracking-wide">
                BCI <span className="text-warmgray">|</span> Balandin Cloud
              </span>
              <span className="font-mono text-[10px] text-warmgray/40 tracking-widest uppercase">
                Private Enterprise Infrastructure
              </span>
            </div>
            <p className="font-mono text-warmgray/30 text-[11px] leading-relaxed max-w-[480px]">
              Система разворачивается исключительно внутри периметра заказчина и не производит внешних API-вызовов. Все вычисления выполняются на оборудовании клиента. Разработано в рамках стандартов информационной безопасности и 152-ФЗ «О персональных данных». Данные физически не покидают контур организации.
            </p>
          </div>

          {/* Right column - links */}
          <div className="flex flex-wrap gap-x-16 gap-y-8">
            <div>
              <h4 className="font-mono text-[10px] text-warmgray/40 tracking-widest uppercase mb-4">
                Навигация
              </h4>
              <ul className="space-y-3">
                {[
                  { label: 'Возможности', target: '#features' },
                  { label: 'Калькулятор ROI', target: '#calculator' },
                  { label: 'Архитектура', target: '#architecture' },
                  { label: 'Стоимость', target: '#pricing' },
                ].map((link) => (
                  <li key={link.target}>
                    <a
                      href={link.target}
                      onClick={(e) => {
                        e.preventDefault();
                        document.querySelector(link.target)?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="font-mono text-warmgray/50 text-xs hover:text-brand-base transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-[10px] text-warmgray/40 tracking-widest uppercase mb-4">
                Контакты
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://www.linkedin.com/in/eugene-balandin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-warmgray/50 text-xs hover:text-brand-base transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://t.me/BalandinEugene"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-warmgray/50 text-xs hover:text-brand-base transition-colors"
                  >
                    Telegram
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/79029824436"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-warmgray/50 text-xs hover:text-brand-base transition-colors"
                  >
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="w-full overflow-hidden py-8 border-t border-white/5">
        <div className="flex whitespace-nowrap animate-footer-marquee">
          <span
            className="font-display text-brand-ink/40 tracking-tight mx-8"
            style={{ fontSize: '5vw' }}
          >
            PRIVACY • CONTROL • INFRASTRUCTURE •
          </span>
          <span
            className="font-display text-brand-ink/40 tracking-tight mx-8"
            style={{ fontSize: '5vw' }}
          >
            PRIVACY • CONTROL • INFRASTRUCTURE •
          </span>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-mono text-warmgray/20 text-[10px] tracking-wider">
          © 2026 Balandin Cloud Infrastructure. Все права защищены.
        </span>
        <span className="font-mono text-warmgray/20 text-[10px] tracking-wider">
          Разработано в рамках стандартов ИБ и 152-ФЗ.
        </span>
      </div>

      <style>{`
        @keyframes footer-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-footer-marquee {
          animation: footer-marquee 20s linear infinite;
        }
      `}</style>
    </footer>
  );
}
