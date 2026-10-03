# Catatan Perubahan (CHANGELOG) NUSANTARA

Seluruh perubahan penting pada proyek bahasa pemrograman NUSANTARA dicatat dalam dokumen ini.

Format penomoran versi mengacu pada **Semantic Versioning** (`vMAJOR.MINOR.PATCH`). Pada masa pengembangan awal, versi minor mencerminkan tahapan fase roadmap (misal `v0.1.0` untuk Phase 1, `v0.2.0` untuk Phase 2, `v0.3.0` untuk Phase 3, `v0.4.0` untuk Phase 4, `v0.5.0` untuk Phase 5, `v0.6.0` untuk Phase 6, `v0.7.0` untuk Phase 7, `v0.8.0` untuk Phase 8, `v0.9.0` untuk Phase 9, `v0.10.0` untuk Phase 10).

## [v0.12.0] — 2026-10-03
### Phase 12: Sistem Perulangan NUSANTARA

Fase ini meresmikan arsitektur sistem perulangan (*loops*) dan kendali aliran iterasi (`selama`, `untuk`, `dari`, `sampai`, `lakukan`, `hentikan`, `lanjutkan`, `akhir`) yang terintegrasi penuh di seluruh saluran pipa bahasa NUSANTARA.

#### Ditambahkan:
- **Konstruksi Perulangan Resmi:**
  - `selama kondisi lakukan ... akhir` untuk perulangan bersyarat (*conditional while loop*).
  - `untuk var dari awal sampai akhir lakukan ... akhir` untuk perulangan rentang berpenghitung (*counted range loop*) dengan batas akhir inklusif.
  - Perilaku rentang kosong (*empty range* saat `awal > akhir`) yang dilewati 0 kali secara aman tanpa galat.
- **Kendali Aliran Iterasi:**
  - `hentikan` (*break*): Menghentikan paksa perulangan terdekat dan melompat ke baris setelah kata kunci `akhir`.
  - `lanjutkan` (*continue*): Melompati sisa instruksi iterasi saat ini dan langsung menuju putaran berikutnya (tetap mengeksekusi increment variabel penghitung pada `untuk`).
  - Penolakan instruksi `hentikan` dan `lanjutkan` di luar blok perulangan secara statis di Type System dan runtime Interpreter (`KENDALI_DI_LUAR_KONTEKS`).
- **Dukungan Perulangan Bertingkat & Integrasi Percabangan:**
  - Iterasi multi-dimensi (baris dan kolom) dengan state loop terisolasi.
  - Penempatan percabangan `jika` di dalam perulangan dan perulangan di dalam cabang `jika` dengan batas `akhir` berpasangan presisi.
- **Perlindungan Loop Tak Terbatas (*Infinite Loop Protection*):**
  - Parameter konfigurasi `maksimalIterasiPerulangan` pada Interpreter.
  - Runtime melempar `JenisGalatRuntime.BATAS_ITERASI_TERLAMPAUI` saat perulangan melebihi ambang batas keamanan yang ditentukan.
- **Dokumentasi Sistem Perulangan:**
  - `docs/referensi/perulangan.md`: Referensi sintaksis lengkap, aturan inklusivitas, rentang kosong, kendali aliran, dan contoh program.
  - `docs/pengembang/perulangan.md`: Dokumentasi teknis saluran pipa, recursive descent parser, node AST, sistem tipe, dan sinyal runtime.
- **Rangkaian Pengujian Sistem Perulangan (`pengujian/perulangan/`):**
  - `pengujian/perulangan/uji_perulangan.ts`: 25 skenario pengujian unit, integrasi, AST, type checking, dan runtime infinite loop protection (100% Lulus).
  - `pengujian/perulangan/README.md`: Panduan eksekusi pengujian perulangan.

#### Diubah:
- `src/interpreter/galat.ts`: Menambahkan enum `JenisGalatRuntime.BATAS_ITERASI_TERLAMPAUI`.
- `src/interpreter/interpreter.ts`: Menambahkan opsi `maksimalIterasiPerulangan` dan penanganan rentang kosong pada `for`.
- `src/tipe/galatTipe.ts`: Menambahkan enum `JenisGalatTipe.KENDALI_DI_LUAR_KONTEKS`.
- `src/tipe/pemeriksaTipe.ts`: Menambahkan pelacakan `kedalamanPerulangan` untuk validasi `hentikan`/`lanjutkan`, serta validasi kondisi dan batas rentang.
- `src/parser/parser.ts`: Memperkuat validasi sintaksis kondisi/rentang kosong, pencegahan kata kunci nyasar (`lakukan`, `dari`, `sampai`), dan blok tidak ditutup.
- `package.json`: Menambahkan skrip `"test:perulangan"` ke dalam perintah pengujian utama `"npm test"`.
- `skrip/periksa_fondasi.js`: Menambahkan audit 4 berkas baru Phase 12 (total 145 berkas utuh).

---

## [v0.11.0] — 2026-10-03
### Phase 11: Percabangan Kondisional NUSANTARA

Fase ini menghadirkan kemampuan pengambilan keputusan (*conditional branching*) melalui pasangan leksikal resmi bahasa Indonesia `jika` ... `maka` ... `selain` ... `akhir` yang terintegrasi penuh di seluruh saluran pipa kompilasi dan interpretasi.

#### Ditambahkan:
- **Konstruksi Percabangan Resmi:**
  - `jika kondisi maka ... akhir` untuk percabangan satu arah.
  - `jika kondisi maka ... selain ... akhir` untuk percabangan dua arah.
  - Dukungan percabangan bertingkat (*nested branching*) di dalam blok `maka` maupun `selain` dengan pembatas penutup `akhir` yang berpasangan deterministik.
- **Validasi Ketat Sistem Tipe (Type System):**
  - Kondisi percabangan wajib menghasilkan tipe data `logika` (`benar` / `salah`).
  - Penolakan tipe `bilangan`, `teks`, dan `desimal` dengan pesan kesalahan tipe bahasa Indonesia presisi.
  - Deteksi dan pencegahan penggunaan variabel yang belum dideklarasikan pada ekspresi kondisi percabangan (`VARIABEL_BELUM_DIDEKLARASIKAN`).
- **Isolasi Lingkup & Mutasi Terkendali (Scoping):**
  - Deklarasi variabel baru di dalam blok percabangan terisolasi secara leksikal (*block scope*).
  - Penugasan ulang ke variabel luar berhasil memutasi nilai variabel lingkungan induk.
- **Diagnostik Sintaksis Parser Ramah Pengembang:**
  - Penolakan kondisi kosong sebelum kata kunci `maka`.
  - Penolakan blok percabangan yang tidak ditutup dengan `akhir` sebelum akhir dokumen atau penutup program `selesai`.
  - Penolakan kemunculan kata kunci `selain` atau `akhir` di luar konteks percabangan.
- **Dokumentasi Percabangan:**
  - `docs/referensi/percabangan.md`: Panduan referensi sintaks, tabel aturan tipe, contoh bersarang, dan katalog kesalahan umum.
  - `docs/pengembang/percabangan.md`: Dokumentasi teknis arsitektur saluran pipa, recursive descent parser, node AST, sistem tipe, dan interpreter.
- **Rangkaian Pengujian Percabangan (`pengujian/percabangan/`):**
  - `pengujian/percabangan/uji_percabangan.ts`: 24 skenario pengujian komprehensif (100% Lulus).
  - `pengujian/percabangan/README.md`: Panduan eksekusi pengujian percabangan.

#### Diubah:
- `src/tipe/galatTipe.ts`: Menambahkan enum `JenisGalatTipe.VARIABEL_BELUM_DIDEKLARASIKAN`.
- `src/tipe/pemeriksaTipe.ts`: Menambahkan validasi variabel dan penguatan validasi tipe kondisi `jika`.
- `src/parser/parser.ts`: Memperkuat penanganan kesalahan sintaksis kondisi kosong, pasangan penutup `akhir`, dan token nyasar.
- `package.json`: Menambahkan skrip `"test:percabangan"` ke dalam perintah pengujian utama `"npm test"`.
- `skrip/periksa_fondasi.js`: Menambahkan audit 4 berkas baru Phase 11 (total 141 berkas utuh).

---

## [v0.10.0] — 2026-10-02
### Phase 10: Sistem Operator & Presedensi NUSANTARA

Fase ini menghadirkan arsitektur operator terpadu yang konsisten, aman, dan selaras di seluruh saluran pipa (*Lexer -> Parser -> AST -> Type System -> Interpreter*).

#### Ditambahkan:
- **Modul Sistem Operator Terpusat (`src/operator/`):**
  - `src/operator/jenisOperator.ts`: Taksonomi kategori operator, arah asosiativitas (*left-to-right* vs *right-to-left*), serta `TABEL_PRESEDENSI_OPERATOR` 8 tingkat resmi.
  - `src/operator/evaluasi.ts`: Mesin evaluasi dan pemancar (*dispatch*) terpusat untuk operator unari (`-`, `tidak`) dan biner (`+`, `-`, `*`, `/`, `%`, `==`, `!=`, `<`, `>`, `<=`, `>=`, `dan`, `atau`).
  - `src/operator/index.ts`: Ekspor terpadu sistem operator.
- **Evaluasi Hubung Singkat (*Short-circuit Evaluation*):**
  - `dan`: jika sisi kiri bernilai `salah`, sisi kanan dilewati dan tidak dievaluasi (mencegah efek samping / pemanggilan fungsi yang tidak perlu).
  - `atau`: jika sisi kiri bernilai `benar`, sisi kanan dilewati dan tidak dievaluasi.
- **Proteksi Runtime Terstruktur:**
  - Pembagian dengan nol (`x / 0`) dan modulo dengan nol (`x % 0`) menghasilkan `GalatRuntime.PEMBAGIAN_NOL` dengan informasi baris dan kolom yang presisi tanpa menyebabkan crash aplikasi.
- **Dokumentasi Sistem Operator:**
  - `docs/referensi/operator.md`: Tabel 8 tingkat presedensi resmi, aturan tipe data, semantik hubung singkat, dan contoh program lengkap.
  - `docs/pengembang/operator.md`: Dokumentasi teknis arsitektur saluran pipa operator, recursive descent parser, evaluasi short-circuit, dan integrasi sistem tipe.
- **Rangkaian Pengujian Sistem Operator (`pengujian/operator/`):**
  - `pengujian/operator/uji_operator.ts`: 21 pengujian mencakup aritmatika, perbandingan, logika, unari, presedensi, asosiativitas, tanda kurung, type checking operator, short-circuit, proteksi bagi/modulo nol, penolakan simbol ilegal, presisi lokasi galat, dan program integrasi penuh kasir toko.
  - `pengujian/operator/README.md`: Panduan eksekusi pengujian operator.

#### Diubah:
- `src/tipe/kompatibilitas.ts`: Menambahkan fungsi `tentukanTipeOperasiUnari` dan menyelaraskan pemetaan tipe operasi.
- `src/tipe/pemeriksaTipe.ts`: Menyempurnakan pesan diagnostik galat tipe pada operator logika dan unari dalam Bahasa Indonesia.
- `src/interpreter/interpreter.ts`: Mendelegasikan evaluasi operator ke modul `src/operator/evaluasi.ts` guna menghilangkan duplikasi kode (*zero logic duplication*).
- `package.json`: Menambahkan skrip `"test:operator"` ke dalam pengujian utama `"npm test"`.
- `skrip/periksa_fondasi.js`: Menambahkan audit 6 berkas baru Phase 10 (total 137 berkas utuh).

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
