---
layout: page
title: Search
description: Cari post berdasarkan judul, kategori, tag, atau isi
permalink: /search/
---

<form id="search-form" class="mb-4" role="search" onsubmit="return false">
  <input type="search" id="search-input" class="form-control form-control-lg" placeholder="Ketik kata kunci..." aria-label="Cari post" autocomplete="off" autofocus>
</form>

<p id="search-status" class="text-muted small" aria-live="polite"></p>
<ul id="search-results" class="list-group list-group-flush mb-5"></ul>

<script src="https://cdn.jsdelivr.net/npm/lunr@2.3.9/lunr.min.js"></script>
<script>
(function () {
  var input = document.getElementById('search-input');
  var status = document.getElementById('search-status');
  var list = document.getElementById('search-results');
  var docs = [], idx = null;

  function esc(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c];
    });
  }

  function snippet(text, terms) {
    var lower = text.toLowerCase(), pos = -1;
    for (var i = 0; i < terms.length && pos < 0; i++) pos = lower.indexOf(terms[i]);
    var start = Math.max(0, pos - 60);
    var out = text.substr(start, 160);
    return (start > 0 ? '…' : '') + out + (start + 160 < text.length ? '…' : '');
  }

  function highlight(html, terms) {
    terms.forEach(function (t) {
      var re = new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
      html = html.replace(re, '<mark>$1</mark>');
    });
    return html;
  }

  function search(q) {
    var terms = q.toLowerCase().split(/\s+/).filter(Boolean).map(function (t) { return t.replace(/[^\p{L}\p{N}]/gu, ''); }).filter(Boolean);
    list.innerHTML = '';
    if (!terms.length) { status.textContent = ''; return; }
    var hits;
    try {
      hits = idx.query(function (query) {
        terms.forEach(function (t) {
          query.term(t, { boost: 10 });
          query.term(t, { wildcard: lunr.Query.wildcard.TRAILING, boost: 3 });
        });
      });
    } catch (e) { hits = []; }
    status.textContent = hits.length + ' hasil untuk "' + q + '"';
    hits.slice(0, 50).forEach(function (h) {
      var d = docs[h.ref];
      var li = document.createElement('li');
      li.className = 'list-group-item px-0 text-break';
      li.innerHTML =
        '<div class="d-flex justify-content-between align-items-start">' +
        '<a href="' + esc(d.url) + '">' + highlight(esc(d.title), terms) + '</a>' +
        '<time class="text-muted small text-nowrap ml-3">' + esc(d.date) + '</time></div>' +
        '<div class="text-muted small mt-1">' + highlight(esc(snippet(d.content, terms)), terms) + '</div>';
      list.appendChild(li);
    });
  }

  status.textContent = 'Memuat indeks…';
  fetch('{{ "/search.json" | relative_url }}').then(function (r) { return r.json(); }).then(function (data) {
    docs = data;
    idx = lunr(function () {
      this.ref('id');
      this.field('title', { boost: 10 });
      this.field('tags', { boost: 5 });
      this.field('categories', { boost: 3 });
      this.field('content');
      data.forEach(function (d, i) {
        this.add({ id: i, title: d.title, tags: d.tags, categories: d.categories, content: d.content });
      }, this);
    });
    status.textContent = '';
    var q = new URLSearchParams(location.search).get('q');
    if (q) { input.value = q; search(q); }
  }).catch(function () { status.textContent = 'Gagal memuat indeks pencarian.'; });

  input.addEventListener('input', function () {
    if (idx) search(input.value);
  });
})();
</script>
