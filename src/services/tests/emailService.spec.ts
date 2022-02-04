import { createConnection, getConnection } from "typeorm"
import request from 'supertest'
import app from "../../app"

describe("Purchase tests", () => {
  const loginData = {
    "email": "user3@mail.com",
    "password": "12345"
  }

  const emailData = {
    "email": "user@mail.com"
  }

  beforeAll(async () => {
    await createConnection()
  })

  afterAll(async () => {
    const defaultConnection = getConnection()
    await defaultConnection.close()
  })

  it ("Insufficient permission to send an email", async () => {
    const respLogin = await request(app).post('/api/login').send(loginData)

    const resp = await request(app).post('/api/email').auth(respLogin.body.access_token, { type: 'bearer' }).send(emailData)
  
    expect(resp.statusCode).toBe(401)
  })
})