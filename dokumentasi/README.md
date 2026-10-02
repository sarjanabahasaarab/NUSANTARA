# Dokumentasi Resmi Bahasa Pemrograman NUSANTARA

Selamat datang di pusat dokumentasi resmi **NUSANTARA**. Folder ini memuat seluruh spesifikasi teknis, filosofi arsitektur, panduan kontribusi, dan arsip usulan perbaikan bahasa (*NIP*).

---

## Indeks Dokumen

1. **[Prinsip Desain & Filosofi Bahasa](prinsip-desain.md)**
   - Fondasi filosofis: Bahasa Indonesia sebagai bahasa utama komputasi.
   - Prinsip keterbacaan, keamanan, prediktabilitas, dan skalabilitas.
   - Kebijakan istilah teknis dan pesan kesalahan.

2. **[Arsitektur Kompilator](arsitektur-kompilator.md)**
   - Alur kompilasi: Dari berkas `.nusantara` menuju biner eksekusi mesin.
   - Rancangan bertahap: Lexer, Parser, AST, Analisis Semantik, IR, Optimizer, Backend.
   - Visi format mandiri (`.gambar`, `.video`, `.suara`, dsb.) pada Phase 30.

3. **[Panduan Mengunggah Phase 1 ke GitHub](panduan-github.md)**
   - Langkah praktis inisialisasi Git, penambahan berkas, pembuatan komit `feat: fondasi awal bahasa NUSANTARA`.
   - Penandaan tag rilis `v0.1.0`.
   - Tata cara pembuatan rilis resmi di antarmuka GitHub Release.

4. **[Nusantara Improvement Proposals (NIP)](nip/)**
   - **[NIP-0001: Identitas dan Prinsip Dasar Bahasa NUSANTARA](nip/NIP-0001.md)** (Dokumen acuan fondasi).

---

## Status Pengembangan (Phase 1)

Dokumentasi pada fase ini difokuskan untuk meletakkan **pondasi konseptual yang kokoh**. Belum ada instruksi instalasi biner compiler, karena implementasi biner compiler baru akan dikerjakan pada **Phase 6** (Lexer) dan fase-fase berikutnya sesuai dengan [Peta Jalan (ROADMAP.md)](../ROADMAP.md).
