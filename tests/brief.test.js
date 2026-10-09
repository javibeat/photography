import { describe, it, expect, beforeAll, vi, afterEach } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(resolve(root, 'brief/index.html'), 'utf8');
const index = readFileSync(resolve(root, 'index.html'), 'utf8');

describe('session brief page (static)', () => {
  it('is a private working document: noindex, posts to the same Formspree endpoint', () => {
    expect(html).toContain('name="robots" content="noindex');
    expect(html).toContain('action="https://formspree.io/f/mdorjnyb"');
    expect(html).toContain('name="_subject"');
    expect(html).toContain('name="_gotcha"');
  });

  it('every local asset it references exists on disk', () => {
    const refs = new Set();
    for (const [, value] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
      if (/^(https?:|mailto:|#|data:)/.test(value)) continue;
      refs.add(value.split(/[?#]/)[0]);
    }
    expect(refs.size).toBeGreaterThan(5);
    const missing = [...refs].filter((ref) => {
      const clean = ref.replace(/^\//, '');
      const target = clean === '' ? 'index.html' : clean;
      return !existsSync(resolve(root, target));
    });
    expect(missing).toEqual([]);
  });

  it('uses the same WhatsApp number as the root page', () => {
    const nums = new Set([...html.matchAll(/https:\/\/wa\.me\/(\d+)/g)].map((m) => m[1]));
    expect([...nums]).toEqual(['971585324519']);
  });

  it('shares the cache-busted CSS/JS versions with the root page', () => {
    const ver = (src, file) => src.match(new RegExp(`${file}\\?v=(\\d+)`))[1];
    expect(ver(html, 'style.css')).toBe(ver(index, 'style.css'));
    expect(ver(html, 'main.js')).toBe(ver(index, 'main.js'));
  });

  it('plan options carry the load-bearing prices', () => {
    expect(html).toContain('1,300');
    expect(html).toContain('1,500');
    expect(html).toContain('5,500');
  });
});

describe('session brief page (behaviour)', () => {
  beforeAll(async () => {
    history.replaceState(null, '', '/brief/?plan=epk');
    document.documentElement.innerHTML = html
      .replace(/^<!DOCTYPE html>/i, '')
      .replace(/<script[\s\S]*?<\/script>/g, '');
    document.documentElement.classList.add('js');
    await import('../js/main.js');
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('preselects the plan from the ?plan= query', () => {
    expect(document.querySelector('#b-plan').value).toBe('epk');
  });

  it('submits via fetch and shows the brief-specific confirmation', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', fetchMock);
    const form = document.getElementById('brief-form');
    form.querySelector('#b-name').value = 'Lexie';
    form.querySelector('#b-email').value = 'lexie@example.com';
    form.querySelector('input[name="mood"][value="Raw & live"]').checked = true;
    form.dispatchEvent(new Event('submit', { cancelable: true }));
    await new Promise((r) => setTimeout(r, 0));

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, opts] = fetchMock.mock.calls[0];
    expect(url).toContain('formspree.io/f/mdorjnyb');
    expect(opts.method).toBe('POST');
    expect(opts.body.get('_subject')).toContain('Session brief');
    expect(opts.body.get('plan')).toBe('epk');
    expect(opts.body.getAll('mood')).toEqual(['Raw & live']);
    const status = form.querySelector('.form-status');
    expect(status.classList.contains('is-ok')).toBe(true);
    expect(status.textContent).toContain('Brief received');
  });

  it('routes a failed send to WhatsApp', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network')));
    const form = document.getElementById('brief-form');
    form.dispatchEvent(new Event('submit', { cancelable: true }));
    await new Promise((r) => setTimeout(r, 0));
    const status = form.querySelector('.form-status');
    expect(status.classList.contains('is-error')).toBe(true);
    expect(status.textContent).toContain('+971 58 532 4519');
  });
});
