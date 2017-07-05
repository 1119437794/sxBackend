// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: "babel-eslint",
    parserOptions: {
        sourceType: "module"
    },
    env: {
        browser: true,
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: "vue",
    // required to lint *.vue files
    plugins: [
        "html"
    ],
    // add your custom rules here
    "rules": {
        "no-cond-assign": "error",
        "no-constant-condition": "error",
        "no-dupe-args": "error",
        "no-dupe-keys": "error",
        "no-duplicate-case": "error",
        "no-empty-character-class": "error",
        "no-empty": "error",
        "no-ex-assign": "error",
        "no-extra-boolean-cast": "error",
        "no-extra-semi": "error",
        "no-func-assign": "error",
        "no-inner-declarations": "error",
        "no-invalid-regexp": "error",
        "no-irregular-whitespace": "error",
        "no-obj-calls": "error",
        "no-regex-spaces": "error",
        "no-sparse-arrays": "error",
        "no-unexpected-multiline": "error",
        "no-unreachable": "error",
        "no-unsafe-finally": "error",
        "use-isnan": "error",
        "valid-typeof": "error",
        "accessor-pairs": "error",
        "eqeqeq": "error",
        "guard-for-in": "error",
        "no-caller": "error",
        "no-case-declarations": "error",
        "no-else-return": "error",
        "no-empty-function": "error",
        "no-empty-pattern": "error",
        "no-eval": "error",
        "no-redeclare": "error",
        "radix": "error",
        "no-delete-var": "error",
        "quotes": ["error", "single"],
        "indent": ["error", 4],
        "no-lonely-if": "error",
        "no-self-assign": "error",

        // allow paren-less arrow functions
        "arrow-parens": 0,
        // allow async-await
        "generator-star-spacing": 0,

        "no-alert": process.env.NODE_ENV === "production" ? 2 : 0,
        // "no-console": process.env.NODE_ENV === "production" ? 2 : 0,
        // allow debugger during development
        "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0
  }
}
