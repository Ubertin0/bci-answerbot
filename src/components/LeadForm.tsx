'use client';

import { useState, FormEvent } from 'react';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function LeadForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    company: '',
    honeypot: '',
    consent: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Honeypot check - bot trap
    if (formData.honeypot) {
      setStatus('success');
      return;
    }

    // Validate required fields
    if (!formData.name || !formData.contact || !formData.consent) {
      setStatus('error');
      return;
    }

    setStatus('loading');

    const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL;

    if (!webhookUrl) {
      alert('Включен режим тестирования. Заявка сформирована, но Webhook не настроен.');
      setStatus('success');
      return;
    }

    try {
      const payload = {
        name: formData.name,
        contact: formData.contact,
        company: formData.company,
        timestamp: new Date().toISOString(),
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setStatus('success');
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <div className="text-green-400 text-lg font-heading font-bold mb-2">
          ✓ Заявка успешно отправлена
        </div>
        <p className="text-warmgray/60 font-mono text-sm">
          Инженер свяжется с вами в ближайшее время.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name field */}
      <div>
        <label htmlFor="name" className="block text-sm font-mono text-warmgray/80 mb-2">
          Имя <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-brand-base transition-colors"
          placeholder="Ваше имя"
        />
      </div>

      {/* Contact field */}
      <div>
        <label htmlFor="contact" className="block text-sm font-mono text-warmgray/80 mb-2">
          Контакт (Telegram/Email) <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="contact"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-brand-base transition-colors"
          placeholder="@telegram или email@example.com"
        />
      </div>

      {/* Company field */}
      <div>
        <label htmlFor="company" className="block text-sm font-mono text-warmgray/80 mb-2">
          Компания
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-brand-base transition-colors"
          placeholder="Название компании (необязательно)"
        />
      </div>

      {/* Honeypot field - hidden from humans */}
      <div style={{ display: 'none' }} aria-hidden="true">
        <label htmlFor="honeypot">Leave this empty</label>
        <input
          type="text"
          id="honeypot"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Consent checkbox */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="consent"
          name="consent"
          checked={formData.consent}
          onChange={handleChange}
          required
          className="mt-1 w-4 h-4 bg-[#0a0a0a] border border-white/10 rounded focus:ring-brand-base focus:ring-2"
        />
        <label htmlFor="consent" className="text-xs font-mono text-warmgray/60 leading-relaxed">
          Я согласен на обработку персональных данных в соответствии с политикой конфиденциальности <span className="text-red-500">*</span>
        </label>
      </div>

      {/* Error message */}
      {status === 'error' && (
        <div className="text-red-400 text-sm font-mono">
          Пожалуйста, заполните все обязательные поля и подтвердите согласие.
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={!formData.consent || status === 'loading'}
        className="w-full py-4 bg-brand-base text-[#040404] font-heading font-bold text-sm rounded-lg hover:brightness-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:brightness-100"
      >
        {status === 'loading' ? 'Отправка...' : 'Отправить заявку'}
      </button>
    </form>
  );
}