export interface BerkasRepo {
  jalur: string;
  nama: string;
  kategori: string;
  bahasa: 'markdown' | 'nusantara' | 'javascript' | 'teks';
  ukuran: number;
  konten: string;
}

export const BERKAS_REPOSITORI: BerkasRepo[] = [
  {
    jalur: 'README.md',
    nama: 'README.md',
    kategori: 'Dokumentasi Utama',
    bahasa: 'markdown',
    ukuran: 9286,
    konten: `# NUSANTARA

> **Bahasa Pemrograman 100% Bahasa Indonesia untuk Komputasi Modern, Terbuka, dan Berkelanjutan.**

## 1. Tentang NUSANTARA
NUSANTARA adalah bahasa pemrograman serba guna (general-purpose programming language) yang dirancang dari nol menggunakan 100% tata bahasa, istilah teknis, dan leksikon Bahasa Indonesia.

- Ekstensi Berkas Resmi: .nusantara
- Lisensi: Terbuka & Bebas (MIT License)
- Status Saat Ini: Masih dalam tahap pengembangan awal (Phase 1: Identitas & Fondasi).

## 2. Alasan & Tujuan Dibuat
1. Demokratisasi Pemrograman: Membuka akses logika komputasi untuk generasi muda, pelajar, dan insinyur Indonesia tanpa sekat bahasa asing.
2. Keterbacaan Alami (Cognitive Fluency): Sintaksis terstruktur yang mudah dipahami manusia.
3. Kemandirian Perangkat Lunak: Membangun ekosistem teknologi nasional yang kokoh dan berdaulat.
4. Jangkauan Menyeluruh: Dari skrip pemula hingga sistem operasi (NusantaraOS).
5. Transparansi & Komunitas Terbuka: Dikembangkan murni open source di GitHub melalui NIP (Nusantara Improvement Proposal).`
  },
  {
    jalur: 'LISENSI',
    nama: 'LISENSI',
    kategori: 'Tata Kelola Hukum',
    bahasa: 'teks',
    ukuran: 2386,
    konten: `MIT License

Hak Cipta (c) 2026 Pengembang & Kontributor Bahasa Pemrograman NUSANTARA

Dengan ini diberikan izin tanpa biaya kepada siapa pun yang memperoleh salinan
perangkat lunak ini dan berkas dokumentasi terkait ("Perangkat Lunak"), untuk
memperlakukan Perangkat Lunak tanpa batasan, termasuk tanpa batasan hak untuk
menggunakan, menyalin, memodifikasi, menggabungkan, menerbitkan, mendistribusikan,
mensublisensikan, dan/atau menjual salinan Perangkat Lunak...`
  },
  {
    jalur: 'KONTRIBUSI.md',
    nama: 'KONTRIBUSI.md',
    kategori: 'Pedoman Komunitas',
    bahasa: 'markdown',
    ukuran: 3784,
    konten: `# Panduan Kontribusi Bahasa Pemrograman NUSANTARA

Alur Kontribusi Komunitas:
Issue -> Diskusi Komunitas -> Proposal (NIP) -> Implementasi pada Branch Cabang -> Pengujian Mandiri -> Tinjauan Kode (PR) -> Penggabungan (Merge) -> Rilis Bertahap.

Struktur Cabang (Branching Model):
- main: Cabang produksi yang selalu stabil.
- develop: Cabang integrasi pengembangan aktif.
- fitur/*: Cabang pembuatan spesifikasi/fitur baru.
- perbaikan/*: Cabang perbaikan galat atau revisi dokumentasi.
- eksperimen/*: Cabang pengujian gagasan baru.`
  },
  {
    jalur: 'KODE-ETIK.md',
    nama: 'KODE-ETIK.md',
    kategori: 'Etika Komunitas',
    bahasa: 'markdown',
    ukuran: 1908,
    konten: `# Kode Etik Komunitas Pengembang NUSANTARA

Sebagai kontributor dan pemelihara proyek bahasa pemrograman NUSANTARA, kami bertekad menciptakan lingkungan kolaboratif yang inklusif, terbuka, ramah, dan bebas dari diskriminasi bagi setiap orang, tanpa memandang latar belakang, suku, agama, gender, atau tingkat keahlian.`
  },
  {
    jalur: 'PERUBAHAN.md',
    nama: 'PERUBAHAN.md',
    kategori: 'Catatan Rilis',
    bahasa: 'markdown',
    ukuran: 2442,
    konten: `# Catatan Perubahan (CHANGELOG) NUSANTARA

## [v0.1.0] — 2026-10-02
### Phase 1: Identitas & Fondasi NUSANTARA

- Identitas Bahasa: Penetapan nama resmi NUSANTARA dan ekstensi .nusantara.
- Struktur Repositori: Pemetaan struktur modular 10 folder utama.
- Proposal NIP-0001: Identitas dan Prinsip Dasar Bahasa NUSANTARA.
- Contoh Sintaksis Awal: 5 berkas kode sumber acuan (.nusantara).
- Peta Jalan 36 Fase: Dari Fondasi hingga NusantaraOS.`
  },
  {
    jalur: 'ROADMAP.md',
    nama: 'ROADMAP.md',
    kategori: 'Peta Jalan 36 Fase',
    bahasa: 'markdown',
    ukuran: 7933,
    konten: `# Peta Jalan Pengembangan (ROADMAP) Bahasa Pemrograman NUSANTARA

Peta jalan 36 fase pengembangan dari fondasi hingga NusantaraOS:
- Phase 1: Identitas & Fondasi (v0.1.0 - Selesai)
- Phase 2: Konstitusi Bahasa (v0.2.0)
- Phase 3: Lisensi & Tata Kelola (v0.3.0)
- Phase 4: Spesifikasi Sintaks (v0.4.0)
- Phase 5: Dokumentasi Awal (v0.5.0)
- Phase 6: Lexer (v0.6.0)
- Phase 7: Parser (v0.7.0)
- Phase 8: Interpreter (v0.8.0)
...
- Phase 36: NUSANTARA System & NusantaraOS (v1.0.0)`
  },
  {
    jalur: 'dokumentasi/nip/NIP-0001.md',
    nama: 'NIP-0001.md',
    kategori: 'Proposal Fondasi',
    bahasa: 'markdown',
    ukuran: 4766,
    konten: `# NIP-0001: Identitas dan Prinsip Dasar Bahasa NUSANTARA

- NIP Nomor: 0001
- Judul: Identitas dan Prinsip Dasar Bahasa NUSANTARA
- Penulis: Tim Inisiator & Maintainer Bahasa NUSANTARA
- Status: Diterima (Accepted)
- Tipe: Standar Inti (Core Standard)

Proposal ini menetapkan identitas resmi, tata nama, ekstensi berkas .nusantara, leksikon inti, dan filosofi perancangan bahasa pemrograman NUSANTARA.`
  },
  {
    jalur: 'dokumentasi/prinsip-desain.md',
    nama: 'prinsip-desain.md',
    kategori: 'Filosofi Desain',
    bahasa: 'markdown',
    ukuran: 5086,
    konten: `# Prinsip Desain & Filosofi Bahasa NUSANTARA

12 Prinsip Desain Utama:
1. Bahasa Pemrograman untuk Semua
2. Bahasa Indonesia sebagai Bahasa Utama
3. Sintaksis Mudah Dibaca Manusia
4. Kemampuan Teknis Tingkat Tinggi
5. Terbuka Seutuhnya (Open Source MIT)
6. Berorientasi Komunitas (NIP System)
7. Lintas Platform (Cross-Platform)
8. Keamanan & Pencegahan Cacat (Null-Safety)
9. Performa Tinggi Tanpa Klaim Kosong
10. Mudah Dipelajari & Diajarkan
11. Skalabilitas dari Skrip Kecil hingga Enterprise
12. Berkembang Menuju Sistem Operasi NusantaraOS`
  },
  {
    jalur: 'dokumentasi/arsitektur-kompilator.md',
    nama: 'arsitektur-kompilator.md',
    kategori: 'Arsitektur Kompilator',
    bahasa: 'markdown',
    ukuran: 5919,
    konten: `# Arsitektur Kompilator & Saluran Pipa Bahasa NUSANTARA

Saluran Pipa Kompilasi:
Kode Sumber (.nusantara) -> Lexer -> Parser -> AST -> Semantik -> IR -> Optimizer -> Backend -> Executable Mesin.

Visi Format Berkas Mandiri (Phase 30):
.gambar, .video, .suara, .animasi, .buku, .font, .ikon.`
  },
  {
    jalur: 'dokumentasi/panduan-github.md',
    nama: 'panduan-github.md',
    kategori: 'Panduan Operasional GitHub',
    bahasa: 'markdown',
    ukuran: 3836,
    konten: `# Panduan Mengunggah Phase 1 ke GitHub

Langkah-langkah:
1. Buat repositori kosong di GitHub bernama NUSANTARA.
2. Inisialisasi Git: git init && git branch -M main
3. Tambahkan berkas: git add .
4. Buat komit: git commit -m "feat: fondasi awal bahasa NUSANTARA"
5. Hubungkan remote & dorong: git remote add origin <URL> && git push -u origin main
6. Buat tag v0.1.0: git tag -a v0.1.0 -m "NUSANTARA v0.1.0 — Identitas & Fondasi"
7. Dorong tag: git push origin v0.1.0
8. Publikasikan GitHub Release resmi bertajuk "NUSANTARA v0.1.0 — Identitas & Fondasi".`
  },
  {
    jalur: 'contoh/01_halo.nusantara',
    nama: '01_halo.nusantara',
    kategori: 'Kode Contoh',
    bahasa: 'nusantara',
    ukuran: 57,
    konten: `program Halo

mulai
    tampilkan("Halo Dunia!")
selesai`
  },
  {
    jalur: 'contoh/02_data.nusantara',
    nama: '02_data.nusantara',
    kategori: 'Kode Contoh',
    bahasa: 'nusantara',
    ukuran: 179,
    konten: `program Data

mulai
    nama : teks = "Muhammad"
    umur : bilangan = 30
    tinggi : desimal = 170.5
    aktif : logika = benar

    tampilkan(nama)
    tampilkan(umur)
selesai`
  },
  {
    jalur: 'contoh/03_kondisi.nusantara',
    nama: '03_kondisi.nusantara',
    kategori: 'Kode Contoh',
    bahasa: 'nusantara',
    ukuran: 165,
    konten: `program Kondisi

mulai
    nilai : bilangan = 80

    jika nilai >= 75 maka
        tampilkan("Lulus")
    selain
        tampilkan("Belum lulus")
    akhir
selesai`
  },
  {
    jalur: 'contoh/04_perulangan.nusantara',
    nama: '04_perulangan.nusantara',
    kategori: 'Kode Contoh',
    bahasa: 'nusantara',
    ukuran: 110,
    konten: `program Perulangan

mulai
    untuk angka dari 1 sampai 10 lakukan
        tampilkan(angka)
    akhir
selesai`
  },
  {
    jalur: 'contoh/05_fungsi.nusantara',
    nama: '05_fungsi.nusantara',
    kategori: 'Kode Contoh',
    bahasa: 'nusantara',
    ukuran: 89,
    konten: `fungsi tambah(a : bilangan, b : bilangan) : bilangan

mulai
    kembalikan a + b
selesai`
  },
  {
    jalur: 'pengujian/README.md',
    nama: 'pengujian/README.md',
    kategori: 'Kerangka Pengujian',
    bahasa: 'markdown',
    ukuran: 1818,
    konten: `# Sistem Pengujian Bahasa Pemrograman NUSANTARA

Tahapan pengujian bertahap:
1. Uji Fondasi (Phase 1): Skrip evaluasi integritas berkas.
2. Uji Leksikal / Tokenizer (Phase 6)
3. Uji Sintaksis / Parser (Phase 7)
4. Uji Semantik & Tipe Data (Phase 9-10)
5. Uji Evaluasi Interpreter (Phase 8)
6. Uji Integrasi Biner Native (Phase 23)
7. Uji Regresi (Berkelanjutan)`
  }
];

export const DAFTAR_KATA_KUNCI = [
  'program', 'mulai', 'selesai', 'variabel', 'tetap', 'fungsi', 'kembalikan',
  'jika', 'maka', 'selain', 'akhir', 'selama', 'untuk', 'dari', 'sampai',
  'lakukan', 'hentikan', 'lanjutkan', 'benar', 'salah', 'kosong', 'coba',
  'tangkap', 'lempar', 'impor', 'buat', 'kelas', 'umum', 'pribadi', 'lindungi',
  'baru', 'hapus'
];

export const DAFTAR_TIPE_DATA = [
  'teks', 'bilangan', 'desimal', 'logika', 'karakter', 'daftar', 'peta', 'tanggal', 'waktu', 'kosong'
];

export const DAFTAR_OPERATOR = [
  'dan', 'atau', 'tidak'
];

export const DAFTAR_FASE_ROADMAP = [
  { fase: 1, nama: 'Identitas & Fondasi', versi: 'v0.1.0', kategori: 'Fondasi', status: 'Selesai' },
  { fase: 2, nama: 'Konstitusi Bahasa', versi: 'v0.2.0', kategori: 'Fondasi', status: 'Berikutnya' },
  { fase: 3, nama: 'Lisensi & Tata Kelola', versi: 'v0.3.0', kategori: 'Fondasi', status: 'Rencana' },
  { fase: 4, nama: 'Spesifikasi Sintaks', versi: 'v0.4.0', kategori: 'Fondasi', status: 'Rencana' },
  { fase: 5, nama: 'Dokumentasi Awal', versi: 'v0.5.0', kategori: 'Fondasi', status: 'Rencana' },
  { fase: 6, nama: 'Lexer', versi: 'v0.6.0', kategori: 'Mesin Inti', status: 'Rencana' },
  { fase: 7, nama: 'Parser', versi: 'v0.7.0', kategori: 'Mesin Inti', status: 'Rencana' },
  { fase: 8, nama: 'Interpreter', versi: 'v0.8.0', kategori: 'Mesin Inti', status: 'Rencana' },
  { fase: 9, nama: 'Variabel & Tipe Data', versi: 'v0.9.0', kategori: 'Mesin Inti', status: 'Rencana' },
  { fase: 10, nama: 'Operator', versi: 'v0.10.0', kategori: 'Mesin Inti', status: 'Rencana' },
  { fase: 11, nama: 'Percabangan', versi: 'v0.11.0', kategori: 'Mesin Inti', status: 'Rencana' },
  { fase: 12, nama: 'Perulangan', versi: 'v0.12.0', kategori: 'Mesin Inti', status: 'Rencana' },
  { fase: 13, nama: 'Fungsi', versi: 'v0.13.0', kategori: 'Mesin Inti', status: 'Rencana' },
  { fase: 14, nama: 'Struktur Data', versi: 'v0.14.0', kategori: 'Fitur Lanjut', status: 'Rencana' },
  { fase: 15, nama: 'Modul', versi: 'v0.15.0', kategori: 'Fitur Lanjut', status: 'Rencana' },
  { fase: 16, nama: 'Kelas & Objek', versi: 'v0.16.0', kategori: 'Fitur Lanjut', status: 'Rencana' },
  { fase: 17, nama: 'Pewarisan & Antarmuka', versi: 'v0.17.0', kategori: 'Fitur Lanjut', status: 'Rencana' },
  { fase: 18, nama: 'Penanganan Kesalahan', versi: 'v0.18.0', kategori: 'Fitur Lanjut', status: 'Rencana' },
  { fase: 19, nama: 'Generik', versi: 'v0.19.0', kategori: 'Fitur Lanjut', status: 'Rencana' },
  { fase: 20, nama: 'Pemrograman Asinkron', versi: 'v0.20.0', kategori: 'Fitur Lanjut', status: 'Rencana' },
  { fase: 21, nama: 'Intermediate Representation', versi: 'v0.21.0', kategori: 'Kompilasi Native', status: 'Rencana' },
  { fase: 22, nama: 'Backend Compiler', versi: 'v0.22.0', kategori: 'Kompilasi Native', status: 'Rencana' },
  { fase: 23, nama: 'Executable Native', versi: 'v0.23.0', kategori: 'Kompilasi Native', status: 'Rencana' },
  { fase: 24, nama: 'Optimasi Compiler', versi: 'v0.24.0', kategori: 'Kompilasi Native', status: 'Rencana' },
  { fase: 25, nama: 'Sistem Build', versi: 'v0.25.0', kategori: 'Kompilasi Native', status: 'Rencana' },
  { fase: 26, nama: 'CLI', versi: 'v0.26.0', kategori: 'Ekosistem', status: 'Rencana' },
  { fase: 27, nama: 'Package Manager', versi: 'v0.27.0', kategori: 'Ekosistem', status: 'Rencana' },
  { fase: 28, nama: 'Package Registry', versi: 'v0.28.0', kategori: 'Ekosistem', status: 'Rencana' },
  { fase: 29, nama: 'Standard Library', versi: 'v0.29.0', kategori: 'Ekosistem', status: 'Rencana' },
  { fase: 30, nama: 'Format NUSANTARA', versi: 'v0.30.0', kategori: 'Ekosistem', status: 'Rencana' },
  { fase: 31, nama: 'Extension Editor', versi: 'v0.31.0', kategori: 'Ekosistem', status: 'Rencana' },
  { fase: 32, nama: 'NUSANTARA IDE', versi: 'v0.32.0', kategori: 'Ekosistem', status: 'Rencana' },
  { fase: 33, nama: 'NUSANTARA Web', versi: 'v0.33.0', kategori: 'Domain Khusus', status: 'Rencana' },
  { fase: 34, nama: 'Desktop & Mobile', versi: 'v0.34.0', kategori: 'Domain Khusus', status: 'Rencana' },
  { fase: 35, nama: 'Game & Multimedia', versi: 'v0.35.0', kategori: 'Domain Khusus', status: 'Rencana' },
  { fase: 36, nama: 'NUSANTARA System & NusantaraOS', versi: 'v1.0.0', kategori: 'Sistem Operasi', status: 'Rencana' },
];
