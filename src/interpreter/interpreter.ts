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
import { Parser } from '../parser/parser';
import { Lingkungan } from './environment';
import {
  NilaiRuntime,
  JenisNilaiRuntime,
  buatTeks,
  buatBilangan,
  buatDesimal,
  buatLogika,
  buatKarakter,
  buatKosong,
  formatNilaiTeks,
  NilaiFungsiPengguna,
  NilaiFungsiBawaan,
} from './nilai';
import { GalatRuntime, JenisGalatRuntime, BingkaiTumpukan } from './galat';
import { OutputWriter, PenulisOutputBuffer, PenulisOutputKonsol } from './outputWriter';
import { SinyalHentikan, SinyalLanjutkan, SinyalKembalikan } from './sinyal';
import { PemeriksaTipe } from '../tipe/pemeriksaTipe';
import { apakahKompatibel } from '../tipe/kompatibilitas';
import { evaluasiOperasiUnari, evaluasiOperasiBiner } from '../operator/evaluasi';

export interface OpsiInterpreter {
  maksimalIterasiPerulangan?: number;
}

/**
 * Mesin Interpreter Resmi Bahasa NUSANTARA (Phase 8).
 * Mengevaluasi dan mengeksekusi pohon sintaksis abstrak (AST) hasil Parser.
 */
export class Interpreter {
  private readonly lingkunganGlobal: Lingkungan;
  private lingkunganSaatIni: Lingkungan;
  private readonly outputWriter: OutputWriter;
  private readonly tumpukanPanggilan: BingkaiTumpukan[] = [];
  private readonly maksimalIterasiPerulangan: number;

  constructor(outputWriter?: OutputWriter, opsi?: OpsiInterpreter) {
    this.outputWriter = outputWriter || new PenulisOutputKonsol();
    this.maksimalIterasiPerulangan = opsi?.maksimalIterasiPerulangan ?? 1_000_000;
    this.lingkunganGlobal = new Lingkungan();
    this.lingkunganSaatIni = this.lingkunganGlobal;

    // Registrasi fungsi bawaan resmi
    this.inisialisasiFungsiBawaan();
  }

  private inisialisasiFungsiBawaan(): void {
    // Fungsi bawaan: tampilkan(...)
    const fnTampilkan: NilaiFungsiBawaan = {
      jenis: JenisNilaiRuntime.FUNGSI_BAWAAN,
      nama: 'tampilkan',
      eksekusi: (argumen: NilaiRuntime[]) => {
        const teks = argumen.map(a => formatNilaiTeks(a)).join(' ');
        this.outputWriter.tulisBaris(teks);
        return buatKosong();
      },
    };
    this.lingkunganGlobal.definisikan('tampilkan', fnTampilkan, true);
  }

  /**
   * Mengeksekusi kode program mentah (.nusantara).
   */
  public jalankanKode(sumber: string): void {
    const parser = new Parser(sumber);
    const ast = parser.parse();

    const galatParser = parser.dapatkanDaftarGalat();
    if (galatParser.length > 0) {
      throw new GalatRuntime(
        JenisGalatRuntime.OPERASI_TIPE_TIDAK_VALID,
        `Tidak dapat mengeksekusi program karena terdapat ${galatParser.length} kesalahan sintaksis: ${galatParser[0].message}`
      );
    }

    // Analisis Semantik & Pemeriksaan Tipe Statis (Phase 9)
    const pemeriksa = new PemeriksaTipe();
    const galatTipe = pemeriksa.periksa(ast);
    if (galatTipe.length > 0) {
      const g = galatTipe[0];
      const jenisRuntime =
        g.jenis === 'MODIFIKASI_TETAP'
          ? JenisGalatRuntime.KONSTANTA_DIUBAH
          : JenisGalatRuntime.OPERASI_TIPE_TIDAK_VALID;
      throw new GalatRuntime(
        jenisRuntime,
        g.message,
        g.posisi
      );
    }

    this.interpretasikan(ast);
  }

  /**
   * Titik masuk interpretasi pohon AST program.
   */
  public interpretasikan(program: NodeProgram): void {
    try {
      this.tumpukanPanggilan.push({ namaKonteks: `program ${program.namaProgram}` });

      // 1. Daftarkan seluruh deklarasi fungsi ke lingkungan global
      for (const fn of program.daftarFungsi) {
        const nilaiFn: NilaiFungsiPengguna = {
          jenis: JenisNilaiRuntime.FUNGSI,
          deklarasi: fn,
          lingkunganPenutup: this.lingkunganSaatIni,
        };
        this.lingkunganGlobal.definisikan(fn.nama, nilaiFn, true);
      }

      // 2. Eksekusi tubuh utama (blok mulai ... selesai)
      for (const stmt of program.tubuhUtama) {
        this.eksekusiPernyataan(stmt);
      }
    } catch (e: any) {
      if (e instanceof SinyalHentikan) {
        throw new GalatRuntime(
          JenisGalatRuntime.KENDALI_DI_LUAR_KONTEKS,
          "Instruksi 'hentikan' tidak dapat digunakan di luar blok perulangan.",
          program.posisi.awal,
          [...this.tumpukanPanggilan]
        );
      }
      if (e instanceof SinyalLanjutkan) {
        throw new GalatRuntime(
          JenisGalatRuntime.KENDALI_DI_LUAR_KONTEKS,
          "Instruksi 'lanjutkan' tidak dapat digunakan di luar blok perulangan.",
          program.posisi.awal,
          [...this.tumpukanPanggilan]
        );
      }
      if (e instanceof SinyalKembalikan) {
        throw new GalatRuntime(
          JenisGalatRuntime.KENDALI_DI_LUAR_KONTEKS,
          "Instruksi 'kembalikan' tidak dapat digunakan di luar tubuh fungsi.",
          program.posisi.awal,
          [...this.tumpukanPanggilan]
        );
      }
      throw e;
    } finally {
      this.tumpukanPanggilan.pop();
    }
  }

  // ==========================================================================
  // EKSEKUSI PERNYATAAN (STATEMENTS)
  // ==========================================================================

  private eksekusiPernyataan(stmt: PernyataanAST): void {
    switch (stmt.jenis) {
      case JenisNodeAST.DEKLARASI_VARIABEL: {
        const s = stmt as NodeDeklarasiVariabel;
        const nilai = this.evaluasiEkspresi(s.nilaiAwal);
        this.lingkunganSaatIni.definisikan(s.nama, nilai, false, s.tipeData);
        break;
      }

      case JenisNodeAST.DEKLARASI_TETAP: {
        const s = stmt as NodeDeklarasiTetap;
        const nilai = this.evaluasiEkspresi(s.nilaiAwal);
        this.lingkunganSaatIni.definisikan(s.nama, nilai, true, s.tipeData);
        break;
      }

      case JenisNodeAST.PENUGASAN: {
        const s = stmt as NodePenugasan;
        const nilaiBaru = this.evaluasiEkspresi(s.nilai);
        this.lingkunganSaatIni.tetapkan(s.target, nilaiBaru, s.posisi.awal);
        break;
      }

      case JenisNodeAST.PERCABANGAN_JIKA: {
        const s = stmt as NodePercabanganJika;
        const hasilKondisi = this.evaluasiEkspresi(s.kondisi);

        if (hasilKondisi.jenis !== JenisNilaiRuntime.LOGIKA) {
          throw new GalatRuntime(
            JenisGalatRuntime.OPERASI_TIPE_TIDAK_VALID,
            `Kondisi percabangan 'jika' harus bertipe logika (benar/salah), bukan ${hasilKondisi.jenis}.`,
            s.kondisi.posisi.awal,
            [...this.tumpukanPanggilan]
          );
        }

        if (hasilKondisi.nilai === true) {
          this.eksekusiBlok(s.cabangMaka);
        } else if (s.cabangSelain) {
          this.eksekusiBlok(s.cabangSelain);
        }
        break;
      }

      case JenisNodeAST.PERULANGAN_SELAMA: {
        const s = stmt as NodePerulanganSelama;
        let iterasi = 0;
        while (true) {
          if (this.maksimalIterasiPerulangan > 0 && ++iterasi > this.maksimalIterasiPerulangan) {
            throw new GalatRuntime(
              JenisGalatRuntime.BATAS_ITERASI_TERLAMPAUI,
              `Batas maksimal iterasi perulangan (${this.maksimalIterasiPerulangan}) terlampaui. Kemungkinan terjadi perulangan tak terbatas (infinite loop).`,
              s.kondisi.posisi.awal,
              [...this.tumpukanPanggilan]
            );
          }

          const kondisi = this.evaluasiEkspresi(s.kondisi);
          if (kondisi.jenis !== JenisNilaiRuntime.LOGIKA) {
            throw new GalatRuntime(
              JenisGalatRuntime.OPERASI_TIPE_TIDAK_VALID,
              `Kondisi perulangan 'selama' harus bertipe logika (benar/salah), bukan ${kondisi.jenis}.`,
              s.kondisi.posisi.awal,
              [...this.tumpukanPanggilan]
            );
          }

          if (!kondisi.nilai) break;

          try {
            this.eksekusiBlok(s.tubuh);
          } catch (e: any) {
            if (e instanceof SinyalHentikan) break;
            if (e instanceof SinyalLanjutkan) continue;
            throw e;
          }
        }
        break;
      }

      case JenisNodeAST.PERULANGAN_UNTUK: {
        const s = stmt as NodePerulanganUntuk;
        const awal = this.evaluasiEkspresi(s.nilaiAwal);
        const akhir = this.evaluasiEkspresi(s.nilaiAkhir);

        if (awal.jenis !== JenisNilaiRuntime.BILANGAN || akhir.jenis !== JenisNilaiRuntime.BILANGAN) {
          throw new GalatRuntime(
            JenisGalatRuntime.OPERASI_TIPE_TIDAK_VALID,
            "Rentang perulangan 'untuk' ('dari' dan 'sampai') harus bernilai bilangan bulat.",
            s.posisi.awal,
            [...this.tumpukanPanggilan]
          );
        }

        // Rentang kosong: jika awal > akhir, tubuh perulangan dilewati 0 kali
        if (awal.nilai > akhir.nilai) {
          break;
        }

        const lingkunganLoop = new Lingkungan(this.lingkunganSaatIni);
        const simpanLingkungan = this.lingkunganSaatIni;
        this.lingkunganSaatIni = lingkunganLoop;

        let iterasi = 0;
        try {
          for (let i = awal.nilai; i <= akhir.nilai; i++) {
            if (this.maksimalIterasiPerulangan > 0 && ++iterasi > this.maksimalIterasiPerulangan) {
              throw new GalatRuntime(
                JenisGalatRuntime.BATAS_ITERASI_TERLAMPAUI,
                `Batas maksimal iterasi perulangan (${this.maksimalIterasiPerulangan}) terlampaui. Kemungkinan terjadi perulangan tak terbatas (infinite loop).`,
                s.posisi.awal,
                [...this.tumpukanPanggilan]
              );
            }
            lingkunganLoop.definisikan(s.variabelPenghitung, buatBilangan(i), false, 'bilangan');
            try {
              for (const st of s.tubuh) {
                this.eksekusiPernyataan(st);
              }
            } catch (e: any) {
              if (e instanceof SinyalHentikan) break;
              if (e instanceof SinyalLanjutkan) continue;
              throw e;
            }
          }
        } finally {
          this.lingkunganSaatIni = simpanLingkungan;
        }
        break;
      }

      case JenisNodeAST.INSTRUKSI_HENTIKAN:
        throw new SinyalHentikan();

      case JenisNodeAST.INSTRUKSI_LANJUTKAN:
        throw new SinyalLanjutkan();

      case JenisNodeAST.INSTRUKSI_KEMBALIKAN: {
        const s = stmt as NodeInstruksiKembalikan;
        const nilaiKembalian = s.nilai ? this.evaluasiEkspresi(s.nilai) : buatKosong();
        throw new SinyalKembalikan(nilaiKembalian);
      }

      case JenisNodeAST.PERNYATAAN_EKSPRESI: {
        const s = stmt as NodePernyataanEkspresi;
        this.evaluasiEkspresi(s.ekspresi);
        break;
      }

      case JenisNodeAST.PERNYATAAN_BLOK: {
        this.eksekusiBlok((stmt as any).daftarPernyataan);
        break;
      }
    }
  }

  private eksekusiBlok(daftarPernyataan: PernyataanAST[]): void {
    const lingkunganLokal = new Lingkungan(this.lingkunganSaatIni);
    const lingkunganSebelumnya = this.lingkunganSaatIni;
    this.lingkunganSaatIni = lingkunganLokal;

    try {
      for (const st of daftarPernyataan) {
        this.eksekusiPernyataan(st);
      }
    } finally {
      this.lingkunganSaatIni = lingkunganSebelumnya;
    }
  }

  // ==========================================================================
  // EVALUASI EKSPRESI (EXPRESSIONS)
  // ==========================================================================

  public evaluasiEkspresi(expr: EkspresiAST): NilaiRuntime {
    switch (expr.jenis) {
      case JenisNodeAST.LITERAL: {
        const l = expr as NodeLiteral;
        switch (l.tipeLiteral) {
          case 'bilangan':
            return buatBilangan(l.nilaiTerurai as number);
          case 'desimal':
            return buatDesimal(l.nilaiTerurai as number);
          case 'teks':
            return buatTeks(l.nilaiTerurai as string);
          case 'karakter':
            return buatKarakter(l.nilaiTerurai as string);
          case 'logika':
            return buatLogika(l.nilaiTerurai as boolean);
          case 'kosong':
            return buatKosong();
        }
        break;
      }

      case JenisNodeAST.PENGIDENTIFIKASI: {
        const id = expr as NodePengidentifikasi;
        return this.lingkunganSaatIni.ambil(id.nama, id.posisi.awal);
      }

      case JenisNodeAST.EKSPRESI_PENGELOMPOKAN: {
        const g = expr as NodeEkspresiPengelompokan;
        return this.evaluasiEkspresi(g.ekspresi);
      }

      case JenisNodeAST.EKSPRESI_UNARI: {
        const u = expr as NodeEkspresiUnari;
        const arg = this.evaluasiEkspresi(u.argumen);
        return evaluasiOperasiUnari(u.operator, arg, u.posisi.awal, [...this.tumpukanPanggilan]);
      }

      case JenisNodeAST.EKSPRESI_BINER: {
        const b = expr as NodeEkspresiBiner;

        // Evaluasi Hubung Singkat (Short-circuit Evaluation) untuk Operator Logika
        if (b.operator === 'dan') {
          const kiri = this.evaluasiEkspresi(b.kiri);
          if (kiri.jenis !== JenisNilaiRuntime.LOGIKA) {
            throw new GalatRuntime(
              JenisGalatRuntime.OPERASI_TIPE_TIDAK_VALID,
              `Operan operator 'dan' harus bertipe logika, bukan ${kiri.jenis}.`,
              b.posisi.awal,
              [...this.tumpukanPanggilan]
            );
          }
          // Jika kiri salah, hubung singkat: tidak perlu evaluasi cabang kanan
          if (!kiri.nilai) return buatLogika(false);

          const kanan = this.evaluasiEkspresi(b.kanan);
          if (kanan.jenis !== JenisNilaiRuntime.LOGIKA) {
            throw new GalatRuntime(
              JenisGalatRuntime.OPERASI_TIPE_TIDAK_VALID,
              `Operan operator 'dan' harus bertipe logika, bukan ${kanan.jenis}.`,
              b.posisi.awal,
              [...this.tumpukanPanggilan]
            );
          }
          return buatLogika(kanan.nilai);
        }

        if (b.operator === 'atau') {
          const kiri = this.evaluasiEkspresi(b.kiri);
          if (kiri.jenis !== JenisNilaiRuntime.LOGIKA) {
            throw new GalatRuntime(
              JenisGalatRuntime.OPERASI_TIPE_TIDAK_VALID,
              `Operan operator 'atau' harus bertipe logika, bukan ${kiri.jenis}.`,
              b.posisi.awal,
              [...this.tumpukanPanggilan]
            );
          }
          // Jika kiri benar, hubung singkat: tidak perlu evaluasi cabang kanan
          if (kiri.nilai) return buatLogika(true);

          const kanan = this.evaluasiEkspresi(b.kanan);
          if (kanan.jenis !== JenisNilaiRuntime.LOGIKA) {
            throw new GalatRuntime(
              JenisGalatRuntime.OPERASI_TIPE_TIDAK_VALID,
              `Operan operator 'atau' harus bertipe logika, bukan ${kanan.jenis}.`,
              b.posisi.awal,
              [...this.tumpukanPanggilan]
            );
          }
          return buatLogika(kanan.nilai);
        }

        // Operasi Biner Biasa
        const kiri = this.evaluasiEkspresi(b.kiri);
        const kanan = this.evaluasiEkspresi(b.kanan);

        return this.evaluasiOperasiBiner(b.operator, kiri, kanan, b.posisi.awal);
      }

      case JenisNodeAST.PEMANGGILAN_FUNGSI: {
        const c = expr as NodePemanggilanFungsi;
        const callee = this.lingkunganSaatIni.ambil(c.namaFungsi, c.posisi.awal);

        // Evaluasi seluruh argumen
        const argumenTerurai = c.argumen.map(arg => this.evaluasiEkspresi(arg));

        if (callee.jenis === JenisNilaiRuntime.FUNGSI_BAWAAN) {
          return callee.eksekusi(argumenTerurai);
        }

        if (callee.jenis === JenisNilaiRuntime.FUNGSI) {
          return this.panggilFungsiPengguna(callee, argumenTerurai, c);
        }

        throw new GalatRuntime(
          JenisGalatRuntime.FUNGSI_TIDAK_DITEMUKAN,
          `'${c.namaFungsi}' bukan merupakan fungsi yang dapat dipanggil.`,
          c.posisi.awal,
          [...this.tumpukanPanggilan]
        );
      }
    }

    return buatKosong();
  }

  private evaluasiOperasiBiner(
    op: string,
    kiri: NilaiRuntime,
    kanan: NilaiRuntime,
    posisi?: any
  ): NilaiRuntime {
    return evaluasiOperasiBiner(op, kiri, kanan, posisi, [...this.tumpukanPanggilan]);
  }

  private panggilFungsiPengguna(
    fungsi: NilaiFungsiPengguna,
    argumen: NilaiRuntime[],
    nodePanggil: NodePemanggilanFungsi
  ): NilaiRuntime {
    const fnDeklarasi = fungsi.deklarasi;

    // Batas kedalaman pemanggilan rekursif (Stack Overflow Protection)
    if (this.tumpukanPanggilan.length > 500) {
      throw new GalatRuntime(
        JenisGalatRuntime.BATAS_ITERASI_TERLAMPAUI,
        `Batas kedalaman pemanggilan fungsi rekursif terlampaui pada fungsi '${fnDeklarasi.nama}'.`,
        nodePanggil.posisi.awal,
        [...this.tumpukanPanggilan]
      );
    }

    // Periksa jumlah parameter vs argumen
    if (argumen.length !== fnDeklarasi.parameter.length) {
      throw new GalatRuntime(
        JenisGalatRuntime.ARGUMEN_FUNGSI_TIDAK_SESUAI,
        `Fungsi '${fnDeklarasi.nama}' membutuhkan ${fnDeklarasi.parameter.length} argumen, tetapi menerima ${argumen.length}.`,
        nodePanggil.posisi.awal,
        [...this.tumpukanPanggilan]
      );
    }

    // Buat lingkungan lingkup lokal baru bertaut pada penutup leksikal
    const lingkunganFungsi = new Lingkungan(fungsi.lingkunganPenutup);
    for (let i = 0; i < fnDeklarasi.parameter.length; i++) {
      const p = fnDeklarasi.parameter[i];
      if (p.tipeData && !apakahKompatibel(p.tipeData, argumen[i].jenis)) {
        throw new GalatRuntime(
          JenisGalatRuntime.OPERASI_TIPE_TIDAK_VALID,
          `Parameter '${p.nama}' pada fungsi '${fnDeklarasi.nama}' membutuhkan ${p.tipeData}, tetapi menerima ${argumen[i].jenis}.`,
          nodePanggil.posisi.awal,
          [...this.tumpukanPanggilan]
        );
      }
      lingkunganFungsi.definisikan(p.nama, argumen[i], false, p.tipeData);
    }

    const simpanLingkungan = this.lingkunganSaatIni;
    this.lingkunganSaatIni = lingkunganFungsi;
    this.tumpukanPanggilan.push({
      namaKonteks: `fungsi ${fnDeklarasi.nama}`,
      posisi: nodePanggil.posisi.awal,
    });

    try {
      for (const stmt of fnDeklarasi.tubuh) {
        this.eksekusiPernyataan(stmt);
      }
      if (fnDeklarasi.tipeKembalian && fnDeklarasi.tipeKembalian !== 'kosong') {
        throw new GalatRuntime(
          JenisGalatRuntime.OPERASI_TIPE_TIDAK_VALID,
          `Fungsi '${fnDeklarasi.nama}' harus mengembalikan ${fnDeklarasi.tipeKembalian}, tetapi tidak mengembalikan nilai.`,
          nodePanggil.posisi.awal,
          [...this.tumpukanPanggilan]
        );
      }
      return buatKosong();
    } catch (e: any) {
      if (e instanceof SinyalKembalikan) {
        if (fnDeklarasi.tipeKembalian && fnDeklarasi.tipeKembalian !== 'kosong') {
          if (e.nilai.jenis === JenisNilaiRuntime.KOSONG) {
            throw new GalatRuntime(
              JenisGalatRuntime.OPERASI_TIPE_TIDAK_VALID,
              `Fungsi '${fnDeklarasi.nama}' harus mengembalikan ${fnDeklarasi.tipeKembalian}, tetapi tidak mengembalikan nilai.`,
              nodePanggil.posisi.awal,
              [...this.tumpukanPanggilan]
            );
          }
          if (!apakahKompatibel(fnDeklarasi.tipeKembalian, e.nilai.jenis)) {
            throw new GalatRuntime(
              JenisGalatRuntime.OPERASI_TIPE_TIDAK_VALID,
              `Fungsi '${fnDeklarasi.nama}' harus mengembalikan nilai bertipe '${fnDeklarasi.tipeKembalian}', tetapi mengembalikan '${e.nilai.jenis}'.`,
              nodePanggil.posisi.awal,
              [...this.tumpukanPanggilan]
            );
          }
        }
        return e.nilai;
      }
      throw e;
    } finally {
      this.tumpukanPanggilan.pop();
      this.lingkunganSaatIni = simpanLingkungan;
    }
  }
}
