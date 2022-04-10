import mysql from 'mysql'
import config from '../config'

// https://stackoverflow.com/questions/18361930/node-js-returning-result-from-mysql-query

let pool

export const createPool = () => {
  pool = mysql.createPool(config.db)
}

export const deletePool = () => {
  return new Promise((resolve, reject) => {
    pool.end((err) => {
      return err ? reject(err) : resolve()
    })
  })
}

export const query = async (sql, params) => {
  return (async () => {
    const result = await getResults(pool, sql, params)
    return result
  })()
}

function getResults (conn, sqlString, values) {
  return new Promise((resolve, reject) => {
    conn.query(sqlString, values, (err, result) => {
      return err ? reject(err) : resolve(result)
    })
  })
}
