# Catatan Perubahan (CHANGELOG) NUSANTARA

Seluruh perubahan penting pada proyek bahasa pemrograman NUSANTARA dicatat dalam dokumen ini.

Format penomoran versi mengacu pada **Semantic Versioning** (`vMAJOR.MINOR.PATCH`). Pada masa pengembangan awal, versi minor mencerminkan tahapan fase roadmap (misal `v0.1.0` untuk Phase 1, `v0.2.0` untuk Phase 2), sedangkan patch (`v0.2.1`, `v0.2.2`) digunakan untuk penyempurnaan dokumen atau perbaikan kecil.

---

## [v0.2.0] — 2026-10-02
### Phase 2: Konstitusi Bahasa NUSANTARA

Fase ini menetapkan hukum konstitusional resmi bahasa NUSANTARA, pedoman leksikal, tata kelola perubahan sintaksis, taksonomi tipe data dasar, operator, dan pengujian spesifikasi dokumen.

#### Ditambahkan:
- **Konstitusi Bahasa (`dokumentasi/KONSTITUSI-BAHASA.md`):** Piagam 10 prinsip konstitusional resmi bahasa NUSANTARA dan penegasan struktur program resmi awal.
- **Tabel Kata Kunci Resmi (`dokumentasi/KEYWORD.md`):** Dokumentasi 32 kata kunci bahasa dengan arti, fungsi komputasi, contoh sintaks, dan status pengesahan (21 ditetapkan, 11 rancangan).
- **Spesifikasi Tipe Data (`dokumentasi/TIPE-DATA.md`):** Taksonomi 10 tipe data awal (`teks`, `bilangan`, `desimal`, `logika`, `karakter`, `daftar`, `peta`, `tanggal`, `waktu`, `kosong`), aturan penandaan `:`, dan pembedaan mutabilitas `variabel` vs `tetap`.
- **Klasifikasi Operator (`dokumentasi/OPERATOR.md`):** Spesifikasi operator aritmetika (`+`, `-`, `*`, `/`, `%`), relasional (`==`, `!=`, `>`, `<`, `>=`, `<=`), logika berbahasa Indonesia (`dan`, `atau`, `tidak`), penugasan (`=`), serta tabel rancangan presedensi 9 tingkat.
- **Aturan Penamaan & Komentar (`dokumentasi/ATURAN-PENAMAAN.md`):** Pedoman karakter pengidentifikasi, larangan penggunaan kata kunci, sensitivitas huruf, serta spesifikasi komentar satu baris (`//`) dan multibaris (`/* ... */`).
- **Standar Pesan Kesalahan (`dokumentasi/PESAN-KESALAHAN.md`):** Standar format diagnostik berbahasa Indonesia untuk galat sintaksis, galat tipe, dan galat nama.
- **Kebijakan Kompatibilitas Versi (`dokumentasi/KOMPATIBILITAS.md`):** Komitmen stabilitas kode sah, kewajiban NIP untuk perubahan merusak, dan kebijakan depresiasi.
- **Proposal NIP-0002 (`dokumentasi/nip/NIP-0002.md`):** Dokumen formal pengesahan Konstitusi Bahasa NUSANTARA.
- **Rangkaian Uji Spesifikasi:**
  - `pengujian/spesifikasi/README.md`
  - `pengujian/spesifikasi/program-valid.nusantara` (contoh program yang 100% patuh konstitusi).
  - `pengujian/spesifikasi/program-tidak-valid.md` (katalog kasus uji negatif: tanpa mulai, tanpa selesai, nama salah, variabel kata kunci, deklarasi tidak lengkap, blok kondisi tidak ditutup).

#### Catatan Status:
- Belum ada implementasi biner kompilator pada fase ini. Semua verifikasi dilakukan melalui audit kepatuhan spesifikasi dan konsistensi dokumen.

---

## [v0.1.0] — 2026-10-02
### Phase 1: Identitas & Fondasi NUSANTARA

Ini adalah rilis fondasi perdana proyek NUSANTARA. Rilis ini meletakkan seluruh identitas, tata kelola, arsitektur, dan prinsip dasar bahasa sebelum masuk ke perancangan kompilator.

#### Ditambahkan:
- **Identitas Bahasa:** Penetapan nama resmi **NUSANTARA**, logo/simbol konsep, dan ekstensi berkas resmi `.nusantara`.
- **Struktur Repositori:** Pemetaan struktur direktori modular (`kompilator/`, `runtime/`, `standar/`, `pustaka/`, `kerangka/`, `alat/`, `ide/`, `dokumentasi/`, `contoh/`, `pengujian/`, `skrip/`).
- **Nusantara Improvement Proposal (NIP):** Penyusunan sistem proposal perubahan bahasa dengan dokumen perdana **NIP-0001** (*Identitas dan Prinsip Dasar Bahasa NUSANTARA*).
- **Rancangan Sintaksis Awal:** Contoh resmi 5 kode sumber acuan (`01_halo`, `02_data`, `03_kondisi`, `04_perulangan`, `05_fungsi`).
- **Tata Kelola Komunitas:** Penerbitan pedoman kontribusi (`KONTRIBUSI.md`), standar etika (`KODE-ETIK.md`), dan lisensi terbuka MIT (`LISENSI`).
- **Peta Jalan Strategis:** Perumusan dokumen `ROADMAP.md` yang merinci 36 fase pengembangan dari fondasi hingga *NusantaraOS*.
- **Rancangan Arsitektur Kompilator:** Saluran pipa kompilasi 7 tahap dari `.nusantara` ke biner native.
