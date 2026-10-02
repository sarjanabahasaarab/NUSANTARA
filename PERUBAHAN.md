# Catatan Perubahan (CHANGELOG) NUSANTARA

Seluruh perubahan penting pada proyek bahasa pemrograman NUSANTARA dicatat dalam dokumen ini.

Format penomoran versi mengacu pada **Semantic Versioning** (`vMAJOR.MINOR.PATCH`). Pada masa pengembangan awal, versi minor mencerminkan tahapan fase roadmap (misal `v0.1.0` untuk Phase 1, `v0.2.0` untuk Phase 2, `v0.3.0` untuk Phase 3, `v0.4.0` untuk Phase 4, `v0.5.0` untuk Phase 5), sedangkan patch (`v0.5.1`) digunakan untuk penyempurnaan dokumen atau perbaikan kecil.

---

## [v0.5.0] — 2026-10-02
### Phase 5: Dokumentasi Awal NUSANTARA

Fase ini menghadirkan pusat dokumentasi awal dan buku panduan terstruktur 100% Bahasa Indonesia untuk pemula, pengembang, dan kontributor tanpa membuat klaim ketersediaan kompiler biner prematur.

#### Ditambahkan:
- **Pusat Dokumentasi Terstruktur (`docs/`):**
  - **Pintu Masuk & Indeks:** `docs/README.md` dan `docs/indeks.md`.
  - **Pengenalan Bahasa:**
    - `docs/pengenalan/apa-itu-nusantara.md`: Identitas dan kedaulatan komputasi.
    - `docs/pengenalan/tujuan-dan-filosofi.md`: 4 pilar filosofis dan visi NusantaraOS.
    - `docs/pengenalan/status-pengembangan.md`: Status kesiapan dan batasan rancangan vs implementasi.
    - `docs/pengenalan/tanya-jawab.md`: FAQ seputar compiler, ekstensi `.nusantara`, dan roadmap.
  - **Panduan Pemula (Tutorial Bertahap):**
    - `docs/panduan/persiapan.md`: Menyiapkan editor teks dan ekstensi `.nusantara`.
    - `docs/panduan/program-pertama.md`: Program "Halo Dunia!" pertama.
    - `docs/panduan/struktur-program.md`: Aturan `program`, `mulai`, dan `selesai`.
    - `docs/panduan/komentar.md`: Cara penulisan catatan kode `//`.
    - `docs/panduan/variabel-dan-tipe-data.md`: Wadah data dinamis vs konstanta `tetap`.
    - `docs/panduan/operator.md`: Operasi kalkulasi dan logika Bahasa Indonesia (`dan`, `atau`, `tidak`).
    - `docs/panduan/percabangan.md`: Pengambilan keputusan `jika` ... `maka` ... `selain` ... `akhir`.
    - `docs/panduan/perulangan.md`: Iterasi rentang inklusif `untuk` dan kondisi `selama`.
    - `docs/panduan/fungsi.md`: Subrutin modular dan instruksi `kembalikan`.
  - **Referensi Bahasa:**
    - `docs/referensi/sintaks.md`: Lembar sontekan (*cheat sheet*) sintaksis resmi.
    - `docs/referensi/keyword.md`: Tabel 32 kata kunci (21 ditetapkan, 11 rancangan).
    - `docs/referensi/tipe-data.md`: Spesifikasi tipe data primitif dan terstruktur.
    - `docs/referensi/operator.md`: Tabel 8 tingkat presedensi operator resmi.
    - `docs/referensi/tata-bahasa-ebnf.md`: Ringkasan tata bahasa bebas konteks ISO/IEC 14977.
    - `docs/referensi/contoh-kode.md`: Katalog contoh kode dengan label status keabsahan.
  - **Panduan Pengembang:**
    - `docs/pengembang/struktur-proyek.md`: Penjelasan fungsi direktori dan berkas repositori.
    - `docs/pengembang/alur-pengembangan.md`: Pembacaan roadmap dan tahapan rekayasa.
    - `docs/pengembang/standar-dokumentasi.md`: Format Markdown dan pedoman gaya bahasa.
    - `docs/pengembang/pengujian-dokumentasi.md`: Prosedur audit otomatis integritas berkas.
  - **Panduan Kontribusi:**
    - `docs/kontribusi/mulai-berkontribusi.md`: Alur 10 langkah kontribusi terstruktur.
    - `docs/kontribusi/proses-nip.md`: 7 tahapan pengajuan proposal peningkatan bahasa.
    - `docs/kontribusi/pedoman-kode.md`: Pedoman penamaan (*Style Guide*) dan indentasi.
  - **Glosarium:**
    - `docs/glosarium.md`: Kamus 26 istilah komputasi teknis Inggris - Indonesia.

#### Diperbarui:
- `README.md` & `ROADMAP.md`: Pembaruan status pencapaian Phase 5 dan persiapan resmi menuju Phase 6 (Lexer).
- `skrip/periksa_fondasi.js`: Memperluas verifikasi audit otomatis hingga memvalidasi **93 berkas resmi**.

---

## [v0.4.0] — 2026-10-02
### Phase 4: Spesifikasi Sintaks NUSANTARA
- Menetapkan tata bahasa formal EBNF lengkap (ISO/IEC 14977).
- Menetapkan spesifikasi token leksikal dan aturan pengidentifikasi ASCII.
- Mengesahkan tabel presedensi 8 tingkat operator dan arah asosiasi.
- Menyediakan katalog 15 kasus uji negatif.

---

## [v0.3.0] — 2026-10-02
### Phase 3: Lisensi & Tata Kelola NUSANTARA
- Menetapkan Apache License 2.0 lengkap pada `LISENSI`.
- Menetapkan tata kelola meritokrasi 5 peran di `TATA-KELOLA.md`.
- Menetapkan alur NIP 7 tahap di `PROSES-NIP.md` dan `TEMPLATE-NIP.md`.

---

## [v0.2.0] — 2026-10-02
### Phase 2: Konstitusi Bahasa NUSANTARA
- Menetapkan Piagam 10 Prinsip Konstitusi Bahasa.
- Menetapkan tabel 32 kata kunci resmi.
- Menerbitkan proposal NIP-0002.

---

## [v0.1.0] — 2026-10-02
### Phase 1: Identitas & Fondasi NUSANTARA
- Rilis fondasi awal, penetapan nama NUSANTARA, ekstensi `.nusantara`, dan NIP-0001.
