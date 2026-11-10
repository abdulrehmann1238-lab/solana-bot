/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#F7F8F6',
          surface: '#FFFFFF',
          subtle: '#F0F2EF',
          softGreen: '#EAF2EC',
          softBlue: '#EDF2F6',
        },
        text: {
          main: '#202923',
          secondary: '#737C76',
          muted: '#9AA39D',
        },
        brand: {
          forest: '#315E4B',
          forestDark: '#244738',
          forestHover: '#2A5241',
          sage: '#769584',
          sageLight: '#94ADA0',
          blueGray: '#71869A',
        },
        financial: {
          positive: '#388568',
          positiveBg: 'rgba(56, 133, 104, 0.09)',
          negative: '#C46C68',
          negativeBg: 'rgba(196, 108, 104, 0.09)',
          warning: '#B58B4E',
          warningBg: 'rgba(181, 139, 78, 0.1)',
        },
        border: {
          subtle: '#E7EBE6',
          focus: '#315E4B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Manrope', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        'fintech': '12px',
        'fintech-lg': '16px',
        'fintech-sm': '8px',
      },
      boxShadow: {
        'fintech-sm': '0 1px 2px 0 rgba(32, 41, 35, 0.03)',
        'fintech': '0 2px 8px -2px rgba(32, 41, 35, 0.04), 0 1px 4px -1px rgba(32, 41, 35, 0.02)',
        'fintech-hover': '0 8px 24px -4px rgba(32, 41, 35, 0.07), 0 2px 6px -1px rgba(32, 41, 35, 0.03)',
        'fintech-modal': '0 20px 48px -8px rgba(32, 41, 35, 0.12), 0 4px 12px -2px rgba(32, 41, 35, 0.05)',
      }
    },
  },
  plugins: [],
}

