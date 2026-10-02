# Panduan Kontribusi Bahasa Pemrograman NUSANTARA

Terima kasih atas minat Anda untuk berkontribusi dalam membangun dan mengembangkan **NUSANTARA**, bahasa pemrograman 100% Bahasa Indonesia untuk masa depan komputasi terbuka.

Kami percaya bahwa kemandirian teknologi hanya dapat dicapai melalui keterbukaan, kolaborasi yang sehat, dan ketelitian rekayasa piranti lunak.

---

## 1. Alur Kontribusi Komunitas

Seluruh kontribusi pengembangan bahasa NUSANTARA dijalankan secara terbuka melalui GitHub dengan alur berikut:

```
Masalah / Ide Baru (Issue)
          │
          ▼
Diskusi Komunitas & Penyelarasan Konsep
          │
          ▼
Proposal Resmi (NIP jika perubahan besar / Issue jika perbaikan kecil)
          │
          ▼
Implementasi Teknis pada Branch Cabang
          │
          ▼
Pengujian Mandiri & Otomatis
          │
          ▼
Tinjauan Kode (Pull Request Review)
          │
          ▼
Penggabungan ke Cabang Utama (Merge)
          │
          ▼
Rilis Resmi Bertahap (Release Tagged)
```

---

## 2. Struktur Cabang (*Branching Model*)

Untuk menjaga stabilitas repositori, tidak seorang pun diizinkan mendorong kode langsung (*direct push*) ke cabang `main`.

| Cabang | Peran & Tujuan |
|---|---|
| `main` | Cabang produksi yang selalu stabil. Hanya menerima penggabungan dari `develop` saat rilis versi baru telah siap dan ditandai tag rilis. |
| `develop` | Cabang integrasi pengembangan aktif. Seluruh fitur yang telah diuji digabungkan ke cabang ini. |
| `fitur/*` | Cabang pembuatan fitur atau spesifikasi baru (contoh: `fitur/tata-bahasa-fungsi`). |
| `perbaikan/*` | Cabang perbaikan galat atau revisi dokumentasi (contoh: `perbaikan/ejaan-kata-kunci`). |
| `eksperimen/*` | Cabang pengujian gagasan baru yang belum tentu dimasukkan ke inti bahasa (contoh: `eksperimen/pola-pencocokan`). |

---

## 3. Nusantara Improvement Proposal (NIP)

Apabila Anda hendak mengusulkan:
- Penambahan atau penghapusan kata kunci bahasa.
- Perubahan tata bahasa (*grammar*) atau semantik bahasa.
- Desain arsitektur baru kompilator, runtime, atau pustaka standar.
- Perubahan mekanisme sistem paket atau modul.

Maka Anda diwajibkan menulis dokumen **NIP (Nusantara Improvement Proposal)**.

1. Buka folder `dokumentasi/nip/`.
2. Salin format dari `NIP-0001.md`.
3. Gunakan nomor urut berikutnya (misal: `NIP-0002.md`).
4. Sertakan motivasi, spesifikasi sintaksis, dampak kompatibilitas balik, dan rencana pengujian.
5. Ajukan *Pull Request* bertanda status `Draf` untuk didiskusikan bersama komunitas.

---

## 4. Standar Pesan Komit Git

Pesan komit harus jelas, ringkas, dan menggunakan Bahasa Indonesia atau format konvensional yang tertib:

Format: `<tipe>: <keterangan singkat>`

Contoh tipe:
- `feat:` atau `fitur:` Penambahan fitur spesifikasi baru (contoh: `feat: fondasi awal bahasa NUSANTARA`)
- `fix:` atau `perbaikan:` Perbaikan galat dokumentasi atau tata bahasa
- `docs:` atau `dok:` Pembaruan dokumentasi, panduan, atau spesifikasi NIP
- `refactor:` Restrukturisasi tata letak berkas tanpa mengubah perilaku
- `test:` atau `uji:` Penambahan skenario pengujian atau uji leksikal
- `chore:` Pemeliharaan berkas non-kode (skrip, konfig `.gitignore`, dsb.)

---

## 5. Menjalankan Uji Pra-Pengajuan (Phase 1)

Sebelum mengajukan *Pull Request* pada Phase 1, pastikan seluruh berkas fondasi lengkap dan tidak ada tautan yang rusak:

```bash
# Jalankan skrip verifikasi fondasi Phase 1
node skrip/periksa_fondasi.js
```

Hasil verifikasi harus menyatakan seluruh komponen fondasi berstatus **LULUS**.

---

## 6. Kode Etik

Dengan berpartisipasi dalam proyek ini, Anda setuju untuk mematuhi ketentuan [KODE-ETIK.md](KODE-ETIK.md). Kami menjunjung tinggi rasa saling menghargai, komunikasi yang membangun, dan profesionalisme.
