# Undangan Digital, Raisa & Arjuna

Template website undangan pernikahan berbasis **Next.js 14 + React + Tailwind CSS**, dengan desain editorial warna ivory, sage, hijau zaitun dan foto pengantin bergaya realistis. Desain dibuat ulang dari proyek awal, dengan arah visual yang terinspirasi undangan pernikahan klasik modern, bukan salinan template lain.

## Lihat hasilnya dengan cepat

Tanpa memasang Node.js, buka `preview/index.html` di browser. Isi nama tamu melalui parameter `?to=` apabila memakai local web server, misalnya:

```
http://localhost:8080/preview/?to=Bapak%20Budi%20Santoso
```

Agar fungsi localStorage dan clipboard pada preview berjalan konsisten, gunakan server lokal. Jalankan dari folder `undangan-digital`:

```bash
python -m http.server 8080
```

Versi **preview** adalah versi HTML, CSS, dan JavaScript mandiri untuk pratinjau cepat. Kode aplikasi utama yang diedit untuk deploy Next.js tetap berada di `app`, `components`, dan `lib`. Versi preview tidak otomatis ikut berubah ketika komponen Next.js diedit.

## Menjalankan aplikasi Next.js

Gunakan Node.js 18.17+ dan jalankan:

```bash
npm install
npm run dev
```

Buka `http://localhost:3000/?to=Nama%20Tamu`. Untuk build produksi:

```bash
npm run build
npm run start
```

Bisa dideploy ke platform yang mendukung Next.js seperti Vercel. Untuk deploy pada subpath, isi `NEXT_PUBLIC_BASE_PATH` dengan path awal tanpa garis miring akhir, misalnya `/undangan`.

## Mengganti data dan foto

- **Nama pengantin, orang tua, tanggal, alamat, tautan Maps, rekening:** ubah `lib/data.ts`.
- **Cover, foto mempelai, galeri delapan foto, penutup:** ganti file `.webp` di `public/images/` atau sesuaikan path pada `lib/data.ts`.
- **Desain, warna, animasi, responsif:** edit `app/globals.css`, lalu komponen terkait di `components/`.
- **Judul dan deskripsi website:** edit `app/layout.tsx`.
- **Kalender:** perbarui tanggal dan jam `DTSTART`/`DTEND` dalam `lib/ics.ts` saat tanggal pernikahan diganti.
- **Foto di versi preview:** preview memakai gambar yang sama dari `public/images/`.

**Penting:** semua foto bawaan adalah *foto contoh fotorealistis yang dibuat dengan AI*, bukan foto pasangan sungguhan. Ganti dengan foto asli pengantin untuk undangan resmi. Tidak ada ilustrasi karakter yang digunakan di halaman atau galeri. Galeri sengaja hanya menampilkan foto, tanpa judul atau caption.

## Fitur

- Cover foto dengan nama tamu dinamis dan tombol **Buka Undangan**.
- Tampilan mobile dan desktop, navigasi mengambang, animasi lembut.
- Foto dua mempelai dan delapan foto galeri dengan lightbox, tombol geser dan keyboard.
- Countdown menuju akad nikah, info akad dan resepsi, buka Google Maps, simpan kalender `.ics`.
- Kartu nama tamu yang dipersonalisasi lewat `?to=`.
- Form kehadiran dan ucapan, daftar ucapan, jumlah tamu, tombol salin rekening.

## Catatan RSVP

**RSVP adalah mode demo.** Konfirmasi dan ucapan disimpan ke `localStorage` di browser perangkat masing-masing, seperti pada source awal. Data belum terkirim ke pemilik undangan dan **belum tersinkron antar tamu/perangkat**. Untuk penggunaan nyata, hubungkan form `components/Rsvp.tsx` ke API/database seperti Supabase, Firebase, atau endpoint milik sendiri. Pada preview mandiri, ubah `preview/main.js` juga apabila ingin memakai backend yang sama.

Informasi tanggal, alamat, dan nomor rekening pada template merupakan **data contoh**. Pastikan semuanya sudah disesuaikan sebelum membagikan tautan kepada tamu.
