import commonjs from "@rollup/plugin-commonjs"
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: "src/main.js",
  output: {
    file: "dist/main.bundle.js",
    format: "cjs",
  },
  plugins: [nodeResolve(), commonjs()],
};