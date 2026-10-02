# Catatan Perubahan (CHANGELOG) NUSANTARA

Seluruh perubahan penting pada proyek bahasa pemrograman NUSANTARA dicatat dalam dokumen ini.

Format penomoran versi mengacu pada **Semantic Versioning** (`vMAJOR.MINOR.PATCH`). Pada masa pengembangan awal, versi minor mencerminkan tahapan fase roadmap (misal `v0.1.0` untuk Phase 1, `v0.2.0` untuk Phase 2, `v0.3.0` untuk Phase 3, `v0.4.0` untuk Phase 4, `v0.5.0` untuk Phase 5, `v0.6.0` untuk Phase 6, `v0.7.0` untuk Phase 7), sedangkan patch (`v0.7.1`) digunakan untuk penyempurnaan dokumen atau perbaikan kecil.

---

## [v0.7.0] — 2026-10-02
### Phase 7: Implementasi Parser NUSANTARA

Fase ini menghadirkan modul lapis kedua dari saluran pipa kompilasi: **Parser (Penganalisis Sintaksis)** dan struktur data **Pohon Sintaksis Abstrak (*Abstract Syntax Tree / AST*)**. Parser mengonsumsi token dari Lexer Phase 6 dan memvalidasi tata bahasa EBNF resmi tanpa menyertakan interpreter/compiler prematur.

#### Ditambahkan:
- **Modul Parser & AST Inti (`src/parser/`):**
  - `src/parser/ast.ts`: Definisi taksonomi simpul AST (`NodeProgram`, `PernyataanAST`, `EkspresiAST`, `Literal`, `Pengidentifikasi`, `EkspresiUnari`, `EkspresiBiner`, `PercabanganJika`, `PerulanganUntuk`, `PerulanganSelama`, `DeklarasiFungsi`, dsb.).
  - `src/parser/galat.ts`: Sistem pelaporan galat sintaksis diagnostik berbahasa Indonesia (`GalatParser`).
  - `src/parser/astPrinter.ts`: Utilitas pencetak pohon AST berformat teks hierarkis untuk inspeksi pengembang.
  - `src/parser/parser.ts`: Mesin penganalisis sintaksis berbasis recursive descent dan precedence climbing (8 tingkat presedensi operator formal) dengan kemampuan sinkronisasi pemulihan galat (*error recovery*).
  - `src/parser/index.ts`: Ekspor terpadu modul Parser dan AST.
  - `src/parser/README.md`: Dokumentasi komponen dan alur Parser.
- **Dokumentasi Pengembang Parser:**
  - `docs/pengembang/parser.md`: Buku panduan arsitektur sintaksis, pohon AST, urutan presedensi, dan alur penambahan grammar baru.
- **Rangkaian Pengujian Parser (`pengujian/parser/`):**
  - `pengujian/parser/uji_parser.ts`: 11 kelompok pengujian mencakup program dasar, presedensi operator, deklarasi variabel/tetap, percabangan jika, perulangan untuk/selama, fungsi, AST printer, dan penanganan galat sintaksis.
  - `pengujian/parser/README.md`: Panduan eksekusi pengujian Parser.
- **Skrip Perintah:**
  - Menambahkan `"test:parser"` pada `package.json` dan menyatukannya dalam `"npm test"`.

---

## [v0.6.0] — 2026-10-02
### Phase 6: Implementasi Lexer NUSANTARA
- Modul Lexer inti (`src/lexer/`) dengan pemindaian UTF-8, pelacakan baris/kolom, literal, operator longest-match, dan TokenStream.
- 21 kelompok pengujian Lexer lulus 100%.

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
