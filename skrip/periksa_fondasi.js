/**
 * Skrip Pemeriksaan Kepatuhan Fondasi Phase 1 NUSANTARA
 * Digunakan untuk memvalidasi integritas repositori sebelum rilis v0.1.0 atau penggabungan PR.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const berkasWajib = [
  // Berkas Utama Root
  { berkas: 'README.md', kategori: 'Dokumentasi Utama' },
  { berkas: 'LISENSI', kategori: 'Tata Kelola Hukum' },
  { berkas: 'KONTRIBUSI.md', kategori: 'Pedoman Komunitas' },
  { berkas: 'KODE-ETIK.md', kategori: 'Etika Komunitas' },
  { berkas: 'PERUBAHAN.md', kategori: 'Catatan Rilis (Changelog)' },
  { berkas: 'ROADMAP.md', kategori: 'Peta Jalan 36 Fase' },
  { berkas: '.gitignore', kategori: 'Konfigurasi Git' },

  // Dokumentasi Khusus
  { berkas: 'dokumentasi/README.md', kategori: 'Indeks Dokumentasi' },
  { berkas: 'dokumentasi/prinsip-desain.md', kategori: 'Filosofi Desain' },
  { berkas: 'dokumentasi/arsitektur-kompilator.md', kategori: 'Arsitektur Kompilator' },
  { berkas: 'dokumentasi/panduan-github.md', kategori: 'Panduan Operasional GitHub' },
  { berkas: 'dokumentasi/nip/NIP-0001.md', kategori: 'Proposal Fondasi NIP-0001' },

  // Berkas Contoh Kode Sumber .nusantara
  { berkas: 'contoh/README.md', kategori: 'Indeks Contoh' },
  { berkas: 'contoh/01_halo.nusantara', kategori: 'Kode Contoh: Halo Dunia' },
  { berkas: 'contoh/02_data.nusantara', kategori: 'Kode Contoh: Variabel & Tipe' },
  { berkas: 'contoh/03_kondisi.nusantara', kategori: 'Kode Contoh: Percabangan' },
  { berkas: 'contoh/04_perulangan.nusantara', kategori: 'Kode Contoh: Perulangan' },
  { berkas: 'contoh/05_fungsi.nusantara', kategori: 'Kode Contoh: Fungsi' },

  // Folder Pengujian & Arsitektur
  { berkas: 'pengujian/README.md', kategori: 'Kerangka Pengujian' },
  { berkas: 'kompilator/README.md', kategori: 'Peta Kompilator' },
  { berkas: 'runtime/README.md', kategori: 'Peta Runtime' },
  { berkas: 'standar/README.md', kategori: 'Peta Pustaka Standar' },
  { berkas: 'pustaka/README.md', kategori: 'Peta Pustaka Ekosistem' },
  { berkas: 'kerangka/README.md', kategori: 'Peta Kerangka Kerja' },
  { berkas: 'alat/README.md', kategori: 'Peta Perkakas' },
  { berkas: 'ide/README.md', kategori: 'Peta Dukungan IDE' },
  { berkas: 'skrip/README.md', kategori: 'Skrip Pemeliharaan' },
];

console.log('===========================================================');
console.log('PEMERIKSAAN INTEGRITAS FONDASI BAHASA PEMROGRAMAN NUSANTARA');
console.log('Fase 1: Identitas & Fondasi (Target Versi: v0.1.0)');
console.log('===========================================================\n');

let jumlahLulus = 0;
let jumlahGagal = 0;

for (const item of berkasWajib) {
  const lokasi = path.join(rootDir, item.berkas);
  if (fs.existsSync(lokasi)) {
    const stats = fs.statSync(lokasi);
    console.log(`[✓ LULUS] ${item.berkas.padEnd(38)} | ${item.kategori} (${stats.size} byte)`);
    jumlahLulus++;
  } else {
    console.error(`[✗ GAGAL] ${item.berkas.padEnd(38)} | Berkas tidak ditemukan!`);
    jumlahGagal++;
  }
}

console.log('\n-----------------------------------------------------------');
console.log(`Hasil Evaluasi: ${jumlahLulus} berkas LULUS, ${jumlahGagal} berkas GAGAL.`);
console.log('-----------------------------------------------------------');

if (jumlahGagal === 0) {
  console.log('STATUS: SELURUH FONDASI PHASE 1 LENGKAP DAN TERVERIFIKASI.');
  console.log('Repositori siap untuk ditandai tag v0.1.0 dan diterbitkan ke GitHub.');
  process.exit(0);
} else {
  console.error('STATUS: TERDAPAT BERKAS FONDASI YANG HILANG. PERBAIKI SEBELUM MERILIS.');
  process.exit(1);
}
