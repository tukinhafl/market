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

  it ("Should return status code 200", async () => {
    const recoveryData = {
      "email": "user@mail.com"
    }

    const resp = await request(app).post('/api/recuperar').auth(tokenADM, { type: 'bearer' }).send(recoveryData)

    expect(resp.statusCode).toBe(200)
  })

  // it ("Should return an error", async () => {
  //   const changePassData = {
  //     "recovery_code": "1",
	//     "new_password": "102030"
  //   }

  //   const resp = await request(app).post('/api/alterar_senha').auth(tokenADM, { type: 'bearer' }).send(changePassData)

  //   expect(resp.statusCode).toBe(404)
  // })
})