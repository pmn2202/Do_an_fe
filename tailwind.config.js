/* eslint-disable no-undef */

const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  corePlugins: {
    container: false,
  },
  theme: {
    extend: {
      colors: {
        primary: "#FBD77F",
        secondary: "#FCB203",
        back: "#1B6392",
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        ".container": {
          maxWidth: theme("columns.7xl"),
          marginLeft: "auto",
          marginRight: "auto",
          // paddingLeft: theme("spacing.4"),
          // paddingRight: theme("spacing.4"),
        },
      });
    }),
  ],
};
