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
