import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(resolve(root, 'propuesta/index.html'), 'utf8');
const index = readFileSync(resolve(root, 'index.html'), 'utf8');

describe('proposal page (/propuesta/)', () => {
  it('is private: noindex and absent from the sitemap', () => {
    expect(html).toContain('name="robots" content="noindex');
    expect(readFileSync(resolve(root, 'sitemap.xml'), 'utf8')).not.toContain('propuesta');
  });

  it('shows the regular price struck through and the proposal price', () => {
    expect(html).toMatch(/<s class="price-was">[\s\S]*1,300<\/s>/);
    expect(html).toMatch(/class="price-now">[\s\S]*800<\/span>/);
  });

  it('carries the event facts', () => {
    expect(html).toContain('Sun 18 Oct');
    expect(html).toContain('4–6 pm');
    expect(html).toContain('At home');
  });

  it('every local asset it references exists on disk', () => {
    const missing = [...html.matchAll(/(?:src|href)="([^"]+)"/g)]
      .map((m) => m[1])
      .filter((v) => !/^(https?:|mailto:|#|data:)/.test(v))
      .map((v) => v.split(/[?#]/)[0].replace(/^\//, '') || 'index.html')
      .filter((f) => !existsSync(resolve(root, f)));
    expect(missing).toEqual([]);
  });

  it('uses the same WhatsApp number and cache-bust versions as the root page', () => {
    const nums = new Set([...html.matchAll(/https:\/\/wa\.me\/(\d+)/g)].map((m) => m[1]));
    expect([...nums]).toEqual(['971585324519']);
    const ver = (src, file) => src.match(new RegExp(`${file}\\?v=(\\d+)`))[1];
    expect(ver(html, 'style.css')).toBe(ver(index, 'style.css'));
    expect(ver(html, 'main.js')).toBe(ver(index, 'main.js'));
  });
});
