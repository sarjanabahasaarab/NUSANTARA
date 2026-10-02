# Catatan Perubahan (CHANGELOG) NUSANTARA

Seluruh perubahan penting pada proyek bahasa pemrograman NUSANTARA dicatat dalam dokumen ini.

Format penomoran versi mengacu pada **Semantic Versioning** (`vMAJOR.MINOR.PATCH`). Pada masa pengembangan awal, versi minor mencerminkan tahapan fase roadmap (misal `v0.1.0` untuk Phase 1, `v0.2.0` untuk Phase 2), sedangkan patch (`v0.1.1`, `v0.1.2`) digunakan untuk penyempurnaan dokumen atau perbaikan kecil.

---

## [v0.1.0] — 2026-10-02
### Phase 1: Identitas & Fondasi NUSANTARA

Ini adalah rilis fondasi perdana proyek NUSANTARA. Rilis ini meletakkan seluruh identitas, tata kelola, arsitektur, dan prinsip dasar bahasa sebelum masuk ke perancangan kompilator.

#### Ditambahkan:
- **Identitas Bahasa:** Penetapan nama resmi **NUSANTARA**, logo/simbol konsep, dan ekstensi berkas resmi `.nusantara`.
- **Struktur Repositori:** Pemetaan struktur direktori modular (`kompilator/`, `runtime/`, `standar/`, `pustaka/`, `kerangka/`, `alat/`, `ide/`, `dokumentasi/`, `contoh/`, `pengujian/`, `skrip/`).
- **Nusantara Improvement Proposal (NIP):** Penyusunan sistem proposal perubahan bahasa dengan dokumen perdana **NIP-0001** (*Identitas dan Prinsip Dasar Bahasa NUSANTARA*).
- **Rancangan Sintaksis Awal:** Contoh resmi 5 kode sumber acuan:
  - `contoh/01_halo.nusantara` (Halo Dunia)
  - `contoh/02_data.nusantara` (Variabel dan Tipe Data)
  - `contoh/03_kondisi.nusantara` (Percabangan Kondisi)
  - `contoh/04_perulangan.nusantara` (Perulangan Iteratif)
  - `contoh/05_fungsi.nusantara` (Definisi dan Pemanggilan Fungsi)
- **Tata Kelola Komunitas:** Penerbitan pedoman kontribusi (`KONTRIBUSI.md`), standar etika (`KODE-ETIK.md`), dan lisensi terbuka MIT (`LISENSI`).
- **Peta Jalan Strategis:** Perumusan dokumen `ROADMAP.md` yang merinci 36 fase pengembangan dari fondasi hingga *NusantaraOS*.
- **Rancangan Arsitektur Kompilator:** Dokumentasi saluran pipa kompilasi dari kode sumber `.nusantara` menuju biner eksekusi asli (*native binary*).
- **Panduan Operasional GitHub:** Petunjuk lengkap langkah inisialisasi Git, penandaan rilis `v0.1.0`, dan pembuatan GitHub Release.
- **Skrip Verifikasi Fondasi:** Penyediaan skrip `skrip/periksa_fondasi.js` untuk memastikan integritas seluruh berkas fase awal.

#### Catatan Status:
- Belum ada kompilator atau biner eksekusi aktif yang dirilis pada versi ini. Implementasi kompilator dimulai secara bertahap pada fase berikutnya (Fase 6 ke atas).
