# Catatan Perubahan (CHANGELOG) NUSANTARA

Seluruh perubahan penting pada proyek bahasa pemrograman NUSANTARA dicatat dalam dokumen ini.

Format penomoran versi mengacu pada **Semantic Versioning** (`vMAJOR.MINOR.PATCH`). Pada masa pengembangan awal, versi minor mencerminkan tahapan fase roadmap (misal `v0.1.0` untuk Phase 1, `v0.2.0` untuk Phase 2, `v0.3.0` untuk Phase 3, `v0.4.0` untuk Phase 4), sedangkan patch (`v0.4.1`, `v0.4.2`) digunakan untuk penyempurnaan dokumen atau perbaikan kecil.

---

## [v0.4.0] — 2026-10-02
### Phase 4: Spesifikasi Sintaks NUSANTARA

Fase ini menetapkan tata bahasa formal berbasis notasi EBNF standar ISO/IEC 14977, spesifikasi token leksikal lengkap, aturan pengidentifikasi, bentuk literal primitif, tata bahasa pohon ekspresi bebas ambiguitas, pengesahan tabel presedensi operator 8 tingkat, serta aturan blok kendali aliran.

#### Ditambahkan:
- **Spesifikasi Sintaks Induk (`dokumentasi/SPESIFIKASI-SINTAKS.md`):** Ikhtisar tata bahasa resmi dan harmonisasi audit spesifikasi fase sebelumnya.
- **Tata Bahasa Formal EBNF (`dokumentasi/GRAMMAR-EBNF.md`):** Aturan produksi formal lengkap untuk program, blok, pernyataan, deklarasi, penugasan, ekspresi, perulangan, percabangan, fungsi, parameter, literal, dan komentar.
- **Spesifikasi Token (`dokumentasi/TOKEN.md`):** Taksonomi 10 kategori token, aturan kepekaan huruf, urutan karakter lolos (`\"`, `\\`, `\n`, `\t`), dan penanganan akhir berkas.
- **Kaidah Pengidentifikasi (`dokumentasi/IDENTIFIER.md`):** Aturan leksikal pembentukan nama pengidentifikasi ASCII dan batasan kata kunci cadangan.
- **Spesifikasi Bentuk Literal (`dokumentasi/LITERAL.md`):** Bentuk literal `teks`, `bilangan`, `desimal`, `logika`, `kosong`, serta penegasan tanda negatif sebagai operator unari.
- **Spesifikasi Evaluasi Ekspresi (`dokumentasi/EKSPRESI.md`):** Tata bahasa bertingkat bebas ambiguitas dan semantik evaluasi hubung singkat (*short-circuit*).
- **Tabel Presedensi Operator Resmi (`dokumentasi/PRIORITAS-OPERATOR.md`):** Pengesahan 8 tingkat presedensi operator biner dan unari serta arah asosiatifnya.
- **Aturan Blok & Struktur Kontrol (`dokumentasi/ATURAN-BLOK.md`):** Pembatasan leksikal blok, sifat inklusif batas akhir `sampai`, kendali `hentikan` dan `lanjutkan`, serta sintaksis fungsi.
- **Katalog Keputusan Terbuka (`dokumentasi/KEPUTUSAN-TERBUKA.md`):** Pencatatan topik yang belum difinalisasi (aksara Nusantara/Unicode, sintaksis koleksi `daftar`/`peta`, `selain_jika`, null-safety ketat).
- **Katalog Contoh Sintaksis Resmi (`dokumentasi/CONTOH-SINTAKS.md`):** 10 contoh program acuan dengan label status kepatuhan spesifikasi.
- **Rangkaian Pengujian Spesifikasi Sintaksis:**
  - `pengujian/spesifikasi/kasus-valid.md`: Koleksi program valid menurut EBNF.
  - `pengujian/spesifikasi/kasus-tidak-valid.md`: 15 kasus negatif lengkap dengan alasan, aturan yang dilanggar, dan ekspektasi pesan kesalahan.
  - `pengujian/spesifikasi/grammar-checklist.md`: Daftar periksa keutuhan produksi tata bahasa formal EBNF.

#### Diperbarui:
- `dokumentasi/OPERATOR.md`: Mengesahkan tabel presedensi operator 8 tingkat resmi.
- `README.md` & `ROADMAP.md`: Pembaruan status pencapaian Phase 4 dan persiapan menuju Phase 5 (Dokumentasi Awal & Buku Panduan).

---

## [v0.3.0] — 2026-10-02
### Phase 3: Lisensi & Tata Kelola NUSANTARA
- Menetapkan Apache License 2.0 lengkap pada `LISENSI`.
- Menetapkan tata kelola meritokrasi 5 peran di `TATA-KELOLA.md`.
- Menetapkan kebijakan keamanan di `KEAMANAN.md`.
- Menetapkan alur NIP 7 tahap di `PROSES-NIP.md` dan `TEMPLATE-NIP.md`.
- Menyiapkan templat GitHub Issue dan PR di `.github/`.

---

## [v0.2.0] — 2026-10-02
### Phase 2: Konstitusi Bahasa NUSANTARA
- Menetapkan Piagam 10 Prinsip Konstitusi Bahasa.
- Menetapkan tabel 32 kata kunci resmi.
- Menetapkan taksonomi tipe data dasar dan mutabilitas `variabel` vs `tetap`.
- Menerbitkan proposal NIP-0002.

---

## [v0.1.0] — 2026-10-02
### Phase 1: Identitas & Fondasi NUSANTARA
- Rilis fondasi awal, penetapan nama NUSANTARA, ekstensi `.nusantara`, dan NIP-0001.
