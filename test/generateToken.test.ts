// ========== Generate Token Test
// import all modules
import { generateToken } from '../src/helpers/generateToken'

describe('Test Generate Token Function', () => {
  it('should return access token & refresh token', () => {
    const result = generateToken('64633a7fea2fb98c62ce7f0b')
    expect(result).toHaveProperty('accessToken')
    expect(result).toHaveProperty('refreshToken')
  })
})
