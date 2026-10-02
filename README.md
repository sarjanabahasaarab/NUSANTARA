# NUSANTARA

> **Bahasa Pemrograman 100% Bahasa Indonesia untuk Komputasi Modern, Terbuka, dan Berkelanjutan.**

[![Status](https://img.shields.io/badge/status-fase_4:_spesifikasi_sintaks_ebnf-blue.svg)](ROADMAP.md)
[![Versi](https://img.shields.io/badge/versi-v0.4.0-emerald.svg)](PERUBAHAN.md)
[![Lisensi](https://img.shields.io/badge/lisensi-Apache_2.0-blue.svg)](LISENSI)
[![Tata Bahasa](https://img.shields.io/badge/grammar-EBNF_ISO--14977-purple.svg)](dokumentasi/GRAMMAR-EBNF.md)
[![Presedensi](https://img.shields.io/badge/operator-8_tingkat_resmi-teal.svg)](dokumentasi/PRIORITAS-OPERATOR.md)

---

## 1. Tentang NUSANTARA

**NUSANTARA** adalah bahasa pemrograman serba guna (*general-purpose programming language*) yang dirancang dari nol menggunakan 100% tata bahasa, istilah teknis, dan leksikon Bahasa Indonesia.

NUSANTARA bukan sekadar terjemahan sintaksis bahasa asing, melainkan ikhtiar mandiri dalam rekayasa perangkat lunak untuk menghadirkan kedaulatan teknologi, kejelasan berpikir logis bagi masyarakat Indonesia, serta fondasi komputasi yang dapat berevolusi hingga ke tingkat sistem operasi (**NusantaraOS**).

- **Ekstensi Berkas Resmi:** `.nusantara`
- **Lisensi:** [Apache License 2.0](LISENSI)
- **Status Saat Ini:** **Masih dalam tahap pengembangan awal (Phase 4: Spesifikasi Sintaks EBNF Selesai).**
- **Tata Bahasa Formal:** [GRAMMAR-EBNF.md](dokumentasi/GRAMMAR-EBNF.md)
- **Dokumen Konstitusi Resmi:** [KONSTITUSI-BAHASA.md](dokumentasi/KONSTITUSI-BAHASA.md)
- **Tata Kelola Proyek:** [TATA-KELOLA.md](TATA-KELOLA.md)

---

## 2. Struktur Program Dasar Resmi

Satu berkas `.nusantara` memuat satu unit program utama dengan batas blok deklaratif:

```nusantara
program HaloDunia

mulai
    tampilkan("Halo Dunia!")
selesai
```

---

## 3. Dokumen Spesifikasi Sintaks Formal (Phase 4)

- 📐 **[Tata Bahasa Formal EBNF](dokumentasi/GRAMMAR-EBNF.md):** Aturan produksi formal lengkap ISO/IEC 14977.
- 🔤 **[Spesifikasi Token Leksikal](dokumentasi/TOKEN.md):** 10 kategori token, pemisah baris baru, dan urutan karakter lolos string.
- 🏷️ **[Kaidah Pengidentifikasi](dokumentasi/IDENTIFIER.md):** Standar nama variabel, konstanta, fungsi, dan program.
- 💎 **[Bentuk Literal](dokumentasi/LITERAL.md):** Sintaksis nilai teks, bilangan bulat, desimal, logika, dan kosong.
- ⚡ **[Tata Bahasa Ekspresi](dokumentasi/EKSPRESI.md):** Struktur ekspresi bertingkat bebas ambiguitas parsing.
- 📊 **[Tabel Prioritas Operator](dokumentasi/PRIORITAS-OPERATOR.md):** Pengesahan 8 tingkat presedensi dan asosiasi operator.
- 🧱 **[Aturan Blok & Kontrol Aliran](dokumentasi/ATURAN-BLOK.md):** Batas blok percabangan, perulangan, dan subrutin fungsi.
- 📂 **[Katalog Contoh Sintaks](dokumentasi/CONTOH-SINTAKS.md):** 10 contoh program acuan dengan label status kepatuhan.
- ❓ **[Katalog Keputusan Terbuka](dokumentasi/KEPUTUSAN-TERBUKA.md):** Catatan fitur yang ditangguhkan pembahasannya ke fase berikutnya.
- 🧪 **[Uji Kasus Spesifikasi](pengujian/spesifikasi/kasus-valid.md):** Kumpulan kasus valid, [15 Kasus Negatif](pengujian/spesifikasi/kasus-tidak-valid.md), dan [Daftar Periksa EBNF](pengujian/spesifikasi/grammar-checklist.md).

---

## 4. Status Proyek Saat Ini

```
[✓] Phase 1: Identitas & Fondasi NUSANTARA (v0.1.0)
[✓] Phase 2: Konstitusi Bahasa NUSANTARA (v0.2.0)
[✓] Phase 3: Lisensi & Tata Kelola NUSANTARA (v0.3.0)
[✓] Phase 4: Spesifikasi Sintaks NUSANTARA (v0.4.0)  <-- Fase Selesai
[ ] Phase 5: Dokumentasi Awal & Buku Panduan
...
[ ] Phase 36: NUSANTARA System & NusantaraOS
```

> Status resmi: **Masih dalam tahap spesifikasi awal (Phase 4 Selesai).** Belum ada berkas biner kompilator yang dibuat pada fase ini. Implementasi Lexer akan dimulai secara resmi pada Phase 6.

---

## 5. Lisensi

Proyek NUSANTARA dilindungi di bawah [Apache License 2.0](LISENSI). Seluruh rancangan, tata bahasa, dan kode terbuka untuk dimanfaatkan, diteliti, serta dikembangkan bersama oleh masyarakat luas.
