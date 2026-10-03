/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PosisiSumber } from '../lexer/posisi';
import {
  NilaiRuntime,
  JenisNilaiRuntime,
  buatBilangan,
  buatDesimal,
  buatTeks,
  buatLogika,
  formatNilaiTeks,
} from '../interpreter/nilai';
import { GalatRuntime, JenisGalatRuntime } from '../interpreter/galat';

/**
 * Evaluasi Operator Unari NUSANTARA (Phase 10).
 * Mendukung operator unari:
 * - `-` (Negasi Numerik: bilangan / desimal)
 * - `tidak` (Negasi Logika: logika)
 */
export function evaluasiOperasiUnari(
  op: string,
  argumen: NilaiRuntime,
  posisi?: PosisiSumber,
  tumpukanPanggilan: string[] = []
): NilaiRuntime {
  if (op === '-') {
    if (argumen.jenis === JenisNilaiRuntime.BILANGAN) {
      return buatBilangan(-argumen.nilai);
    }
    if (argumen.jenis === JenisNilaiRuntime.DESIMAL) {
      return buatDesimal(-argumen.nilai);
    }
    throw new GalatRuntime(
      JenisGalatRuntime.OPERASI_TIPE_TIDAK_VALID,
      `Operator unari '-' hanya dapat digunakan pada bilangan atau desimal, bukan '${argumen.jenis}'.`,
      posisi,
      tumpukanPanggilan
    );
  }

  if (op === 'tidak') {
    if (argumen.jenis === JenisNilaiRuntime.LOGIKA) {
      return buatLogika(!argumen.nilai);
    }
    throw new GalatRuntime(
      JenisGalatRuntime.OPERASI_TIPE_TIDAK_VALID,
      `Operator unari 'tidak' hanya dapat digunakan pada nilai logika (benar/salah), bukan '${argumen.jenis}'.`,
      posisi,
      tumpukanPanggilan
    );
  }

  throw new GalatRuntime(
    JenisGalatRuntime.OPERASI_TIPE_TIDAK_VALID,
    `Operator unari '${op}' tidak dikenal atau tidak didukung dalam bahasa NUSANTARA.`,
    posisi,
    tumpukanPanggilan
  );
}

/**
 * Evaluasi Operator Biner NUSANTARA (Phase 10).
 * Mendukung:
 * - Aritmatika: `+`, `-`, `*`, `/`, `%`
 * - Perbandingan: `==`, `!=`, `<`, `>`, `<=`, `>=`
 * - Logika (non-short-circuit fallback): `dan`, `atau`
 */
export function evaluasiOperasiBiner(
  op: string,
  kiri: NilaiRuntime,
  kanan: NilaiRuntime,
  posisi?: PosisiSumber,
  tumpukanPanggilan: string[] = []
): NilaiRuntime {
  // 1. Operasi Penjumlahan & Penggabungan Teks (+)
  if (op === '+') {
    if (kiri.jenis === JenisNilaiRuntime.TEKS || kanan.jenis === JenisNilaiRuntime.TEKS) {
      return buatTeks(formatNilaiTeks(kiri) + formatNilaiTeks(kanan));
    }
    if (kiri.jenis === JenisNilaiRuntime.BILANGAN && kanan.jenis === JenisNilaiRuntime.BILANGAN) {
      return buatBilangan(kiri.nilai + kanan.nilai);
    }
    if (
      (kiri.jenis === JenisNilaiRuntime.BILANGAN || kiri.jenis === JenisNilaiRuntime.DESIMAL) &&
      (kanan.jenis === JenisNilaiRuntime.BILANGAN || kanan.jenis === JenisNilaiRuntime.DESIMAL)
    ) {
      return buatDesimal(kiri.nilai + kanan.nilai);
    }
  }

  // 2. Operasi Pengurangan (-)
  if (op === '-') {
    if (kiri.jenis === JenisNilaiRuntime.BILANGAN && kanan.jenis === JenisNilaiRuntime.BILANGAN) {
      return buatBilangan(kiri.nilai - kanan.nilai);
    }
    if (
      (kiri.jenis === JenisNilaiRuntime.BILANGAN || kiri.jenis === JenisNilaiRuntime.DESIMAL) &&
      (kanan.jenis === JenisNilaiRuntime.BILANGAN || kanan.jenis === JenisNilaiRuntime.DESIMAL)
    ) {
      return buatDesimal(kiri.nilai - kanan.nilai);
    }
  }

  // 3. Operasi Perkalian (*)
  if (op === '*') {
    if (kiri.jenis === JenisNilaiRuntime.BILANGAN && kanan.jenis === JenisNilaiRuntime.BILANGAN) {
      return buatBilangan(kiri.nilai * kanan.nilai);
    }
    if (
      (kiri.jenis === JenisNilaiRuntime.BILANGAN || kiri.jenis === JenisNilaiRuntime.DESIMAL) &&
      (kanan.jenis === JenisNilaiRuntime.BILANGAN || kanan.jenis === JenisNilaiRuntime.DESIMAL)
    ) {
      return buatDesimal(kiri.nilai * kanan.nilai);
    }
  }

  // 4. Operasi Pembagian (/): Menangani Pembagian dengan Nol Secara Aman
  if (op === '/') {
    if (
      (kiri.jenis === JenisNilaiRuntime.BILANGAN || kiri.jenis === JenisNilaiRuntime.DESIMAL) &&
      (kanan.jenis === JenisNilaiRuntime.BILANGAN || kanan.jenis === JenisNilaiRuntime.DESIMAL)
    ) {
      if (kanan.nilai === 0) {
        throw new GalatRuntime(
          JenisGalatRuntime.PEMBAGIAN_NOL,
          'Kesalahan runtime: pembagian dengan nol tidak diperbolehkan.',
          posisi,
          tumpukanPanggilan
        );
      }
      return buatDesimal(kiri.nilai / kanan.nilai);
    }
  }

  // 5. Operasi Modulo (%): Menangani Modulo dengan Nol Secara Aman
  if (op === '%') {
    if (kiri.jenis === JenisNilaiRuntime.BILANGAN && kanan.jenis === JenisNilaiRuntime.BILANGAN) {
      if (kanan.nilai === 0) {
        throw new GalatRuntime(
          JenisGalatRuntime.PEMBAGIAN_NOL,
          'Kesalahan runtime: operasi modulo dengan nol tidak diperbolehkan.',
          posisi,
          tumpukanPanggilan
        );
      }
      return buatBilangan(kiri.nilai % kanan.nilai);
    }
  }

  // 6. Operasi Perbandingan Kesetaraan (==, !=)
  if (op === '==') {
    if (kiri.jenis !== kanan.jenis) {
      // Kesetaraan angka numerik antara bilangan dan desimal: 5 == 5.0 bernilai benar
      if (
        (kiri.jenis === JenisNilaiRuntime.BILANGAN || kiri.jenis === JenisNilaiRuntime.DESIMAL) &&
        (kanan.jenis === JenisNilaiRuntime.BILANGAN || kanan.jenis === JenisNilaiRuntime.DESIMAL)
      ) {
        return buatLogika(kiri.nilai === kanan.nilai);
      }
      return buatLogika(false);
    }
    return buatLogika((kiri as any).nilai === (kanan as any).nilai);
  }

  if (op === '!=') {
    if (kiri.jenis !== kanan.jenis) {
      if (
        (kiri.jenis === JenisNilaiRuntime.BILANGAN || kiri.jenis === JenisNilaiRuntime.DESIMAL) &&
        (kanan.jenis === JenisNilaiRuntime.BILANGAN || kanan.jenis === JenisNilaiRuntime.DESIMAL)
      ) {
        return buatLogika(kiri.nilai !== kanan.nilai);
      }
      return buatLogika(true);
    }
    return buatLogika((kiri as any).nilai !== (kanan as any).nilai);
  }

  // 7. Operasi Perbandingan Relasional (<, <=, >, >=)
  if (op === '<' || op === '<=' || op === '>' || op === '>=') {
    if (
      (kiri.jenis === JenisNilaiRuntime.BILANGAN || kiri.jenis === JenisNilaiRuntime.DESIMAL) &&
      (kanan.jenis === JenisNilaiRuntime.BILANGAN || kanan.jenis === JenisNilaiRuntime.DESIMAL)
    ) {
      switch (op) {
        case '<':
          return buatLogika(kiri.nilai < kanan.nilai);
        case '<=':
          return buatLogika(kiri.nilai <= kanan.nilai);
        case '>':
          return buatLogika(kiri.nilai > kanan.nilai);
        case '>=':
          return buatLogika(kiri.nilai >= kanan.nilai);
      }
    }

    if (kiri.jenis === JenisNilaiRuntime.TEKS && kanan.jenis === JenisNilaiRuntime.TEKS) {
      switch (op) {
        case '<':
          return buatLogika(kiri.nilai < kanan.nilai);
        case '<=':
          return buatLogika(kiri.nilai <= kanan.nilai);
        case '>':
          return buatLogika(kiri.nilai > kanan.nilai);
        case '>=':
          return buatLogika(kiri.nilai >= kanan.nilai);
      }
    }
  }

  // 8. Operasi Logika Evaluasi Langsung (dan, atau)
  if (op === 'dan') {
    if (kiri.jenis === JenisNilaiRuntime.LOGIKA && kanan.jenis === JenisNilaiRuntime.LOGIKA) {
      return buatLogika(kiri.nilai && kanan.nilai);
    }
    throw new GalatRuntime(
      JenisGalatRuntime.OPERASI_TIPE_TIDAK_VALID,
      `Operator 'dan' membutuhkan operan bertipe logika, tetapi ditemukan '${kiri.jenis}' dan '${kanan.jenis}'.`,
      posisi,
      tumpukanPanggilan
    );
  }

  if (op === 'atau') {
    if (kiri.jenis === JenisNilaiRuntime.LOGIKA && kanan.jenis === JenisNilaiRuntime.LOGIKA) {
      return buatLogika(kiri.nilai || kanan.nilai);
    }
    throw new GalatRuntime(
      JenisGalatRuntime.OPERASI_TIPE_TIDAK_VALID,
      `Operator 'atau' membutuhkan operan bertipe logika, tetapi ditemukan '${kiri.jenis}' dan '${kanan.jenis}'.`,
      posisi,
      tumpukanPanggilan
    );
  }

  throw new GalatRuntime(
    JenisGalatRuntime.OPERASI_TIPE_TIDAK_VALID,
    `Operator '${op}' tidak dapat digunakan antara tipe '${kiri.jenis}' dan '${kanan.jenis}'.`,
    posisi,
    tumpukanPanggilan
  );
}
