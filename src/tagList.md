---
layout: main
pagination:
  data: collections
  size: 1
  alias: tag
permalink: /tags/{{ tag }}/
eleventyComputed:
  title: "{{ tag }}"
---  

<p class="title-wide mb-6">
  Posts tagged <em>{{ tag }}</em>
</p>
<!-- Enclose post list with div -->
<div>
{% for post in collections[tag] %}
<div class="space-y-2 mb-5">
    <p class="date">{{ post.date | postDate }}</p>
    <p class="text-wide post-title hover:text-blue-700 hover:underline">
      <a href="{{ post.url }}">{{ post.data.title }}</a>
    </p>
</div>
{% endfor %}
</div>

