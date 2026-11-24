---
layout: page
title: Archive
description: Semua tulisan menurut tahun.
permalink: /archive/
wide: true
---

{% assign by_year = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}

<div class="tag-cloud">
  {% for y in by_year %}<a class="badge" href="#y{{ y.name }}">{{ y.name }} <span class="tag-count">{{ y.items.size }}</span></a>{% endfor %}
</div>

{% for y in by_year %}
<section class="year-group" id="y{{ y.name }}">
  <h2>{{ y.name }} <small>{{ y.items.size }} posts</small></h2>
  <ul class="archive-list">
    {% for post in y.items %}
    <li>
      <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%d %b" }}</time>
      <span><a href="{{ post.url | relative_url }}">{{ post.title }}</a>{% if post.categories.size > 0 %}<span class="cat">{{ post.categories.first }}</span>{% endif %}</span>
    </li>
    {% endfor %}
  </ul>
</section>
{% endfor %}
