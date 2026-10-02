export interface BerkasRepo {
  jalur: string;
  nama: string;
  kategori: string;
  bahasa: 'markdown' | 'nusantara' | 'javascript' | 'teks';
  ukuran: number;
  konten: string;
}

export const BERKAS_REPOSITORI: BerkasRepo[] = [
  // --- FASE 6: IMPLEMENTASI LEXER INTI ---
  {
    jalur: 'src/lexer/lexer.ts',
    nama: 'lexer.ts',
    kategori: 'Mesin Pemindai Karakter',
    bahasa: 'javascript',
    ukuran: 7520,
    konten: `// Lexer Resmi Bahasa NUSANTARA (Phase 6)`
  },
  {
    jalur: 'src/lexer/jenisToken.ts',
    nama: 'jenisToken.ts',
    kategori: 'Taksonomi Token Leksikal',
    bahasa: 'javascript',
    ukuran: 3620,
    konten: `// Taksonomi Jenis Token Bahasa NUSANTARA`
  },
  {
    jalur: 'src/lexer/tokenStream.ts',
    nama: 'tokenStream.ts',
    kategori: 'Abstraksi Aliran Token',
    bahasa: 'javascript',
    ukuran: 1850,
    konten: `// TokenStream untuk Parser Phase 7`
  },
  {
    jalur: 'docs/pengembang/lexer.md',
    nama: 'lexer.md',
    kategori: 'Dokumentasi Teknis Lexer',
    bahasa: 'markdown',
    ukuran: 3450,
    konten: `# Arsitektur & Dokumentasi Teknis Lexer NUSANTARA`
  },
  {
    jalur: 'pengujian/lexer/uji_lexer.ts',
    nama: 'uji_lexer.ts',
    kategori: 'Rangkaian 21 Uji Lexer',
    bahasa: 'javascript',
    ukuran: 8900,
    konten: `// Pengujian Komprehensif Lexer Bahasa NUSANTARA`
  },

  // --- FASE 5: BUKU PANDUAN & DOKUMENTASI AWAL (docs/) ---
  {
    jalur: 'docs/README.md',
    nama: 'README.md (docs)',
    kategori: 'Pusat Buku Panduan',
    bahasa: 'markdown',
    ukuran: 2450,
    konten: `# Dokumentasi Resmi Bahasa Pemrograman NUSANTARA`
  },
  {
    jalur: 'docs/panduan/program-pertama.md',
    nama: 'program-pertama.md',
    kategori: 'Tutorial: Halo Dunia',
    bahasa: 'markdown',
    ukuran: 1540,
    konten: `# Menulis Program Pertama: "Halo Dunia!"`
  },
  {
    jalur: 'docs/glosarium.md',
    nama: 'glosarium.md',
    kategori: 'Glosarium 26 Istilah',
    bahasa: 'markdown',
    ukuran: 3453,
    konten: `# Glosarium Istilah Pemrograman NUSANTARA`
  },

  // --- FASE 4: SPESIFIKASI SINTAKS EBNF ---
  {
    jalur: 'dokumentasi/GRAMMAR-EBNF.md',
    nama: 'GRAMMAR-EBNF.md',
    kategori: 'Tata Bahasa Formal EBNF (Phase 4)',
    bahasa: 'markdown',
    ukuran: 5522,
    konten: `# Tata Bahasa Formal EBNF Bahasa NUSANTARA (ISO/IEC 14977)`
  },
  {
    jalur: 'dokumentasi/PRIORITAS-OPERATOR.md',
    nama: 'PRIORITAS-OPERATOR.md',
    kategori: 'Tabel Presedensi 8 Tingkat',
    bahasa: 'markdown',
    ukuran: 2097,
    konten: `# Tabel Prioritas & Presedensi Operator Resmi Bahasa NUSANTARA`
  },

  // --- FASE 3: LISENSI & TATA KELOLA ---
  {
    jalur: 'LISENSI',
    nama: 'LISENSI',
    kategori: 'Lisensi Resmi (Apache 2.0)',
    bahasa: 'teks',
    ukuran: 11354,
    konten: `Apache License Version 2.0, January 2004`
  },
  {
    jalur: 'TATA-KELOLA.md',
    nama: 'TATA-KELOLA.md',
    kategori: 'Tata Kelola Komunitas',
    bahasa: 'markdown',
    ukuran: 3593,
    konten: `# Tata Kelola Proyek & Komunitas NUSANTARA (5 Peran)`
  },

  // --- BERKAS ROOT & CONTOH ---
  {
    jalur: 'README.md',
    nama: 'README.md',
    kategori: 'Dokumentasi Utama',
    bahasa: 'markdown',
    ukuran: 5610,
    konten: `# NUSANTARA (Phase 6: Lexer Selesai - v0.6.0)`
  },
  {
    jalur: 'PERUBAHAN.md',
    nama: 'PERUBAHAN.md',
    kategori: 'Catatan Rilis (Changelog)',
    bahasa: 'markdown',
    ukuran: 6510,
    konten: `# Catatan Perubahan NUSANTARA (v0.6.0, v0.5.0, v0.4.0, v0.3.0, v0.2.0, v0.1.0)`
  },
  {
    jalur: 'ROADMAP.md',
    nama: 'ROADMAP.md',
    kategori: 'Peta Jalan 36 Fase',
    bahasa: 'markdown',
    ukuran: 8550,
    konten: `# Peta Jalan Pengembangan (ROADMAP) Bahasa Pemrograman NUSANTARA`
  },
  {
    jalur: 'contoh/01_halo.nusantara',
    nama: '01_halo.nusantara',
    kategori: 'Kode Contoh',
    bahasa: 'nusantara',
    ukuran: 57,
    konten: `program Halo\n\nmulai\n    tampilkan("Halo Dunia!")\nselesai`
  }
];

export const DAFTAR_PRESEDENSI_OPERATOR = [
  { tingkat: 1, nama: 'Pengelompokan Kurung', simbol: '( )', asosiasi: 'Dalam ke Luar' },
  { tingkat: 2, nama: 'Negasi & Unari Minus', simbol: 'tidak, -', asosiasi: 'Kanan ke Kiri' },
  { tingkat: 3, nama: 'Perkalian, Pembagian, Modulo', simbol: '*, /, %', asosiasi: 'Kiri ke Kanan' },
  { tingkat: 4, nama: 'Penjumlahan & Pengurangan', simbol: '+, -', asosiasi: 'Kiri ke Kanan' },
  { tingkat: 5, nama: 'Perbandingan Relasional', simbol: '<, <=, >, >=', asosiasi: 'Kiri ke Kanan' },
  { tingkat: 6, nama: 'Perbandingan Kesetaraan', simbol: '==, !=', asosiasi: 'Kiri ke Kanan' },
  { tingkat: 7, nama: 'Konjungsi Logika (AND)', simbol: 'dan', asosiasi: 'Kiri ke Kanan' },
  { tingkat: 8, nama: 'Disjungsi Logika (OR)', simbol: 'atau', asosiasi: 'Kiri ke Kanan' },
];

export const DAFTAR_GLOSARIUM = [
  { asing: 'Abstract Syntax Tree (AST)', lokal: 'Pohon Sintaksis Abstrak', ket: 'Representasi struktur logika kode sumber dalam bentuk pohon hierarki.' },
  { asing: 'Assignment', lokal: 'Penugasan', ket: 'Pemberian atau penggantian nilai ke variabel menggunakan operator =.' },
  { asing: 'Compiler', lokal: 'Kompilator', ket: 'Program penerjemah kode sumber menjadi kode mesin biner mandiri.' },
  { asing: 'Escape Sequence', lokal: 'Karakter Lolos', ket: 'Karakter khusus yang diawali simbol \\ (seperti \\n untuk baris baru).' },
  { asing: 'Immutable', lokal: 'Tak Terubahkan / Kekal', ket: 'Sifat nilai tetap (konstanta) yang dilarang diubah setelah didefinisikan.' },
  { asing: 'Lexer / Tokenizer', lokal: 'Penganalisis Leksikal', ket: 'Komponen yang memecah aliran teks sumber menjadi token-token bermakna.' },
  { asing: 'Parser', lokal: 'Penganalisis Sintaksis', ket: 'Komponen yang memvalidasi tata bahasa token dan membentuk pohon AST.' },
  { asing: 'Short-circuit Evaluation', lokal: 'Evaluasi Hubung Singkat', ket: 'Penghentian evaluasi ekspresi logika jika hasil akhir sudah pasti.' },
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

export const DAFTAR_FASE_ROADMAP = [
  { fase: 1, nama: 'Identitas & Fondasi', versi: 'v0.1.0', kategori: 'Fondasi', status: 'Selesai' },
  { fase: 2, nama: 'Konstitusi Bahasa', versi: 'v0.2.0', kategori: 'Fondasi', status: 'Selesai' },
  { fase: 3, nama: 'Lisensi & Tata Kelola', versi: 'v0.3.0', kategori: 'Fondasi', status: 'Selesai' },
  { fase: 4, nama: 'Spesifikasi Sintaks (EBNF)', versi: 'v0.4.0', kategori: 'Fondasi', status: 'Selesai' },
  { fase: 5, nama: 'Dokumentasi Awal & Panduan', versi: 'v0.5.0', kategori: 'Fondasi', status: 'Selesai' },
  { fase: 6, nama: 'Lexer (Penganalisis Leksikal)', versi: 'v0.6.0', kategori: 'Mesin Inti', status: 'Selesai' },
  { fase: 7, nama: 'Parser (Penganalisis Sintaksis & AST)', versi: 'v0.7.0', kategori: 'Mesin Inti', status: 'Berikutnya' },
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
