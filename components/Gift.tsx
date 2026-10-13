'use client';
import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { invite } from '@/lib/data';

export default function Gift() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (id: string, number: string) => {
    try { await navigator.clipboard.writeText(number); } catch {}
    setCopied(id);
    setTimeout(() => setCopied(null), 1800);
  };

  return (
    <section className="bg-deep px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-3xl sm:text-5xl">Tanda kasih</h2>
        <p className="mx-auto mt-4 max-w-md text-mist">Kehadiran Anda sudah menjadi hadiah terbaik. Bila ingin berbagi kebahagiaan, Anda dapat mengirimkannya ke rekening berikut.</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {invite.gifts.map((g) => (
            <div key={g.id} className="rounded-2xl border border-saffron/30 p-6 text-left">
              <p className="text-sm text-mist">{g.label}</p>
              <p className="mt-2 font-display text-2xl tracking-wide">{g.number}</p>
              <p className="text-sm text-jasmine/80">a.n. {g.holder}</p>
              <button type="button" onClick={() => copy(g.id, g.number)} className="mt-5 inline-flex items-center gap-2 rounded-full border border-saffron/60 px-4 py-2 text-sm transition hover:bg-saffron hover:text-deep">
                {copied === g.id ? <Check size={16} /> : <Copy size={16} />}
                {copied === g.id ? 'Tersalin' : 'Salin nomor'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
