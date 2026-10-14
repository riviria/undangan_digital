'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { asset } from '@/lib/asset';
import { gallery } from '@/lib/data';

export default function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const change = useCallback((direction: number) => {
    setSelected((index) => index === null ? null : (index + direction + gallery.length) % gallery.length);
  }, []);

  useEffect(() => {
    if (selected === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const keyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
      if (e.key === 'ArrowLeft') change(-1);
      if (e.key === 'ArrowRight') change(1);
    };
    window.addEventListener('keydown', keyDown);
    return () => {
      window.removeEventListener('keydown', keyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [selected, change]);

  return (
    <section id="foto" className="gallery-section" aria-label="Foto-foto momen pengantin">
      <div className="gallery-grid">
        {gallery.map((photo, i) => (
          <button
            key={photo.id}
            className={`gallery-tile gallery-tile-${i + 1}`}
            onClick={() => setSelected(i)}
            type="button"
            aria-label={`Lihat foto ${i + 1} dari ${gallery.length}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset(photo.photo)} alt={photo.alt} loading="lazy" />
            <span className="gallery-tile-plus" aria-hidden>+</span>
          </button>
        ))}
      </div>
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            className="lightbox"
            role="dialog"
            aria-label="Lihat foto lebih besar"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelected(null)}
          >
            <div className="lightbox-top">
              <span>{String(selected + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}</span>
              <button className="lightbox-close" type="button" aria-label="Tutup foto" onClick={() => setSelected(null)}><X size={21} /></button>
            </div>
            <button className="lightbox-prev" type="button" aria-label="Foto sebelumnya" onClick={(e) => { e.stopPropagation(); change(-1); }}><ArrowLeft size={24} /></button>
            <motion.div
              className="lightbox-picture"
              key={selected}
              initial={{ opacity: 0.5, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => { if (info.offset.x < -55) change(1); if (info.offset.x > 55) change(-1); }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(gallery[selected].photo)} alt={gallery[selected].alt} />
            </motion.div>
            <button className="lightbox-next" type="button" aria-label="Foto berikutnya" onClick={(e) => { e.stopPropagation(); change(1); }}><ArrowRight size={24} /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
