/**
 * Contoh data untuk template undangan. Ganti semuanya sebelum dipublikasikan.
 * Foto bawaan adalah foto contoh bergaya realistis, bukan foto pasangan sebenarnya.
 */
export const invite = {
  bride: 'Raisa',
  groom: 'Arjuna',
  target: '2026-12-12T09:00:00+07:00',
  dateLabel: 'Sabtu, 12 Desember 2026',
  dateShort: '12 . 12 . 2026',
  day: '12',
  month: 'Desember',
  year: '2026',
  city: 'Yogyakarta',
  venue: 'Pendopo Taman Sari Kencana',
  address: 'Jl. Kaliurang Km 12, Sleman, Yogyakarta',
  akad: '09.00 WIB sampai selesai',
  resepsi: '11.00 sampai 14.00 WIB',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Pendopo+Taman+Sari+Kencana+Sleman',
  coverPhoto: '/images/cover.webp',
  closingPhoto: '/images/closing.webp',
  gifts: [
    { id: 'bca', label: 'Bank BCA', number: '1234567890', holder: 'Raisa Maharani' },
    { id: 'dana', label: 'DANA / GoPay', number: '081200001234', holder: 'Arjuna Pratama' },
  ],
};

export const couple = [
  {
    id: 'bride',
    name: 'Raisa',
    full: 'Raisa Maharani, S.Ds.',
    parents: 'Putri kedua dari Bapak Haryanto dan Ibu Sulastri',
    photo: '/images/bride.webp',
  },
  {
    id: 'groom',
    name: 'Arjuna',
    full: 'Arjuna Pratama, S.T.',
    parents: 'Putra pertama dari Bapak Wibowo dan Ibu Retno',
    photo: '/images/groom.webp',
  },
];

export const gallery = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  photo: `/images/gallery/${i + 1}.webp`,
  alt: `Momen foto pernikahan ${i + 1}`,
}));
