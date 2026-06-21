const PIPELINE_STEPS = [
  {
    num: '01',
    title: 'Входной интерфейс',
    desc: 'Пользователь или оператор отправляет запрос в ваш текущий Service Desk (Jira, Telegram, Helpdesk, Битрикс24).',
  },
  {
    num: '02',
    title: 'Оркестрация (n8n)',
    desc: 'Локальный инстанс n8n перехватывает вебхук, очищает и валидирует данные, выполняет маршрутизацию.',
  },
  {
    num: '03',
    title: 'Векторный поиск (Qdrant)',
    desc: 'Запрос преобразуется в эмбеддинг и находит релевантный контекст (инструкции, регламенты) в локальной векторной БД.',
  },
  {
    num: '04',
    title: 'Локальный инференс (Ollama)',
    desc: 'Опенсорсная LLM (Llama 3.1, Qwen или кастомный fine-tune) генерирует точный ответ строго на основе найденного контекста. Вычисления — на вашем GPU.',
  },
  {
    num: '05',
    title: 'Выдача решения',
    desc: 'n8n отправляет сформированное решение обратно в исходный тикет. Время обработки: 2–3 секунды.',
  },
];

const CAPABILITIES = [
  {
    title: 'Бесшовная интеграция',
    desc: 'Благодаря оркестратору n8n (1000+ готовых нод и интеграций), агент легко связывается с любой legacy-инфраструктурой по REST API или вебхукам.',
  },
  {
    title: 'Переход от OpEx к CapEx',
    desc: 'Вы инвестируете один раз во внедрение и собственное оборудование (GPU-сервер). Никаких ежемесячных счетов за токены или подписок. TCO зафиксирован.',
  },
  {
    title: '100% Compliance и ИБ',
    desc: 'Решение из коробки удовлетворяет требованиям служб безопасности и Роскомнадзора. Данные физически не покидают периметр.',
  },
  {
    title: 'Снижение TTR',
    desc: 'Роботизированная L1-поддержка мгновенно отвечает на типовые запросы. L2 и L3 получают очищенный поток только сложных инцидентов.',
  },
];

export default function ArchitectureSection() {
  return (
    <section id="architecture" className="w-full bg-offwhite py-24 lg:py-32">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <h2
            className="fade-blur-element font-heading font-bold text-[#040404] leading-tight mb-4"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
          >
            Прозрачная архитектура On-Premise
          </h2>
          <p className="fade-blur-element font-mono text-[#040404]/50 text-sm max-w-[600px] mx-auto">
            100% контроля над данными. Полный Air-gap. Система физически разворачивается на ваших серверах (Bare Metal) или приватном облаке.
          </p>
        </div>

        {/* Pipeline diagram */}
        <div className="fade-blur-element mb-20">
          <img
            src="/images/architecture-diagram.jpg"
            alt="Архитектурная схема пайплайна BCI"
            className="w-full rounded-xl border border-[#040404]/10"
            loading="lazy"
          />
        </div>

        {/* Pipeline steps */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-20">
          {PIPELINE_STEPS.map((step, i) => (
            <div
              key={i}
              className="fade-blur-element relative p-6 bg-white rounded-xl border border-[#040404]/5 group hover:border-brand-ink/30 transition-all duration-300"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="font-mono text-[10px] text-brand-ink/50 tracking-wider mb-3 block">
                STEP {step.num}
              </span>
              <h4 className="font-heading font-bold text-[#040404] text-sm mb-2 leading-snug">
                {step.title}
              </h4>
              <p className="font-mono text-[#040404]/50 text-[11px] leading-relaxed">
                {step.desc}
              </p>
              {i < PIPELINE_STEPS.length - 1 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-brand-ink/20 text-lg z-10">
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Capabilities grid */}
        <h3 className="fade-blur-element font-heading font-bold text-[#040404] text-xl mb-8 text-center">
          Инфраструктура, которая защищает ваши инвестиции
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CAPABILITIES.map((cap, i) => (
            <div
              key={i}
              className="fade-blur-element p-8 bg-white rounded-xl border border-[#040404]/5"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="w-8 h-8 rounded-lg bg-brand-ink/10 flex items-center justify-center mb-4">
                <span className="font-mono text-brand-ink text-xs font-bold">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h4 className="font-heading font-bold text-[#040404] text-sm mb-3">
                {cap.title}
              </h4>
              <p className="font-mono text-[#040404]/50 text-[11px] leading-relaxed">
                {cap.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
