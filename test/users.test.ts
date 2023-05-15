// ========== User Tests
// import all modules
import request from 'supertest'
import mongoose from 'mongoose'
import config from '../src/config'
import App from '../src/core/App'

const app = new App()

describe('POST - Sign Up or Sign In', () => {
  beforeAll(async () => {
    await mongoose.connect(config?.dbUri)
    console.log('The database has been connected')
  })

  afterAll(async () => {
    await mongoose.connection.close()
    console.log('The database has been disconnected')
  })

  it.concurrent('should be return user list', () => {
    request(app.server)
      .post('/api/v1/users')
      .expect('Content-Type', /json/)
      .send({
        phoneNumber: '62922828282',
        password: 'mathius123'
      })
      .then((res) => {
        expect(res.body).toEqual({
          code: 200,
          message: 'Get Users',
          results: [
            {
              id: 1,
              name: 'Mathius'
            }
          ]
        })
      })
  })
})
