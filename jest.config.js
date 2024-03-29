module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css|less)$':
      '<rootDir>/__mocks__/fileMock.{j,t}s',
  },
  setupFilesAfterEnv: ['<rootDir>/template/src/setupTests.{j,t}s'],
};
