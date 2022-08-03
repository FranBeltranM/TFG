import dotenv from 'dotenv'

dotenv.config()

const config = {
  db: {
    connectionLimit: 10000,
    connectTimeout: 60 * 60 * 1000,
    acquireTimeout: 60 * 60 * 1000,
    timeout: 60 * 60 * 1000,
    host: process.env.DDBB_HOST,
    user: process.env.DDBB_USER,
    password: process.env.DDBB_PASSWORD,
    database: process.env.DDBB_DATABASE,
    timezone: 'Europe/Paris',
  },
}

// https://stackoverflow.com/questions/67159415/perform-multiple-sequelize-query-with-multiple-threads
// https://blog.desdelinux.net/arreglar-error-mysql-too-many-connections/?_gl=1%2A1p666i6%2A_ga%2AYW1wLVZNbFNuajBHOFV4LTZDVVVIWXNYVEExcDZBazlqbjRXYW1iVEZsRW1fX2Z2WGhYNENBRmZmOXpFdFljSjA0UTM.

export default config
