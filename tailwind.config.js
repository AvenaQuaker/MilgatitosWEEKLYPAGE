/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {
            fontFamily: {
                fredoka: ["fredoka", "sans-serif"],
                onigiri: ["Super Onigiri", "sans-serif"],
            },
        },
    },
    plugins: [],
};
