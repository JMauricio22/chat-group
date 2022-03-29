module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#252229',
      },
      spacing: {
        110: '27.5rem',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
