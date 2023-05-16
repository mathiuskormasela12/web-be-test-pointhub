// ========== User Tests
// import all modules
import request from 'supertest'
import mongoose from 'mongoose'
import { faker } from '@faker-js/faker'
import config from '../src/config'
import App from '../src/core/App'

const app = new App()

const data = {
  phoneNumber: faker.phone.number('62######'),
  name: faker.person.fullName()
}

describe('POST - Register User', () => {
  beforeAll(async () => {
    await mongoose.connect(config?.database?.uri, { dbName: config?.database?.name })
    console.log('The database has been connected')
  })

  afterAll(async () => {
    await mongoose.connection.close()
    console.log('The database has been disconnected')
  })

  it('should return Register Successfully & Code 201', async () => {
    const response = await request(app.server)
      .post('/api/v1/users/register')
      .expect('Content-Type', /json/)
      .send(data)

    expect(response.body.code).toBe(201)
    expect(response.body.message).toBe('Register Successfully')
  })

  it('should return phone number already exists', async () => {
    const response = await request(app.server)
      .post('/api/v1/users/register')
      .expect('Content-Type', /json/)
      .send(data)

    expect(response.body).toEqual({
      code: 400,
      message: 'Failed to register',
      errors: {
        phoneNumber: ['phone number already exists']
      }
    })
  })

  it('should return 400 error code (Register)', async () => {
    const response = await request(app.server)
      .post('/api/v1/users/register')
      .expect('Content-Type', /json/)

    expect(response.body.code).toBe(400)
  })
})

describe('POST - Login User', () => {
  beforeAll(async () => {
    await mongoose.connect(config?.database?.uri, { dbName: config?.database?.name })
    console.log('The database has been connected')
  })

  afterAll(async () => {
    await mongoose.connection.close()
    console.log('The database has been disconnected')
  })

  it('should return Login Successfully & Code 200', async () => {
    const response = await request(app.server)
      .post('/api/v1/users/login')
      .expect('Content-Type', /json/)
      .send(data)

    expect(response.body.code).toBe(200)
    expect(response.body.message).toBe('Login Successfully')
  })

  it('should return phone number does not exists', async () => {
    const response = await request(app.server)
      .post('/api/v1/users/login')
      .expect('Content-Type', /json/)
      .send({
        name: data.name,
        phoneNumber: faker.phone.number('62######')
      })

    expect(response.body).toEqual({
      code: 401,
      message: 'Failed to login',
      errors: {
        phoneNumber: ['The phone number does not exists']
      }
    })
  })

  it('should return 400 error code (Login)', async () => {
    const response = await request(app.server)
      .post('/api/v1/users/login')
      .expect('Content-Type', /json/)

    expect(response.body.code).toBe(400)
  })
})

describe('POST - Create Access Token', () => {
  beforeAll(async () => {
    await mongoose.connect(config?.database?.uri, { dbName: config?.database?.name })
    console.log('The database has been connected')
  })

  afterAll(async () => {
    await mongoose.connection.close()
    console.log('The database has been disconnected')
  })

  it('should return 200', async () => {
    const responseOfRegistration = await request(app.server)
      .post('/api/v1/users/register')
      .expect('Content-Type', /json/)
      .send({
        phoneNumber: faker.phone.number('62######'),
        name: faker.person.fullName()
      })
    console.log(responseOfRegistration.body)
    const response = await request(app.server)
      .post('/api/v1/users/access-token')
      .expect('Content-Type', /json/)
      .send({
        refreshToken: responseOfRegistration.body?.result?.refreshToken
      })

    expect(response.body.code).toBe(200)
  })

  it('should return 400 (Expired Token)', async () => {
    const response = await request(app.server)
      .post('/api/v1/users/access-token')
      .expect('Content-Type', /json/)
      .send({
        refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDYzM2E4N2VhMmZiOThjNjJjZTdmMGUiLCJpYXQiOjE2ODQyMjUzNzAsImV4cCI6MTY4NDIyNjI3MH0.EmZIEVGR9CaigxHp4ecan2n9oQV1iToBQ66PYCC_GME'
      })

    expect(response.body.code).toBe(400)
  })
})
