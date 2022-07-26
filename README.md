# Blog

My personal blog, forked from [this Eleventy starter template](https://github.com/httpsterio/11ty-blog-njk-starter). 

## New features I added
- Redesigned with two-column layout on medium+ screen sizes (and consolidated default.njk into main.njk), new tag appearance, and more.
- Updated Tailwind
- RSS feed
- Automatic dark mode
- [Quotebacks](https://github.com/Blogger-Peer-Review/quotebacks) integration with auto dark mode
- Prose width optimized for readability (max width is 65 characters) while images go to full width

## Original template features
- Static Site Gen - Eleventy

- Tailwind CSS v2.0 / Tailwind Typography / Dark Mode

- Create excerpts using the `<!-- excerpt -->`

- Custom ReadTime filter

- 404 page

+ Tags page to view posts related to tag
  - Use of a `tagList` collection defined in `.eleventy.js`
  - `/tags` - show all available tags (excluding all and posts) as buttons (`tags.md`)
  - `/tags/tag-name` - shows all posts related to that tag (`tagList.md`)

+ Sitemap and Robots.txt 
  - Change site url in `_data/site.json`

+ Shortcode to handle images
  - Add image under `src/assets/img/posts` and use the asset_img short code
  - `{% asset_img 'filename' 'alt_text' %}` eg. `{% asset_img 'mailbox.jpg' 'picture of a mailbox' %}`
  - You can provide an optional third argument if your image isn't inside `src/assets/img/posts`
  - eg. `{% asset_img 'mailbox.jpg' 'picture of a mailbox' '/images/' ` 

- Draft posts using the `published` frontmatter

+ Posts pagination in `index.html` 
  - change the `size` frontmatter variable
- ESLint

+ Bash script to create new post (based on YYYY and MM)
```bash
$ ./create new blog post
Created new post at src/posts/2021/01/new-blog-post.md
```