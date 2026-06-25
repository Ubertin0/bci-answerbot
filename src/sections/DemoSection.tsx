import SignalWavesBackground from '../components/SignalWavesBackground';
import RoiCalculator from '../components/RoiCalculator';

export default function DemoSection() {
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
            Калькулятор окупаемости BCI-агента
          </h2>
          <p className="fade-blur-element font-mono text-warmgray text-sm max-w-[700px] mx-auto">
            Оцените финансовую эффективность внедрения On-Premise RAG-агента BCI. 
            Переведите неконтролируемый OpEx в фиксированный CapEx и защитите корпоративные данные.
          </p>
        </div>

        <div className="fade-blur-element">
          <RoiCalculator />
        </div>
      </div>
    </section>
  );
}
