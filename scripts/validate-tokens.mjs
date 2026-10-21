#!/usr/bin/env node
// Validasi token desain: node scripts/validate-tokens.mjs  (atau: bun run validate:tokens / npm run validate:tokens)
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { validasiWarna, validasiKontras, validasiTipografi, validasiHarga } from './token-lib.mjs';

const akar = join(dirname(fileURLToPath(import.meta.url)), '..');
const baca = (f) => JSON.parse(readFileSync(join(akar, 'tokens', f), 'utf8'));

const warna = baca('warna.json');
const kontras = baca('kontras.json');
const tipo = baca('tipografi.json');
const harga = baca('harga.json');

const galat = [
  ...validasiWarna(warna),
  ...validasiKontras(warna, kontras),
  ...validasiTipografi(tipo),
  ...validasiHarga(harga, warna, tipo),
];

if (galat.length) {
  console.error(`validate:tokens GAGAL (${galat.length} galat)`);
  for (const g of galat) console.error(' - ' + g);
  process.exit(1);
}
console.log(`validate:tokens OK: ${Object.keys(warna).length} warna, ${kontras.pasangan.length} pasangan kontras AA, ${Object.keys(tipo).length} gaya huruf, ${harga.contoh_format.length} contoh harga`);
