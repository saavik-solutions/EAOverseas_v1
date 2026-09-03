/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": {
                    DEFAULT: "#7a29c2",
                    hover: "#6824a6",
                    light: "#f3e8ff",
                    dark: "#581c87",
                },
                "accent": {
                    DEFAULT: "#0d6cf2",
                    hover: "#0b5ed7",
                    light: "#eff6ff",
                },
                "background-light": "#f6f6f8",
                "background-dark": "#111621",
                "surface-light": "#ffffff",
                "text-main": "#0e121b",
                "text-secondary": "#4d6599",
                "surface-hover": "#f3f4f6",
                "border-subtle": "#e5e7eb",
            },
            fontFamily: {
                "display": ["Plus Jakarta Sans", "sans-serif"],
                "bricolage": ["Bricolage Grotesque", "sans-serif"]
            },
            borderRadius: { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" },
        },
    },
    plugins: [],
}
