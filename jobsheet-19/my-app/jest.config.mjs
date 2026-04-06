// jest.config.mjs

import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

const config = {
  testEnvironment: "jsdom",
  modulePaths: ['<rootDir>/src/'],
  collectCoverage: true,
  // collectCoverageFrom: [
  //   '**/*.{ts,tsx}',
  //   '**/*.d.ts',
  //   '!**/node_modules/**',
  //   '!**/.next/**',
  //   '!**/coverage/**',
  //   '!**/jest.config.mjs',
  //   '!**/next.config.mjs',
  //   '!**/types/**',
  //   '!**/views/**',
  //   '!**/pages/api/**'
  // ],
  collectCoverageFrom: [
    "src/pages/produk/**/*.{ts,tsx}",
    "src/views/produk/**/*.{ts,tsx}",
    "src/pages/about/**/*.{ts,tsx}",
  ],
}

export default createJestConfig(config)