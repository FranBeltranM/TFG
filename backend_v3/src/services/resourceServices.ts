import * as resource from '../controllers/resource.controller'
import { Resource } from '../types'
import { log } from '../utils/functions'

export const getResource = async (resourceType: string, debug = false): Promise<Resource[] | null> => {
  try {
    const results: Resource[] | null = await resource.findByResource(resourceType, debug)
    return results
  } catch (err: any) {
    debug && log('ERROR', err.message)
    throw new Error(`resource.controller.${getResource.name} -> ${err.message}`)
  }
}
