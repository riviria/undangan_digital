'use client';

import { Heart } from 'lucide-react';
import { invite } from '@/lib/data';

export default function Ticket({ guest }: { guest: string }) {
  return (
    <section className="guest-pass-section" aria-label="Undangan untuk tamu">
      <div className="guest-pass">
        <Heart size={19} strokeWidth={1.4} aria-hidden />
        <p className="eyebrow">Special Invitation</p>
        <p className="guest-pass-for">Undangan ini kami tujukan dengan hormat kepada</p>
        <h2>{guest}</h2>
        <p>Semoga kita dapat berbagi tawa, doa, dan kenangan indah pada hari bahagia kami.</p>
        <div className="guest-pass-rule" />
        <span>{invite.bride} &amp; {invite.groom} <i>·</i> {invite.dateShort}</span>
      </div>
    </section>
  );
}
