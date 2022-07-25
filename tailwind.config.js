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
          '-apple-system', 'BlinkMacSystemFont', 'Inter var','Inter','ui-sans-serif', 'system-ui',...defaultTheme.fontFamily.sans,
        ],
        'wide': [
          'Druk Text Wide', 'Inter var', 'system-ui', 'sans-serif'
        ]
      },
      screens: {
        xs: '868px',
      },
      typography: ({ theme }) => ({
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
        },
        stone: {
          css: {
            '--tw-prose-body': theme('colors.stone[800]'),
            '--tw-prose-quotes': theme('colors.stone[600]'),
            '--tw-prose-invert-body': theme('colors.stone.50 / 98%'),
            '--tw-prose-invert-links': theme('colors.stone.50 / 98%'),
            '--tw-prose-invert-bold': theme('colors.stone.50 / 98%'),
            '--tw-prose-invert-counters': theme('colors.stone.50 / 75%'),
            '--tw-prose-invert-bullets': theme('colors.stone.100 / 35%'),
            '--tw-prose-invert-hr': theme('colors.stone.100 / 25%'),
            '--tw-prose-invert-quotes': theme('colors.stone.50 / 80%'),
            '--tw-prose-invert-quote-borders': theme('colors.stone.100 / 25%'),
            '--tw-prose-invert-th-borders': theme('colors.stone.100 / 25%'),
            '--tw-prose-invert-td-borders': theme('colors.stone.100 / 10%'),
          }
        }
      })
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}