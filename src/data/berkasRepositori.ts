export interface BerkasRepo {
  jalur: string;
  nama: string;
  kategori: string;
  bahasa: 'markdown' | 'nusantara' | 'javascript' | 'teks';
  ukuran: number;
  konten: string;
}

export const BERKAS_REPOSITORI: BerkasRepo[] = [
  // --- FASE 3: LISENSI & TATA KELOLA ---
  {
    jalur: 'LISENSI',
    nama: 'LISENSI',
    kategori: 'Lisensi Resmi (Apache 2.0)',
    bahasa: 'teks',
    ukuran: 11354,
    konten: `                                 Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/

   TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION
   ...
   Copyright [TAHUN] [NAMA PEMEGANG HAK CIPTA]

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.`
  },
  {
    jalur: 'TATA-KELOLA.md',
    nama: 'TATA-KELOLA.md',
    kategori: 'Tata Kelola Komunitas',
    bahasa: 'markdown',
    ukuran: 3593,
    konten: `# Tata Kelola Proyek & Komunitas NUSANTARA

Struktur 5 Peran Komunitas:
1. Pengguna (Users): Menggunakan bahasa, memberi umpan balik, dan melaporkan kutu.
2. Kontributor (Contributors): Mengajukan kode, dokumentasi, pengujian melalui PR.
3. Peninjau (Reviewers): Meninjau kelayakan, kepatuhan konstitusi, dan keamanan kode.
4. Pemelihara (Maintainers): Tim inti penanggung jawab repositori, roadmap, dan NIP.
5. Pengelola Rilis (Release Managers): Mengoordinasikan pembekuan kode dan rilis versi.`
  },
  {
    jalur: 'KEAMANAN.md',
    nama: 'KEAMANAN.md',
    kategori: 'Kebijakan Keamanan',
    bahasa: 'markdown',
    ukuran: 2825,
    konten: `# Kebijakan Keamanan Proyek NUSANTARA

1. Pelaporan Bertanggung Jawab (Responsible Disclosure):
   Laporkan kerentanan secara privat melalui GitHub Private Vulnerability Reporting atau kanal keamanan privat.
   JANGAN membuka issue publik sebelum perbaikan dikoordinasikan.
2. Larangan Rahasia dalam Kode: Dilarang memasukkan token, password, atau API keys.
3. Audit Dependensi: Pemeriksaan berkala atas kerentanan pihak ketiga.`
  },
  {
    jalur: 'KONTRIBUSI.md',
    nama: 'KONTRIBUSI.md',
    kategori: 'Panduan Kontribusi 10 Langkah',
    bahasa: 'markdown',
    ukuran: 4318,
    konten: `# Panduan Kontribusi Bahasa Pemrograman NUSANTARA

10 Langkah Kontribusi:
1. Membaca dokumentasi dasar.
2. Memeriksa issue yang sudah ada.
3. Membuat issue diskusi baru.
4. Membuat fork atau branch kerja.
5. Membuat perubahan kecil & terfokus.
6. Menambahkan pengujian.
7. Memperbarui dokumentasi.
8. Mengirim Pull Request.
9. Menunggu peninjauan (review).
10. Menyempurnakan masukan reviewer.

Format Branch:
fitur/nama-fitur, perbaikan/nama-perbaikan, dokumentasi/nama-dokumen, eksperimen/nama-eksperimen.`
  },
  {
    jalur: 'KODE-ETIK.md',
    nama: 'KODE-ETIK.md',
    kategori: 'Kode Etik Komunitas',
    bahasa: 'markdown',
    ukuran: 3117,
    konten: `# Kode Etik Komunitas Pengembang NUSANTARA

Prinsip Etika Komunitas:
1. Saling Menghormati
2. Menerima Kritik Teknis Secara Profesional
3. Penyelesaian Perbedaan Melalui Musyawarah
4. Bimbingan Ramah untuk Pemula
5. Pelaporan Pelanggaran Privat melalui [EMAIL_ATAU_KANAL_PELAPORAN_RESMI]`
  },
  {
    jalur: 'dokumentasi/LISENSI.md',
    nama: 'LISENSI.md',
    kategori: 'Panduan Lisensi Apache 2.0',
    bahasa: 'markdown',
    ukuran: 4433,
    konten: `# Panduan & Penjelasan Lisensi Apache License 2.0 NUSANTARA

Hak Pengguna & Pengembang:
- Penggunaan komersial & pribadi tanpa royalti.
- Kebebasan modifikasi dan distribusi ulang.
- Perlindungan hibah paten timbal balik (patent grant).
- Kewajiban mencantumkan lisensi, atribusi, dan pemberitahuan perubahan.`
  },
  {
    jalur: 'dokumentasi/KEBIJAKAN-LISENSI.md',
    nama: 'KEBIJAKAN-LISENSI.md',
    kategori: 'Kebijakan Dependensi & Aset',
    bahasa: 'markdown',
    ukuran: 2730,
    konten: `# Kebijakan Lisensi Komponen & Dependensi Eksternal NUSANTARA

Ketentuan Lisensi:
- Kode utama: Apache License 2.0.
- Dependensi pihak ketiga: Wajib berlisensi permisif yang kompatibel (MIT, BSD, Apache 2.0).
- Aset media (font, gambar, audio): Wajib memiliki hak penggunaan jelas (CC BY / OFL).
- Kontribusi dengan lisensi tidak jelas wajib ditangguhkan.`
  },
  {
    jalur: 'dokumentasi/NIP/PROSES-NIP.md',
    nama: 'PROSES-NIP.md',
    kategori: 'Alur 7 Tahapan NIP',
    bahasa: 'markdown',
    ukuran: 2483,
    konten: `# Alur & Proses Nusantara Improvement Proposal (NIP)

Tahapan Siklus Hidup NIP:
1. Draf
2. Dalam Diskusi
3. Peninjauan Formal
4. Diterima / Ditunda / Ditolak
5. Implementasi Teknis
6. Dokumentasi & Pengujian
7. Diterapkan dalam Rilis`
  },
  {
    jalur: 'dokumentasi/NIP/TEMPLATE-NIP.md',
    nama: 'TEMPLATE-NIP.md',
    kategori: 'Format Templat NIP',
    bahasa: 'markdown',
    ukuran: 2232,
    konten: `# NIP-XXXX: [Judul Proposal Peningkatan Nusantara]

Bagian Wajib Templat NIP:
1. Ringkasan
2. Motivasi
3. Rancangan Spesifikasi Teknis
4. Dampak Kompatibilitas
5. Pertimbangan Alternatif
6. Rencana Pengujian
7. Rencana Dokumentasi
8. Riwayat Keputusan`
  },
  {
    jalur: '.github/ISSUE_TEMPLATE/bug.md',
    nama: 'bug.md',
    kategori: 'Templat GitHub Issue',
    bahasa: 'markdown',
    ukuran: 1174,
    konten: `---
name: Laporan Kutu (Bug Report)
about: Laporkan kesalahan atau perilaku tak terduga pada spesifikasi atau perkakas NUSANTARA
---
### Ringkasan Masalah
### Langkah Reproduksi
### Kode Sumber Terkait (.nusantara)
### Hasil yang Diharapkan vs Terjadi
### Informasi Lingkungan Pengujian`
  },
  {
    jalur: '.github/ISSUE_TEMPLATE/fitur.md',
    nama: 'fitur.md',
    kategori: 'Templat GitHub Issue',
    bahasa: 'markdown',
    ukuran: 960,
    konten: `---
name: Usulan Fitur Baru (Feature Request)
about: Usulkan penambahan kemampuan atau perbaikan spesifikasi bahasa NUSANTARA
---
### Masalah yang Ingin Diselesaikan
### Usulan Fitur Baru
### Contoh Penggunaan (.nusantara)
### Dampak Kompatibilitas`
  },
  {
    jalur: '.github/PULL_REQUEST_TEMPLATE.md',
    nama: 'PULL_REQUEST_TEMPLATE.md',
    kategori: 'Templat GitHub PR',
    bahasa: 'markdown',
    ukuran: 1369,
    konten: `## Ringkasan Perubahan
## Alasan Perubahan
## Daftar Berkas yang Diubah / Ditambahkan
## Pengujian yang Dijalankan
## Dokumentasi yang Diperbarui
## Dampak terhadap Kompatibilitas
## Checklist Kontributor`
  },
  {
    jalur: 'dokumentasi/PENGATURAN-GITHUB.md',
    nama: 'PENGATURAN-GITHUB.md',
    kategori: 'Panduan Pengaturan GitHub',
    bahasa: 'markdown',
    ukuran: 3605,
    konten: `# Panduan Manual Pengaturan Repositori GitHub NUSANTARA

Panduan Konfigurasi:
1. Mengaktifkan Issues & Discussions
2. Mengaktifkan Template Issue & PR
3. Perlindungan Cabang Utama (Branch Protection)
4. Pengaturan Hak Akses Tim (Collaborators)
5. Mengaktifkan Pelaporan Keamanan Privat
6. Prosedur Penandaan Tag & Rilis`
  },

  // --- FASE 2: KONSTITUSI & SPESIFIKASI ---
  {
    jalur: 'dokumentasi/KONSTITUSI-BAHASA.md',
    nama: 'KONSTITUSI-BAHASA.md',
    kategori: 'Konstitusi Resmi (Phase 2)',
    bahasa: 'markdown',
    ukuran: 4818,
    konten: `# Konstitusi Bahasa Pemrograman NUSANTARA\n\n10 Prinsip Konstitusi Bahasa dan Struktur Program Resmi Awal.`
  },
  {
    jalur: 'dokumentasi/KEYWORD.md',
    nama: 'KEYWORD.md',
    kategori: 'Tabel 32 Kata Kunci',
    bahasa: 'markdown',
    ukuran: 5098,
    konten: `# Tabel Kata Kunci Resmi Bahasa NUSANTARA (32 Kata Kunci).`
  },
  {
    jalur: 'dokumentasi/TIPE-DATA.md',
    nama: 'TIPE-DATA.md',
    kategori: 'Spesifikasi Tipe Data',
    bahasa: 'markdown',
    ukuran: 3235,
    konten: `# Spesifikasi Tipe Data & Deklarasi Nilai Bahasa NUSANTARA.`
  },
  {
    jalur: 'dokumentasi/OPERATOR.md',
    nama: 'OPERATOR.md',
    kategori: 'Klasifikasi Operator',
    bahasa: 'markdown',
    ukuran: 3534,
    konten: `# Klasifikasi & Prioritas Operator Bahasa NUSANTARA.`
  },
  {
    jalur: 'dokumentasi/ATURAN-PENAMAAN.md',
    nama: 'ATURAN-PENAMAAN.md',
    kategori: 'Aturan Penamaan & Komentar',
    bahasa: 'markdown',
    ukuran: 3745,
    konten: `# Aturan Penamaan Pengidentifikasi & Komentar Bahasa NUSANTARA.`
  },
  {
    jalur: 'dokumentasi/PESAN-KESALAHAN.md',
    nama: 'PESAN-KESALAHAN.md',
    kategori: 'Standar Pesan Galat',
    bahasa: 'markdown',
    ukuran: 3469,
    konten: `# Standar Pesan Kesalahan Diagnostik Bahasa NUSANTARA.`
  },
  {
    jalur: 'dokumentasi/KOMPATIBILITAS.md',
    nama: 'KOMPATIBILITAS.md',
    kategori: 'Kebijakan Kompatibilitas',
    bahasa: 'markdown',
    ukuran: 2655,
    konten: `# Kebijakan Kompatibilitas Versi Bahasa NUSANTARA.`
  },
  {
    jalur: 'dokumentasi/nip/NIP-0002.md',
    nama: 'NIP-0002.md',
    kategori: 'Proposal Konstitusi (Phase 2)',
    bahasa: 'markdown',
    ukuran: 4197,
    konten: `# NIP-0002: Konstitusi Bahasa NUSANTARA (Accepted).`
  },
  {
    jalur: 'pengujian/spesifikasi/program-valid.nusantara',
    nama: 'program-valid.nusantara',
    kategori: 'Kasus Uji Program Valid',
    bahasa: 'nusantara',
    ukuran: 710,
    konten: `program UjiKonstitusi\n\nmulai\n    nama : teks = "Nusantara"\n    tampilkan(nama)\nselesai`
  },
  {
    jalur: 'pengujian/spesifikasi/program-tidak-valid.md',
    nama: 'program-tidak-valid.md',
    kategori: 'Katalog Kasus Tak Valid',
    bahasa: 'markdown',
    ukuran: 3217,
    konten: `# Katalog Kasus Uji Program Tidak Valid (Spesifikasi Konstitusi Phase 2).`
  },

  // --- BERKAS ROOT UTAMA ---
  {
    jalur: 'README.md',
    nama: 'README.md',
    kategori: 'Dokumentasi Utama',
    bahasa: 'markdown',
    ukuran: 7150,
    konten: `# NUSANTARA\n\nBahasa Pemrograman 100% Bahasa Indonesia untuk Komputasi Modern, Terbuka, dan Berkelanjutan.\nLisensi: Apache License 2.0.`
  },
  {
    jalur: 'PERUBAHAN.md',
    nama: 'PERUBAHAN.md',
    kategori: 'Catatan Rilis (Changelog)',
    bahasa: 'markdown',
    ukuran: 4101,
    konten: `# Catatan Perubahan NUSANTARA\n\n- v0.3.0: Phase 3 (Lisensi & Tata Kelola)\n- v0.2.0: Phase 2 (Konstitusi Bahasa)\n- v0.1.0: Phase 1 (Identitas & Fondasi).`
  },
  {
    jalur: 'ROADMAP.md',
    nama: 'ROADMAP.md',
    kategori: 'Peta Jalan 36 Fase',
    bahasa: 'markdown',
    ukuran: 8201,
    konten: `# Peta Jalan Pengembangan (ROADMAP) Bahasa Pemrograman NUSANTARA\n\nPhase 1 Selesai, Phase 2 Selesai, Phase 3 Selesai (v0.3.0), Phase 4 Berikutnya.`
  },
  {
    jalur: 'dokumentasi/nip/NIP-0001.md',
    nama: 'NIP-0001.md',
    kategori: 'Proposal Fondasi',
    bahasa: 'markdown',
    ukuran: 4766,
    konten: `# NIP-0001: Identitas dan Prinsip Dasar Bahasa NUSANTARA.`
  },
  {
    jalur: 'contoh/01_halo.nusantara',
    nama: '01_halo.nusantara',
    kategori: 'Kode Contoh',
    bahasa: 'nusantara',
    ukuran: 57,
    konten: `program Halo\n\nmulai\n    tampilkan("Halo Dunia!")\nselesai`
  },
  {
    jalur: 'contoh/02_data.nusantara',
    nama: '02_data.nusantara',
    kategori: 'Kode Contoh',
    bahasa: 'nusantara',
    ukuran: 179,
    konten: `program Data\n\nmulai\n    nama : teks = "Muhammad"\n    umur : bilangan = 30\n    tinggi : desimal = 170.5\n    aktif : logika = benar\n\n    tampilkan(nama)\n    tampilkan(umur)\nselesai`
  },
  {
    jalur: 'contoh/03_kondisi.nusantara',
    nama: '03_kondisi.nusantara',
    kategori: 'Kode Contoh',
    bahasa: 'nusantara',
    ukuran: 165,
    konten: `program Kondisi\n\nmulai\n    nilai : bilangan = 80\n\n    jika nilai >= 75 maka\n        tampilkan("Lulus")\n    selain\n        tampilkan("Belum lulus")\n    akhir\nselesai`
  },
  {
    jalur: 'contoh/04_perulangan.nusantara',
    nama: '04_perulangan.nusantara',
    kategori: 'Kode Contoh',
    bahasa: 'nusantara',
    ukuran: 110,
    konten: `program Perulangan\n\nmulai\n    untuk angka dari 1 sampai 10 lakukan\n        tampilkan(angka)\n    akhir\nselesai`
  },
  {
    jalur: 'contoh/05_fungsi.nusantara',
    nama: '05_fungsi.nusantara',
    kategori: 'Kode Contoh',
    bahasa: 'nusantara',
    ukuran: 89,
    konten: `fungsi tambah(a : bilangan, b : bilangan) : bilangan\n\nmulai\n    kembalikan a + b\nselesai`
  }
];

export const DAFTAR_KATA_KUNCI_PHASE2 = [
  { kw: 'program', status: 'DITETAPKAN', arti: 'Deklarasi nama unit program utama' },
  { kw: 'mulai', status: 'DITETAPKAN', arti: 'Membuka blok eksekusi instruksi' },
  { kw: 'selesai', status: 'DITETAPKAN', arti: 'Menutup blok utama program' },
  { kw: 'variabel', status: 'DITETAPKAN', arti: 'Deklarasi wadah data dinamis (mutable)' },
  { kw: 'tetap', status: 'DITETAPKAN', arti: 'Deklarasi wadah data konstan (immutable)' },
  { kw: 'fungsi', status: 'DITETAPKAN', arti: 'Deklarasi subrutin / fungsi' },
  { kw: 'kembalikan', status: 'DITETAPKAN', arti: 'Mengembalikan nilai dari fungsi' },
  { kw: 'jika', status: 'DITETAPKAN', arti: 'Pengujian kondisi logis' },
  { kw: 'maka', status: 'DITETAPKAN', arti: 'Membuka cabang benar' },
  { kw: 'selain', status: 'DITETAPKAN', arti: 'Membuka cabang alternatif' },
  { kw: 'akhir', status: 'DITETAPKAN', arti: 'Penutup blok percabangan & perulangan' },
  { kw: 'selama', status: 'DITETAPKAN', arti: 'Perulangan bersyarat kondisi' },
  { kw: 'untuk', status: 'DITETAPKAN', arti: 'Perulangan iteratif rentang' },
  { kw: 'dari', status: 'DITETAPKAN', arti: 'Batas awal rentang' },
  { kw: 'sampai', status: 'DITETAPKAN', arti: 'Batas akhir rentang' },
  { kw: 'lakukan', status: 'DITETAPKAN', arti: 'Membuka blok instruksi perulangan' },
  { kw: 'hentikan', status: 'DITETAPKAN', arti: 'Memutus perulangan (break)' },
  { kw: 'lanjutkan', status: 'DITETAPKAN', arti: 'Melompati ke iterasi berikutnya (continue)' },
  { kw: 'benar', status: 'DITETAPKAN', arti: 'Literal boolean true' },
  { kw: 'salah', status: 'DITETAPKAN', arti: 'Literal boolean false' },
  { kw: 'kosong', status: 'DITETAPKAN', arti: 'Representasi ketiadaan nilai (null/void)' },
  { kw: 'coba', status: 'RANCANGAN', arti: 'Membuka blok pengawasan eksepsi' },
  { kw: 'tangkap', status: 'RANCANGAN', arti: 'Menangkap galat yang dilempar' },
  { kw: 'lempar', status: 'RANCANGAN', arti: 'Melontarkan eksepsi' },
  { kw: 'impor', status: 'RANCANGAN', arti: 'Memuat modul/pustaka eksternal' },
  { kw: 'buat', status: 'RANCANGAN', arti: 'Mengalokasikan struktur data baru' },
  { kw: 'kelas', status: 'RANCANGAN', arti: 'Definisi cetak biru objek (OOP)' },
  { kw: 'umum', status: 'RANCANGAN', arti: 'Akses publik properti/metode' },
  { kw: 'pribadi', status: 'RANCANGAN', arti: 'Akses privat terisolasi' },
  { kw: 'lindungi', status: 'RANCANGAN', arti: 'Akses terproteksi pewarisan' },
  { kw: 'baru', status: 'RANCANGAN', arti: 'Instansiasi objek kelas' },
  { kw: 'hapus', status: 'RANCANGAN', arti: 'Dealokasi memori manual' },
];

export const DAFTAR_TIPE_DATA = [
  'teks', 'bilangan', 'desimal', 'logika', 'karakter', 'daftar', 'peta', 'tanggal', 'waktu', 'kosong'
];

export const DAFTAR_OPERATOR = [
  'dan', 'atau', 'tidak'
];

export const DAFTAR_FASE_ROADMAP = [
  { fase: 1, nama: 'Identitas & Fondasi', versi: 'v0.1.0', kategori: 'Fondasi', status: 'Selesai' },
  { fase: 2, nama: 'Konstitusi Bahasa', versi: 'v0.2.0', kategori: 'Fondasi', status: 'Selesai' },
  { fase: 3, nama: 'Lisensi & Tata Kelola', versi: 'v0.3.0', kategori: 'Fondasi', status: 'Selesai' },
  { fase: 4, nama: 'Spesifikasi Sintaks (EBNF)', versi: 'v0.4.0', kategori: 'Fondasi', status: 'Berikutnya' },
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
