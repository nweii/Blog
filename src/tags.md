---
layout: main
title: Tags
---

<p class="title-wide mb-6">
    Tags
</p>

{% for tag in collections.tagList %}
{% for post in collections[tag] %}
{% if post.data.published %}
<span>
    <a href="/tags/{{ tag }}">
        <button class="text-base inline-block py-1 px-3 rounded-lg text-stone-600 dark:text-stone-50/[.80] border border-stone-300 dark:border-stone-50/25 link-container-hover mr-6 mb-6">
            {{ tag }}
        </button>
    </a>
</span>
{% endif %}
{% endfor %}
{% endfor %}