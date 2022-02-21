module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        './node_modules/tw-elements/dist/js/**/*.js',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'mid-gray': 'rgba(0, 0, 0, 0.15)',
                'mid-gray-hover': 'rgb(0, 0, 0, 0.1)',
                'theme-red': '#ff6384',
                'theme-red-light': '#f9acbd',
                'theme-blue': '#35a2eb',
                'theme-blue-light': '#94cbf1',
                transparent: 'transparent',
            },
            keyframes: {
                reverse: {
                    '0%': {},
                },
            },
        },
    },
    plugins: [require('tw-elements/dist/plugin')],
};
