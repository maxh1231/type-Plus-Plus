module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        './node_modules/tw-elements/dist/js/**/*.js',
    ],
    theme: {
        extend: {
            colors: {
                'mid-gray': 'rgba(0, 0, 0, 0.175)',
                'mid-gray-hover': 'rgb(0, 0, 0, 1)',
                'theme-red': '#ff6384',
                'theme-blue': '#35a2eb',
            },
        },
    },
    plugins: [require('tw-elements/dist/plugin')],
};
