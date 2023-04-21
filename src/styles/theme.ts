import { extendTheme } from 'native-base';

export const THEME = extendTheme({
  colors: {
    primary: {
      700: '#996DFF',
      500: '#8257E5',
    },
    secondary: {
      700: '#FBA94C'
    },
    blueGray: {
      900: '#0f172a',
      800: '#1e293b',
      700: '#334155',
      600: '#475569',
      500: '#64748b',
      400: '#94a3b8',
      300: '#cbd5e1',
      200: '#e2e8f0',
      100: '#f1f5f9',
      50: '#f8fafc',
    },
    green: {
      700: '#00875F',
      500: '#00B37E',
      300: '#04D361',
    },
    gray: {
      700: '#121214',
      600: '#202024',
      500: '#29292E',
      400: '#323238',
      300: '#7C7C8A',
      200: '#C4C4CC',
      100: '#E1E1E6'
    },
    white: '#FFFFFF'
  },
  fonts: {
    heading: 'Roboto_700Bold',
    body: 'Roboto_400Regular',
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
  },
  sizes: {
    14: 56
  }
});