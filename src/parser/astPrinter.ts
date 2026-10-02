/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  NodeAST,
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
  NodeEkspresiBiner,
  NodeEkspresiUnari,
  NodePemanggilanFungsi,
  NodeEkspresiPengelompokan,
  NodeLiteral,
  NodePengidentifikasi,
} from './ast';

export class ASTPrinter {
  public static cetak(node: NodeAST, indent: string = ''): string {
    switch (node.jenis) {
      case JenisNodeAST.PROGRAM: {
        const prog = node as NodeProgram;
        let hasil = `${indent}Program: ${prog.namaProgram}\n`;
        hasil += `${indent}  Blok Utama (mulai ... selesai):\n`;
        for (const stmt of prog.tubuhUtama) {
          hasil += ASTPrinter.cetakPernyataan(stmt, indent + '    ');
        }
        if (prog.daftarFungsi.length > 0) {
          hasil += `${indent}  Daftar Fungsi:\n`;
          for (const fn of prog.daftarFungsi) {
            hasil += ASTPrinter.cetakFungsi(fn, indent + '    ');
          }
        }
        return hasil;
      }

      default:
        return `${indent}${node.jenis}\n`;
    }
  }

  private static cetakFungsi(fn: NodeDeklarasiFungsi, indent: string): string {
    const params = fn.parameter.map(p => `${p.nama} : ${p.tipeData}`).join(', ');
    const retType = fn.tipeKembalian ? ` : ${fn.tipeKembalian}` : '';
    let hasil = `${indent}Fungsi: ${fn.nama}(${params})${retType}\n`;
    hasil += `${indent}  Tubuh:\n`;
    for (const stmt of fn.tubuh) {
      hasil += ASTPrinter.cetakPernyataan(stmt, indent + '    ');
    }
    return hasil;
  }

  public static cetakPernyataan(stmt: PernyataanAST, indent: string): string {
    switch (stmt.jenis) {
      case JenisNodeAST.DEKLARASI_VARIABEL: {
        const s = stmt as NodeDeklarasiVariabel;
        let res = `${indent}DeklarasiVariabel: ${s.nama} : ${s.tipeData} =\n`;
        res += ASTPrinter.cetakEkspresi(s.nilaiAwal, indent + '  ');
        return res;
      }

      case JenisNodeAST.DEKLARASI_TETAP: {
        const s = stmt as NodeDeklarasiTetap;
        let res = `${indent}DeklarasiTetap: ${s.nama} : ${s.tipeData} =\n`;
        res += ASTPrinter.cetakEkspresi(s.nilaiAwal, indent + '  ');
        return res;
      }

      case JenisNodeAST.PENUGASAN: {
        const s = stmt as NodePenugasan;
        let res = `${indent}Penugasan: ${s.target} =\n`;
        res += ASTPrinter.cetakEkspresi(s.nilai, indent + '  ');
        return res;
      }

      case JenisNodeAST.PERCABANGAN_JIKA: {
        const s = stmt as NodePercabanganJika;
        let res = `${indent}PercabanganJika (kondisi):\n`;
        res += ASTPrinter.cetakEkspresi(s.kondisi, indent + '  ');
        res += `${indent}  Cabang Maka:\n`;
        for (const st of s.cabangMaka) {
          res += ASTPrinter.cetakPernyataan(st, indent + '    ');
        }
        if (s.cabangSelain && s.cabangSelain.length > 0) {
          res += `${indent}  Cabang Selain:\n`;
          for (const st of s.cabangSelain) {
            res += ASTPrinter.cetakPernyataan(st, indent + '    ');
          }
        }
        return res;
      }

      case JenisNodeAST.PERULANGAN_SELAMA: {
        const s = stmt as NodePerulanganSelama;
        let res = `${indent}PerulanganSelama (kondisi):\n`;
        res += ASTPrinter.cetakEkspresi(s.kondisi, indent + '  ');
        res += `${indent}  Tubuh:\n`;
        for (const st of s.tubuh) {
          res += ASTPrinter.cetakPernyataan(st, indent + '    ');
        }
        return res;
      }

      case JenisNodeAST.PERULANGAN_UNTUK: {
        const s = stmt as NodePerulanganUntuk;
        let res = `${indent}PerulanganUntuk: ${s.variabelPenghitung}\n`;
        res += `${indent}  Dari:\n` + ASTPrinter.cetakEkspresi(s.nilaiAwal, indent + '    ');
        res += `${indent}  Sampai:\n` + ASTPrinter.cetakEkspresi(s.nilaiAkhir, indent + '    ');
        res += `${indent}  Tubuh:\n`;
        for (const st of s.tubuh) {
          res += ASTPrinter.cetakPernyataan(st, indent + '    ');
        }
        return res;
      }

      case JenisNodeAST.INSTRUKSI_HENTIKAN:
        return `${indent}Instruksi: hentikan\n`;

      case JenisNodeAST.INSTRUKSI_LANJUTKAN:
        return `${indent}Instruksi: lanjutkan\n`;

      case JenisNodeAST.INSTRUKSI_KEMBALIKAN: {
        const s = stmt as NodeInstruksiKembalikan;
        if (s.nilai) {
          return `${indent}InstruksiKembalikan:\n` + ASTPrinter.cetakEkspresi(s.nilai, indent + '  ');
        }
        return `${indent}InstruksiKembalikan (kosong)\n`;
      }

      case JenisNodeAST.PERNYATAAN_EKSPRESI: {
        const s = stmt as NodePernyataanEkspresi;
        return `${indent}PernyataanEkspresi:\n` + ASTPrinter.cetakEkspresi(s.ekspresi, indent + '  ');
      }

      case JenisNodeAST.PERNYATAAN_BLOK: {
        let res = `${indent}Blok:\n`;
        for (const st of stmt.daftarPernyataan) {
          res += ASTPrinter.cetakPernyataan(st, indent + '  ');
        }
        return res;
      }
    }
  }

  public static cetakEkspresi(expr: EkspresiAST, indent: string): string {
    switch (expr.jenis) {
      case JenisNodeAST.LITERAL: {
        const l = expr as NodeLiteral;
        return `${indent}Literal (${l.tipeLiteral}): ${JSON.stringify(l.nilaiTerurai)}\n`;
      }

      case JenisNodeAST.PENGIDENTIFIKASI: {
        const id = expr as NodePengidentifikasi;
        return `${indent}Pengidentifikasi: ${id.nama}\n`;
      }

      case JenisNodeAST.EKSPRESI_UNARI: {
        const u = expr as NodeEkspresiUnari;
        let res = `${indent}EkspresiUnari (${u.operator}):\n`;
        res += ASTPrinter.cetakEkspresi(u.argumen, indent + '  ');
        return res;
      }

      case JenisNodeAST.EKSPRESI_BINER: {
        const b = expr as NodeEkspresiBiner;
        let res = `${indent}EkspresiBiner ('${b.operator}'):\n`;
        res += `${indent}  Kiri:\n` + ASTPrinter.cetakEkspresi(b.kiri, indent + '    ');
        res += `${indent}  Kanan:\n` + ASTPrinter.cetakEkspresi(b.kanan, indent + '    ');
        return res;
      }

      case JenisNodeAST.EKSPRESI_PENGELOMPOKAN: {
        const g = expr as NodeEkspresiPengelompokan;
        let res = `${indent}Pengelompokan ( ):\n`;
        res += ASTPrinter.cetakEkspresi(g.ekspresi, indent + '  ');
        return res;
      }

      case JenisNodeAST.PEMANGGILAN_FUNGSI: {
        const c = expr as NodePemanggilanFungsi;
        let res = `${indent}PemanggilanFungsi: ${c.namaFungsi}()\n`;
        if (c.argumen.length > 0) {
          res += `${indent}  Argumen:\n`;
          for (const arg of c.argumen) {
            res += ASTPrinter.cetakEkspresi(arg, indent + '    ');
          }
        }
        return res;
      }
    }
  }
}
