const devEnv = {
  type: "postgres",
  host: 'localhost',
  port: "5432",
  database: 'kenzie_market',
  username: 'arthur',
  password: '123456',
  entities: ['./src/entities/**/*.ts'],
  migrations: ['./src/database/migrations/*.ts'],
  cli: {
    migrationsDir: './src/database/migrations'
  },
  logging: true,
  synchronize: false
}

const prodEnv = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['./dist/src/entities/**/*.js'],
  migrations: ['./dist/src/database/migrations/*.js'],
  cli: {
      migrationsDir: './dist/src/database/migrations'
  },
  synchronize: true,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
}

const testEnv = {
  type: 'sqlite',
  database: ':memory:',
  entities: ['./src/entities/**/*.ts'],
  synchronize: true,
}

let exportModule

if (process.env.NODE_ENV === 'production') {
  exportModule = prodEnv
} else if (process.env.NODE_ENV === "test") {
  exportModule = testEnv
} else {
  exportModule = devEnv
}

module.exports = exportModule