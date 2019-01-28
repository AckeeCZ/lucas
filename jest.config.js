module.exports = {
    roots: ['<rootDir>/src'],
    testPathIgnorePatterns: ['/node_modules', '/lib'],
    setupTestFrameworkScriptFile: './configure-jest.js',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
