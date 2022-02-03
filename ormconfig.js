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

const testEnv = {
  type: 'sqlite',
  database: ':memory:',
  entities: ['./src/entities/**/*.ts'],
  synchronize: true,
}

let exportModule

if (process.env.NODE_ENV === 'test') {
  exportModule = testEnv
} else {
  exportModule = devEnv
}

module.exports = exportModule