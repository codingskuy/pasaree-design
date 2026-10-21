# pasaree-design

Sistem desain dan kurasi lapak Marketplace Pasaree. Divisi Pasaree (Marketplace), org Coding-Skuy. Template Opsi A.

Rujukan utama: [Pasaree-TownHall](https://github.com/Coding-Skuy/Pasaree-TownHall) — baca `lapak/00-piagam-kurasi.md`.

## Peran

- Token warna dan tipografi untuk mobile beli dan web lapak.
- Panduan kurasi lapak: kriteria tayang, larangan, contoh baik dan buruk.
- Tidak mengatur desain divisi lain.

## Struktur

```
tokens/warna.json       Palet utama Pasaree
tokens/kontras.json     Pasangan kontras WCAG AA yang divalidasi
tokens/tipografi.json   Skala huruf
tokens/harga.json       Aturan format dan komponen harga
scripts/                Validasi token (validate:tokens) dan ujinya
docs/token-desain.md    Spesifikasi token dan komponen harga
src/contoh-kurasi.md    Contoh penilaian kurasi
docs/PANDUAN_KURASI.md  Ringkasan alur kurasi
```

## Mulai Cepat

1. Buka `tokens/warna.json` untuk palet resmi.
2. Ikuti `docs/PANDUAN_KURASI.md` sebelum menayang lapak.

## Validasi

```
npm run validate:tokens   # atau: bun run validate:tokens
npm test
```

Memeriksa hex valid, kontras AA, skala huruf, dan konsistensi aturan harga.

## Link Figma

Belum ada berkas Figma terdaftar. Isi tabel ini saat berkas dibuat (tiga baris di bawah dipakai tiket PSR-DSG-002/003/004).

| Berkas | Tiket | Link |
|---|---|---|
| Token dan komponen harga | PSR-DSG-002 | belum terdaftar |
| Flow dan screen mobile pembeli | PSR-DSG-003 | belum terdaftar |
| Flow dan screen web lapak + kurasi | PSR-DSG-004 | belum terdaftar |
