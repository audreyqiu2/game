import { nodeResolve } from "@rollup/plugin-node-resolve";
import copy from "rollup-plugin-copy";

module.exports = {
  input: "sketch.js",
  output: {
    dir: "dist",
  },
  plugins: [
    copy({
      targets: [{ src: ["index.html", "sketch_style.css", "sketch.js"], dest: "dist" }],
    }),
    nodeResolve(),
  ],
};