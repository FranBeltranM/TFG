export const paramsEntryPoints: { [key: string]: any } = {
  '/search': () => {
    return {
      mandatory: ['vin', 'plate'],
      optional: [],
    }
  },
  '/transfers/id': () => {
    return {
      mandatory: ['id'],
      optional: [],
    }
  },
}
