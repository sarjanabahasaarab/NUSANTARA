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
  AlertTriangle
} from 'lucide-react';
import {
  BERKAS_REPOSITORI,
  DAFTAR_KATA_KUNCI_PHASE2,
  DAFTAR_TIPE_DATA,
  DAFTAR_OPERATOR,
  DAFTAR_FASE_ROADMAP,
  BerkasRepo
} from './data/berkasRepositori';

export default function App() {
  const [activeTab, setActiveTab] = useState<'konstitusi' | 'berkas' | 'keyword' | 'uji-spesifikasi' | 'contoh' | 'arsitektur' | 'roadmap' | 'git'>('konstitusi');
  const [selectedFile, setSelectedFile] = useState<BerkasRepo>(BERKAS_REPOSITORI[0]);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [selectedExampleIndex, setSelectedExampleIndex] = useState<number>(0);
  const [keywordFilter, setKeywordFilter] = useState<'semua' | 'ditetapkan' | 'rancangan'>('semua');
  const [playgroundCode, setPlaygroundCode] = useState<string>(
    `program UjiKonstitusi\n\nmulai\n    nama : teks = "Nusantara"\n    skor : bilangan = 95\n    tetap AMBANG : bilangan = 75\n\n    jika skor >= AMBANG maka\n        tampilkan("Status: " + nama + " Lulus")\n    selain\n        tampilkan("Status: Perlu Pembinaan")\n    akhir\nselesai`
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
              Kata Kunci (32)
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
              onClick={() => setActiveTab('contoh')}
              className={`hover:text-white transition-colors cursor-pointer ${
                activeTab === 'contoh' ? 'text-white font-semibold' : 'text-slate-400'
              }`}
            >
              Laboratorium
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

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleCopy('git commit -m "feat: tetapkan konstitusi bahasa NUSANTARA"', 'commit')}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-200 bg-slate-900 border border-slate-700/80 rounded-lg hover:bg-slate-800 hover:text-white transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              {copiedText === 'commit' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Terminal className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copiedText === 'commit' ? 'Tersalin' : 'Salin Pesan Komit'}</span>
            </button>
            <button
              onClick={() => setActiveTab('konstitusi')}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-rose-600 rounded-lg hover:bg-rose-500 transition-colors whitespace-nowrap cursor-pointer"
            >
              Milestone v0.2.0
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO STATEMENT & UNBOXED METADATA */}
      <section className="border-b border-slate-800/60 bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Zero-Pill unboxed metadata */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-4 tracking-wide font-mono">
            <span className="text-emerald-400 font-medium">v0.2.0</span>
            <span aria-hidden="true">·</span>
            <span>Phase 2: Konstitusi Bahasa NUSANTARA</span>
            <span aria-hidden="true">·</span>
            <span className="text-purple-400 font-medium">NIP-0002 Disahkan</span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-400 font-medium">Ekstensi .nusantara</span>
            <span aria-hidden="true">·</span>
            <span>100% Bahasa Indonesia</span>
            <span aria-hidden="true">·</span>
            <span>Lisensi MIT</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-4xl leading-tight">
            Konstitusi Resmi Bahasa Pemrograman NUSANTARA.
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Menetapkan hukum tata bahasa formal, 32 kata kunci kanonik, taksonomi tipe data dasar, operator, aturan penamaan pengidentifikasi, dan standar pesan galat diagnostik berbahasa Indonesia.
          </p>

          {/* Status Alert: Spesifikasi Dokumen Sah */}
          <div className="mt-6 p-4 rounded-xl bg-slate-900/90 border border-slate-800 max-w-3xl flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <span className="font-semibold text-emerald-300">Status Tahap Pengembangan:</span> Konstitusi Phase 2 telah disahkan secara penuh melalui NIP-0002. Fase ini hanya menetapkan spesifikasi dan pengujian konsistensi dokumen tanpa implementasi biner kompilator tiruan. Pembangunan Lexer akan dimulai secara resmi pada Phase 6.
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full">
        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-4 mb-8 overflow-x-auto text-sm">
          <button
            onClick={() => setActiveTab('konstitusi')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'konstitusi' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Scale className="w-4 h-4 text-rose-400" />
            <span>10 Prinsip Konstitusi</span>
          </button>
          <button
            onClick={() => setActiveTab('berkas')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'berkas' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Folder className="w-4 h-4 text-amber-400" />
            <span>Penjelajah Berkas (38)</span>
          </button>
          <button
            onClick={() => setActiveTab('keyword')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'keyword' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <FileCode className="w-4 h-4 text-cyan-400" />
            <span>Tabel Kata Kunci</span>
          </button>
          <button
            onClick={() => setActiveTab('uji-spesifikasi')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'uji-spesifikasi' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-orange-400" />
            <span>Uji Spesifikasi</span>
          </button>
          <button
            onClick={() => setActiveTab('contoh')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'contoh' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Code2 className="w-4 h-4 text-emerald-400" />
            <span>Laboratorium Sintaksis</span>
          </button>
          <button
            onClick={() => setActiveTab('arsitektur')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'arsitektur' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Cpu className="w-4 h-4 text-blue-400" />
            <span>Arsitektur Saluran Pipa</span>
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

        {/* TAB 1: 10 PRINSIP KONSTITUSI */}
        {activeTab === 'konstitusi' && (
          <div className="space-y-8">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">10 Prinsip Konstitusi Bahasa NUSANTARA</h2>
                  <p className="text-xs text-slate-400 font-mono mt-1">Disahkan melalui NIP-0002 pada Milestone v0.2.0</p>
                </div>
                <span className="font-mono text-xs px-2.5 py-1 bg-emerald-950/60 border border-emerald-800 text-emerald-300 rounded-md">
                  [DITETAPKAN RESMI]
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {[
                  {
                    no: '01',
                    judul: 'Bahasa Indonesia Menjadi Bahasa Utama Sintaks',
                    uraian: 'Kata kunci, struktur kendali, pesan galat, CLI, dan dokumentasi mengutamakan kaidah Bahasa Indonesia yang tertib dan konsisten.',
                  },
                  {
                    no: '02',
                    judul: 'Sintaks Mudah Dibaca dan Konsisten',
                    uraian: 'Batas blok eksplisit (mulai...selesai, jika...maka...akhir) meminimalkan ambiguitas tanda baca dan mudah dipahami manusia.',
                  },
                  {
                    no: '03',
                    judul: 'Skalabilitas dari Aplikasi hingga NusantaraOS',
                    uraian: 'Dirancang fleksibel dari skrip umum, antarmuka web/mobile, hingga pemrograman sistem tingkat rendah dan kernel sistem operasi.',
                  },
                  {
                    no: '04',
                    judul: 'Spesifikasi yang Wajib Dapat Diuji',
                    uraian: 'Setiap aturan tata bahasa dan perilaku runtime wajib memiliki kasus uji spesifikasi konkret (test suite) yang terverifikasi.',
                  },
                  {
                    no: '05',
                    judul: 'Transparansi Perubahan Sintaks',
                    uraian: 'Tidak ada kata kunci yang ditambahkan atau diubah maknanya secara diam-diam tanpa pencatatan publik dalam riwayat perubahan.',
                  },
                  {
                    no: '06',
                    judul: 'Tata Kelola Perubahan Merusak Melalui NIP',
                    uraian: 'Setiap perubahan yang memutus kompatibilitas ke belakang (breaking changes) wajib melewati evaluasi formal proposal NIP.',
                  },
                  {
                    no: '07',
                    judul: 'Kepatuhan Implementasi Kompilator',
                    uraian: 'Implementasi compiler di fase berikutnya wajib tunduk penuh pada spesifikasi konstitusi, bukan mendikte perilaku sendiri.',
                  },
                  {
                    no: '08',
                    judul: 'Integritas Rekayasa (Tanpa Klaim Palsu)',
                    uraian: 'Fitur yang masih dirancang tidak boleh diklaim telah selesai. Performa hanya boleh diklaim setelah tolok ukur teruji secara publik.',
                  },
                  {
                    no: '09',
                    judul: 'Kemandirian Sistem Operasi (Cross-Platform)',
                    uraian: 'Spesifikasi netral terhadap OS; dirancang berjalan di Linux, Windows, macOS, Android, dan WebAssembly tanpa keterikatan tunggal.',
                  },
                  {
                    no: '10',
                    judul: 'Pengembangan Terbuka di GitHub',
                    uraian: 'Proyek berakar pada transparansi open source di bawah lisensi terbuka MIT untuk kemaslahatan teknologi masyarakat luas.',
                  },
                ].map((item) => (
                  <div key={item.no} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-start gap-3.5">
                    <span className="font-mono text-base font-bold text-rose-400 shrink-0">{item.no}</span>
                    <div>
                      <h3 className="font-semibold text-sm text-white mb-1">{item.judul}</h3>
                      <p className="text-xs text-slate-300 leading-relaxed">{item.uraian}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Struktur Program Resmi Awal */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-2">Struktur Program Resmi Awal [DITETAPKAN]</h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
                Struktur program minimal bahasa NUSANTARA bersifat deklaratif dengan batas leksikal yang tegas:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-200 border border-slate-800">
                  <div className="text-slate-500 mb-2">// Berkas: halo.nusantara</div>
                  <pre className="text-amber-300 leading-relaxed">{`program Halo\n\nmulai\n    tampilkan("Halo Dunia!")\nselesai`}</pre>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 text-xs text-slate-300 space-y-2 border border-slate-800">
                  <div className="font-semibold text-white">Aturan Konstruksi:</div>
                  <ul className="space-y-1.5 list-disc pl-4 text-slate-300">
                    <li><strong className="text-amber-300 font-mono">program</strong> menandai deklarasi nama unit program utama.</li>
                    <li><strong className="text-amber-300 font-mono">mulai</strong> membuka blok utama eksekusi instruksi.</li>
                    <li><strong className="text-amber-300 font-mono">selesai</strong> menutup blok utama program.</li>
                    <li>Instruksi komputasi ditulis rapi di dalam batas blok program.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PENJELAJAH BERKAS */}
        {activeTab === 'berkas' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex flex-col h-[700px]">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Berkas Repositori (Phase 1 & 2)</span>
                <span className="text-xs text-slate-500 font-mono">{BERKAS_REPOSITORI.length} Berkas</span>
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

        {/* TAB 3: TABEL KATA KUNCI RESMI */}
        {activeTab === 'keyword' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">Tabel 32 Kata Kunci Resmi Bahasa NUSANTARA</h2>
                  <p className="text-xs text-slate-400 mt-1">Dicadangkan resmi dalam konstitusi Phase 2 untuk mencegah tabrakan pengidentifikasi.</p>
                </div>
                <div className="flex items-center gap-2 p-1 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono">
                  <button
                    onClick={() => setKeywordFilter('semua')}
                    className={`px-3 py-1 rounded cursor-pointer ${keywordFilter === 'semua' ? 'bg-rose-600 text-white' : 'text-slate-400'}`}
                  >
                    Semua (32)
                  </button>
                  <button
                    onClick={() => setKeywordFilter('ditetapkan')}
                    className={`px-3 py-1 rounded cursor-pointer ${keywordFilter === 'ditetapkan' ? 'bg-amber-600 text-white' : 'text-slate-400'}`}
                  >
                    Ditetapkan (21)
                  </button>
                  <button
                    onClick={() => setKeywordFilter('rancangan')}
                    className={`px-3 py-1 rounded cursor-pointer ${keywordFilter === 'rancangan' ? 'bg-purple-600 text-white' : 'text-slate-400'}`}
                  >
                    Rancangan (11)
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-950/90 text-slate-400 font-mono text-xs uppercase border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">Kata Kunci</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Arti & Fungsi Komputasi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-mono text-xs">
                    {filteredKeywords.map((item) => (
                      <tr key={item.kw} className="hover:bg-slate-800/40">
                        <td className="py-2.5 px-4 font-bold text-amber-300">{item.kw}</td>
                        <td className="py-2.5 px-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              item.status === 'DITETAPKAN'
                                ? 'bg-emerald-950/80 border border-emerald-800 text-emerald-300'
                                : 'bg-purple-950/80 border border-purple-800 text-purple-300'
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-4 text-slate-300 font-sans">{item.arti}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: UJI SPESIFIKASI */}
        {activeTab === 'uji-spesifikasi' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-2">Rangkaian Pengujian Spesifikasi Konstitusi</h2>
              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                Pengujian spesifikasi pada Phase 2 memastikan kejelasan batas sintaksis antara program yang sah menurut konstitusi versus program yang melanggar aturan leksikal.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Kolom Program Valid */}
                <div className="p-5 rounded-xl bg-slate-950 border border-emerald-900/60">
                  <div className="flex items-center justify-between mb-3 border-b border-emerald-900/50 pb-2">
                    <span className="text-xs font-semibold text-emerald-400 font-mono flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> program-valid.nusantara (Sah)
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                      100% LULUS KONSTITUSI
                    </span>
                  </div>
                  <pre className="font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed bg-slate-900/70 p-3 rounded-lg border border-slate-800">
{`program UjiKonstitusi

mulai
    namaPengembang : teks = "Komunitas Nusantara"
    versiFase : bilangan = 2
    skorKelayakan : desimal = 98.5
    fondasiSah : logika = benar

    tetap BATAS_MINIMAL : bilangan = 70

    tampilkan("Nama: " + namaPengembang)

    jika skorKelayakan >= BATAS_MINIMAL maka
        tampilkan("Status: Disahkan")
    selain
        tampilkan("Status: Perlu Peninjauan")
    akhir

    untuk hitungan dari 1 sampai 3 lakukan
        tampilkan(hitungan)
    akhir
selesai`}
                  </pre>
                </div>

                {/* Kolom Kasus Tidak Valid */}
                <div className="p-5 rounded-xl bg-slate-950 border border-rose-900/60">
                  <div className="flex items-center justify-between mb-3 border-b border-rose-900/50 pb-2">
                    <span className="text-xs font-semibold text-rose-400 font-mono flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" /> Kasus Uji Negatif (Katalog Tak Valid)
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                      WAJIB DITOLAK
                    </span>
                  </div>
                  <div className="space-y-2.5 text-xs text-slate-300">
                    <div className="p-2.5 rounded bg-slate-900/70 border border-slate-800">
                      <div className="font-mono font-semibold text-rose-300">1. Program Tanpa 'mulai'</div>
                      <div className="text-[11px] text-slate-400">Instruksi di luar blok pembuka dilarang konstitusi.</div>
                    </div>
                    <div className="p-2.5 rounded bg-slate-900/70 border border-slate-800">
                      <div className="font-mono font-semibold text-rose-300">2. Program Tanpa 'selesai'</div>
                      <div className="text-[11px] text-slate-400">Blok yang dibuka wajib ditutup secara eksplisit.</div>
                    </div>
                    <div className="p-2.5 rounded bg-slate-900/70 border border-slate-800">
                      <div className="font-mono font-semibold text-rose-300">3. Nama Program Diawali Angka (123Program)</div>
                      <div className="text-[11px] text-slate-400">Pengidentifikasi wajib diawali huruf atau garis bawah.</div>
                    </div>
                    <div className="p-2.5 rounded bg-slate-900/70 border border-slate-800">
                      <div className="font-mono font-semibold text-rose-300">4. Variabel Menggunakan Kata Kunci (jika : bilangan = 10)</div>
                      <div className="text-[11px] text-slate-400">Dilarang menggunakan kata kunci resmi sebagai nama variabel.</div>
                    </div>
                    <div className="p-2.5 rounded bg-slate-900/70 border border-slate-800">
                      <div className="font-mono font-semibold text-rose-300">5. Deklarasi Tipe Tak Lengkap (skor : = 100)</div>
                      <div className="text-[11px] text-slate-400">Wajib menyertakan tipe data di antara tanda : dan =.</div>
                    </div>
                    <div className="p-2.5 rounded bg-slate-900/70 border border-slate-800">
                      <div className="font-mono font-semibold text-rose-300">6. Blok Kondisi Tidak Ditutup 'akhir'</div>
                      <div className="text-[11px] text-slate-400">Setiap blok cabang jika wajib ditutup dengan kata 'akhir'.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: LABORATORIUM SINTAKSIS */}
        {activeTab === 'contoh' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-4 space-y-3">
                <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Pilih Berkas Contoh</h3>
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

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
                  <div className="font-semibold text-white mb-2">Penanda Token Kamus:</div>
                  <div className="space-y-1 font-mono text-[11px]">
                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded bg-amber-400"></span> Keyword Ditetapkan</div>
                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded bg-purple-400"></span> Keyword Rancangan</div>
                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded bg-cyan-400"></span> Tipe Data Pokok</div>
                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded bg-rose-400"></span> Operator Logika</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-4">
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden">
                  <div className="px-4 py-2.5 border-b border-slate-800 bg-slate-900 flex items-center justify-between">
                    <span className="text-xs font-mono font-medium text-slate-300 flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-rose-400" />
                      Editor Interaktif .nusantara
                    </span>
                    <button
                      onClick={() => handleCopy(playgroundCode, 'pg')}
                      className="px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 rounded flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedText === 'pg' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
                      <span>{copiedText === 'pg' ? 'Tersalin' : 'Salin'}</span>
                    </button>
                  </div>
                  <textarea
                    value={playgroundCode}
                    onChange={(e) => setPlaygroundCode(e.target.value)}
                    rows={8}
                    className="w-full p-4 bg-slate-950/90 font-mono text-sm text-slate-100 focus:outline-none resize-none leading-relaxed border-b border-slate-800"
                  />

                  <div className="p-4 bg-slate-950">
                    <div className="text-xs text-slate-400 uppercase tracking-wider mb-2 font-mono flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      Pratinjau Tokenisasi Leksikal Konstitusi
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

        {/* TAB 6: ARSITEKTUR SALURAN PIPA */}
        {activeTab === 'arsitektur' && (
          <div className="space-y-8">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-2">Saluran Pipa Kompilasi (.nusantara → Native Binary)</h2>
              <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
                Kompilator resmi bahasa NUSANTARA dirancang dengan 7 tahapan proses logis yang terpisah secara modular, menjamin ketelitian inferensi tipe dan optimasi biner tingkat tinggi tanpa klaim palsu.
              </p>

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
          </div>
        )}

        {/* TAB 7: PETA JALAN */}
        {activeTab === 'roadmap' && (
          <div className="space-y-6">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredRoadmap.map((item) => {
                const isCompleted = item.fase <= 2;
                const isNext = item.fase === 3;
                return (
                  <div
                    key={item.fase}
                    className={`p-4 rounded-xl border transition-all ${
                      item.fase === 2
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
                          item.fase === 2
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

        {/* TAB 8: SINKRONISASI GIT */}
        {activeTab === 'git' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-2">Sinkronisasi Komit Phase 2 ke GitHub</h2>
              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                Seluruh spesifikasi Konstitusi Bahasa telah siap. Jalankan perintah komit berikut pada repository yang telah terhubung:
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-200">1. Periksa Status Berkas Baru</span>
                    <button
                      onClick={() => handleCopy('git status', 'git-status')}
                      className="px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 rounded flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedText === 'git-status' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
                      <span>{copiedText === 'git-status' ? 'Tersalin' : 'Salin'}</span>
                    </button>
                  </div>
                  <pre className="font-mono text-xs text-rose-300 bg-slate-900/80 p-3 rounded-lg">git status</pre>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-200">2. Tambahkan Semua Dokumen Konstitusi & Spesifikasi</span>
                    <button
                      onClick={() => handleCopy('git add .', 'git-add')}
                      className="px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 rounded flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedText === 'git-add' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
                      <span>{copiedText === 'git-add' ? 'Tersalin' : 'Salin'}</span>
                    </button>
                  </div>
                  <pre className="font-mono text-xs text-rose-300 bg-slate-900/80 p-3 rounded-lg">git add .</pre>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-200">3. Buat Komit Resmi Phase 2</span>
                    <button
                      onClick={() => handleCopy('git commit -m "feat: tetapkan konstitusi bahasa NUSANTARA"', 'git-commit')}
                      className="px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 rounded flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedText === 'git-commit' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
                      <span>{copiedText === 'git-commit' ? 'Tersalin' : 'Salin'}</span>
                    </button>
                  </div>
                  <pre className="font-mono text-xs text-rose-300 bg-slate-900/80 p-3 rounded-lg">git commit -m "feat: tetapkan konstitusi bahasa NUSANTARA"</pre>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-200">4. Dorong ke GitHub (Cabang Aktif)</span>
                    <button
                      onClick={() => handleCopy('git push origin main', 'git-push')}
                      className="px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 rounded flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedText === 'git-push' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
                      <span>{copiedText === 'git-push' ? 'Tersalin' : 'Salin'}</span>
                    </button>
                  </div>
                  <pre className="font-mono text-xs text-rose-300 bg-slate-900/80 p-3 rounded-lg">git push origin main</pre>
                </div>
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
            <span>Milestone v0.2.0 (Phase 2)</span>
            <span>·</span>
            <span>Hak Cipta © 2026 Komunitas Pengembang NUSANTARA</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <button onClick={() => setActiveTab('konstitusi')} className="hover:text-white transition-colors cursor-pointer">
              Konstitusi Bahasa
            </button>
            <span>·</span>
            <button onClick={() => setActiveTab('keyword')} className="hover:text-white transition-colors cursor-pointer">
              Kata Kunci
            </button>
            <span>·</span>
            <button onClick={() => setActiveTab('uji-spesifikasi')} className="hover:text-white transition-colors cursor-pointer">
              Uji Spesifikasi
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
