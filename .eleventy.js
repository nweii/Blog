const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItAttrs = require('markdown-it-attrs');
const markdownItBlock = require('markdown-it-block-image');
const markdownItFootnote = require("markdown-it-footnote");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const { DateTime } = require("luxon");
const slugify = require("slugify");

module.exports = function(eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(syntaxHighlight)
  eleventyConfig.addPlugin(pluginRss);
  
  // To enable merging of tags
  eleventyConfig.setDataDeepMerge(true)

  // Copy these static files to _site folder
  eleventyConfig.addPassthroughCopy('src/assets')
  eleventyConfig.addPassthroughCopy('src/manifest.json')
  eleventyConfig.addPassthroughCopy("quotebackLite.js")

  // To create excerpts
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_alias: 'post_excerpt',
    excerpt_separator: '<!-- excerpt -->'
  })

  // To remove special characters for better links
  eleventyConfig.addFilter("slugify", function (str) {
    return slugify(str, {
      lower: true,
      replacement: "-",
      remove: /[*+~.·,()'"`´%!?¿:@]/g
    }).split('-').slice(0,5).join("-"); // only include first 5 words
  });
  
  // To create a filter that converts straight quotes to curly. See https://charliepark.org/smartquotes_in_eleventy/
  eleventyConfig.addFilter("smartquotes", (post) => {
    const apostrophes = new RegExp(/(?<=<(h|l|p[^r]).*)\b'\b/g);
    const years = new RegExp(/(?<=\s)'(?=\d)/g);
    const openDoubles = new RegExp(/(?<=<(h|l|p[^r]).*)(?<=\s|>)&quot;/g);
    const closeDoubles = new RegExp(/(?<=<(h|l|p[^r]).*“.*)&quot;(?=(\s|\p{P}|<))/gu);
    const openSingles = new RegExp(/((?<=<(h|l|p[^r]).*)(?<=\s|>)|\n)'/g);
    const closeSingles = new RegExp(/(?<=<(h|l|p[^r]).*‘.*)'(?=(\s|\p{P}|<))/gu);
    return post
      .replace(apostrophes, "’").replace(years, "’")
      .replace(openDoubles, "“").replace(closeDoubles, "”")
      .replace(openSingles, "‘").replace(closeSingles, "’");
  });
  
  // to create a filter that removes <footer></footer> tags and all their contents. I'm only using this on the RSS generator (feed.njk), where Quotebacks doesn't run and doesn't need footer data. Otherwise there would be an unnecessary url repeated at the end of every blockquote in plaintext.
  eleventyConfig.addFilter("noQBFooterTags", (post) => {
    const footerTags = new RegExp(/<footer[^>]*>.*?<\/footer>|<footer[^>]*>/gm);
    return post
      .replace(footerTags, "");
  });
  
  // To create a filter to determine duration of post
  eleventyConfig.addFilter('readTime', (value) => {
    const content = value
    const textOnly = content.replace(/(<([^>]+)>)/gi, '')
    const readingSpeedPerMin = 450
    return Math.max(1, Math.floor(textOnly.length / readingSpeedPerMin))
  })

  // filter to format post date to year-month-day
  eleventyConfig.addFilter("postDate", (dateObj) => {
    // return DateTime.fromJSDate(dateObj).toFormat('yyyy-MM-dd');
    return DateTime.fromJSDate(dateObj).toFormat("LLLL d, yyyy");
  })

  // Enable us to iterate over all the tags, excluding posts and all
  eleventyConfig.addCollection('tagList', collection => {
    const tagsSet = new Set()
    collection.getAll().forEach(item => {
      if (!item.data.tags) return
      item.data.tags
        .filter(tag => !['posts', 'all'].includes(tag))
        .forEach(tag => tagsSet.add(tag))
    })
    return Array.from(tagsSet).sort()
  })

  const md = markdownIt({ html: true, linkify: true }).disable('code')
  md.use(markdownItAnchor, { 
    level: [1, 2], 
    permalink: markdownItAnchor.permalink.headerLink({ 
      safariReaderFix: true,
      class: 'header-anchor',
    })
  });
  md.use(markdownItAttrs);
  md.use(markdownItBlock)
  md.use(markdownItFootnote)
  // remove brackets from footnote
  md.renderer.rules.footnote_caption = (tokens, idx) => {
    let n = Number(tokens[idx].meta.id + 1).toString();
    if (tokens[idx].meta.subId > 0) {
      n += ":" + tokens[idx].meta.subId;
    }
    return n + ' ';
  };
  
  // add target="_blank" to all links aka open all links in new window
  // Remember old renderer, if overridden, or proxy to default renderer
  var defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };
  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    // If you are sure other plugins can't add `target` - drop check below
    var aIndex = tokens[idx].attrIndex('target');
  
    if (aIndex < 0) {
      tokens[idx].attrPush(['target', '_blank']); // add new attribute
    } else {
      tokens[idx].attrs[aIndex][1] = '_blank';    // replace value of existing attr
    }
  
    // pass token to default renderer.
    return defaultRender(tokens, idx, options, env, self);
  };
  eleventyConfig.setLibrary('md', md.disable("code"))

  // creates a shortcode that allows inserting images with alt-texts. Usage {% asset_img 'imagename','alt-text' %}
  // you can pass an optional third argument to give the image a custom path. defaults to /assets/img/posts/
  eleventyConfig.addShortcode('asset_img', (filename, alt, path = '/assets/img/posts/') => 
  `<img class="my-4 rounded-md" src="${path}${filename}" alt="${alt}" />`
  )

  return {
    dir: {
      input: 'src'
    }
  }
}