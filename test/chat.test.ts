// ========== Chat Test
// import all modules
import request from 'supertest'
import mongoose from 'mongoose'
import { faker } from '@faker-js/faker'
import config from '../src/config'
import App from '../src/core/App'

const app = new App()

describe('POST - Send Chat', () => {
  beforeAll(async () => {
    await mongoose.connect(config?.database?.uri, { dbName: config?.database?.name })
    console.log('The database has been connected')
  })

  afterAll(async () => {
    await mongoose.connection.close()
    console.log('The database has been disconnected')
  })

  it('should be return response with chat', async () => {
    const responseOfRegistrationForSender = await request(app.server)
      .post('/api/v1/users/register')
      .expect('Content-Type', /json/)
      .send({
        phoneNumber: faker.phone.number('62######'),
        name: faker.string.alphanumeric(),
        password: 'P4$$w0rd123'
      })

    const responseOfRegistrationForReceiver = await request(app.server)
      .post('/api/v1/users/register')
      .expect('Content-Type', /json/)
      .send({
        phoneNumber: faker.phone.number('62######'),
        name: faker.string.alphanumeric(),
        password: 'P4$$w0rd123'
      })

    const chat = `Test_${Date.now()}`

    const response = await request(app.server).post('/api/v1/chats')
      .expect('Content-Type', /json/)
      .set({
        'x-access-token': responseOfRegistrationForSender.body?.result?.accessToken ?? ''
      })
      .send({
        receiverId: responseOfRegistrationForReceiver.body?.result?._id,
        chat
      })

    expect(response.body).toEqual({
      code: 200,
      message: 'Message is sent successfully',
      result: {
        message: chat
      }
    })
  })
})

describe('GET - Get Chat Lists', () => {
  beforeAll(async () => {
    await mongoose.connect(config?.database?.uri, { dbName: config?.database?.name })
    console.log('The database has been connected')
  })

  afterAll(async () => {
    await mongoose.connection.close()
    console.log('The database has been disconnected')
  })

  it('should be return the chat lists', async () => {
    const responseOfRegistrationForSender = await request(app.server)
      .post('/api/v1/users/register')
      .expect('Content-Type', /json/)
      .send({
        phoneNumber: faker.phone.number('62######'),
        name: faker.string.alphanumeric(),
        password: 'P4$$w0rd123'
      })

    const responseOfRegistrationForReceiver = await request(app.server)
      .post('/api/v1/users/register')
      .expect('Content-Type', /json/)
      .send({
        phoneNumber: faker.phone.number('62######'),
        name: faker.string.alphanumeric(),
        password: 'P4$$w0rd123'
      })

    const receiverId = responseOfRegistrationForReceiver.body?.result?._id as string ?? ''

    const response = await request(app.server).get(`/api/v1/chats/${receiverId}`)
      .expect('Content-Type', /json/)
      .set({
        'x-access-token': responseOfRegistrationForSender.body?.result?.accessToken ?? ''
      })

    expect(response.body.message).toBe('Success get chat lists')
    expect(response.body.code).toBe(200)
  })
})
