'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus, Send } from 'lucide-react';

type Wish = { id: number; name: string; attend: boolean; text: string };

const SEED: Wish[] = [
  { id: 1, name: 'Keluarga Hartono', attend: true, text: 'Selamat menempuh hidup baru. Semoga langgeng dan bahagia.' },
  { id: 2, name: 'Dinda & Fajar', attend: true, text: 'Tidak sabar bertemu di Yogyakarta!' },
];
const KEY = 'undangan-ucapan';

export default function Rsvp({ guest }: { guest: string }) {
  const [name, setName] = useState(guest === 'Tamu Undangan' ? '' : guest);
  const [attend, setAttend] = useState(true);
  const [count, setCount] = useState(1);
  const [text, setText] = useState('');
  const [wishes, setWishes] = useState<Wish[]>(SEED);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setWishes(JSON.parse(raw));
    } catch {}
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    // TODO: kirim ke API Anda (Route Handler, Supabase, Google Sheets, dsb.)
    const next = [{ id: Date.now(), name: name.trim(), attend, text: text.trim() }, ...wishes];
    setWishes(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
    setSent(true);
    setText('');
    if (attend) {
      const confetti = (await import('canvas-confetti')).default;
      const colors = ['#F4B73F', '#D4577A', '#F4F1FF'];
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.7 }, colors });
      setTimeout(() => confetti({ particleCount: 60, angle: 120, spread: 60, origin: { x: 1, y: 0.7 }, colors }), 200);
    }
  };

  const field = 'w-full rounded-xl border border-mist/30 bg-deep/70 px-4 py-3 text-jasmine placeholder:text-mist/60 focus:border-saffron focus:outline-none';

  return (
    <section className="batik bg-night px-6 py-24">
      <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
        <form onSubmit={submit} className="rounded-3xl border border-saffron/30 bg-deep/80 p-6 backdrop-blur sm:p-8">
          <h2 className="font-display text-3xl sm:text-4xl">Konfirmasi kehadiran</h2>
          <label className="mt-6 block text-sm text-mist" htmlFor="nama">Nama</label>
          <input id="nama" required value={name} onChange={(e) => setName(e.target.value)} className={`${field} mt-1`} placeholder="Nama lengkap" />

          <div className="mt-5 grid grid-cols-2 gap-2 rounded-full bg-night p-1" role="radiogroup" aria-label="Kehadiran">
            {[true, false].map((v) => (
              <button key={String(v)} type="button" role="radio" aria-checked={attend === v} onClick={() => setAttend(v)}
                className={`rounded-full px-4 py-2 text-sm transition ${attend === v ? 'bg-saffron text-deep' : 'text-mist'}`}>
                {v ? 'Saya hadir' : 'Belum bisa hadir'}
              </button>
            ))}
          </div>

          {attend && (
            <div className="mt-5 flex items-center justify-between">
              <span className="text-sm text-mist">Jumlah tamu</span>
              <div className="flex items-center gap-4">
                <button type="button" aria-label="Kurangi" onClick={() => setCount((c) => Math.max(1, c - 1))} className="grid h-10 w-10 place-items-center rounded-full border border-mist/40"><Minus size={16} /></button>
                <span className="w-6 text-center font-display text-2xl">{count}</span>
                <button type="button" aria-label="Tambah" onClick={() => setCount((c) => Math.min(5, c + 1))} className="grid h-10 w-10 place-items-center rounded-full border border-mist/40"><Plus size={16} /></button>
              </div>
            </div>
          )}

          <label className="mt-5 block text-sm text-mist" htmlFor="ucapan">Ucapan dan doa</label>
          <textarea id="ucapan" rows={4} value={text} onChange={(e) => setText(e.target.value)} className={`${field} mt-1 resize-none`} placeholder="Tulis ucapan untuk kedua mempelai" />

          <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-rosewood px-6 py-3 font-semibold transition hover:brightness-110">
            <Send size={16} /> Kirim konfirmasi
          </button>
          <p aria-live="polite" className="mt-3 min-h-5 text-center text-sm text-saffron">{sent ? 'Terkirim. Terima kasih sudah mengonfirmasi.' : ''}</p>
        </form>

        <div>
          <h2 className="font-display text-3xl sm:text-4xl">Ucapan untuk kami</h2>
          <ul className="mt-6 max-h-[28rem] space-y-3 overflow-y-auto pr-1">
            <AnimatePresence initial={false}>
              {wishes.map((w) => (
                <motion.li key={w.id} layout initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-mist/20 bg-deep/70 p-4">
                  <p className="font-semibold">{w.name}</p>
                  <p className="text-xs text-mist">{w.attend ? 'Hadir' : 'Belum bisa hadir'}</p>
                  {w.text && <p className="mt-2 break-words text-jasmine/90">{w.text}</p>}
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </section>
  );
}
