# NUSANTARA

> **Bahasa Pemrograman 100% Bahasa Indonesia untuk Komputasi Modern, Terbuka, dan Berkelanjutan.**

[![Status](https://img.shields.io/badge/status-fase_1:_fondasi_&_identitas-blue.svg)](ROADMAP.md)
[![Versi](https://img.shields.io/badge/versi-v0.1.0-emerald.svg)](PERUBAHAN.md)
[![Lisensi](https://img.shields.io/badge/lisensi-MIT-yellow.svg)](LISENSI)
[![NIP](https://img.shields.io/badge/proposal-NIP--0001-purple.svg)](dokumentasi/nip/NIP-0001.md)

---

## 1. Tentang NUSANTARA

**NUSANTARA** adalah bahasa pemrograman serba guna (*general-purpose programming language*) yang dirancang dari nol menggunakan 100% tata bahasa, istilah teknis, dan leksikon Bahasa Indonesia.

NUSANTARA bukan sekadar terjemahan sintaksis bahasa asing, melainkan ikhtiar mandiri dalam rekayasa perangkat lunak untuk menghadirkan kedaulatan teknologi, kejelasan berpikir logis bagi masyarakat Indonesia, serta fondasi komputasi yang dapat berevolusi hingga ke tingkat sistem operasi (**NusantaraOS**).

- **Ekstensi Berkas Resmi:** `.nusantara`
- **Lisensi:** Terbuka & Bebas (MIT License)
- **Status Saat Ini:** **Masih dalam tahap pengembangan awal (Phase 1: Identitas & Fondasi).**

---

## 2. Alasan & Tujuan Dibuat

1. **Demokratisasi Pemrograman:** Membuka akses logika komputasi untuk generasi muda, pelajar, pengajar, dan insinyur Indonesia tanpa terkendala sekat bahasa asing.
2. **Keterbacaan Alami (*Cognitive Fluency*):** Sintaksis terstruktur yang mudah dipahami manusia seperti membaca kalimat formal bahasa Indonesia yang tertib.
3. **Kemandirian Perangkat Lunak:** Membangun ekosistem teknologi nasional yang kokoh dan berdaulat.
4. **Jangkauan Menyeluruh:** Dirancang untuk berevolusi dari skrip pemula hingga komputasi tingkat rendah, sistem tertanam (*embedded system*), dan kernel sistem operasi.
5. **Transparansi & Komunitas Terbuka:** Dikembangkan secara murni *open source* di GitHub melalui tata kelola proposal terbuka (**NIP - Nusantara Improvement Proposal**).

---

## 3. Karakteristik & Filosofi Desain

- **Bahasa Pemrograman untuk Semua:** Ramah bagi pemula, terstruktur rapi untuk rekayasawan senior.
- **Bahasa Indonesia sebagai Bahasa Utama:** Seluruh kata kunci, pesan kesalahan, alat bantu (CLI), dan dokumentasi dirancang dalam bahasa persatuan.
- **Sintaksis Tegas & Manusiawi:** Blok program diawali dan diakhiri secara eksplisit (`mulai` ... `selesai`, `jika` ... `maka` ... `selain` ... `akhir`).
- **Aman & Dapat Diprediksi:** Mengutamakan pengecekan tipe statis (*static typing*) terinferensi secara bertahap pada fase lanjutan.
- **Bebas Kompromi Teknis:** Tidak mengorbankan ketepatan arsitektural; target masa depan adalah kompilasi native berkinerja tinggi.
- **Tanpa Klaim Palsu:** Pada Fase 1, kami tidak mengklaim kecepatan eksekusi yang belum diuji di dunia nyata. Semua metrik dibangun di atas pengujian terverifikasi.

---

## 4. Contoh Sintaksis Awal NUSANTARA

Berikut adalah spesifikasi sintaksis acuan yang disepakati pada **Phase 1** (akan direalisasikan pada fase kompilator):

### A. Program Halo Dunia
```nusantara
program Halo

mulai
    tampilkan("Halo Dunia!")
selesai
```

### B. Variabel & Tipe Data
```nusantara
program Data

mulai
    nama : teks = "Muhammad"
    umur : bilangan = 30
    tinggi : desimal = 170.5
    aktif : logika = benar

    tampilkan(nama)
    tampilkan(umur)
selesai
```

### C. Percabangan Kondisional
```nusantara
program Kondisi

mulai
    nilai : bilangan = 80

    jika nilai >= 75 maka
        tampilkan("Lulus")
    selain
        tampilkan("Belum lulus")
    akhir
selesai
```

### D. Perulangan
```nusantara
program Perulangan

mulai
    untuk angka dari 1 sampai 10 lakukan
        tampilkan(angka)
    akhir
selesai
```

### E. Definisi Fungsi
```nusantara
fungsi tambah(a : bilangan, b : bilangan) : bilangan
mulai
    kembalikan a + b
selesai
```

---

## 5. Kata Kunci & Operator Awal

### Kata Kunci (Keywords)
| Kategori | Kata Kunci |
|---|---|
| **Struktur Program** | `program`, `mulai`, `selesai`, `impor` |
| **Deklarasi & Data** | `variabel`, `tetap`, `buat`, `baru`, `hapus` |
| **Alur Kontrol** | `jika`, `maka`, `selain`, `akhir` |
| **Perulangan** | `selama`, `untuk`, `dari`, `sampai`, `lakukan`, `hentikan`, `lanjutkan` |
| **Fungsi & Prosedur** | `fungsi`, `kembalikan` |
| **Penanganan Galat** | `coba`, `tangkap`, `lempar` |
| **Objek & Kelas** | `kelas`, `umum`, `pribadi`, `lindungi` |
| **Nilai Literal** | `benar`, `salah`, `kosong` |

### Tipe Data Fondasi
- `teks` — Rangkaian karakter Unicode
- `bilangan` — Bilangan bulat (*integer*)
- `desimal` — Bilangan pecahan presisi ganda (*floating point*)
- `logika` — Boolean (`benar` / `salah`)
- `karakter` — Satuan karakter tunggal
- `daftar` — Kumpulan berurutan (*array/list*)
- `peta` — Pasangan kunci-nilai (*dictionary/hash map*)
- `tanggal` & `waktu` — Struktur penanggalan dan pencatatan masa
- `kosong` — Nilai hampa (*null/nil/void*)

### Operator Logika
- `dan` — Konjungsi logis
- `atau` — Disjungsi logis
- `tidak` — Negasi logis

---

## 6. Rencana Arsitektur Kompilator

Kompilator resmi NUSANTARA dirancang dengan saluran pipa (*compilation pipeline*) modern:

```
Kode Sumber (.nusantara)
         │
         ▼
    1. Lexer (Analisis Leksikal & Tokenisasi Bahasa Indonesia)
         │
         ▼
    2. Parser (Analisis Sintaksis Berbasis Tata Bahasa Formal)
         │
         ▼
    3. AST (Pohon Sintaksis Abstrak)
         │
         ▼
    4. Analisis Semantik (Pemeriksaan Tipe & Lingkup Variabel)
         │
         ▼
    5. IR (Intermediate Representation Bahasa Nusantara)
         │
         ▼
    6. Optimizer (Optimasi Kode & Efisiensi Memori)
         │
         ▼
    7. Backend (Pembangkit Kode Mesin / LLVM / WebAssembly)
         │
         ▼
    Berkas Eksekusi Asli (Native Binary / .exe / ELF / Mach-O)
```

> **Catatan Fase 1:** Seluruh implementasi kompilator di atas belum dieksekusi pada fase ini. Fase 1 fokus murni pada arsitektur, identitas, dan konstitusi bahasa.

---

## 7. Rencana Ekosistem Masa Depan

1. **Alat CLI (`nusantara`):** Perintah CLI berbahasa Indonesia (`nusantara bangun`, `nusantara jalankan`, `nusantara uji`, `nusantara pasang`).
2. **Pengelola Paket (`nusantara-paket`):** Registry modul terdistribusi untuk komunitas pengembang.
3. **IDE & Ekstensi Editor:** Dukungan Language Server Protocol (LSP), penyorot sintaksis VS Code, dan IDE resmi NUSANTARA.
4. **Kerangka Kerja (Frameworks):**
   - Web & API Backend
   - Antarmuka Desktop & Seluler
   - Mesin Permainan & Multimedia
5. **Format Berkas Multimedia Mandiri (Phase 30):** Konsep ekstensi data bahasa asli (`.gambar`, `.video`, `.suara`, `.animasi`, `.buku`, `.font`, `.ikon`).
6. **NusantaraOS (Phase 36):** Sistem operasi berbasis kernel mikro yang ditulis dalam NUSANTARA tingkat rendah.

---

## 8. Status Proyek Saat Ini

```
[✓] Phase 1: Identitas & Fondasi NUSANTARA (v0.1.0)
[ ] Phase 2: Konstitusi Bahasa NUSANTARA
[ ] Phase 3: Lisensi & Tata Kelola
...
[ ] Phase 36: NUSANTARA System & NusantaraOS
```

> Status resmi: **Masih dalam tahap pengembangan awal.** Belum ada berkas biner kompilator yang dirilis untuk publik pada Phase 1.

---

## 9. Struktur Repositori

```
NUSANTARA/
├── kompilator/          # Arsitektur kompilator (lexer, parser, ast, semantik, dsb.)
├── runtime/             # Lingkungan eksekusi dan alokator memori (fase mendatang)
├── standar/             # Pustaka standar resmi (teks, matematika, berkas, dsb.)
├── pustaka/             # Pustaka bantu ekosistem pihak ketiga
├── kerangka/            # Kerangka kerja aplikasi (web, desktop, seluler, game)
├── alat/                # Perkakas CLI, pemformat, dan pengelola paket
├── ide/                 # Konfigurasi ekstensi editor & IDE
├── dokumentasi/         # Spesifikasi teknis & arsip NIP
├── contoh/              # Contoh kode sumber resmi .nusantara
├── pengujian/           # Perancangan sistem verifikasi dan uji coba
├── skrip/               # Skrip bantu pemeliharaan repositori
├── README.md            # Dokumentasi utama proyek
├── LISENSI              # Lisensi MIT terbuka
├── KONTRIBUSI.md        # Panduan kontribusi komunitas
├── KODE-ETIK.md         # Standar etika komunitas
├── PERUBAHAN.md         # Catatan rilis per versi (CHANGELOG)
├── ROADMAP.md           # Peta jalan 36 fase pengembangan
└── .gitignore           # Aturan pengabaian berkas Git
```

---

## 10. Cara Berkontribusi

Pengembangan bahasa NUSANTARA terbuka untuk siapa saja. Alur kontribusi mengikuti standar GitHub:

1. Pelajari [KONTRIBUSI.md](KONTRIBUSI.md) dan [KODE-ETIK.md](KODE-ETIK.md).
2. Buat **Issue** untuk mendiskusikan gagasan atau melaporkan kelemahan spesifikasi.
3. Untuk usulan perubahan sintaksis atau tata kelola besar, ajukan **NIP (Nusantara Improvement Proposal)** pada folder `dokumentasi/nip/`.
4. Buat branch spesifik (`fitur/...`, `perbaikan/...`, `eksperimen/...`).
5. Ajukan *Pull Request* ke branch `develop`.

---

## 11. Lisensi

Proyek NUSANTARA dilindungi di bawah [Lisensi MIT](LISENSI). Seluruh rancangan, tata bahasa, dan kode terbuka untuk dimanfaatkan, diteliti, serta dikembangkan bersama oleh masyarakat.
