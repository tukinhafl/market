import { createConnection, getConnection } from "typeorm"
import request from 'supertest'
import app from "../../app"

describe("Users route tests", () => {
  const userData = {
    "name": "Arthur Fenili",
    "email": "user3@mail.com",
    "password": "12345",
    "adm": true
  }

  const loginData = {
    "email": "user3@mail.com",
    "password": "12345"
  }

  beforeAll(async () => {
    await createConnection()
  })

  afterAll(async () => {
    const defaultConnection = getConnection()
    await defaultConnection.close()
  })

  it("Should return a list os all users", async () => {
    await request(app).post('/api/user').send(userData)
    const respLogin = await request(app).post('/api/login').send(loginData)
    const resp = await request(app).get('/api/user').auth(respLogin.body.access_token, {type: "bearer"})

    expect(resp.body).toHaveProperty('map')
  })

  it("Should return a user by his id", async () => {
    const respUser = await request(app).post('/api/user').send(userData)
    const respLogin = await request(app).post('/api/login').send(loginData)
    const resp = await request(app).get(`/api/user/${respUser.body.id}`).auth(respLogin.body.access_token, {type: 'bearer'})

    expect(resp.statusCode).toBe(200)
  })

  it("Should create a new user", async () => {
    const response = await request(app).post('/api/user').send(userData).expect(201)
    expect(response.body).toHaveProperty('id')
  })

  it("Should return a token", async () => {
    await request(app).post('/api/user').send(userData)
    const resp = await request(app).post('/api/login').send(loginData)
    
    expect(resp.body).toHaveProperty('access_token')
  })
})