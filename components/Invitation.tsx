'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { CalendarDays, Heart, Home, Image as ImageIcon, MessageCircle } from 'lucide-react';
import { asset } from '@/lib/asset';
import { invite } from '@/lib/data';
import Cover from './Cover';
import Hero from './Hero';
import Couple from './Couple';
import Countdown from './Countdown';
import Events from './Events';
import Ticket from './Ticket';
import Gallery from './Gallery';
import Rsvp from './Rsvp';
import Gift from './Gift';

const navigation = [
  { href: '#beranda', name: 'Awal', icon: Home },
  { href: '#mempelai', name: 'Kami', icon: Heart },
  { href: '#acara', name: 'Acara', icon: CalendarDays },
  { href: '#foto', name: 'Foto', icon: ImageIcon },
  { href: '#ucapan', name: 'Ucapan', icon: MessageCircle },
];

export default function Invitation() {
  const guest = useSearchParams().get('to')?.trim().slice(0, 90) || 'Tamu Undangan';
  const [opened, setOpened] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    document.body.style.overflow = opened ? '' : 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [opened]);

  return (
    <>
      <AnimatePresence mode="wait">
        {!opened && <Cover key="invitation-cover" guest={guest} onOpen={() => setOpened(true)} />}
      </AnimatePresence>

      <main id="main" className="site-shell">
        <motion.div aria-hidden style={{ scaleX: scrollYProgress }} className="scroll-progress" />
        <Hero />
        <section className="verse-section" aria-label="Doa pernikahan">
          <div className="section-symbol" aria-hidden>✦</div>
          <p className="eyebrow">Bismillahirrahmanirrahim</p>
          <p className="verse-copy">“Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu agar kamu merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.”</p>
          <p className="verse-source">QS. Ar-Rum : 21</p>
        </section>
        <Couple />
        <Countdown />
        <Events />
        <Ticket guest={guest} />
        <Gallery />
        <Rsvp guest={guest} />
        <Gift />
        <footer className="closing-section">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset(invite.closingPhoto)} alt="Momen hangat kedua mempelai" loading="lazy" className="closing-image" />
          <div className="closing-content">
            <p className="eyebrow eyebrow-light">Dengan segenap hati</p>
            <h2>Terima Kasih</h2>
            <p>Merupakan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.</p>
            <p className="closing-names">{invite.bride} <span>&</span> {invite.groom}</p>
            <div className="closing-rule" />
            <p className="closing-credit">Made with love · {invite.year}</p>
          </div>
        </footer>
      </main>

      {opened && (
        <nav className="bottom-nav" aria-label="Navigasi undangan">
          {navigation.map(({ href, name, icon: Icon }) => (
            <a key={href} href={href} className="nav-link" aria-label={`Ke bagian ${name}`}>
              <Icon size={19} strokeWidth={1.65} aria-hidden />
              <span>{name}</span>
            </a>
          ))}
        </nav>
      )}
    </>
  );
}
