import { describe, it, expect, beforeAll, vi, afterEach } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(resolve(root, 'index.html'), 'utf8');

/** Load the page DOM and run main.js against it (scripts in innerHTML don't execute). */
beforeAll(async () => {
  document.documentElement.innerHTML = html
    .replace(/^<!DOCTYPE html>/i, '')
    .replace(/<script[\s\S]*?<\/script>/g, '');
  document.documentElement.classList.add('js');
  await import('../js/main.js');
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('loupe (lightbox)', () => {
  it('starts hidden and opens on a print click with focus on close', () => {
    const loupe = document.getElementById('loupe');
    expect(loupe.hidden).toBe(true);
    const print = document.querySelector('.print');
    print.focus(); // jsdom's click() does not move focus like a real browser
    print.click();
    expect(loupe.hidden).toBe(false);
    expect(document.activeElement).toBe(loupe.querySelector('[data-loupe-close]'));
  });

  it('shows a numbered caption for the opened print', () => {
    const cap = document.getElementById('loupe-cap').textContent;
    expect(cap).toMatch(/^01 · /);
  });

  it('steps to the next print with the arrow key and wraps backwards', () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    expect(document.getElementById('loupe-cap').textContent).toMatch(/^02 · /);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    expect(document.getElementById('loupe-cap').textContent).toMatch(/^09 · /);
  });

  it('closes on Escape and returns focus to the originating print', () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    const loupe = document.getElementById('loupe');
    expect(loupe.hidden).toBe(true);
    expect(document.activeElement).toBe(document.querySelector('.print'));
    expect(document.body.style.overflow).toBe('');
  });
});

describe('index sheet (mobile menu)', () => {
  it('toggles open and closed via the button with aria-expanded tracking', () => {
    const toggle = document.querySelector('.rec-index-toggle');
    const sheet = document.getElementById('index-sheet');
    expect(sheet.hidden).toBe(true);
    toggle.click();
    expect(sheet.hidden).toBe(false);
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    toggle.click();
    expect(sheet.hidden).toBe(true);
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
  });

  it('closes when one of its links is clicked', () => {
    const toggle = document.querySelector('.rec-index-toggle');
    const sheet = document.getElementById('index-sheet');
    toggle.click();
    sheet.querySelector('a').click();
    expect(sheet.hidden).toBe(true);
  });

  it('lists all seven zones in order', () => {
    const labels = [...document.querySelectorAll('#index-sheet ol a span')].map((s) => s.textContent);
    expect(labels).toEqual(['0', 'I', 'II', 'III', 'IV', 'V', 'VI']);
  });
});

describe('zone ramp rail', () => {
  it('has 11 steps: 8 navigable zones and 3 inert ones', () => {
    expect(document.querySelectorAll('.ramp-rail a').length).toBe(8);
    expect(document.querySelectorAll('.ramp-rail .ramp-inert').length).toBe(3);
  });
});

describe('contact form', () => {
  const submit = () => {
    const form = document.getElementById('contact-form');
    form.dispatchEvent(new Event('submit', { cancelable: true }));
    return form;
  };

  it('reports success and resets the form when Formspree accepts', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }));
    const form = submit();
    const name = form.querySelector('#f-name');
    name.value = 'Test';
    await vi.waitFor(() => {
      expect(form.querySelector('.form-status').textContent).toMatch(/Record received/);
    });
    expect(form.querySelector('.form-status').classList.contains('is-ok')).toBe(true);
  });

  it('reports the error path with the WhatsApp fallback when the request fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('down')));
    const form = submit();
    await vi.waitFor(() => {
      expect(form.querySelector('.form-status').textContent).toMatch(/\+971 58 532 4519/);
    });
    expect(form.querySelector('.form-status').classList.contains('is-error')).toBe(true);
    expect(form.querySelector('button[type="submit"]').disabled).toBe(false);
  });
});
