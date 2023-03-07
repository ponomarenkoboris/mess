/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "\.(css|scss|svg|png|jpe?g)$": "<rootDir>/node_modules/identity-obj-proxy",
        "^@assets(.*)$": "<rootDir>/assets/$1",
        "^@utils(.*)$": "<rootDir>/src/utils/$1",
        "^@context(.*)$": "<rootDir>/src/context/$1",
        "^@components(.*)$": "<rootDir>/src/components/$1",
        "^@hooks(.*)$": "<rootDir>/src/hooks/$1",
        "^@layout(.*)$": "<rootDir>/src/layout/$1",
        "^@mixin(.*)$": "<rootDir>/src/mixin/$1",
        "^@store(.*)$": "<rootDir>/src/store/$1",
    },
};