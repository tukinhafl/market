import { createConnection, getConnection } from "typeorm"
import request from 'supertest'
import app from "../../app"

describe("Products routes tests", () => {
  const loginData = {
    "email": "user3@mail.com",
    "password": "12345"
  }

  const productData = {
    "name": "Skol 1L",
    "price": 10.00
  }

  const userData = {
    "name": "Arthur Fenili",
    "email": "user3@mail.com",
    "password": "12345",
    "adm": true
  }

  beforeAll(async () => {
    await createConnection()
  })

  afterAll(async () => {
    const defaultConnection = getConnection()
    await defaultConnection.close()
  })

  it ("Should create a new product", async () => {
    await request(app).post('/api/user').send(userData)
    const respLogin = await request(app).post('/api/login').send(loginData)
    const resp = await request(app).post('/api/product').auth(respLogin.body.access_token, { type: 'bearer' }).send(productData).expect(201)

    expect(resp.body).toHaveProperty('name')
    expect(resp.body).toHaveProperty('price')
  })

  it ("Should find a product by id", async () => {
    await request(app).post('/api/user').send(userData)
    const respLogin = await request(app).post('/api/login').send(loginData)
    const respProduct = await request(app).post('/api/product').auth(respLogin.body.access_token, { type: 'bearer' }).send(productData)
    const resp = await request(app).get(`/api/product/${respProduct.body.id}`).auth(respLogin.body.access_token, { type: 'bearer' })
    
    expect(resp.statusCode).toBe(200)
  })

  it ("Should return all products registereds", async () => {
    await request(app).post('/api/user').send(userData)
    const respLogin = await request(app).post('/api/login').send(loginData)
    const resp = await request(app).get('/api/product').auth(respLogin.body.access_token, { type: 'bearer' })

    expect(resp.body).toHaveProperty('map')
  })
})