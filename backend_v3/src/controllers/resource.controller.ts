import { Resource } from '../types'
import { resourceTypes } from '../utils/config'
import { getKeyValueFromObject, log } from '../utils/functions'
import { query } from './db.controller'

const queryDictGet: { [key: string]: any } = {
  findByResource: (resourceType: string) => {
    const tableName = resourceTypes[resourceType]()
    return `SELECT * FROM TablasEstaticas.${tableName}`
  },
}

/**
 * This function returns the resource from the database
 * @param resourceType type of resource to be searched
 * @param debug true if you want to see the query
 * @returns the resource found
 */
export const findByResource = async (resourceType: string, debug = false): Promise<Resource[] | null> => {
  try {
    const queryString = queryDictGet[`${findByResource.name}`](resourceType)
    debug && log('DEBUG', { queryString })
    const results = (await query(queryString)) as Array<any>
    return results.map((result) => getKeyValueFromObject(result))
  } catch (err: any) {
    debug && log('ERROR', err.message)
    throw new Error(`resource.controller.${findByResource.name} -> ${err.message}`)
  }
}
