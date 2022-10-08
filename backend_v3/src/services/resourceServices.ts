import * as resource from '../controllers/resource.controller'
import { Resource } from '../types'

export const getResource = async (resourceType: string, debug = false): Promise<Resource[] | null> => {
  const results: Resource[] | null = await resource.findByResource(resourceType, debug)
  return results
}
