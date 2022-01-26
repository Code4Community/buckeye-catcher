import commonjs from "@rollup/plugin-commonjs"
import { nodeResolve } from "@rollup/plugin-node-resolve";
import css from "rollup-plugin-import-css";

export default {
  input: "src/main.js",
  output: {
    file: "dist/main.bundle.js",
    format: "cjs",
  },
  plugins: [
    css(),
    nodeResolve(), 
    commonjs()
  ],
};