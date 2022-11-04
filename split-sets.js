const fs = require("fs");

const tokens = JSON.parse(fs.readFileSync("tokens.json"));

for (const [set, value] of Object.entries(tokens)) {
  if (set.includes("$")) break;

  fs.writeFileSync(
    "tokens/" + set + ".json",
    JSON.stringify({ [set]: value }).replaceAll(':"{', ':"{global.')
  );
}
