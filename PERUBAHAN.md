# Catatan Perubahan (CHANGELOG) NUSANTARA

Seluruh perubahan penting pada proyek bahasa pemrograman NUSANTARA dicatat dalam dokumen ini.

Format penomoran versi mengacu pada **Semantic Versioning** (`vMAJOR.MINOR.PATCH`). Pada masa pengembangan awal, versi minor mencerminkan tahapan fase roadmap (misal `v0.1.0` untuk Phase 1, `v0.2.0` untuk Phase 2, `v0.3.0` untuk Phase 3, `v0.4.0` untuk Phase 4, `v0.5.0` untuk Phase 5, `v0.6.0` untuk Phase 6, `v0.7.0` untuk Phase 7, `v0.8.0` untuk Phase 8, `v0.9.0` untuk Phase 9).

---

## [v0.9.0] — 2026-10-02
### Phase 9: Variabel & Sistem Tipe Data NUSANTARA

Fase ini memperkuat sistem variabel dan tipe data NUSANTARA, menghadirkan modul **Pemeriksa Tipe (Type Checker & Semantic Analyzer)** statis sebelum eksekusi, serta menegakkan validasi tipe yang ketat dan aman (*type-safe*).

#### Ditambahkan:
- **Modul Sistem Tipe & Type Checker (`src/tipe/`):**
  - `src/tipe/jenisTipe.ts`: Taksonomi nama tipe resmi (`NamaTipe`) mencakup `teks`, `bilangan`, `desimal`, `logika`, `karakter`, `kosong`, `fungsi`, serta persiapan tipe majemuk `daftar`, `peta`, `tanggal`, dan `waktu`.
  - `src/tipe/kompatibilitas.ts`: Aturan kesetaraan (*type equality*), kompatibilitas penugasan (*type compatibility*), dan pemetaan tipe operasi biner.
  - `src/tipe/galatTipe.ts`: Sistem pelaporan kesalahan tipe terstruktur (`GalatTipe`) dengan koordinat kode sumber dan perbandingan tipe diharapkan vs aktual.
  - `src/tipe/pemeriksaTipe.ts`: Mesin pemeriksa tipe statis yang memvalidasi AST sebelum eksekusi, mendeteksi deklarasi ganda, pelanggaran konstanta tetap, ketidakcocokan tipe inisialisasi/penugasan, tipe parameter fungsi, serta tipe kembalian fungsi.
  - `src/tipe/index.ts`: Ekspor terpadu modul sistem tipe.
- **Dokumentasi Pengembang Sistem Tipe:**
  - `docs/pengembang/type-system.md`: Panduan teknis arsitektur sistem tipe, matriks tipe, dan aturan kompatibilitas.
- **Rangkaian Pengujian Sistem Tipe (`pengujian/tipe/`):**
  - `pengujian/tipe/uji_tipe.ts`: 12 pengujian mencakup tipe primitif valid, penolakan ketidakcocokan tipe, validasi penugasan, proteksi tetap, deklarasi ganda, lingkup/shadowing, validasi parameter & kembalian fungsi, serta aturan tipe operator.
  - `pengujian/tipe/README.md`: Panduan eksekusi pengujian sistem tipe.
- **Skrip Perintah:**
  - Menambahkan skrip `"test:tipe"` dan menyatukannya ke dalam `"npm test"`.

#### Diubah:
- `src/interpreter/environment.ts`: Menyimpan informasi tipe data pada setiap simbol dan memvalidasi kompatibilitas tipe saat penugasan nilai baru.
- `src/interpreter/interpreter.ts`: Mengintegrasikan pemeriksaan tipe statis sebelum eksekusi program serta validasi tipe kembalian fungsi saat runtime.
- `docs/referensi/tipe-data.md`: Diperbarui dengan tabel matriks tipe data aktual dan aturan kompatibilitas.

---

## [v0.8.0] — 2026-10-02
### Phase 8: Implementasi Interpreter NUSANTARA
- Modul Interpreter inti (`src/interpreter/`) yang mampu mengeksekusi pohon AST secara nyata.
- 15 pengujian Interpreter lulus 100%.

---

## [v0.7.0] — 2026-10-02
### Phase 7: Implementasi Parser NUSANTARA
- Modul Parser dan AST inti (`src/parser/`) dengan recursive descent dan precedence climbing 8 tingkat.
- 11 pengujian Parser lulus 100%.

---

## [v0.6.0] — 2026-10-02
### Phase 6: Implementasi Lexer NUSANTARA
- Modul Lexer inti (`src/lexer/`) dengan pemindaian UTF-8, pelacakan baris/kolom, literal, dan TokenStream.
- 21 pengujian Lexer lulus 100%.

---

## [v0.5.0] — 2026-10-02
### Phase 5: Dokumentasi Awal NUSANTARA
- Pusat dokumentasi terstruktur `docs/` dengan 28 panduan baru.

---

## [v0.4.0] — 2026-10-02
### Phase 4: Spesifikasi Sintaks NUSANTARA
- Menetapkan tata bahasa formal EBNF lengkap (ISO/IEC 14977).

---

## [v0.3.0] — 2026-10-02
### Phase 3: Lisensi & Tata Kelola NUSANTARA
- Menetapkan Apache License 2.0 lengkap pada `LISENSI`.

---

## [v0.2.0] — 2026-10-02
### Phase 2: Konstitusi Bahasa NUSANTARA
- Menetapkan Piagam 10 Prinsip Konstitusi Bahasa dan tabel 32 kata kunci.

---

## [v0.1.0] — 2026-10-02
### Phase 1: Identitas & Fondasi NUSANTARA
- Rilis fondasi awal, penetapan nama NUSANTARA, ekstensi `.nusantara`, dan NIP-0001.
