---
layout: main
title: Tags
---

{% for tag in collections.tagList %}

<span>
    <a href="/tags/{{ tag }}">
        <button class="bg-white text-base hover:bg-gray-100 text-stone-800 font-semibold py-1 px-3 border border-stone-400 rounded-full shadow mr-6 mb-4">
            {{ tag }}
        </button>
    </a>
</span>
{% endfor %}