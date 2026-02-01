import { colors } from './src/design-system/tokens/colors'
import { spacing } from './src/design-system/tokens/spacing'
import { radius } from './src/design-system/tokens/radius'
import { typography } from './src/design-system/tokens/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      // Mobile-first
      sm: '640px',   // Mobile
      md: '768px',   // Tablet
      lg: '1024px',  // Desktop
    },
    extend: {
      colors: {
        primary: colors.primary,
        secondary: colors.secondary,
        accent: colors.accent,

        text: {
          heading: colors.text.heading,
          body: colors.text.body,
          muted: colors.text.muted,
          inverse: colors.text.inverse,
        },

        background: {
          page: colors.background.page,
          card: colors.background.card,
          subtle: colors.background.subtle,
        },

        border: {
          DEFAULT: colors.border.default,
          strong: colors.border.strong,
        },

        status: {
          success: colors.status.success,
          error: colors.status.error,
          warning: colors.status.warning,
          info: colors.status.info,
        },
      },

      spacing: {
        xs: `${spacing.xs}px`,
        sm: `${spacing.sm}px`,
        md: `${spacing.md}px`,
        lg: `${spacing.lg}px`,
        xl: `${spacing.xl}px`,
        '2xl': `${spacing['2xl']}px`,
      },


      borderRadius: {
        sm: radius.sm,
        md: radius.md,
        lg: radius.lg,
        full: radius.pill,
      },

      fontFamily: {
        sans: [typography.fontFamily],
      },

      fontSize: {
        h1: [typography.h1.size, typography.h1.lineHeight],
        h2: [typography.h2.size, typography.h2.lineHeight],
        h3: [typography.h3.size, typography.h3.lineHeight],
        body: [typography.body.size, typography.body.lineHeight],
        small: [typography.small.size, typography.small.lineHeight],
        button: [typography.button.size, typography.button.lineHeight],
      },

      fontWeight: {
        heading: typography.h1.weight,
        body: typography.body.weight,
        button: typography.button.weight,
      },
    },
  },
  plugins: [],
}
