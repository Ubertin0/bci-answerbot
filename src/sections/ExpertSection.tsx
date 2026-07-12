import Image from 'next/image';
import { Check } from 'lucide-react';

const BENEFITS = [
  'Вы общаетесь с инженером, который лично проектирует и разворачивает систему.',
  'Решения принимаются за часы, а не за недели корпоративных согласований.',
  'Персональная ответственность за результат и бесперебойную работу.',
];

export default function ExpertSection() {
  return (
    <section id="expert" className="w-full bg-[#0a0f0a] py-24 lg:py-32">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="fade-blur-element flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Photo */}
          <div
            className="flex-shrink-0"
            style={{ transitionDelay: '100ms' }}
          >
            <div className="relative w-[280px] h-[340px] rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(74,100,65,0.15)] border border-white/5">
              <Image
                src="/images/expert-photo.JPG"
                alt="Евгений Баландин — архитектор решения BCI"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h2
              className="fade-blur-element font-heading font-bold text-white leading-tight mb-4"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', transitionDelay: '150ms' }}
            >
              Архитектор решения
            </h2>

            <h3
              className="fade-blur-element font-heading font-bold text-brand-base text-xl mb-2"
              style={{ transitionDelay: '250ms' }}
            >
              Евгений Баландин
            </h3>

            <p
              className="fade-blur-element font-mono text-warmgray/60 text-sm mb-6"
              style={{ transitionDelay: '350ms' }}
            >
              Платформенный инженер и архитектор BCI.
            </p>

            <p
              className="fade-blur-element font-mono text-warmgray/80 text-sm leading-relaxed mb-8 max-w-[640px]"
              style={{ transitionDelay: '450ms' }}
            >
              20 лет опыта управления комплексными подрядными проектами в реальном секторе.
              Я перенес стандарты жесткой дисциплины, контроля рисков и соблюдения SLA
              в IT-инфраструктуру. Последние годы специализируюсь на платформенной
              инженерии и внедрении локальных ИИ-агентов (RAG) в закрытые корпоративные контура.
            </p>

            <div
              className="fade-blur-element mb-8"
              style={{ transitionDelay: '550ms' }}
            >
              <h4 className="font-heading font-bold text-white text-sm mb-4">
                Почему это важно для вас
              </h4>
              <ul className="space-y-3">
                {BENEFITS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-brand-base flex-shrink-0 mt-0.5" />
                    <span className="font-mono text-warmgray/70 text-sm leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="fade-blur-element inline-block px-8 py-3 bg-brand-base text-[#040404] font-heading font-bold text-sm rounded hover:brightness-110 transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.3)]"
              style={{ transitionDelay: '650ms' }}
            >
              Задать технический вопрос
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
