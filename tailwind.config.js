const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

module.exports = {
  // darkMode: 'class',
  content: ['./src/**/*.md', './src/**/*.html', './src/_includes/**/*.njk'],
  theme: {
    screens: {
      // widen medium breakpoint
      md: '868px',
    },
    extend: {
      fontFamily: {
        // Add Inter to default sans stack after San Francisco and before other system fonts.
        'sans': [
          '-apple-system', 'BlinkMacSystemFont', 'Inter var','Inter','ui-sans-serif', 'system-ui',...defaultTheme.fontFamily.sans,
        ],
        // Custom wide font with regular sans fonts as backup
        'wide': [
          'Druk Text Wide', 'Inter var', 'system-ui', 'sans-serif'
        ]
      },
      screens: {
        // new small breakpoint so I can reduce margins on mobile in main.njk
        ntiny: '416px',
        mdOg: '768px',
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            // Adjusted Tailwind default so that prose width only applies to <p> tags
            maxWidth: 'none',
            p: {
              maxWidth: '65ch',
            },
            ul: {
              maxWidth: '65ch',
            },
            // Adjusted Tailwind default to un-bold quotes and make the line thinner
            blockquote: {
              fontWeight: '400',
              borderLeftWidth: '1px',
            },
          }
        },
        stone: {
          css: {
            '--tw-prose-body': theme('colors.stone.800'),
            '--tw-prose-hr': theme('colors.stone.300'),
            '--tw-prose-quotes': theme('colors.stone.600'),
            '--tw-prose-quote-borders': theme('colors.stone.300'),
            '--tw-prose-th-borders': theme('colors.stone.300'),
            '--tw-prose-invert-body': theme('colors.stone.50 / 98%'),
            '--tw-prose-invert-links': theme('colors.stone.50 / 98%'),
            '--tw-prose-invert-bold': theme('colors.stone.50 / 98%'),
            '--tw-prose-invert-counters': theme('colors.stone.50 / 75%'),
            '--tw-prose-invert-bullets': theme('colors.stone.100 / 40%'),
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
    require('@tailwindcss/typography'),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
}