# Token Desain Pasaree

Sumber tunggal tampilan untuk mobile beli (KMP + Compose) dan web lapak (Bun + SvelteKit). Tiket: PSR-DSG-002. Nilai di `tokens/*.json`; dokumen ini menjelaskan pemakaiannya. Validasi: `npm run validate:tokens` (atau `bun run validate:tokens`).

## 1. Berkas token

| Berkas | Isi |
|---|---|
| `tokens/warna.json` | palet merek, permukaan, teks, status, serta token harga |
| `tokens/kontras.json` | daftar pasangan teks/latar yang wajib lolos WCAG 2.1 AA (diperiksa skrip) |
| `tokens/tipografi.json` | skala huruf (`ukuran`, `berat`, `tinggi_baris`, satuan sp di mobile / px di web) |
| `tokens/harga.json` | aturan format uang dan komponen `HargaProduk`, `LabelKomisi` |

Token lama (`pasaree_hijau_daun`, `pasaree_kunyit`, `pasaree_terakota`, `latar`, `teks`, skala `judul_besar`/`judul`/`badan`/`kecil`) tetap ada agar konsumen tidak pecah. Satu nilai berubah: `pasaree_terakota` dari `#C0563B` menjadi `#B54A31` karena kontras terhadap `latar` hanya 4,45:1 (di bawah AA 4,5:1); kini 5,18:1.

## 2. Aturan kontras (WCAG AA)

| Pemakaian | Token | Rasio |
|---|---|---|
| Teks utama di latar | `teks` / `latar` | 16,39 |
| Teks redam di latar | `teks_redam` / `latar` | 6,57 |
| Tautan, tombol sekunder | `pasaree_hijau_daun` / `latar` | 4,95 |
| Teks pada tombol utama | `teks_di_hijau` / `pasaree_hijau_daun` | 5,04 |
| Galat | `pasaree_terakota` / `latar` | 5,18 |
| Peringatan (teks) | `kunyit_teks` / `latar` | 6,54 |

`pasaree_kunyit` (`#E0A100`) hanya 2,23:1 terhadap `latar`: DILARANG sebagai warna teks atau ikon informasi tunggal. Pakai sebagai isian (lencana, sorotan) dengan teks `teks_di_kunyit` (7,36:1), atau pakai `kunyit_teks` untuk teks peringatan. Informasi tidak boleh hanya dibedakan lewat warna: status selalu disertai teks atau ikon.

## 3. Tipografi

| Gaya | Ukuran / berat / tinggi baris | Pemakaian |
|---|---|---|
| `judul_besar` | 28 / 700 / 36 | judul layar |
| `judul` | 22 / 700 / 28 | judul bagian |
| `subjudul` | 18 / 600 / 24 | judul kartu |
| `badan` | 16 / 400 / 24 | isi (minimal 16 agar terbaca) |
| `kecil` | 13 / 400 / 18 | keterangan, bukan informasi kritis |
| `harga_besar` | 22 / 700 / 28 | harga pada DetailProduk dan total |
| `harga` | 16 / 700 / 24 | harga pada kartu dan baris keranjang |
| `harga_coret` | 13 / 400 / 18 | harga awal dicoret |

Keluarga huruf: font sistem platform (asumsi, belum ada keputusan merek). Pembeli dapat memperbesar teks sistem; tata letak wajib tidak terpotong sampai 200%.

## 4. Komponen harga

### 4.1 Format

`formatIdr()` tunggal (di `shared/util` KMP dan `src/lib` web). Uang selalu integer IDR, tanpa desimal, tanpa spasi setelah `Rp`, titik sebagai pemisah ribuan: `Rp56.000`, `Rp1.250.000`. Dilarang format manual di layar. Harga produk kelipatan Rp500 (piagam §4); biaya layanan Rp2.000 dan ongkir boleh bukan kelipatan Rp500 karena bukan harga produk.

### 4.2 HargaProduk

| Varian | Tampilan | Wajib data |
|---|---|---|
| Normal | `Rp56.000` (`harga`) | `harga_idr` |
| Diskon | `Rp48.000` (`harga`), di sampingnya `Rp56.000` dicoret (`harga_coret`), baris kecil `Berlaku s.d. 31 Okt 2026` | `harga_idr`, `harga_awal_idr`, periode mulai dan selesai |

Aturan: harga tampil = harga bayar sebelum ongkir (piagam §2.3). Harga awal dicoret hanya muncul bila ada periode diskon aktif; di luar periode, tampil normal. Persentase hemat boleh ditampilkan hanya bila dihitung dari kedua angka tersebut. Keadaan stok 0 (`NONAKTIF_STOK_0`): harga tetap tampil, tombol beli nonaktif dengan teks "Stok habis". Bila harga berubah antara DetailProduk dan checkout, tampilkan harga lama dicoret dan harga baru (lihat state `HARGA_BERUBAH` di `docs/flow-mobile-pembeli.md`).

Aksesibilitas: label konten dibaca penuh, mis. "Harga lima puluh enam ribu rupiah, harga awal ..., berlaku sampai ...". Teks coret tidak boleh menjadi satu-satunya penanda: label konten menyebut "harga awal".

### 4.3 LabelKomisi (info, bukan beban)

Hanya di web lapak (kalkulator komisi, pesanan masuk, payout). TIDAK PERNAH muncul di mobile pembeli atau menambah total pembeli. Teks baku: `Komisi 8% (Rp4.480) dipotong dari payout lapak, bukan dari pembeli`. Perhitungan: `komisi = floor(subtotal x tarif)` per baris item; estimasi payout = subtotal dikurangi komisi.

| Tarif | Kode kontrak | Syarat |
|---|---|---|
| 8% | `DEFAULT` | tarif umum |
| 10% | `HAMPERS` | kategori `paket-hampers` |
| 5% | `LAPAK_BARU` | lapak baru, 30 hari pertama |

Rincian checkout pembeli menampilkan baris: Subtotal, Ongkir (per trip), Biaya layanan `Rp2.000`, Total. Tidak ada baris komisi.

## 5. Asumsi (tandai di PR)

1. Dokumen BRD/PRD/FRD v1.0.0 masih templat; aturan diturunkan dari piagam kurasi, `produk/30-modul-KMP-bersama.md` §5, ADR-0001, dan `docs/api/openapi.yaml` (PR backend #11).
2. Keluarga huruf = font sistem; belum ada berkas font merek.
3. Nilai tarif 8/10/5% mengikuti AGENTS.md; sumber otoritatif tarif adalah `GET /web/komisi/tarif`, klien tidak boleh menanam angka.
4. Link Figma belum ada; tabel di README memuat baris kosong sampai tim desain mengisi.
