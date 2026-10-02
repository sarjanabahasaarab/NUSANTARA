export interface BerkasRepo {
  jalur: string;
  nama: string;
  kategori: string;
  bahasa: 'markdown' | 'nusantara' | 'javascript' | 'teks';
  ukuran: number;
  konten: string;
}

export const BERKAS_REPOSITORI: BerkasRepo[] = [
  // --- FASE 4: SPESIFIKASI SINTAKS EBNF ---
  {
    jalur: 'dokumentasi/GRAMMAR-EBNF.md',
    nama: 'GRAMMAR-EBNF.md',
    kategori: 'Tata Bahasa Formal EBNF (Phase 4)',
    bahasa: 'markdown',
    ukuran: 5522,
    konten: `# Tata Bahasa Formal EBNF Bahasa NUSANTARA (ISO/IEC 14977)

program_utama = "program", spasi, pengidentifikasi, pemisah_baris, blok_utama ;
blok_utama = "mulai", pemisah_baris, daftar_pernyataan, "selesai" ;
pernyataan = deklarasi_variabel | deklarasi_tetap | penugasan | pemanggilan_fungsi
           | percabangan_jika | perulangan_untuk | perulangan_selama | instruksi_kendali ;`
  },
  {
    jalur: 'dokumentasi/SPESIFIKASI-SINTAKS.md',
    nama: 'SPESIFIKASI-SINTAKS.md',
    kategori: 'Spesifikasi Sintaks Induk',
    bahasa: 'markdown',
    ukuran: 4130,
    konten: `# Spesifikasi Sintaks Formal Bahasa NUSANTARA

Harmonisasi Audit:
- Baris Baru (Newline) sebagai pemisah alami instruksi.
- Bentuk ringkas 'nama : tipe = nilai' dan eksplisit 'variabel nama : tipe = nilai' sama-sama sah.
- Batas akhir perulangan 'sampai' bersifat inklusif.`
  },
  {
    jalur: 'dokumentasi/TOKEN.md',
    nama: 'TOKEN.md',
    kategori: 'Spesifikasi Token Leksikal',
    bahasa: 'markdown',
    ukuran: 3507,
    konten: `# Spesifikasi Token Leksikal Bahasa NUSANTARA

Taksonomi Token:
1. KATA_KUNCI (32 kata leksikal)
2. PENGIDENTIFIKASI ([a-zA-Z_][a-zA-Z0-9_]*)
3. LITERAL_BILANGAN, LITERAL_DESIMAL, LITERAL_TEKS, LITERAL_LOGIKA, LITERAL_KOSONG
4. OPERATOR (+, -, *, /, %, ==, !=, <, >, <=, >=, =)
5. OPERATOR_LOGIKA (dan, atau, tidak)`
  },
  {
    jalur: 'dokumentasi/IDENTIFIER.md',
    nama: 'IDENTIFIER.md',
    kategori: 'Kaidah Pengidentifikasi',
    bahasa: 'markdown',
    ukuran: 2795,
    konten: `# Kaidah Pengidentifikasi (Identifier) Bahasa NUSANTARA

Kaidah Wajib:
- Karakter: [a-zA-Z0-9_].
- Karakter pertama WAJIB huruf atau garis bawah, TIDAK BOLEH diawali angka.
- Dilarang bentrok dengan 32 kata kunci resmi.
- Peka huruf besar dan kecil (case-sensitive).`
  },
  {
    jalur: 'dokumentasi/LITERAL.md',
    nama: 'LITERAL.md',
    kategori: 'Bentuk Literal',
    bahasa: 'markdown',
    ukuran: 2474,
    konten: `# Spesifikasi Bentuk Literal Bahasa NUSANTARA

Bentuk Literal:
- teks: "Halo Dunia"
- bilangan: 123
- desimal: 12.5
- logika: benar, salah
- kosong: kosong
- Tanda minus (-) diperlakukan sebagai operator unari negasi.`
  },
  {
    jalur: 'dokumentasi/EKSPRESI.md',
    nama: 'EKSPRESI.md',
    kategori: 'Tata Ekspresi',
    bahasa: 'markdown',
    ukuran: 2520,
    konten: `# Spesifikasi Evaluasi Ekspresi Bahasa NUSANTARA

Struktur evaluasi bertingkat bebas ambiguitas parsing leksikal.
Mendukung evaluasi hubung singkat (short-circuit evaluation) pada operator 'dan' serta 'atau'.`
  },
  {
    jalur: 'dokumentasi/PRIORITAS-OPERATOR.md',
    nama: 'PRIORITAS-OPERATOR.md',
    kategori: 'Tabel Presedensi 8 Tingkat',
    bahasa: 'markdown',
    ukuran: 2097,
    konten: `# Tabel Prioritas & Presedensi Operator Resmi Bahasa NUSANTARA

Tingkat 1 (Tertinggi): ( ) Pengelompokan
Tingkat 2: tidak, - (unari)
Tingkat 3: *, /, %
Tingkat 4: +, -
Tingkat 5: <, <=, >, >=
Tingkat 6: ==, !=
Tingkat 7: dan
Tingkat 8 (Terendah): atau`
  },
  {
    jalur: 'dokumentasi/ATURAN-BLOK.md',
    nama: 'ATURAN-BLOK.md',
    kategori: 'Aturan Blok & Kontrol Aliran',
    bahasa: 'markdown',
    ukuran: 3903,
    konten: `# Spesifikasi Aturan Blok & Struktur Kontrol Bahasa NUSANTARA

Struktur Kendali:
- jika kondisi maka ... selain ... akhir
- untuk angka dari 1 sampai 10 lakukan ... akhir (inklusif)
- selama kondisi lakukan ... akhir
- fungsi nama(parameter) : tipe mulai ... kembalikan ... selesai`
  },
  {
    jalur: 'dokumentasi/KEPUTUSAN-TERBUKA.md',
    nama: 'KEPUTUSAN-TERBUKA.md',
    kategori: 'Katalog Keputusan Terbuka',
    bahasa: 'markdown',
    ukuran: 2535,
    konten: `# Katalog Keputusan Terbuka (Open Decisions) Bahasa NUSANTARA

Topik Terbuka:
1. Aksara Nusantara & Karakter Unicode pada pengidentifikasi.
2. Format komentar banyak baris.
3. Usulan kata kunci 'selain_jika'.
4. Sintaksis formal koleksi daftar dan peta.
5. Null-safety waktu kompilasi.`
  },
  {
    jalur: 'dokumentasi/CONTOH-SINTAKS.md',
    nama: 'CONTOH-SINTAKS.md',
    kategori: 'Katalog 10 Contoh Sintaks',
    bahasa: 'markdown',
    ukuran: 4693,
    konten: `# Katalog Contoh Sintaksis Resmi Bahasa NUSANTARA

10 Contoh Acuan:
1. Halo Dunia
2. Deklarasi Variabel & Tipe Data
3. Penugasan Ulang & Konstanta tetap
4. Operasi Matematika & Presedensi
5. Percabangan Kondisional
6. Perulangan Iteratif (untuk & selama)
7. Definisi & Pemanggilan Fungsi
8. Struktur Data Koleksi daftar [RANCANGAN]
9. Struktur Data Asosiatif peta [RANCANGAN]
10. Program Kasir Gabungan Lengkap`
  },
  {
    jalur: 'pengujian/spesifikasi/kasus-valid.md',
    nama: 'kasus-valid.md',
    kategori: 'Koleksi Kasus Valid EBNF',
    bahasa: 'markdown',
    ukuran: 1707,
    konten: `# Kasus Uji Sintaksis Valid (Phase 4)`
  },
  {
    jalur: 'pengujian/spesifikasi/kasus-tidak-valid.md',
    nama: 'kasus-tidak-valid.md',
    kategori: '15 Kasus Negatif EBNF',
    bahasa: 'markdown',
    ukuran: 7781,
    konten: `# Kasus Uji Sintaksis Tidak Valid (Minimal 15 Kasus)`
  },
  {
    jalur: 'pengujian/spesifikasi/grammar-checklist.md',
    nama: 'grammar-checklist.md',
    kategori: 'Daftar Periksa EBNF',
    bahasa: 'markdown',
    ukuran: 2050,
    konten: `# Daftar Periksa Keutuhan Tata Bahasa EBNF (Grammar Checklist)`
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
  {
    jalur: 'KEAMANAN.md',
    nama: 'KEAMANAN.md',
    kategori: 'Kebijakan Keamanan',
    bahasa: 'markdown',
    ukuran: 2825,
    konten: `# Kebijakan Keamanan Proyek NUSANTARA`
  },
  {
    jalur: 'KONTRIBUSI.md',
    nama: 'KONTRIBUSI.md',
    kategori: 'Panduan Kontribusi 10 Langkah',
    bahasa: 'markdown',
    ukuran: 4318,
    konten: `# Panduan Kontribusi Bahasa Pemrograman NUSANTARA`
  },
  {
    jalur: 'KODE-ETIK.md',
    nama: 'KODE-ETIK.md',
    kategori: 'Kode Etik Komunitas',
    bahasa: 'markdown',
    ukuran: 3117,
    konten: `# Kode Etik Komunitas Pengembang NUSANTARA`
  },
  {
    jalur: 'PERUBAHAN.md',
    nama: 'PERUBAHAN.md',
    kategori: 'Catatan Rilis (Changelog)',
    bahasa: 'markdown',
    ukuran: 4063,
    konten: `# Catatan Perubahan NUSANTARA (v0.4.0, v0.3.0, v0.2.0, v0.1.0)`
  },
  {
    jalur: 'ROADMAP.md',
    nama: 'ROADMAP.md',
    kategori: 'Peta Jalan 36 Fase',
    bahasa: 'markdown',
    ukuran: 8354,
    konten: `# Peta Jalan Pengembangan (ROADMAP) Bahasa Pemrograman NUSANTARA`
  },
  {
    jalur: 'README.md',
    nama: 'README.md',
    kategori: 'Dokumentasi Utama',
    bahasa: 'markdown',
    ukuran: 3957,
    konten: `# NUSANTARA (Phase 4: Spesifikasi Sintaks EBNF Selesai - v0.4.0)`
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
  { fase: 4, nama: 'Spesifikasi Sintaks (EBNF)', versi: 'v0.4.0', kategori: 'Fondasi', status: 'Selesai' },
  { fase: 5, nama: 'Dokumentasi Awal', versi: 'v0.5.0', kategori: 'Fondasi', status: 'Berikutnya' },
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
