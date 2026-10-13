'use client';
import { useCallback, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { invite } from '@/lib/data';

const HOLD_MS = 1200;
const R = 54;
const C = 2 * Math.PI * R;

export default function Cover({ guest, onOpen }: { guest: string; onOpen: () => void }) {
  const [p, setP] = useState(0);
  const [opening, setOpening] = useState(false);
  const [gone, setGone] = useState(false);
  const raf = useRef(0);
  const t0 = useRef(0);
  const done = useRef(false);

  const open = useCallback(() => {
    if (done.current) return;
    done.current = true;
    cancelAnimationFrame(raf.current);
    setP(1);
    setOpening(true);
    setTimeout(onOpen, 700);
    setTimeout(() => setGone(true), 1900);
  }, [onOpen]);

  const tick = useCallback(
    (t: number) => {
      const v = Math.min((t - t0.current) / HOLD_MS, 1);
      setP(v);
      if (v >= 1) open();
      else raf.current = requestAnimationFrame(tick);
    },
    [open]
  );

  const begin = () => {
    if (done.current) return;
    t0.current = performance.now();
    raf.current = requestAnimationFrame(tick);
  };
  const release = () => {
    if (done.current) return;
    cancelAnimationFrame(raf.current);
    setP(0);
  };

  if (gone) return null;

  const half = 'absolute inset-y-0 w-1/2 overflow-hidden bg-gradient-to-b from-night to-deep';
  const ease = [0.7, 0, 0.2, 1] as const;

  return (
    <div className={`fixed inset-0 z-50 ${opening ? 'pointer-events-none' : ''}`} role="dialog" aria-label="Buka undangan">
      {/* Dua daun gapura */}
      <motion.div className={`${half} left-0 border-r border-saffron/60`} animate={{ x: opening ? '-101%' : 0 }} transition={{ duration: 1.1, delay: 0.35, ease }}>
        <div className="batik absolute inset-0" />
      </motion.div>
      <motion.div className={`${half} right-0 border-l border-saffron/60`} animate={{ x: opening ? '101%' : 0 }} transition={{ duration: 1.1, delay: 0.35, ease }}>
        <div className="batik absolute inset-0" />
      </motion.div>

      {/* Teks dan segel */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-sm text-mist">Undangan pernikahan</p>
        <h1 className="mt-3 font-display text-4xl sm:text-6xl">
          {invite.bride} <span className="text-saffron">&amp;</span> {invite.groom}
        </h1>
        <p className="mt-8 text-sm text-mist">Kepada Yth.</p>
        <p className="mt-1 max-w-xs break-words font-display text-xl sm:text-2xl">{guest}</p>

        <button
          type="button"
          aria-label="Tahan untuk membuka undangan. Atau tekan Enter."
          className="relative mt-10 h-32 w-32 touch-none select-none rounded-full"
          onPointerDown={begin}
          onPointerUp={release}
          onPointerLeave={release}
          onPointerCancel={release}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              open();
            }
          }}
          onContextMenu={(e) => e.preventDefault()}
        >
          <svg viewBox="0 0 120 120" className="absolute inset-0" aria-hidden>
            <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(244,183,63,.25)" strokeWidth="3" />
            <circle
              cx="60" cy="60" r={R} fill="none" stroke="#F4B73F" strokeWidth="3" strokeLinecap="round"
              strokeDasharray={C} strokeDashoffset={C * (1 - p)} transform="rotate(-90 60 60)"
            />
          </svg>
          <motion.span
            className="absolute inset-3 grid place-items-center rounded-full font-display text-2xl text-jasmine shadow-[0_8px_30px_rgba(212,87,122,.45)]"
            style={{
              background: 'radial-gradient(circle at 35% 30%, #F08AA6, #D4577A 55%, #8E2C4C)',
              scale: 1 - p * 0.08,
              rotate: p * 6,
            }}
            animate={opening ? { scale: [1, 1.2, 0], opacity: [1, 1, 0] } : undefined}
            transition={{ duration: 0.6 }}
          >
            <span className="absolute inset-2 rounded-full border border-jasmine/30" />
            R&amp;A
          </motion.span>
        </button>
        <p className="mt-5 text-sm text-mist">Tahan segel untuk membuka gapura</p>
      </motion.div>
    </div>
  );
}
