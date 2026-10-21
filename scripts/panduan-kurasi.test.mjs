import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const panduan = readFileSync(new URL('../docs/PANDUAN_KURASI.md', import.meta.url), 'utf8');
const contoh = readFileSync(new URL('../src/contoh-kurasi.md', import.meta.url), 'utf8');

test('SLA konsisten dengan piagam (pendaftaran 1x24, produk 2x24, banding 3x24, audit 90 hari)', () => {
  assert.match(panduan, /Pendaftaran lapak -> verifikasi awal \| 1x24 jam kerja/);
  assert.match(panduan, /Pengajuan produk -> tayang atau tolak beralasan \| 2x24 jam kerja/);
  assert.match(panduan, /Banding takedown \| 3x24 jam kerja/);
  assert.match(panduan, /Audit lapak aktif \| tiap 90 hari/);
  assert.doesNotMatch(panduan, /Target layanan kurasi maksimal 1x24/);
});
test('lima larangan mutlak piagam tercantum', () => {
  for (const k of ['Produk ilegal', 'Dropship', 'Duplikasi lapak', 'Manipulasi ulasan', 'kasir Pasaree']) {
    assert.ok(panduan.includes(k), `larangan "${k}" hilang`);
  }
  assert.match(panduan, /pembekuan 30 hari/);
});
test('contoh baik dan buruk memuat foto 800x800, judul berat/isi, alergen', () => {
  assert.match(panduan, /800x800/);
  assert.match(panduan, /Sambal Bawang Mbok D - 150 g/);
  assert.match(panduan, /LABEL_KURANG/);
});
test('semua kode alasan baku yang dipakai terdefinisi di tabel alasan baku', () => {
  const terdefinisi = new Set(
    [...panduan.matchAll(/^\| `([A-Z_]+)` \| (?:Foto|Judul|Lengkapi|Cantumkan|Harga|Diskon|Deskripsi|Pilih)/gm)].map((m) => m[1]),
  );
  const dipakai = new Set(
    [...(panduan + contoh).matchAll(/`([A-Z]+_[A-Z_]+)`/g)]
      .map((m) => m[1])
      .filter((k) => /^(FOTO|JUDUL|LABEL|IZIN|HARGA|DISKON|DESKRIPSI|KATEGORI)_/.test(k)),
  );
  for (const k of dipakai) assert.ok(terdefinisi.has(k), `kode ${k} dipakai tetapi tidak terdefinisi`);
  assert.ok(terdefinisi.size >= 10);
});
test('contoh penilaian mencakup setujui, revisi, tolak dengan pasal piagam', () => {
  for (const k of ['`SETUJU`', '`REVISI`', '`TOLAK`', 'Piagam Kurasi §5 butir 1']) assert.ok(contoh.includes(k), `${k} hilang`);
});
