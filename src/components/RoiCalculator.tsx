import { useState, useMemo, useRef } from 'react';
import { Calculator, TrendingDown, Clock, Server, BarChart3, ShieldCheck, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function RoiCalculator() {
  const [l1Staff, setL1Staff] = useState(5);
  const [avgSalary, setAvgSalary] = useState(150000);
  const [nightShiftCost, setNightShiftCost] = useState(50000);
  const [hrCost, setHrCost] = useState(50000);
  const [hardwareCost, setHardwareCost] = useState(1400000);
  const [integrationCost, setIntegrationCost] = useState(500000);
  const [automationRate, setAutomationRate] = useState(60);
  const calculatorRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = async () => {
    if (!calculatorRef.current) return;
    setIsExporting(true);
    try {
      const canvas = await html2canvas(calculatorRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('bci-roi-report.pdf');
    } catch (error) {
      console.error('PDF export error:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const metrics = useMemo(() => {
    const currentMonthlyCost = (l1Staff * avgSalary) + nightShiftCost + hrCost;
    const currentYearlyCost = currentMonthlyCost * 12;
    const newL1StaffEquivalent = l1Staff * (1 - automationRate / 100);
    const newMonthlyCost = (newL1StaffEquivalent * avgSalary);
    
    const monthlySavings = currentMonthlyCost - newMonthlyCost;
    const totalInvestment = hardwareCost + integrationCost;
    const paybackPeriod = monthlySavings > 0 ? totalInvestment / monthlySavings : 0;
    
    const tcoWithoutAI_1Yr = currentYearlyCost;
    const tcoWithAI_1Yr = totalInvestment + (newMonthlyCost * 12);

    return { currentMonthlyCost, monthlySavings, totalInvestment, paybackPeriod, tcoWithoutAI_1Yr, tcoWithAI_1Yr };
  }, [l1Staff, avgSalary, nightShiftCost, hrCost, hardwareCost, integrationCost, automationRate]);

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(value);
  
  const formatMonths = (value: number) => value > 0 ? value.toFixed(1) + ' мес.' : 'N/A';

  const maxTco = Math.max(metrics.tcoWithoutAI_1Yr, metrics.tcoWithAI_1Yr);
  const heightWithoutAI = `${(metrics.tcoWithoutAI_1Yr / maxTco) * 100}%`;
  const heightWithAI = `${(metrics.tcoWithAI_1Yr / maxTco) * 100}%`;

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div ref={calculatorRef} className="p-4 md:p-8 bg-slate-50 text-slate-900 font-sans rounded-2xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3 mb-2">
          <Calculator className="w-8 h-8 text-blue-600" />
          Калькулятор окупаемости (ROI)
        </h2>
        <p className="text-slate-600 max-w-3xl">
          Оцените финансовую эффективность внедрения On-Premise RAG-агента BCI. 
          Переведите неконтролируемый OpEx в фиксированный CapEx и защитите корпоративные данные.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-xl font-semibold border-b pb-4 flex items-center gap-2">
            <Server className="w-5 h-5 text-slate-500" />
            Вводные данные
          </h3>

          <div className="space-y-4 pt-2">
            <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Текущая поддержка (OpEx)</div>
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-slate-700">Штат поддержки L1 (чел)</label>
                <span className="text-sm font-bold text-blue-600">{l1Staff}</span>
              </div>
              <input type="range" min="1" max="50" step="1" value={l1Staff} onChange={(e) => setL1Staff(Number(e.target.value))} className="w-full accent-blue-600" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-slate-700">ФОТ 1 сотрудника + налоги (₽/мес)</label>
                <span className="text-sm font-bold text-blue-600">{formatCurrency(avgSalary)}</span>
              </div>
              <input type="range" min="50000" max="300000" step="10000" value={avgSalary} onChange={(e) => setAvgSalary(Number(e.target.value))} className="w-full accent-blue-600" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-slate-700">Доплаты за ночь/выходные (₽/мес)</label>
                <span className="text-sm font-bold text-blue-600">{formatCurrency(nightShiftCost)}</span>
              </div>
              <input type="range" min="0" max="500000" step="10000" value={nightShiftCost} onChange={(e) => setNightShiftCost(Number(e.target.value))} className="w-full accent-blue-600" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-slate-700">Скрытые HR расходы (₽/мес)</label>
                <span className="text-sm font-bold text-blue-600">{formatCurrency(hrCost)}</span>
              </div>
              <input type="range" min="0" max="300000" step="10000" value={hrCost} onChange={(e) => setHrCost(Number(e.target.value))} className="w-full accent-blue-600" />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Инвестиции во внедрение (CapEx)</div>
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-slate-700">Стоимость GPU-сервера (₽)</label>
                <span className="text-sm font-bold text-blue-600">{formatCurrency(hardwareCost)}</span>
              </div>
              <input type="range" min="500000" max="5000000" step="100000" value={hardwareCost} onChange={(e) => setHardwareCost(Number(e.target.value))} className="w-full accent-blue-600" />
              <p className="text-xs text-slate-400 mt-1">Например: 1x NVIDIA RTX 4090 / A10</p>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-slate-700">Лицензия и интеграция BCI (₽)</label>
                <span className="text-sm font-bold text-blue-600">{formatCurrency(integrationCost)}</span>
              </div>
              <input type="range" min="100000" max="3000000" step="100000" value={integrationCost} onChange={(e) => setIntegrationCost(Number(e.target.value))} className="w-full accent-blue-600" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-slate-700">Уровень автоматизации тикетов (%)</label>
                <span className="text-sm font-bold text-blue-600">{automationRate}%</span>
              </div>
              <input type="range" min="10" max="90" step="5" value={automationRate} onChange={(e) => setAutomationRate(Number(e.target.value))} className="w-full accent-blue-600" />
              <p className="text-xs text-slate-400 mt-1">Доля рутинных запросов, закрываемых ИИ</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-blue-500">
              <div className="flex items-center gap-2 text-slate-500 mb-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-semibold uppercase tracking-wider">Срок окупаемости</span>
              </div>
              <div className="text-4xl font-extrabold text-slate-900">
                {formatMonths(metrics.paybackPeriod)}
              </div>
              <div className="text-sm text-slate-500 mt-2">Время полного возврата инвестиций.</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-emerald-500">
              <div className="flex items-center gap-2 text-slate-500 mb-2">
                <TrendingDown className="w-4 h-4" />
                <span className="text-sm font-semibold uppercase tracking-wider">Ежемесячная экономия</span>
              </div>
              <div className="text-4xl font-extrabold text-emerald-600">
                {formatCurrency(metrics.monthlySavings)}
              </div>
              <div className="text-sm text-slate-500 mt-2">Чистая экономия на ФОТ, HR и переработках.</div>
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl shadow-md text-white border border-slate-800">
             <div className="flex items-center justify-between mb-1">
                <span className="text-slate-400 font-medium">Общие инвестиции (Сервер + Внедрение):</span>
                <span className="text-xl font-bold">{formatCurrency(metrics.totalInvestment)}</span>
             </div>
             <div className="flex items-center gap-2 mt-4 text-sm text-slate-400 bg-slate-800/50 p-3 rounded-lg">
                <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span>100% On-Premise. Вычисления происходят локально, без оплаты за токены в облако.</span>
             </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex-grow flex flex-col">
            <h3 className="text-xl font-semibold border-b pb-4 flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-slate-500" />
              Сравнение TCO за первый год
            </h3>
            <div className="flex-grow flex items-end justify-center gap-12 pb-8 relative pt-10">
              <div className="flex flex-col items-center group w-32">
                <div className="text-sm font-bold text-slate-600 mb-2 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-2">
                  {formatCurrency(metrics.tcoWithoutAI_1Yr)}
                </div>
                <div className="w-full bg-slate-200 rounded-t-md transition-all duration-500 ease-out relative" style={{ height: heightWithoutAI, minHeight: '40px' }}>
                  <div className="absolute bottom-0 w-full text-center pb-2 text-slate-500 font-semibold text-sm">OpEx</div>
                </div>
                <div className="text-center mt-3 font-medium text-slate-700 leading-tight">Без ИИ</div>
              </div>
              <div className="flex flex-col items-center group w-32">
                <div className="text-sm font-bold text-blue-600 mb-2 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-2">
                  {formatCurrency(metrics.tcoWithAI_1Yr)}
                </div>
                <div className="w-full bg-blue-600 rounded-t-md transition-all duration-500 ease-out shadow-lg relative flex flex-col justify-end" style={{ height: heightWithAI, minHeight: '40px' }}>
                   <div className="w-full border-t border-blue-400/30 text-center pb-2 pt-2 text-blue-100 font-semibold text-xs bg-blue-700/50 rounded-t-md hidden md:block">
                      {Math.round((metrics.totalInvestment / metrics.tcoWithAI_1Yr) * 100)}% CapEx
                   </div>
                </div>
                <div className="text-center mt-3 font-medium text-blue-600 leading-tight">С агентом BCI</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      <button
        onClick={handleExportPDF}
        disabled={isExporting}
        className="mt-6 flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition disabled:opacity-50 mx-auto"
      >
        <Download className="w-4 h-4" />
        {isExporting ? 'Генерация...' : 'Скачать расчет в PDF'}
      </button>
    </div>
  );
}
