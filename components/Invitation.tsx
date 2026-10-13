'use client';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, useScroll } from 'framer-motion';
import { invite } from '@/lib/data';
import Cover from './Cover';
import Hero from './Hero';
import Countdown from './Countdown';
import Ticket from './Ticket';
import Rsvp from './Rsvp';
import Gift from './Gift';

export default function Invitation() {
  const guest = useSearchParams().get('to')?.trim() || 'Tamu Undangan';
  const [opened, setOpened] = useState(false);
  const { scrollYProgress } = useScroll();

  // Kunci scroll selama gapura masih tertutup
  useEffect(() => {
    document.body.style.overflow = opened ? '' : 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [opened]);

  const onOpen = useCallback(() => setOpened(true), []);

  return (
    <main>
      <Cover guest={guest} onOpen={onOpen} />
      <motion.div style={{ scaleX: scrollYProgress }} className="fixed inset-x-0 top-0 z-40 h-1 origin-left bg-saffron" />
      <Hero show={opened} />
      <Countdown />
      <Ticket guest={guest} />
      <Rsvp guest={guest} />
      <Gift />
      <footer className="batik bg-night px-6 py-20 text-center">
        <p className="font-display text-4xl sm:text-5xl">{invite.bride} &amp; {invite.groom}</p>
        <p className="mx-auto mt-4 max-w-md text-mist">Terima kasih atas doa dan kehadiran Anda.</p>
      </footer>
    </main>
  );
}
