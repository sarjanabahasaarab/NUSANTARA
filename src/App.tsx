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
  Split
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
  const [activeTab, setActiveTab] = useState<'perulangan' | 'percabangan' | 'operator' | 'tipe' | 'ast' | 'token' | 'panduan' | 'berkas' | 'roadmap' | 'git'>('perulangan');
  const [selectedFile, setSelectedFile] = useState<BerkasRepo>(BERKAS_REPOSITORI[0]);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [playgroundCode, setPlaygroundCode] = useState<string>(
    `program DemonstrasiPerulangan\nmulai\n    // 1. Perulangan Untuk (Rentang Inklusif)\n    tampilkan("--- Perulangan Untuk (1 sampai 5) ---")\n    untuk i dari 1 sampai 5 lakukan\n        jika i == 3 maka\n            tampilkan("Nilai i = 3: Lompati sisa iterasi")\n            lanjutkan\n        akhir\n        tampilkan("Iterasi ke-" + i)\n    akhir\n\n    // 2. Perulangan Selama (Kondisional dengan Hentikan)\n    tampilkan("--- Perulangan Selama ---")\n    angka : bilangan = 1\n    selama angka <= 10 lakukan\n        jika angka == 4 maka\n            tampilkan("Angka mencapai 4: Hentikan perulangan")\n            hentikan\n        akhir\n        tampilkan("Cacah: " + angka)\n        angka = angka + 1\n    akhir\n    tampilkan("Selesai eksekusi seluruh perulangan!")\nselesai`
  );
  const [activeFilterCategory, setActiveFilterCategory] = useState<string>('Semua');

  // 1. Eksekusi Lexer
  const { tokens } = useMemo(() => {
    const l = new Lexer(playgroundCode, { sertakanBarisBaru: false });
    const { token } = l.tokenisasi();
    return { tokens: token };
  }, [playgroundCode]);

  // 2. Eksekusi Parser (Phase 7 & 12)
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

  // 3. Eksekusi Type Checker (Phase 9, 10, 11, 12)
  const { typeErrors } = useMemo(() => {
    if (!ast) return { typeErrors: [] };
    const checker = new PemeriksaTipe();
    return { typeErrors: checker.periksa(ast) };
  }, [ast]);

  // 4. Eksekusi Interpreter (Phase 8, 10, 11, 12)
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
              v0.12.0
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-300">
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
              onClick={() => handleCopy('git commit -m "feat: implement nusantara loops"', 'commit-p12')}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-200 bg-slate-900 border border-slate-700/80 rounded-lg hover:bg-slate-800 hover:text-white transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              {copiedText === 'commit-p12' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Terminal className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copiedText === 'commit-p12' ? 'Tersalin' : 'Salin Pesan Komit'}</span>
            </button>
            <span className="px-3 py-1 text-xs font-semibold text-white bg-emerald-700/80 rounded-lg whitespace-nowrap border border-emerald-500/40">
              v0.12.0
            </span>
          </div>
        </div>
      </header>

      {/* 2. HERO STATEMENT & METADATA */}
      <section className="border-b border-slate-800/60 bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950 py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-4 tracking-wide font-mono">
            <span className="text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">Milestone v0.12.0</span>
            <span aria-hidden="true">·</span>
            <span className="text-white font-medium">Phase 12: Sistem Perulangan NUSANTARA</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-300 font-mono">selama · untuk · dari · sampai · lakukan · hentikan · lanjutkan · akhir</span>
            <span aria-hidden="true">·</span>
            <span className="text-cyan-400 font-semibold">145 Berkas Valid (100% Lulus)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white max-w-4xl leading-tight">
            Sistem Perulangan NUSANTARA: <span className="text-emerald-400 font-mono">selama</span> &amp; <span className="text-cyan-400 font-mono">untuk</span>.
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Bahasa pemrograman NUSANTARA mendukung iterasi berbasis rentang nilai inklusif (<code className="text-emerald-300 font-mono font-semibold">untuk ... dari ... sampai ... lakukan</code>) dan perulangan berbasis kondisi (<code className="text-emerald-300 font-mono font-semibold">selama ... lakukan</code>), dilengkapi kendali interupsi aliran (<code className="text-rose-300 font-mono">hentikan</code> &amp; <code className="text-amber-300 font-mono">lanjutkan</code>) serta proteksi loop tak terbatas.
          </p>

          <div className="mt-6 p-4 rounded-xl bg-slate-900/90 border border-slate-800 max-w-3xl flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <span className="font-semibold text-emerald-300">Pipa Kompilasi Lengkap:</span> Kode sumber NUSANTARA melewati tahapan Lexer ➔ Parser (AST NodePerulanganUntuk &amp; NodePerulanganSelama) ➔ Pemeriksa Tipe (Validasi logika kondisi &amp; batas numerik rentang) ➔ Interpreter dengan manajemen tumpukan lingkup leksikal &amp; sinyal kendali aliran.
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full">
        {/* Navigation Sub-Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-4 mb-6 overflow-x-auto text-sm">
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
            <span>Panduan & Glosarium</span>
          </button>
          <button
            onClick={() => setActiveTab('berkas')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'berkas' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Folder className="w-4 h-4 text-amber-400" />
            <span>Berkas Repositori (145)</span>
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

        {/* TAB 1: PERULANGAN (PHASE 12 INTERACTIVE PLAYGROUND) */}
        {(activeTab === 'perulangan' || activeTab === 'percabangan' || activeTab === 'tipe') && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Editor Kode Sumber */}
              <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col h-[700px]">
                <div className="flex flex-wrap items-center justify-between pb-3 mb-3 border-b border-slate-800 gap-2">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Editor Interaktif .nusantara
                    </span>
                  </div>

                  {/* Preset Buttons */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      onClick={() =>
                        setPlaygroundCode(
                          `program PerulanganUntuk\nmulai\n    // Perulangan untuk dengan rentang nilai inklusif\n    untuk angka dari 1 sampai 5 lakukan\n        tampilkan("Iterasi: " + angka)\n    akhir\nselesai`
                        )
                      }
                      className="px-2 py-1 text-[11px] font-medium bg-emerald-950/70 text-emerald-300 hover:text-white border border-emerald-800/60 rounded transition-colors cursor-pointer"
                    >
                      Untuk (Range)
                    </button>

                    <button
                      onClick={() =>
                        setPlaygroundCode(
                          `program PerulanganSelama\nmulai\n    // Perulangan selama dengan kondisi logika\n    angka : bilangan = 1\n    selama angka <= 5 lakukan\n        tampilkan("Angka sekarang: " + angka)\n        angka = angka + 1\n    akhir\nselesai`
                        )
                      }
                      className="px-2 py-1 text-[11px] font-medium bg-cyan-950/70 text-cyan-300 hover:text-white border border-cyan-800/60 rounded transition-colors cursor-pointer"
                    >
                      Selama (While)
                    </button>

                    <button
                      onClick={() =>
                        setPlaygroundCode(
                          `program DemonstrasiHentikanLanjutkan\nmulai\n    untuk i dari 1 sampai 6 lakukan\n        jika i == 3 maka\n            tampilkan("Iterasi ke-3: Lompati instruksi berikut")\n            lanjutkan\n        akhir\n        jika i == 5 maka\n            tampilkan("Iterasi ke-5: Hentikan loop sekarang")\n            hentikan\n        akhir\n        tampilkan("Item yang diproses: " + i)\n    akhir\nselesai`
                        )
                      }
                      className="px-2 py-1 text-[11px] font-medium bg-amber-950/70 text-amber-300 hover:text-white border border-amber-800/60 rounded transition-colors cursor-pointer"
                    >
                      Hentikan / Lanjut
                    </button>

                    <button
                      onClick={() =>
                        setPlaygroundCode(
                          `program GanjilGenap\nmulai\n    untuk n dari 1 sampai 6 lakukan\n        jika n % 2 == 0 maka\n            tampilkan(n + " adalah bilangan genap")\n        selain\n            tampilkan(n + " adalah bilangan ganjil")\n        akhir\n    akhir\nselesai`
                        )
                      }
                      className="px-2 py-1 text-[11px] font-medium bg-purple-950/70 text-purple-300 hover:text-white border border-purple-800/60 rounded transition-colors cursor-pointer"
                    >
                      Loop + Jika
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
                  <span className="text-emerald-400 font-semibold">Saluran Pipa: Lexer ➔ Parser ➔ Tipe ➔ Interpreter</span>
                </div>
              </div>

              {/* Panel Status Pemeriksaan Semantik & Eksekusi */}
              <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col h-[700px]">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Play className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Terminal Eksekusi & Validasi Semantik
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
                  <div className="mb-3 p-3 rounded-lg bg-rose-950/80 border border-rose-800 text-rose-200 text-xs font-mono space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-rose-300">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Galat Pemeriksaan Tipe Data:
                    </div>
                    {typeErrors.map((err, idx) => (
                      <div key={idx} className="text-[11px] pl-5">
                        • {err.message}
                      </div>
                    ))}
                  </div>
                )}

                {/* Galat Runtime jika ada */}
                {runtimeError && typeErrors.length === 0 && parserErrors.length === 0 && (
                  <div className="mb-3 p-3 rounded-lg bg-rose-950/80 border border-rose-800 text-rose-200 text-xs font-mono space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-rose-300">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Galat Runtime:
                    </div>
                    <div className="text-[11px] pl-5">{runtimeError}</div>
                  </div>
                )}

                {/* Terminal Luaran */}
                <div className="flex-1 overflow-auto bg-black border border-slate-800 rounded-lg p-4 font-mono text-xs sm:text-sm leading-relaxed text-emerald-300">
                  <div className="text-xs text-slate-500 mb-2 border-b border-slate-900 pb-1 font-mono flex items-center justify-between">
                    <span>Luaran Konsol (Output):</span>
                    <span>{runOutput.length} baris dicetak</span>
                  </div>
                  {runOutput.length > 0 ? (
                    <div className="space-y-1">
                      {runOutput.map((baris, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-slate-600 select-none text-xs">&gt;</span>
                          <span className="text-slate-100">{baris}</span>
                        </div>
                      ))}
                    </div>
                  ) : !runtimeError && typeErrors.length === 0 && parserErrors.length === 0 ? (
                    <div className="text-slate-600 italic">Program selesai dieksekusi tanpa pemanggilan tampilkan().</div>
                  ) : null}
                </div>

                {/* Ringkasan Sintaks Perulangan */}
                <div className="mt-4 pt-3 border-t border-slate-800">
                  <span className="text-xs font-semibold text-slate-300 block mb-2">Kata Kunci Perulangan Resmi NUSANTARA:</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[11px] font-mono">
                    <div className="p-1.5 rounded bg-slate-950 border border-slate-800/80 text-emerald-300">
                      <span className="font-bold">selama</span> <span className="text-slate-400">kondisi</span>
                    </div>
                    <div className="p-1.5 rounded bg-slate-950 border border-slate-800/80 text-cyan-300">
                      <span className="font-bold">untuk</span> <span className="text-slate-400">var dari a sampai b</span>
                    </div>
                    <div className="p-1.5 rounded bg-slate-950 border border-slate-800/80 text-amber-300">
                      <span className="font-bold">hentikan</span> <span className="text-slate-400">(break)</span>
                    </div>
                    <div className="p-1.5 rounded bg-slate-950 border border-slate-800/80 text-purple-300">
                      <span className="font-bold">lanjutkan</span> <span className="text-slate-400">(continue)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TABEL OPERATOR (PHASE 10) */}
        {activeTab === 'operator' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-2">Tabel Presedensi &amp; Asosiativitas Operator (Phase 10)</h2>
              <p className="text-sm text-slate-300 mb-4">
                Tingkat prioritas operator dievaluasi dari tingkat tertinggi (Tingkat 1) ke tingkat terendah (Tingkat 8).
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-950 text-slate-400 font-mono text-xs uppercase border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-4">Tingkat</th>
                      <th className="py-2.5 px-4">Kategori Operator</th>
                      <th className="py-2.5 px-4">Simbol / Kata Kunci</th>
                      <th className="py-2.5 px-4">Asosiativitas</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {DAFTAR_PRESEDENSI_OPERATOR.map((item) => (
                      <tr key={item.tingkat} className="hover:bg-slate-800/40">
                        <td className="py-2.5 px-4 font-bold text-amber-300">{item.tingkat}</td>
                        <td className="py-2.5 px-4 text-slate-200">{item.nama}</td>
                        <td className="py-2.5 px-4 font-bold text-emerald-400">{item.simbol}</td>
                        <td className="py-2.5 px-4 text-slate-400">{item.asosiasi}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: POHON AST */}
        {activeTab === 'ast' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col h-[680px]">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Pohon Sintaksis Abstrak (AST)
                </span>
                <span className="text-xs text-cyan-400 font-mono">Parser NUSANTARA</span>
              </div>
              <div className="flex-1 overflow-auto bg-slate-950/90 border border-slate-800 rounded-lg p-4 font-mono text-xs text-cyan-200 leading-relaxed">
                <pre className="whitespace-pre-wrap">{astString || '// AST kosong atau gagal dibentuk'}</pre>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: TOKEN LEXER */}
        {activeTab === 'token' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col h-[650px]">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Aliran Token Leksikal ({tokens.length} Token)
                </span>
                <span className="text-xs text-teal-400 font-mono">Lexer NUSANTARA</span>
              </div>
              <div className="flex-1 overflow-auto bg-slate-950/90 border border-slate-800 rounded-lg p-3 space-y-1 font-mono text-xs">
                {tokens.map((tok, idx) => (
                  <div key={idx} className="flex items-center justify-between p-1.5 rounded hover:bg-slate-900 transition-colors border-b border-slate-900">
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-[10px] text-slate-500 w-6 text-right select-none">{idx + 1}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold bg-slate-800 text-slate-300">
                        {tok.jenis}
                      </span>
                      <span className="text-white font-semibold truncate">
                        {tok.jenis === JenisToken.EOF ? '<EOF>' : `"${tok.nilai}"`}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 shrink-0 font-mono ml-2">
                      baris {tok.baris}:{tok.kolom}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: PANDUAN & GLOSARIUM */}
        {activeTab === 'panduan' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-2">Matriks Tipe Data Resmi NUSANTARA (Phase 9)</h2>
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-950 text-slate-400 font-mono text-xs uppercase border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-4">Tipe Data</th>
                      <th className="py-2.5 px-4">Kategori</th>
                      <th className="py-2.5 px-4">Contoh Literal</th>
                      <th className="py-2.5 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {DAFTAR_TIPE_MATRIKS_PHASE9.map((item) => (
                      <tr key={item.tipe} className="hover:bg-slate-800/40">
                        <td className="py-2.5 px-4 font-bold text-purple-300">{item.tipe}</td>
                        <td className="py-2.5 px-4 text-slate-300">{item.kategori}</td>
                        <td className="py-2.5 px-4 text-slate-400">{item.contoh}</td>
                        <td className="py-2.5 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] ${item.status === 'Lengkap' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-amber-950 text-amber-300 border border-amber-800'}`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-2">Glosarium Istilah Bahasa Pemrograman NUSANTARA</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {DAFTAR_GLOSARIUM.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <div className="text-sm font-bold text-emerald-400">{item.lokal}</div>
                    <div className="text-xs text-slate-400 italic font-mono mb-1">{item.asing}</div>
                    <div className="text-xs text-slate-300">{item.ket}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: PENJELAJAH BERKAS */}
        {activeTab === 'berkas' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex flex-col h-[700px]">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Berkas Repositori (Phase 1-12)</span>
                <span className="text-xs text-slate-500 font-mono">{BERKAS_REPOSITORI.length} Berkas Terindeks</span>
              </div>
              <div className="overflow-y-auto flex-1 space-y-1 pr-1 font-mono text-xs">
                {BERKAS_REPOSITORI.map((berkas) => {
                  const isSelected = selectedFile.jalur === berkas.jalur;
                  const isNusantara = berkas.jalur.endsWith('.nusantara');
                  return (
                    <button
                      key={berkas.jalur}
                      onClick={() => setSelectedFile(berkas)}
                      className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                        isSelected ? 'bg-purple-950/70 text-purple-200 border border-purple-800/60' : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        {isNusantara ? (
                          <FileCode className="w-4 h-4 text-rose-400 shrink-0" />
                        ) : berkas.jalur.endsWith('.md') ? (
                          <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
                        ) : (
                          <Folder className="w-4 h-4 text-amber-400 shrink-0" />
                        )}
                        <span className="truncate">{berkas.jalur}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 shrink-0 ml-2">{berkas.ukuran}B</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-8 bg-slate-900/70 border border-slate-800 rounded-xl flex flex-col h-[700px] overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-semibold text-white">{selectedFile.jalur}</span>
                  <span className="text-xs text-slate-400 font-sans">({selectedFile.kategori})</span>
                </div>
                <button
                  onClick={() => handleCopy(selectedFile.konten, 'file')}
                  className="px-3 py-1 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedText === 'file' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  <span>{copiedText === 'file' ? 'Tersalin' : 'Salin Isi'}</span>
                </button>
              </div>

              <div className="p-5 overflow-auto flex-1 font-mono text-xs sm:text-sm bg-slate-950/80 leading-relaxed text-slate-200">
                <pre className="whitespace-pre-wrap">{selectedFile.konten}</pre>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: PETA JALAN */}
        {activeTab === 'roadmap' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredRoadmap.map((item) => {
                const isCompleted = item.status === 'Selesai';
                const isCurrent = item.fase === 12;
                const isNext = item.fase === 13;
                return (
                  <div
                    key={item.fase}
                    className={`p-4 rounded-xl border transition-all ${
                      isCurrent
                        ? 'bg-emerald-950/40 border-emerald-500/80 shadow-sm shadow-emerald-900/30'
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
                            ? 'bg-emerald-900/80 text-emerald-200 font-bold border border-emerald-600'
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
            <span>Milestone v0.12.0 (Phase 12: Sistem Perulangan)</span>
            <span>·</span>
            <span>Apache License 2.0</span>
          </div>
          <div className="text-slate-500">
            145 Berkas Teruji · 130 Pengujian Lulus 100%
          </div>
        </div>
      </footer>
    </div>
  );
}
