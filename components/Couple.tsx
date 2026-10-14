'use client';

import { motion } from 'framer-motion';
import { asset } from '@/lib/asset';
import { couple } from '@/lib/data';

export default function Couple() {
  return (
    <section id="mempelai" className="couple-section">
      <div className="section-head">
        <p className="eyebrow">Assalamu’alaikum Warahmatullahi Wabarakatuh</p>
        <h2>Dengan penuh <em>bahagia</em></h2>
        <p>Atas rahmat dan karunia Allah SWT, dengan segala kerendahan hati kami mengundang Bapak/Ibu/Saudara/i untuk hadir di hari pernikahan kami.</p>
      </div>
      <div className="couple-grid">
        {couple.map((person, i) => (
          <motion.figure key={person.id} className="couple-person" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.7, delay: i * 0.12 }}>
            <div className="couple-portrait-border">
              <div className="couple-portrait">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset(person.photo)} alt={`Foto ${person.full}`} loading="lazy" />
              </div>
            </div>
            <figcaption>
              <p className="couple-role">{person.id === 'bride' ? 'Mempelai Wanita' : 'Mempelai Pria'}</p>
              <h3>{person.full}</h3>
              <div className="couple-divider" aria-hidden>✧</div>
              <p>{person.parents}</p>
            </figcaption>
          </motion.figure>
        ))}
        <span className="couple-join" aria-hidden>&amp;</span>
      </div>
    </section>
  );
}
