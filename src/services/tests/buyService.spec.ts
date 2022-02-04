import { createConnection, getConnection } from "typeorm"
import request from 'supertest'
import app from "../../app"

describe("Purchase tests", () => {
  const tokenADM = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiYmYwNTk0NTktZTViMC00NTdmLTllZTUtMzkyNWViNmU5YjIxIiwiZW1haWwiOiJ1c2VyMUBtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJDREdGFsRHJFWERKV1FWaTdFR2gway5ORk02alJBV1piNlpzSkRLSFlPYlNmVUFsMTloWk9xIiwibmFtZSI6IkFydGh1ciIsImFkbSI6dHJ1ZSwicmVzZXRfbGluayI6IiIsImNhcnQiOnsiaWQiOiI2ZWMxMjg1Ny0zMTQzLTRiOTQtYTI1YS1mNDgwZjNhNmQ3MmUiLCJwcm9kdWN0cyI6W3siaWQiOiJiODI1NWU1OS00MWUyLTRiYTMtODAzZS03MTcwMWM5ZDY3OTkiLCJuYW1lIjoiU2tvbCAxTCIsInByaWNlIjoxMH1dfX0sImlhdCI6MTY0MzkxODA2NCwiZXhwIjoxNjQ0MDA0NDY0fQ.9b7MT7acPDQhl_KcUQ7kaJsi9tLUlC0JAu_-AuocIE0"
  beforeAll(async () => {
    await createConnection()
  })

  afterAll(async () => {
    const defaultConnection = getConnection()
    await defaultConnection.close()
  })

  it("Select all purchases", async () => {
    const resp = await request(app).get('/api/buy').auth(tokenADM, { type: 'bearer' })

    expect(resp.statusCode).toBe(200)
    expect(resp.body).toHaveProperty('map')
  })

  it("Select a purchase", async () => {
    const resp = await request(app).get('/api/buy/bba13e12-81d0-410d-9a09-cbad9a92eae1').auth(tokenADM, { type: 'bearer' })

    expect(resp.statusCode).toBe(200)
  })

  it("Finish purchase", async () => {
    const resp = await request(app).post('/api/buy').auth(tokenADM, { type: 'bearer' })

    expect(resp.statusCode).toBe(200)
  })
})