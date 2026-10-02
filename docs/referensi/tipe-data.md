# Referensi Spesifikasi Tipe Data Bahasa NUSANTARA

Dokumen ini mendefinisikan taksonomi tipe data primitif dan terstruktur dalam bahasa **NUSANTARA**.

---

## 1. Tipe Data Primitif Pokok [DITETAPKAN]

| Tipe Data | Representasi Semantik | Contoh Nilai |
|---|---|---|
| `teks` | Rangkaian karakter teks UTF-8 | `"Halo Nusantara"`, `"Baris\nBaru"` |
| `bilangan` | Angka bulat berbobot bilangan bulat | `0`, `1`, `42`, `-100` |
| `desimal` | Angka pecahan titik mengambang (*floating point*) | `3.14`, `0.5`, `120.75` |
| `logika` | Nilai kebenaran biner | `benar`, `salah` |
| `kosong` | Representasi kekosongan nilai (*null/void*) | `kosong` |

---

## 2. Tipe Data Lanjutan [RANCANGAN]

Tipe data berikut dicadangkan dalam tata bahasa formal EBNF Phase 4 dan akan difinalisasi arsitektur memorinya pada fase yang relevan:

| Tipe Data | Peran Rencana | Target Fase |
|---|---|---|
| `karakter` | Karakter tunggal diapit tanda kutip tunggal (`'A'`) | Phase 9 |
| `daftar` | Urutan dinamis elemen homogen/heterogen (`[1, 2, 3]`) | Phase 14 |
| `peta` | Pasangan kunci-nilai asosiatif (`{"kunci": "nilai"}`) | Phase 14 |
| `tanggal` | Representasi kalender waktu | Pustaka Standar |
| `waktu` | Representasi jam dan durasi | Pustaka Standar |
