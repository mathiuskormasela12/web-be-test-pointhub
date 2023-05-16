// ========== Parsing Validation Error Test
// import all modules
import { parsingValidationError } from '../src/helpers/parsingValidationError'

describe('testing parsingValidationError Function', () => {
  it('should be return an error (type = field)', () => {
    const result = parsingValidationError([
      {
        type: 'field',
        location: 'body',
        path: 'phoneNumber',
        value: '',
        msg: 'phone number is required'
      }
    ])

    expect(result).toEqual({
      phoneNumber: ['phone number is required']
    })
  })

  it('should be return an error (type = other)', () => {
    const result = parsingValidationError([
      {
        type: 'alternative',
        msg: 'the fields are required',
        nestedErrors: []
      }
    ])

    expect(result).toEqual({
      alternative: ['the fields are required']
    })
  })
})
