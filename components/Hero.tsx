'use client';
import { useRef } from 'react';
import { motion, type Variants } from 'framer-motion';
import { invite } from '@/lib/data';

const letter: Variants = {
  out: { y: '110%', rotate: 6, opacity: 0 },
  in: (i: number) => ({ y: 0, rotate: 0, opacity: 1, transition: { delay: 0.15 + i * 0.07, type: 'spring', stiffness: 120, damping: 16 } }),
};

function Letters({ text, offset = 0 }: { text: string; offset?: number }) {
  return (
    <span className="inline-flex overflow-hidden pb-[0.08em]" aria-label={text}>
      {text.split('').map((c, i) => (
        <motion.span key={i} custom={i + offset} variants={letter} className="inline-block" aria-hidden>
          {c}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero({ show }: { show: boolean }) {
  const ref = useRef<HTMLElement>(null);

  const move = (e: React.PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--x', `${e.clientX - r.left}px`);
    el.style.setProperty('--y', `${e.clientY - r.top}px`);
  };

  return (
    <section ref={ref} onPointerMove={move} className="batik relative flex min-h-[100svh] items-center overflow-hidden px-6 py-24">
      {/* Cahaya yang mengikuti kursor atau jari */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(420px circle at var(--x, 50%) var(--y, 35%), rgba(244,183,63,.22), transparent 65%)' }}
      />
      <motion.div initial="out" animate={show ? 'in' : 'out'} className="relative mx-auto w-full max-w-5xl">
        <p className="max-w-sm text-base text-mist sm:text-lg">Dengan penuh syukur, kami mengundang Anda ke pernikahan kami.</p>
        <h2 className="mt-6 font-display text-[clamp(4rem,19vw,10.5rem)] leading-[0.88]">
          <div><Letters text={invite.bride} /></div>
          <div className="my-1 text-[0.35em] leading-none text-saffron sm:ml-[0.4em]">&amp;</div>
          <div className="sm:ml-[18%]"><Letters text={invite.groom} offset={invite.bride.length} /></div>
        </h2>
        <p className="mt-10 text-lg sm:text-xl">{invite.dateLabel}, {invite.city}</p>
        <a href="#hitung" className="mt-10 inline-block rounded-full border border-saffron/60 px-6 py-3 text-sm transition hover:bg-saffron hover:text-deep">
          Lihat rangkaian acara
        </a>
      </motion.div>
    </section>
  );
}
