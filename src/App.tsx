/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  Folder,
  FileCode,
  FileText,
  Terminal,
  Copy,
  Check,
  GitBranch,
  Layers,
  BookOpen,
  Cpu,
  ShieldCheck,
  Code2,
  AlertTriangle,
  Network,
  Play,
  CheckCircle2,
  Calculator,
  Repeat,
  Split,
  Workflow
} from 'lucide-react';
import {
  BERKAS_REPOSITORI,
  DAFTAR_PRESEDENSI_OPERATOR,
  DAFTAR_GLOSARIUM,
  DAFTAR_FASE_ROADMAP,
  DAFTAR_TIPE_MATRIKS_PHASE9,
  BerkasRepo
} from './data/berkasRepositori';
import { Lexer } from './lexer/lexer';
import { JenisToken } from './lexer/jenisToken';
import { Parser } from './parser/parser';
import { ASTPrinter } from './parser/astPrinter';
import { Interpreter } from './interpreter/interpreter';
import { PenulisOutputBuffer } from './interpreter/outputWriter';
import { PemeriksaTipe } from './tipe/pemeriksaTipe';

export default function App() {
  const [activeTab, setActiveTab] = useState<'fungsi' | 'perulangan' | 'percabangan' | 'operator' | 'tipe' | 'ast' | 'token' | 'panduan' | 'berkas' | 'roadmap' | 'git'>('fungsi');
  const [selectedFile, setSelectedFile] = useState<BerkasRepo>(BERKAS_REPOSITORI[0]);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [playgroundCode, setPlaygroundCode] = useState<string>(
    `program DemonstrasiFungsi

// Deklarasi fungsi dengan nilai kembali bilangan
fungsi kuadrat(angka : bilangan) : bilangan
mulai
    kembalikan angka * angka
selesai

// Deklarasi fungsi rekursif faktorial
fungsi faktorial(n : bilangan) : bilangan
mulai
    jika n <= 1 maka
        kembalikan 1
    akhir
    kembalikan n * faktorial(n - 1)
selesai

// Prosedur (fungsi tanpa tipe kembalian)
fungsi sapa(nama : teks)
mulai
    tampilkan("Selamat datang di bahasa NUSANTARA, " + nama + "!")
selesai

mulai
    sapa("Nusantara")

    x : bilangan = 5
    tampilkan("Kuadrat dari " + x + " = " + kuadrat(x))

    tampilkan("--- Uji Rekursi Faktorial 1 sampai 5 ---")
    untuk i dari 1 sampai 5 lakukan
        tampilkan("Faktorial " + i + "! = " + faktorial(i))
    akhir
selesai`
  );
  const [activeFilterCategory, setActiveFilterCategory] = useState<string>('Semua');

  // 1. Eksekusi Lexer
  const { tokens } = useMemo(() => {
    const l = new Lexer(playgroundCode, { sertakanBarisBaru: false });
    const { token } = l.tokenisasi();
    return { tokens: token };
  }, [playgroundCode]);

  // 2. Eksekusi Parser (Phase 7 & 13)
  const { ast, astString, parserErrors } = useMemo(() => {
    try {
      const p = new Parser(playgroundCode);
      const parsedAst = p.parse();
      const treeText = ASTPrinter.cetak(parsedAst);
      return {
        ast: parsedAst,
        astString: treeText,
        parserErrors: p.dapatkanDaftarGalat(),
      };
    } catch (e: any) {
      return {
        ast: null,
        astString: '',
        parserErrors: [e],
      };
    }
  }, [playgroundCode]);

  // 3. Eksekusi Type Checker (Phase 9-13)
  const { typeErrors } = useMemo(() => {
    if (!ast) return { typeErrors: [] };
    const checker = new PemeriksaTipe();
    return { typeErrors: checker.periksa(ast) };
  }, [ast]);

  // 4. Eksekusi Interpreter (Phase 8-13)
  const { runOutput, runtimeError } = useMemo(() => {
    try {
      const buffer = new PenulisOutputBuffer();
      const interp = new Interpreter(buffer);
      interp.jalankanKode(playgroundCode);
      return {
        runOutput: buffer.dapatkanSeluruhTeks(),
        runtimeError: null,
      };
    } catch (e: any) {
      return {
        runOutput: [],
        runtimeError: e.message || String(e),
      };
    }
  }, [playgroundCode]);

  const handleCopy = (teks: string, label: string) => {
    navigator.clipboard.writeText(teks);
    setCopiedText(label);
    setTimeout(() => {
      setCopiedText(null);
    }, 2000);
  };

  const filteredRoadmap = activeFilterCategory === 'Semua'
    ? DAFTAR_FASE_ROADMAP
    : DAFTAR_FASE_ROADMAP.filter(f => f.kategori === activeFilterCategory);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-900 selection:text-rose-100">
      {/* 1. TOP BAR */}
      <header className="border-b border-slate-800/80 bg-slate-950/95 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-xl tracking-tight text-white flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-600 inline-block shadow-sm shadow-rose-500/50"></span>
              NUSANTARA
            </span>
            <span className="hidden sm:inline text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
              v0.13.0
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-300">
            <button
              onClick={() => setActiveTab('fungsi')}
              className={`hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'fungsi' ? 'text-indigo-400 font-semibold' : 'text-slate-400'
              }`}
            >
              <Workflow className="w-4 h-4" />
              Fungsi (Phase 13)
            </button>
            <button
              onClick={() => setActiveTab('perulangan')}
              className={`hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'perulangan' ? 'text-emerald-400 font-semibold' : 'text-slate-400'
              }`}
            >
              <Repeat className="w-4 h-4" />
              Perulangan (Phase 12)
            </button>
            <button
              onClick={() => setActiveTab('percabangan')}
              className={`hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'percabangan' ? 'text-cyan-400 font-semibold' : 'text-slate-400'
              }`}
            >
              <Split className="w-4 h-4" />
              Percabangan (Phase 11)
            </button>
            <button
              onClick={() => setActiveTab('operator')}
              className={`hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'operator' ? 'text-amber-400 font-semibold' : 'text-slate-400'
              }`}
            >
              <Calculator className="w-4 h-4" />
              Operator (Phase 10)
            </button>
            <button
              onClick={() => setActiveTab('tipe')}
              className={`hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'tipe' ? 'text-purple-400 font-semibold' : 'text-slate-400'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              Sistem Tipe (Phase 9)
            </button>
            <button
              onClick={() => setActiveTab('ast')}
              className={`hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'ast' ? 'text-cyan-300 font-semibold' : 'text-slate-400'
              }`}
            >
              <Network className="w-4 h-4" />
              Pohon AST
            </button>
            <button
              onClick={() => setActiveTab('token')}
              className={`hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'token' ? 'text-teal-400 font-semibold' : 'text-slate-400'
              }`}
            >
              <Cpu className="w-4 h-4" />
              Token
            </button>
            <button
              onClick={() => setActiveTab('berkas')}
              className={`hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'berkas' ? 'text-white font-semibold' : 'text-slate-400'
              }`}
            >
              <Folder className="w-4 h-4" />
              Berkas
            </button>
            <button
              onClick={() => setActiveTab('roadmap')}
              className={`hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'roadmap' ? 'text-white font-semibold' : 'text-slate-400'
              }`}
            >
              <Layers className="w-4 h-4" />
              Roadmap
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleCopy('git commit -m "feat: implement nusantara functions"', 'commit-p13')}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-200 bg-slate-900 border border-slate-700/80 rounded-lg hover:bg-slate-800 hover:text-white transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              {copiedText === 'commit-p13' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Terminal className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copiedText === 'commit-p13' ? 'Tersalin' : 'Salin Pesan Komit'}</span>
            </button>
            <span className="px-3 py-1 text-xs font-semibold text-white bg-indigo-700/80 rounded-lg whitespace-nowrap border border-indigo-500/40">
              v0.13.0
            </span>
          </div>
        </div>
      </header>

      {/* 2. HERO STATEMENT & METADATA */}
      <section className="border-b border-slate-800/60 bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950 py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-4 tracking-wide font-mono">
            <span className="text-indigo-400 font-bold bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800">Milestone v0.13.0</span>
            <span aria-hidden="true">·</span>
            <span className="text-white font-medium">Phase 13: Sistem Fungsi & Prosedur NUSANTARA</span>
            <span aria-hidden="true">·</span>
            <span className="text-indigo-300 font-mono">fungsi · parameter · tipe · kembalikan · rekursi · mulai · selesai</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400 font-semibold">149 Berkas Valid (185 Uji Lulus 100%)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white max-w-4xl leading-tight">
            Sistem Fungsi &amp; Prosedur: <span className="text-indigo-400 font-mono">fungsi</span>, <span className="text-emerald-400 font-mono">kembalikan</span>, &amp; Rekursi.
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Bahasa pemrograman NUSANTARA mendukung deklarasi fungsi murni dan prosedur, validasi tipe parameter statis, pengembalian nilai berbasis tipe terikat (<code className="text-emerald-300 font-mono font-semibold">kembalikan</code>), isolasi variabel lokal leksikal, pemanggilan bersarang, serta eksekusi fungsi rekursif dengan proteksi kedalaman tumpukan.
          </p>

          <div className="mt-6 p-4 rounded-xl bg-slate-900/90 border border-slate-800 max-w-3xl flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <span className="font-semibold text-indigo-300">Pipa Kompilasi Lengkap:</span> Kode sumber NUSANTARA melewati tahapan Lexer ➔ Parser (AST NodeDeklarasiFungsi &amp; NodePemanggilanFungsi) ➔ Pemeriksa Tipe (Validasi kompatibilitas parameter, tipe kembalian wajib, keunikan nama) ➔ Interpreter dengan manajemen tumpukan pemanggilan (*stack frame*) &amp; sinyal pengembalian nilai.
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full">
        {/* Navigation Sub-Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-4 mb-6 overflow-x-auto text-sm">
          <button
            onClick={() => setActiveTab('fungsi')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'fungsi' ? 'bg-indigo-950 text-indigo-200 border border-indigo-700/60 font-semibold' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Workflow className="w-4 h-4 text-indigo-400" />
            <span>Fungsi &amp; Rekursi (Phase 13)</span>
          </button>
          <button
            onClick={() => setActiveTab('perulangan')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'perulangan' ? 'bg-emerald-950 text-emerald-200 border border-emerald-700/60 font-semibold' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Repeat className="w-4 h-4 text-emerald-400" />
            <span>Perulangan (Phase 12)</span>
          </button>
          <button
            onClick={() => setActiveTab('percabangan')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'percabangan' ? 'bg-cyan-950 text-cyan-200 border border-cyan-700/60 font-semibold' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Split className="w-4 h-4 text-cyan-400" />
            <span>Percabangan (Phase 11)</span>
          </button>
          <button
            onClick={() => setActiveTab('operator')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'operator' ? 'bg-amber-950 text-amber-200 border border-amber-700/60 font-semibold' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Calculator className="w-4 h-4 text-amber-400" />
            <span>Tabel Operator (Phase 10)</span>
          </button>
          <button
            onClick={() => setActiveTab('tipe')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'tipe' ? 'bg-purple-950 text-purple-200 border border-purple-700/60 font-semibold' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
            <span>Sistem Tipe (Phase 9)</span>
          </button>
          <button
            onClick={() => setActiveTab('ast')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'ast' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Network className="w-4 h-4 text-cyan-400" />
            <span>Pohon AST</span>
          </button>
          <button
            onClick={() => setActiveTab('token')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'token' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Cpu className="w-4 h-4 text-teal-400" />
            <span>Token Lexer ({tokens.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('panduan')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'panduan' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4 text-rose-400" />
            <span>Panduan &amp; Glosarium</span>
          </button>
          <button
            onClick={() => setActiveTab('berkas')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'berkas' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Folder className="w-4 h-4 text-amber-400" />
            <span>Berkas Repositori (149)</span>
          </button>
          <button
            onClick={() => setActiveTab('roadmap')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'roadmap' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Layers className="w-4 h-4 text-purple-400" />
            <span>Peta Jalan 36 Fase</span>
          </button>
        </div>

        {/* TAB 1: PLAYGROUND INTERAKTIF (FUNGSI, PERULANGAN, PERCABANGAN, TIPE) */}
        {(activeTab === 'fungsi' || activeTab === 'perulangan' || activeTab === 'percabangan' || activeTab === 'tipe') && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Editor Kode Sumber */}
              <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col h-[700px]">
                <div className="flex flex-wrap items-center justify-between pb-3 mb-3 border-b border-slate-800 gap-2">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Editor Interaktif .nusantara
                    </span>
                  </div>

                  {/* Preset Buttons */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      onClick={() =>
                        setPlaygroundCode(
                          `program FungsiDasar\n\nfungsi tambah(a : bilangan, b : bilangan) : bilangan\nmulai\n    kembalikan a + b\nselesai\n\nmulai\n    hasil : bilangan = tambah(10, 5)\n    tampilkan("Hasil tambah: " + hasil)\nselesai`
                        )
                      }
                      className="px-2 py-1 text-[11px] font-medium bg-indigo-950/70 text-indigo-300 hover:text-white border border-indigo-800/60 rounded transition-colors cursor-pointer"
                    >
                      Fungsi Tambah
                    </button>

                    <button
                      onClick={() =>
                        setPlaygroundCode(
                          `program RekursiFaktorial\n\nfungsi faktorial(n : bilangan) : bilangan\nmulai\n    jika n <= 1 maka\n        kembalikan 1\n    akhir\n    kembalikan n * faktorial(n - 1)\nselesai\n\nmulai\n    untuk i dari 1 sampai 6 lakukan\n        tampilkan("Faktorial " + i + " = " + faktorial(i))\n    akhir\nselesai`
                        )
                      }
                      className="px-2 py-1 text-[11px] font-medium bg-purple-950/70 text-purple-300 hover:text-white border border-purple-800/60 rounded transition-colors cursor-pointer"
                    >
                      Rekursi
                    </button>

                    <button
                      onClick={() =>
                        setPlaygroundCode(
                          `program FungsiBersarang\n\nfungsi sapa(nama : teks)\nmulai\n    tampilkan("Halo, " + nama + "! Selamat datang di NUSANTARA.")\nselesai\n\nfungsi duaKali(x : bilangan) : bilangan\nmulai\n    kembalikan x * 2\nselesai\n\nfungsi kuadrat(x : bilangan) : bilangan\nmulai\n    kembalikan x * x\nselesai\n\nmulai\n    sapa("Nusantara")\n    a : bilangan = duaKali(7)\n    b : bilangan = kuadrat(a)\n    tampilkan("duaKali(7) = " + a)\n    tampilkan("kuadrat(" + a + ") = " + b)\nselesai`
                        )
                      }
                      className="px-2 py-1 text-[11px] font-medium bg-cyan-950/70 text-cyan-300 hover:text-white border border-cyan-800/60 rounded transition-colors cursor-pointer"
                    >
                      Fungsi Bersarang
                    </button>

                    <button
                      onClick={() =>
                        setPlaygroundCode(
                          `program DemonstrasiPerulangan\nmulai\n    untuk i dari 1 sampai 5 lakukan\n        tampilkan("Iterasi ke-" + i)\n    akhir\nselesai`
                        )
                      }
                      className="px-2 py-1 text-[11px] font-medium bg-emerald-950/70 text-emerald-300 hover:text-white border border-emerald-800/60 rounded transition-colors cursor-pointer"
                    >
                      Perulangan Untuk
                    </button>
                  </div>
                </div>

                <textarea
                  value={playgroundCode}
                  onChange={(e) => setPlaygroundCode(e.target.value)}
                  className="w-full flex-1 p-4 bg-slate-950/90 font-mono text-xs sm:text-sm text-slate-100 focus:outline-none resize-none leading-relaxed border border-slate-800 rounded-lg"
                  placeholder="Tulis kode program .nusantara di sini..."
                  spellCheck={false}
                />

                <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Panjang: {playgroundCode.length} karakter</span>
                  <span className="text-indigo-400 font-semibold">Saluran Pipa: Lexer ➔ Parser ➔ Tipe ➔ Interpreter</span>
                </div>
              </div>

              {/* Panel Status Pemeriksaan Semantik & Eksekusi */}
              <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col h-[700px]">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Play className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Terminal Eksekusi &amp; Validasi Semantik
                    </span>
                  </div>
                  <span
                    className={`font-mono text-xs px-2.5 py-0.5 rounded border ${
                      typeErrors.length === 0 && parserErrors.length === 0
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                        : 'bg-rose-950 text-rose-300 border-rose-800'
                    }`}
                  >
                    {typeErrors.length === 0 && parserErrors.length === 0 ? 'Status: Sah (Valid)' : 'Terdeteksi Galat'}
                  </span>
                </div>

                {/* Galat Parser jika ada */}
                {parserErrors.length > 0 && (
                  <div className="mb-3 p-3 rounded-lg bg-rose-950/80 border border-rose-800 text-rose-200 text-xs font-mono space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-rose-300">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Galat Sintaksis Parser:
                    </div>
                    {parserErrors.map((err, idx) => (
                      <div key={idx} className="text-[11px] pl-5">
                        • {err.message}
                      </div>
                    ))}
                  </div>
                )}

                {/* Galat Tipe Statis jika ada */}
                {typeErrors.length > 0 && (
                  <div className="mb-3 p-3 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-200 text-xs font-mono space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-purple-300">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Galat Sistem Tipe (Type Checker):
                    </div>
                    {typeErrors.map((err, idx) => (
                      <div key={idx} className="text-[11px] pl-5">
                        • {err.message}
                      </div>
                    ))}
                  </div>
                )}

                {/* Galat Runtime jika ada */}
                {runtimeError && (
                  <div className="mb-3 p-3 rounded-lg bg-red-950/80 border border-red-800 text-red-200 text-xs font-mono space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-red-300">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Galat Eksekusi Runtime:
                    </div>
                    <div className="text-[11px] pl-5">• {runtimeError}</div>
                  </div>
                )}

                {/* Layar Output Bersih */}
                <div className="flex-1 bg-slate-950 p-4 rounded-lg border border-slate-800 font-mono text-xs sm:text-sm overflow-auto text-emerald-400 space-y-1 leading-relaxed">
                  <div className="text-slate-500 text-xs pb-2 border-b border-slate-800 flex items-center justify-between">
                    <span>--- HASIL EKSEKUSI PROGRAM ---</span>
                    <span>{runOutput.length} Baris Output</span>
                  </div>

                  {runOutput.length === 0 && !runtimeError ? (
                    <div className="text-slate-600 italic py-4 text-center">
                      (Program dieksekusi tanpa menghasilkan output teks)
                    </div>
                  ) : (
                    runOutput.map((line, idx) => (
                      <div key={idx} className="flex gap-2">
                        <span className="text-slate-600 select-none w-6 text-right">{idx + 1}</span>
                        <span>{line}</span>
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Interpreter AST Aktif</span>
                  </div>
                  <span className="font-mono text-indigo-400">Fungsi, Rekursi &amp; Stack Frame</span>
                </div>
              </div>
            </div>

            {/* Referensi Cepat Sintaks Fungsi */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Workflow className="w-5 h-5 text-indigo-400" />
                <span>Referensi Singkat Sintaks Fungsi NUSANTARA (Phase 13)</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-slate-950/80 p-4 rounded-lg border border-slate-800">
                  <div className="font-bold text-indigo-300 mb-2 font-mono">1. Fungsi dengan Nilai Kembali</div>
                  <pre className="text-slate-300 font-mono overflow-x-auto leading-relaxed">
{`fungsi tambah(a : bilangan, b : bilangan) : bilangan
mulai
    kembalikan a + b
selesai`}
                  </pre>
                  <p className="mt-2 text-slate-400 text-[11px]">
                    Wajib memiliki anotasi tipe kembalian dan mengeksekusi instruksi <code className="text-indigo-300">kembalikan</code> dengan nilai bertipe cocok.
                  </p>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-lg border border-slate-800">
                  <div className="font-bold text-emerald-300 mb-2 font-mono">2. Prosedur (Tanpa Nilai Kembali)</div>
                  <pre className="text-slate-300 font-mono overflow-x-auto leading-relaxed">
{`fungsi cetakGaris(panjang : bilangan)
mulai
    tampilkan("----------------")
selesai`}
                  </pre>
                  <p className="mt-2 text-slate-400 text-[11px]">
                    Fungsi tanpa anotasi tipe kembalian bertipe <code className="text-emerald-300">kosong</code> dan dapat selesai tanpa instruksi kembalikan.
                  </p>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-lg border border-slate-800">
                  <div className="font-bold text-purple-300 mb-2 font-mono">3. Fungsi Rekursif &amp; Proteksi</div>
                  <pre className="text-slate-300 font-mono overflow-x-auto leading-relaxed">
{`fungsi faktorial(n : bilangan) : bilangan
mulai
    jika n <= 1 maka
        kembalikan 1
    akhir
    kembalikan n * faktorial(n - 1)
selesai`}
                  </pre>
                  <p className="mt-2 text-slate-400 text-[11px]">
                    Mendukung pemanggilan rekursif dengan frame tumpukan mandiri dan proteksi kedalaman tumpukan hingga 500 tingkat.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: OPERATOR */}
        {activeTab === 'operator' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-amber-400" />
                <span>Tabel Presedensi &amp; Asosiatif 8 Tingkat Operator NUSANTARA (Phase 10)</span>
              </h2>
              <p className="text-sm text-slate-400 mb-6">
                Operator dievaluasi dengan hierarki presedensi presisi ISO/IEC 14977. Operator logika <code className="text-amber-300">dan</code> serta <code className="text-amber-300">atau</code> menerapkan evaluasi hubung-singkat (*short-circuit evaluation*).
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/50">
                      <th className="py-3 px-4 font-semibold">Tingkat</th>
                      <th className="py-3 px-4 font-semibold">Simbol</th>
                      <th className="py-3 px-4 font-semibold">Nama / Klasifikasi</th>
                      <th className="py-3 px-4 font-semibold">Asosiasi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {DAFTAR_PRESEDENSI_OPERATOR.map((op) => (
                      <tr key={op.tingkat} className="hover:bg-slate-900/40">
                        <td className="py-3 px-4 text-amber-400 font-bold">{op.tingkat}</td>
                        <td className="py-3 px-4 text-white font-bold">{op.simbol}</td>
                        <td className="py-3 px-4 text-slate-300 font-sans">{op.nama}</td>
                        <td className="py-3 px-4 text-slate-400">{op.asosiasi}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SISTEM TIPE */}
        {activeTab === 'tipe' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-purple-400" />
                <span>Matriks Tipe Data Resmi NUSANTARA (Phase 9 &amp; 13)</span>
              </h2>
              <p className="text-sm text-slate-400 mb-6">
                Sistem tipe NUSANTARA bersifat statis, kuat (*strongly typed*), dan aman dari konversi implisit yang berbahaya.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {DAFTAR_TIPE_MATRIKS_PHASE9.map((t) => (
                  <div key={t.tipe} className="p-4 rounded-lg bg-slate-950 border border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-sm font-bold text-purple-300">{t.tipe}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 font-mono">
                        {t.status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-300 mb-2 font-mono">Kategori: {t.kategori}</div>
                    <div className="text-[11px] font-mono text-slate-400 bg-slate-900/80 p-2 rounded border border-slate-800/80">
                      Contoh: <span className="text-amber-300">{t.contoh}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: POHON AST */}
        {activeTab === 'ast' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Network className="w-5 h-5 text-cyan-400" />
                  <h2 className="text-lg font-bold text-white">Visualisasi Pohon Sintaksis Abstrak (AST)</h2>
                </div>
                <button
                  onClick={() => handleCopy(astString, 'ast-copy')}
                  className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedText === 'ast-copy' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Salin Pohon AST</span>
                </button>
              </div>

              {astString ? (
                <pre className="p-4 bg-slate-950 font-mono text-xs sm:text-sm text-cyan-300 rounded-lg overflow-auto max-h-[600px] leading-relaxed border border-slate-800">
                  {astString}
                </pre>
              ) : (
                <div className="text-slate-500 italic text-center py-8">
                  Pohon AST tidak dapat dibentuk karena terdapat galat sintaksis.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 5: TOKEN LEXER */}
        {activeTab === 'token' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-teal-400" />
                  <h2 className="text-lg font-bold text-white">Daftar Token Leksikal ({tokens.length} Token)</h2>
                </div>
              </div>

              <div className="overflow-x-auto max-h-[600px]">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="sticky top-0 bg-slate-950 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-3">#</th>
                      <th className="py-2.5 px-3">Jenis Token</th>
                      <th className="py-2.5 px-3">Nilai Literal</th>
                      <th className="py-2.5 px-3">Baris : Kolom</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {tokens.map((tok, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/40">
                        <td className="py-2 px-3 text-slate-500">{idx + 1}</td>
                        <td className="py-2 px-3 text-teal-300 font-semibold">{tok.jenis}</td>
                        <td className="py-2 px-3 text-slate-200">
                          {tok.nilai === '\n' ? '\\n' : tok.nilai}
                        </td>
                        <td className="py-2 px-3 text-slate-400">
                          {tok.posisi.awal.baris}:{tok.posisi.awal.kolom}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: PANDUAN & GLOSARIUM */}
        {activeTab === 'panduan' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DAFTAR_GLOSARIUM.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-rose-300">{item.lokal}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                      {item.asing}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.ket}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: BERKAS REPOSITORI */}
        {activeTab === 'berkas' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[720px]">
            {/* File List */}
            <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col h-full">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-800">
                <Folder className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Daftar Berkas Repositori ({BERKAS_REPOSITORI.length})
                </span>
              </div>

              <div className="space-y-1.5 overflow-auto flex-1 pr-1">
                {BERKAS_REPOSITORI.map((b) => (
                  <button
                    key={b.jalur}
                    onClick={() => setSelectedFile(b)}
                    className={`w-full text-left p-2.5 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                      selectedFile.jalur === b.jalur
                        ? 'bg-slate-800 text-white font-semibold border border-slate-700'
                        : 'text-slate-400 hover:bg-slate-900/80 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      {b.bahasa === 'markdown' ? (
                        <FileText className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      ) : (
                        <FileCode className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      )}
                      <span className="truncate font-mono">{b.jalur}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono shrink-0 ml-2">
                      {Math.round(b.ukuran / 100) / 10} KB
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* File Content Preview */}
            <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-xl flex flex-col h-full overflow-hidden">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
                <div>
                  <div className="text-sm font-semibold text-white font-mono">{selectedFile.jalur}</div>
                  <div className="text-xs text-slate-400">{selectedFile.kategori}</div>
                </div>
                <button
                  onClick={() => handleCopy(selectedFile.konten, 'file-copy')}
                  className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedText === 'file-copy' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Salin Berkas</span>
                </button>
              </div>

              <div className="p-5 overflow-auto flex-1 font-mono text-xs sm:text-sm bg-slate-950/80 leading-relaxed text-slate-200">
                <pre className="whitespace-pre-wrap">{selectedFile.konten}</pre>
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: PETA JALAN */}
        {activeTab === 'roadmap' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredRoadmap.map((item) => {
                const isCompleted = item.status === 'Selesai';
                const isCurrent = item.fase === 13;
                const isNext = item.fase === 14;
                return (
                  <div
                    key={item.fase}
                    className={`p-4 rounded-xl border transition-all ${
                      isCurrent
                        ? 'bg-indigo-950/40 border-indigo-500/80 shadow-sm shadow-indigo-900/30'
                        : isCompleted
                        ? 'bg-emerald-950/20 border-emerald-800/60'
                        : isNext
                        ? 'bg-amber-950/20 border-amber-600/60'
                        : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-mono text-slate-400">Phase {item.fase}</span>
                      <span
                        className={`font-mono text-[10px] px-2 py-0.5 rounded ${
                          isCurrent
                            ? 'bg-indigo-900/80 text-indigo-200 font-bold border border-indigo-600'
                            : isCompleted
                            ? 'bg-emerald-900/60 text-emerald-300 font-semibold'
                            : isNext
                            ? 'bg-amber-900/60 text-amber-300 font-semibold'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {item.status} ({item.versi})
                      </span>
                    </div>
                    <div className="font-semibold text-sm text-white">{item.nama}</div>
                    <div className="text-[11px] text-slate-400 mt-1 font-mono">{item.kategori}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 px-4 sm:px-6 text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="font-bold text-slate-200 font-sans">NUSANTARA</span>
            <span>·</span>
            <span>Milestone v0.13.0 (Phase 13: Sistem Fungsi &amp; Prosedur)</span>
            <span>·</span>
            <span>Apache License 2.0</span>
          </div>
          <div className="text-slate-500">
            149 Berkas Teruji · 185 Pengujian Lulus 100%
          </div>
        </div>
      </footer>
    </div>
  );
}
