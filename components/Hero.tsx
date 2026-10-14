'use client';

import { motion } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import { asset } from '@/lib/asset';
import { invite } from '@/lib/data';

export default function Hero() {
  return (
    <section id="beranda" className="hero-section">
      <div className="hero-inner">
        <motion.div className="hero-intro" initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="hero-eyebrow"><span className="small-rule" /> The Wedding Of <span className="small-rule" /></div>
          <h2>{invite.bride}<span className="hero-amp">&amp;</span>{invite.groom}</h2>
          <div className="hero-line" aria-hidden>✦</div>
          <p className="hero-description">Dua hati, satu perjalanan. Dengan penuh rasa syukur, kami mengundang Anda untuk menjadi bagian dari hari istimewa kami.</p>
          <p className="hero-date">{invite.dateLabel}</p>
          <p className="hero-city">{invite.city}, Indonesia</p>
          <a className="hero-discover" href="#mempelai">Jelajahi kisah kami <ArrowDownRight size={18} aria-hidden /></a>
        </motion.div>
        <div className="hero-picture-wrap">
          <div className="hero-picture-back" aria-hidden />
          <div className="hero-picture">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset(invite.coverPhoto)} alt="Raisa dan Arjuna berpose bersama di taman" className="hero-picture-img" fetchPriority="high" />
          </div>
          <p className="hero-picture-caption">TWO SOULS, ONE STORY <span>·</span> {invite.dateShort}</p>
        </div>
      </div>
    </section>
  );
}
