# NUSANTARA

> **Bahasa Pemrograman 100% Bahasa Indonesia untuk Komputasi Modern, Terbuka, dan Berkelanjutan.**

[![Status](https://img.shields.io/badge/status-fase_3:_lisensi_&_tata_kelola-blue.svg)](ROADMAP.md)
[![Versi](https://img.shields.io/badge/versi-v0.3.0-emerald.svg)](PERUBAHAN.md)
[![Lisensi](https://img.shields.io/badge/lisensi-Apache_2.0-blue.svg)](LISENSI)
[![Konstitusi](https://img.shields.io/badge/konstitusi-disahkan-purple.svg)](dokumentasi/KONSTITUSI-BAHASA.md)
[![Tata Kelola](https://img.shields.io/badge/tata_kelola-resmi-teal.svg)](TATA-KELOLA.md)

---

## 1. Tentang NUSANTARA

**NUSANTARA** adalah bahasa pemrograman serba guna (*general-purpose programming language*) yang dirancang dari nol menggunakan 100% tata bahasa, istilah teknis, dan leksikon Bahasa Indonesia.

NUSANTARA bukan sekadar terjemahan sintaksis bahasa asing, melainkan ikhtiar mandiri dalam rekayasa perangkat lunak untuk menghadirkan kedaulatan teknologi, kejelasan berpikir logis bagi masyarakat Indonesia, serta fondasi komputasi yang dapat berevolusi hingga ke tingkat sistem operasi (**NusantaraOS**).

- **Ekstensi Berkas Resmi:** `.nusantara`
- **Lisensi:** [Apache License 2.0](LISENSI)
- **Status Saat Ini:** **Masih dalam tahap pengembangan awal (Phase 3: Lisensi & Tata Kelola Selesai).**
- **Dokumen Konstitusi Resmi:** [KONSTITUSI-BAHASA.md](dokumentasi/KONSTITUSI-BAHASA.md)
- **Tata Kelola Proyek:** [TATA-KELOLA.md](TATA-KELOLA.md)
- **Kebijakan Keamanan:** [KEAMANAN.md](KEAMANAN.md)

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
- **Tanpa Klaim Palsu:** Pada Fase 1, 2, dan 3, kami tidak mengklaim kecepatan eksekusi atau fitur kompilator yang belum diimplementasikan. Semua metrik dibangun di atas spesifikasi dan pengujian terverifikasi.

---

## 4. Contoh Sintaksis Resmi Awal NUSANTARA

Berikut adalah spesifikasi sintaksis acuan yang ditetapkan pada **Konstitusi Bahasa**:

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

## 5. Tata Kelola, Lisensi, & Dokumentasi Resmi

- 📜 **[Lisensi Apache 2.0](LISENSI)** & **[Panduan Lisensi](dokumentasi/LISENSI.md)**: Hak pengguna, pengembang, dan hibah paten timbal balik.
- ⚖️ **[Tata Kelola Proyek](TATA-KELOLA.md)**: Struktur 5 peran (Pengguna, Kontributor, Reviewer, Maintainer, Pengelola Rilis).
- 🛡️ **[Kebijakan Keamanan](KEAMANAN.md)**: Prosedur pelaporan kerentanan terkoordinasi (*responsible disclosure*).
- 🤝 **[Panduan Kontribusi](KONTRIBUSI.md)**: 10 langkah alur kontribusi terstandar dan pola percabangan.
- 💡 **[Sistem NIP](dokumentasi/NIP/PROSES-NIP.md)**: Prosedur 7 tahapan usulan peningkatan bahasa & [Templat NIP](dokumentasi/NIP/TEMPLATE-NIP.md).
- 📋 **[Templat GitHub](.github/ISSUE_TEMPLATE/)**: Templat Laporan Kutu, Usulan Fitur, Dokumentasi, Pertanyaan, dan [Pull Request](.github/PULL_REQUEST_TEMPLATE.md).
- 🏛️ **[Konstitusi Bahasa](dokumentasi/KONSTITUSI-BAHASA.md)**: 10 Prinsip Konstitusi Bahasa NUSANTARA.
- 🔑 **[Tabel Kata Kunci](dokumentasi/KEYWORD.md)**, **[Tipe Data](dokumentasi/TIPE-DATA.md)**, **[Operator](dokumentasi/OPERATOR.md)**, dan **[Aturan Penamaan](dokumentasi/ATURAN-PENAMAAN.md)**.
- 🧪 **[Uji Kasus Spesifikasi](pengujian/spesifikasi/README.md)**: Pengujian program valid dan katalog kasus negatif.

---

## 6. Rencana Arsitektur Kompilator

```
Kode Sumber (.nusantara)
         │
         ▼
    1. Lexer (Analisis Leksikal & Tokenisasi Bahasa Indonesia - Phase 6)
         │
         ▼
    2. Parser (Analisis Sintaksis Berbasis Tata Bahasa Formal - Phase 7)
         │
         ▼
    3. AST (Pohon Sintaksis Abstrak)
         │
         ▼
    4. Analisis Semantik (Pemeriksaan Tipe & Lingkup Variabel - Phase 9 & 10)
         │
         ▼
    5. IR (Intermediate Representation Bahasa Nusantara - Phase 21)
         │
         ▼
    6. Optimizer (Optimasi Kode & Efisiensi Memori - Phase 24)
         │
         ▼
    7. Backend (Pembangkit Kode Mesin / LLVM / WebAssembly - Phase 22 & 23)
         │
         ▼
    Berkas Eksekusi Asli (Native Binary / .exe / ELF / Mach-O)
```

> **Catatan Fase 3:** Seluruh implementasi kompilator biner di atas belum dieksekusi pada fase ini. Implementasi mesin kompilator akan dimulai pada Phase 6 (Lexer).

---

## 7. Status Proyek Saat Ini

```
[✓] Phase 1: Identitas & Fondasi NUSANTARA (v0.1.0)
[✓] Phase 2: Konstitusi Bahasa NUSANTARA (v0.2.0)
[✓] Phase 3: Lisensi & Tata Kelola NUSANTARA (v0.3.0)  <-- Fase Selesai
[ ] Phase 4: Spesifikasi Sintaks (EBNF Formal)
...
[ ] Phase 36: NUSANTARA System & NusantaraOS
```

> Status resmi: **Masih dalam tahap pengembangan awal (Phase 3 Selesai).** Belum ada berkas biner kompilator yang dirilis untuk publik.

---

## 8. Lisensi

Proyek NUSANTARA dilindungi di bawah [Apache License 2.0](LISENSI). Seluruh rancangan, tata bahasa, dan kode terbuka untuk dimanfaatkan, diteliti, serta dikembangkan bersama oleh masyarakat luas.
