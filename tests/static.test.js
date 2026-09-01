import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const site = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(resolve(site, 'index.html'), 'utf8');

describe('static integrity', () => {
  it('every local asset referenced by the page exists on disk', () => {
    const refs = new Set();
    const attrRe = /(?:src|href|imagesrcset|srcset)="([^"]+)"/g;
    for (const [, value] of html.matchAll(attrRe)) {
      if (value.startsWith('data:')) continue; // inline data URIs contain commas
      for (const part of value.split(',')) {
        const url = part.trim().split(/\s+/)[0];
        if (!url || /^(https?:|mailto:|#|data:)/.test(url)) continue;
        refs.add(url.split('?')[0]);
      }
    }
    expect(refs.size).toBeGreaterThan(20);
    const missing = [...refs].filter((ref) => !existsSync(resolve(site, ref.replace(/^\//, ''))));
    expect(missing).toEqual([]);
  });

  it('all WhatsApp links point to the confirmed number', () => {
    const links = [...html.matchAll(/https:\/\/wa\.me\/(\d+)/g)].map((m) => m[1]);
    expect(links.length).toBeGreaterThan(3);
    expect(new Set(links)).toEqual(new Set(['971585324519']));
  });

  it('JSON-LD parses and its FAQ matches the on-page FAQ', () => {
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    expect(blocks.length).toBe(1);
    const data = JSON.parse(blocks[0][1]);
    const faq = data['@graph'].find((n) => n['@type'] === 'FAQPage');
    const ldQuestions = faq.mainEntity.map((q) => q.name);
    const pageQuestions = [...html.matchAll(/<summary>([^<]+)</g)].map((m) => m[1].trim());
    expect(pageQuestions).toEqual(ldQuestions);
  });

  it('JSON-LD prices match the visible pricing cards', () => {
    const data = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    const biz = data['@graph'].find((n) => n['@type'] === 'Photographer');
    const prices = biz.hasOfferCatalog.itemListElement.map((o) => o.price);
    expect(prices).toEqual(['1300', '1500', '5500']);
    expect(html).toContain('1,300');
    expect(html).toContain('1,500');
    expect(html).toContain('5,500');
  });

  it('has no noindex now that the site is live at the root', () => {
    expect(html).not.toContain('name="robots" content="noindex');
  });

  it('keeps the [hidden] loupe from covering the page (regression)', () => {
    const css = readFileSync(resolve(site, 'css/style.css'), 'utf8');
    // .loupe sets display:flex, which overrides the hidden attribute unless this rule exists
    const flat = css.replace(/\s+/g, ' ');
    expect(flat).toContain('.loupe[hidden] { display: none; }');
    // the guard must come before the display:flex block
    expect(flat.indexOf('.loupe[hidden]')).toBeLessThan(flat.indexOf('.loupe {'));
  });

  it('declares canonical, OG image and theme color', () => {
    expect(html).toContain('rel="canonical"');
    expect(html).toContain('property="og:image"');
    expect(html).toContain('name="theme-color"');
    expect(existsSync(resolve(site, 'img/og.jpg'))).toBe(true);
  });

  it('links the web-studio quote page in the colophon', () => {
    expect(html).toContain('https://truelovecreative.es/brief');
  });
});
