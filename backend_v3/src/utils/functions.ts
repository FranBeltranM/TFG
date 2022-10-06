import { Request } from 'express'
import logger from 'node-color-log'

const logDict: { [key: string]: any } = {
  SUCCESS: (message: any) => logger.success(message),
  DEBUG: (message: any) => logger.debug(message),
  INFO: (message: any) => logger.info(message),
  WARN: (message: any) => logger.warn(message),
  ERROR: (message: any) => logger.error(message),
}

logger.setDate(() => new Date().toLocaleTimeString())

export const log = (type: string, message: any) => logDict[type](message)

/**
 * Return true if one of the required params are setted
 * @param {Object} req
 * @param {Array} requiredParams
 * @returns {Boolean}
 */
export const checkIsValidParams = (params: Object, requiredParams: Array<string>, checkAll = false) => {
  const reqParamArray = Object.keys(params)
  const hasRequiredParams = requiredParams.map((param) => reqParamArray.includes(param))

  // If checkAll is true, all the required params must be setted
  if (!checkAll) return hasRequiredParams.includes(true)

  return !hasRequiredParams.includes(false)
}

/**
 * Return an array with all the key:values included in params from req.body
 * @param {Object} req
 * @param {Array} params
 * @returns {Array} Key:value
 */
export const getParamsValues = (req: Request, params: Array<any>) => {
  // const paramValues = params.reduce((sum, param) => {
  //   req.query[param] &&
  //     sum.push({
  //       [param]: req.query[param] ?? null,
  //     })

  //   return sum
  // }, [])

  const paramValues = params.reduce((sum, param) => {
    req.query[param] && (sum[param] = req.query[param] ?? null)

    return sum
  }, {})

  return paramValues
}
