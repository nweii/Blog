---
layout: main
pagination:
  data: collections
  size: 1
  alias: tag
permalink: /tags/{{ tag | slugify }}/
eleventyComputed:
  title: "{{ tag }}"
---  
<p class="title-wide mb-6">
  Posts tagged <span class="ml-1 font-sans py-0.5 px-2 rounded-lg text-stone-900/[.48] dark:text-stone-50/[.55] border border-stone-300 dark:border-stone-50/[.30]">{{ tag }}</span>
</p>
<!-- Enclose post list with div -->
<div>
{% for post in collections[tag] %}
<div class="space-y-2 mb-5">
    <p class="date">{{ post.date | postDate }}</p>
    <p class="text-wide post-title link-hover">
      <a href="{{ post.url }}">{{ post.data.title }}</a>
    </p>
</div>
{% endfor %}
</div>

