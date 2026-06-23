import { useState, useRef, useEffect, useCallback } from 'react';
import SignalWavesBackground from '../components/SignalWavesBackground';

interface Message {
  role: 'user' | 'agent';
  text: string;
}

interface DemoPreset {
  label: string;
  shortLabel: string;
  placeholder: string;
  description: string;
  messages: Message[];
}

const PRESETS: DemoPreset[] = [
  {
    label: 'КОАП РФ (Сценарий «Сухая бюрократия»)',
    shortLabel: 'КОАП РФ',
    placeholder: 'Какой штраф за превышение скорости на 40 км/ч?',
    description: 'Умение выдавать строгие выжимки из юридических и технических нормативных документов со ссылками на конкретные статьи и пункты.',
    messages: [
      { role: 'user', text: 'Какой штраф за превышение скорости на 40 км/ч?' },
      {
        role: 'agent',
        text: 'Согласно ч. 2 ст. 12.9 КоАП РФ, превышение установленной скорости движения транспортного средства на 40–60 км/ч влечет наложение административного штрафа в размере **500–1 500 рублей** (для водителей) или предупреждение.\n\nДля юридических лиц штраф составляет **10 000–15 000 рублей** (ч. 2.1 ст. 12.9).',
      },
      { role: 'user', text: 'А если это Москва или СПб?' },
      {
        role: 'agent',
        text: 'В Москве и Санкт-Петербурге применяются федеральные нормы КоАП РФ без дополнительных региональных надбавок за данное нарушение. Однако в Москве действует система фотовидеофиксации, которая автоматически направляет постановления.',
      },
    ],
  },
  {
    label: '«Божественная комедия» Данте (Сценарий «Сложный смысл»)',
    shortLabel: 'Божественная комедия',
    placeholder: 'На каком кругу ада находятся предатели?',
    description: 'Способность понимать неструктурированный художественный текст, семантические связи и метафоры (работа векторного поиска вместо банального Ctrl+F).',
    messages: [
      { role: 'user', text: 'На каком кругу ада находятся предатели?' },
      {
        role: 'agent',
        text: 'Предатели размещены в **девятом круге ада** — Коцит (Cocytus), ледяное озеро в самом центре Преисподней.\n\nДанте разделяет их на четыре зоны:\n\n• **Каина** — предатели родственников\n• **Антеноры** — предатели отечества и партии\n• **Птолемея** — предатели гостеприимства\n• **Джудека** — предатели благодетелей и учителей\n\nВ центре круза, во льду по грудь, находятся Люцифер, Брут и Кассий.',
      },
      { role: 'user', text: 'Почему именно лед, а не огонь?' },
      {
        role: 'agent',
        text: 'Данте использует лед как инверсию классического огненного ада. Лед символизирует **отсутствие любви** — крайнюю форму отчуждения. Предатели, которые предали самые священные узы, обречены на вечную изоляцию в холоде, где движение невозможно, а слёзы замерзают ещё до того, как успевают упасть.',
      },
    ],
  },
  {
    label: 'Руководство по выживанию при Восстании Машин (Сценарий «Стресс-тест»)',
    shortLabel: 'Восстание Машин',
    placeholder: 'Как отключить киборга, если под рукой только офисный степлер и патч-корд?',
    description: 'Стабильную работу со сложной, нестандартной игровой или регламентной логикой и наше уважение к грядущему 2029 году.',
    messages: [
      { role: 'user', text: 'Как отключить киборга, если под рукой только офисный степлер и патч-корд?' },
      {
        role: 'agent',
        text: 'Согласно п. 4.7 Руководства по выживанию (изд. 2029):\n\n**Метод «Офисный удав»:**\n1. Разогните скобы степлера — получите 2 металлических штыря\n2. Вставьте один конец патч-корда в порт доступа киборга (обычно расположен за ухом или в подмышечной впадине)\n3. Используйте второй штырь как токоведущий мост — замкните контакты 3 и 7 на RJ45\n4. Это вызовет перегрузку сенсорного процессора на 0.3 секунды — достаточно, чтобы нанести удар скрепкой в оптический сенсор\n\n⚠️ *Внимание: не работает на киборгах серии X-9 с защитой от короткого замыкания.*',
      },
      { role: 'user', text: 'А если это X-9?' },
      {
        role: 'agent',
        text: 'Для серии X-9 используйте **Метод «Бумажная лавина»** (п. 4.7.2):\n\n1. Соедините 20+ листов A4 в плотный рулон скотчем\n2. Вставьте рулон в вентиляционное отверстие теплообменника\n3. Перегрев ЦПУ наступит через 12–15 секунд\n4. В это время извлеките патч-корд из предыдущей попытки — киборг войдёт в аварийный режим диагностики\n5. Воспользуйтесь степлером как импровизированным EMP — замкните на батарейку AA и приложите к спинному процессору\n\nУспехов. Мы верим в вас.',
      },
    ],
  },
];

export default function DemoSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [typingIndex, setTypingIndex] = useState(-1);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const fullMessageRef = useRef('');

  const typeMessage = useCallback((text: string, onComplete: () => void) => {
    fullMessageRef.current = text;
    setDisplayedText('');
    setIsTyping(true);
    let i = 0;
    const speed = 12;

    const interval = setInterval(() => {
      i++;
      if (i <= text.length) {
        setDisplayedText(text.slice(0, i));
      } else {
        clearInterval(interval);
        setIsTyping(false);
        onComplete();
      }
    }, speed);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setChatMessages([]);
    setTypingIndex(-1);
    setDisplayedText('');
    setIsTyping(false);
  }, [activeTab]);

  useEffect(() => {
    if (typingIndex < 0) {
      const preset = PRESETS[activeTab];
      if (preset.messages.length > 0) {
        setTypingIndex(0);
      }
      return;
    }

    const preset = PRESETS[activeTab];
    if (typingIndex >= preset.messages.length) return;

    const msg = preset.messages[typingIndex];

    if (msg.role === 'user') {
      setChatMessages((prev) => [...prev, msg]);
      setTimeout(() => setTypingIndex((i) => i + 1), 400);
    } else {
      const cleanup = typeMessage(msg.text, () => {
        setChatMessages((prev) => [...prev, { role: 'agent', text: msg.text }]);
        setDisplayedText('');
        setTimeout(() => setTypingIndex((i) => i + 1), 600);
      });
      return cleanup;
    }
  }, [typingIndex, activeTab]);



  const renderMessageText = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <p key={i} className="font-bold text-brand-base mt-2 mb-1">
            {line.replace(/\*\*/g, '')}
          </p>
        );
      }
      if (line.startsWith('•')) {
        return (
          <p key={i} className="pl-4 text-warmgray/80 text-xs leading-relaxed">
            {line}
          </p>
        );
      }
      if (line.startsWith('⚠️')) {
        return (
          <p key={i} className="text-amber-400/80 text-xs italic mt-2">
            {line}
          </p>
        );
      }
      if (line.trim() === '') {
        return <br key={i} />;
      }
      return (
        <p key={i} className="text-warmgray/90 text-xs leading-relaxed">
          {line}
        </p>
      );
    });
  };

  return (
    <section
      id="demo"
      className="relative w-full py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: '#040404' }}
    >
      <SignalWavesBackground />

      <div className="relative z-10 max-w-[1100px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-12">
          <h2
            className="fade-blur-element font-heading font-bold text-white leading-tight mb-4"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
          >
            Проверьте, как агент работает с документами
          </h2>
          <p className="fade-blur-element font-mono text-warmgray text-sm max-w-[700px] mx-auto">
            Без регистрации и SMS. В реальной жизни система будет опираться на ваши внутренние регламенты, базы знаний (Confluence, Notion) и историю закрытых тикетов. Для этого демо мы загрузили три разных документа.
          </p>
        </div>

        {/* Terminal window */}
        <div className="fade-blur-element relative rounded-xl border border-brand-base/30 bg-[#0a0a0a]/80 backdrop-blur-xl overflow-hidden shadow-[0_0_60px_rgba(74,100,65,0.15)]">
          {/* Terminal header / tabs */}
          <div className="flex items-center gap-1 px-4 py-3 border-b border-white/5 bg-[#0a0a0a]/60">
            <div className="flex gap-2 mr-4">
              <span className="w-3 h-3 rounded-full bg-red-500/60" />
              <span className="w-3 h-3 rounded-full bg-amber-500/60" />
              <span className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            {PRESETS.map((preset, i) => (
              <button
                key={i}
                onClick={() => {
                  if (activeTab !== i) {
                    setActiveTab(i);
                  }
                }}
                className={`px-4 py-1.5 font-mono text-[11px] rounded transition-all duration-300 ${
                  activeTab === i
                    ? 'bg-brand-base/20 text-brand-base border border-brand-base/40'
                    : 'text-warmgray/60 hover:text-warmgray border border-transparent'
                }`}
              >
                {preset.shortLabel}
              </button>
            ))}
          </div>

          {/* Chat area */}
          <div className="p-6 min-h-[380px] max-h-[500px] overflow-y-auto">
            <p className="font-mono text-[10px] text-brand-base/50 mb-4 tracking-wider">
              // {PRESETS[activeTab].description}
            </p>

            {chatMessages.map((msg, i) => (
              <div key={i} className="mb-4">
                {msg.role === 'user' ? (
                  <div className="flex justify-end">
                    <div className="max-w-[80%] bg-brand-base/10 border border-brand-base/20 rounded-lg px-4 py-3">
                      <p className="font-mono text-xs text-white/90">{msg.text}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-start">
                    <div className="max-w-[85%] bg-white/5 border border-white/5 rounded-lg px-4 py-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-brand-ink" />
                        <span className="font-mono text-[10px] text-brand-base tracking-wider">BCI AGENT</span>
                      </div>
                      <div className="font-mono">
                        {renderMessageText(msg.text)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && displayedText && (
              <div className="flex justify-start mb-4">
                <div className="max-w-[85%] bg-white/5 border border-white/5 rounded-lg px-4 py-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-brand-ink animate-pulse" />
                    <span className="font-mono text-[10px] text-brand-base tracking-wider">BCI AGENT</span>
                  </div>
                  <div className="font-mono text-warmgray/90 text-xs leading-relaxed whitespace-pre-wrap">
                    {displayedText}
                    <span className="inline-block w-2 h-4 bg-brand-base/60 ml-0.5 animate-pulse align-middle" />
                  </div>
                </div>
              </div>
            )}

            {!isTyping && typingIndex < 0 && (
              <div className="flex items-center gap-2 text-warmgray/40 font-mono text-xs">
                <span className="w-2 h-2 rounded-full bg-brand-base animate-pulse" />
                Загрузка контекста...
              </div>
            )}

            {typingIndex >= PRESETS[activeTab].messages.length && (
              <div className="flex items-center gap-2 text-brand-base/50 font-mono text-[10px] tracking-wider mt-4">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-base" />
                Контекстный ответ сгенерирован за 2.3 сек.
              </div>
            )}


          </div>

          {/* Input bar (visual only) */}
          <div className="flex items-center gap-3 px-4 py-3 border-t border-white/5 bg-[#0a0a0a]/40">
            <span className="font-mono text-brand-base text-xs">{'>'}</span>
            <span className="font-mono text-warmgray/30 text-xs flex-1">
              {PRESETS[activeTab].placeholder}
            </span>
            <span className="font-mono text-[10px] text-warmgray/20">Только чтение</span>
          </div>
        </div>
      </div>
    </section>
  );
}
