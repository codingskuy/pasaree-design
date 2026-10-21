// Referensi hitung komisi untuk contoh kalkulator (docs/flow-web-lapak-kurasi.md). Bukan kode produk:
// angka resmi selalu dari server (GET /web/komisi/tarif dan komisi_idr pada pesanan masuk).
export function hitungKomisi(subtotalIdr, tarifPersen) {
  if (!Number.isInteger(subtotalIdr) || subtotalIdr < 0) throw new Error('subtotal harus integer >= 0');
  if (!Number.isInteger(tarifPersen) || tarifPersen < 0 || tarifPersen > 100) throw new Error('tarif harus integer 0..100');
  return Math.floor((subtotalIdr * tarifPersen) / 100);
}

// komisi per baris item, dibulatkan ke bawah per baris (ADR-0001 butir 4).
export function estimasiPayout(baris, tarifPersen) {
  const komisi = baris.reduce((t, b) => t + hitungKomisi(b.hargaIdr * b.qty, tarifPersen), 0);
  const subtotal = baris.reduce((t, b) => t + b.hargaIdr * b.qty, 0);
  return { subtotal, komisi, payout: subtotal - komisi };
}
