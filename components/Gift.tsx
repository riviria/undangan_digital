'use client';

import { useState } from 'react';
import { Check, Copy, Gift as GiftIcon } from 'lucide-react';
import { invite } from '@/lib/data';

export default function Gift() {
  const [copied, setCopied] = useState<string | null>(null);
  const [error, setError] = useState('');

  const copyNumber = async (id: string, value: string) => {
    try {
      if (!navigator.clipboard) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(value);
      setCopied(id);
      setError('');
      window.setTimeout(() => setCopied((old) => old === id ? null : old), 2200);
    } catch {
      setError('Tidak dapat menyalin otomatis. Silakan salin nomor secara manual.');
    }
  };

  return (
    <section className="gift-section">
      <div className="section-head">
        <GiftIcon className="gift-heading-icon" size={28} strokeWidth={1.3} aria-hidden />
        <p className="eyebrow">Wedding Gift</p>
        <h2>Tanda <em>kasih</em></h2>
        <p>Doa restu dan kehadiran Anda adalah hadiah terindah. Jika berkenan memberikan tanda kasih, dapat melalui rekening berikut.</p>
      </div>
      <div className="gift-grid">
        {invite.gifts.map((gift) => (
          <article className="gift-card" key={gift.id}>
            <div className="gift-card-top"><span>{gift.label}</span><span aria-hidden>✳</span></div>
            <p className="gift-number">{gift.number}</p>
            <p className="gift-holder">a.n. {gift.holder}</p>
            <button type="button" className="gift-copy" onClick={() => copyNumber(gift.id, gift.number)}>
              {copied === gift.id ? <Check size={15} /> : <Copy size={15} />}
              {copied === gift.id ? 'Berhasil Disalin' : 'Salin Nomor'}
            </button>
          </article>
        ))}
      </div>
      <p className="gift-error" role="status" aria-live="polite">{error}</p>
    </section>
  );
}
