module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        './node_modules/tw-elements/dist/js/**/*.js',
    ],
    theme: {
        extend: {
            colors: {
                'mid-gray': 'rgba(0, 0, 0, 0.175)',
                'mid-gray-hover': 'rgba(0, 0, 0, 0.15)',
            },
        },
    },
    plugins: [require('tw-elements/dist/plugin')],
};
