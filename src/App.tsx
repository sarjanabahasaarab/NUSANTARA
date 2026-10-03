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
  Binary,
  Compass,
  Network,
  Play,
  CheckCircle2,
  Calculator
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
import { TABEL_PRESEDENSI_OPERATOR } from './operator/jenisOperator';

export default function App() {
  const [activeTab, setActiveTab] = useState<'operator' | 'tipe' | 'interpreter' | 'parser' | 'lexer' | 'panduan' | 'ebnf' | 'glosarium' | 'berkas' | 'roadmap' | 'git'>('operator');
  const [selectedFile, setSelectedFile] = useState<BerkasRepo>(BERKAS_REPOSITORI[0]);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [playgroundCode, setPlaygroundCode] = useState<string>(
    `program DemonstrasiOperator\nmulai\n    a : bilangan = 10\n    b : bilangan = 3\n\n    // 1. Aritmatika & Presedensi\n    tampilkan("Hasil Aritmatika:", a + b * 2)\n    tampilkan("Hasil Kurung:    ", (a + b) * 2)\n    tampilkan("Sisa Bagi %:     ", a % b)\n\n    // 2. Perbandingan & Logika\n    lulus : logika = (a >= 10) dan (b < 5)\n    tampilkan("Status Kelulusan:", lulus)\n\n    // 3. Hubung Singkat\n    tampilkan("Hubung Singkat:  ", benar atau (10 / 0 == 0))\nselesai`
  );
  const [activeFilterCategory, setActiveFilterCategory] = useState<string>('Semua');

  // 1. Eksekusi Lexer
  const { tokens } = useMemo(() => {
    const l = new Lexer(playgroundCode, { sertakanBarisBaru: false });
    const { token } = l.tokenisasi();
    return { tokens: token };
  }, [playgroundCode]);

  // 2. Eksekusi Parser (Phase 7)
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

  // 3. Eksekusi Type Checker (Phase 9)
  const { typeErrors } = useMemo(() => {
    if (!ast) return { typeErrors: [] };
    const checker = new PemeriksaTipe();
    return { typeErrors: checker.periksa(ast) };
  }, [ast]);

  // 4. Eksekusi Interpreter (Phase 8)
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
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <button
              onClick={() => setActiveTab('operator')}
              className={`hover:text-white transition-colors cursor-pointer ${
                activeTab === 'operator' ? 'text-amber-400 font-semibold' : 'text-slate-400'
              }`}
            >
              Operator (Phase 10)
            </button>
            <button
              onClick={() => setActiveTab('tipe')}
              className={`hover:text-white transition-colors cursor-pointer ${
                activeTab === 'tipe' ? 'text-purple-400 font-semibold' : 'text-slate-400'
              }`}
            >
              Sistem Tipe (Phase 9)
            </button>
            <button
              onClick={() => setActiveTab('interpreter')}
              className={`hover:text-white transition-colors cursor-pointer ${
                activeTab === 'interpreter' ? 'text-emerald-400 font-semibold' : 'text-slate-400'
              }`}
            >
              Interpreter (Phase 8)
            </button>
            <button
              onClick={() => setActiveTab('parser')}
              className={`hover:text-white transition-colors cursor-pointer ${
                activeTab === 'parser' ? 'text-white font-semibold' : 'text-slate-400'
              }`}
            >
              Parser & AST
            </button>
            <button
              onClick={() => setActiveTab('lexer')}
              className={`hover:text-white transition-colors cursor-pointer ${
                activeTab === 'lexer' ? 'text-white font-semibold' : 'text-slate-400'
              }`}
            >
              Lexer
            </button>
            <button
              onClick={() => setActiveTab('panduan')}
              className={`hover:text-white transition-colors cursor-pointer ${
                activeTab === 'panduan' ? 'text-white font-semibold' : 'text-slate-400'
              }`}
            >
              Buku Panduan
            </button>
            <button
              onClick={() => setActiveTab('berkas')}
              className={`hover:text-white transition-colors cursor-pointer ${
                activeTab === 'berkas' ? 'text-white font-semibold' : 'text-slate-400'
              }`}
            >
              Penjelajah Berkas
            </button>
            <button
              onClick={() => setActiveTab('roadmap')}
              className={`hover:text-white transition-colors cursor-pointer ${
                activeTab === 'roadmap' ? 'text-white font-semibold' : 'text-slate-400'
              }`}
            >
              Peta Jalan
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleCopy('git commit -m "feat: strengthen nusantara type system"', 'commit-p9')}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-200 bg-slate-900 border border-slate-700/80 rounded-lg hover:bg-slate-800 hover:text-white transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              {copiedText === 'commit-p9' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Terminal className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copiedText === 'commit-p9' ? 'Tersalin' : 'Salin Komit Phase 9'}</span>
            </button>
            <button
              onClick={() => setActiveTab('tipe')}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-500 transition-colors whitespace-nowrap cursor-pointer"
            >
              Milestone v0.9.0
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO STATEMENT & METADATA */}
      <section className="border-b border-slate-800/60 bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-4 tracking-wide font-mono">
            <span className="text-emerald-400 font-medium">v0.9.0</span>
            <span aria-hidden="true">·</span>
            <span>Phase 9: Variabel & Tipe Data Lanjutan</span>
            <span aria-hidden="true">·</span>
            <span className="text-purple-400 font-medium">Strict & Type-Safe</span>
            <span aria-hidden="true">·</span>
            <span className="text-cyan-400 font-medium">12 Uji Sistem Tipe Lulus 100%</span>
            <span aria-hidden="true">·</span>
            <span>100% Bahasa Indonesia</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-4xl leading-tight">
            Sistem Operator & Presedensi: Aritmatika, Perbandingan, Logika & Hubung Singkat.
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Bahasa pemrograman NUSANTARA kini memiliki sistem operator lengkap dengan 8 tingkat hierarki presedensi resmi, asosiativitas teruji, evaluasi hubung singkat (short-circuit), dan proteksi runtime terstruktur.
          </p>

          <div className="mt-6 p-4 rounded-xl bg-slate-900/90 border border-slate-800 max-w-3xl flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <span className="font-semibold text-emerald-300">Integritas Saluran Pipa Phase 10:</span> Kode sumber melewati Lexer ➔ Parser ➔ Type Checker ➔ Operator Dispatch ➔ Interpreter secara mulus dengan presedensi presisi dan penanganan runtime error yang aman.
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-4 mb-8 overflow-x-auto text-sm">
          <button
            onClick={() => setActiveTab('operator')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'operator' ? 'bg-amber-950 text-amber-200 border border-amber-700/60' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Calculator className="w-4 h-4 text-amber-400" />
            <span>Operator (Phase 10)</span>
          </button>
          <button
            onClick={() => setActiveTab('tipe')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'tipe' ? 'bg-purple-950 text-purple-200 border border-purple-700/60' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
            <span>Sistem Tipe (Phase 9)</span>
          </button>
          <button
            onClick={() => setActiveTab('interpreter')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'interpreter' ? 'bg-emerald-950 text-emerald-200 border border-emerald-700/60' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Play className="w-4 h-4 text-emerald-400" />
            <span>Eksekusi Interpreter</span>
          </button>
          <button
            onClick={() => setActiveTab('parser')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'parser' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Network className="w-4 h-4 text-cyan-400" />
            <span>Pohon AST</span>
          </button>
          <button
            onClick={() => setActiveTab('lexer')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'lexer' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Cpu className="w-4 h-4 text-teal-400" />
            <span>Token Lexer</span>
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
            <span>Penjelajah Berkas (137)</span>
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
          <button
            onClick={() => setActiveTab('git')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'git' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <GitBranch className="w-4 h-4 text-rose-400" />
            <span>Sinkronisasi Git</span>
          </button>
        </div>

        {/* TAB 1: SISTEM TIPE DATA & TYPE CHECKER (PHASE 9) */}
        {activeTab === 'tipe' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Editor Kode Sumber */}
              <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col h-[700px]">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Editor Uji Tipe .nusantara
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setPlaygroundCode(
                          `program UjiSalahTipe\n\nmulai\n    // Inisialisasi tidak cocok\n    umur : bilangan = "tiga puluh"\n    tampilkan(umur)\nselesai`
                        )
                      }
                      className="px-2.5 py-1 text-[11px] font-medium bg-rose-950/60 text-rose-300 hover:text-white border border-rose-800/60 rounded transition-colors cursor-pointer"
                    >
                      Uji Salah Tipe
                    </button>
                    <button
                      onClick={() =>
                        setPlaygroundCode(
                          `program UjiMutasiTetap\n\nmulai\n    tetap KODE_POS : bilangan = 12345\n    KODE_POS = 54321\nselesai`
                        )
                      }
                      className="px-2.5 py-1 text-[11px] font-medium bg-amber-950/60 text-amber-300 hover:text-white border border-amber-800/60 rounded transition-colors cursor-pointer"
                    >
                      Uji Konstanta Tetap
                    </button>
                  </div>
                </div>

                <textarea
                  value={playgroundCode}
                  onChange={(e) => setPlaygroundCode(e.target.value)}
                  className="w-full flex-1 p-4 bg-slate-950/90 font-mono text-xs sm:text-sm text-slate-100 focus:outline-none resize-none leading-relaxed border border-slate-800 rounded-lg"
                  placeholder="Tulis program .nusantara di sini..."
                  spellCheck={false}
                />

                <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Karakter: {playgroundCode.length}</span>
                  <span className="text-purple-400 font-semibold">Validasi Semantik: Type Checker Aktif</span>
                </div>
              </div>

              {/* Panel Status Pemeriksaan Semantik & Eksekusi */}
              <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col h-[700px]">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Status Pemeriksaan Tipe & Luaran
                    </span>
                  </div>
                  <span
                    className={`font-mono text-xs px-2 py-0.5 rounded border ${
                      typeErrors.length === 0
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                        : 'bg-rose-950 text-rose-300 border-rose-800'
                    }`}
                  >
                    {typeErrors.length === 0 ? 'Tipe Sah (Valid)' : `${typeErrors.length} Kesalahan Tipe`}
                  </span>
                </div>

                {typeErrors.length > 0 && (
                  <div className="mb-3 p-3 rounded-lg bg-rose-950/80 border border-rose-800 text-rose-200 text-xs font-mono space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-rose-300">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Terdeteksi Kesalahan Tipe Statis:
                    </div>
                    {typeErrors.map((err, idx) => (
                      <div key={idx} className="text-[11px] pl-5">
                        • {err.message}
                      </div>
                    ))}
                  </div>
                )}

                {runtimeError && typeErrors.length === 0 && (
                  <div className="mb-3 p-3 rounded-lg bg-rose-950/80 border border-rose-800 text-rose-200 text-xs font-mono space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-rose-300">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Kesalahan Runtime:
                    </div>
                    <div className="text-[11px] pl-5">{runtimeError}</div>
                  </div>
                )}

                <div className="flex-1 overflow-auto bg-black border border-slate-800 rounded-lg p-4 font-mono text-xs sm:text-sm leading-relaxed text-emerald-300">
                  <div className="text-xs text-slate-500 mb-2 border-b border-slate-900 pb-1 font-mono">
                    Terminal Konsol Eksekusi:
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
                  ) : !runtimeError && typeErrors.length === 0 ? (
                    <div className="text-slate-600 italic">Program selesai dieksekusi tanpa pemanggilan tampilkan().</div>
                  ) : null}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800">
                  <span className="text-xs font-semibold text-slate-300 block mb-2">Matriks Tipe Data Resmi NUSANTARA:</span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-[11px] font-mono">
                    {DAFTAR_TIPE_MATRIKS_PHASE9.slice(0, 6).map((t) => (
                      <div key={t.tipe} className="p-1.5 rounded bg-slate-950 border border-slate-800/80 flex items-center justify-between">
                        <span className="text-purple-300 font-bold">{t.tipe}</span>
                        <span className="text-[10px] text-emerald-400">{t.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INTERPRETER */}
        {activeTab === 'interpreter' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col h-[650px]">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Terminal Keluaran Program ({runOutput.length} baris)
                </span>
              </div>
              <div className="flex-1 overflow-auto bg-black border border-slate-800 rounded-lg p-4 font-mono text-xs sm:text-sm text-emerald-300 leading-relaxed">
                {runOutput.map((baris, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-slate-600 select-none">&gt;</span>
                    <span className="text-slate-100">{baris}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PARSER & AST */}
        {activeTab === 'parser' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col h-[680px]">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Pohon Sintaksis Abstrak (AST)
                </span>
              </div>
              <div className="flex-1 overflow-auto bg-slate-950/90 border border-slate-800 rounded-lg p-4 font-mono text-xs text-cyan-200 leading-relaxed">
                <pre className="whitespace-pre-wrap">{astString}</pre>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: LEXER */}
        {activeTab === 'lexer' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col h-[650px]">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Aliran Token Leksikal ({tokens.length} Token)
                </span>
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
                      <th className="py-2.5 px-4">Status Phase 9</th>
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
          </div>
        )}

        {/* TAB 6: PENJELAJAH BERKAS */}
        {activeTab === 'berkas' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex flex-col h-[700px]">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Berkas Repositori (Phase 1-9)</span>
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
                const isCompleted = item.fase <= 9;
                const isCurrent = item.fase === 9;
                const isNext = item.fase === 10;
                return (
                  <div
                    key={item.fase}
                    className={`p-4 rounded-xl border transition-all ${
                      isCurrent
                        ? 'bg-purple-950/40 border-purple-600/80 shadow-sm shadow-purple-900/30'
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
                            ? 'bg-purple-900/60 text-purple-300 font-semibold'
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

        {/* TAB 8: SINKRONISASI GIT */}
        {activeTab === 'git' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-2">Sinkronisasi Komit Phase 9 ke GitHub</h2>
              <p className="text-sm text-slate-300 mb-6">Jalankan perintah berikut untuk menyinkronkan seluruh modul Sistem Tipe Data ke repositori GitHub:</p>
              <div className="space-y-3 font-mono text-xs">
                <pre className="text-purple-300 bg-slate-950 p-3 rounded-lg border border-slate-800">git add .</pre>
                <pre className="text-purple-300 bg-slate-950 p-3 rounded-lg border border-slate-800">git commit -m "feat: strengthen nusantara type system"</pre>
                <pre className="text-purple-300 bg-slate-950 p-3 rounded-lg border border-slate-800">git push origin main</pre>
              </div>
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
            <span>Milestone v0.9.0 (Phase 9: Variabel & Tipe Data)</span>
            <span>·</span>
            <span>Apache License 2.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
