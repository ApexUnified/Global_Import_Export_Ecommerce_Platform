import forms from '@tailwindcss/forms';
import scrollbar from 'tailwind-scrollbar';
import typography from '@tailwindcss/typography';


/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

     darkMode: 'class',

    theme: {
        extend: {
            fontFamily: {
                outfit: ['Outfit', 'sans-serif'],
            },
        },
    },

    plugins: [forms,scrollbar,typography, function ({ addUtilities }) {
      addUtilities({
        '.page-break': {
          'page-break-before': 'always',
        },
        '.no-break': {
          'page-break-inside': 'avoid',
          'break-inside': 'avoid',
        },
      });
    },],
};
