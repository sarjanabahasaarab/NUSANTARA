# Dokumentasi Resmi Bahasa Pemrograman NUSANTARA

Selamat datang di pusat dokumentasi resmi **NUSANTARA**. Folder ini memuat seluruh konstitusi, spesifikasi teknis, pedoman leksikal, tata kelola versi, filosofi arsitektur, dan arsip usulan perbaikan bahasa (*NIP*).

---

## Indeks Dokumen Konstitusi & Fondasi

### Dokumen Konstitusi Resmi (Phase 2):
1. **[Konstitusi Bahasa NUSANTARA](KONSTITUSI-BAHASA.md)**
   - 10 Prinsip Konstitusi Bahasa.
   - Ketetapan struktur program resmi awal (`program`, `mulai`, `selesai`).
2. **[Tabel Kata Kunci Resmi (Keywords)](KEYWORD.md)**
   - 32 kata kunci resmi (21 ditetapkan, 11 rancangan).
   - Arti leksikal, fungsi komputasi, contoh sintaksis, dan fase implementasi.
3. **[Spesifikasi Tipe Data](TIPE-DATA.md)**
   - Taksonomi tipe data dasar: `teks`, `bilangan`, `desimal`, `logika`, `karakter`, `daftar`, `peta`, `tanggal`, `waktu`, `kosong`.
   - Pembedaan wadah dinamis `variabel` vs konstanta mutlak `tetap`.
4. **[Klasifikasi & Prioritas Operator](OPERATOR.md)**
   - Operator aritmetika, perbandingan (relasional), logika berbahasa Indonesia (`dan`, `atau`, `tidak`), dan penugasan (`=`).
   - Rancangan tabel presedensi 9 tingkat.
5. **[Aturan Penamaan & Komentar](ATURAN-PENAMAAN.md)**
   - Kaidah leksikal pengidentifikasi (karakter awal, larangan kata kunci, case-sensitivity).
   - Sintaksis komentar satu baris (`//`) dan multibaris (`/* ... */`).
6. **[Standar Pesan Kesalahan](PESAN-KESALAHAN.md)**
   - Standar format pesan diagnostik galat sintaksis, tipe data, dan pengidentifikasi berbahasa Indonesia.
7. **[Kebijakan Kompatibilitas Versi](KOMPATIBILITAS.md)**
   - Komitmen stabilitas kode, skema penomoran versi SemVer, dan kewajiban proposal NIP untuk perubahan merusak.

### Dokumen Arsitektur & Pedoman (Phase 1):
8. **[Prinsip Desain & Filosofi Bahasa](prinsip-desain.md)**
   - 12 Prinsip Desain: Kedaulatan komputasi, sintaksis manusiawi, dan skalabilitas hingga NusantaraOS.
9. **[Arsitektur Kompilator](arsitektur-kompilator.md)**
   - Alur saluran pipa 7 tahap: Lexer -> Parser -> AST -> Semantik -> IR -> Optimizer -> Backend.
   - Visi format berkas mandiri (`.gambar`, `.video`, `.suara`, dsb.) pada Phase 30.
10. **[Panduan Mengunggah ke GitHub](panduan-github.md)**
   - Prosedur inisialisasi Git, penandaan rilis, dan penerbitan GitHub Release.

### Nusantara Improvement Proposals (NIP):
11. **[NIP-0001: Identitas dan Prinsip Dasar Bahasa NUSANTARA](nip/NIP-0001.md)**
12. **[NIP-0002: Konstitusi Bahasa NUSANTARA](nip/NIP-0002.md)**

---

## Status Pengembangan (Phase 2 Selesai)

Dokumentasi pada fase ini menetapkan **hukum konstitusional resmi bahasa**. Implementasi biner kompilator baru akan dimulai pada **Phase 6** (Lexer) dan fase-fase berikutnya sesuai dengan [Peta Jalan (ROADMAP.md)](../ROADMAP.md).
