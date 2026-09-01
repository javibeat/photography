/* ESTRELA v3 — The Exposure Record: rail tracking, sheet placement,
   loupe (lightbox), index sheet, Formspree submit. No dependencies. */
(() => {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ---------- Zone rail: highlight the zone in view ---------- */
  const railLinks = new Map(
    $$('.ramp-rail a[data-zone]').map((a) => [a.getAttribute('href').slice(1), a])
  );
  const zones = $$('main .zone, .colophon');

  if ('IntersectionObserver' in window && railLinks.size) {
    const zoneIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          railLinks.forEach((a) => a.classList.remove('is-active'));
          const link = railLinks.get(entry.target.id);
          if (link) link.classList.add('is-active');
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    zones.forEach((z) => zoneIO.observe(z));
  }

  /* ---------- Sheet placement (scroll reveal with mass) ---------- */
  const sheets = $$('.sheet, .print');
  sheets.forEach((el) => el.classList.add('placed'));
  if ('IntersectionObserver' in window) {
    const placeIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-placed');
          placeIO.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 }
    );
    sheets.forEach((el) => placeIO.observe(el));
  } else {
    sheets.forEach((el) => el.classList.add('is-placed'));
  }

  /* ---------- Mobile index sheet ---------- */
  const indexToggle = $('.rec-index-toggle');
  const indexSheet = $('#index-sheet');
  if (indexToggle && indexSheet) {
    const setOpen = (open) => {
      indexToggle.setAttribute('aria-expanded', String(open));
      indexSheet.hidden = !open;
    };
    indexToggle.addEventListener('click', () => {
      setOpen(indexSheet.hidden);
    });
    indexSheet.addEventListener('click', (e) => {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !indexSheet.hidden) {
        setOpen(false);
        indexToggle.focus();
      }
    });
    document.addEventListener('click', (e) => {
      if (indexSheet.hidden) return;
      if (!e.target.closest('#index-sheet') && !e.target.closest('.rec-index-toggle')) setOpen(false);
    });
  }

  /* ---------- Loupe (lightbox) ---------- */
  const loupe = $('#loupe');
  const loupeImg = $('#loupe-img');
  const loupeCap = $('#loupe-cap');
  const prints = $$('.print[data-loupe]');
  let current = -1;
  let lastFocus = null;

  const printData = prints.map((btn) => {
    const img = $('img', btn);
    const num = $('.print-cap span', btn);
    const cap = $('.print-cap', btn);
    const name = cap ? cap.textContent.replace(num ? num.textContent : '', '').trim() : '';
    return {
      full: img.srcset ? img.srcset.split(',').pop().trim().split(' ')[0] : img.src,
      alt: img.alt,
      cap: num ? `${num.textContent.trim()} · ${name}` : name
    };
  });

  const showLoupe = (i) => {
    current = (i + printData.length) % printData.length;
    const d = printData[current];
    loupeImg.src = d.full;
    loupeImg.alt = d.alt;
    loupeCap.textContent = d.cap;
  };

  const openLoupe = (i) => {
    lastFocus = document.activeElement;
    showLoupe(i);
    loupe.hidden = false;
    document.body.style.overflow = 'hidden';
    $('.loupe-close', loupe).focus();
  };

  const closeLoupe = () => {
    loupe.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  };

  prints.forEach((btn, i) => btn.addEventListener('click', () => openLoupe(i)));

  if (loupe) {
    $('[data-loupe-close]', loupe).addEventListener('click', closeLoupe);
    $('[data-loupe-prev]', loupe).addEventListener('click', () => showLoupe(current - 1));
    $('[data-loupe-next]', loupe).addEventListener('click', () => showLoupe(current + 1));
    loupe.addEventListener('click', (e) => {
      if (!e.target.closest('figure') && !e.target.closest('button')) closeLoupe();
    });
    document.addEventListener('keydown', (e) => {
      if (loupe.hidden) return;
      if (e.key === 'Escape') closeLoupe();
      else if (e.key === 'ArrowLeft') showLoupe(current - 1);
      else if (e.key === 'ArrowRight') showLoupe(current + 1);
      else if (e.key === 'Tab') {
        const focusables = $$('button', loupe);
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    });
  }

  /* ---------- Contact form (Formspree) ---------- */
  const form = $('#contact-form');
  if (form) {
    const status = $('.form-status', form);
    const submitBtn = $('button[type="submit"]', form);
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.className = 'form-status';
      status.textContent = 'Sending the record…';
      submitBtn.disabled = true;
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });
        if (res.ok) {
          form.reset();
          status.classList.add('is-ok');
          status.textContent = 'Record received. I’ll reply within a few hours.';
        } else {
          throw new Error('formspree');
        }
      } catch {
        status.classList.add('is-error');
        status.textContent = 'The record didn’t send. Try again, or write on WhatsApp: +971 58 532 4519.';
      } finally {
        submitBtn.disabled = false;
      }
    });
  }

  /* ---------- Year stamp ---------- */
  const year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
