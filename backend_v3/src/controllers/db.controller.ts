import mysql from 'mysql2/promise'
import { config } from '../config'

let pool: mysql.Pool | null = null

/**
 * This function creates a connection pool to the database
 * @returns Promise<mysql.Pool>
 */
export const _createPool = async (): Promise<mysql.Pool> => (pool = mysql.createPool(config.db))

/**
 * This functions ends the connection pool to the database
 * @returns Promise<void | false>
 */
export const _endPool = async (): Promise<void | false> => pool !== null && (await pool.end())

/**
 * This function returns the pool connection
 * @returns Promise<mysql.Pool | null>
 */
export const initializeDB = async (): Promise<mysql.Pool | null> => {
  !pool && _createPool()
  return pool
}

/**
 * This function call the function to end the connection pool to the database
 * @returns Promise<void | false>
 */
export const endPool = async (): Promise<void | false> => await _endPool()

/**
 * This function execute a query to the database
 * @param sql {string} - The SQL query
 * @param values {Array[string]} - The values to be inserted in the query
 * @returns
 */
export const query = async (sql: string, values: Array<String>) => {
  if (pool !== null) {
    const [results] = await pool.query(sql, values)
    return results
  }

  return null
}
