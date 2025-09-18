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

            keyframes: {
                fadeInDown: {
                    '0%': { opacity: 0, transform: 'translateY(-20px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                },
                fadeOutUp: {
                    '0%': { opacity: 1, transform: 'translateY(0)' },
                    '100%': { opacity: 0, transform: 'translateY(-20px)' },
                },
            },
            animation: {
                fadeInDown: 'fadeInDown 0.5s ease-in-out forwards',
                fadeOutUp: 'fadeOutUp 0.5s ease-in-out forwards',
            },
        },
    },

    plugins: [
        forms,
        scrollbar,
        typography,
        function ({ addUtilities }) {
            addUtilities({
                '.page-break': {
                    'page-break-before': 'always',
                },
                '.no-break': {
                    'page-break-inside': 'avoid',
                    'break-inside': 'avoid',
                },
            });
        },
    ],
};
