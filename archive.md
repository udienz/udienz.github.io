---
layout: page
title: Archive
description: Browse every article, grouped by publication year.
permalink: /archive/
---
{% assign years = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}
<div class="year-archive">
{% for year in years %}
  <details class="year-group" {% if forloop.first %}open{% endif %}>
    <summary><strong>{{ year.name }}</strong><span>{{ year.items.size }} articles</span></summary>
    <div class="year-posts">
      {% for post in year.items %}
      <a href="{{ post.url | relative_url }}"><span>{{ post.title }}</span><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: '%d %b' }}</time></a>
      {% endfor %}
    </div>
  </details>
{% endfor %}
</div>