(function () {
  'use strict';

  var nav = document.getElementById('nav');
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('nav-menu');

  /* Nav: solid backdrop after leaving the hero top */
  var onScroll = function () {
    nav.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  toggle.addEventListener('click', function () {
    var open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    menu.classList.toggle('is-open', !open);
  });
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
    }
  });

  /* Scroll reveals */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* Gallery filter */
  var chips = document.querySelectorAll('.chip');
  var shots = Array.prototype.slice.call(document.querySelectorAll('.shot'));
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) {
        var active = c === chip;
        c.classList.toggle('is-active', active);
        c.setAttribute('aria-pressed', String(active));
      });
      var filter = chip.dataset.filter;
      shots.forEach(function (shot) {
        shot.classList.toggle('is-hidden', filter !== 'all' && shot.dataset.cat !== filter);
      });
    });
  });

  /* Lightbox */
  var lightbox = document.getElementById('lightbox');
  var lbImg = document.getElementById('lb-img');
  var current = -1;

  var visibleShots = function () {
    return shots.filter(function (s) { return !s.classList.contains('is-hidden'); });
  };

  var show = function (shot) {
    var list = visibleShots();
    current = list.indexOf(shot);
    lbImg.src = shot.dataset.full;
    lbImg.alt = shot.querySelector('img').alt;
  };

  var open = function (shot) {
    show(shot);
    lightbox.hidden = false;
    requestAnimationFrame(function () { lightbox.classList.add('is-open'); });
    document.body.style.overflow = 'hidden';
    lightbox.querySelector('.lb-close').focus();
  };

  var close = function () {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(function () { lightbox.hidden = true; lbImg.removeAttribute('src'); }, 350);
    if (current > -1) {
      var list = visibleShots();
      if (list[current]) list[current].focus();
    }
  };

  var step = function (dir) {
    var list = visibleShots();
    if (!list.length) return;
    current = (current + dir + list.length) % list.length;
    lbImg.src = list[current].dataset.full;
    lbImg.alt = list[current].querySelector('img').alt;
  };

  shots.forEach(function (shot) {
    shot.addEventListener('click', function () { open(shot); });
  });
  lightbox.querySelector('.lb-close').addEventListener('click', close);
  lightbox.querySelector('.lb-prev').addEventListener('click', function () { step(-1); });
  lightbox.querySelector('.lb-next').addEventListener('click', function () { step(1); });
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) close();
  });
  document.addEventListener('keydown', function (e) {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'Tab') {
      var focusables = lightbox.querySelectorAll('button');
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (!lightbox.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  /* Contact form → Formspree */
  var form = document.getElementById('contact-form');
  var status = form.querySelector('.form-status');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    status.className = 'form-status';
    status.textContent = 'Sending…';
    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    }).then(function (response) {
      if (response.ok) {
        form.reset();
        status.className = 'form-status ok';
        status.textContent = 'Message sent! I’ll get back to you within a few hours.';
      } else {
        throw new Error('Formspree error');
      }
    }).catch(function () {
      status.className = 'form-status error';
      status.textContent = 'Something went wrong. Message me on WhatsApp instead: +971 58 532 4519.';
    }).finally(function () {
      button.disabled = false;
    });
  });

  /* Footer year */
  document.getElementById('year').textContent = String(new Date().getFullYear());
})();
