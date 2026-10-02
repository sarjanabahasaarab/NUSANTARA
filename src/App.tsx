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
  Scale,
  AlertTriangle,
  Users,
  Binary,
  Compass,
  HelpCircle,
  Play,
  RotateCcw
} from 'lucide-react';
import {
  BERKAS_REPOSITORI,
  DAFTAR_PRESEDENSI_OPERATOR,
  DAFTAR_GLOSARIUM,
  DAFTAR_KATA_KUNCI_PHASE2,
  DAFTAR_FASE_ROADMAP,
  BerkasRepo
} from './data/berkasRepositori';
import { Lexer } from './lexer/lexer';
import { TokenStream } from './lexer/tokenStream';
import { JenisToken } from './lexer/jenisToken';

export default function App() {
  const [activeTab, setActiveTab] = useState<'lexer' | 'panduan' | 'ebnf' | 'glosarium' | 'berkas' | 'keyword' | 'roadmap' | 'git'>('lexer');
  const [selectedFile, setSelectedFile] = useState<BerkasRepo>(BERKAS_REPOSITORI[0]);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [playgroundCode, setPlaygroundCode] = useState<string>(
    `program HaloNusantara\n\nmulai\n    // Deklarasi variabel & konstanta\n    nama : teks = "Indonesia"\n    tahun : bilangan = 2026\n    tetap KODE_NEGARA : teks = "ID"\n\n    // Percabangan kondisional\n    jika tahun >= 2026 dan benar maka\n        tampilkan("Selamat Datang di " + nama)\n    selain\n        tampilkan("Tahun belum aktif")\n    akhir\nselesai`
  );
  const [activeFilterCategory, setActiveFilterCategory] = useState<string>('Semua');

  // Tokenisasi kode secara langsung menggunakan Lexer nyata Phase 6!
  const { tokens, errors, tokenStreamStats } = useMemo(() => {
    const l = new Lexer(playgroundCode, { sertakanBarisBaru: false });
    const { token, galat } = l.tokenisasi();
    const stream = new TokenStream(token);
    return {
      tokens: token,
      errors: galat,
      tokenStreamStats: {
        total: stream.length,
        eof: stream.eof(),
      },
    };
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
              onClick={() => setActiveTab('lexer')}
              className={`hover:text-white transition-colors cursor-pointer ${
                activeTab === 'lexer' ? 'text-white font-semibold' : 'text-slate-400'
              }`}
            >
              Lexer (Phase 6)
            </button>
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
              onClick={() => handleCopy('git commit -m "feat: implement nusantara lexer"', 'commit-p6')}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-200 bg-slate-900 border border-slate-700/80 rounded-lg hover:bg-slate-800 hover:text-white transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              {copiedText === 'commit-p6' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Terminal className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copiedText === 'commit-p6' ? 'Tersalin' : 'Salin Komit Phase 6'}</span>
            </button>
            <button
              onClick={() => setActiveTab('lexer')}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-rose-600 rounded-lg hover:bg-rose-500 transition-colors whitespace-nowrap cursor-pointer"
            >
              Milestone v0.6.0
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO STATEMENT & UNBOXED METADATA */}
      <section className="border-b border-slate-800/60 bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-4 tracking-wide font-mono">
            <span className="text-emerald-400 font-medium">v0.6.0</span>
            <span aria-hidden="true">·</span>
            <span>Phase 6: Implementasi Lexer (Penganalisis Leksikal)</span>
            <span aria-hidden="true">·</span>
            <span className="text-cyan-400 font-medium">TokenStream Siap untuk Parser</span>
            <span aria-hidden="true">·</span>
            <span className="text-purple-400 font-medium">21 Kelompok Uji Lulus 100%</span>
            <span aria-hidden="true">·</span>
            <span>100% Bahasa Indonesia</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-4xl leading-tight">
            Mesin Lexer Nyata: Membaca Kode Sumber Menjadi Rangkaian Token.
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Komponen pertama pipa kompilasi NUSANTARA telah diimplementasikan: memindai teks UTF-8, mengenali 32 kata kunci, literal bilangan & teks ber-escape sequence, operator longest-match, serta melacak posisi baris dan kolom secara presisi.
          </p>

          <div className="mt-6 p-4 rounded-xl bg-slate-900/90 border border-slate-800 max-w-3xl flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <span className="font-semibold text-emerald-300">Disiplin Arsitektur Phase 6:</span> Hanya modul Lexer dan TokenStream yang aktif. Komponen Parser dan Compiler sengaja belum dibangun dan dijadwalkan pada Phase 7 (Parser).
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-4 mb-8 overflow-x-auto text-sm">
          <button
            onClick={() => setActiveTab('lexer')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'lexer' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>Penganalisis Leksikal (Lexer)</span>
          </button>
          <button
            onClick={() => setActiveTab('panduan')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'panduan' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4 text-rose-400" />
            <span>Buku Panduan (docs)</span>
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
            <span>Penjelajah Berkas (105)</span>
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

        {/* TAB 1: LEXER INTERAKTIF NYATA (PHASE 6) */}
        {activeTab === 'lexer' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Editor Sumber */}
              <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col h-[650px]">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Kode Sumber .nusantara
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setPlaygroundCode(
                          `program Kasir\n\nmulai\n    harga : bilangan = 50000\n    jumlah : bilangan = 3\n    total : bilangan = harga * jumlah\n    tampilkan(total)\nselesai`
                        )
                      }
                      className="px-2.5 py-1 text-[11px] font-medium bg-slate-800 text-slate-300 hover:text-white rounded transition-colors cursor-pointer"
                    >
                      Contoh Kasir
                    </button>
                    <button
                      onClick={() =>
                        setPlaygroundCode(
                          `// Uji Galat Diagnostik\nprogram Uji\nmulai\n    variabel @ = 10\n    teks = "string tak ditutup\n    angka = 12.3.4\nselesai`
                        )
                      }
                      className="px-2.5 py-1 text-[11px] font-medium bg-rose-950/60 text-rose-300 hover:text-white border border-rose-800/60 rounded transition-colors cursor-pointer"
                    >
                      Uji Galat
                    </button>
                  </div>
                </div>

                <textarea
                  value={playgroundCode}
                  onChange={(e) => setPlaygroundCode(e.target.value)}
                  className="w-full flex-1 p-4 bg-slate-950/90 font-mono text-xs sm:text-sm text-slate-100 focus:outline-none resize-none leading-relaxed border border-slate-800 rounded-lg"
                  placeholder="Tulis kode sumber .nusantara di sini..."
                  spellCheck={false}
                />

                <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Karakter: {playgroundCode.length}</span>
                  <span>Baris: {playgroundCode.split('\n').length}</span>
                  <span className="text-emerald-400">Status Lexer: Aktif</span>
                </div>
              </div>

              {/* Keluaran TokenStream Nyata */}
              <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col h-[650px]">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Aliran Token Hasil Lexer (TokenStream)
                    </span>
                  </div>
                  <span className="font-mono text-xs text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {tokens.length} Token Dihasilkan
                  </span>
                </div>

                {errors.length > 0 && (
                  <div className="mb-3 p-3 rounded-lg bg-rose-950/60 border border-rose-800/80 text-rose-200 text-xs font-mono space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-rose-300">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Ditemukan {errors.length} Galat Leksikal:
                    </div>
                    {errors.map((err, idx) => (
                      <div key={idx} className="text-[11px] pl-5">
                        • {err.message}
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex-1 overflow-auto bg-slate-950/90 border border-slate-800 rounded-lg p-3 space-y-1 font-mono text-xs">
                  {tokens.map((tok, idx) => {
                    const isKw = tok.jenis.startsWith('KW_');
                    const isLit = tok.jenis.startsWith('LITERAL_');
                    const isOp = tok.jenis.startsWith('OP_');
                    const isEof = tok.jenis === JenisToken.EOF;
                    const isIlegal = tok.jenis === JenisToken.ILEGAL;

                    let badgeColor = 'bg-slate-800 text-slate-300';
                    if (isKw) badgeColor = 'bg-amber-950/80 text-amber-300 border border-amber-800/60';
                    else if (isLit) badgeColor = 'bg-lime-950/80 text-lime-300 border border-lime-800/60';
                    else if (isOp) badgeColor = 'bg-rose-950/80 text-rose-300 border border-rose-800/60';
                    else if (isEof) badgeColor = 'bg-purple-950/80 text-purple-300 border border-purple-800/60';
                    else if (isIlegal) badgeColor = 'bg-red-950 text-red-300 border border-red-800';

                    return (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-1.5 rounded hover:bg-slate-900 transition-colors border-b border-slate-900"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-[10px] text-slate-500 w-6 text-right select-none">{idx + 1}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${badgeColor}`}>
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
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PANDUAN */}
        {activeTab === 'panduan' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-2">Buku Panduan Pemula NUSANTARA</h2>
              <p className="text-sm text-slate-300">Tersedia 28 berkas panduan pemula, referensi leksikal, dan panduan kontribusi di folder `docs/`.</p>
            </div>
          </div>
        )}

        {/* TAB 3: TATA BAHASA EBNF */}
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

        {/* TAB 4: GLOSARIUM */}
        {activeTab === 'glosarium' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Glosarium Istilah Komputasi Bahasa Indonesia</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-950/90 text-slate-400 font-mono text-xs uppercase border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-4">Istilah Asing</th>
                      <th className="py-2.5 px-4">Padanan Bahasa Indonesia</th>
                      <th className="py-2.5 px-4">Penjelasan</th>
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

        {/* TAB 5: PENJELAJAH BERKAS */}
        {activeTab === 'berkas' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex flex-col h-[700px]">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Berkas Repositori (Phase 1-6)</span>
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

        {/* TAB 6: KATA KUNCI */}
        {activeTab === 'keyword' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">32 Kata Kunci Resmi Bahasa NUSANTARA</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <tbody className="divide-y divide-slate-800/80 font-mono text-xs">
                    {DAFTAR_KATA_KUNCI_PHASE2.map((item) => (
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

        {/* TAB 7: PETA JALAN */}
        {activeTab === 'roadmap' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredRoadmap.map((item) => {
                const isCompleted = item.fase <= 6;
                const isCurrent = item.fase === 6;
                const isNext = item.fase === 7;
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

        {/* TAB 8: SINKRONISASI GIT */}
        {activeTab === 'git' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-2">Sinkronisasi Komit Phase 6 ke GitHub</h2>
              <p className="text-sm text-slate-300 mb-6">Jalankan perintah berikut untuk menyinkronkan seluruh modul Lexer ke repositori GitHub:</p>
              <div className="space-y-3 font-mono text-xs">
                <pre className="text-rose-300 bg-slate-950 p-3 rounded-lg border border-slate-800">git add .</pre>
                <pre className="text-rose-300 bg-slate-950 p-3 rounded-lg border border-slate-800">git commit -m "feat: implement nusantara lexer"</pre>
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
            <span>Milestone v0.6.0 (Phase 6: Lexer)</span>
            <span>·</span>
            <span>Apache License 2.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
