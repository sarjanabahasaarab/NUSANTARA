export interface BerkasRepo {
  jalur: string;
  nama: string;
  kategori: string;
  bahasa: 'markdown' | 'nusantara' | 'javascript' | 'teks';
  ukuran: number;
  konten: string;
}

export const BERKAS_REPOSITORI: BerkasRepo[] = [
  // --- FASE 8: IMPLEMENTASI INTERPRETER INTI ---
  {
    jalur: 'src/interpreter/interpreter.ts',
    nama: 'interpreter.ts',
    kategori: 'Mesin Eksekusi AST',
    bahasa: 'javascript',
    ukuran: 15800,
    konten: `// Interpreter Resmi Bahasa NUSANTARA (Phase 8)`
  },
  {
    jalur: 'src/interpreter/nilai.ts',
    nama: 'nilai.ts',
    kategori: 'Sistem Nilai Runtime',
    bahasa: 'javascript',
    ukuran: 2800,
    konten: `// Sistem Nilai Runtime Bahasa NUSANTARA`
  },
  {
    jalur: 'src/interpreter/environment.ts',
    nama: 'environment.ts',
    kategori: 'Manajemen Lingkup & Simbol',
    bahasa: 'javascript',
    ukuran: 2300,
    konten: `// Manajemen Lingkup & Perlindungan Nilai Tetap`
  },
  {
    jalur: 'docs/pengembang/interpreter.md',
    nama: 'interpreter.md',
    kategori: 'Dokumentasi Teknis Interpreter',
    bahasa: 'markdown',
    ukuran: 3900,
    konten: `# Arsitektur & Dokumentasi Teknis Interpreter NUSANTARA`
  },
  {
    jalur: 'pengujian/interpreter/uji_interpreter.ts',
    nama: 'uji_interpreter.ts',
    kategori: 'Rangkaian 15 Uji Interpreter',
    bahasa: 'javascript',
    ukuran: 8400,
    konten: `// Pengujian Komprehensif Interpreter Bahasa NUSANTARA`
  },

  // --- FASE 7: IMPLEMENTASI PARSER & AST INTI ---
  {
    jalur: 'src/parser/parser.ts',
    nama: 'parser.ts',
    kategori: 'Mesin Penganalisis Sintaksis EBNF',
    bahasa: 'javascript',
    ukuran: 14500,
    konten: `// Parser Resmi Bahasa NUSANTARA (Phase 7)`
  },
  {
    jalur: 'src/parser/ast.ts',
    nama: 'ast.ts',
    kategori: 'Definisi Struktur Simpul AST',
    bahasa: 'javascript',
    ukuran: 5120,
    konten: `// Definisi Simpul AST Bahasa NUSANTARA`
  },
  {
    jalur: 'docs/pengembang/parser.md',
    nama: 'parser.md',
    kategori: 'Dokumentasi Teknis Parser',
    bahasa: 'markdown',
    ukuran: 3600,
    konten: `# Arsitektur & Dokumentasi Teknis Parser NUSANTARA`
  },

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
    jalur: 'src/lexer/tokenStream.ts',
    nama: 'tokenStream.ts',
    kategori: 'Abstraksi Aliran Token',
    bahasa: 'javascript',
    ukuran: 1850,
    konten: `// TokenStream untuk Parser Phase 7`
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
    konten: `# NUSANTARA (Phase 8: Interpreter Selesai - v0.8.0)`
  },
  {
    jalur: 'PERUBAHAN.md',
    nama: 'PERUBAHAN.md',
    kategori: 'Catatan Rilis (Changelog)',
    bahasa: 'markdown',
    ukuran: 8900,
    konten: `# Catatan Perubahan NUSANTARA (v0.8.0, v0.7.0, v0.6.0, v0.5.0, v0.4.0, v0.3.0, v0.2.0, v0.1.0)`
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
  { asing: 'Interpreter', lokal: 'Penerjemah Eksekusi', ket: 'Komponen yang menjalankan instruksi AST langsung di memori komputer.' },
  { asing: 'Lexer / Tokenizer', lokal: 'Penganalisis Leksikal', ket: 'Komponen yang memecah aliran teks sumber menjadi token-token bermakna.' },
  { asing: 'Parser', lokal: 'Penganalisis Sintaksis', ket: 'Komponen yang memvalidasi tata bahasa token dan membentuk pohon AST.' },
  { asing: 'Precedence Climbing', lokal: 'Pemanjatan Presedensi', ket: 'Metode evaluasi hierarki operator berdasarkan tingkat prioritas matematis.' },
  { asing: 'Short-circuit Evaluation', lokal: 'Evaluasi Hubung Singkat', ket: 'Penghentian evaluasi ekspresi logika jika hasil akhir sudah pasti.' },
];

export const DAFTAR_FASE_ROADMAP = [
  { fase: 1, nama: 'Identitas & Fondasi', versi: 'v0.1.0', kategori: 'Fondasi', status: 'Selesai' },
  { fase: 2, nama: 'Konstitusi Bahasa', versi: 'v0.2.0', kategori: 'Fondasi', status: 'Selesai' },
  { fase: 3, nama: 'Lisensi & Tata Kelola', versi: 'v0.3.0', kategori: 'Fondasi', status: 'Selesai' },
  { fase: 4, nama: 'Spesifikasi Sintaks (EBNF)', versi: 'v0.4.0', kategori: 'Fondasi', status: 'Selesai' },
  { fase: 5, nama: 'Dokumentasi Awal & Panduan', versi: 'v0.5.0', kategori: 'Fondasi', status: 'Selesai' },
  { fase: 6, nama: 'Lexer (Penganalisis Leksikal)', versi: 'v0.6.0', kategori: 'Mesin Inti', status: 'Selesai' },
  { fase: 7, nama: 'Parser (Penganalisis Sintaksis & AST)', versi: 'v0.7.0', kategori: 'Mesin Inti', status: 'Selesai' },
  { fase: 8, nama: 'Interpreter (Penerjemah Eksekusi AST)', versi: 'v0.8.0', kategori: 'Mesin Inti', status: 'Selesai' },
  { fase: 9, nama: 'Variabel & Tipe Data Lanjutan', versi: 'v0.9.0', kategori: 'Mesin Inti', status: 'Berikutnya' },
  { fase: 10, nama: 'Operator Lanjutan', versi: 'v0.10.0', kategori: 'Mesin Inti', status: 'Rencana' },
  { fase: 11, nama: 'Percabangan Lanjutan', versi: 'v0.11.0', kategori: 'Mesin Inti', status: 'Rencana' },
  { fase: 12, nama: 'Perulangan Lanjutan', versi: 'v0.12.0', kategori: 'Mesin Inti', status: 'Rencana' },
  { fase: 13, nama: 'Fungsi Lanjutan', versi: 'v0.13.0', kategori: 'Mesin Inti', status: 'Rencana' },
  { fase: 14, nama: 'Struktur Data (Daftar & Peta)', versi: 'v0.14.0', kategori: 'Fitur Lanjut', status: 'Rencana' },
  { fase: 15, nama: 'Modul & Ruang Nama', versi: 'v0.15.0', kategori: 'Fitur Lanjut', status: 'Rencana' },
  { fase: 16, nama: 'Kelas & Objek (OOP)', versi: 'v0.16.0', kategori: 'Fitur Lanjut', status: 'Rencana' },
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
