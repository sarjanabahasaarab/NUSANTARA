/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Folder,
  FileCode,
  FileText,
  Terminal,
  CheckCircle2,
  Copy,
  Check,
  ChevronRight,
  GitBranch,
  Layers,
  Sparkles,
  BookOpen,
  ArrowRight,
  Cpu,
  ShieldCheck,
  Code2
} from 'lucide-react';
import {
  BERKAS_REPOSITORI,
  DAFTAR_KATA_KUNCI,
  DAFTAR_TIPE_DATA,
  DAFTAR_OPERATOR,
  DAFTAR_FASE_ROADMAP,
  BerkasRepo
} from './data/berkasRepositori';

export default function App() {
  const [activeTab, setActiveTab] = useState<'berkas' | 'contoh' | 'arsitektur' | 'roadmap' | 'nip' | 'git'>('berkas');
  const [selectedFile, setSelectedFile] = useState<BerkasRepo>(BERKAS_REPOSITORI[0]);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [selectedExampleIndex, setSelectedExampleIndex] = useState<number>(0);
  const [playgroundCode, setPlaygroundCode] = useState<string>(
    `program Halo\n\nmulai\n    tampilkan("Halo Dunia!")\nselesai`
  );
  const [activeFilterCategory, setActiveFilterCategory] = useState<string>('Semua');

  const contohList = BERKAS_REPOSITORI.filter((b) => b.jalur.startsWith('contoh/0'));

  const handleCopy = (teks: string, label: string) => {
    navigator.clipboard.writeText(teks);
    setCopiedText(label);
    setTimeout(() => {
      setCopiedText(null);
    }, 2000);
  };

  const loadExample = (index: number) => {
    setSelectedExampleIndex(index);
    if (contohList[index]) {
      setPlaygroundCode(contohList[index].konten);
    }
  };

  // Penganalisis token sederhana untuk demonstrasi kamus leksikal Phase 1
  const parseTokens = (code: string) => {
    const lines = code.split('\n');
    return lines.map((line, lineIndex) => {
      const parts = line.split(/(\s+|[(),:=+\-*/><"])/).filter(Boolean);
      return {
        lineNum: lineIndex + 1,
        tokens: parts.map((part) => {
          const trimmed = part.trim();
          const isKeyword = DAFTAR_KATA_KUNCI.includes(trimmed);
          const isType = DAFTAR_TIPE_DATA.includes(trimmed);
          const isOperator = DAFTAR_OPERATOR.includes(trimmed);
          const isBuiltin = trimmed === 'tampilkan';
          const isString = trimmed.startsWith('"') || trimmed.endsWith('"');
          const isNumber = !isNaN(Number(trimmed)) && trimmed !== '';

          let typeClass = 'text-slate-200';
          if (isKeyword) typeClass = 'text-amber-400 font-semibold';
          else if (isType) typeClass = 'text-cyan-400 font-medium';
          else if (isOperator) typeClass = 'text-rose-400 font-semibold';
          else if (isBuiltin) typeClass = 'text-emerald-400 font-semibold';
          else if (isString) typeClass = 'text-lime-300';
          else if (isNumber) typeClass = 'text-orange-300';

          return {
            text: part,
            typeClass,
          };
        }),
      };
    });
  };

  const filteredRoadmap = activeFilterCategory === 'Semua'
    ? DAFTAR_FASE_ROADMAP
    : DAFTAR_FASE_ROADMAP.filter(f => f.kategori === activeFilterCategory);

  const roadmapCategories = ['Semua', 'Fondasi', 'Mesin Inti', 'Fitur Lanjut', 'Kompilasi Native', 'Ekosistem', 'Domain Khusus', 'Sistem Operasi'];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-900 selection:text-rose-100">
      {/* 1. TOP BAR CONTRACT: exactly 3 zones */}
      <header className="border-b border-slate-800/80 bg-slate-950/95 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <span className="font-bold text-xl tracking-tight text-white flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-600 inline-block shadow-sm shadow-rose-500/50"></span>
              NUSANTARA
            </span>
          </div>

          {/* Zone 2: 4-6 text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <button
              onClick={() => setActiveTab('berkas')}
              className={`hover:text-white transition-colors cursor-pointer ${
                activeTab === 'berkas' ? 'text-white font-semibold' : 'text-slate-400'
              }`}
            >
              Penjelajah Berkas
            </button>
            <button
              onClick={() => setActiveTab('contoh')}
              className={`hover:text-white transition-colors cursor-pointer ${
                activeTab === 'contoh' ? 'text-white font-semibold' : 'text-slate-400'
              }`}
            >
              Laboratorium Sintaksis
            </button>
            <button
              onClick={() => setActiveTab('arsitektur')}
              className={`hover:text-white transition-colors cursor-pointer ${
                activeTab === 'arsitektur' ? 'text-white font-semibold' : 'text-slate-400'
              }`}
            >
              Arsitektur Kompilator
            </button>
            <button
              onClick={() => setActiveTab('roadmap')}
              className={`hover:text-white transition-colors cursor-pointer ${
                activeTab === 'roadmap' ? 'text-white font-semibold' : 'text-slate-400'
              }`}
            >
              Peta Jalan 36 Fase
            </button>
            <button
              onClick={() => setActiveTab('nip')}
              className={`hover:text-white transition-colors cursor-pointer ${
                activeTab === 'nip' ? 'text-white font-semibold' : 'text-slate-400'
              }`}
            >
              NIP-0001
            </button>
            <button
              onClick={() => setActiveTab('git')}
              className={`hover:text-white transition-colors cursor-pointer ${
                activeTab === 'git' ? 'text-white font-semibold' : 'text-slate-400'
              }`}
            >
              Panduan GitHub
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleCopy('git clone https://github.com/nusantara-lang/NUSANTARA.git', 'clone')}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-200 bg-slate-900 border border-slate-700/80 rounded-lg hover:bg-slate-800 hover:text-white transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              {copiedText === 'clone' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Terminal className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copiedText === 'clone' ? 'Tersalin' : 'Klon Repositori'}</span>
            </button>
            <a
              href="#penjelajah"
              onClick={() => setActiveTab('berkas')}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-rose-600 rounded-lg hover:bg-rose-500 transition-colors whitespace-nowrap cursor-pointer"
            >
              Jelajahi v0.1.0
            </a>
          </div>
        </div>
      </header>

      {/* 2. HERO STATEMENT & UNBOXED METADATA */}
      <section className="border-b border-slate-800/60 bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Zero-Pill unboxed metadata */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-4 tracking-wide font-mono">
            <span className="text-emerald-400 font-medium">v0.1.0</span>
            <span aria-hidden="true">·</span>
            <span>Phase 1: Identitas & Fondasi</span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-400 font-medium">Ekstensi .nusantara</span>
            <span aria-hidden="true">·</span>
            <span>100% Bahasa Indonesia</span>
            <span aria-hidden="true">·</span>
            <span>Lisensi MIT Terbuka</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-4xl leading-tight">
            Bahasa Pemrograman 100% Bahasa Indonesia untuk Masa Depan Kedaulatan Komputasi.
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            NUSANTARA adalah ikhtiar rekayasa piranti lunak terbuka yang dirancang dari nol untuk berkembang menjadi bahasa pemrograman serba guna: dari skrip pendidikan, web, perangkat seluler, hingga kernel sistem operasi <strong className="text-white font-semibold">NusantaraOS</strong>.
          </p>

          {/* Status Alert: Masih dalam tahap pengembangan awal */}
          <div className="mt-6 p-4 rounded-xl bg-slate-900/90 border border-slate-800 max-w-3xl flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <span className="font-semibold text-amber-300">Status Pengembangan Resmi:</span> Masih dalam tahap pengembangan awal (Phase 1). Repositori ini memuat spesifikasi kanonik, identitas resmi, konstitusi, arsitektur kompilator, dan 5 contoh sintaksis acuan. Implementasi kompilator biner akan dimulai secara terukur pada Phase 6 (Lexer).
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAIN INTERACTIVE CONTENT AREA */}
      <main id="penjelajah" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full">
        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-4 mb-8 overflow-x-auto text-sm">
          <button
            onClick={() => setActiveTab('berkas')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'berkas' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Folder className="w-4 h-4 text-amber-400" />
            <span>Penjelajah Repositori</span>
          </button>
          <button
            onClick={() => setActiveTab('contoh')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'contoh' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <FileCode className="w-4 h-4 text-rose-400" />
            <span>Laboratorium Sintaksis</span>
          </button>
          <button
            onClick={() => setActiveTab('arsitektur')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'arsitektur' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>Arsitektur Saluran Pipa</span>
          </button>
          <button
            onClick={() => setActiveTab('roadmap')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'roadmap' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>Peta Jalan 36 Fase</span>
          </button>
          <button
            onClick={() => setActiveTab('nip')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'nip' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4 text-purple-400" />
            <span>NIP-0001 (Proposal Inti)</span>
          </button>
          <button
            onClick={() => setActiveTab('git')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'git' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <GitBranch className="w-4 h-4 text-orange-400" />
            <span>Panduan GitHub</span>
          </button>
        </div>

        {/* TAB 1: PENJELAJAH REPOSITORI BERKAS */}
        {activeTab === 'berkas' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sisi Kiri: Daftar Berkas Pohon Direktori */}
            <div className="lg:col-span-4 bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex flex-col h-[700px]">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Berkas Repositori</span>
                <span className="text-xs text-slate-500 font-mono">{BERKAS_REPOSITORI.length} Berkas Fondasi</span>
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
                        isSelected ? 'bg-rose-950/70 text-rose-200 border border-rose-800/60' : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
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

            {/* Sisi Kanan: Penampil Isi Berkas */}
            <div className="lg:col-span-8 bg-slate-900/70 border border-slate-800 rounded-xl flex flex-col h-[700px] overflow-hidden">
              {/* Header Editor Berkas */}
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

              {/* Isi Berkas */}
              <div className="p-5 overflow-auto flex-1 font-mono text-xs sm:text-sm bg-slate-950/80 leading-relaxed text-slate-200">
                <pre className="whitespace-pre-wrap">{selectedFile.konten}</pre>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LABORATORIUM SINTAKSIS NUSANTARA */}
        {activeTab === 'contoh' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Pemilih Contoh Resmi */}
              <div className="lg:col-span-4 space-y-3">
                <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">5 Kode Acuan Phase 1</h3>
                <div className="space-y-2">
                  {contohList.map((item, idx) => (
                    <button
                      key={item.jalur}
                      onClick={() => loadExample(idx)}
                      className={`w-full text-left p-3 rounded-xl border transition-colors cursor-pointer flex items-center justify-between ${
                        selectedExampleIndex === idx
                          ? 'bg-rose-950/60 border-rose-700/80 text-white'
                          : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="font-mono text-xs font-medium">{item.nama}</div>
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                    </button>
                  ))}
                </div>

                {/* Glosarium Kata Kunci Resmi */}
                <div className="mt-6 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Kata Kunci Resmi (NIP-0001)</div>
                  <div className="flex flex-wrap gap-1.5">
                    {DAFTAR_KATA_KUNCI.map((kw) => (
                      <span key={kw} className="font-mono text-[11px] text-amber-300 bg-amber-950/30 px-2 py-0.5 rounded border border-amber-900/50">
                        {kw}
                      </span>
                    ))}
                  </div>

                  <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mt-4 mb-2">Tipe Data Pokok</div>
                  <div className="flex flex-wrap gap-1.5">
                    {DAFTAR_TIPE_DATA.map((tp) => (
                      <span key={tp} className="font-mono text-[11px] text-cyan-300 bg-cyan-950/30 px-2 py-0.5 rounded border border-cyan-900/50">
                        {tp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Editor & Penampil Leksikal */}
              <div className="lg:col-span-8 space-y-4">
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden">
                  <div className="px-4 py-2.5 border-b border-slate-800 bg-slate-900 flex items-center justify-between">
                    <span className="text-xs font-mono font-medium text-slate-300 flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-rose-400" />
                      Editor Kode Sumber .nusantara
                    </span>
                    <button
                      onClick={() => handleCopy(playgroundCode, 'pg')}
                      className="px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 rounded flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedText === 'pg' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
                      <span>{copiedText === 'pg' ? 'Tersalin' : 'Salin Kode'}</span>
                    </button>
                  </div>
                  <textarea
                    value={playgroundCode}
                    onChange={(e) => setPlaygroundCode(e.target.value)}
                    rows={8}
                    className="w-full p-4 bg-slate-950/90 font-mono text-sm text-slate-100 focus:outline-none resize-none leading-relaxed border-b border-slate-800"
                    placeholder="Tulis kode .nusantara di sini..."
                  />

                  {/* Penampil Token Warna Leksikal (Demonstrasi Lexer Phase 1) */}
                  <div className="p-4 bg-slate-950">
                    <div className="text-xs text-slate-400 uppercase tracking-wider mb-2 font-mono flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      Pratinjau Tokenisasi Leksikal (Kamus NIP-0001)
                    </div>
                    <div className="font-mono text-xs sm:text-sm space-y-1 overflow-x-auto bg-slate-900/60 p-4 rounded-lg border border-slate-800/80">
                      {parseTokens(playgroundCode).map((line) => (
                        <div key={line.lineNum} className="flex">
                          <span className="w-8 text-slate-600 select-none text-right pr-3">{line.lineNum}</span>
                          <span className="whitespace-pre">
                            {line.tokens.map((tok, tIdx) => (
                              <span key={tIdx} className={tok.typeClass}>
                                {tok.text}
                              </span>
                            ))}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ARSITEKTUR SALURAN PIPA KOMPILATOR */}
        {activeTab === 'arsitektur' && (
          <div className="space-y-8">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-2">Saluran Pipa Kompilasi (.nusantara → Native Binary)</h2>
              <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
                Kompilator resmi bahasa NUSANTARA dirancang dengan 7 tahapan proses logis yang terpisah secara modular, menjamin ketelitian inferensi tipe dan optimasi biner tingkat tinggi tanpa klaim palsu.
              </p>

              {/* Diagram Saluran Pipa */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    tahap: '1. Lexer',
                    fase: 'Phase 6',
                    deskripsi: 'Tokenisasi kode sumber UTF-8 menjadi aliran token kata kunci, operator, dan pengidentifikasi Bahasa Indonesia.',
                    warna: 'border-amber-600/40 bg-amber-950/20 text-amber-400',
                  },
                  {
                    tahap: '2. Parser',
                    fase: 'Phase 7',
                    deskripsi: 'Menganalisis tata bahasa EBNF dan menyusun Pohon Sintaksis Abstrak (AST) dengan pemulihan galat yang presisi.',
                    warna: 'border-rose-600/40 bg-rose-950/20 text-rose-400',
                  },
                  {
                    tahap: '3. Semantik',
                    fase: 'Phase 9-10',
                    deskripsi: 'Pemeriksaan tabel simbol, inferensi tipe statis, penegakan immutability tetap, dan validasi null-safety.',
                    warna: 'border-cyan-600/40 bg-cyan-950/20 text-cyan-400',
                  },
                  {
                    tahap: '4. IR Nusantara',
                    fase: 'Phase 21',
                    deskripsi: 'Penerjemahan ke bentuk Static Single Assignment (SSA) independen dari arsitektur perangkat keras.',
                    warna: 'border-purple-600/40 bg-purple-950/20 text-purple-400',
                  },
                  {
                    tahap: '5. Optimizer',
                    fase: 'Phase 24',
                    deskripsi: 'Penghapusan kode mati (DCE), ekspansi sebaris (inlining), dan pelipatan konstanta matematis.',
                    warna: 'border-blue-600/40 bg-blue-950/20 text-blue-400',
                  },
                  {
                    tahap: '6. Backend LLVM',
                    fase: 'Phase 22',
                    deskripsi: 'Pembangkitan instruksi bahasa mesin untuk x86_64, ARM64, RISC-V, dan WebAssembly (WASM).',
                    warna: 'border-emerald-600/40 bg-emerald-950/20 text-emerald-400',
                  },
                  {
                    tahap: '7. Executable',
                    fase: 'Phase 23',
                    deskripsi: 'Pengaitan pustaka runtime untuk menghasilkan berkas biner mandiri (.exe / ELF / Mach-O).',
                    warna: 'border-orange-600/40 bg-orange-950/20 text-orange-400',
                  },
                  {
                    tahap: '8. NusantaraOS',
                    fase: 'Phase 36',
                    deskripsi: 'Pemrograman sistem tingkat rendah menuju perwujudan kernel sistem operasi mandiri.',
                    warna: 'border-red-600/40 bg-red-950/20 text-red-400',
                  },
                ].map((item) => (
                  <div key={item.tahap} className={`p-4 rounded-xl border ${item.warna} flex flex-col justify-between`}>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-sm text-white">{item.tahap}</span>
                        <span className="font-mono text-xs opacity-80">{item.fase}</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{item.deskripsi}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visi Format Berkas Mandiri */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-2">Konsep Format Berkas Mandiri (Phase 30)</h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
                Di masa depan, ekosistem NUSANTARA direncanakan mendukung format data multimedia asli Bahasa Indonesia:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 font-mono text-xs">
                {['.gambar', '.video', '.suara', '.animasi', '.buku', '.font', '.ikon'].map((ext) => (
                  <div key={ext} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-center text-rose-300 font-semibold">
                    {ext}
                  </div>
                ))}
              </div>
              <div className="mt-3 text-[11px] text-slate-500 italic">
                * Catatan: Format berkas di atas adalah konsep riset masa depan dan baru akan diimplementasikan pada Phase 30.
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PETA JALAN 36 FASE */}
        {activeTab === 'roadmap' && (
          <div className="space-y-6">
            {/* Filter Kategori Peta Jalan */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
              {roadmapCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilterCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    activeFilterCategory === cat
                      ? 'bg-rose-600 text-white font-semibold'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid 36 Fase */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredRoadmap.map((item) => {
                const isCurrent = item.fase === 1;
                const isNext = item.fase === 2;
                return (
                  <div
                    key={item.fase}
                    className={`p-4 rounded-xl border transition-all ${
                      isCurrent
                        ? 'bg-rose-950/40 border-rose-600/80 shadow-sm shadow-rose-900/30'
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

        {/* TAB 5: NIP-0001 PROPOSAL */}
        {activeTab === 'nip' && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
                <span>NIP Nomor: 0001</span>
                <span>·</span>
                <span className="text-emerald-400 font-semibold">Status: Diterima (Accepted)</span>
                <span>·</span>
                <span>Standar Inti</span>
              </div>
              <h2 className="text-2xl font-bold text-white">NIP-0001: Identitas dan Prinsip Dasar Bahasa NUSANTARA</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80">
                  <h4 className="font-semibold text-white mb-2">1. Ringkasan Abstrak</h4>
                  <p>
                    Proposal ini menetapkan identitas resmi, tata nama, ekstensi berkas (.nusantara), leksikon inti, dan filosofi perancangan bahasa pemrograman NUSANTARA sebagai fondasi konstitusional.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80">
                  <h4 className="font-semibold text-white mb-2">2. Motivasi Kedaulatan</h4>
                  <p>
                    Menghilangkan hambatan kognitif ganda bagi pelajar Indonesia (antara menerjemahkan bahasa asing dan memahami algoritma), serta mendirikan kedaulatan perangkat lunak tingkat fondasi komputasi.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80">
                  <h4 className="font-semibold text-white mb-2">3. Struktur Blok Eksplisit</h4>
                  <p className="mb-2">
                    Menggunakan batas leksikal yang ramah manusia dan bebas ambiguitas kurung kurawal:
                  </p>
                  <pre className="font-mono text-xs bg-slate-900 p-2.5 rounded text-amber-300">
                    {`program NamaProgram\n\nmulai\n    // instruksi logika\nselesai`}
                  </pre>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80">
                  <h4 className="font-semibold text-white mb-2">4. Daftar NIP Lanjutan yang Direncanakan</h4>
                  <ul className="space-y-1 font-mono text-xs text-slate-400">
                    <li>• NIP-0002 — Sistem Modul & Ruang Nama</li>
                    <li>• NIP-0003 — Sistem Manajemen Paket Terdistribusi</li>
                    <li>• NIP-0004 — Sistem Penanganan Galat Presisi</li>
                    <li>• NIP-0005 — Sistem Konkurensi Asinkron</li>
                    <li>• NIP-0006 — Sistem Objek dan Pewarisan</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: PANDUAN GIT & RELEASE V0.1.0 */}
        {activeTab === 'git' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-2">Panduan Mengunggah Phase 1 ke GitHub</h2>
              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                Jalankan langkah-langkah berikut di terminal untuk menginisialisasi repositori, membuat komit awal, dan menandai tag rilis resmi v0.1.0.
              </p>

              <div className="space-y-4">
                {[
                  {
                    langkah: 'Langkah 1: Inisialisasi Git & Cabang main',
                    cmd: 'git init\ngit branch -M main',
                  },
                  {
                    langkah: 'Langkah 2: Tambahkan Semua Berkas Fondasi & Buat Komit Awal',
                    cmd: 'git add .\ngit commit -m "feat: fondasi awal bahasa NUSANTARA"',
                  },
                  {
                    langkah: 'Langkah 3: Hubungkan ke Repositori GitHub & Dorong (Push)',
                    cmd: 'git remote add origin https://github.com/USERNAME/NUSANTARA.git\ngit push -u origin main',
                  },
                  {
                    langkah: 'Langkah 4: Buat Tag Rilis Resmi v0.1.0',
                    cmd: 'git tag -a v0.1.0 -m "NUSANTARA v0.1.0 — Identitas & Fondasi"\ngit push origin v0.1.0',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-slate-200">{item.langkah}</span>
                      <button
                        onClick={() => handleCopy(item.cmd, `step-${idx}`)}
                        className="px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 rounded flex items-center gap-1.5 cursor-pointer"
                      >
                        {copiedText === `step-${idx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
                        <span>{copiedText === `step-${idx}` ? 'Tersalin' : 'Salin'}</span>
                      </button>
                    </div>
                    <pre className="font-mono text-xs text-rose-300 bg-slate-900/80 p-3 rounded-lg overflow-x-auto">
                      {item.cmd}
                    </pre>
                  </div>
                ))}
              </div>
            </div>

            {/* Checklist Integritas Phase 1 */}
            <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                Checklist Kelengkapan Phase 1 (Terverifikasi)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs text-slate-300 font-mono">
                <div className="flex items-center gap-2">✓ README.md Utama</div>
                <div className="flex items-center gap-2">✓ LISENSI (MIT)</div>
                <div className="flex items-center gap-2">✓ KONTRIBUSI.md</div>
                <div className="flex items-center gap-2">✓ KODE-ETIK.md</div>
                <div className="flex items-center gap-2">✓ PERUBAHAN.md (Changelog)</div>
                <div className="flex items-center gap-2">✓ ROADMAP.md (36 Fase)</div>
                <div className="flex items-center gap-2">✓ .gitignore Terkonfigurasi</div>
                <div className="flex items-center gap-2">✓ NIP-0001 Diterbitkan</div>
                <div className="flex items-center gap-2">✓ 5 Kode Acuan .nusantara</div>
                <div className="flex items-center gap-2">✓ Skrip Evaluasi Fondasi</div>
                <div className="flex items-center gap-2">✓ Arsitektur Kompilator</div>
                <div className="flex items-center gap-2">✓ Panduan Operasional GitHub</div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 4. FOOTER: clean and quiet */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 px-4 sm:px-6 text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="font-bold text-slate-200 font-sans">NUSANTARA</span>
            <span>·</span>
            <span>Versi v0.1.0</span>
            <span>·</span>
            <span>Hak Cipta © 2026 Komunitas Pengembang NUSANTARA</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              GitHub Repositori
            </a>
            <span>·</span>
            <button onClick={() => setActiveTab('nip')} className="hover:text-white transition-colors cursor-pointer">
              NIP-0001
            </button>
            <span>·</span>
            <button onClick={() => setActiveTab('roadmap')} className="hover:text-white transition-colors cursor-pointer">
              Peta Jalan 36 Fase
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
