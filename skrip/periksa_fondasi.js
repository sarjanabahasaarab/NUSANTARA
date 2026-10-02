/**
 * Skrip Pemeriksaan Kepatuhan Konstitusi & Spesifikasi NUSANTARA
 * Digunakan untuk memvalidasi integritas repositori Phase 1 & Phase 2 (v0.2.0).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const berkasWajib = [
  // Berkas Utama Root
  { berkas: 'README.md', kategori: 'Dokumentasi Utama', fase: 'Phase 1 & 2' },
  { berkas: 'LISENSI', kategori: 'Tata Kelola Hukum', fase: 'Phase 1' },
  { berkas: 'KONTRIBUSI.md', kategori: 'Pedoman Komunitas', fase: 'Phase 1' },
  { berkas: 'KODE-ETIK.md', kategori: 'Etika Komunitas', fase: 'Phase 1' },
  { berkas: 'PERUBAHAN.md', kategori: 'Catatan Rilis (Changelog)', fase: 'Phase 1 & 2' },
  { berkas: 'ROADMAP.md', kategori: 'Peta Jalan 36 Fase', fase: 'Phase 1 & 2' },
  { berkas: '.gitignore', kategori: 'Konfigurasi Git', fase: 'Phase 1' },

  // Dokumentasi Konstitusi Resmi (Phase 2)
  { berkas: 'dokumentasi/KONSTITUSI-BAHASA.md', kategori: 'Konstitusi Bahasa', fase: 'Phase 2' },
  { berkas: 'dokumentasi/KEYWORD.md', kategori: 'Tabel 32 Kata Kunci', fase: 'Phase 2' },
  { berkas: 'dokumentasi/TIPE-DATA.md', kategori: 'Spesifikasi Tipe Data', fase: 'Phase 2' },
  { berkas: 'dokumentasi/OPERATOR.md', kategori: 'Klasifikasi Operator', fase: 'Phase 2' },
  { berkas: 'dokumentasi/ATURAN-PENAMAAN.md', kategori: 'Kaidah Penamaan & Komentar', fase: 'Phase 2' },
  { berkas: 'dokumentasi/PESAN-KESALAHAN.md', kategori: 'Standar Pesan Kesalahan', fase: 'Phase 2' },
  { berkas: 'dokumentasi/KOMPATIBILITAS.md', kategori: 'Kebijakan Kompatibilitas', fase: 'Phase 2' },
  { berkas: 'dokumentasi/nip/NIP-0002.md', kategori: 'Proposal Konstitusi NIP-0002', fase: 'Phase 2' },

  // Pengujian Spesifikasi (Phase 2)
  { berkas: 'pengujian/spesifikasi/README.md', kategori: 'Indeks Uji Spesifikasi', fase: 'Phase 2' },
  { berkas: 'pengujian/spesifikasi/program-valid.nusantara', kategori: 'Kode Uji Program Valid', fase: 'Phase 2' },
  { berkas: 'pengujian/spesifikasi/program-tidak-valid.md', kategori: 'Katalog Kasus Tak Valid', fase: 'Phase 2' },

  // Dokumentasi Fondasi Khusus (Phase 1)
  { berkas: 'dokumentasi/README.md', kategori: 'Indeks Dokumentasi', fase: 'Phase 1 & 2' },
  { berkas: 'dokumentasi/prinsip-desain.md', kategori: 'Filosofi Desain', fase: 'Phase 1' },
  { berkas: 'dokumentasi/arsitektur-kompilator.md', kategori: 'Arsitektur Kompilator', fase: 'Phase 1' },
  { berkas: 'dokumentasi/panduan-github.md', kategori: 'Panduan Operasional GitHub', fase: 'Phase 1' },
  { berkas: 'dokumentasi/nip/NIP-0001.md', kategori: 'Proposal Fondasi NIP-0001', fase: 'Phase 1' },

  // Berkas Contoh Kode Sumber .nusantara
  { berkas: 'contoh/README.md', kategori: 'Indeks Contoh', fase: 'Phase 1' },
  { berkas: 'contoh/01_halo.nusantara', kategori: 'Kode Contoh: Halo Dunia', fase: 'Phase 1' },
  { berkas: 'contoh/02_data.nusantara', kategori: 'Kode Contoh: Variabel & Tipe', fase: 'Phase 1' },
  { berkas: 'contoh/03_kondisi.nusantara', kategori: 'Kode Contoh: Percabangan', fase: 'Phase 1' },
  { berkas: 'contoh/04_perulangan.nusantara', kategori: 'Kode Contoh: Perulangan', fase: 'Phase 1' },
  { berkas: 'contoh/05_fungsi.nusantara', kategori: 'Kode Contoh: Fungsi', fase: 'Phase 1' },

  // Folder Pengujian & Arsitektur
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
console.log('PEMERIKSAAN KEPATUHAN KONSTITUSI & SPESIFIKASI BAHASA NUSANTARA');
console.log('Target Milestone: Phase 2 — Konstitusi Bahasa (v0.2.0)');
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
    console.error(`[✗ GAGAL] ${item.berkas.padEnd(46)} | BERKAS HILANG!`);
    jumlahGagal++;
  }
}

console.log('\n-----------------------------------------------------------------------------');
console.log(`Hasil Evaluasi: ${jumlahLulus} berkas LULUS, ${jumlahGagal} berkas GAGAL.`);
console.log('-----------------------------------------------------------------------------');

if (jumlahGagal === 0) {
  console.log('STATUS: SELURUH SPESIFIKASI KONSTITUSI PHASE 2 LENGKAP DAN TERVERIFIKASI.');
  console.log('Repositori siap untuk milestone v0.2.0 (feat: tetapkan konstitusi bahasa NUSANTARA).');
  process.exit(0);
} else {
  console.error('STATUS: TERDAPAT BERKAS SPESIFIKASI YANG HILANG. PERBAIKI SEBELUM MELANJUTKAN.');
  process.exit(1);
}
