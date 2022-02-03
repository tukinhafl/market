import { createConnection, getConnection } from "typeorm"
import request from 'supertest'
import app from "../../app"

describe("Users route tests", () => {
  const tokenADM = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiYmYwNTk0NTktZTViMC00NTdmLTllZTUtMzkyNWViNmU5YjIxIiwiZW1haWwiOiJ1c2VyMUBtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJDREdGFsRHJFWERKV1FWaTdFR2gway5ORk02alJBV1piNlpzSkRLSFlPYlNmVUFsMTloWk9xIiwibmFtZSI6IkFydGh1ciIsImFkbSI6dHJ1ZSwicmVzZXRfbGluayI6IiIsImNhcnQiOnsiaWQiOiI2ZWMxMjg1Ny0zMTQzLTRiOTQtYTI1YS1mNDgwZjNhNmQ3MmUiLCJwcm9kdWN0cyI6W3siaWQiOiJiODI1NWU1OS00MWUyLTRiYTMtODAzZS03MTcwMWM5ZDY3OTkiLCJuYW1lIjoiU2tvbCAxTCIsInByaWNlIjoxMH1dfX0sImlhdCI6MTY0MzkxODA2NCwiZXhwIjoxNjQ0MDA0NDY0fQ.9b7MT7acPDQhl_KcUQ7kaJsi9tLUlC0JAu_-AuocIE0"
  beforeAll(async () => {
    await createConnection()
  })

  afterAll(async () => {
    const defaultConnection = getConnection()
    await defaultConnection.close()
  })

  it("Should return a list os all users", async () => {
    const resp = await request(app).get('/api/user').auth(tokenADM, {type: "bearer"}).expect(200)

    expect(resp.body).toHaveProperty('map')
  })

  it("Should return a user by his id", async () => {
    const resp = await request(app).get('/api/user/26f6a0ec-ee38-473c-b5b2-983e3126ac6a').auth(tokenADM, {type: 'bearer'})

    console.log(resp.body)
    
    expect(resp.body.email).toBe('user@mail.com')
  })

  it("Should create a new user", async () => {
    const userData = {
      "name": "Arthur Fenili",
      "email": "user3@mail.com",
      "password": "12345",
      "adm": true
    }

    const response = await request(app).post('/api/user').send(userData).expect(201)
    expect(response.body).toHaveProperty('id')
  })

  it("Should return a token", async () => {
    const loginData = {
      "email": "user@mail.com",
	    "password": "102030"
    }

    const resp = await request(app).post('/api/login').send(loginData).expect(200)
    expect(resp.body).toHaveProperty("access_token")
  })
})