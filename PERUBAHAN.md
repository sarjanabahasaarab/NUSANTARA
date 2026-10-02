# Catatan Perubahan (CHANGELOG) NUSANTARA

Seluruh perubahan penting pada proyek bahasa pemrograman NUSANTARA dicatat dalam dokumen ini.

Format penomoran versi mengacu pada **Semantic Versioning** (`vMAJOR.MINOR.PATCH`). Pada masa pengembangan awal, versi minor mencerminkan tahapan fase roadmap (misal `v0.1.0` untuk Phase 1, `v0.2.0` untuk Phase 2, `v0.3.0` untuk Phase 3), sedangkan patch (`v0.3.1`, `v0.3.2`) digunakan untuk penyempurnaan dokumen atau perbaikan kecil.

---

## [v0.3.0] — 2026-10-02
### Phase 3: Lisensi & Tata Kelola NUSANTARA

Fase ini menetapkan tata kelola terbuka formal, adopsi resmi Apache License 2.0, piagam peran komunitas, alur NIP, templat GitHub terstandar, dan kebijakan keamanan piranti lunak.

#### Ditambahkan:
- **Lisensi Apache 2.0 Lengkap (`LISENSI`):** Penggantian teks lisensi dengan teks resmi lengkap Apache License 2.0 disertai placeholder hak cipta `Copyright [TAHUN] [NAMA PEMEGANG HAK CIPTA]`.
- **Panduan Lisensi (`dokumentasi/LISENSI.md`):** Penjelasan hak pengguna, pengembang, ketentuan distribusi, klausul paten, dan penafian jaminan.
- **Kebijakan Lisensi Komponen (`dokumentasi/KEBIJAKAN-LISENSI.md`):** Kebijakan kepatuhan lisensi kode utama, dependensi eksternal, dan lisensi aset multimedia (font, gambar, audio).
- **Tata Kelola Proyek (`TATA-KELOLA.md`):** Penetapan 5 struktur peran (Pengguna, Kontributor, Reviewer, Maintainer, Pengelola Rilis) dan penegasan bahwa hak akses ditentukan melalui pengaturan GitHub.
- **Kebijakan Keamanan (`KEAMANAN.md`):** Standar pelaporan kerentanan secara bertanggung jawab (Responsible Disclosure) dan larangan keras pencantuman kredensial/rahasia di repositori.
- **Sistem NIP Formal:**
  - `dokumentasi/NIP/PROSES-NIP.md`: Alur 7 tahapan NIP (Draf -> Diskusi -> Peninjauan -> Diterima/Ditolak/Ditunda -> Implementasi -> Dokumentasi -> Rilis).
  - `dokumentasi/NIP/TEMPLATE-NIP.md`: Format baku pengajuan proposal peningkatan bahasa.
- **GitHub Issue & Pull Request Templates:**
  - `.github/ISSUE_TEMPLATE/bug.md` (Laporan Kutu)
  - `.github/ISSUE_TEMPLATE/fitur.md` (Usulan Fitur Baru)
  - `.github/ISSUE_TEMPLATE/dokumentasi.md` (Perbaikan Dokumentasi)
  - `.github/ISSUE_TEMPLATE/pertanyaan.md` (Pertanyaan & Diskusi)
  - `.github/PULL_REQUEST_TEMPLATE.md` (Formulir pengajuan Pull Request terstandar)
- **Kebijakan Versi & Rilis:**
  - `dokumentasi/KEBIJAKAN-RILIS.md`: Panduan SemVer dan aturan larangan pembuatan tag otomatis.
  - `dokumentasi/TEMPLATE-RELEASE.md`: Format templat rilis resmi GitHub Release.
- **Panduan Pengaturan GitHub (`dokumentasi/PENGATURAN-GITHUB.md`):** Langkah manual konfigurasi branch protection, hak akses tim, dan pelaporan kerentanan privat.

#### Diperbarui:
- `KONTRIBUSI.md`: Penambahan 10 langkah alur kontribusi terstandar dan pola nama cabang (`fitur/*`, `perbaikan/*`, `dokumentasi/*`, `eksperimen/*`).
- `KODE-ETIK.md`: Penegasan etika komunitas, pelaporan pelanggaran secara privat tanpa kontak palsu.
- `README.md` & `ROADMAP.md`: Pembaruan status pencapaian Phase 3.

---

## [v0.2.0] — 2026-10-02
### Phase 2: Konstitusi Bahasa NUSANTARA

Fase ini menetapkan hukum konstitusional resmi bahasa NUSANTARA, pedoman leksikal, tata kelola perubahan sintaksis, taksonomi tipe data dasar, operator, dan pengujian spesifikasi dokumen.

#### Ditambahkan:
- Konstitusi Bahasa (`dokumentasi/KONSTITUSI-BAHASA.md`)
- Tabel 32 Kata Kunci Resmi (`dokumentasi/KEYWORD.md`)
- Spesifikasi Tipe Data (`dokumentasi/TIPE-DATA.md`)
- Klasifikasi & Prioritas Operator (`dokumentasi/OPERATOR.md`)
- Aturan Penamaan & Komentar (`dokumentasi/ATURAN-PENAMAAN.md`)
- Standar Pesan Kesalahan (`dokumentasi/PESAN-KESALAHAN.md`)
- Kebijakan Kompatibilitas Versi (`dokumentasi/KOMPATIBILITAS.md`)
- Proposal NIP-0002 (`dokumentasi/nip/NIP-0002.md`)
- Rangkaian Uji Spesifikasi (`program-valid.nusantara` & `program-tidak-valid.md`)

---

## [v0.1.0] — 2026-10-02
### Phase 1: Identitas & Fondasi NUSANTARA

Rilis fondasi perdana proyek NUSANTARA yang meletakkan identitas bahasa, ekstensi `.nusantara`, proposal NIP-0001, arsitektur kompilator, dan 5 contoh sintaksis acuan.
