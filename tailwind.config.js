module.exports = {
  content: ["./src/**/*.{html,tsx,ts}", "./index.html"],
  theme: {
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
    },
    colors: {
      black: "#000000",
      white: "#ffffff",
      blue: "#0052A5",
      gray: { 100: "#F1F1F1", 500: "#979797" },
    },
    fontSize: {
      xxs: ["10px", "10px"],
      xs: ["14px", "14px"],
      sm: ["15px", "15px"],
      md: ["16px", "16px"],
      lg: ["18px", "18px"],
      xxl: ["32px", "32px"],
    },
  },
  variants: {},
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  plugins: [require("@headlessui/tailwindcss")({ prefix: "ui" })],
};
