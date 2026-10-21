import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const baca = (f) => readFileSync(new URL(`../docs/${f}`, import.meta.url), 'utf8');

test('flow mobile pembeli memuat 10 layar wajib', () => {
  const d = baca('flow-mobile-pembeli.md');
  for (const l of ['Beranda', 'Pencarian', 'DetailProduk', 'Keranjang', 'Checkout', 'Bayar', 'StatusPesanan', 'PesananSaya', 'DetailPesanan', 'Ulasan']) {
    assert.match(d, new RegExp(`\\| ${l} \\|`), `layar ${l} hilang dari katalog`);
  }
});
test('flow mobile pembeli memuat state error baku', () => {
  const d = baca('flow-mobile-pembeli.md');
  for (const k of ['STOK_HABIS', 'HARGA_BERUBAH', 'TRIP_PENUH', 'AUTH_KEDALUWARSA', 'Luring']) assert.ok(d.includes(k), `state ${k} hilang`);
});
test('setiap status pesanan kontrak punya representasi visual', () => {
  const d = baca('flow-mobile-pembeli.md');
  for (const s of ['DRAF_KERANJANG', 'DIPESAN', 'DIBAYAR', 'DIKONFIRMASI_LAPAK', 'DISERAHKAN_KE_TRIP', 'DITERIMA_PEMBELI', 'SELESAI', 'DIBATALKAN', 'DIKEMBALIKAN']) {
    assert.ok(d.includes('`' + s + '`'), `status ${s} hilang`);
  }
});
test('mobile pembeli tidak menampilkan komisi', () => {
  const d = baca('flow-mobile-pembeli.md');
  assert.match(d, /komisi lapak TIDAK ditampilkan di mobile/);
});

test('flow web lapak memuat layar wajib dan 7 status produk', () => {
  const d = baca('flow-web-lapak-kurasi.md');
  for (const l of ['Draf produk', 'Stok dan harga', 'Pesanan masuk', 'Serah trip', 'Antrean kurasi', 'Kalkulator komisi + estimasi payout']) {
    assert.match(d, new RegExp(`\\| ${l.replace(/[+]/g, '\\+')} \\|`), `layar ${l} hilang`);
  }
  for (const s of ['DRAF', 'MENUNGGU_KURASI', 'PERLU_REVISI', 'TAYANG', 'NONAKTIF_STOK_0', 'TAKEDOWN', 'ARSIP']) {
    assert.ok(d.includes('| `' + s + '` |'), `status ${s} hilang`);
  }
});
test('kalkulator menegaskan komisi dari payout, bukan pembeli', () => {
  const d = baca('flow-web-lapak-kurasi.md');
  assert.match(d, /BUKAN dari pembeli/);
  assert.match(d, /Komisi dipotong dari payout kamu, bukan dari pembeli/);
});
