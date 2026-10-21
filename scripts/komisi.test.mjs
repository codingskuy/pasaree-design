import test from 'node:test';
import assert from 'node:assert/strict';
import { hitungKomisi, estimasiPayout } from './komisi.mjs';

test('komisi 8%, 10% hampers, 5% lapak baru dari Rp56.000', () => {
  assert.equal(hitungKomisi(56000, 8), 4480);
  assert.equal(hitungKomisi(56000, 10), 5600);
  assert.equal(hitungKomisi(56000, 5), 2800);
});
test('komisi dibulatkan ke bawah per baris', () => {
  assert.equal(hitungKomisi(10, 8), 0); // 0,8 -> 0
  assert.equal(hitungKomisi(1999, 8), 159); // 159,92 -> 159
});
test('estimasi payout = subtotal - komisi per baris (contoh dokumen)', () => {
  const r = estimasiPayout([{ hargaIdr: 56000, qty: 1 }, { hargaIdr: 20000, qty: 2 }], 8);
  assert.deepEqual(r, { subtotal: 96000, komisi: 7680, payout: 88320 });
});
test('input tidak valid ditolak', () => {
  assert.throws(() => hitungKomisi(1.5, 8));
  assert.throws(() => hitungKomisi(100, 101));
});
