module.exports = {
  moduleDirectories: ['node_modules', 'src'],
  collectCoverageFrom: [
    "src/**.{js,jsx}",
    "src/components/**",
    "!src/index.js",
    "!src/setupTests.js"
  ]
};
