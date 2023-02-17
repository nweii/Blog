---
title: Tags
layout: main
---

<h1 class="mb-6">
    Tags
</h1>

<div class="page-content">
{% for tag in collections.tagList %}
<span>
    <a href="/tags/{{ tag }}">
        <button class="text-base inline-block py-1 px-3 rounded-lg text-stone-600 dark:text-stone-50/[.80] border border-stone-300 dark:border-stone-50/25 link-container-hover mr-4 mb-6">
            {{ tag }}
        </button>
    </a>
</span>
{% endfor %}
</div>