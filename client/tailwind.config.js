module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        './node_modules/tw-elements/dist/js/**/*.js',
    ],
    theme: {
        extend: {
            colors: {
                'mid-gray': 'rgba(0, 0, 0, 0.2)',
            },
        },
    },
    plugins: [require('tw-elements/dist/plugin')],
};
