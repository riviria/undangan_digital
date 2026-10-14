'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { Check, Minus, Plus, Send } from 'lucide-react';

type Wish = { id: number; name: string; attend: boolean; text: string; count: number };
const KEY = 'raisa-arjuna-ucapan-v2';
const STARTER: Wish[] = [
  { id: 1, name: 'Keluarga Hartono', attend: true, count: 2, text: 'Selamat menempuh hidup baru. Semoga senantiasa dilimpahkan kebahagiaan.' },
  { id: 2, name: 'Dinda & Fajar', attend: true, count: 2, text: 'Bahagia selalu untuk kalian berdua. Semoga semuanya lancar!' },
];

export default function Rsvp({ guest }: { guest: string }) {
  const [name, setName] = useState(guest === 'Tamu Undangan' ? '' : guest);
  const [attend, setAttend] = useState(true);
  const [count, setCount] = useState(1);
  const [message, setMessage] = useState('');
  const [wishes, setWishes] = useState<Wish[]>(STARTER);
  const [status, setStatus] = useState('');

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(KEY);
      if (!saved) return;
      const parsed: unknown = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        const safe = parsed.filter((w): w is Wish => w && typeof w.name === 'string' && typeof w.text === 'string' && typeof w.attend === 'boolean' && typeof w.id === 'number' && typeof w.count === 'number');
        setWishes([...safe.slice(0, 40), ...STARTER]);
      }
    } catch { /* Storage might be unavailable in private browsing. */ }
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) return;
    const newWish: Wish = { id: Date.now(), name: name.trim().slice(0, 70), attend, count: attend ? count : 0, text: message.trim().slice(0, 320) };
    const previousPersonal = wishes.filter((w) => w.id > 2);
    const personal = [newWish, ...previousPersonal].slice(0, 40);
    setWishes([...personal, ...STARTER]);
    try {
      window.localStorage.setItem(KEY, JSON.stringify(personal));
      setStatus('Terima kasih. Konfirmasi ini tersimpan di perangkat Anda.');
    } catch {
      setStatus('Terima kasih. Ucapan tampil pada halaman ini, tetapi penyimpanan lokal tidak tersedia.');
    }
    setMessage('');
  };

  return (
    <section id="ucapan" className="rsvp-section">
      <div className="rsvp-container">
        <div className="section-head section-head-light">
          <p className="eyebrow eyebrow-light">Wishes &amp; Prayers</p>
          <h2>Kirim doa <em>&amp; ucapan</em></h2>
          <p>Kehadiran dan doa Anda adalah hadiah yang paling berarti bagi kami.</p>
        </div>
        <div className="rsvp-grid">
          <form className="rsvp-form" onSubmit={handleSubmit}>
            <label htmlFor="guest-name">Nama Lengkap</label>
            <input id="guest-name" type="text" autoComplete="name" placeholder="Nama Anda" value={name} maxLength={70} required onChange={(e) => setName(e.target.value)} />

            <span className="rsvp-label">Konfirmasi Kehadiran</span>
            <div className="attendance-options" role="group" aria-label="Konfirmasi kehadiran">
              <button type="button" className={attend ? 'chosen' : ''} aria-pressed={attend} onClick={() => setAttend(true)}>InsyaAllah Hadir</button>
              <button type="button" className={!attend ? 'chosen' : ''} aria-pressed={!attend} onClick={() => setAttend(false)}>Belum Bisa Hadir</button>
            </div>

            {attend && (
              <div className="guest-count-row">
                <span>Jumlah tamu</span>
                <div className="count-stepper">
                  <button type="button" aria-label="Kurangi tamu" disabled={count === 1} onClick={() => setCount((n) => Math.max(1, n - 1))}><Minus size={17} /></button>
                  <strong>{count}</strong>
                  <button type="button" aria-label="Tambah tamu" disabled={count === 5} onClick={() => setCount((n) => Math.min(5, n + 1))}><Plus size={17} /></button>
                </div>
              </div>
            )}

            <label htmlFor="guest-wish">Ucapan &amp; Doa</label>
            <textarea id="guest-wish" placeholder="Tulis doa terbaik Anda di sini..." rows={4} maxLength={320} value={message} onChange={(e) => setMessage(e.target.value)} />
            <button type="submit" className="rsvp-submit"><Send size={16} aria-hidden /> Kirim Ucapan</button>
            <p className="form-status" role="status" aria-live="polite">{status}</p>
            <p className="form-note">Mode demo: ucapan disimpan di browser ini. Hubungkan ke database untuk menerima konfirmasi dari semua tamu.</p>
          </form>
          <div className="wishes-panel">
            <div className="wishes-heading"><h3>Doa dari orang terkasih</h3><span>{wishes.length} ucapan</span></div>
            <div className="wishes-list">
              {wishes.map((wish) => (
                <article className="wish-card" key={wish.id}>
                  <div className="wish-card-top"><span className="wish-avatar" aria-hidden>{wish.name[0]?.toUpperCase() || 'T'}</span><div><h4>{wish.name}</h4><p>{wish.attend ? `Hadir${wish.count > 0 ? ` · ${wish.count} tamu` : ''}` : 'Belum bisa hadir'}</p></div><Check size={16} aria-label="Tercatat" /></div>
                  {wish.text && <p className="wish-copy">{wish.text}</p>}
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
