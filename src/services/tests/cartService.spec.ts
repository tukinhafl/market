import { createConnection, getConnection } from "typeorm"
import request from 'supertest'
import app from "../../app"

describe('Cart router tests', () => {
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

  it ("Add a product who doesn't exists", async () => {
    await request(app).post('/api/user').send(userData)
    const respLogin = await request(app).post('/api/login').send(loginData)
    const respProduct = await request(app).post('/api/product').auth(respLogin.body.access_token, { type: 'bearer' }).send(productData).expect(201)
    const resp = await request(app).post('/api/cart').auth(respLogin.body.access_token, { type: 'bearer' }).send(respProduct.body.name)

    expect(resp.statusCode).toBe(400)
  })

  it ("Error to select user cart", async () => {
    await request(app).post('/api/user').send(userData)
    const respLogin = await request(app).post('/api/login').send(loginData)
    const resp = await request(app).get('/api/cart/123').auth(respLogin.body.access_token, { type: 'bearer' })

    expect(resp.statusCode).toBe(404)
  })

  it ("Select all carts", async () => {
    await request(app).post('/api/user').send(userData)
    const respLogin = await request(app).post('/api/login').send(loginData)
    const resp = await request(app).get('/api/cart').auth(respLogin.body.access_token, { type: 'bearer' })

    expect(resp.body).toHaveProperty('map')
  })

  it ("Error to delete product from a non exists cart id", async () => {
    await request(app).post('/api/user').send(userData)
    const respLogin = await request(app).post('/api/login').send(loginData)
    const respProduct = await request(app).post('/api/product').auth(respLogin.body.access_token, { type: 'bearer' }).send(productData)
    const cartId = '123'

    const resp = await request(app).delete(`/api/cart/${respProduct.body.id}`).auth(respLogin.body.access_token, { type: 'bearer' }).send(cartId)

    expect(resp.statusCode).toBe(404)
  })
})