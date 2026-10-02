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
  Cpu,
  ShieldCheck,
  Code2,
  Scale,
  AlertTriangle,
  Users,
  Shield,
  FileCheck,
  Binary
} from 'lucide-react';
import {
  BERKAS_REPOSITORI,
  DAFTAR_PRESEDENSI_OPERATOR,
  DAFTAR_KATA_KUNCI_PHASE2,
  DAFTAR_TIPE_DATA,
  DAFTAR_OPERATOR,
  DAFTAR_FASE_ROADMAP,
  BerkasRepo
} from './data/berkasRepositori';

export default function App() {
  const [activeTab, setActiveTab] = useState<'ebnf' | 'tata-kelola' | 'konstitusi' | 'berkas' | 'keyword' | 'uji-spesifikasi' | 'contoh' | 'roadmap' | 'git'>('ebnf');
  const [selectedFile, setSelectedFile] = useState<BerkasRepo>(BERKAS_REPOSITORI[0]);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [selectedExampleIndex, setSelectedExampleIndex] = useState<number>(0);
  const [keywordFilter, setKeywordFilter] = useState<'semua' | 'ditetapkan' | 'rancangan'>('semua');
  const [playgroundCode, setPlaygroundCode] = useState<string>(
    `program UjiEBNF\n\nmulai\n    nama : teks = "Nusantara"\n    skor : bilangan = 95\n    tetap AMBANG : bilangan = 75\n\n    jika (skor >= AMBANG) dan benar maka\n        tampilkan("Status: " + nama + " Lulus")\n    selain\n        tampilkan("Status: Perlu Pembinaan")\n    akhir\nselesai`
  );
  const [activeFilterCategory, setActiveFilterCategory] = useState<string>('Semua');

  const contohList = BERKAS_REPOSITORI.filter((b) => b.jalur.startsWith('contoh/0') || b.jalur.includes('program-valid'));

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

  const parseTokens = (code: string) => {
    const lines = code.split('\n');
    return lines.map((line, lineIndex) => {
      const parts = line.split(/(\s+|[(),:=+\-*/><"])/).filter(Boolean);
      return {
        lineNum: lineIndex + 1,
        tokens: parts.map((part) => {
          const trimmed = part.trim();
          const kwObj = DAFTAR_KATA_KUNCI_PHASE2.find(k => k.kw === trimmed);
          const isType = DAFTAR_TIPE_DATA.includes(trimmed);
          const isOperator = DAFTAR_OPERATOR.includes(trimmed);
          const isBuiltin = trimmed === 'tampilkan';
          const isString = trimmed.startsWith('"') || trimmed.endsWith('"');
          const isNumber = !isNaN(Number(trimmed)) && trimmed !== '';

          let typeClass = 'text-slate-200';
          if (kwObj) {
            typeClass = kwObj.status === 'DITETAPKAN' ? 'text-amber-400 font-semibold' : 'text-purple-400 font-semibold italic';
          } else if (isType) typeClass = 'text-cyan-400 font-medium';
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

  const filteredKeywords = DAFTAR_KATA_KUNCI_PHASE2.filter((k) => {
    if (keywordFilter === 'ditetapkan') return k.status === 'DITETAPKAN';
    if (keywordFilter === 'rancangan') return k.status === 'RANCANGAN';
    return true;
  });

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
              onClick={() => setActiveTab('ebnf')}
              className={`hover:text-white transition-colors cursor-pointer ${
                activeTab === 'ebnf' ? 'text-white font-semibold' : 'text-slate-400'
              }`}
            >
              Tata Bahasa EBNF
            </button>
            <button
              onClick={() => setActiveTab('tata-kelola')}
              className={`hover:text-white transition-colors cursor-pointer ${
                activeTab === 'tata-kelola' ? 'text-white font-semibold' : 'text-slate-400'
              }`}
            >
              Tata Kelola
            </button>
            <button
              onClick={() => setActiveTab('konstitusi')}
              className={`hover:text-white transition-colors cursor-pointer ${
                activeTab === 'konstitusi' ? 'text-white font-semibold' : 'text-slate-400'
              }`}
            >
              Konstitusi Bahasa
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
              onClick={() => setActiveTab('keyword')}
              className={`hover:text-white transition-colors cursor-pointer ${
                activeTab === 'keyword' ? 'text-white font-semibold' : 'text-slate-400'
              }`}
            >
              Kata Kunci
            </button>
            <button
              onClick={() => setActiveTab('uji-spesifikasi')}
              className={`hover:text-white transition-colors cursor-pointer ${
                activeTab === 'uji-spesifikasi' ? 'text-white font-semibold' : 'text-slate-400'
              }`}
            >
              Uji Spesifikasi
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
              onClick={() => handleCopy('git commit -m "feat: tetapkan spesifikasi sintaks NUSANTARA"', 'commit-p4')}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-200 bg-slate-900 border border-slate-700/80 rounded-lg hover:bg-slate-800 hover:text-white transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              {copiedText === 'commit-p4' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Terminal className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copiedText === 'commit-p4' ? 'Tersalin' : 'Salin Komit Phase 4'}</span>
            </button>
            <button
              onClick={() => setActiveTab('ebnf')}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-rose-600 rounded-lg hover:bg-rose-500 transition-colors whitespace-nowrap cursor-pointer"
            >
              Milestone v0.4.0
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO STATEMENT & UNBOXED METADATA */}
      <section className="border-b border-slate-800/60 bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-4 tracking-wide font-mono">
            <span className="text-emerald-400 font-medium">v0.4.0</span>
            <span aria-hidden="true">·</span>
            <span>Phase 4: Spesifikasi Sintaks EBNF Formal</span>
            <span aria-hidden="true">·</span>
            <span className="text-purple-400 font-medium">ISO/IEC 14977</span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-400 font-medium">8 Tingkat Presedensi</span>
            <span aria-hidden="true">·</span>
            <span>100% Bahasa Indonesia</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-4xl leading-tight">
            Tata Bahasa Formal EBNF & Spesifikasi Sintaks NUSANTARA.
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Menetapkan aturan produksi bebas ambiguitas, spesifikasi token leksikal lengkap, tabel presedensi 8 tingkat operator, serta katalog 15 kasus negatif sebagai fondasi Lexer (Phase 6) dan Parser (Phase 7).
          </p>

          <div className="mt-6 p-4 rounded-xl bg-slate-900/90 border border-slate-800 max-w-3xl flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <span className="font-semibold text-emerald-300">Status Phase 4:</span> Spesifikasi EBNF formal telah disahkan. Implementasi Lexer dan Parser nyata akan dimulai pada Phase 6 dan 7 tanpa compiler tiruan prematur.
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-4 mb-8 overflow-x-auto text-sm">
          <button
            onClick={() => setActiveTab('ebnf')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'ebnf' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Binary className="w-4 h-4 text-purple-400" />
            <span>Tata Bahasa EBNF</span>
          </button>
          <button
            onClick={() => setActiveTab('tata-kelola')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'tata-kelola' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Users className="w-4 h-4 text-teal-400" />
            <span>Tata Kelola</span>
          </button>
          <button
            onClick={() => setActiveTab('konstitusi')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'konstitusi' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Scale className="w-4 h-4 text-rose-400" />
            <span>Konstitusi</span>
          </button>
          <button
            onClick={() => setActiveTab('berkas')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'berkas' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Folder className="w-4 h-4 text-amber-400" />
            <span>Penjelajah Berkas (65)</span>
          </button>
          <button
            onClick={() => setActiveTab('keyword')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'keyword' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <FileCode className="w-4 h-4 text-cyan-400" />
            <span>Kata Kunci (32)</span>
          </button>
          <button
            onClick={() => setActiveTab('uji-spesifikasi')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'uji-spesifikasi' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-orange-400" />
            <span>Uji Kasus Negatif (15)</span>
          </button>
          <button
            onClick={() => setActiveTab('contoh')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'contoh' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Code2 className="w-4 h-4 text-emerald-400" />
            <span>Laboratorium</span>
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

        {/* TAB 1: TATA BAHASA EBNF (PHASE 4) */}
        {activeTab === 'ebnf' && (
          <div className="space-y-8">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Tata Bahasa Formal EBNF (ISO/IEC 14977)</h2>
                  <p className="text-xs text-slate-400 font-mono mt-1">Disahkan pada Phase 4 sebagai spesifikasi resmi masukan Lexer & Parser</p>
                </div>
                <span className="font-mono text-xs px-2.5 py-1 bg-purple-950/60 border border-purple-800 text-purple-300 rounded-md">
                  [BEBAS AMBIGUITAS]
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-200 border border-slate-800 space-y-2 overflow-x-auto">
                  <div className="text-amber-400 font-semibold mb-2">// Produksi Utama Program & Blok</div>
                  <pre className="text-purple-300 leading-relaxed">{`program_utama = "program", spasi, pengidentifikasi, pemisah_baris,
                blok_utama ;

blok_utama = "mulai", pemisah_baris,
             daftar_pernyataan,
             "selesai" ;

pernyataan = deklarasi_variabel
           | deklarasi_tetap
           | penugasan
           | pemanggilan_fungsi
           | percabangan_jika
           | perulangan_untuk
           | perulangan_selama
           | instruksi_kendali ;`}</pre>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-200 border border-slate-800 space-y-2 overflow-x-auto">
                  <div className="text-amber-400 font-semibold mb-2">// Produksi Percabangan & Perulangan</div>
                  <pre className="text-purple-300 leading-relaxed">{`percabangan_jika = "jika", spasi, ekspresi, spasi, "maka", pemisah_baris,
                   daftar_pernyataan,
                   [ "selain", pemisah_baris, daftar_pernyataan ],
                   "akhir" ;

perulangan_untuk = "untuk", spasi, pengidentifikasi, spasi,
                   "dari", spasi, ekspresi, spasi,
                   "sampai", spasi, ekspresi, spasi,
                   "lakukan", pemisah_baris,
                   daftar_pernyataan,
                   "akhir" ;`}</pre>
                </div>
              </div>
            </div>

            {/* Tabel Prioritas Operator 8 Tingkat */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-2">Tabel 8 Tingkat Presedensi Operator Resmi [DITETAPKAN]</h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                Hirarki evaluasi operator bertingkat untuk menjamin tidak adanya ambiguitas saat membangun pohon sintaksis abstrak (AST):
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-950/90 text-slate-400 font-mono text-xs uppercase border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-4">Tingkat Prioritas</th>
                      <th className="py-2.5 px-4">Kategori Operator</th>
                      <th className="py-2.5 px-4">Simbol / Kata Kunci</th>
                      <th className="py-2.5 px-4">Arah Asosiasi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-mono text-xs">
                    {DAFTAR_PRESEDENSI_OPERATOR.map((op) => (
                      <tr key={op.tingkat} className="hover:bg-slate-800/40">
                        <td className="py-2.5 px-4 font-bold text-rose-400">Tingkat {op.tingkat} {op.tingkat === 1 ? '(Tertinggi)' : op.tingkat === 8 ? '(Terendah)' : ''}</td>
                        <td className="py-2.5 px-4 text-white font-sans">{op.nama}</td>
                        <td className="py-2.5 px-4 font-bold text-amber-300">{op.simbol}</td>
                        <td className="py-2.5 px-4 text-cyan-300">{op.asosiasi}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TATA KELOLA */}
        {activeTab === 'tata-kelola' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-2">Tata Kelola & Kebijakan Lisensi Apache 2.0</h2>
              <p className="text-sm text-slate-300 mb-6">Struktur 5 peran komunitas dan kebijakan keamanan responsible disclosure yang disahkan pada Phase 3.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="font-bold text-sm text-cyan-400">Lisensi Apache License 2.0</span>
                  <p className="text-xs text-slate-300 leading-relaxed">Memberikan izin komersial dan pribadi bebas royalti dengan perlindungan paten timbal balik dan kewajiban atribusi.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="font-bold text-sm text-emerald-400">Keamanan Tanpa Rahasia</span>
                  <p className="text-xs text-slate-300 leading-relaxed">Pelaporan celah wajib melalui GitHub Private Vulnerability Reporting; larangan keras token dan kata sandi di repositori.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: KONSTITUSI */}
        {activeTab === 'konstitusi' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-2">10 Prinsip Konstitusi Bahasa NUSANTARA</h2>
              <p className="text-sm text-slate-300 mb-4">Piagam dasar kedaulatan komputasi dan konsistensi bahasa.</p>
            </div>
          </div>
        )}

        {/* TAB 4: PENJELAJAH BERKAS */}
        {activeTab === 'berkas' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex flex-col h-[700px]">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Berkas Repositori (Phase 1-4)</span>
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

        {/* TAB 5: KATA KUNCI */}
        {activeTab === 'keyword' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">32 Kata Kunci Resmi Bahasa NUSANTARA</h2>
                <span className="text-xs text-slate-400 font-mono">21 Ditetapkan, 11 Rancangan</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <tbody className="divide-y divide-slate-800/80 font-mono text-xs">
                    {filteredKeywords.map((item) => (
                      <tr key={item.kw} className="hover:bg-slate-800/40">
                        <td className="py-2.5 px-4 font-bold text-amber-300">{item.kw}</td>
                        <td className="py-2.5 px-4">{item.status}</td>
                        <td className="py-2.5 px-4 text-slate-300 font-sans">{item.arti}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: UJI SPESIFIKASI NEGATIF (15 KASUS) */}
        {activeTab === 'uji-spesifikasi' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-2">Katalog 15 Kasus Negatif EBNF (Phase 4)</h2>
              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                Seluruh kasus di bawah ini melanggar tata bahasa EBNF dan wajib ditolak secara diagnostik oleh compiler di masa depan:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                {[
                  { no: 1, judul: 'Tanpa Mulai', err: 'Diharapkan kata kunci mulai' },
                  { no: 2, judul: 'Tanpa Selesai', err: 'Blok program belum ditutup selesai' },
                  { no: 3, judul: 'Nama Program Diawali Angka', err: 'Pengidentifikasi tidak boleh diawali angka' },
                  { no: 4, judul: 'Nama Variabel Kata Kunci (jika)', err: 'Kata kunci cadangan tidak boleh digunakan sebagai nama' },
                  { no: 5, judul: 'Deklarasi Tipe Buntung (skor := 10)', err: 'Diharapkan nama tipe data yang sah' },
                  { no: 6, judul: 'Jika Tanpa Maka', err: 'Diharapkan kata kunci maka' },
                  { no: 7, judul: 'Jika Tanpa Akhir', err: 'Blok percabangan belum ditutup akhir' },
                  { no: 8, judul: 'Untuk Tanpa Dari', err: 'Diharapkan kata kunci dari' },
                  { no: 9, judul: 'Untuk Tanpa Sampai', err: 'Diharapkan kata kunci sampai' },
                  { no: 10, judul: 'Selama Tanpa Lakukan', err: 'Diharapkan kata kunci lakukan' },
                  { no: 11, judul: 'String Tidak Ditutup', err: 'Literal teks tidak ditutup tanda kutip ganda' },
                  { no: 12, judul: 'Penugasan Ulang Tetap', err: 'Pengidentifikasi tetap tidak dapat diubah' },
                  { no: 13, judul: 'Fungsi Tanpa Blok Mulai/Selesai', err: 'Badan fungsi harus dibuka mulai ditutup selesai' },
                  { no: 14, judul: 'Kurung Argumen Tidak Ditutup', err: 'Diharapkan tanda kurung tutup )' },
                  { no: 15, judul: 'Operator Biner Ganda (+ *)', err: 'Operator * tidak terduga setelah +' },
                ].map((k) => (
                  <div key={k.no} className="p-3.5 rounded-xl bg-slate-950 border border-rose-900/60 flex flex-col justify-between">
                    <div>
                      <div className="font-bold text-rose-300 font-mono mb-1">Kasus {k.no}: {k.judul}</div>
                      <div className="text-[11px] text-slate-400">Ekspektasi Diagnostik:</div>
                      <div className="text-[11px] font-mono text-amber-200 mt-1">{k.err}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: LABORATORIUM */}
        {activeTab === 'contoh' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2">Editor Sintaksis Interaktif</h3>
              <textarea
                value={playgroundCode}
                onChange={(e) => setPlaygroundCode(e.target.value)}
                rows={8}
                className="w-full p-4 bg-slate-950/90 font-mono text-sm text-slate-100 focus:outline-none resize-none leading-relaxed border border-slate-800 rounded-lg"
              />
              <div className="mt-4 font-mono text-xs space-y-1 bg-slate-900/60 p-4 rounded-lg border border-slate-800">
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
        )}

        {/* TAB 8: PETA JALAN */}
        {activeTab === 'roadmap' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredRoadmap.map((item) => {
                const isCompleted = item.fase <= 4;
                const isCurrent = item.fase === 4;
                const isNext = item.fase === 5;
                return (
                  <div
                    key={item.fase}
                    className={`p-4 rounded-xl border transition-all ${
                      isCurrent
                        ? 'bg-rose-950/40 border-rose-600/80 shadow-sm shadow-rose-900/30'
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
                            ? 'bg-rose-900/60 text-rose-300 font-semibold'
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

        {/* TAB 9: SINKRONISASI GIT */}
        {activeTab === 'git' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-2">Sinkronisasi Komit Phase 4 ke GitHub</h2>
              <p className="text-sm text-slate-300 mb-6">Jalankan perintah berikut untuk menyinkronkan seluruh spesifikasi EBNF ke repositori GitHub:</p>
              <div className="space-y-3 font-mono text-xs">
                <pre className="text-rose-300 bg-slate-950 p-3 rounded-lg border border-slate-800">git add .</pre>
                <pre className="text-rose-300 bg-slate-950 p-3 rounded-lg border border-slate-800">git commit -m "feat: tetapkan spesifikasi sintaks NUSANTARA"</pre>
                <pre className="text-rose-300 bg-slate-950 p-3 rounded-lg border border-slate-800">git push origin main</pre>
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
            <span>Milestone v0.4.0 (Phase 4)</span>
            <span>·</span>
            <span>EBNF ISO/IEC 14977</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
