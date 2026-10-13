'use client';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { CalendarPlus, MapPin } from 'lucide-react';
import { invite } from '@/lib/data';
import { downloadIcs } from '@/lib/ics';

// Kode tamu dekoratif, dibuat deterministik dari nama tamu
function GuestCode({ seed }: { seed: string }) {
  let h = 2166136261;
  for (const ch of seed) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); }
  let s = h >>> 0 || 1;
  const rnd = () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; };
  const N = 21;
  const inFinder = (x: number, y: number) => (x < 8 && y < 8) || (x > N - 9 && y < 8) || (x < 8 && y > N - 9);
  const cells: React.ReactNode[] = [];
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    if (!inFinder(x, y) && rnd() > 0.52) cells.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />);
  }
  const finder = (x: number, y: number) => (
    <g key={`f${x}${y}`}>
      <rect x={x} y={y} width="7" height="7" />
      <rect x={x + 1} y={y + 1} width="5" height="5" fill="#F4F1FF" />
      <rect x={x + 2} y={y + 2} width="3" height="3" />
    </g>
  );
  return (
    <svg viewBox={`-1 -1 ${N + 2} ${N + 2}`} className="h-32 w-32" fill="#12163A" aria-hidden>
      <rect x="-1" y="-1" width={N + 2} height={N + 2} fill="#F4F1FF" />
      {cells}{finder(0, 0)}{finder(N - 7, 0)}{finder(0, N - 7)}
    </svg>
  );
}

export default function Ticket({ guest }: { guest: string }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 150, damping: 18 });
  const sy = useSpring(my, { stiffness: 150, damping: 18 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-8, 8]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const gx = useTransform(sx, [-0.5, 0.5], ['15%', '85%']);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx} 25%, rgba(255,255,255,.55), transparent 55%)`;

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const leave = () => { mx.set(0); my.set(0); };

  const notch = 'absolute h-6 w-6 rounded-full bg-deep';

  return (
    <section className="bg-deep px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-10 text-center font-display text-3xl sm:text-5xl">Tiket masuk Anda</h2>
        <div style={{ perspective: 1100 }} onPointerMove={move} onPointerLeave={leave}>
          <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }} className="relative grid rounded-3xl bg-jasmine text-night shadow-[0_30px_80px_rgba(0,0,0,.5)] md:grid-cols-[1fr_15rem]">
            <motion.div className="pointer-events-none absolute inset-0 z-10 rounded-3xl mix-blend-soft-light" style={{ backgroundImage: glare }} />

            <div className="p-8 sm:p-12">
              <p className="font-display text-3xl sm:text-4xl">{invite.bride} &amp; {invite.groom}</p>
              <p className="mt-1 text-night/70">{invite.dateLabel}</p>
              <dl className="mt-8 space-y-5">
                <div><dt className="text-sm text-night/60">Akad nikah</dt><dd className="font-display text-2xl">{invite.akad}</dd></div>
                <div><dt className="text-sm text-night/60">Resepsi</dt><dd className="font-display text-2xl">{invite.resepsi}</dd></div>
                <div><dt className="text-sm text-night/60">Tempat</dt><dd className="text-lg font-semibold">{invite.venue}</dd><dd className="text-night/70">{invite.address}</dd></div>
              </dl>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={invite.mapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-night px-5 py-3 text-sm text-jasmine transition hover:bg-rosewood">
                  <MapPin size={16} /> Buka peta
                </a>
                <button type="button" onClick={downloadIcs} className="inline-flex items-center gap-2 rounded-full border border-night/40 px-5 py-3 text-sm transition hover:bg-night hover:text-jasmine">
                  <CalendarPlus size={16} /> Simpan ke kalender
                </button>
              </div>
            </div>

            {/* Sobekan tiket */}
            <div className="relative flex flex-col items-center justify-center gap-4 border-t-2 border-dashed border-night/30 p-8 text-center md:border-l-2 md:border-t-0">
              <i className={`${notch} -left-3 -top-3`} />
              <i className={`${notch} -right-3 -top-3 md:-bottom-3 md:-left-3 md:right-auto md:top-auto`} />
              <p className="text-sm text-night/60">Atas nama</p>
              <p className="break-words font-display text-xl">{guest}</p>
              <GuestCode seed={guest} />
              <p className="text-sm text-night/70">Tunjukkan kode ini di meja penerima tamu.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
