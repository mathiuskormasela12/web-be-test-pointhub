// ========== Parsing Validation Error
// import all modules
import { type ValidationError } from 'express-validator'

export const parsingValidationError = (rawErrors: ValidationError[]): Record<string, string[]> => {
  return rawErrors.reduce((acc: Array<Record<string, string[]>>, cv: ValidationError) => {
    let exists

    switch (cv.type) {
      case 'field' :
        exists = acc.find((item: Record<string, string[]>) => item[cv.path])

        if (typeof exists === 'undefined') {
          acc.push({
            [cv.path]: [cv.msg]
          })
        } else {
          const a = acc.findIndex((item: Record<string, string[]>) => item[cv.path])
          acc[a][cv.path].push(cv.msg)
        }
        break

      default:
        exists = acc.find((item: Record<string, string[]>) => item[cv.type])

        if (typeof exists === 'undefined') {
          acc.push({
            [cv.type]: [cv.msg]
          })
        } else {
          const a = acc.findIndex((item: Record<string, string[]>) => item[cv.type])
          acc[a][cv.type].push(cv.msg)
        }
    }

    return [
      ...acc
    ]
  }, []).reduce((acc, cv) => {
    return {
      ...acc,
      [Object.keys(cv)[0]]: cv[Object.keys(cv)[0]]
    }
  }, {})
}
