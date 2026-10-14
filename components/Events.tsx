'use client';

import { CalendarPlus, Clock3, MapPin, ArrowUpRight } from 'lucide-react';
import { invite } from '@/lib/data';
import { downloadIcs } from '@/lib/ics';

const events = [
  { title: 'Akad Nikah', time: invite.akad, number: '01' },
  { title: 'Resepsi', time: invite.resepsi, number: '02' },
];

export default function Events() {
  return (
    <section id="acara" className="events-section">
      <div className="section-head">
        <p className="eyebrow">Rangkaian Acara</p>
        <h2>Hari yang kami <em>nantikan</em></h2>
        <p>Merupakan suatu kehormatan bagi kami apabila Anda berkenan hadir dan membersamai kebahagiaan ini.</p>
      </div>
      <div className="events-grid">
        {events.map((event) => (
          <article className="event-card" key={event.number}>
            <div className="event-ornament" aria-hidden>✧</div>
            <p className="event-num">{event.number} / THE CELEBRATION</p>
            <h3>{event.title}</h3>
            <div className="event-date">
              <span>{invite.month}</span>
              <strong>{invite.day}</strong>
              <span>{invite.year}</span>
            </div>
            <p className="event-day">{invite.dateLabel}</p>
            <p className="event-time"><Clock3 size={16} strokeWidth={1.6} aria-hidden /> {event.time}</p>
            <div className="event-separator" />
            <p className="event-loc-label"><MapPin size={15} aria-hidden /> Bertempat di</p>
            <h4>{invite.venue}</h4>
            <p className="event-address">{invite.address}</p>
            <a href={invite.mapsUrl} target="_blank" rel="noreferrer" className="event-map">Lihat Lokasi <ArrowUpRight size={17} aria-hidden /></a>
          </article>
        ))}
      </div>
      <div className="event-calendar-wrap">
        <button className="calendar-button" type="button" onClick={downloadIcs}><CalendarPlus size={18} aria-hidden /> Simpan ke Kalender</button>
        <p>Ketuk untuk menyimpan tanggal istimewa kami.</p>
      </div>
    </section>
  );
}
