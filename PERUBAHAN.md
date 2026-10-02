# Catatan Perubahan (CHANGELOG) NUSANTARA

Seluruh perubahan penting pada proyek bahasa pemrograman NUSANTARA dicatat dalam dokumen ini.

Format penomoran versi mengacu pada **Semantic Versioning** (`vMAJOR.MINOR.PATCH`). Pada masa pengembangan awal, versi minor mencerminkan tahapan fase roadmap (misal `v0.1.0` untuk Phase 1, `v0.2.0` untuk Phase 2, `v0.3.0` untuk Phase 3, `v0.4.0` untuk Phase 4, `v0.5.0` untuk Phase 5, `v0.6.0` untuk Phase 6), sedangkan patch (`v0.6.1`) digunakan untuk penyempurnaan dokumen atau perbaikan kecil.

---

## [v0.6.0] — 2026-10-02
### Phase 6: Implementasi Lexer NUSANTARA

Fase ini menghadirkan modul inti pertama dari pipa kompilasi: **Lexer (Penganalisis Leksikal)** yang membaca kode sumber teks UTF-8 `.nusantara` dan mengubahnya menjadi rangkaian token terstruktur tanpa ketergantungan parser prematur.

#### Ditambahkan:
- **Modul Lexer Inti (`src/lexer/`):**
  - `src/lexer/posisi.ts`: Antarmuka pelacak koordinat karakter (`baris`, `kolom`, `indeks`) dan pemformat posisi diagnostik.
  - `src/lexer/jenisToken.ts`: Enumerasi 32 kata kunci, identifier, literal (bilangan, desimal, teks, karakter), operator aritmatika, operator logika, pemisah, serta token khusus `EOF` dan `ILEGAL`.
  - `src/lexer/keyword.ts`: Tabel pencarian kata kunci resmi dan operator leksikal Bahasa Indonesia (`dan`, `atau`, `tidak`).
  - `src/lexer/galat.ts`: Sistem pelaporan kesalahan leksikal diagnostik berbahasa Indonesia (`GalatLexer`).
  - `src/lexer/lexer.ts`: Mesin pemindai karakter dengan dukungan operator multi-karakter (*longest match*), penanganan komentar `//`, dan pelacakan whitespace.
  - `src/lexer/tokenStream.ts`: Abstraksi pembungkus aliran token (`current`, `next`, `peek`, `is`, `eof`) yang disiapkan untuk konsumsi Parser pada Phase 7.
  - `src/lexer/index.ts`: Ekspor terpadu modul lexer.
- **Arsitektur Placeholder Parser:**
  - `src/parser/README.md`: Penegasan batas implementasi bahwa Parser akan dibangun pada Phase 7.
- **Dokumentasi Pengembang Lexer:**
  - `docs/pengembang/lexer.md`: Panduan arsitektur leksikal, alur kerja, API, dan petunjuk penambahan token.
- **Rangkaian Pengujian Komprehensif (`pengujian/lexer/`):**
  - `pengujian/lexer/uji_lexer.ts`: 21 kelompok pengujian mencakup 32 kata kunci, literal, operator longest match, komentar, posisi akurat, pelaporan galat, dan TokenStream.
  - `pengujian/lexer/README.md`: Panduan eksekusi pengujian.
- **Skrip Perintah:**
  - Menambahkan `"test:lexer"` dan `"test"` pada `package.json`.

---

## [v0.5.0] — 2026-10-02
### Phase 5: Dokumentasi Awal NUSANTARA
- Pusat dokumentasi terstruktur `docs/` dengan 28 panduan baru.
- Panduan pemula bertahap, referensi leksikal, alur NIP, dan glosarium 26 istilah komputasi Indonesia.

---

## [v0.4.0] — 2026-10-02
### Phase 4: Spesifikasi Sintaks NUSANTARA
- Menetapkan tata bahasa formal EBNF lengkap (ISO/IEC 14977).
- Menetapkan spesifikasi token leksikal dan aturan pengidentifikasi ASCII.
- Mengesahkan tabel presedensi 8 tingkat operator dan arah asosiasi.
- Menyediakan katalog 15 kasus uji negatif.

---

## [v0.3.0] — 2026-10-02
### Phase 3: Lisensi & Tata Kelola NUSANTARA
- Menetapkan Apache License 2.0 lengkap pada `LISENSI`.
- Menetapkan tata kelola meritokrasi 5 peran di `TATA-KELOLA.md`.
- Menetapkan alur NIP 7 tahap di `PROSES-NIP.md` dan `TEMPLATE-NIP.md`.

---

## [v0.2.0] — 2026-10-02
### Phase 2: Konstitusi Bahasa NUSANTARA
- Menetapkan Piagam 10 Prinsip Konstitusi Bahasa.
- Menetapkan tabel 32 kata kunci resmi.
- Menerbitkan proposal NIP-0002.

---

## [v0.1.0] — 2026-10-02
### Phase 1: Identitas & Fondasi NUSANTARA
- Rilis fondasi awal, penetapan nama NUSANTARA, ekstensi `.nusantara`, dan NIP-0001.
