const BABEL_ENV = process.env.BABEL_ENV;
const building = BABEL_ENV != undefined && BABEL_ENV !== "cjs";

const plugins = [];

if (process.env.NODE_ENV === "production") {
  plugins.push("dev-expression", "transform-react-remove-prop-types");
}

module.exports = {
  presets: [
    [
      "env",
      {
        loose: true,
        modules: building ? false : "commonjs"
      }
    ],
    "react"
  ],
  plugins: plugins
};
