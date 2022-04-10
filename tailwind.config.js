/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const { blackA, mauveDark, whiteA } = require("@radix-ui/colors");

module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: blackA.blackA12,
        white: whiteA.whiteA12,
        gray: {
          solid: mauveDark.mauve9,
          background: {
            main: mauveDark.mauve1,
            code: mauveDark.mauve2,
            component: mauveDark.mauve3,
            hover: mauveDark.mauve4,
            active: mauveDark.mauve5,
          },
          border: {
            "non-interactive": mauveDark.mauve6,
            interactive: mauveDark.mauve7,
            hover: mauveDark.mauve8,
          },
          font: {
            low: mauveDark.mauve11,
            high: mauveDark.mauve12,
          },
        },
      },
    },
  },
  plugins: [],
};
