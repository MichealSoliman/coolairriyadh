/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./404.html",
    "./js/**/*.js",
    "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10243A',
          dark: '#091827',
        },
        accent: {
          DEFAULT: '#00A8E8',
          dark: '#087FB5',
        },
        'cyan-light': '#E6F8FF',
        surface: '#F4F8FB',
        text: '#172B3A',
        muted: '#64748B',
        border: '#DCE7EF',
        success: '#16865B',
      },
      fontFamily: {
        cairo: ['Cairo', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        'card': '16px',
        'card-lg': '20px',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(16, 36, 58, 0.06)',
        'card': '0 10px 30px -4px rgba(16, 36, 58, 0.08)',
        'card-hover': '0 20px 40px -4px rgba(0, 168, 232, 0.14), 0 10px 24px -6px rgba(16, 36, 58, 0.08)',
        'elevated': '0 25px 50px -12px rgba(16, 36, 58, 0.18)',
      },
      maxWidth: {
        'container': '1280px',
      }
    },
  },
  plugins: [],
}
