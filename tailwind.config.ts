import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "320px",
      },
      fontFamily: {
        primary: "var(--font-primary)",
        primaryBold: "var(--font-primary-bold)",
        primaryLight: "var(--font-primary-light)",
        secondary: "var(--font-secondary)",
        secondaryBold: "var(--font-secondary-bold)",
        secondaryLight: "var(--font-secondary-light)",
      },
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        tertiary: "var(--tertiary-color)",

        alertDanger: "var(--alert-danger-color)",
        alertSuccess: "var(--alert-success-color)",
        alertWarning: "var(--alert-warning-color)",
        alertInfo: "var(--alert-info-color)",

        hover: "var(--hover-color)",
        disabled: "var(--inactive-color)",
      },
      fontSize: {
        xs: "var(--font-size-xs)",
        small: "var(--font-size-small)",
        medium: "var(--font-size-medium)",
        large: "var(--font-size-large)",
        xlarge: "var(--font-size-xlarge)",
      },
      padding: {
        paddingElement: "var(--padding-element)",
      },
      margin: {
        marginTop: "var(--mt)",
        marginBottom: "var(--mb)",
        marginBottomSection: "var(--mb-section)",
      },
    },
  },
  plugins: [],
} satisfies Config;