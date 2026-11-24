---
layout: page
title: Categories
heading: Topics
lede: Semua kategori, dengan tulisan di dalamnya.
permalink: /categories/
wide: true
---

{% assign cats = site.categories | sort %}

{% if site.posts.size > 0 %}
<div class="tag-cloud">
  {% for cat in cats %}
  <a href="#{{ cat[0] | slugify }}" class="badge" title="{{ cat[1].size }} post{% if cat[1].size != 1 %}s{% endif %}">{{ cat[0] }} <span class="tag-count">{{ cat[1].size }}</span></a>
  {% endfor %}
</div>

{% for cat in cats %}
<section id="{{ cat[0] | slugify }}" class="category-section">
  <h2 class="category-title">{{ cat[0] }} <small class="text-muted">({{ cat[1].size }})</small></h2>
  <ul class="archive-list">
    {% for post in cat[1] %}
    <li>
      <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%Y-%m-%d" }}</time>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    </li>
    {% endfor %}
  </ul>
</section>
{% endfor %}
{% else %}
<p>No posts yet.</p>
{% endif %}
