const dotenv = require("dotenv");
dotenv.config({
  path: ".env.development",
}); //isso possibilita o test de ler o .env.development (pq ele lê o .env.test por padrão)
const nextJest = require("next/jest.js");

const createJestConfig = nextJest({
  dir: ".", // Isso fornece o arquivo .nextjs e carrega o arquivo .env
});

const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
});

module.exports = jestConfig;
