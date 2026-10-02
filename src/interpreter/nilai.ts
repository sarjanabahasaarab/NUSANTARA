/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { NodeDeklarasiFungsi } from '../parser/ast';
import { Lingkungan } from './environment';

export enum JenisNilaiRuntime {
  TEKS = 'teks',
  BILANGAN = 'bilangan',
  DESIMAL = 'desimal',
  LOGIKA = 'logika',
  KOSONG = 'kosong',
  FUNGSI = 'fungsi',
  FUNGSI_BAWAAN = 'fungsi_bawaan',
}

export interface NilaiTeks {
  jenis: JenisNilaiRuntime.TEKS;
  nilai: string;
}

export interface NilaiBilangan {
  jenis: JenisNilaiRuntime.BILANGAN;
  nilai: number; // Disimpan sebagai integer matematis
}

export interface NilaiDesimal {
  jenis: JenisNilaiRuntime.DESIMAL;
  nilai: number; // Disimpan sebagai pecahan float
}

export interface NilaiLogika {
  jenis: JenisNilaiRuntime.LOGIKA;
  nilai: boolean;
}

export interface NilaiKosong {
  jenis: JenisNilaiRuntime.KOSONG;
  nilai: null;
}

export type FungsiEksekutorBawaan = (argumen: NilaiRuntime[]) => NilaiRuntime;

export interface NilaiFungsiBawaan {
  jenis: JenisNilaiRuntime.FUNGSI_BAWAAN;
  nama: string;
  eksekusi: FungsiEksekutorBawaan;
}

export interface NilaiFungsiPengguna {
  jenis: JenisNilaiRuntime.FUNGSI;
  deklarasi: NodeDeklarasiFungsi;
  lingkunganPenutup: Lingkungan;
}

export type NilaiRuntime =
  | NilaiTeks
  | NilaiBilangan
  | NilaiDesimal
  | NilaiLogika
  | NilaiKosong
  | NilaiFungsiPengguna
  | NilaiFungsiBawaan;

// ============================================================================
// FUNGSI PEMBANTU (HELPERS)
// ============================================================================

export function buatTeks(nilai: string): NilaiTeks {
  return { jenis: JenisNilaiRuntime.TEKS, nilai };
}

export function buatBilangan(nilai: number): NilaiBilangan {
  return { jenis: JenisNilaiRuntime.BILANGAN, nilai: Math.trunc(nilai) };
}

export function buatDesimal(nilai: number): NilaiDesimal {
  return { jenis: JenisNilaiRuntime.DESIMAL, nilai };
}

export function buatLogika(nilai: boolean): NilaiLogika {
  return { jenis: JenisNilaiRuntime.LOGIKA, nilai };
}

export function buatKosong(): NilaiKosong {
  return { jenis: JenisNilaiRuntime.KOSONG, nilai: null };
}

export function formatNilaiTeks(nilai: NilaiRuntime): string {
  switch (nilai.jenis) {
    case JenisNilaiRuntime.TEKS:
      return nilai.nilai;
    case JenisNilaiRuntime.BILANGAN:
      return nilai.nilai.toString();
    case JenisNilaiRuntime.DESIMAL:
      return nilai.nilai.toString();
    case JenisNilaiRuntime.LOGIKA:
      return nilai.nilai ? 'benar' : 'salah';
    case JenisNilaiRuntime.KOSONG:
      return 'kosong';
    case JenisNilaiRuntime.FUNGSI:
      return `<fungsi ${nilai.deklarasi.nama}>`;
    case JenisNilaiRuntime.FUNGSI_BAWAAN:
      return `<fungsi-bawaan ${nilai.nama}>`;
  }
}
