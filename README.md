# NUSANTARA

> **Bahasa Pemrograman 100% Bahasa Indonesia untuk Komputasi Modern, Terbuka, dan Berkelanjutan.**

[![Status](https://img.shields.io/badge/status-fase_7:_parser_selesai-blue.svg)](ROADMAP.md)
[![Versi](https://img.shields.io/badge/versi-v0.7.0-emerald.svg)](PERUBAHAN.md)
[![Lisensi](https://img.shields.io/badge/lisensi-Apache_2.0-blue.svg)](LISENSI)
[![Tata Bahasa](https://img.shields.io/badge/grammar-EBNF_ISO--14977-purple.svg)](dokumentasi/GRAMMAR-EBNF.md)
[![Lexer](https://img.shields.io/badge/lexer-lulus_100%25-teal.svg)](docs/pengembang/lexer.md)
[![Parser & AST](https://img.shields.io/badge/parser-lulus_100%25-cyan.svg)](docs/pengembang/parser.md)

---

## 1. Tentang NUSANTARA

**NUSANTARA** adalah bahasa pemrograman serba guna (*general-purpose programming language*) yang dirancang dari nol menggunakan 100% tata bahasa, istilah teknis, dan leksikon Bahasa Indonesia.

NUSANTARA bukan sekadar penerjemah sintaksis bahasa asing, melainkan ikhtiar mandiri dalam rekayasa perangkat lunak untuk menghadirkan kedaulatan teknologi, kejelasan berpikir logis bagi masyarakat Indonesia, serta fondasi komputasi yang dapat berevolusi hingga ke tingkat sistem operasi (**NusantaraOS**).

- **Ekstensi Berkas Resmi:** `.nusantara`
- **Lisensi:** [Apache License 2.0](LISENSI)
- **Status Saat Ini:** **Phase 7: Parser & AST Selesai (Milestone v0.7.0).**
- **Dokumentasi Parser:** [docs/pengembang/parser.md](docs/pengembang/parser.md)
- **Dokumentasi Lexer:** [docs/pengembang/lexer.md](docs/pengembang/lexer.md)
- **Pusat Buku Panduan:** [docs/README.md](docs/README.md) & [Indeks Lengkap](docs/indeks.md)
- **Tata Bahasa Formal:** [GRAMMAR-EBNF.md](dokumentasi/GRAMMAR-EBNF.md)
- **Dokumen Konstitusi Resmi:** [KONSTITUSI-BAHASA.md](dokumentasi/KONSTITUSI-BAHASA.md)

---

## 2. Saluran Pipa Kompilasi (*Compiler Pipeline*)

Pembangunan arsitektur mesin inti berjalan secara berjenjang:

```text
Source Code (.nusantara)
         │
         ▼
 ┌───────────────┐
 │     Lexer     │  <-- [SELESAI DI PHASE 6 (v0.6.0)]
 └───────────────┘
         │
         ▼
   Rangkaian Token (TokenStream)
         │
         ▼
 ┌───────────────┐
 │    Parser     │  <-- [SELESAI DI PHASE 7 (v0.7.0)]
 └───────────────┘
         │
         ▼
 Pohon Sintaksis Abstrak (AST)
         │
         ▼
 ┌───────────────┐
 │  Interpreter  │  <-- [Target Berikutnya: Phase 8 (v0.8.0)]
 └───────────────┘
         │
         ▼
      Eksekusi
```

> ⚠️ **Catatan Batas Implementasi:** Pada Phase 7, komponen yang aktif adalah **Lexer**, **Parser**, dan struktur **AST**. Komponen Interpreter dan Compiler sengaja belum dibuat pada fase ini dan akan dikerjakan pada **Phase 8 (Interpreter)**.

---

## 3. Menjalankan Pengujian Lexer & Parser

Pengujian komprehensif Lexer (21 uji) dan Parser (11 uji) dapat dijalankan melalui perintah:

```bash
npm run test:lexer   # Uji modul leksikal
npm run test:parser  # Uji modul sintaksis dan pohon AST
npm test             # Audit menyeluruh repositori dan seluruh unit test
```

---

## 4. Status Proyek Saat Ini

```
[✓] Phase 1: Identitas & Fondasi NUSANTARA (v0.1.0)
[✓] Phase 2: Konstitusi Bahasa NUSANTARA (v0.2.0)
[✓] Phase 3: Lisensi & Tata Kelola NUSANTARA (v0.3.0)
[✓] Phase 4: Spesifikasi Sintaks NUSANTARA (v0.4.0)
[✓] Phase 5: Dokumentasi Awal & Buku Panduan (v0.5.0)
[✓] Phase 6: Lexer (Penganalisis Leksikal) (v0.6.0)
[✓] Phase 7: Parser (Penganalisis Sintaksis & AST) (v0.7.0) <-- Fase Selesai
[ ] Phase 8: Interpreter (Penerjemah Eksekusi AST)          <-- Target Berikutnya
...
[ ] Phase 36: NUSANTARA System & NusantaraOS
```

---

## 5. Lisensi

Proyek NUSANTARA dilindungi di bawah [Apache License 2.0](LISENSI). Seluruh rancangan, tata bahasa, dan kode terbuka untuk dimanfaatkan, diteliti, serta dikembangkan bersama oleh masyarakat luas.
