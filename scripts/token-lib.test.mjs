import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { rasioKontras, formatIdr, validasiWarna, validasiKontras, validasiTipografi, validasiHarga } from './token-lib.mjs';

const baca = (f) => JSON.parse(readFileSync(new URL(`../tokens/${f}`, import.meta.url), 'utf8'));

test('rasio kontras hitam/putih = 21', () => {
  assert.equal(Math.round(rasioKontras('#000000', '#FFFFFF')), 21);
});
test('formatIdr: Rp56.000, tanpa desimal, tolak non-integer', () => {
  assert.equal(formatIdr(56000), 'Rp56.000');
  assert.equal(formatIdr(1250000), 'Rp1.250.000');
  assert.throws(() => formatIdr(56000.5));
  assert.throws(() => formatIdr(-1));
});
test('token warna: hex valid dan semua pasangan lolos AA', () => {
  assert.deepEqual(validasiWarna(baca('warna.json')), []);
  assert.deepEqual(validasiKontras(baca('warna.json'), baca('kontras.json')), []);
});
test('kontras di bawah AA terdeteksi (kunyit sebagai teks di latar)', () => {
  const w = { ...baca('warna.json'), kunyit_teks: '#E0A100' };
  assert.ok(validasiKontras(w, baca('kontras.json')).length > 0);
});
test('tipografi valid; badan < 16 ditolak', () => {
  assert.deepEqual(validasiTipografi(baca('tipografi.json')), []);
  const t = { ...baca('tipografi.json'), badan: { ukuran: 14, berat: 400, tinggi_baris: 20 } };
  assert.ok(validasiTipografi(t).length > 0);
});
test('aturan harga konsisten dengan token', () => {
  assert.deepEqual(validasiHarga(baca('harga.json'), baca('warna.json'), baca('tipografi.json')), []);
});
