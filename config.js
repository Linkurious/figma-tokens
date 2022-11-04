module.exports = {
  source: ["style-dic-tokens.json"],
  platforms: {
    css: {
      transforms: ["attribute/cti", "name/cti/kebab"],
      files: [
        {
          format: "css/variables",
          destination: "tokens.css",
        },
      ],
    },
  },
};
