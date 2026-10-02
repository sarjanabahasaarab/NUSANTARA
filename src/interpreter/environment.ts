/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PosisiSumber } from '../lexer/posisi';
import { NilaiRuntime } from './nilai';
import { GalatRuntime, JenisGalatRuntime } from './galat';

interface EntriSimbol {
  nilai: NilaiRuntime;
  tetap: boolean; // True jika dideklarasikan menggunakan kata kunci 'tetap'
  tipeData?: string;
}

/**
 * Lingkungan Ruang Nama dan Lingkup Variabel (Environment / Lexical Scope).
 */
export class Lingkungan {
  private simbol = new Map<string, EntriSimbol>();
  public readonly induk?: Lingkungan;

  constructor(induk?: Lingkungan) {
    this.induk = induk;
  }

  /**
   * Mendefinisikan variabel baru dalam lingkup saat ini.
   */
  public definisikan(
    nama: string,
    nilai: NilaiRuntime,
    tetap: boolean = false,
    tipeData?: string
  ): void {
    this.simbol.set(nama, { nilai, tetap, tipeData });
  }

  /**
   * Mengambil nilai variabel dari lingkup saat ini atau mencari ke lingkup induk.
   */
  public ambil(nama: string, posisi?: PosisiSumber): NilaiRuntime {
    if (this.simbol.has(nama)) {
      return this.simbol.get(nama)!.nilai;
    }

    if (this.induk) {
      return this.induk.ambil(nama, posisi);
    }

    throw new GalatRuntime(
      JenisGalatRuntime.VARIABEL_TIDAK_DITEMUKAN,
      `Variabel atau simbol '${nama}' belum didefinisikan.`,
      posisi
    );
  }

  /**
   * Memperbarui nilai variabel yang sudah ada. Mencegah modifikasi pada konstanta 'tetap'.
   */
  public tetapkan(nama: string, nilaiBaru: NilaiRuntime, posisi?: PosisiSumber): void {
    if (this.simbol.has(nama)) {
      const entri = this.simbol.get(nama)!;
      if (entri.tetap) {
        throw new GalatRuntime(
          JenisGalatRuntime.KONSTANTA_DIUBAH,
          `Konstanta '${nama}' bersifat kekal (tetap) dan tidak dapat diubah nilainya.`,
          posisi
        );
      }
      entri.nilai = nilaiBaru;
      return;
    }

    if (this.induk) {
      this.induk.tetapkan(nama, nilaiBaru, posisi);
      return;
    }

    throw new GalatRuntime(
      JenisGalatRuntime.VARIABEL_TIDAK_DITEMUKAN,
      `Tidak dapat menetapkan nilai: Variabel '${nama}' belum dideklarasikan.`,
      posisi
    );
  }

  /**
   * Memeriksa apakah suatu simbol sudah ada di rantai lingkup.
   */
  public memiliki(nama: string): boolean {
    if (this.simbol.has(nama)) return true;
    if (this.induk) return this.induk.memiliki(nama);
    return false;
  }
}
