/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Token, JenisToken } from '../lexer/jenisToken';
import { Lexer } from '../lexer/lexer';
import { TokenStream } from '../lexer/tokenStream';
import {
  NodeProgram,
  PernyataanAST,
  EkspresiAST,
  JenisNodeAST,
  NodeDeklarasiVariabel,
  NodeDeklarasiTetap,
  NodePercabanganJika,
  NodePerulanganSelama,
  NodePerulanganUntuk,
  NodeDeklarasiFungsi,
  NodeParameterFungsi,
} from './ast';
import { GalatParser, JenisGalatParser, buatGalatTokenTakTerduga } from './galat';

/**
 * Parser Sintaksis Resmi Bahasa NUSANTARA (Phase 7).
 * Mengubah token hasil Lexer menjadi Pohon Sintaksis Abstrak (AST).
 */
export class Parser {
  private readonly stream: TokenStream;
  private readonly daftarGalat: GalatParser[] = [];

  constructor(masukan: string | Token[] | TokenStream | Lexer) {
    if (typeof masukan === 'string') {
      const lexer = new Lexer(masukan, { sertakanBarisBaru: false });
      this.stream = new TokenStream(lexer);
    } else if (masukan instanceof TokenStream) {
      this.stream = masukan;
    } else if (masukan instanceof Lexer) {
      this.stream = new TokenStream(masukan);
    } else {
      const tokenTanpaBarisBaru = masukan.filter(t => t.jenis !== JenisToken.BARIS_BARU);
      this.stream = new TokenStream(tokenTanpaBarisBaru);
    }
  }

  public dapatkanDaftarGalat(): ReadonlyArray<GalatParser> {
    return this.daftarGalat;
  }

  public parse(): NodeProgram {
    const tokenAwal = this.stream.current();
    let namaProgram = 'ProgramUtama';
    const tubuhUtama: PernyataanAST[] = [];
    const daftarFungsi: NodeDeklarasiFungsi[] = [];

    try {
      while (!this.stream.eof()) {
        if (this.cocok(JenisToken.KW_PROGRAM)) {
          const idTok = this.harapkan(JenisToken.IDENTIFIER, 'nama program setelah kata kunci program');
          namaProgram = idTok.nilai;
          this.harapkan(JenisToken.KW_MULAI, "kata kunci 'mulai' untuk membuka blok program");

          while (!this.periksa(JenisToken.KW_SELESAI) && !this.stream.eof()) {
            const stmt = this.parsePernyataan();
            if (stmt) tubuhUtama.push(stmt);
          }

          this.harapkan(JenisToken.KW_SELESAI, "kata kunci 'selesai' untuk menutup blok program");
        } else if (this.periksa(JenisToken.KW_FUNGSI)) {
          const fn = this.parseDeklarasiFungsi();
          if (fn) daftarFungsi.push(fn);
        } else {
          const stmt = this.parsePernyataan();
          if (stmt) {
            tubuhUtama.push(stmt);
          } else {
            this.catatGalat(
              buatGalatTokenTakTerduga('pernyataan atau deklarasi fungsi', this.stream.current())
            );
            this.sinkronisasi();
          }
        }
      }
    } catch (e: any) {
      if (e instanceof GalatParser) {
        this.daftarGalat.push(e);
      } else {
        throw e;
      }
    }

    const tokenAkhir = this.stream.current();
    return {
      jenis: JenisNodeAST.PROGRAM,
      namaProgram,
      tubuhUtama,
      daftarFungsi,
      posisi: {
        awal: tokenAwal.posisi.awal,
        akhir: tokenAkhir.posisi.akhir,
      },
    };
  }

  public parseDeklarasiFungsi(): NodeDeklarasiFungsi {
    const fnTok = this.harapkan(JenisToken.KW_FUNGSI, 'kata kunci fungsi');
    const namaTok = this.harapkan(JenisToken.IDENTIFIER, 'nama fungsi');
    this.harapkan(JenisToken.KURUNG_BUKA, "'(' setelah nama fungsi");

    const parameter: NodeParameterFungsi[] = [];
    if (!this.periksa(JenisToken.KURUNG_TUTUP)) {
      do {
        const paramNama = this.harapkan(JenisToken.IDENTIFIER, 'nama parameter fungsi');
        this.harapkan(JenisToken.TITIK_DUA, "':' setelah nama parameter");
        const paramTipe = this.harapkanNamaTipe();

        parameter.push({
          jenis: JenisNodeAST.PARAMETER_FUNGSI,
          nama: paramNama.nilai,
          tipeData: paramTipe.nilai,
          posisi: { awal: paramNama.posisi.awal, akhir: paramTipe.posisi.akhir },
        });
      } while (this.cocok(JenisToken.KOMA));
    }
    this.harapkan(JenisToken.KURUNG_TUTUP, "')' setelah daftar parameter");

    let tipeKembalian: string | undefined;
    if (this.cocok(JenisToken.TITIK_DUA)) {
      const retTok = this.harapkanNamaTipe();
      tipeKembalian = retTok.nilai;
    }

    this.harapkan(JenisToken.KW_MULAI, "kata kunci 'mulai' untuk membuka tubuh fungsi");
    const tubuh: PernyataanAST[] = [];
    while (!this.periksa(JenisToken.KW_SELESAI) && !this.stream.eof()) {
      const stmt = this.parsePernyataan();
      if (stmt) tubuh.push(stmt);
    }
    const akhirTok = this.harapkan(JenisToken.KW_SELESAI, "kata kunci 'selesai' untuk menutup fungsi");

    return {
      jenis: JenisNodeAST.DEKLARASI_FUNGSI,
      nama: namaTok.nilai,
      parameter,
      tipeKembalian,
      tubuh,
      posisi: { awal: fnTok.posisi.awal, akhir: akhirTok.posisi.akhir },
    };
  }

  public parsePernyataan(): PernyataanAST | null {
    try {
      const current = this.stream.current();

      if (this.cocok(JenisToken.KW_VARIABEL)) {
        return this.parseDeklarasiVariabelSetelahKataKunci(current);
      }

      if (this.cocok(JenisToken.KW_TETAP)) {
        return this.parseDeklarasiTetap(current);
      }

      if (this.cocok(JenisToken.KW_JIKA)) {
        return this.parsePercabanganJika(current);
      }

      if (this.cocok(JenisToken.KW_SELAIN)) {
        const g = new GalatParser(JenisGalatParser.TOKEN_TAK_TERDUGA, "Kata kunci 'selain' tidak pada tempatnya di luar percabangan 'jika'.", current);
        this.catatGalat(g);
        throw g;
      }

      if (this.cocok(JenisToken.KW_AKHIR)) {
        const g = new GalatParser(JenisGalatParser.TOKEN_TAK_TERDUGA, "Kata kunci 'akhir' tidak pada tempatnya tanpa blok pembuka yang sesuai.", current);
        this.catatGalat(g);
        throw g;
      }

      if (this.cocok(JenisToken.KW_SELAMA)) {
        return this.parsePerulanganSelama(current);
      }

      if (this.cocok(JenisToken.KW_UNTUK)) {
        return this.parsePerulanganUntuk(current);
      }

      if (this.cocok(JenisToken.KW_HENTIKAN)) {
        return {
          jenis: JenisNodeAST.INSTRUKSI_HENTIKAN,
          posisi: current.posisi,
        };
      }

      if (this.cocok(JenisToken.KW_LANJUTKAN)) {
        return {
          jenis: JenisNodeAST.INSTRUKSI_LANJUTKAN,
          posisi: current.posisi,
        };
      }

      if (this.cocok(JenisToken.KW_KEMBALIKAN)) {
        let nilai: EkspresiAST | undefined;
        if (!this.periksa(JenisToken.KW_SELESAI) && !this.periksa(JenisToken.KW_AKHIR) && !this.periksa(JenisToken.KW_SELAIN)) {
          nilai = this.parseEkspresi();
        }
        return {
          jenis: JenisNodeAST.INSTRUKSI_KEMBALIKAN,
          nilai,
          posisi: {
            awal: current.posisi.awal,
            akhir: nilai ? nilai.posisi.akhir : current.posisi.akhir,
          },
        };
      }

      if (this.periksa(JenisToken.IDENTIFIER)) {
        const setelahId = this.stream.peek(1);
        if (setelahId.jenis === JenisToken.TITIK_DUA) {
          const idTok = this.stream.next();
          return this.parseDeklarasiVariabelGayaRingkas(idTok);
        } else if (setelahId.jenis === JenisToken.OP_SAMA_DENGAN) {
          const idTok = this.stream.next();
          this.stream.next();
          const nilai = this.parseEkspresi();
          return {
            jenis: JenisNodeAST.PENUGASAN,
            target: idTok.nilai,
            nilai,
            posisi: { awal: idTok.posisi.awal, akhir: nilai.posisi.akhir },
          };
        }
      }

      const expr = this.parseEkspresi();
      return {
        jenis: JenisNodeAST.PERNYATAAN_EKSPRESI,
        ekspresi: expr,
        posisi: expr.posisi,
      };
    } catch (e: any) {
      if (e instanceof GalatParser) {
        this.daftarGalat.push(e);
        this.sinkronisasi();
        return null;
      }
      throw e;
    }
  }

  private parseDeklarasiVariabelSetelahKataKunci(tokenAwal: Token): NodeDeklarasiVariabel {
    const idTok = this.harapkan(JenisToken.IDENTIFIER, 'nama variabel');
    this.harapkan(JenisToken.TITIK_DUA, "':' setelah nama variabel");
    const tipeTok = this.harapkanNamaTipe();
    this.harapkan(JenisToken.OP_SAMA_DENGAN, "'=' untuk inisialisasi variabel");
    const nilaiAwal = this.parseEkspresi();

    return {
      jenis: JenisNodeAST.DEKLARASI_VARIABEL,
      nama: idTok.nilai,
      tipeData: tipeTok.nilai,
      nilaiAwal,
      posisi: { awal: tokenAwal.posisi.awal, akhir: nilaiAwal.posisi.akhir },
    };
  }

  private parseDeklarasiVariabelGayaRingkas(idTok: Token): NodeDeklarasiVariabel {
    this.harapkan(JenisToken.TITIK_DUA, "':' setelah nama variabel");
    const tipeTok = this.harapkanNamaTipe();
    this.harapkan(JenisToken.OP_SAMA_DENGAN, "'=' untuk inisialisasi variabel");
    const nilaiAwal = this.parseEkspresi();

    return {
      jenis: JenisNodeAST.DEKLARASI_VARIABEL,
      nama: idTok.nilai,
      tipeData: tipeTok.nilai,
      nilaiAwal,
      posisi: { awal: idTok.posisi.awal, akhir: nilaiAwal.posisi.akhir },
    };
  }

  private parseDeklarasiTetap(tokenAwal: Token): NodeDeklarasiTetap {
    const idTok = this.harapkan(JenisToken.IDENTIFIER, 'nama konstanta tetap');
    this.harapkan(JenisToken.TITIK_DUA, "':' setelah nama konstanta");
    const tipeTok = this.harapkanNamaTipe();
    this.harapkan(JenisToken.OP_SAMA_DENGAN, "'=' untuk inisialisasi konstanta");
    const nilaiAwal = this.parseEkspresi();

    return {
      jenis: JenisNodeAST.DEKLARASI_TETAP,
      nama: idTok.nilai,
      tipeData: tipeTok.nilai,
      nilaiAwal,
      posisi: { awal: tokenAwal.posisi.awal, akhir: nilaiAwal.posisi.akhir },
    };
  }

  private parsePercabanganJika(tokenAwal: Token): NodePercabanganJika {
    if (this.periksa(JenisToken.KW_MAKA)) {
      const g = new GalatParser(JenisGalatParser.EKSPRESI_TIDAK_LENGKAP, "Kondisi percabangan 'jika' tidak boleh kosong.", this.stream.current());
      this.catatGalat(g);
      throw g;
    }

    const kondisi = this.parseEkspresi();
    this.harapkan(JenisToken.KW_MAKA, "kata kunci 'maka' setelah kondisi jika");

    const cabangMaka: PernyataanAST[] = [];
    while (
      !this.periksa(JenisToken.KW_SELAIN) &&
      !this.periksa(JenisToken.KW_AKHIR) &&
      !this.stream.eof()
    ) {
      if (this.periksa(JenisToken.KW_SELESAI)) {
        const g = new GalatParser(
          JenisGalatParser.BLOK_TIDAK_DITUTUP,
          "Blok percabangan 'jika' belum ditutup. Diharapkan kata kunci 'akhir' sebelum 'selesai'.",
          this.stream.current()
        );
        this.catatGalat(g);
        throw g;
      }
      const stmt = this.parsePernyataan();
      if (stmt) cabangMaka.push(stmt);
    }

    let cabangSelain: PernyataanAST[] | undefined;
    if (this.cocok(JenisToken.KW_SELAIN)) {
      cabangSelain = [];
      while (!this.periksa(JenisToken.KW_AKHIR) && !this.stream.eof()) {
        if (this.periksa(JenisToken.KW_SELESAI)) {
          const g = new GalatParser(
            JenisGalatParser.BLOK_TIDAK_DITUTUP,
            "Blok percabangan 'jika' belum ditutup. Diharapkan kata kunci 'akhir' sebelum 'selesai'.",
            this.stream.current()
          );
          this.catatGalat(g);
          throw g;
        }
        const stmt = this.parsePernyataan();
        if (stmt) cabangSelain.push(stmt);
      }
    }

    if (this.stream.eof()) {
      const g = new GalatParser(JenisGalatParser.BLOK_TIDAK_DITUTUP, "Blok percabangan 'jika' belum ditutup dengan 'akhir'.", tokenAwal);
      this.catatGalat(g);
      throw g;
    }

    const akhirTok = this.harapkan(JenisToken.KW_AKHIR, "kata kunci 'akhir' untuk menutup percabangan jika");

    return {
      jenis: JenisNodeAST.PERCABANGAN_JIKA,
      kondisi,
      cabangMaka,
      cabangSelain,
      posisi: { awal: tokenAwal.posisi.awal, akhir: akhirTok.posisi.akhir },
    };
  }

  private parsePerulanganSelama(tokenAwal: Token): NodePerulanganSelama {
    const kondisi = this.parseEkspresi();
    this.harapkan(JenisToken.KW_LAKUKAN, "kata kunci 'lakukan' setelah kondisi selama");

    const tubuh: PernyataanAST[] = [];
    while (!this.periksa(JenisToken.KW_AKHIR) && !this.stream.eof()) {
      const stmt = this.parsePernyataan();
      if (stmt) tubuh.push(stmt);
    }

    const akhirTok = this.harapkan(JenisToken.KW_AKHIR, "kata kunci 'akhir' untuk menutup perulangan selama");

    return {
      jenis: JenisNodeAST.PERULANGAN_SELAMA,
      kondisi,
      tubuh,
      posisi: { awal: tokenAwal.posisi.awal, akhir: akhirTok.posisi.akhir },
    };
  }

  private parsePerulanganUntuk(tokenAwal: Token): NodePerulanganUntuk {
    const varTok = this.harapkan(JenisToken.IDENTIFIER, 'nama variabel perulangan untuk');
    this.harapkan(JenisToken.KW_DARI, "kata kunci 'dari' setelah variabel untuk");
    const nilaiAwal = this.parseEkspresi();
    this.harapkan(JenisToken.KW_SAMPAI, "kata kunci 'sampai' setelah batas awal untuk");
    const nilaiAkhir = this.parseEkspresi();
    this.harapkan(JenisToken.KW_LAKUKAN, "kata kunci 'lakukan' setelah batas akhir untuk");

    const tubuh: PernyataanAST[] = [];
    while (!this.periksa(JenisToken.KW_AKHIR) && !this.stream.eof()) {
      const stmt = this.parsePernyataan();
      if (stmt) tubuh.push(stmt);
    }

    const akhirTok = this.harapkan(JenisToken.KW_AKHIR, "kata kunci 'akhir' untuk menutup perulangan untuk");

    return {
      jenis: JenisNodeAST.PERULANGAN_UNTUK,
      variabelPenghitung: varTok.nilai,
      nilaiAwal,
      nilaiAkhir,
      tubuh,
      posisi: { awal: tokenAwal.posisi.awal, akhir: akhirTok.posisi.akhir },
    };
  }

  public parseEkspresi(): EkspresiAST {
    return this.parseLogikaAtau();
  }

  private parseLogikaAtau(): EkspresiAST {
    let expr = this.parseLogikaDan();

    while (this.cocok(JenisToken.OP_LOGIKA_ATAU)) {
      const kanan = this.parseLogikaDan();
      expr = {
        jenis: JenisNodeAST.EKSPRESI_BINER,
        operator: 'atau',
        kiri: expr,
        kanan,
        posisi: { awal: expr.posisi.awal, akhir: kanan.posisi.akhir },
      };
    }

    return expr;
  }

  private parseLogikaDan(): EkspresiAST {
    let expr = this.parseKesetaraan();

    while (this.cocok(JenisToken.OP_LOGIKA_DAN)) {
      const kanan = this.parseKesetaraan();
      expr = {
        jenis: JenisNodeAST.EKSPRESI_BINER,
        operator: 'dan',
        kiri: expr,
        kanan,
        posisi: { awal: expr.posisi.awal, akhir: kanan.posisi.akhir },
      };
    }

    return expr;
  }

  private parseKesetaraan(): EkspresiAST {
    let expr = this.parseRelasional();

    while (this.periksa(JenisToken.OP_KESETARAAN) || this.periksa(JenisToken.OP_KETIDAKSAMAAN)) {
      const opTok = this.stream.next();
      const kanan = this.parseRelasional();
      expr = {
        jenis: JenisNodeAST.EKSPRESI_BINER,
        operator: opTok.nilai,
        kiri: expr,
        kanan,
        posisi: { awal: expr.posisi.awal, akhir: kanan.posisi.akhir },
      };
    }

    return expr;
  }

  private parseRelasional(): EkspresiAST {
    let expr = this.parsePenjumlahan();

    while (
      this.periksa(JenisToken.OP_LEBIH_KECIL) ||
      this.periksa(JenisToken.OP_LEBIH_KECIL_SAMA) ||
      this.periksa(JenisToken.OP_LEBIH_BESAR) ||
      this.periksa(JenisToken.OP_LEBIH_BESAR_SAMA)
    ) {
      const opTok = this.stream.next();
      const kanan = this.parsePenjumlahan();
      expr = {
        jenis: JenisNodeAST.EKSPRESI_BINER,
        operator: opTok.nilai,
        kiri: expr,
        kanan,
        posisi: { awal: expr.posisi.awal, akhir: kanan.posisi.akhir },
      };
    }

    return expr;
  }

  private parsePenjumlahan(): EkspresiAST {
    let expr = this.parsePerkalian();

    while (this.periksa(JenisToken.OP_TAMBAH) || this.periksa(JenisToken.OP_KURANG)) {
      const opTok = this.stream.next();
      const kanan = this.parsePerkalian();
      expr = {
        jenis: JenisNodeAST.EKSPRESI_BINER,
        operator: opTok.nilai,
        kiri: expr,
        kanan,
        posisi: { awal: expr.posisi.awal, akhir: kanan.posisi.akhir },
      };
    }

    return expr;
  }

  private parsePerkalian(): EkspresiAST {
    let expr = this.parseUnari();

    while (
      this.periksa(JenisToken.OP_KALI) ||
      this.periksa(JenisToken.OP_BAGI) ||
      this.periksa(JenisToken.OP_MODULO)
    ) {
      const opTok = this.stream.next();
      const kanan = this.parseUnari();
      expr = {
        jenis: JenisNodeAST.EKSPRESI_BINER,
        operator: opTok.nilai,
        kiri: expr,
        kanan,
        posisi: { awal: expr.posisi.awal, akhir: kanan.posisi.akhir },
      };
    }

    return expr;
  }

  private parseUnari(): EkspresiAST {
    if (this.periksa(JenisToken.OP_LOGIKA_TIDAK) || this.periksa(JenisToken.OP_KURANG)) {
      const opTok = this.stream.next();
      const argumen = this.parseUnari();
      return {
        jenis: JenisNodeAST.EKSPRESI_UNARI,
        operator: opTok.nilai,
        argumen,
        posisi: { awal: opTok.posisi.awal, akhir: argumen.posisi.akhir },
      };
    }

    return this.parsePrimer();
  }

  private parsePrimer(): EkspresiAST {
    const current = this.stream.current();

    if (this.cocok(JenisToken.LITERAL_BILANGAN)) {
      return {
        jenis: JenisNodeAST.LITERAL,
        tipeLiteral: 'bilangan',
        nilaiMentah: current.nilai,
        nilaiTerurai: parseInt(current.nilai, 10),
        posisi: current.posisi,
      };
    }

    if (this.cocok(JenisToken.LITERAL_DESIMAL)) {
      return {
        jenis: JenisNodeAST.LITERAL,
        tipeLiteral: 'desimal',
        nilaiMentah: current.nilai,
        nilaiTerurai: parseFloat(current.nilai),
        posisi: current.posisi,
      };
    }

    if (this.cocok(JenisToken.LITERAL_TEKS)) {
      return {
        jenis: JenisNodeAST.LITERAL,
        tipeLiteral: 'teks',
        nilaiMentah: current.nilai,
        nilaiTerurai: current.nilai,
        posisi: current.posisi,
      };
    }

    if (this.cocok(JenisToken.LITERAL_KARAKTER)) {
      return {
        jenis: JenisNodeAST.LITERAL,
        tipeLiteral: 'karakter',
        nilaiMentah: current.nilai,
        nilaiTerurai: current.nilai,
        posisi: current.posisi,
      };
    }

    if (this.cocok(JenisToken.KW_BENAR)) {
      return {
        jenis: JenisNodeAST.LITERAL,
        tipeLiteral: 'logika',
        nilaiMentah: 'benar',
        nilaiTerurai: true,
        posisi: current.posisi,
      };
    }

    if (this.cocok(JenisToken.KW_SALAH)) {
      return {
        jenis: JenisNodeAST.LITERAL,
        tipeLiteral: 'logika',
        nilaiMentah: 'salah',
        nilaiTerurai: false,
        posisi: current.posisi,
      };
    }

    if (this.cocok(JenisToken.KW_KOSONG)) {
      return {
        jenis: JenisNodeAST.LITERAL,
        tipeLiteral: 'kosong',
        nilaiMentah: 'kosong',
        nilaiTerurai: null,
        posisi: current.posisi,
      };
    }

    if (this.cocok(JenisToken.IDENTIFIER)) {
      if (this.cocok(JenisToken.KURUNG_BUKA)) {
        const argumen: EkspresiAST[] = [];
        if (!this.periksa(JenisToken.KURUNG_TUTUP)) {
          do {
            argumen.push(this.parseEkspresi());
          } while (this.cocok(JenisToken.KOMA));
        }
        const tutupTok = this.harapkan(JenisToken.KURUNG_TUTUP, "')' setelah daftar argumen fungsi");
        return {
          jenis: JenisNodeAST.PEMANGGILAN_FUNGSI,
          namaFungsi: current.nilai,
          argumen,
          posisi: { awal: current.posisi.awal, akhir: tutupTok.posisi.akhir },
        };
      }

      return {
        jenis: JenisNodeAST.PENGIDENTIFIKASI,
        nama: current.nilai,
        posisi: current.posisi,
      };
    }

    if (this.cocok(JenisToken.KURUNG_BUKA)) {
      const dalam = this.parseEkspresi();
      const tutupTok = this.harapkan(JenisToken.KURUNG_TUTUP, "')' setelah ekspresi pengelompokan");
      return {
        jenis: JenisNodeAST.EKSPRESI_PENGELOMPOKAN,
        ekspresi: dalam,
        posisi: { awal: current.posisi.awal, akhir: tutupTok.posisi.akhir },
      };
    }

    throw buatGalatTokenTakTerduga('ekspresi', current);
  }

  private periksa(jenis: JenisToken): boolean {
    if (this.stream.eof()) return jenis === JenisToken.EOF;
    return this.stream.current().jenis === jenis;
  }

  private cocok(jenis: JenisToken): boolean {
    if (this.periksa(jenis)) {
      this.stream.next();
      return true;
    }
    return false;
  }

  private harapkan(jenis: JenisToken, pesanHarapan: string): Token {
    if (this.periksa(jenis)) {
      return this.stream.next();
    }
    const galat = buatGalatTokenTakTerduga(pesanHarapan, this.stream.current());
    this.catatGalat(galat);
    throw galat;
  }

  private harapkanNamaTipe(): Token {
    if (this.periksa(JenisToken.IDENTIFIER) || this.periksa(JenisToken.KW_KOSONG)) {
      return this.stream.next();
    }
    const galat = buatGalatTokenTakTerduga('nama tipe data', this.stream.current());
    this.catatGalat(galat);
    throw galat;
  }

  private catatGalat(galat: GalatParser): void {
    this.daftarGalat.push(galat);
  }

  private sinkronisasi(): void {
    this.stream.next();

    while (!this.stream.eof()) {
      const j = this.stream.current().jenis;

      if (
        j === JenisToken.KW_PROGRAM ||
        j === JenisToken.KW_MULAI ||
        j === JenisToken.KW_SELESAI ||
        j === JenisToken.KW_FUNGSI ||
        j === JenisToken.KW_JIKA ||
        j === JenisToken.KW_SELAMA ||
        j === JenisToken.KW_UNTUK ||
        j === JenisToken.KW_VARIABEL ||
        j === JenisToken.KW_TETAP ||
        j === JenisToken.KW_KEMBALIKAN ||
        j === JenisToken.KW_AKHIR
      ) {
        return;
      }

      this.stream.next();
    }
  }
}
