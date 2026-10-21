# Contoh Penilaian Kurasi

Contoh fiktif untuk melatih kurator. Aturan: `docs/PANDUAN_KURASI.md` dan piagam kurasi TownHall. Keputusan akhir selalu oleh kurator manusia; skor model hanya saran.

## Kasus 1 - Setujui

Lapak: Dapur Mbok D (UMKM, identitas terverifikasi, 4 produk aktif).

| Kolom | Isi | Penilaian |
|---|---|---|
| Judul | Sambal Bawang Mbok D - 150 g | lolos |
| Foto | 4 foto asli, 1200x1200, satu foto label | lolos |
| Harga | Rp28.000 (kelipatan Rp500), median kategori Rp26.000 | lolos (+7%) |
| Pangan | komposisi lengkap, alergen "tidak ada alergen utama; dapur juga mengolah kacang tanah", produksi 12 Okt 2026, tahan 14 hari, PIRT tercantum | lolos |

Keputusan: `SETUJU` -> status `TAYANG` (muncul di katalog <= 5 menit). Waktu kurasi 9 jam kerja (< 2x24 jam kerja).

## Kasus 2 - Revisi

Produk: "Keripik Tempe" Rp15.000, 1 foto 640x640 hasil unduhan situs lain, alergen kosong.

Temuan: judul tanpa berat (`JUDUL_TIDAK_LENGKAP`), foto tidak asli dan resolusi rendah (`FOTO_TIDAK_ASLI`, `FOTO_RESOLUSI_RENDAH`), alergen kosong (`LABEL_KURANG`).

Keputusan: `REVISI` dengan alasan baku di atas. Catatan (<= 280 karakter): "Mohon ganti judul menjadi nama + berat (mis. Keripik Tempe Pedas - 200 g), unggah foto produkmu sendiri minimal 800x800, dan isi komposisi serta alergen." Status `PERLU_REVISI`; produsen punya 7 hari memperbaiki, lalu ajukan ulang.

## Kasus 3 - Tolak

Produk: "Teh Herbal Pelangsing Ampuh Sembuhkan Diabetes" tanpa izin edar.

Temuan: klaim kesehatan tanpa izin (piagam §5 butir 1).

Keputusan: `TOLAK`, catatan wajib: "Melanggar Piagam Kurasi §5 butir 1 (klaim kesehatan tanpa izin). Takedown langsung dan pembekuan lapak 30 hari." Produsen dapat banding 1 kali dalam 7 hari via tiket admin web; banding diputus dalam 3x24 jam kerja.

## Kasus 4 - Lapak ditolak saat pendaftaran

Lapak dengan 1 produk, tanpa foto, harga Rp0, titik serah Lumbung belum dipilih, deskripsi satu kata.

Temuan: kurang dari 3 produk aktif, foto asli tidak ada, harga tidak valid (harus > 0 dan kelipatan Rp500), titik serah kosong (piagam §3). Karena ini kekurangan kelengkapan, bukan larangan mutlak: lapak dikembalikan ke draf dengan daftar perbaikan, bukan ditolak permanen. Verifikasi awal selesai dalam 1x24 jam kerja sejak pendaftaran.

## Daftar periksa cepat kurator

- [ ] Larangan mutlak: tidak ada
- [ ] Foto asli, >= 800x800
- [ ] Judul memuat nama + varian + berat/isi
- [ ] Pangan: komposisi, alergen, tanggal produksi, daya tahan, simpan, izin
- [ ] Harga kelipatan Rp500; diskon memuat harga awal + periode
- [ ] SLA terpenuhi: pendaftaran 1x24 jam kerja, produk 2x24 jam kerja
