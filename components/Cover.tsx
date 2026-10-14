'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Heart } from 'lucide-react';
import { asset } from '@/lib/asset';
import { invite } from '@/lib/data';

export default function Cover({ guest, onOpen }: { guest: string; onOpen: () => void }) {
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cover-heading"
      className="cover-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.035 }}
      transition={{ duration: 0.85, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="cover-image" src={asset(invite.coverPhoto)} alt="Foto pasangan pengantin di taman" fetchPriority="high" />
      <div className="cover-overlay" />
      <div className="cover-frame" aria-hidden />
      <div className="cover-top">
        <Heart size={16} strokeWidth={1.3} aria-hidden />
        <p>The Wedding Celebration</p>
      </div>
      <div className="cover-main">
        <p className="cover-kicker">Dengan penuh cinta mengundang Anda</p>
        <h1 id="cover-heading"><span>{invite.bride}</span><em>&amp;</em><span>{invite.groom}</span></h1>
        <span className="cover-decor" aria-hidden>✧</span>
        <p className="cover-date">{invite.dateLabel}</p>
      </div>
      <div className="cover-bottom">
        <p className="cover-to">Kepada Yth. Bapak/Ibu/Saudara/i</p>
        <p className="cover-guest">{guest}</p>
        <p className="cover-place">di tempat</p>
        <button type="button" className="cover-button" onClick={onOpen} autoFocus>
          <span>Buka Undangan</span><ArrowUpRight size={18} aria-hidden />
        </button>
        <p className="cover-note">Kami menantikan kehadiran dan doa restu Anda.</p>
      </div>
    </motion.div>
  );
}
