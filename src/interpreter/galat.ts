/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PosisiSumber, formatPosisi } from '../lexer/posisi';

export enum JenisGalatRuntime {
  VARIABEL_TIDAK_DITEMUKAN = 'VARIABEL_TIDAK_DITEMUKAN',
  FUNGSI_TIDAK_DITEMUKAN = 'FUNGSI_TIDAK_DITEMUKAN',
  PEMBAGIAN_NOL = 'PEMBAGIAN_NOL',
  OPERASI_TIPE_TIDAK_VALID = 'OPERASI_TIPE_TIDAK_VALID',
  KONSTANTA_DIUBAH = 'KONSTANTA_DIUBAH',
  ARGUMEN_FUNGSI_TIDAK_SESUAI = 'ARGUMEN_FUNGSI_TIDAK_SESUAI',
  KENDALI_DI_LUAR_KONTEKS = 'KENDALI_DI_LUAR_KONTEKS',
}

export interface BingkaiTumpukan {
  namaKonteks: string;
  posisi?: PosisiSumber;
}

export class GalatRuntime extends Error {
  public readonly jenis: JenisGalatRuntime;
  public readonly posisi?: PosisiSumber;
  public readonly jejakTumpukan: BingkaiTumpukan[];

  constructor(
    jenis: JenisGalatRuntime,
    pesan: string,
    posisi?: PosisiSumber,
    jejakTumpukan: BingkaiTumpukan[] = []
  ) {
    const lokasiStr = posisi ? ` pada ${formatPosisi(posisi)}` : '';
    super(`Kesalahan runtime${lokasiStr}: ${pesan}`);
    this.name = 'GalatRuntime';
    this.jenis = jenis;
    this.posisi = posisi;
    this.jejakTumpukan = jejakTumpukan;
  }

  public cetakJejakLengkap(): string {
    let teks = this.message + '\n';
    if (this.jejakTumpukan.length > 0) {
      teks += 'Jejak Tumpukan (Stack Trace):\n';
      for (const bingkai of this.jejakTumpukan) {
        const pos = bingkai.posisi ? ` — baris ${bingkai.posisi.baris}, kolom ${bingkai.posisi.kolom}` : '';
        teks += `  dalam ${bingkai.namaKonteks}${pos}\n`;
      }
    }
    return teks;
  }
}
