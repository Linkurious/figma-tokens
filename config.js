const StyleDictionary = require("style-dictionary");

StyleDictionary.registerTransform({
  type: `attribute`,
  name: `lk/attribute/sizingToSize`,
  matcher: (token) => {
    return (
      token.type === "sizing" ||
      token.type === "spacing" ||
      token.type === "borderRadius" ||
      token.type === "lineHeights" ||
      token.type === "fontSizes"
    );
  },
  transformer: (token) => {
    // token.value will be resolved and transformed at this point
    token.type = "size";
  },
});

StyleDictionary.registerTransform({
  type: `attribute`,
  name: `lk/size/pxToRem`,
  matcher: (token) => {
    return token.type === "size";
  },
  transformer: (token) => {
    // token.value will be resolved and transformed at this point
    token.value = token.value / 16 + "rem";
  },
});

StyleDictionary.registerTransform({
  type: `value`,
  name: `lk/dropShadow`,
  matcher: (token) => {
    return token.type === "boxShadow";
  },
  transformer: (token) => {
    // token.value will be resolved and transformed at this point
    const values = [];

    token.value.forEach((shadow) => {
      values.push(
        `${shadow.type === "innerShadow" ? "inner" : ""} ${shadow.x}px ${
          shadow.y
        }px ${shadow.spread}px ${shadow.color}`
      );
    });
    console.log("join", values.join(", "));
    return values.join(", ");
  },
});

StyleDictionary.registerTransform({
  type: `attribute`,
  name: `lk/dump`,
  transformer: (token) => {
    // token.value will be resolved and transformed at this point
    console.log(token);
  },
});

module.exports = {
  source: ["style-dic-tokens.json"],
  platforms: {
    css: {
      transforms: [
        "lk/attribute/sizingToSize",
        "attribute/cti",
        "name/cti/camel",
        "lk/size/pxToRem",
        "lk/dropShadow",
      ],
      files: [
        {
          format: "css/variables",
          destination: "tokens.css",
        },
      ],
    },
  },
};
