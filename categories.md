---
layout: page
title: Categories
permalink: /categories/
---

{% assign cats = site.categories | sort %}

{% if site.posts.size > 0 %}
<div class="tag-cloud mb-5">
  {% for cat in cats %}
  <a href="#{{ cat[0] | slugify }}" class="badge badge-primary badge-pill" title="{{ cat[1].size }} post{% if cat[1].size != 1 %}s{% endif %}">{{ cat[0] }} <span class="tag-count">{{ cat[1].size }}</span></a>
  {% endfor %}
</div>

{% for cat in cats %}
<section id="{{ cat[0] | slugify }}" class="category-section">
  <h2 class="category-title">{{ cat[0] }} <small class="text-muted">({{ cat[1].size }})</small></h2>
  <ul class="list-group list-group-flush mb-5">
    {% for post in cat[1] %}
    <li class="list-group-item d-flex justify-content-between align-items-start px-0">
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      <time datetime="{{ post.date | date_to_xmlschema }}" class="text-muted small text-nowrap ml-3">{{ post.date | date: "%Y-%m-%d" }}</time>
    </li>
    {% endfor %}
  </ul>
</section>
{% endfor %}
{% else %}
<p>No posts yet.</p>
{% endif %}
