'use client';

import { useEffect, useState } from 'react';
import { invite } from '@/lib/data';

function parts(ms: number) {
  const sec = Math.max(0, Math.floor(ms / 1000));
  return [
    { label: 'Hari', value: Math.floor(sec / 86400) },
    { label: 'Jam', value: Math.floor((sec % 86400) / 3600) },
    { label: 'Menit', value: Math.floor((sec % 3600) / 60) },
    { label: 'Detik', value: sec % 60 },
  ];
}

export default function Countdown() {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setLeft(new Date(invite.target).getTime() - Date.now());
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="countdown-section" aria-label="Hitung mundur hari pernikahan">
      <div className="countdown-inner">
        <p className="eyebrow eyebrow-light">Save The Date</p>
        <h2>Menuju hari <em>bahagia</em></h2>
        <p className="countdown-date">{invite.dateLabel}</p>
        <div className="countdown-grid" role="timer" aria-live="off">
          {parts(left ?? 0).map(({ label, value }) => (
            <div key={label} className="countdown-item">
              <span suppressHydrationWarning>{left === null ? '00' : String(value).padStart(2, '0')}</span>
              <small>{label}</small>
            </div>
          ))}
        </div>
        {left !== null && left <= 0 && <p className="countdown-message">Hari bahagia telah tiba.</p>}
      </div>
    </section>
  );
}
