module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#252229',
      },
      spacing: {
        110: '27.5rem',
        170: '42.5rem',
      },
      borderWidth: {
        1: '1px',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
