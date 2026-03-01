import { colors } from './src/design-system/tokens/colors'
import { spacing } from './src/design-system/tokens/spacing'
import { typography } from './src/design-system/tokens/typography'
import { radius } from './src/design-system/tokens/radius'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
    },
    extend: {
      colors: {
        brand: {
          primary: colors.brand.primary,
        },
        dark: colors.dark,
        light: colors.light,
        gray: {
          900: colors.gray[900],
          700: colors.gray[700],
          600: colors.gray[600],
          500: colors.gray[500],
          400: colors.gray[400],
          200: colors.gray[200],
          100: colors.gray[100],
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
        sm: `${radius.sm}px`,
        md: `${radius.md}px`,
        lg: `${radius.lg}px`,
        xl: `${radius.xl}px`,
      },
    },
  },
  plugins: [],
}
