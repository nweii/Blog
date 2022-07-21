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

<p class="text-3xl font-bold text-stone-400">
  Posts tagged <em>{{ tag }}</em>
</p>
<!-- Enclose post list with div -->
<div>
{% for post in collections[tag] %}
<div class="mb-5">
  <p>
    <span class="text-stone-500 text-xl font-bold hover:underline hover:text-black">
      <a href="{{ post.url }}">{{ post.data.title }}</a></span>
  </p>
  <em>{{ post.date | postDate }}</em>
  <!-- <p class="mt-4">{{ post.data.post_excerpt }}...
    <span class="hover:underline text-indigo-500"><a href="{{ post.url }}">Read More</a></span>
  </p> -->
</div>
{% endfor %}
</div>

