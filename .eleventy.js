const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const markdownItBlock = require('markdown-it-block-image')
const { DateTime } = require("luxon")

module.exports = function(eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(syntaxHighlight)
  
  // To enable merging of tags
  eleventyConfig.setDataDeepMerge(true)

  // Copy these static files to _site folder
  eleventyConfig.addPassthroughCopy('src/assets')
  eleventyConfig.addPassthroughCopy('src/manifest.json')
  eleventyConfig.addPassthroughCopy("quoteback.js")

  // To create excerpts
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_alias: 'post_excerpt',
    excerpt_separator: '<!-- excerpt -->'
  })

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
    return DateTime.fromJSDate(dateObj).toFormat("LLLL MM, yyyy");
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

  const md = markdownIt({ html: true, linkify: true })
  md.use(markdownItAnchor, { 
    level: [1, 2], 
    permalink: markdownItAnchor.permalink.headerLink({ 
      safariReaderFix: true,
      class: 'header-anchor',
    })
  })
  md.use(markdownItBlock)
  eleventyConfig.setLibrary('md', md)

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