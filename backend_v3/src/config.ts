import dotenv from 'dotenv'

dotenv.config()

export const config = {
  db: {
    connectionLimit: 10000,
    connectTimeout: 60 * 60 * 1000,
    host: process.env.DDBB_HOST,
    user: process.env.DDBB_USER,
    password: process.env.DDBB_PASSWORD,
    database: process.env.DDBB_DATABASE,
  },
}
