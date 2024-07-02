/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./node_modules/flowbite-react/lib/**/*.js",
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
      "./public/**/*.html",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "custom-image": "url('/assets/svg/abstract-bg-4.svg')",
      },
       borderRadius: {
        'custom-card-header': '0.6875rem 0.6875rem 0 0',
      },
        boxShadow: {
        'custom-shadow': '0 10px 40px 10px rgba(140, 152, 164, .175)',
      },
         borderColor: {
        'custom-gray': '#e7eaf3',
      },
        fontSize: {
        'xs-custom': '.8125rem', // Add custom font size
        '80p': '0.7rem',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.card-header-first-child': {
          '@apply border-t border-l border-r border-solid border-gray-200': {},
          'border-radius': '0.6875rem 0.6875rem 0 0',
        },
      });
    },
      require("flowbite/plugin")({
      charts: true,
  }),
  ],
};
