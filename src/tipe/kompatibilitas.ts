/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { NamaTipe } from './jenisTipe';

/**
 * Memeriksa apakah dua jenis tipe identik secara eksak (Type Equality).
 */
export function apakahTipeSama(a: string | NamaTipe, b: string | NamaTipe): boolean {
  return a === b;
}

/**
 * Memeriksa kompatibilitas penugasan nilai ke target variabel/parameter (Type Compatibility).
 * NUSANTARA menganut sistem pengetikan statis aman (strict & type-safe).
 * Tidak ada konversi implisit silang yang tidak disengaja (misal string ke number).
 */
export function apakahKompatibel(target: string | NamaTipe, aktual: string | NamaTipe): boolean {
  // 1. Tipe identik selalu kompatibel
  if (target === aktual) return true;

  // 2. Tipe internal 'apapun' menerima semua jenis tipe data
  if (target === NamaTipe.APAPUN) return true;

  // 3. Ketat: 'bilangan' tidak otomatis menerima 'desimal' atau 'teks'
  // Nilai 'kosong' hanya diizinkan jika target secara eksplisit adalah 'kosong'
  return false;
}

/**
 * Menentukan tipe hasil dari operasi biner berdasarkan tipe kedua operan.
 */
export function tentukanTipeOperasiBiner(
  operator: string,
  tipeKiri: NamaTipe,
  tipeKanan: NamaTipe
): NamaTipe | null {
  // 1. Penjumlahan & Konkatenasi
  if (operator === '+') {
    if (tipeKiri === NamaTipe.TEKS || tipeKanan === NamaTipe.TEKS) {
      return NamaTipe.TEKS;
    }
    if (tipeKiri === NamaTipe.BILANGAN && tipeKanan === NamaTipe.BILANGAN) {
      return NamaTipe.BILANGAN;
    }
    if (
      (tipeKiri === NamaTipe.BILANGAN || tipeKiri === NamaTipe.DESIMAL) &&
      (tipeKanan === NamaTipe.BILANGAN || tipeKanan === NamaTipe.DESIMAL)
    ) {
      return NamaTipe.DESIMAL;
    }
  }

  // 2. Pengurangan & Perkalian
  if (operator === '-' || operator === '*') {
    if (tipeKiri === NamaTipe.BILANGAN && tipeKanan === NamaTipe.BILANGAN) {
      return NamaTipe.BILANGAN;
    }
    if (
      (tipeKiri === NamaTipe.BILANGAN || tipeKiri === NamaTipe.DESIMAL) &&
      (tipeKanan === NamaTipe.BILANGAN || tipeKanan === NamaTipe.DESIMAL)
    ) {
      return NamaTipe.DESIMAL;
    }
  }

  // 3. Pembagian (/): bilangan / bilangan menghasilkan bilangan, desimal menghasilkan desimal
  if (operator === '/') {
    if (tipeKiri === NamaTipe.BILANGAN && tipeKanan === NamaTipe.BILANGAN) {
      return NamaTipe.BILANGAN;
    }
    if (
      (tipeKiri === NamaTipe.BILANGAN || tipeKiri === NamaTipe.DESIMAL) &&
      (tipeKanan === NamaTipe.BILANGAN || tipeKanan === NamaTipe.DESIMAL)
    ) {
      return NamaTipe.DESIMAL;
    }
  }

  // 4. Modulo (hanya untuk bilangan bulat)
  if (operator === '%') {
    if (tipeKiri === NamaTipe.BILANGAN && tipeKanan === NamaTipe.BILANGAN) {
      return NamaTipe.BILANGAN;
    }
  }

  // 5. Perbandingan Kesetaraan (==, !=)
  if (operator === '==' || operator === '!=') {
    return NamaTipe.LOGIKA;
  }

  // 6. Perbandingan Relasional (<, <=, >, >=)
  if (operator === '<' || operator === '<=' || operator === '>' || operator === '>=') {
    if (
      (tipeKiri === NamaTipe.BILANGAN || tipeKiri === NamaTipe.DESIMAL) &&
      (tipeKanan === NamaTipe.BILANGAN || tipeKanan === NamaTipe.DESIMAL)
    ) {
      return NamaTipe.LOGIKA;
    }
    if (tipeKiri === NamaTipe.TEKS && tipeKanan === NamaTipe.TEKS) {
      return NamaTipe.LOGIKA;
    }
  }

  // 7. Logika (dan, atau)
  if (operator === 'dan' || operator === 'atau') {
    if (tipeKiri === NamaTipe.LOGIKA && tipeKanan === NamaTipe.LOGIKA) {
      return NamaTipe.LOGIKA;
    }
  }

  return null; // Operasi tidak diizinkan / tidak kompatibel
}
