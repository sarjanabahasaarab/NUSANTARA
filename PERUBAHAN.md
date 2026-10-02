# Catatan Perubahan (CHANGELOG) NUSANTARA

Seluruh perubahan penting pada proyek bahasa pemrograman NUSANTARA dicatat dalam dokumen ini.

Format penomoran versi mengacu pada **Semantic Versioning** (`vMAJOR.MINOR.PATCH`). Pada masa pengembangan awal, versi minor mencerminkan tahapan fase roadmap (misal `v0.1.0` untuk Phase 1, `v0.2.0` untuk Phase 2, `v0.3.0` untuk Phase 3, `v0.4.0` untuk Phase 4, `v0.5.0` untuk Phase 5, `v0.6.0` untuk Phase 6, `v0.7.0` untuk Phase 7, `v0.8.0` untuk Phase 8).

---

## [v0.8.0] — 2026-10-02
### Phase 8: Implementasi Interpreter NUSANTARA

Fase ini menghadirkan modul lapis ketiga dari saluran pipa kompilasi: **Interpreter (Penerjemah Eksekusi AST)**. Untuk pertama kalinya, program berformat `.nusantara` dapat benar-benar dieksekusi secara nyata dalam memori dan menghasilkan luaran program.

#### Ditambahkan:
- **Modul Runtime & Interpreter Inti (`src/interpreter/`):**
  - `src/interpreter/nilai.ts`: Sistem representasi nilai runtime (`Teks`, `Bilangan`, `Desimal`, `Logika`, `Kosong`, `FungsiPengguna`, `FungsiBawaan`).
  - `src/interpreter/environment.ts`: Manajemen rantai lingkup leksikal (*lexical scope*), tabel simbol, dan proteksi kekekalan konstanta `tetap` (*immutable*).
  - `src/interpreter/sinyal.ts`: Penanganan kontrol alur internal untuk `kembalikan` (*return*), `hentikan` (*break*), dan `lanjutkan` (*continue*).
  - `src/interpreter/outputWriter.ts`: Abstraksi keluaran luaran (`PenulisOutputBuffer` dan `PenulisOutputKonsol`) untuk memfasilitasi pengujian otomatis dan antarmuka interaktif.
  - `src/interpreter/galat.ts`: Sistem kesalahan runtime (`GalatRuntime`) dilengkapi informasi jenis, koordinat kode sumber, dan pelacak jejak tumpukan (*stack trace*).
  - `src/interpreter/interpreter.ts`: Mesin eksekusi pohon AST mencakup evaluasi operator aritmatika, perbandingan, logika hubung singkat (*short-circuit*), penugasan, percabangan `jika-maka-selain`, perulangan `untuk` dan `selama`, pemanggilan fungsi modular, fungsi rekursif mandiri, serta fungsi bawaan `tampilkan(...)`.
  - `src/interpreter/index.ts`: Ekspor terpadu modul interpreter.
- **Dokumentasi Pengembang Interpreter:**
  - `docs/pengembang/interpreter.md`: Panduan teknis arsitektur penerjemah AST, evaluasi ekspresi, lingkup variabel, dan fungsi bawaan.
- **Rangkaian Pengujian Interpreter (`pengujian/interpreter/`):**
  - `pengujian/interpreter/uji_interpreter.ts`: 15 uji unit & integrasi untuk Halo Dunia, evaluasi literal, presedensi aritmatika, short-circuit logic, proteksi nilai tetap, percabangan, loop, fungsi, rekursi faktorial, dan runtime error.
  - `pengujian/interpreter/README.md`: Panduan eksekusi pengujian Interpreter.
- **Skrip Perintah:**
  - Menambahkan skrip `"test:interpreter"` dan menyatukannya ke dalam `"npm test"`.

---

## [v0.7.0] — 2026-10-02
### Phase 7: Implementasi Parser NUSANTARA
- Modul Parser dan AST inti (`src/parser/`) dengan recursive descent dan precedence climbing 8 tingkat.
- 11 kelompok pengujian Parser lulus 100%.

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

---

## [v0.3.0] — 2026-10-02
### Phase 3: Lisensi & Tata Kelola NUSANTARA
- Menetapkan Apache License 2.0 lengkap pada `LISENSI`.
- Menetapkan tata kelola meritokrasi 5 peran di `TATA-KELOLA.md`.

---

## [v0.2.0] — 2026-10-02
### Phase 2: Konstitusi Bahasa NUSANTARA
- Menetapkan Piagam 10 Prinsip Konstitusi Bahasa dan tabel 32 kata kunci.

---

## [v0.1.0] — 2026-10-02
### Phase 1: Identitas & Fondasi NUSANTARA
- Rilis fondasi awal, penetapan nama NUSANTARA, ekstensi `.nusantara`, dan NIP-0001.
