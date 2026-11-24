// Small vanilla script of the blog: menu button, topics menu, table of contents, copy link. No library.
(function () {
  'use strict';

  // Menu button of the narrow header
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('primary-nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
        btn.focus();
      }
    });
  }

  // The topics menu closes on a click outside it and on Escape
  var dd = document.querySelector('.nav-dd');
  if (dd) {
    document.addEventListener('click', function (e) { if (dd.open && !dd.contains(e.target)) { dd.open = false; } });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && dd.open) { dd.open = false; dd.querySelector('summary').focus(); } });
  }

  // Table of contents from the h2 and h3 of the article (kramdown gives them ids). Shown when there are at least three.
  var toc = document.querySelector('[data-toc]');
  var content = document.querySelector('.post-content');
  // A post that carries its own contents list (<details class="toc">) keeps that one
  if (toc && content && !content.querySelector('.toc')) {
    var heads = content.querySelectorAll('h2[id], h3[id]');
    if (heads.length >= 3) {
      var list = document.createElement('ol');
      Array.prototype.forEach.call(heads, function (h) {
        var li = document.createElement('li');
        if (h.tagName === 'H3') { li.className = 'sub'; }
        var a = document.createElement('a');
        a.href = '#' + h.id;
        a.textContent = h.textContent;
        li.appendChild(a);
        list.appendChild(li);
      });
      var slot = toc.querySelector('[data-toc-list]');
      slot.appendChild(list);
      toc.hidden = false;
      if (content.closest('.article-body')) { content.closest('.article-body').classList.add('article-body--toc'); }
      // Open the details on a wide screen, where the contents sit beside the text
      var det = toc.querySelector('details');
      if (det && window.matchMedia && window.matchMedia('(min-width: 1180px)').matches) { det.open = true; }
      if ('IntersectionObserver' in window) {
        var links = list.querySelectorAll('a');
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting) {
              Array.prototype.forEach.call(links, function (l) { l.classList.toggle('is-active', l.getAttribute('href') === '#' + en.target.id); });
            }
          });
        }, { rootMargin: '-80px 0px -70% 0px' });
        Array.prototype.forEach.call(heads, function (h) { io.observe(h); });
      }
    }
  }

  // Copy the article address
  var copy = document.querySelector('.share-copy');
  var note = document.querySelector('.share-copied');
  if (copy && note) {
    var done = function (ok) {
      note.textContent = ok ? 'Tautan disalin' : 'Gagal menyalin, salin dari bilah alamat';
      note.hidden = false;
      setTimeout(function () { note.hidden = true; }, 2500);
    };
    copy.addEventListener('click', function () {
      var url = copy.getAttribute('data-url');
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(url).then(function () { done(true); }, function () { done(false); });
        return;
      }
      var ta = document.createElement('textarea');
      ta.value = url; ta.setAttribute('readonly', ''); ta.style.position = 'absolute'; ta.style.left = '-9999px';
      document.body.appendChild(ta); ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      done(ok);
    });
  }
})();
