---
layout: main
title: Tags
---

<p class="title-wide mb-6">
    Tags
</p>

{% for tag in collections.tagList %}

<span>
    <a href="/tags/{{ tag }}">
        <button class="text-base inline-block py-1 px-3 rounded-lg text-stone-600 dark:text-stone-50/[.80] border border-stone-300 dark:border-stone-50/25  hover:-translate-y-[0.08rem] hover:shadow-md hover:bg-white dark:hover:bg-stone-900 hover:text-stone-900 dark:hover:text-stone-50 transition mr-6">
            {{ tag }}
        </button>
    </a>
</span>
{% endfor %}