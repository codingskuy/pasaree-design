// Pustaka validasi token desain Pasaree (tanpa dependensi).
const HEX = /^#[0-9A-Fa-f]{6}$/;

export function luminansi(hex) {
  const c = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}

export function rasioKontras(a, b) {
  const x = luminansi(a);
  const y = luminansi(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

// Referensi formatIdr(): Rp56.000, integer, tanpa desimal.
export function formatIdr(n) {
  if (!Number.isInteger(n) || n < 0) throw new Error(`nilai uang harus integer >= 0: ${n}`);
  return 'Rp' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function validasiWarna(warna) {
  const galat = [];
  for (const [k, v] of Object.entries(warna)) {
    if (typeof v !== 'string' || !HEX.test(v)) galat.push(`warna.${k}: bukan hex #RRGGBB (${v})`);
  }
  for (const k of ['pasaree_hijau_daun', 'pasaree_kunyit', 'pasaree_terakota', 'latar', 'teks']) {
    if (!(k in warna)) galat.push(`warna.${k}: token wajib (kompatibilitas konsumen) hilang`);
  }
  return galat;
}

export function validasiKontras(warna, kontras) {
  const galat = [];
  for (const p of kontras.pasangan) {
    const a = warna[p.depan];
    const b = warna[p.belakang];
    if (!a || !b) {
      galat.push(`kontras: token tak dikenal pada pasangan ${p.depan}/${p.belakang}`);
      continue;
    }
    const r = rasioKontras(a, b);
    if (r < p.minimal) galat.push(`kontras ${p.depan} (${a}) di ${p.belakang} (${b}) = ${r.toFixed(2)} < ${p.minimal}`);
  }
  return galat;
}

export function validasiTipografi(tipo) {
  const galat = [];
  for (const [k, v] of Object.entries(tipo)) {
    if (!Number.isInteger(v.ukuran) || v.ukuran < 12) galat.push(`tipografi.${k}: ukuran harus integer >= 12`);
    if (!Number.isInteger(v.berat) || v.berat < 100 || v.berat > 900 || v.berat % 100) galat.push(`tipografi.${k}: berat harus 100..900 kelipatan 100`);
    if (!Number.isInteger(v.tinggi_baris) || v.tinggi_baris < v.ukuran) galat.push(`tipografi.${k}: tinggi_baris harus >= ukuran`);
  }
  if (tipo.badan && tipo.badan.ukuran < 16) galat.push('tipografi.badan: ukuran badan minimal 16');
  for (const k of ['judul_besar', 'judul', 'badan', 'kecil']) {
    if (!(k in tipo)) galat.push(`tipografi.${k}: skala wajib hilang`);
  }
  return galat;
}

export function validasiHarga(harga, warna, tipo) {
  const galat = [];
  for (const c of harga.contoh_format) {
    let hasil;
    try { hasil = formatIdr(c.idr); } catch (e) { hasil = e.message; }
    if (hasil !== c.tampil) galat.push(`harga.contoh_format ${c.idr}: harapan ${c.tampil}, hasil ${hasil}`);
  }
  if (harga.aturan_produk.kelipatan !== 500) galat.push('harga.aturan_produk.kelipatan harus 500 (piagam §4)');
  for (const [nama, k] of Object.entries(harga.komponen)) {
    for (const t of [k.token_teks, k.varian?.normal?.token_harga, k.varian?.diskon?.token_harga, k.varian?.diskon?.token_coret]) {
      if (t && !(t in warna)) galat.push(`harga.komponen.${nama}: token warna ${t} tidak ada`);
    }
  }
  for (const t of ['harga_besar', 'harga', 'harga_coret']) {
    if (!(t in tipo)) galat.push(`harga: token tipografi ${t} tidak ada`);
  }
  if (!harga.komponen.LabelKomisi.dilarang_di.includes('mobile_pembeli')) {
    galat.push('harga.LabelKomisi: wajib dilarang di mobile pembeli (komisi bukan beban pembeli)');
  }
  return galat;
}
