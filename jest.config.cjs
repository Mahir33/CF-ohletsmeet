module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', 
  },
  moduleFileExtensions: ['js', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'], 
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/src/api.js",
    "/auth-server/handler.test.js"
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/auth-server/handler.test.js" 
  ],
};