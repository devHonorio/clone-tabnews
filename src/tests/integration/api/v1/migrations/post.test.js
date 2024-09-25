import database from 'infra/database'
import orchestrator from 'src/tests/orchestrator'

beforeAll(async () => {
  await orchestrator.waitForAllServices()
  await database.query('drop schema public cascade; create schema public;')
})

async function fetchPostMigrations() {
  return await fetch('http://localhost:3000/api/v1/migrations', {
    method: 'POST',
  })
}

test('POST to /api/v1/migrations should return 200', async () => {
  const response1 = await fetchPostMigrations()

  expect(response1.status).toBe(201)

  const responseBory1 = await response1.json()

  expect(Array.isArray(responseBory1)).toBe(true)

  expect(responseBory1.length).toBeGreaterThan(0)

  const response2 = await fetchPostMigrations()

  expect(response2.status).toBe(200)

  const responseBory2 = await response2.json()

  expect(responseBory2.length).toBe(0)
})
