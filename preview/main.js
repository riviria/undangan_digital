/* Versi preview tanpa build tool. Versi utama di folder /app dan /components. */
(() => {
  const qs = new URLSearchParams(location.search);
  const guest = (qs.get('to') || '').trim().slice(0, 90) || 'Tamu Undangan';
  document.getElementById('cover-guest').textContent = guest;
  document.getElementById('pass-guest').textContent = guest;
  document.getElementById('guest-name').value = guest === 'Tamu Undangan' ? '' : guest;

  document.getElementById('open-cover').addEventListener('click', () => {
    const cover = document.getElementById('cover');
    cover.classList.add('is-exiting');
    document.body.style.overflow = '';
    document.getElementById('nav').hidden = false;
    setTimeout(() => cover.remove(), 800);
  });

  const target = new Date('2026-12-12T09:00:00+07:00').getTime();
  const tick = () => {
    const s = Math.max(0, Math.floor((target - Date.now()) / 1000));
    const values = [Math.floor(s / 86400), Math.floor((s % 86400) / 3600), Math.floor((s % 3600) / 60), s % 60];
    ['days', 'hours', 'minutes', 'seconds'].forEach((id, i) => document.getElementById(id).textContent = String(values[i]).padStart(2, '0'));
  };
  tick(); setInterval(tick, 1000);

  const lightbox = document.getElementById('lightbox');
  let selected = 0;
  const show = (n) => {
    selected = (n + 8) % 8;
    document.getElementById('lightbox-counter').textContent = `${String(selected + 1).padStart(2, '0')} / 08`;
    document.getElementById('lightbox-image').src = `../public/images/gallery/${selected + 1}.webp`;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  };
  const close = () => { lightbox.hidden = true; document.body.style.overflow = ''; };
  document.querySelectorAll('[data-photo]').forEach((el) => el.addEventListener('click', () => show(Number(el.dataset.photo))));
  document.getElementById('lightbox-close').addEventListener('click', close);
  document.getElementById('lightbox-prev').addEventListener('click', (e) => { e.stopPropagation(); show(selected - 1); });
  document.getElementById('lightbox-next').addEventListener('click', (e) => { e.stopPropagation(); show(selected + 1); });
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
  window.addEventListener('keydown', (e) => { if (lightbox.hidden) return; if (e.key === 'Escape') close(); if (e.key === 'ArrowRight') show(selected + 1); if (e.key === 'ArrowLeft') show(selected - 1); });
  let touchX;
  lightbox.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend', (e) => { if (typeof touchX !== 'number') return; const delta = e.changedTouches[0].clientX - touchX; if (Math.abs(delta) > 60) show(selected + (delta < 0 ? 1 : -1)); touchX = undefined; }, { passive: true });

  document.getElementById('save-calendar').addEventListener('click', () => {
    const ics = [ 'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Raisa dan Arjuna//Undangan Pernikahan//ID', 'BEGIN:VEVENT', 'UID:raisa-arjuna-20261212@example.com', 'DTSTAMP:20261014T000000Z', 'DTSTART:20261212T020000Z', 'DTEND:20261212T070000Z', 'SUMMARY:Pernikahan Raisa & Arjuna', 'LOCATION:Pendopo Taman Sari Kencana\\, Sleman\\, Yogyakarta', 'END:VEVENT', 'END:VCALENDAR' ].join('\r\n');
    const link = document.createElement('a'); const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' })); link.href = url; link.download = 'undangan-raisa-arjuna.ics'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  });

  const starter = [ { id: 1, name: 'Keluarga Hartono', attend: true, count: 2, text: 'Selamat menempuh hidup baru. Semoga senantiasa dilimpahkan kebahagiaan.' }, { id: 2, name: 'Dinda & Fajar', attend: true, count: 2, text: 'Bahagia selalu untuk kalian berdua. Semoga semuanya lancar!' } ];
  let saved = [];
  try { const data = JSON.parse(localStorage.getItem('raisa-arjuna-ucapan-v2') || '[]'); if (Array.isArray(data)) saved = data.filter((x) => x && typeof x.name === 'string' && typeof x.text === 'string').slice(0, 40); } catch {}
  let attend = true; let count = 1;
  const list = document.getElementById('wish-list');
  function renderWishes() {
    list.replaceChildren();
    for (const w of [...saved, ...starter]) {
      const card = document.createElement('article'); card.className = 'wish-card';
      const top = document.createElement('div'); top.className = 'wish-card-top';
      const avatar = document.createElement('span'); avatar.className = 'wish-avatar'; avatar.textContent = (w.name[0] || 'T').toUpperCase();
      const info = document.createElement('div'); const heading = document.createElement('h4'); heading.textContent = w.name; const meta = document.createElement('p'); meta.textContent = w.attend ? `Hadir · ${w.count || 1} tamu` : 'Belum bisa hadir'; info.append(heading, meta); top.append(avatar, info);
      card.append(top);
      if (w.text) { const desc = document.createElement('p'); desc.className = 'wish-copy'; desc.textContent = w.text; card.append(desc); }
      list.append(card);
    }
    document.getElementById('wish-total').textContent = `${saved.length + starter.length} ucapan`;
  }
  renderWishes();
  document.getElementById('attend-yes').addEventListener('click', () => setAttend(true));
  document.getElementById('attend-no').addEventListener('click', () => setAttend(false));
  function setAttend(value) { attend = value; document.getElementById('attend-yes').classList.toggle('chosen', attend); document.getElementById('attend-no').classList.toggle('chosen', !attend); document.getElementById('count-container').hidden = !attend; }
  document.getElementById('minus').addEventListener('click', () => { count = Math.max(1, count - 1); document.getElementById('guest-count').textContent = count; });
  document.getElementById('plus').addEventListener('click', () => { count = Math.min(5, count + 1); document.getElementById('guest-count').textContent = count; });
  document.getElementById('rsvp').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('guest-name').value.trim(); if (!name) return;
    const text = document.getElementById('guest-wish').value.trim();
    saved.unshift({ id: Date.now(), name: name.slice(0, 70), attend, count: attend ? count : 0, text: text.slice(0, 320) }); saved = saved.slice(0, 40);
    try { localStorage.setItem('raisa-arjuna-ucapan-v2', JSON.stringify(saved)); document.getElementById('form-status').textContent = 'Terima kasih. Konfirmasi tersimpan di perangkat Anda.'; }
    catch { document.getElementById('form-status').textContent = 'Ucapan tampil pada halaman ini, namun tidak bisa disimpan lokal.'; }
    document.getElementById('guest-wish').value = ''; renderWishes();
  });
  document.querySelectorAll('[data-copy]').forEach((btn) => btn.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(btn.dataset.copy); btn.textContent = '✓ Berhasil Disalin'; setTimeout(() => btn.textContent = '▢ Salin Nomor', 1800); }
    catch { document.getElementById('gift-error').textContent = 'Silakan salin nomor rekening secara manual.'; }
  }));
})();
