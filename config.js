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

const pxToRem = function (size) {
  return size / 16 + "rem";
};

StyleDictionary.registerTransform({
  type: `attribute`,
  name: `lk/size/pxToRem`,
  matcher: (token) => {
    return token.type === "size";
  },
  transformer: (token) => {
    // token.value will be resolved and transformed at this point
    token.value = pxToRem(token.value);
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
    return values.join(", ");
  },
});

StyleDictionary.registerTransform({
  type: `value`,
  name: `lk/typography`,
  matcher: (token) => {
    return token.type === "typography";
  },
  transformer: (token) => {
    // token.value will be resolved and transformed at this point
    return `${token.value.fontWeight === "Regular" ? "400" : "500"} ${pxToRem(
      token.value.fontSize
    )}/${pxToRem(token.value.lineHeight)} "${token.value.fontFamily}"`;
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
        "lk/typography",
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
