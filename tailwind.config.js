module.exports = {
  // darkMode: 'class',
  content: ['./src/**/*.md', './src/**/*.html', './src/_includes/**/*.njk'],
  theme: {
    screens: {
      md: '868px',
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            p: {
              maxWidth: '65ch',
            },
            blockquote: {
              fontWeight: '400',
              borderLeftWidth: '1px',
            },
          }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}