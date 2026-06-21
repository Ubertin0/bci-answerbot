const PROBLEMS = [
  {
    title: 'Раздутый ФОТ и ночные смены',
    body: 'Для закрытия одного рабочего места в режиме 24/7 требуется минимум 4.2 ставки (FTE) с учетом отпусков и больничных. Если у вас в смене хотя бы 3 оператора — вы вынуждены оплачивать работу 13 сотрудников ежемесячно. Наш агент забирает на себя ночные, выходные и пиковые слоты, работая по цене электричества для сервера.',
    tag: '4.2 FTE на место',
  },
  {
    title: 'Оборотные штрафы и утечки данных (152-ФЗ)',
    body: 'Обработка тикетов клиентов через публичные API (ChatGPT, Claude) — это прямой слив персональных данных и коммерческой тайны. По новым поправкам утечка ПДн грозит штрафом до 15–20 млн рублей, а при повторном инциденте включаются оборотные штрафы — от 1% до 3% годовой выручки (до 500 млн руб.).',
    tag: '15–20 млн ₽ штраф',
  },
  {
    title: 'Высокая текучка кадров на рутине',
    body: 'До 70% запросов в поддержку — это типовые операции (сброс паролей, статусы, доступы). Сотрудники быстро выгорают работать «копипастерами» и увольняются. Вы тратите сотни тысяч рублей на непрерывный и неэффективный цикл HR: найм, онбординг, увольнение.',
    tag: '70% — рутина',
  },
  {
    title: 'Непредсказуемый OpEx на облачные LLM',
    body: 'Облачные корпоративные ИИ-решения тарифицируются за каждый обработанный токен. Чем успешнее растет ваш бизнес и объем клиентской или пользовательской базы обращений, тем выше становятся ежемесячные неконтролируемые счета от ИТ-вендоров.',
    tag: 'Токенная тарификация',
  },
];

export default function ProblemSection() {
  return (
    <section id="features" className="w-full bg-[#040404] py-24 lg:py-32">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <h2 className="fade-blur-element font-heading text-white text-center font-bold leading-tight mb-16"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
        >
          Почему расширение штата L1 и облачные боты сжигают бюджет
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROBLEMS.map((card, i) => (
            <div
              key={i}
              className="fade-blur-element relative bg-offwhite rounded-xl p-10 group hover:shadow-[0_0_40px_rgba(210,216,178,0.08)] transition-shadow duration-500"
              style={{
                transitionDelay: `${i * 100}ms`,
              }}
            >
              {/* Texture overlay */}
              <div
                className="absolute inset-0 rounded-xl opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: 'url(/images/card-texture.jpg)',
                  backgroundSize: '200px',
                }}
              />
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 bg-[#040404] text-brand-base font-mono text-[10px] tracking-wider uppercase rounded mb-6">
                  {card.tag}
                </span>
                <h3 className="font-heading font-bold text-[#040404] text-lg mb-4 leading-snug">
                  {card.title}
                </h3>
                <p className="font-mono text-[#040404]/70 text-sm leading-relaxed">
                  {card.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
