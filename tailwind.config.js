const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  // darkMode: 'class',
  content: ['./src/**/*.md', './src/**/*.html', './src/_includes/**/*.njk'],
  theme: {
    screens: {
      md: '868px',
    },
    extend: {
      fontFamily: {
        'sans': [
          'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Inter var','Inter',
          ...defaultTheme.fontFamily.sans,
        ],
        'wide': [
          'Druk Text Wide', 'sans-serif'
        ]
      },
      screens: {
        xs: '868px',
      },
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