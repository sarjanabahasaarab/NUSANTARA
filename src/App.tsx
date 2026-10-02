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
  Binary,
  Compass,
  HelpCircle
} from 'lucide-react';
import {
  BERKAS_REPOSITORI,
  DAFTAR_PRESEDENSI_OPERATOR,
  DAFTAR_GLOSARIUM,
  DAFTAR_KATA_KUNCI_PHASE2,
  DAFTAR_TIPE_DATA,
  DAFTAR_OPERATOR,
  DAFTAR_FASE_ROADMAP,
  BerkasRepo
} from './data/berkasRepositori';

export default function App() {
  const [activeTab, setActiveTab] = useState<'panduan' | 'ebnf' | 'glosarium' | 'berkas' | 'keyword' | 'uji-spesifikasi' | 'contoh' | 'roadmap' | 'git'>('panduan');
  const [selectedFile, setSelectedFile] = useState<BerkasRepo>(BERKAS_REPOSITORI[0]);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [selectedExampleIndex, setSelectedExampleIndex] = useState<number>(0);
  const [keywordFilter, setKeywordFilter] = useState<'semua' | 'ditetapkan' | 'rancangan'>('semua');
  const [playgroundCode, setPlaygroundCode] = useState<string>(
    `program HaloNusantara\n\nmulai\n    nama : teks = "Indonesia"\n    tahun : bilangan = 2026\n    tetap SEMBOYAN : teks = "Bhinneka Tunggal Ika"\n\n    tampilkan("Selamat Datang di " + nama)\n    tampilkan(SEMBOYAN)\nselesai`
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
              onClick={() => setActiveTab('panduan')}
              className={`hover:text-white transition-colors cursor-pointer ${
                activeTab === 'panduan' ? 'text-white font-semibold' : 'text-slate-400'
              }`}
            >
              Buku Panduan (docs)
            </button>
            <button
              onClick={() => setActiveTab('ebnf')}
              className={`hover:text-white transition-colors cursor-pointer ${
                activeTab === 'ebnf' ? 'text-white font-semibold' : 'text-slate-400'
              }`}
            >
              Tata Bahasa EBNF
            </button>
            <button
              onClick={() => setActiveTab('glosarium')}
              className={`hover:text-white transition-colors cursor-pointer ${
                activeTab === 'glosarium' ? 'text-white font-semibold' : 'text-slate-400'
              }`}
            >
              Glosarium Istilah
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
              onClick={() => handleCopy('git commit -m "docs: add initial Indonesian language documentation"', 'commit-p5')}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-200 bg-slate-900 border border-slate-700/80 rounded-lg hover:bg-slate-800 hover:text-white transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              {copiedText === 'commit-p5' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Terminal className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copiedText === 'commit-p5' ? 'Tersalin' : 'Salin Komit Phase 5'}</span>
            </button>
            <button
              onClick={() => setActiveTab('panduan')}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-rose-600 rounded-lg hover:bg-rose-500 transition-colors whitespace-nowrap cursor-pointer"
            >
              Milestone v0.5.0
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO STATEMENT & METADATA */}
      <section className="border-b border-slate-800/60 bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-4 tracking-wide font-mono">
            <span className="text-emerald-400 font-medium">v0.5.0</span>
            <span aria-hidden="true">·</span>
            <span>Phase 5: Dokumentasi Awal & Buku Panduan</span>
            <span aria-hidden="true">·</span>
            <span className="text-cyan-400 font-medium">Struktur docs/</span>
            <span aria-hidden="true">·</span>
            <span className="text-purple-400 font-medium">28 Panduan Baru</span>
            <span aria-hidden="true">·</span>
            <span>100% Bahasa Indonesia</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-4xl leading-tight">
            Pusat Dokumentasi Resmi & Buku Panduan Bahasa NUSANTARA.
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Menyajikan panduan pemula bertahap, lembar sontekan referensi leksikal, tata cara kontribusi terbuka, dan kamus glosarium istilah komputasi Bahasa Indonesia.
          </p>

          <div className="mt-6 p-4 rounded-xl bg-slate-900/90 border border-slate-800 max-w-3xl flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <span className="font-semibold text-emerald-300">Status Phase 5:</span> Seluruh dokumentasi terstruktur telah disahkan. Kode sumber saat ini berstatus rancangan acuan dan belum dapat dieksekusi sebelum mesin kompilator dibangun pada Phase 6 (Lexer) dan Phase 7 (Parser).
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-4 mb-8 overflow-x-auto text-sm">
          <button
            onClick={() => setActiveTab('panduan')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'panduan' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4 text-rose-400" />
            <span>Buku Panduan Pemula</span>
          </button>
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
            onClick={() => setActiveTab('glosarium')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'glosarium' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>Glosarium Istilah</span>
          </button>
          <button
            onClick={() => setActiveTab('berkas')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'berkas' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Folder className="w-4 h-4 text-amber-400" />
            <span>Penjelajah Berkas (94)</span>
          </button>
          <button
            onClick={() => setActiveTab('keyword')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'keyword' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <FileCode className="w-4 h-4 text-teal-400" />
            <span>Kata Kunci (32)</span>
          </button>
          <button
            onClick={() => setActiveTab('uji-spesifikasi')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'uji-spesifikasi' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-orange-400" />
            <span>Uji Kasus Negatif</span>
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

        {/* TAB 1: BUKU PANDUAN PEMULA (docs/) */}
        {activeTab === 'panduan' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  bab: 'Bab 1: Program Pertama',
                  file: 'docs/panduan/program-pertama.md',
                  desc: 'Mencetak pesan sapaan pertama dengan perintah tampilkan("Halo Dunia!").',
                  sintaks: 'program Halo\nmulai\n    tampilkan("Halo Dunia!")\nselesai',
                },
                {
                  bab: 'Bab 2: Variabel & Tipe',
                  file: 'docs/panduan/variabel-dan-tipe-data.md',
                  desc: 'Menyimpan nilai dalam teks, bilangan, desimal, logika, dan konstanta tetap.',
                  sintaks: 'nama : teks = "Budi"\numur : bilangan = 25\ntetap PHI : desimal = 3.14',
                },
                {
                  bab: 'Bab 3: Operator & Logika',
                  file: 'docs/panduan/operator.md',
                  desc: 'Kalkulasi matematis (+, -, *, /) dan logika Bahasa Indonesia (dan, atau, tidak).',
                  sintaks: 'lulus : logika = (skor >= 75) dan aktif',
                },
                {
                  bab: 'Bab 4: Percabangan jika',
                  file: 'docs/panduan/percabangan.md',
                  desc: 'Pengambilan keputusan bercabang dengan jika...maka...selain...akhir.',
                  sintaks: 'jika nilai >= 75 maka\n    tampilkan("Lulus")\nselain\n    tampilkan("Remedial")\nakhir',
                },
                {
                  bab: 'Bab 5: Perulangan Iteratif',
                  file: 'docs/panduan/perulangan.md',
                  desc: 'Perulangan rentang inklusif untuk...lakukan dan perulangan kondisi selama.',
                  sintaks: 'untuk i dari 1 sampai 5 lakukan\n    tampilkan(i)\nakhir',
                },
                {
                  bab: 'Bab 6: Fungsi Modular',
                  file: 'docs/panduan/fungsi.md',
                  desc: 'Mendefinisikan subrutin modular dengan parameter beranotasi tipe dan nilai kembali.',
                  sintaks: 'fungsi kali(a : bilangan, b : bilangan) : bilangan\nmulai\n    kembalikan a * b\nselesai',
                },
              ].map((item) => (
                <div key={item.bab} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-xs text-rose-400 font-bold">{item.bab}</span>
                    <p className="text-xs text-slate-300 mt-1 mb-3">{item.desc}</p>
                    <pre className="p-3 bg-slate-950 font-mono text-[11px] text-amber-300 rounded-lg overflow-x-auto border border-slate-800">
                      {item.sintaks}
                    </pre>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-4">
              <HelpCircle className="w-6 h-6 text-cyan-400 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-white text-sm mb-1">Pertanyaan Seputar Instalasi Kompiler</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Pada Phase 5, seluruh berkas panduan di atas berstatus <strong>rancangan acuan sintaksis</strong>. Pembangunan biner kompilator (*compiler*) akan dimulai secara resmi pada <strong>Phase 6 (Lexer)</strong> dan <strong>Phase 7 (Parser)</strong>. Dokumentasi instalasi terminal akan diperbarui saat biner resmi siap digunakan.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TATA BAHASA EBNF */}
        {activeTab === 'ebnf' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-2">Tata Bahasa Formal EBNF (ISO/IEC 14977)</h2>
              <p className="text-xs text-slate-400 font-mono mb-4">Disahkan pada Phase 4 sebagai acuan mutlak Lexer & Parser</p>
              <pre className="p-4 bg-slate-950 font-mono text-xs text-purple-300 rounded-xl border border-slate-800 overflow-x-auto leading-relaxed">
{`program_utama = "program", spasi, pengidentifikasi, pemisah_baris, blok_utama ;
blok_utama = "mulai", pemisah_baris, daftar_pernyataan, "selesai" ;

pernyataan = deklarasi_variabel | deklarasi_tetap | penugasan | pemanggilan_fungsi
           | percabangan_jika | perulangan_untuk | perulangan_selama | instruksi_kendali ;`}
              </pre>
            </div>
          </div>
        )}

        {/* TAB 3: GLOSARIUM */}
        {activeTab === 'glosarium' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Glosarium Istilah Komputasi Bahasa Indonesia</h2>
                  <p className="text-xs text-slate-400 font-mono mt-1">Padanan resmi istilah teknis pemrograman dalam dokumentasi NUSANTARA</p>
                </div>
                <span className="font-mono text-xs px-2.5 py-1 bg-cyan-950/60 border border-cyan-800 text-cyan-300 rounded-md">
                  [BAHASA PERSATUAN]
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-950/90 text-slate-400 font-mono text-xs uppercase border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-4">Istilah Asing (Inggris)</th>
                      <th className="py-2.5 px-4">Padanan Bahasa Indonesia</th>
                      <th className="py-2.5 px-4">Penjelasan Singkat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-mono text-xs">
                    {DAFTAR_GLOSARIUM.map((item) => (
                      <tr key={item.asing} className="hover:bg-slate-800/40">
                        <td className="py-2.5 px-4 font-bold text-slate-300">{item.asing}</td>
                        <td className="py-2.5 px-4 font-bold text-cyan-300">{item.lokal}</td>
                        <td className="py-2.5 px-4 text-slate-300 font-sans">{item.ket}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PENJELAJAH BERKAS */}
        {activeTab === 'berkas' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex flex-col h-[700px]">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Berkas Repositori (Phase 1-5)</span>
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

        {/* TAB 6: UJI SPESIFIKASI NEGATIF */}
        {activeTab === 'uji-spesifikasi' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-2">Katalog 15 Kasus Negatif EBNF</h2>
              <p className="text-xs text-slate-400 mb-4">Kasus uji sintaksis yang melanggar aturan tata bahasa formal</p>
            </div>
          </div>
        )}

        {/* TAB 7: LABORATORIUM */}
        {activeTab === 'contoh' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2">Laboratorium Sintaksis Interaktif</h3>
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
                const isCompleted = item.fase <= 5;
                const isCurrent = item.fase === 5;
                const isNext = item.fase === 6;
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
              <h2 className="text-xl font-bold text-white mb-2">Sinkronisasi Komit Phase 5 ke GitHub</h2>
              <p className="text-sm text-slate-300 mb-6">Jalankan perintah berikut untuk menyinkronkan seluruh dokumentasi buku panduan ke repositori GitHub:</p>
              <div className="space-y-3 font-mono text-xs">
                <pre className="text-rose-300 bg-slate-950 p-3 rounded-lg border border-slate-800">git add .</pre>
                <pre className="text-rose-300 bg-slate-950 p-3 rounded-lg border border-slate-800">git commit -m "docs: add initial Indonesian language documentation"</pre>
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
            <span>Milestone v0.5.0 (Phase 5)</span>
            <span>·</span>
            <span>Apache License 2.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
