/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Medical Primary Colors
        primary: {
          50: '#e8f4fd',
          100: '#d1e9fb',
          200: '#a3d2f7',
          300: '#75bcf3',
          400: '#47a5ef',
          500: '#1976d2', // Medical Blue
          600: '#1565c0',
          700: '#0d47a1',
          800: '#0a3d91',
          900: '#063281',
          950: '#042a6b',
        },
        // Medical Secondary Colors
        secondary: {
          50: '#f3e5f5',
          100: '#e1bee7',
          200: '#ce93d8',
          300: '#ba68c8',
          400: '#ab47bc',
          500: '#9c27b0', // Medical Purple
          600: '#8e24aa',
          700: '#7b1fa2',
          800: '#6a1b9a',
          900: '#4a148c',
        },
        // Medical Success (Health/Good)
        success: {
          50: '#e8f5e8',
          100: '#c8e6c9',
          200: '#a5d6a7',
          300: '#81c784',
          400: '#66bb6a',
          500: '#4caf50', // Medical Green
          600: '#43a047',
          700: '#388e3c',
          800: '#2e7d32',
          900: '#1b5e20',
        },
        // Medical Warning (Caution)
        warning: {
          50: '#fff8e1',
          100: '#ffecb3',
          200: '#ffe082',
          300: '#ffd54f',
          400: '#ffca28',
          500: '#ffc107', // Medical Amber
          600: '#ffb300',
          700: '#ffa000',
          800: '#ff8f00',
          900: '#ff6f00',
        },
        // Medical Error (Critical/Danger)
        error: {
          50: '#ffebee',
          100: '#ffcdd2',
          200: '#ef9a9a',
          300: '#e57373',
          400: '#ef5350',
          500: '#f44336', // Medical Red
          600: '#e53935',
          700: '#d32f2f',
          800: '#c62828',
          900: '#b71c1c',
        },
        // Medical Info
        info: {
          50: '#e3f2fd',
          100: '#bbdefb',
          200: '#90caf9',
          300: '#64b5f6',
          400: '#42a5f5',
          500: '#2196f3', // Medical Light Blue
          600: '#1e88e5',
          700: '#1976d2',
          800: '#1565c0',
          900: '#0d47a1',
        },
        // Medical Neutral/Gray Scale
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#eeeeee',
          300: '#e0e0e0',
          400: '#bdbdbd',
          500: '#9e9e9e',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        },
        // Medical Specific Colors
        medical: {
          // Vital Signs
          heartRate: '#e91e63',
          bloodPressure: '#3f51b5',
          temperature: '#ff5722',
          oxygen: '#00bcd4',
          // Diagnostic Colors
          normal: '#4caf50',
          abnormal: '#f44336',
          borderline: '#ff9800',
          critical: '#d32f2f',
          // Specialty Colors
          cardiology: '#e91e63',
          neurology: '#9c27b0',
          ophthalmology: '#2196f3',
          radiology: '#607d8b',
          pathology: '#795548',
          surgery: '#f44336',
        }
      },
      fontFamily: {
        sans: ['Roboto', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        mono: ['Roboto Mono', 'JetBrains Mono', 'Consolas', 'monospace'],
        medical: ['Roboto', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Medical Typography Scale
        'medical-xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.025em' }],
        'medical-sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.025em' }],
        'medical-base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0.015em' }],
        'medical-lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '0.015em' }],
        'medical-xl': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '0.015em' }],
        'medical-2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '0.01em' }],
        'medical-3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '0.01em' }],
        'medical-4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '0.005em' }],
      },
      spacing: {
        // Medical Spacing Scale (8px grid)
        'medical-xs': '0.25rem', // 4px
        'medical-sm': '0.5rem',  // 8px
        'medical-md': '1rem',    // 16px
        'medical-lg': '1.5rem',  // 24px
        'medical-xl': '2rem',    // 32px
        'medical-2xl': '3rem',   // 48px
        'medical-3xl': '4rem',   // 64px
      },
      borderRadius: {
        // Medical Border Radius
        'medical-sm': '0.25rem',
        'medical-md': '0.375rem',
        'medical-lg': '0.5rem',
        'medical-xl': '0.75rem',
        'medical-2xl': '1rem',
      },
      boxShadow: {
        // Material Design Elevation
        'elevation-1': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        'elevation-2': '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        'elevation-3': '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
        'elevation-4': '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
        'elevation-5': '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
        // Medical Specific Shadows
        'medical-card': '0 2px 4px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.1)',
        'medical-elevated': '0 4px 8px rgba(0,0,0,0.12), 0 16px 24px rgba(0,0,0,0.14)',
        'medical-floating': '0 8px 16px rgba(0,0,0,0.15), 0 24px 32px rgba(0,0,0,0.15)',
      },
      animation: {
        // Material Design Animations
        'fade-in': 'fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-out': 'fadeOut 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-down': 'slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'scale-in': 'scaleIn 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        'scale-out': 'scaleOut 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        'ripple': 'ripple 0.6s linear',
        'pulse-medical': 'pulseMedical 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'breathing': 'breathing 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scaleOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.9)', opacity: '0' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
        pulseMedical: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        breathing: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
}