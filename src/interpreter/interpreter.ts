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
  buatKosong,
  formatNilaiTeks,
  NilaiFungsiPengguna,
  NilaiFungsiBawaan,
} from './nilai';
import { GalatRuntime, JenisGalatRuntime, BingkaiTumpukan } from './galat';
import { OutputWriter, PenulisOutputBuffer, PenulisOutputKonsol } from './outputWriter';
import { SinyalHentikan, SinyalLanjutkan, SinyalKembalikan } from './sinyal';

/**
 * Mesin Interpreter Resmi Bahasa NUSANTARA (Phase 8).
 * Mengevaluasi dan mengeksekusi pohon sintaksis abstrak (AST) hasil Parser.
 */
export class Interpreter {
  private readonly lingkunganGlobal: Lingkungan;
  private lingkunganSaatIni: Lingkungan;
  private readonly outputWriter: OutputWriter;
  private readonly tumpukanPanggilan: BingkaiTumpukan[] = [];

  constructor(outputWriter?: OutputWriter) {
    this.outputWriter = outputWriter || new PenulisOutputKonsol();
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
        while (true) {
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

        const lingkunganLoop = new Lingkungan(this.lingkunganSaatIni);
        const simpanLingkungan = this.lingkunganSaatIni;
        this.lingkunganSaatIni = lingkunganLoop;

        try {
          const naik = awal.nilai <= akhir.nilai;
          for (
            let i = awal.nilai;
            naik ? i <= akhir.nilai : i >= akhir.nilai;
            naik ? i++ : i--
          ) {
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
            return buatTeks(l.nilaiTerurai as string);
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

        if (u.operator === '-') {
          if (arg.jenis === JenisNilaiRuntime.BILANGAN) {
            return buatBilangan(-arg.nilai);
          }
          if (arg.jenis === JenisNilaiRuntime.DESIMAL) {
            return buatDesimal(-arg.nilai);
          }
          throw new GalatRuntime(
            JenisGalatRuntime.OPERASI_TIPE_TIDAK_VALID,
            `Operator unari '-' hanya dapat digunakan pada bilangan atau desimal, bukan ${arg.jenis}.`,
            u.posisi.awal,
            [...this.tumpukanPanggilan]
          );
        }

        if (u.operator === 'tidak') {
          if (arg.jenis === JenisNilaiRuntime.LOGIKA) {
            return buatLogika(!arg.nilai);
          }
          throw new GalatRuntime(
            JenisGalatRuntime.OPERASI_TIPE_TIDAK_VALID,
            `Operator 'tidak' hanya dapat digunakan pada nilai logika (benar/salah), bukan ${arg.jenis}.`,
            u.posisi.awal,
            [...this.tumpukanPanggilan]
          );
        }
        break;
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
    // 1. Operasi Penjumlahan & Penggabungan Teks
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

    // 2. Operasi Pengurangan
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

    // 3. Operasi Perkalian
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

    // 4. Operasi Pembagian (dengan Proteksi Pembagian dengan Nol)
    if (op === '/') {
      if (
        (kiri.jenis === JenisNilaiRuntime.BILANGAN || kiri.jenis === JenisNilaiRuntime.DESIMAL) &&
        (kanan.jenis === JenisNilaiRuntime.BILANGAN || kanan.jenis === JenisNilaiRuntime.DESIMAL)
      ) {
        if (kanan.nilai === 0) {
          throw new GalatRuntime(
            JenisGalatRuntime.PEMBAGIAN_NOL,
            'Pembagian dengan nol tidak diperbolehkan.',
            posisi,
            [...this.tumpukanPanggilan]
          );
        }
        return buatDesimal(kiri.nilai / kanan.nilai);
      }
    }

    // 5. Operasi Modulo (Sisa Bagi)
    if (op === '%') {
      if (kiri.jenis === JenisNilaiRuntime.BILANGAN && kanan.jenis === JenisNilaiRuntime.BILANGAN) {
        if (kanan.nilai === 0) {
          throw new GalatRuntime(
            JenisGalatRuntime.PEMBAGIAN_NOL,
            'Operasi modulo dengan nol tidak diperbolehkan.',
            posisi,
            [...this.tumpukanPanggilan]
          );
        }
        return buatBilangan(kiri.nilai % kanan.nilai);
      }
    }

    // 6. Operasi Perbandingan Kesetaraan (==, !=)
    if (op === '==') {
      if (kiri.jenis !== kanan.jenis) {
        // Toleransi kesetaraan angka bilangan vs desimal: 5 == 5.0 bernilai benar
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

    throw new GalatRuntime(
      JenisGalatRuntime.OPERASI_TIPE_TIDAK_VALID,
      `Operasi '${op}' tidak dapat digunakan pada tipe ${kiri.jenis} dan ${kanan.jenis}.`,
      posisi,
      [...this.tumpukanPanggilan]
    );
  }

  private panggilFungsiPengguna(
    fungsi: NilaiFungsiPengguna,
    argumen: NilaiRuntime[],
    nodePanggil: NodePemanggilanFungsi
  ): NilaiRuntime {
    const fnDeklarasi = fungsi.deklarasi;

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
      return buatKosong();
    } catch (e: any) {
      if (e instanceof SinyalKembalikan) {
        return e.nilai;
      }
      throw e;
    } finally {
      this.tumpukanPanggilan.pop();
      this.lingkunganSaatIni = simpanLingkungan;
    }
  }
}
