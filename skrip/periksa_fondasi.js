/**
 * Skrip Pemeriksaan Kepatuhan Repositori Bahasa NUSANTARA
 * Memvalidasi integritas seluruh berkas Phase 1, Phase 2, dan Phase 3 (v0.3.0).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const berkasWajib = [
  // --- TATA KELOLA & LISENSI UTAMA (Phase 3 & Root) ---
  { berkas: 'README.md', kategori: 'Dokumentasi Utama', fase: 'Phase 1-3' },
  { berkas: 'LISENSI', kategori: 'Teks Apache License 2.0', fase: 'Phase 3' },
  { berkas: 'TATA-KELOLA.md', kategori: 'Struktur 5 Peran Komunitas', fase: 'Phase 3' },
  { berkas: 'KEAMANAN.md', kategori: 'Kebijakan Keamanan', fase: 'Phase 3' },
  { berkas: 'KONTRIBUSI.md', kategori: 'Panduan Kontribusi 10 Langkah', fase: 'Phase 1-3' },
  { berkas: 'KODE-ETIK.md', kategori: 'Kode Etik Komunitas', fase: 'Phase 1-3' },
  { berkas: 'PERUBAHAN.md', kategori: 'Catatan Rilis (Changelog)', fase: 'Phase 1-3' },
  { berkas: 'ROADMAP.md', kategori: 'Peta Jalan 36 Fase', fase: 'Phase 1-3' },
  { berkas: '.gitignore', kategori: 'Konfigurasi Git', fase: 'Phase 1' },

  // --- TEMPLAT GITHUB (Phase 3) ---
  { berkas: '.github/ISSUE_TEMPLATE/bug.md', kategori: 'Templat Laporan Kutu', fase: 'Phase 3' },
  { berkas: '.github/ISSUE_TEMPLATE/fitur.md', kategori: 'Templat Usulan Fitur', fase: 'Phase 3' },
  { berkas: '.github/ISSUE_TEMPLATE/dokumentasi.md', kategori: 'Templat Isu Dokumentasi', fase: 'Phase 3' },
  { berkas: '.github/ISSUE_TEMPLATE/pertanyaan.md', kategori: 'Templat Diskusi & Tanya', fase: 'Phase 3' },
  { berkas: '.github/PULL_REQUEST_TEMPLATE.md', kategori: 'Templat Pull Request', fase: 'Phase 3' },

  // --- DOKUMENTASI TATA KELOLA & KEBIJAKAN (Phase 3) ---
  { berkas: 'dokumentasi/LISENSI.md', kategori: 'Panduan Lisensi Apache 2.0', fase: 'Phase 3' },
  { berkas: 'dokumentasi/KEBIJAKAN-LISENSI.md', kategori: 'Kebijakan Dependensi & Aset', fase: 'Phase 3' },
  { berkas: 'dokumentasi/KEBIJAKAN-RILIS.md', kategori: 'Kebijakan Versi & Rilis', fase: 'Phase 3' },
  { berkas: 'dokumentasi/TEMPLATE-RELEASE.md', kategori: 'Templat GitHub Release', fase: 'Phase 3' },
  { berkas: 'dokumentasi/PENGATURAN-GITHUB.md', kategori: 'Panduan Konfigurasi GitHub', fase: 'Phase 3' },
  { berkas: 'dokumentasi/NIP/PROSES-NIP.md', kategori: 'Alur 7 Tahapan NIP', fase: 'Phase 3' },
  { berkas: 'dokumentasi/NIP/TEMPLATE-NIP.md', kategori: 'Format Templat NIP', fase: 'Phase 3' },

  // --- DOKUMENTASI KONSTITUSI & SPESIFIKASI (Phase 2) ---
  { berkas: 'dokumentasi/KONSTITUSI-BAHASA.md', kategori: 'Konstitusi Bahasa', fase: 'Phase 2' },
  { berkas: 'dokumentasi/KEYWORD.md', kategori: 'Tabel 32 Kata Kunci', fase: 'Phase 2' },
  { berkas: 'dokumentasi/TIPE-DATA.md', kategori: 'Spesifikasi Tipe Data', fase: 'Phase 2' },
  { berkas: 'dokumentasi/OPERATOR.md', kategori: 'Klasifikasi Operator', fase: 'Phase 2' },
  { berkas: 'dokumentasi/ATURAN-PENAMAAN.md', kategori: 'Kaidah Penamaan & Komentar', fase: 'Phase 2' },
  { berkas: 'dokumentasi/PESAN-KESALAHAN.md', kategori: 'Standar Pesan Galat', fase: 'Phase 2' },
  { berkas: 'dokumentasi/KOMPATIBILITAS.md', kategori: 'Kebijakan Kompatibilitas', fase: 'Phase 2' },
  { berkas: 'dokumentasi/nip/NIP-0002.md', kategori: 'Proposal NIP-0002', fase: 'Phase 2' },

  // --- PENGUJIAN SPESIFIKASI (Phase 2) ---
  { berkas: 'pengujian/spesifikasi/README.md', kategori: 'Indeks Uji Spesifikasi', fase: 'Phase 2' },
  { berkas: 'pengujian/spesifikasi/program-valid.nusantara', kategori: 'Kode Uji Program Valid', fase: 'Phase 2' },
  { berkas: 'pengujian/spesifikasi/program-tidak-valid.md', kategori: 'Katalog Kasus Tak Valid', fase: 'Phase 2' },

  // --- FONDASI & IDENTITAS (Phase 1) ---
  { berkas: 'dokumentasi/README.md', kategori: 'Indeks Dokumentasi', fase: 'Phase 1-3' },
  { berkas: 'dokumentasi/prinsip-desain.md', kategori: 'Filosofi Desain', fase: 'Phase 1' },
  { berkas: 'dokumentasi/arsitektur-kompilator.md', kategori: 'Arsitektur Kompilator', fase: 'Phase 1' },
  { berkas: 'dokumentasi/panduan-github.md', kategori: 'Panduan Operasional GitHub', fase: 'Phase 1' },
  { berkas: 'dokumentasi/nip/NIP-0001.md', kategori: 'Proposal NIP-0001', fase: 'Phase 1' },

  // --- KODE SUMBER CONTOH .nusantara ---
  { berkas: 'contoh/README.md', kategori: 'Indeks Contoh Acuan', fase: 'Phase 1' },
  { berkas: 'contoh/01_halo.nusantara', kategori: 'Kode Contoh: Halo Dunia', fase: 'Phase 1' },
  { berkas: 'contoh/02_data.nusantara', kategori: 'Kode Contoh: Variabel & Tipe', fase: 'Phase 1' },
  { berkas: 'contoh/03_kondisi.nusantara', kategori: 'Kode Contoh: Percabangan', fase: 'Phase 1' },
  { berkas: 'contoh/04_perulangan.nusantara', kategori: 'Kode Contoh: Perulangan', fase: 'Phase 1' },
  { berkas: 'contoh/05_fungsi.nusantara', kategori: 'Kode Contoh: Fungsi', fase: 'Phase 1' },

  // --- PETA ARSITEKTUR KOMPILATOR & PERKAKAS ---
  { berkas: 'pengujian/README.md', kategori: 'Kerangka Pengujian', fase: 'Phase 1' },
  { berkas: 'kompilator/README.md', kategori: 'Peta Kompilator', fase: 'Phase 1' },
  { berkas: 'runtime/README.md', kategori: 'Peta Runtime', fase: 'Phase 1' },
  { berkas: 'standar/README.md', kategori: 'Peta Pustaka Standar', fase: 'Phase 1' },
  { berkas: 'pustaka/README.md', kategori: 'Peta Pustaka Ekosistem', fase: 'Phase 1' },
  { berkas: 'kerangka/README.md', kategori: 'Peta Kerangka Kerja', fase: 'Phase 1' },
  { berkas: 'alat/README.md', kategori: 'Peta Perkakas', fase: 'Phase 1' },
  { berkas: 'ide/README.md', kategori: 'Peta Dukungan IDE', fase: 'Phase 1' },
  { berkas: 'skrip/README.md', kategori: 'Skrip Pemeliharaan', fase: 'Phase 1' },
];

console.log('=============================================================================');
console.log('PEMERIKSAAN KEPATUHAN LISENSI, TATA KELOLA & SPESIFIKASI BAHASA NUSANTARA');
console.log('Target Milestone: Phase 3 — Lisensi & Tata Kelola (v0.3.0)');
console.log('=============================================================================\n');

let jumlahLulus = 0;
let jumlahGagal = 0;

for (const item of berkasWajib) {
  const lokasi = path.join(rootDir, item.berkas);
  if (fs.existsSync(lokasi)) {
    const stats = fs.statSync(lokasi);
    console.log(`[✓ LULUS] ${item.berkas.padEnd(46)} | ${item.kategori.padEnd(28)} | ${item.fase} (${stats.size} B)`);
    jumlahLulus++;
  } else {
    console.error(`[✗ GAGAL] ${item.berkas.padEnd(46)} | BERKAS TIDAK DITEMUKAN!`);
    jumlahGagal++;
  }
}

console.log('\n-----------------------------------------------------------------------------');
console.log(`Hasil Evaluasi: ${jumlahLulus} berkas LULUS, ${jumlahGagal} berkas GAGAL.`);
console.log('-----------------------------------------------------------------------------');

if (jumlahGagal === 0) {
  console.log('STATUS: SELURUH STRUKTUR LISENSI, TATA KELOLA, DAN SPESIFIKASI LENGKAP.');
  console.log('Repositori siap untuk milestone v0.3.0 (feat: tetapkan lisensi dan tata kelola NUSANTARA).');
  process.exit(0);
} else {
  console.error('STATUS: TERDAPAT BERKAS RESMI YANG HILANG. PERIKSA KEMBALI SEBELUM COMMIT.');
  process.exit(1);
}
