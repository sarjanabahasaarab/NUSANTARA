# Peta Jalan Pengembangan (ROADMAP) Bahasa Pemrograman NUSANTARA

Dokumen ini memetakan rencana kerja terstruktur pembangunan bahasa pemrograman **NUSANTARA** dari fondasi awal hingga terwujudnya sistem operasi **NusantaraOS**.

Setiap fase merupakan pencapaian rekayasa piranti lunak (*engineering milestone*) yang bertahap, terverifikasi, dan bebas dari klaim palsu.

---

## Ringkasan 36 Fase Pengembangan

| Fase | Nama Fase | Target Versi | Status |
|---|---|---|---|
| **Phase 1** | Identitas & Fondasi | `v0.1.0` | **Selesai** |
| **Phase 2** | Konstitusi Bahasa | `v0.2.0` | **Selesai** |
| **Phase 3** | Lisensi & Tata Kelola | `v0.3.0` | **Selesai** |
| **Phase 4** | **Spesifikasi Sintaks (EBNF Formal)** | `v0.4.0` | **Selesai (Fase Saat Ini)** |
| **Phase 5** | Dokumentasi Awal & Buku Panduan | `v0.5.0` | Direncanakan Berikutnya |
| **Phase 6** | Lexer (Penganalisis Leksikal) | `v0.6.0` | Direncanakan |
| **Phase 7** | Parser (Penganalisis Sintaksis) | `v0.7.0` | Direncanakan |
| **Phase 8** | Interpreter (Penerjemah Eksekusi AST) | `v0.8.0` | Direncanakan |
| **Phase 9** | Variabel & Tipe Data | `v0.9.0` | Direncanakan |
| **Phase 10** | Operator & Ekspresi | `v0.10.0` | Direncanakan |
| **Phase 11** | Percabangan Kondisional | `v0.11.0` | Direncanakan |
| **Phase 12** | Perulangan Iteratif | `v0.12.0` | Direncanakan |
| **Phase 13** | Fungsi & Prosedur | `v0.13.0` | Direncanakan |
| **Phase 14** | Struktur Data (Daftar & Peta) | `v0.14.0` | Direncanakan |
| **Phase 15** | Modul & Ruang Nama (*Namespace*) | `v0.15.0` | Direncanakan |
| **Phase 16** | Kelas & Objek (OOP) | `v0.16.0` | Direncanakan |
| **Phase 17** | Pewarisan & Antarmuka (*Interface*) | `v0.17.0` | Direncanakan |
| **Phase 18** | Penanganan Kesalahan (*Error Handling*) | `v0.18.0` | Direncanakan |
| **Phase 19** | Generik (*Generics & Parametric Polymorphism*) | `v0.19.0` | Direncanakan |
| **Phase 20** | Pemrograman Asinkron (*Async/Await*) | `v0.20.0` | Direncanakan |
| **Phase 21** | Intermediate Representation (IR Nusantara) | `v0.21.0` | Direncanakan |
| **Phase 22** | Backend Compiler (LLVM / Pembangkit Kode) | `v0.22.0` | Direncanakan |
| **Phase 23** | Executable Native (Biner Mesin Mandiri) | `v0.23.0` | Direncanakan |
| **Phase 24** | Optimasi Compiler (DCE, Inlining, Loop Unrolling) | `v0.24.0` | Direncanakan |
| **Phase 25** | Sistem Build (*Build System & Toolchain*) | `v0.25.0` | Direncanakan |
| **Phase 26** | CLI Bahasa Nusantara (`nusantara`) | `v0.26.0` | Direncanakan |
| **Phase 27** | Package Manager (`nusantara-paket`) | `v0.27.0` | Direncanakan |
| **Phase 28** | Package Registry (Layanan Registri Paket Terpusat) | `v0.28.0` | Direncanakan |
| **Phase 29** | Standard Library (Pustaka Standar Lengkap) | `v0.29.0` | Direncanakan |
| **Phase 30** | Format Berkas NUSANTARA (`.gambar`, `.video`, `.suara`, dll.) | `v0.30.0` | Direncanakan |
| **Phase 31** | Extension Editor (LSP, VS Code, Neovim) | `v0.31.0` | Direncanakan |
| **Phase 32** | NUSANTARA IDE (Lingkungan Pengembangan Terintegrasi) | `v0.32.0` | Direncanakan |
| **Phase 33** | NUSANTARA Web (Fullstack Web Framework & WASM) | `v0.33.0` | Direncanakan |
| **Phase 34** | Desktop & Mobile GUI Toolkit | `v0.34.0` | Direncanakan |
| **Phase 35** | Game Engine & Multimedia Toolkit | `v0.35.0` | Direncanakan |
| **Phase 36** | NUSANTARA System & NusantaraOS | `v1.0.0` | Visi Puncak |

---

## Rincian Tiap Fase

### Blok A: Fondasi & Spesifikasi (Phase 1 – 5)
- **Phase 1 — Identitas & Fondasi:** Struktur repo, ekstensi `.nusantara`, filosofi bahasa, NIP-0001, contoh kode awal, alur Git & rilis v0.1.0. *(Selesai)*
- **Phase 2 — Konstitusi Bahasa:** Piagam 10 prinsip konstitusi, struktur program awal, 32 kata kunci, tipe data dasar, operator, aturan penamaan, standar pesan galat, NIP-0002, dan kasus uji spesifikasi. *(Selesai)*
- **Phase 3 — Lisensi & Tata Kelola:** Lisensi Apache 2.0 resmi, piagam tata kelola 5 peran komunitas, alur NIP 7 tahap, templat NIP, templat GitHub Issues & PR, kebijakan keamanan (responsible disclosure), dan panduan pengaturan GitHub. *(Selesai)*
- **Phase 4 — Spesifikasi Sintaks (EBNF Formal):** Tata bahasa formal EBNF lengkap, spesifikasi token leksikal, taksonomi literal, hirarki ekspresi tanpa ambiguitas, pengesahan presedensi operator 8 tingkat, katalog keputusan terbuka, dan 15 kasus uji negatif. *(Selesai)*
- **Phase 5 — Dokumentasi Awal:** Buku panduan pemula, glosarium teknis resmi Bahasa Indonesia, dan panduan gaya penulisan kode (*style guide*).

### Blok B: Mesin Inti Kompilator (Phase 6 – 13)
- **Phase 6 — Lexer:** Tokenisasi kode sumber `.nusantara`, pelacak nomor baris/kolom, penanganan literal Unicode.
- **Phase 7 — Parser:** Pembangun pohon sintaksis abstrak (AST) dengan pelaporan galat presisi (*syntax error recovery*).
- **Phase 8 — Interpreter:** Mesin evaluasi AST langsung untuk keperluan pengujian logika awal tanpa harus kompilasi native.
- **Phase 9 — Variabel & Tipe Data:** Tabel simbol (*symbol table*), inferensi tipe awal, penanganan konstanta `tetap`.
- **Phase 10 — Operator:** Presedensi dan asosiatif operator aritmatika, perbandingan, dan logika (`dan`, `atau`, `tidak`).
- **Phase 11 — Percabangan:** Evaluasi blok `jika`, `maka`, `selain`, `akhir`.
- **Phase 12 — Perulangan:** Evaluasi blok `untuk` dan `selama` beserta instruksi `hentikan` dan `lanjutkan`.
- **Phase 13 — Fungsi:** Pemanggilan fungsi (*call stack*), argumen nilai dan acuan, fungsi tanpa nama (*anonymous function*).

### Blok C: Fitur Lanjutan & Paradigma (Phase 14 – 20)
- **Phase 14 — Struktur Data:** Alokasi dinamis untuk `daftar` (*list/array*) dan `peta` (*hash table*).
- **Phase 15 — Modul:** Sistem impor berkas `impor`, pemisahan ruang nama, ekspor fungsi publik.
- **Phase 16 — Kelas & Objek:** Paradigma berorientasi objek dengan kata kunci `kelas`, `baru`, `umum`, `pribadi`, `lindungi`.
- **Phase 17 — Pewarisan & Antarmuka:** Pewarisan kelas, polimorfisme, dan antarmuka kontrak (*interfaces*).
- **Phase 18 — Penanganan Kesalahan:** Mekanisme terstruktur `coba`, `tangkap`, `lempar` dengan pelacak jejak tumpukan (*stack trace*).
- **Phase 19 — Generik:** Dukungan tipe data parametrik (*parametric types*).
- **Phase 20 — Pemrograman Asinkron:** Model konkurensi modern (*event loop* atau *fiber/green threads*).

### Blok D: Kompilasi Native & Kinerja (Phase 21 – 25)
- **Phase 21 — Intermediate Representation:** Perancangan format representasi perantara mandiri (IR Nusantara).
- **Phase 22 — Backend Compiler:** Integrasi LLVM atau pembangkit assembly langsung (x86_64, AArch64).
- **Phase 23 — Executable Native:** Pembangkitan biner eksekusi mandiri tanpa ketergantungan runtime luar.
- **Phase 24 — Optimasi Compiler:** Penghapusan kode mati (*dead code elimination*), konversi ekor rekursi (*tail call*), inlining.
- **Phase 25 — Sistem Build:** Toolchain kompilasi terpadu untuk proyek multi-berkas.

### Blok E: Ekosistem & Alat Bantu (Phase 26 – 32)
- **Phase 26 — CLI:** Perkakas baris perintah antarmuka Bahasa Indonesia (`nusantara bangun`, `nusantara uji`, dsb.).
- **Phase 27 — Package Manager:** Pengelola dependensi lokal (`nusantara-paket`).
- **Phase 28 — Package Registry:** Portal dan repositori paket daring resmi komunitas.
- **Phase 29 — Standard Library:** Pustaka standar lengkap (I/O, jaringan HTTP/TCP, kriptografi, sistem berkas, waktu).
- **Phase 30 — Format Berkas NUSANTARA:** Spesifikasi dan perintis format data mandiri (`.gambar`, `.video`, `.suara`, dsb.).
- **Phase 31 — Extension Editor:** Implementasi LSP (*Language Server Protocol*) untuk VS Code, Neovim, dan editor populer.
- **Phase 32 — NUSANTARA IDE:** Lingkungan pengembangan terintegrasi khusus untuk ekosistem bahasa Nusantara.

### Blok F: Domain Aplikasi & Sistem Operasi (Phase 33 – 36)
- **Phase 33 — NUSANTARA Web:** Kerangka kerja web server dan kompilasi WebAssembly (WASM) peramban.
- **Phase 34 — Desktop & Mobile:** Kerangka kerja antarmuka grafis (GUI) lintas sistem (Linux, Windows, macOS, Android).
- **Phase 35 — Game & Multimedia:** Pustaka grafis 2D/3D, audio spasial, dan kerangka permainan.
- **Phase 36 — NUSANTARA System & NusantaraOS:** Lapisan pemrograman tingkat rendah (manajemen memori manual, akses register CPU) dan perintisan sistem operasi mandiri **NusantaraOS**.
