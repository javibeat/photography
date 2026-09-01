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

describe('gallery filter', () => {
  it('shows every shot with the default "All" filter', () => {
    const hidden = document.querySelectorAll('.shot.is-hidden');
    expect(hidden.length).toBe(0);
  });

  it('hides non-matching shots when a category chip is clicked', () => {
    const artistsChip = document.querySelector('[data-filter="artists"]');
    artistsChip.click();
    const shots = [...document.querySelectorAll('.shot')];
    const visible = shots.filter((s) => !s.classList.contains('is-hidden'));
    expect(visible.length).toBeGreaterThan(0);
    expect(visible.every((s) => s.dataset.cat === 'artists')).toBe(true);
    expect(artistsChip.getAttribute('aria-pressed')).toBe('true');
  });

  it('restores all shots when "All" is clicked again', () => {
    document.querySelector('[data-filter="all"]').click();
    expect(document.querySelectorAll('.shot.is-hidden').length).toBe(0);
  });
});

describe('lightbox', () => {
  it('opens with the clicked shot\'s full-size image', () => {
    const shot = document.querySelector('.shot');
    shot.click();
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lb-img');
    expect(lightbox.hidden).toBe(false);
    expect(img.getAttribute('src')).toBe(shot.dataset.full);
  });

  it('navigates to the next visible shot with ArrowRight', () => {
    const img = document.getElementById('lb-img');
    const before = img.getAttribute('src');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    expect(img.getAttribute('src')).not.toBe(before);
  });

  it('closes on Escape', async () => {
    vi.useFakeTimers();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    vi.advanceTimersByTime(400);
    expect(document.getElementById('lightbox').hidden).toBe(true);
    vi.useRealTimers();
  });
});

describe('mobile menu', () => {
  it('toggles aria-expanded and the open class', () => {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.getElementById('nav-menu');
    toggle.click();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(menu.classList.contains('is-open')).toBe(true);
    toggle.click();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
  });
});

describe('contact form', () => {
  it('reports success and resets the form when Formspree accepts', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }));
    const form = document.getElementById('contact-form');
    form.querySelector('#f-name').value = 'Test Artist';
    form.querySelector('#f-email').value = 'artist@test.com';
    form.querySelector('#f-message').value = 'I need an EPK.';
    form.dispatchEvent(new Event('submit', { cancelable: true }));
    await vi.waitFor(() => {
      expect(form.querySelector('.form-status').classList.contains('ok')).toBe(true);
    });
    expect(form.querySelector('#f-name').value).toBe('');
    expect(fetch).toHaveBeenCalledWith(form.action, expect.objectContaining({ method: 'POST' }));
  });

  it('offers the WhatsApp fallback when Formspree fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));
    const form = document.getElementById('contact-form');
    form.dispatchEvent(new Event('submit', { cancelable: true }));
    await vi.waitFor(() => {
      expect(form.querySelector('.form-status').classList.contains('error')).toBe(true);
    });
    expect(form.querySelector('.form-status').textContent).toContain('+971 58 532 4519');
  });
});
