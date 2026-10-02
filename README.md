# NUSANTARA

> **Bahasa Pemrograman 100% Bahasa Indonesia untuk Komputasi Modern, Terbuka, dan Berkelanjutan.**

[![Status](https://img.shields.io/badge/status-fase_5:_dokumentasi_awal_&_panduan-blue.svg)](ROADMAP.md)
[![Versi](https://img.shields.io/badge/versi-v0.5.0-emerald.svg)](PERUBAHAN.md)
[![Lisensi](https://img.shields.io/badge/lisensi-Apache_2.0-blue.svg)](LISENSI)
[![Tata Bahasa](https://img.shields.io/badge/grammar-EBNF_ISO--14977-purple.svg)](dokumentasi/GRAMMAR-EBNF.md)
[![Dokumentasi](https://img.shields.io/badge/docs-buku_panduan_pemula-teal.svg)](docs/README.md)

---

## 1. Tentang NUSANTARA

**NUSANTARA** adalah bahasa pemrograman serba guna (*general-purpose programming language*) yang dirancang dari nol menggunakan 100% tata bahasa, istilah teknis, dan leksikon Bahasa Indonesia.

NUSANTARA bukan sekadar terjemahan sintaksis bahasa asing, melainkan ikhtiar mandiri dalam rekayasa perangkat lunak untuk menghadirkan kedaulatan teknologi, kejelasan berpikir logis bagi masyarakat Indonesia, serta fondasi komputasi yang dapat berevolusi hingga ke tingkat sistem operasi (**NusantaraOS**).

- **Ekstensi Berkas Resmi:** `.nusantara`
- **Lisensi:** [Apache License 2.0](LISENSI)
- **Status Saat Ini:** **Masih dalam tahap spesifikasi & dokumentasi awal (Phase 5 Selesai - Target v0.5.0).**
- **Pusat Buku Panduan:** [docs/README.md](docs/README.md) & [Indeks Lengkap](docs/indeks.md)
- **Tata Bahasa Formal:** [GRAMMAR-EBNF.md](dokumentasi/GRAMMAR-EBNF.md)
- **Dokumen Konstitusi Resmi:** [KONSTITUSI-BAHASA.md](dokumentasi/KONSTITUSI-BAHASA.md)

---

## 2. Struktur Program Dasar Resmi

Satu berkas `.nusantara` memuat satu unit program utama dengan batas blok deklaratif:

```nusantara
program HaloDunia

mulai
    tampilkan("Halo Dunia!")
selesai
```

*(Catatan: Contoh ini menunjukkan rancangan sintaks resmi bahasa NUSANTARA dan belum dapat dijalankan sebelum alat eksekusi NUSANTARA tersedia pada fase kompilator berikutnya).*

---

## 3. Pusat Dokumentasi Resmi (`docs/`)

Pelajari bahasa NUSANTARA melalui panduan terstruktur:

- 📖 **[Pusat Dokumentasi](docs/README.md):** Pengantar lengkap dan panduan navigasi.
- 🚀 **[Panduan Pemula](docs/panduan/program-pertama.md):**
  - [Persiapan Lingkungan](docs/panduan/persiapan.md)
  - [Menulis Program Pertama](docs/panduan/program-pertama.md)
  - [Struktur Program Dasar](docs/panduan/struktur-program.md)
  - [Variabel dan Tipe Data](docs/panduan/variabel-dan-tipe-data.md)
  - [Operator](docs/panduan/operator.md)
  - [Percabangan](docs/panduan/percabangan.md)
  - [Perulangan](docs/panduan/perulangan.md)
  - [Fungsi](docs/panduan/fungsi.md)
- 📚 **[Referensi Bahasa](docs/referensi/sintaks.md):**
  - [Ringkasan Sintaks](docs/referensi/sintaks.md)
  - [Tabel 32 Kata Kunci](docs/referensi/keyword.md)
  - [Tipe Data](docs/referensi/tipe-data.md)
  - [Prioritas Operator 8 Tingkat](docs/referensi/operator.md)
  - [Tata Bahasa EBNF](docs/referensi/tata-bahasa-ebnf.md)
- 🛠️ **[Panduan Pengembang](docs/pengembang/struktur-proyek.md):**
  - [Struktur Proyek](docs/pengembang/struktur-proyek.md)
  - [Alur Pengembangan](docs/pengembang/alur-pengembangan.md)
  - [Standar Dokumentasi](docs/pengembang/standar-dokumentasi.md)
- 🤝 **[Panduan Kontribusi](docs/kontribusi/mulai-berkontribusi.md):**
  - [Mulai Berkontribusi](docs/kontribusi/mulai-berkontribusi.md)
  - [Alur Proposal NIP](docs/kontribusi/proses-nip.md)
  - [Pedoman Gaya Kode (Style Guide)](docs/kontribusi/pedoman-kode.md)
- 📖 **[Glosarium Istilah](docs/glosarium.md):** Kamus istilah pemrograman Bahasa Indonesia.

---

## 4. Status Proyek Saat Ini

```
[✓] Phase 1: Identitas & Fondasi NUSANTARA (v0.1.0)
[✓] Phase 2: Konstitusi Bahasa NUSANTARA (v0.2.0)
[✓] Phase 3: Lisensi & Tata Kelola NUSANTARA (v0.3.0)
[✓] Phase 4: Spesifikasi Sintaks NUSANTARA (v0.4.0)
[✓] Phase 5: Dokumentasi Awal & Buku Panduan (v0.5.0)  <-- Fase Selesai
[ ] Phase 6: Lexer (Penganalisis Leksikal)
...
[ ] Phase 36: NUSANTARA System & NusantaraOS
```

> Status resmi: **Masih dalam tahap spesifikasi awal (Phase 5 Selesai).** Belum ada berkas biner kompilator yang dibuat pada fase ini. Implementasi mesin kompilasi akan dimulai secara resmi pada **Phase 6 (Lexer)**.

---

## 5. Lisensi

Proyek NUSANTARA dilindungi di bawah [Apache License 2.0](LISENSI). Seluruh rancangan, tata bahasa, dan kode terbuka untuk dimanfaatkan, diteliti, serta dikembangkan bersama oleh masyarakat luas.
