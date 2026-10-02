# Referensi Prioritas & Presedensi Operator

Hirarki resmi evaluasi prioritas operator (*operator precedence*) dan arah asosiasi (*associativity*) dalam bahasa **NUSANTARA**.

Status: **[DITETAPKAN] — Disahkan pada Phase 4.**

---

## Tabel 8 Tingkat Presedensi Resmi

| Tingkat | Kategori Operator | Simbol / Kata Kunci | Arah Asosiasi | Contoh Ekspresi |
|---|---|---|---|---|
| **1 (Tertinggi)** | Pengelompokan | `( )` | Dari dalam ke luar | `(a + b) * c` |
| **2** | Negasi & Tanda Unari | `tidak`, `-` (unari) | Kanan ke Kiri | `tidak aktif`, `-x` |
| **3** | Perkalian, Pembagian, Modulo | `*`, `/`, `%` | Kiri ke Kanan | `a * b / c % d` |
| **4** | Penjumlahan & Pengurangan | `+`, `-` | Kiri ke Kanan | `a + b - c` |
| **5** | Perbandingan Ukuran | `<`, `<=`, `>`, `>=` | Kiri ke Kanan | `nilai >= 75` |
| **6** | Perbandingan Kesetaraan | `==`, `!=` | Kiri ke Kanan | `status == "aktif"` |
| **7** | Konjungsi Logika (AND) | `dan` | Kiri ke Kanan | `a > 0 dan b < 10` |
| **8 (Terendah)** | Disjungsi Logika (OR) | `atau` | Kiri ke Kanan | `lulus atau remedial` |

*(Catatan: Operator penugasan `=` berada pada tingkat pernyataan instruksi, bukan bagian dari evaluasi ekspresi bernilai biner).*
