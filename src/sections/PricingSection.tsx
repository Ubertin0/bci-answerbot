const PLANS = [
  {
    name: 'Пилотный проект',
    subtitle: 'Proof of Concept',
    price: 'от 250 000 ₽',
    priceNote: 'Единоразово',
    timeline: '2 недели',
    features: [
      'Развертывание базовой архитектуры на вашем сервере',
      'Интеграция с 1 каналом связи (Telegram)',
      'Загрузка и векторизация до 50 регламентов',
      'Тестирование точности ответов',
    ],
    highlighted: false,
  },
  {
    name: 'Enterprise Внедрение',
    subtitle: 'Production',
    price: 'от 1 200 000 ₽',
    priceNote: 'Единоразово',
    timeline: '4–6 недель',
    features: [
      'Бесшовная интеграция с корпоративными Helpdesk (Jira, OTRS, CRM)',
      'Автоматический парсинг баз знаний (Confluence, PDF)',
      'Кастомизация n8n-пайплайнов под бизнес-логику',
      'ИБ-документация и стресс-тестирование нагрузок',
    ],
    highlighted: true,
  },
  {
    name: 'SLA и Поддержка',
    subtitle: 'Опционально',
    price: 'от 100 000 ₽',
    priceNote: '/ месяц',
    timeline: 'Постоянно',
    features: [
      'Мониторинг работоспособности n8n-сценариев',
      'Обновление весов open-source LLM по релизам',
      'Дообучение и тюнинг промптов',
      'Приоритетное исправление инцидентов (L3)',
    ],
    highlighted: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="w-full bg-[#040404] py-24 lg:py-32">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <h2
            className="fade-blur-element font-heading font-bold text-white leading-tight mb-4"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
          >
            Понятная стоимость владения (TCO)
          </h2>
          <p className="fade-blur-element font-mono text-brand-base text-sm">
            Платите за внедрение, а не за токены. Стоимость генерации ответов — всегда 0 ₽.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {PLANS.map((plan, i) => (
            <div
              key={i}
              className={`fade-blur-element relative flex flex-col rounded-xl p-8 lg:p-10 transition-all duration-500 ${
                plan.highlighted
                  ? 'bg-transparent border-2 border-brand-base scale-[1.02] shadow-[0_0_40px_rgba(210,216,178,0.08)]'
                  : 'bg-white/[0.02] border border-white/5 hover:border-white/10'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-base text-[#040404] font-mono text-[10px] font-bold tracking-wider rounded-full">
                  РЕКОМЕНДУЕМ
                </span>
              )}

              <span className="font-mono text-[10px] text-warmgray/40 tracking-widest uppercase mb-2">
                {plan.subtitle}
              </span>
              <h3 className="font-heading font-bold text-white text-xl mb-4">
                {plan.name}
              </h3>

              <div className="mb-6">
                <span className="font-heading font-bold text-white text-3xl">
                  {plan.price}
                </span>
                <span className="font-mono text-warmgray/40 text-xs ml-2">
                  {plan.priceNote}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-6 pb-6 border-b border-white/5">
                <span className="font-mono text-brand-base text-[10px] tracking-wider">
                  СРОК ЗАПУСКА:
                </span>
                <span className="font-mono text-warmgray text-xs">
                  {plan.timeline}
                </span>
              </div>

              <ul className="flex-1 space-y-3 mb-8">
                {plan.features.map((feat, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="w-1 h-1 rounded-full bg-brand-base mt-2 flex-shrink-0" />
                    <span className="font-mono text-warmgray/70 text-xs leading-relaxed">
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => {
                  const el = document.querySelector('#contact');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`w-full py-3 font-heading text-sm rounded transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-brand-base text-[#040404] font-bold hover:brightness-110'
                    : 'border border-white/10 text-warmgray hover:border-brand-base hover:text-brand-base'
                }`}
              >
                Выбрать план
              </button>
            </div>
          ))}
        </div>

        {/* ROI block */}
        <div className="fade-blur-element relative rounded-xl border border-brand-base/20 bg-brand-ink/10 p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-heading font-bold text-white text-xl mb-2">
              Окупаемость за 3–4 месяца
            </h3>
            <p className="font-mono text-warmgray/60 text-sm max-w-[500px]">
              При штате L1-поддержки от 5 человек система полностью окупает затраты на Enterprise-внедрение и покупку GPU-сервера исключительно за счет прямой экономии на ФОТ, расходах на HR и ликвидации доплат за ночные смены.
            </p>
          </div>
          <button
            onClick={() => {
              const el = document.querySelector('#contact');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-3 bg-brand-base text-[#040404] font-heading font-bold text-sm rounded hover:brightness-110 transition-all duration-300 whitespace-nowrap flex-shrink-0 animate-pulse"
            style={{ animationDuration: '3s' }}
          >
            Получить расчет ROI
          </button>
        </div>
      </div>
    </section>
  );
}
