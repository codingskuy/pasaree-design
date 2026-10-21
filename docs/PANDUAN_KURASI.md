# Panduan Kurasi Lapak dan Produk Pasaree

Tiket: PSR-DSG-005. Panduan visual untuk kurator dan produsen. SUMBER KEBENARAN adalah piagam (`lapak/00-piagam-kurasi.md`, TownHall) dan SOP tayang (`lapak/10-sop-tayang-produk.md`); dokumen ini merangkum dan memberi contoh, tidak mengubah aturan. Bila berbeda, piagam menang dan dokumen ini diperbaiki. Contoh penilaian lengkap: `src/contoh-kurasi.md`. Layar kurator: `docs/flow-web-lapak-kurasi.md` (PSR-DSG-004).

## 1. SLA kurasi (piagam §7)

| Proses | SLA |
|---|---|
| Pendaftaran lapak -> verifikasi awal | 1x24 jam kerja |
| Pengajuan produk -> tayang atau tolak beralasan | 2x24 jam kerja |
| Banding takedown | 3x24 jam kerja |
| Audit lapak aktif | tiap 90 hari |

Catatan: versi sebelumnya dokumen ini menyebut "kurasi maksimal 1x24 jam kerja" untuk semua proses; itu tidak sesuai piagam dan telah diperbaiki (pendaftaran 1x24, produk 2x24). Antrean produk > 50 item memicu notifikasi ke ketua TownHall (SOP §4.4). Draf `PERLU_REVISI` yang tidak diperbaiki dalam 7 hari diarsipkan.

## 2. Urutan penilaian produk

1. Cek otomatis sudah lolos (judul 10-80 karakter, harga kelipatan Rp500, foto >= 800x800 <= 5 MB, kategori valid, kolom pangan lengkap, tidak mirip >= 85% dengan produk se-lapak).
2. Periksa larangan mutlak (bagian 5). Satu saja kena -> tolak.
3. Periksa foto, judul, label alergen, harga (bagian 3).
4. Keputusan: Setujui (`TAYANG`), Revisi (alasan baku + catatan <= 280 karakter), atau Tolak (hanya larangan mutlak, tautkan pasal piagam).
5. Keputusan manusia final; skor atau saran model hanya bantuan. Simpan siapa, kapan, alasan, snapshot.

## 3. Contoh baik dan buruk

### 3.1 Foto asli (piagam §4: minimal 1 foto >= 800x800 px, maks 6 foto + 1 video 30 detik, dilarang foto stok/internet)

| Aspek | Baik | Buruk (alasan baku) |
|---|---|---|
| Keaslian | foto kemasan dan isi produk milik lapak, latar dapur/meja lapak, ada kemasan berlabel | foto hasil unduhan internet atau katalog pabrik, watermark pihak lain, reverse-check cocok situs lain (`FOTO_TIDAK_ASLI`) |
| Resolusi | 1200x1200 px, tajam, produk memenuhi >= 60% bingkai | 400x400 atau buram, produk kecil di pojok (`FOTO_RESOLUSI_RENDAH`) |
| Isi | tampak produk yang dijual sesuai varian; foto label di salah satu foto | foto bahan mentah saja atau produk berbeda dari yang dijual (`FOTO_TIDAK_SESUAI`) |
| Jumlah | 1 wajib, disarankan 3-6 dari sudut berbeda (maks 6 foto + 1 video 30 detik) | lebih dari 6 foto atau video > 30 detik (kurangi); satu foto untuk produk bervarian banyak boleh tayang, disarankan menambah |

Metadata foto diperiksa kurator; foto lama yang diulang dari lapak lain = duplikasi (larangan 3).

### 3.2 Judul memuat berat/isi (piagam §4)

| Baik | Buruk (alasan baku) |
|---|---|
| `Sambal Bawang Mbok D - 150 g` | `Sambal` (`JUDUL_TIDAK_LENGKAP`: tanpa varian dan berat) |
| `Keripik Tempe Pedas Manis - 200 g` | `KERIPIK TEMPE ENAK MURAH BANGET!!!` (huruf kapital berlebih, klaim kosong, tanpa berat; `JUDUL_TIDAK_LENGKAP`) |
| `Paket Hampers Lebaran - 3 toples (@250 g)` | `Paket hemat` (tanpa isi; `JUDUL_TIDAK_LENGKAP`) |

Aturan: nama + varian + berat/isi, 10-80 karakter, satuan baku g, ml, pcs, paket.

### 3.3 Label alergen dan data pangan (piagam §2.4 dan §4)

Produk pangan wajib: komposisi, alergen, tanggal produksi, daya tahan/kedaluwarsa, instruksi simpan, dan izin (PIRT/BPOM sesuai kelas).

| Baik | Buruk (alasan baku) |
|---|---|
| Komposisi: cabai, bawang putih, minyak kelapa, garam. Alergen: tidak mengandung alergen utama; diproduksi di dapur yang juga mengolah kacang tanah. Produksi 12 Okt 2026, tahan 14 hari suhu ruang. PIRT 2103xxxxxxx | Alergen kosong (`LABEL_KURANG`) |
| Alergen: kacang tanah, kedelai, gandum | "Aman untuk semua" tanpa daftar alergen (`LABEL_KURANG`) |
| Izin PIRT dicantumkan dengan nomor | Izin tidak ada atau nomor tidak cocok untuk kelas produk (`IZIN_PANGAN_TIDAK_ADA`) |

Contoh nomor izin di tabel adalah ilustrasi, bukan nomor nyata.

## 4. Alasan baku revisi (usulan; perlu disepakati dengan kontrak backend)

Kontrak backend hanya memberi contoh `FOTO_TIDAK_ASLI`, `HARGA_TIDAK_WAJAR`, `LABEL_KURANG`. Daftar di bawah memperluasnya dan memetakan ke piagam. Revisi memilih satu atau lebih alasan baku ditambah catatan bebas <= 280 karakter.

| Kode | Pesan baku ke produsen | Dasar |
|---|---|---|
| `FOTO_TIDAK_ASLI` | Foto harus foto asli produkmu, bukan dari internet atau milik orang lain. | piagam §2.2, §4 |
| `FOTO_RESOLUSI_RENDAH` | Foto minimal 800x800 px dan tajam. | piagam §4 |
| `FOTO_TIDAK_SESUAI` | Foto tidak menunjukkan produk dan varian yang dijual. | piagam §2.2 |
| `JUDUL_TIDAK_LENGKAP` | Judul harus memuat nama, varian, dan berat/isi, tanpa klaim berlebihan. | piagam §4 |
| `LABEL_KURANG` | Lengkapi komposisi, alergen, tanggal produksi, daya tahan, dan cara simpan. | piagam §2.4, §4 |
| `IZIN_PANGAN_TIDAK_ADA` | Cantumkan nomor izin PIRT/BPOM sesuai kelas produk. | piagam §2.4 |
| `HARGA_TIDAK_WAJAR` | Harga menyimpang jauh (lebih dari 30% dari median kategori); jelaskan atau sesuaikan. | SOP §4.2 |
| `DISKON_TANPA_PERIODE` | Diskon wajib mencantumkan harga awal dan periode. | piagam §4 |
| `DESKRIPSI_KURANG` | Deskripsi 50-300 kata yang jujur dan jelas. | piagam §3 |
| `KATEGORI_SALAH` | Pilih satu kategori utama yang sesuai dan maksimal 2 tag. | piagam §4 |

Catatan: `HARGA_TIDAK_WAJAR` memakai ambang +-30% terhadap median kategori hanya bila median tersedia (SOP §4.2).

## 5. Larangan mutlak (piagam §5) dan tindak lanjut

| # | Larangan | Contoh | Tindakan |
|---|---|---|---|
| 1 | Produk ilegal, berbahaya, atau klaim kesehatan tanpa izin | "Menyembuhkan diabetes", produk tanpa izin edar | takedown langsung + pembekuan 30 hari |
| 2 | Dropship dari luar ekosistem tanpa sepengetahuan kurator | foto dan barang dari marketplace lain, stok bukan milik lapak | takedown langsung + pembekuan 30 hari |
| 3 | Duplikasi lapak untuk produk identik (satu produsen = satu lapak aktif) | dua lapak dengan produk dan foto sama | lapak ganda ditutup; pelanggaran berulang = tutup permanen |
| 4 | Manipulasi ulasan, stok palsu, atau harga jebakan | stok tampil 99 padahal habis; harga Rp500 lalu dinaikkan saat bayar | peringatan, takedown, atau tutup permanen sesuai tingkat/berulang |
| 5 | Transaksi di luar kasir Pasaree untuk pesanan dari katalog | mengajak pembeli pindah ke WhatsApp untuk bayar | peringatan; berulang = tutup permanen |

Tolak hanya untuk larangan mutlak dan WAJIB menautkan pasal (mis. "Piagam §5 butir 1") di catatan. Pelanggaran 1-2 = takedown langsung + pembekuan 30 hari; pelanggaran berulang = tutup permanen (piagam §5). Banding maksimal 1 kali dalam 7 hari via tiket admin web, diputuskan dewan kurasi (kuorum 2 dari 3), SLA 3x24 jam kerja.

## 6. Kriteria lapak (pendaftaran, ringkas dari piagam §3)

Identitas terverifikasi (KTP/NIB/komunitas, salah satu + verifikasi luring), minimal 3 produk aktif berfoto asli dengan deskripsi 50-300 kata dan stok awal, setuju komisi transparan dan payout via Lumbung, setuju SLA fulfillment (konfirmasi pesanan <= 2 jam jam kerja, serah ke trip sesuai jadwal), skor higiene >= 80 untuk pangan. SLA verifikasi awal 1x24 jam kerja.

## 7. Catatan transparansi

Kurator menilai kelengkapan dan kejujuran, bukan menaikkan atau menurunkan harga demi komisi. Komisi bukan beban pembeli dan tidak boleh menjadi alasan penolakan. Perubahan harga > 20% atau foto utama pada produk `TAYANG` memicu kurasi ulang ringan (SOP §5); produk `NONAKTIF_STOK_0` kembali tayang tanpa kurasi ulang bila konten tak berubah.
