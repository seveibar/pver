/* eslint-env node */
module.exports = {
  extends: ["./node_modules/@seamapi/eslint-configs/std1"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint"],
  root: true,
}
