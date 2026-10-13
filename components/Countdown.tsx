'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { invite } from '@/lib/data';

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return [
    { label: 'Hari', v: Math.floor(s / 86400) },
    { label: 'Jam', v: Math.floor((s % 86400) / 3600) },
    { label: 'Menit', v: Math.floor((s % 3600) / 60) },
    { label: 'Detik', v: s % 60 },
  ];
}

export default function Countdown() {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const target = new Date(invite.target).getTime();
    const tick = () => setLeft(target - Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="hitung" className="bg-night px-6 py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-display text-3xl sm:text-5xl">Hitung mundur menuju akad</h2>
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4" role="timer" aria-live="off">
          {parts(left ?? 0).map((u) => (
            <div key={u.label} className="rounded-t-[3rem] rounded-b-xl border border-saffron/40 bg-deep/60 px-4 pb-6 pt-10">
              <div className="relative h-16 overflow-hidden font-display text-5xl tabular-nums sm:text-6xl">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={left === null ? 'x' : u.v}
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '-100%', opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-x-0"
                  >
                    {left === null ? '--' : String(u.v).padStart(2, '0')}
                  </motion.span>
                </AnimatePresence>
              </div>
              <p className="mt-3 text-sm text-mist">{u.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
