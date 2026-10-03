/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  NodeProgram,
  PernyataanAST,
  EkspresiAST,
  JenisNodeAST,
  NodeDeklarasiVariabel,
  NodeDeklarasiTetap,
  NodePenugasan,
  NodePercabanganJika,
  NodePerulanganSelama,
  NodePerulanganUntuk,
  NodeInstruksiKembalikan,
  NodePernyataanEkspresi,
  NodeDeklarasiFungsi,
  NodeLiteral,
  NodePengidentifikasi,
  NodeEkspresiUnari,
  NodeEkspresiBiner,
  NodeEkspresiPengelompokan,
  NodePemanggilanFungsi,
} from '../parser/ast';
import { NamaTipe, apakahTipeSah } from './jenisTipe';
import { GalatTipe, JenisGalatTipe, buatGalatKetidakcocokanTipe } from './galatTipe';
import { apakahKompatibel, tentukanTipeOperasiBiner } from './kompatibilitas';

interface InfoSimbol {
  nama: string;
  tipe: NamaTipe;
  tetap: boolean;
}

interface InfoFungsi {
  nama: string;
  parameter: Array<{ nama: string; tipe: NamaTipe }>;
  tipeKembalian: NamaTipe;
}

/**
 * Lingkup Tabel Simbol untuk Analisis Semantik & Pengetikan Statis.
 */
class LingkupTipe {
  private simbol = new Map<string, InfoSimbol>();
  public readonly induk?: LingkupTipe;

  constructor(induk?: LingkupTipe) {
    this.induk = induk;
  }

  public definisikan(info: InfoSimbol, posisi?: any): void {
    if (this.simbol.has(info.nama)) {
      throw new GalatTipe(
        JenisGalatTipe.DEKLARASI_GANDA,
        `Variabel '${info.nama}' sudah dideklarasikan pada lingkup (scope) ini.`,
        posisi
      );
    }
    this.simbol.set(info.nama, info);
  }

  public ambil(nama: string): InfoSimbol | undefined {
    if (this.simbol.has(nama)) return this.simbol.get(nama);
    if (this.induk) return this.induk.ambil(nama);
    return undefined;
  }
}

/**
 * Pemeriksa Tipe & Analisis Semantik Bahasa NUSANTARA (Phase 9).
 */
export class PemeriksaTipe {
  private lingkupSaatIni: LingkupTipe;
  private readonly tabelFungsi = new Map<string, InfoFungsi>();
  private readonly daftarGalat: GalatTipe[] = [];
  private fungsiAktifSaatIni?: InfoFungsi;

  constructor() {
    this.lingkupSaatIni = new LingkupTipe();
    this.daftarkanFungsiBawaan();
  }

  private daftarkanFungsiBawaan(): void {
    // tampilkan(...apapun)
    this.tabelFungsi.set('tampilkan', {
      nama: 'tampilkan',
      parameter: [],
      tipeKembalian: NamaTipe.KOSONG,
    });
  }

  public periksa(program: NodeProgram): GalatTipe[] {
    this.daftarGalat.length = 0;

    // 1. Daftarkan tanda tangan seluruh deklarasi fungsi
    for (const fn of program.daftarFungsi) {
      if (!apakahTipeSah(fn.tipeKembalian || NamaTipe.KOSONG)) {
        this.daftarGalat.push(
          new GalatTipe(
            JenisGalatTipe.TIPE_TIDAK_DIKENAL,
            `Tipe kembalian '${fn.tipeKembalian}' pada fungsi '${fn.nama}' tidak dikenal.`,
            fn.posisi.awal
          )
        );
      }

      const params: Array<{ nama: string; tipe: NamaTipe }> = [];
      for (const p of fn.parameter) {
        if (!apakahTipeSah(p.tipeData)) {
          this.daftarGalat.push(
            new GalatTipe(
              JenisGalatTipe.TIPE_TIDAK_DIKENAL,
              `Tipe parameter '${p.tipeData}' untuk '${p.nama}' pada fungsi '${fn.nama}' tidak dikenal.`,
              p.posisi.awal
            )
          );
        }
        params.push({ nama: p.nama, tipe: p.tipeData as NamaTipe });
      }

      this.tabelFungsi.set(fn.nama, {
        nama: fn.nama,
        parameter: params,
        tipeKembalian: (fn.tipeKembalian as NamaTipe) || NamaTipe.KOSONG,
      });
    }

    // 2. Periksa tubuh setiap fungsi
    for (const fn of program.daftarFungsi) {
      this.periksaDeklarasiFungsi(fn);
    }

    // 3. Periksa tubuh program utama
    for (const stmt of program.tubuhUtama) {
      try {
        this.periksaPernyataan(stmt);
      } catch (e: any) {
        if (e instanceof GalatTipe) {
          this.daftarGalat.push(e);
        } else {
          throw e;
        }
      }
    }

    return this.daftarGalat;
  }

  private periksaDeklarasiFungsi(fn: NodeDeklarasiFungsi): void {
    const infoFn = this.tabelFungsi.get(fn.nama)!;
    const simpanFungsiAktif = this.fungsiAktifSaatIni;
    this.fungsiAktifSaatIni = infoFn;

    const lingkupFungsi = new LingkupTipe(this.lingkupSaatIni);
    const simpanLingkup = this.lingkupSaatIni;
    this.lingkupSaatIni = lingkupFungsi;

    try {
      for (const p of infoFn.parameter) {
        lingkupFungsi.definisikan({
          nama: p.nama,
          tipe: p.tipe,
          tetap: false,
        });
      }

      for (const st of fn.tubuh) {
        this.periksaPernyataan(st);
      }
    } catch (e: any) {
      if (e instanceof GalatTipe) {
        this.daftarGalat.push(e);
      } else {
        throw e;
      }
    } finally {
      this.lingkupSaatIni = simpanLingkup;
      this.fungsiAktifSaatIni = simpanFungsiAktif;
    }
  }

  private periksaPernyataan(stmt: PernyataanAST): void {
    switch (stmt.jenis) {
      case JenisNodeAST.DEKLARASI_VARIABEL: {
        const s = stmt as NodeDeklarasiVariabel;
        if (!apakahTipeSah(s.tipeData)) {
          throw new GalatTipe(
            JenisGalatTipe.TIPE_TIDAK_DIKENAL,
            `Tipe data '${s.tipeData}' pada deklarasi variabel '${s.nama}' tidak sah.`,
            s.posisi.awal
          );
        }

        const tipeNilai = this.periksaEkspresi(s.nilaiAwal);
        if (!apakahKompatibel(s.tipeData, tipeNilai)) {
          throw buatGalatKetidakcocokanTipe(
            `Deklarasi variabel '${s.nama}'`,
            s.tipeData,
            tipeNilai,
            s.nilaiAwal.posisi.awal
          );
        }

        this.lingkupSaatIni.definisikan(
          { nama: s.nama, tipe: s.tipeData as NamaTipe, tetap: false },
          s.posisi.awal
        );
        break;
      }

      case JenisNodeAST.DEKLARASI_TETAP: {
        const s = stmt as NodeDeklarasiTetap;
        if (!apakahTipeSah(s.tipeData)) {
          throw new GalatTipe(
            JenisGalatTipe.TIPE_TIDAK_DIKENAL,
            `Tipe data '${s.tipeData}' pada deklarasi tetap '${s.nama}' tidak sah.`,
            s.posisi.awal
          );
        }

        const tipeNilai = this.periksaEkspresi(s.nilaiAwal);
        if (!apakahKompatibel(s.tipeData, tipeNilai)) {
          throw buatGalatKetidakcocokanTipe(
            `Deklarasi konstanta tetap '${s.nama}'`,
            s.tipeData,
            tipeNilai,
            s.nilaiAwal.posisi.awal
          );
        }

        this.lingkupSaatIni.definisikan(
          { nama: s.nama, tipe: s.tipeData as NamaTipe, tetap: true },
          s.posisi.awal
        );
        break;
      }

      case JenisNodeAST.PENUGASAN: {
        const s = stmt as NodePenugasan;
        const tipeBaru = this.periksaEkspresi(s.nilai);
        const simbol = this.lingkupSaatIni.ambil(s.target);

        if (!simbol) {
          // Variabel tidak terdefinisi ditangani oleh runtime / interpreter
          break;
        }

        if (simbol.tetap) {
          throw new GalatTipe(
            JenisGalatTipe.MODIFIKASI_TETAP,
            `Konstanta '${s.target}' bersifat tetap dan tidak dapat diubah.`,
            s.posisi.awal
          );
        }

        if (!apakahKompatibel(simbol.tipe, tipeBaru)) {
          throw buatGalatKetidakcocokanTipe(
            `Penugasan ke variabel '${s.target}'`,
            simbol.tipe,
            tipeBaru,
            s.nilai.posisi.awal
          );
        }
        break;
      }

      case JenisNodeAST.PERCABANGAN_JIKA: {
        const s = stmt as NodePercabanganJika;
        this.validasiVariabelKondisi(s.kondisi);
        const tipeKondisi = this.periksaEkspresi(s.kondisi);
        if (tipeKondisi !== NamaTipe.LOGIKA && tipeKondisi !== NamaTipe.APAPUN) {
          throw new GalatTipe(
            JenisGalatTipe.KETIDAKCOCOKAN_TIPE,
            `Kondisi percabangan 'jika' harus menghasilkan nilai logika, tetapi ditemukan '${tipeKondisi}'.`,
            s.kondisi.posisi.awal,
            NamaTipe.LOGIKA,
            tipeKondisi
          );
        }

        const lingkupMaka = new LingkupTipe(this.lingkupSaatIni);
        this.jalankanDalamLingkup(lingkupMaka, () => {
          for (const st of s.cabangMaka) this.periksaPernyataan(st);
        });

        if (s.cabangSelain) {
          const lingkupSelain = new LingkupTipe(this.lingkupSaatIni);
          this.jalankanDalamLingkup(lingkupSelain, () => {
            for (const st of s.cabangSelain!) this.periksaPernyataan(st);
          });
        }
        break;
      }

      case JenisNodeAST.PERULANGAN_SELAMA: {
        const s = stmt as NodePerulanganSelama;
        const tipeKondisi = this.periksaEkspresi(s.kondisi);
        if (tipeKondisi !== NamaTipe.LOGIKA && tipeKondisi !== NamaTipe.APAPUN) {
          throw buatGalatKetidakcocokanTipe(
            "Kondisi perulangan 'selama'",
            NamaTipe.LOGIKA,
            tipeKondisi,
            s.kondisi.posisi.awal
          );
        }

        const lingkupLoop = new LingkupTipe(this.lingkupSaatIni);
        this.jalankanDalamLingkup(lingkupLoop, () => {
          for (const st of s.tubuh) this.periksaPernyataan(st);
        });
        break;
      }

      case JenisNodeAST.PERULANGAN_UNTUK: {
        const s = stmt as NodePerulanganUntuk;
        const tipeAwal = this.periksaEkspresi(s.nilaiAwal);
        const tipeAkhir = this.periksaEkspresi(s.nilaiAkhir);

        if (tipeAwal !== NamaTipe.BILANGAN && tipeAwal !== NamaTipe.APAPUN) {
          throw buatGalatKetidakcocokanTipe(
            "Batas awal perulangan 'untuk'",
            NamaTipe.BILANGAN,
            tipeAwal,
            s.nilaiAwal.posisi.awal
          );
        }

        if (tipeAkhir !== NamaTipe.BILANGAN && tipeAkhir !== NamaTipe.APAPUN) {
          throw buatGalatKetidakcocokanTipe(
            "Batas akhir perulangan 'untuk'",
            NamaTipe.BILANGAN,
            tipeAkhir,
            s.nilaiAkhir.posisi.awal
          );
        }

        const lingkupUntuk = new LingkupTipe(this.lingkupSaatIni);
        lingkupUntuk.definisikan({
          nama: s.variabelPenghitung,
          tipe: NamaTipe.BILANGAN,
          tetap: false,
        });

        this.jalankanDalamLingkup(lingkupUntuk, () => {
          for (const st of s.tubuh) this.periksaPernyataan(st);
        });
        break;
      }

      case JenisNodeAST.INSTRUKSI_KEMBALIKAN: {
        const s = stmt as NodeInstruksiKembalikan;
        const tipeAktual = s.nilai ? this.periksaEkspresi(s.nilai) : NamaTipe.KOSONG;

        if (this.fungsiAktifSaatIni) {
          const tipeTarget = this.fungsiAktifSaatIni.tipeKembalian;
          if (!apakahKompatibel(tipeTarget, tipeAktual)) {
            throw new GalatTipe(
              JenisGalatTipe.KEMBALIAN_TIDAK_SESUAI,
              `Fungsi '${this.fungsiAktifSaatIni.nama}' harus mengembalikan tipe '${tipeTarget}', namun mengembalikan tipe '${tipeAktual}'.`,
              s.posisi.awal,
              tipeTarget,
              tipeAktual
            );
          }
        }
        break;
      }

      case JenisNodeAST.PERNYATAAN_EKSPRESI: {
        this.periksaEkspresi((stmt as NodePernyataanEkspresi).ekspresi);
        break;
      }

      case JenisNodeAST.PERNYATAAN_BLOK: {
        const lingkupBlok = new LingkupTipe(this.lingkupSaatIni);
        this.jalankanDalamLingkup(lingkupBlok, () => {
          for (const st of (stmt as any).daftarPernyataan) {
            this.periksaPernyataan(st);
          }
        });
        break;
      }
    }
  }

  private validasiVariabelKondisi(expr: EkspresiAST): void {
    switch (expr.jenis) {
      case JenisNodeAST.PENGIDENTIFIKASI: {
        const id = expr as NodePengidentifikasi;
        const simbol = this.lingkupSaatIni.ambil(id.nama);
        if (!simbol) {
          throw new GalatTipe(
            JenisGalatTipe.VARIABEL_BELUM_DIDEKLARASIKAN,
            `Variabel '${id.nama}' pada kondisi percabangan belum dideklarasikan.`,
            id.posisi.awal
          );
        }
        break;
      }
      case JenisNodeAST.EKSPRESI_BINER: {
        const b = expr as NodeEkspresiBiner;
        this.validasiVariabelKondisi(b.kiri);
        this.validasiVariabelKondisi(b.kanan);
        break;
      }
      case JenisNodeAST.EKSPRESI_UNARI: {
        const u = expr as NodeEkspresiUnari;
        this.validasiVariabelKondisi(u.argumen);
        break;
      }
      case JenisNodeAST.EKSPRESI_PENGELOMPOKAN: {
        const p = expr as NodeEkspresiPengelompokan;
        this.validasiVariabelKondisi(p.ekspresi);
        break;
      }
      case JenisNodeAST.PEMANGGILAN_FUNGSI: {
        const fn = expr as NodePemanggilanFungsi;
        for (const arg of fn.argumen) {
          this.validasiVariabelKondisi(arg);
        }
        break;
      }
    }
  }

  private jalankanDalamLingkup(lingkupBaru: LingkupTipe, aksi: () => void): void {
    const simpan = this.lingkupSaatIni;
    this.lingkupSaatIni = lingkupBaru;
    try {
      aksi();
    } finally {
      this.lingkupSaatIni = simpan;
    }
  }

  public periksaEkspresi(expr: EkspresiAST): NamaTipe {
    switch (expr.jenis) {
      case JenisNodeAST.LITERAL: {
        const l = expr as NodeLiteral;
        switch (l.tipeLiteral) {
          case 'bilangan':
            return NamaTipe.BILANGAN;
          case 'desimal':
            return NamaTipe.DESIMAL;
          case 'teks':
            return NamaTipe.TEKS;
          case 'karakter':
            return NamaTipe.KARAKTER;
          case 'logika':
            return NamaTipe.LOGIKA;
          case 'kosong':
            return NamaTipe.KOSONG;
        }
        return NamaTipe.APAPUN;
      }

      case JenisNodeAST.PENGIDENTIFIKASI: {
        const id = expr as NodePengidentifikasi;
        const simbol = this.lingkupSaatIni.ambil(id.nama);
        if (simbol) return simbol.tipe;
        return NamaTipe.APAPUN; // Jika belum dikenal, biarkan runtime menangani undefined variable
      }

      case JenisNodeAST.EKSPRESI_PENGELOMPOKAN: {
        return this.periksaEkspresi((expr as NodeEkspresiPengelompokan).ekspresi);
      }

      case JenisNodeAST.EKSPRESI_UNARI: {
        const u = expr as NodeEkspresiUnari;
        const tipeArg = this.periksaEkspresi(u.argumen);

        if (u.operator === '-') {
          if (tipeArg === NamaTipe.BILANGAN || tipeArg === NamaTipe.DESIMAL || tipeArg === NamaTipe.APAPUN) {
            return tipeArg;
          }
          throw new GalatTipe(
            JenisGalatTipe.OPERATOR_TIDAK_DIDUKUNG,
            `Operator unari '-' membutuhkan operan bertipe bilangan atau desimal, tetapi ditemukan '${tipeArg}'.`,
            u.posisi.awal
          );
        }

        if (u.operator === 'tidak') {
          if (tipeArg === NamaTipe.LOGIKA || tipeArg === NamaTipe.APAPUN) {
            return NamaTipe.LOGIKA;
          }
          throw new GalatTipe(
            JenisGalatTipe.OPERATOR_TIDAK_DIDUKUNG,
            `Operator unari 'tidak' membutuhkan operan bertipe logika, tetapi ditemukan '${tipeArg}'.`,
            u.posisi.awal
          );
        }
        return NamaTipe.APAPUN;
      }

      case JenisNodeAST.EKSPRESI_BINER: {
        const b = expr as NodeEkspresiBiner;
        const tipeKiri = this.periksaEkspresi(b.kiri);
        const tipeKanan = this.periksaEkspresi(b.kanan);

        if (tipeKiri === NamaTipe.APAPUN || tipeKanan === NamaTipe.APAPUN) {
          return NamaTipe.APAPUN;
        }

        const hasilOperasi = tentukanTipeOperasiBiner(b.operator, tipeKiri, tipeKanan);
        if (!hasilOperasi) {
          if (b.operator === 'dan' || b.operator === 'atau') {
            throw new GalatTipe(
              JenisGalatTipe.OPERATOR_TIDAK_DIDUKUNG,
              `Operator '${b.operator}' membutuhkan operan bertipe logika, tetapi ditemukan '${tipeKiri}' dan '${tipeKanan}'.`,
              b.posisi.awal
            );
          }
          throw new GalatTipe(
            JenisGalatTipe.OPERATOR_TIDAK_DIDUKUNG,
            `Operasi '${b.operator}' tidak didukung antara tipe '${tipeKiri}' dan '${tipeKanan}'.`,
            b.posisi.awal
          );
        }

        return hasilOperasi;
      }

      case JenisNodeAST.PEMANGGILAN_FUNGSI: {
        const c = expr as NodePemanggilanFungsi;
        const infoFn = this.tabelFungsi.get(c.namaFungsi);

        if (infoFn) {
          // Khusus fungsi bawaan tampilkan(...) yang variadik
          if (c.namaFungsi === 'tampilkan') {
            for (const arg of c.argumen) {
              this.periksaEkspresi(arg);
            }
            return NamaTipe.KOSONG;
          }

          if (c.argumen.length !== infoFn.parameter.length) {
            throw new GalatTipe(
              JenisGalatTipe.ARGUMEN_TIDAK_SESUAI,
              `Fungsi '${c.namaFungsi}' membutuhkan ${infoFn.parameter.length} argumen, namun menerima ${c.argumen.length}.`,
              c.posisi.awal
            );
          }

          for (let i = 0; i < c.argumen.length; i++) {
            const tipeArg = this.periksaEkspresi(c.argumen[i]);
            const param = infoFn.parameter[i];
            if (!apakahKompatibel(param.tipe, tipeArg)) {
              throw buatGalatKetidakcocokanTipe(
                `Argumen ke-${i + 1} ('${param.nama}') pada pemanggilan '${c.namaFungsi}'`,
                param.tipe,
                tipeArg,
                c.argumen[i].posisi.awal
              );
            }
          }

          return infoFn.tipeKembalian;
        }

        return NamaTipe.APAPUN;
      }
    }

    return NamaTipe.APAPUN;
  }
}
